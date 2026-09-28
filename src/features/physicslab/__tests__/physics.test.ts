import { describe, expect, it } from 'vitest';
import {
  apexTime,
  balanceTorque,
  dcMotor,
  flightTime,
  inclineAcceleration,
  parallelR,
  projectileRange,
  seriesR,
  springEnergy,
  springState,
} from '../physics';

describe('projectile', () => {
  const g = 9.81;

  it('matches the analytic range for a 45 degree launch', () => {
    const v = 20;
    expect(projectileRange({ v0: v, angleDeg: 45, g })).toBeCloseTo((v * v * Math.sin(Math.PI / 2)) / g, 2);
  });

  it('has its apex at half the flight time', () => {
    const p = { v0: 20, angleDeg: 45, g };
    expect(apexTime(p)).toBeCloseTo(flightTime(p) / 2, 4);
  });

  it('gives the same range for complementary angles', () => {
    expect(projectileRange({ v0: 15, angleDeg: 30, g })).toBeCloseTo(projectileRange({ v0: 15, angleDeg: 60, g }), 4);
  });

  it('travels nowhere when launched straight up', () => {
    expect(projectileRange({ v0: 20, angleDeg: 90, g })).toBeCloseTo(0, 6);
  });

  it('does not divide by zero at zero gravity', () => {
    expect(Number.isFinite(projectileRange({ v0: 20, angleDeg: 45, g: 0 }))).toBe(true);
  });
});

describe('spring', () => {
  it('conserves energy without damping', () => {
    const p = { k: 10, m: 1, x0: 0.2, c: 0 };
    expect(springEnergy(springState(p, 5), p)).toBeCloseTo(springEnergy(springState(p, 0), p), 4);
  });

  it('decays with damping', () => {
    const p = { k: 10, m: 1, x0: 0.2, c: 0.5 };
    expect(springEnergy(springState(p, 5), p)).toBeLessThan(springEnergy(springState(p, 0), p));
  });

  it('starts at the release point with no velocity', () => {
    const s = springState({ k: 10, m: 1, x0: 0.2, c: 0 }, 0);
    expect(s.x).toBeCloseTo(0.2, 6);
    expect(s.v).toBeCloseTo(0, 6);
  });

  it('completes one period in 2*pi*sqrt(m/k)', () => {
    const p = { k: 10, m: 1, x0: 0.2, c: 0 };
    const period = 2 * Math.PI * Math.sqrt(p.m / p.k);
    expect(springState(p, period).x).toBeCloseTo(p.x0, 2);
  });
});

describe('incline', () => {
  it('slides freely without friction', () => {
    expect(inclineAcceleration({ angleDeg: 30, mu: 0, g: 9.81 })).toBeCloseTo(9.81 * Math.sin(Math.PI / 6), 4);
  });

  it('does not move when friction exceeds the driving force', () => {
    expect(inclineAcceleration({ angleDeg: 10, mu: 1.0, g: 9.81 })).toBe(0);
  });

  it('never returns a negative acceleration', () => {
    for (let a = 0; a <= 90; a += 5) {
      expect(inclineAcceleration({ angleDeg: a, mu: 0.6, g: 9.81 })).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('torque', () => {
  it('balances equal weights at equal arms', () => {
    expect(balanceTorque([{ mass: 2, arm: -1 }, { mass: 2, arm: 1 }])).toBeCloseTo(0, 6);
  });

  it('tips towards the longer arm', () => {
    expect(balanceTorque([{ mass: 2, arm: -1 }, { mass: 2, arm: 2 }])).toBeGreaterThan(0);
  });

  it('is zero for no loads at all', () => {
    expect(balanceTorque([])).toBe(0);
  });
});

describe('circuit', () => {
  it('computes series resistance', () => {
    expect(seriesR([100, 220, 330])).toBe(650);
  });

  it('computes parallel resistance', () => {
    expect(parallelR([100, 100])).toBeCloseTo(50, 6);
  });

  it('treats an empty parallel set as an open circuit', () => {
    expect(parallelR([])).toBe(Infinity);
  });

  it('treats a zero-ohm branch as a short', () => {
    expect(parallelR([0, 100])).toBe(0);
  });

  it('gives series the sum and parallel less than the smallest', () => {
    const rs = [220, 470, 1000];
    expect(seriesR(rs)).toBe(1690);
    expect(parallelR(rs)).toBeLessThan(Math.min(...rs));
  });
});

describe('dc motor', () => {
  it('draws stall current and makes peak torque at zero speed', () => {
    const m = dcMotor({ volts: 12, resistance: 2, kt: 0.05, ke: 0.05, rpm: 0 });
    expect(m.current).toBeCloseTo(6, 4);
    expect(m.torque).toBeCloseTo(0.3, 4);
  });

  it('makes no torque at its no-load speed', () => {
    const noLoadRpm = ((12 / 0.05) * 60) / (2 * Math.PI);
    const m = dcMotor({ volts: 12, resistance: 2, kt: 0.05, ke: 0.05, rpm: noLoadRpm });
    expect(m.torque).toBeCloseTo(0, 4);
  });

  it('reports mechanical power that peaks between stall and no load', () => {
    const at = (rpm: number) => dcMotor({ volts: 12, resistance: 2, kt: 0.05, ke: 0.05, rpm }).mechanicalW;
    const noLoadRpm = ((12 / 0.05) * 60) / (2 * Math.PI);
    expect(at(noLoadRpm / 2)).toBeGreaterThan(at(0));
    expect(at(noLoadRpm / 2)).toBeGreaterThan(at(noLoadRpm));
  });

  it('does not divide by zero for a zero-resistance winding', () => {
    expect(Number.isFinite(dcMotor({ volts: 12, resistance: 0, kt: 0.05, ke: 0.05, rpm: 0 }).current)).toBe(true);
  });
});

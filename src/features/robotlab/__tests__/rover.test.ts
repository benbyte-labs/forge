import { describe, expect, it } from 'vitest';
import { stepRover, type RoverState, type World } from '../rover';

const world: World = { bounds: { x: 100, z: 100 }, obstacles: [{ x: 20, z: 0, r: 5 }], goal: null, line: null };
const start: RoverState = { x: 0, z: 0, heading: 0, gripping: false };

describe('stepRover', () => {
  it('drives forward along its heading', () => {
    const { state } = stepRover(start, { k: 'forward', cm: 10 }, { ...world, obstacles: [] });
    expect(state.x).toBeCloseTo(10);
    expect(state.z).toBeCloseTo(0);
  });

  it('drives along a rotated heading', () => {
    const { state } = stepRover({ ...start, heading: 90 }, { k: 'forward', cm: 10 }, { ...world, obstacles: [] });
    expect(state.x).toBeCloseTo(0);
    expect(state.z).toBeCloseTo(10);
  });

  it('turns and normalises the heading into 0..360', () => {
    expect(stepRover({ ...start, heading: 350 }, { k: 'turn', deg: 20 }, world).state.heading).toBeCloseTo(10);
    expect(stepRover({ ...start, heading: 10 }, { k: 'turn', deg: -20 }, world).state.heading).toBeCloseTo(350);
  });

  it('stops at an obstacle instead of driving through it', () => {
    const { state, collided } = stepRover(start, { k: 'forward', cm: 40 }, world);
    expect(collided).toBe(true);
    expect(state.x).toBeLessThan(16);
  });

  it('stops at the arena boundary', () => {
    const { state, collided } = stepRover({ ...start, x: 95 }, { k: 'forward', cm: 20 }, { ...world, obstacles: [] });
    expect(collided).toBe(true);
    expect(state.x).toBeLessThanOrEqual(100);
  });

  it('treats a negative distance as reverse, not as a teleport', () => {
    const { state } = stepRover({ ...start, x: 50 }, { k: 'forward', cm: -10 }, { ...world, obstacles: [] });
    expect(state.x).toBeCloseTo(40);
  });

  it('ignores a non-finite command value', () => {
    expect(stepRover(start, { k: 'forward', cm: Number.NaN }, world).state.x).toBe(0);
    expect(stepRover(start, { k: 'turn', deg: Number.POSITIVE_INFINITY }, world).state.heading).toBe(0);
  });

  it('reports the distance to the nearest thing ahead', () => {
    const { state } = stepRover(start, { k: 'forward', cm: 0 }, world);
    expect(state.x).toBe(0);
  });

  it('toggles the gripper', () => {
    expect(stepRover(start, { k: 'grip', closed: true }, world).state.gripping).toBe(true);
  });
});

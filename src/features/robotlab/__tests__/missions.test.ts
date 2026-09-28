import { describe, expect, it } from 'vitest';
import { defaultState } from '../../../engine/storage';
import { ARENAS } from '../arenas';
import { availableMissions, MISSIONS, missionById } from '../missions';
import type { RoverState } from '../rover';

const at = (x: number, z: number): RoverState => ({ x, z, heading: 0, gripping: false });

describe('missions', () => {
  it('gives every mission a scene that exists and a distinct id', () => {
    expect(new Set(MISSIONS.map((m) => m.id)).size).toBe(MISSIONS.length);
    for (const m of MISSIONS) expect(ARENAS[m.sceneId]).toBeDefined();
  });

  it('passes reach-the-goal only when the rover ends inside the goal', () => {
    const m = missionById('reach-goal')!;
    const world = ARENAS[m.sceneId];
    expect(m.check([at(0, 0)], world)).toBe(false);
    expect(m.check([at(0, 0), at(world.goal!.x, world.goal!.z)], world)).toBe(true);
  });

  it('fails reach-the-goal when the rover only passes through the goal', () => {
    const m = missionById('reach-goal')!;
    const world = ARENAS[m.sceneId];
    expect(m.check([at(world.goal!.x, world.goal!.z), at(0, 0)], world)).toBe(false);
  });

  it('fails obstacle-avoid when the trace grazes an obstacle', () => {
    const m = missionById('avoid')!;
    const world = ARENAS[m.sceneId];
    const o = world.obstacles[0];
    const grazing = [at(0, 0), at(o.x, o.z + o.r + 1), at(world.goal!.x, world.goal!.z)];
    expect(m.check(grazing, world)).toBe(false);
  });

  it('passes obstacle-avoid with clearance and a finish inside the goal', () => {
    const m = missionById('avoid')!;
    const world = ARENAS[m.sceneId];
    const clear = [at(0, 0), at(0, 80), at(world.goal!.x, world.goal!.z)];
    expect(m.check(clear, world)).toBe(true);
  });

  it('fails line-following when the rover strays from the line', () => {
    const m = missionById('follow-line')!;
    const world = ARENAS[m.sceneId];
    expect(m.check([at(0, 0), at(-90, 90), at(world.goal!.x, world.goal!.z)], world)).toBe(false);
  });

  it('passes line-following when the rover stays near the line and finishes', () => {
    const m = missionById('follow-line')!;
    const world = ARENAS[m.sceneId];
    const onLine = world.line!.map((p) => at(p.x, p.z));
    expect(m.check([...onLine, at(world.goal!.x, world.goal!.z)], world)).toBe(true);
  });

  it('fails any mission given an empty trace rather than passing by accident', () => {
    for (const m of MISSIONS) expect(m.check([], ARENAS[m.sceneId])).toBe(false);
  });

  it('hides warehouse missions until the day-14 arena is unlocked', () => {
    const locked = availableMissions(defaultState()).map((m) => m.id);
    expect(locked).not.toContain('warehouse-tour');

    const unlocked = availableMissions({ ...defaultState(), rewards: ['arena-warehouse'] }).map((m) => m.id);
    expect(unlocked).toContain('warehouse-tour');
  });

  it('keeps the unlocked list a superset of the locked one', () => {
    const locked = availableMissions(defaultState()).map((m) => m.id);
    const unlocked = availableMissions({ ...defaultState(), rewards: ['arena-warehouse'] }).map((m) => m.id);
    for (const id of locked) expect(unlocked).toContain(id);
  });
});

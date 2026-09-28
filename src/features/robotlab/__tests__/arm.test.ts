import { describe, expect, it } from 'vitest';
import { clampJoint, forwardKinematics, inverseKinematics, JOINT_LIMITS, restPose } from '../arm';

describe('kinematics', () => {
  it('round-trips a reachable target', () => {
    const joints = inverseKinematics({ x: 30, y: 20, z: 0 });
    expect(joints).not.toBeNull();
    const back = forwardKinematics(joints!);
    expect(back.x).toBeCloseTo(30, 1);
    expect(back.y).toBeCloseTo(20, 1);
    expect(back.z).toBeCloseTo(0, 1);
  });

  it('round-trips a target off the centre line', () => {
    const joints = inverseKinematics({ x: 20, y: 18, z: 20 });
    expect(joints).not.toBeNull();
    const back = forwardKinematics(joints!);
    expect(back.x).toBeCloseTo(20, 1);
    expect(back.z).toBeCloseTo(20, 1);
  });

  it('returns null for an unreachable target rather than NaN joints', () => {
    expect(inverseKinematics({ x: 1000, y: 0, z: 0 })).toBeNull();
  });

  it('returns null for a target folded inside the arm', () => {
    expect(inverseKinematics({ x: 0, y: 10, z: 0 })).toBeNull();
  });

  it('clamps a joint command to its limits', () => {
    expect(clampJoint(2, 400)).toBe(JOINT_LIMITS[2][1]);
    expect(clampJoint(2, -400)).toBe(JOINT_LIMITS[2][0]);
    expect(clampJoint(2, 10)).toBe(10);
  });

  it('ignores a joint index that does not exist', () => {
    expect(clampJoint(99, 10)).toBe(10);
  });

  it('treats a non-finite joint angle as zero', () => {
    expect(clampJoint(1, Number.NaN)).toBe(0);
  });

  it('has six joints in its rest pose, all within limits', () => {
    const pose = restPose();
    expect(pose).toHaveLength(6);
    pose.forEach((deg, i) => {
      expect(deg).toBeGreaterThanOrEqual(JOINT_LIMITS[i][0]);
      expect(deg).toBeLessThanOrEqual(JOINT_LIMITS[i][1]);
    });
  });
});

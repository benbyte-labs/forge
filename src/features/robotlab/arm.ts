/**
 * A six-axis arm, as pure kinematics.
 *
 * Joint 0 rotates the base about the vertical axis; joints 1-3 pitch in the
 * plane of the arm; joint 4 rolls the wrist; joint 5 opens the gripper. Only
 * the first four affect where the tool tip lands, which is what makes an
 * analytic solution possible — and a solution you can read beats an iterative
 * one when the point is to teach how kinematics works.
 */

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/** Link lengths in centimetres. */
export const LINKS = { base: 10, upper: 30, fore: 25, tool: 8 } as const;

/** Degrees each joint may move between. */
export const JOINT_LIMITS: [number, number][] = [
  [-180, 180], // base yaw
  [-90, 90], // shoulder
  [-150, 150], // elbow
  [-120, 120], // wrist pitch
  [-180, 180], // wrist roll
  [0, 90], // gripper opening
];

export function restPose(): number[] {
  return [0, 45, -90, 45, 0, 45];
}

/** Keep a joint command inside what the joint can physically do. */
export function clampJoint(index: number, deg: number): number {
  const value = Number.isFinite(deg) ? deg : 0;
  const limit = JOINT_LIMITS[index];
  if (!limit) return value;
  return Math.max(limit[0], Math.min(limit[1], value));
}

const rad = (deg: number) => (deg * Math.PI) / 180;
const degOf = (r: number) => (r * 180) / Math.PI;

/** Where the tool tip sits for a given set of joint angles. */
export function forwardKinematics(joints: number[]): Vec3 {
  const [a0 = 0, a1 = 0, a2 = 0, a3 = 0] = joints;
  const s1 = rad(a1);
  const s2 = s1 + rad(a2);
  const s3 = s2 + rad(a3);

  const r = LINKS.upper * Math.cos(s1) + LINKS.fore * Math.cos(s2) + LINKS.tool * Math.cos(s3);
  const y = LINKS.base + LINKS.upper * Math.sin(s1) + LINKS.fore * Math.sin(s2) + LINKS.tool * Math.sin(s3);

  return { x: r * Math.cos(rad(a0)), y, z: r * Math.sin(rad(a0)) };
}

/**
 * Joint angles that put the tool tip at `target`, or `null` when it cannot.
 *
 * The wrist is held so the tool points straight out, which removes one degree
 * of freedom and leaves an ordinary two-link problem. Returning `null` rather
 * than a best effort matters: a silent near-miss would have the arm confidently
 * stop somewhere the learner did not ask for.
 */
export function inverseKinematics(target: Vec3): number[] | null {
  if (![target.x, target.y, target.z].every(Number.isFinite)) return null;

  const a0 = degOf(Math.atan2(target.z, target.x));
  const r = Math.hypot(target.x, target.z);

  // Take the tool link off the end: the wrist has to reach this point.
  const rw = r - LINKS.tool;
  const yw = target.y - LINKS.base;
  const d = Math.hypot(rw, yw);

  const reach = LINKS.upper + LINKS.fore;
  const inner = Math.abs(LINKS.upper - LINKS.fore);
  if (d > reach || d < inner) return null;

  const cos2 = (d * d - LINKS.upper * LINKS.upper - LINKS.fore * LINKS.fore) / (2 * LINKS.upper * LINKS.fore);
  if (cos2 < -1 || cos2 > 1) return null;

  // Elbow-up, which keeps the arm clear of the table.
  const a2 = -Math.acos(cos2);
  const a1 = Math.atan2(yw, rw) - Math.atan2(LINKS.fore * Math.sin(a2), LINKS.upper + LINKS.fore * Math.cos(a2));
  const a3 = -(a1 + a2);

  const joints = [a0, degOf(a1), degOf(a2), degOf(a3), 0, 45];

  // A pose the arm cannot actually hold is no solution at all.
  for (let i = 0; i < 4; i++) {
    if (joints[i] !== clampJoint(i, joints[i])) return null;
  }

  return joints;
}

/// <reference lib="webworker" />
import { clampJoint, forwardKinematics, inverseKinematics, restPose } from './arm';
import { distanceAhead, initialRover, stepRover, type RoverState, type World } from './rover';

/**
 * Runs the learner's robot code against the simulated world.
 *
 * The simulation lives in here rather than on the main thread for the same
 * reason the Code Lab runs there: a learner's loop that never ends gets the
 * worker killed instead of freezing the app. It imports the very same
 * kinematics the renderer and the mission checks use, so what happens here is
 * what the tests pin down.
 */

export interface RobotRunRequest {
  src: string;
  world: World;
  machine: 'rover' | 'arm';
}

export interface RobotRunResult {
  logs: string[];
  error: string | null;
  /** Rover positions over the run, used to animate and to judge the mission. */
  trace: RoverState[];
  /** Arm poses over the run. */
  poses: number[][];
}

const LOG_CAP = 500;
const TRACE_CAP = 4000;

function run(req: RobotRunRequest): RobotRunResult {
  const logs: string[] = [];
  const trace: RoverState[] = [];
  const poses: number[][] = [];

  let rover: RoverState = initialRover();
  let joints = restPose();

  trace.push(rover);
  poses.push(joints);

  const record = () => {
    if (trace.length < TRACE_CAP) trace.push(rover);
    if (poses.length < TRACE_CAP) poses.push([...joints]);
  };

  const api = {
    rover: {
      forward: (cm: number) => {
        rover = stepRover(rover, { k: 'forward', cm }, req.world).state;
        record();
      },
      back: (cm: number) => {
        rover = stepRover(rover, { k: 'forward', cm: -cm }, req.world).state;
        record();
      },
      turn: (deg: number) => {
        rover = stepRover(rover, { k: 'turn', deg }, req.world).state;
        record();
      },
      distance: () => distanceAhead(rover, req.world),
      position: () => ({ x: rover.x, z: rover.z, heading: rover.heading }),
      grip: (closed: boolean) => {
        rover = stepRover(rover, { k: 'grip', closed }, req.world).state;
        record();
      },
    },
    arm: {
      joint: (index: number, deg: number) => {
        joints = joints.map((v, i) => (i === index ? clampJoint(i, deg) : v));
        record();
      },
      moveTo: (x: number, y: number, z: number) => {
        const solved = inverseKinematics({ x, y, z });
        if (!solved) throw new Error(`Nem érhető el / out of reach: (${x}, ${y}, ${z})`);
        joints = solved;
        record();
        return true;
      },
      tip: () => forwardKinematics(joints),
      grip: (open: boolean) => {
        joints = joints.map((v, i) => (i === 5 ? (open ? 90 : 0) : v));
        record();
      },
    },
    print: (...args: unknown[]) => {
      if (logs.length < LOG_CAP) logs.push(args.map((a) => (typeof a === 'string' ? a : JSON.stringify(a))).join(' '));
    },
  };

  try {
    const fn = new Function('rover', 'arm', 'print', 'console', `"use strict";\n${req.src}`);
    fn(api.rover, api.arm, api.print, { log: api.print, info: api.print, warn: api.print, error: api.print });
    return { logs, error: null, trace, poses };
  } catch (e) {
    const err = e as Error;
    return { logs, error: `${err.name ?? 'Error'}: ${err.message ?? String(e)}`, trace, poses };
  }
}

self.onmessage = (e: MessageEvent<RobotRunRequest>) => {
  self.postMessage(run(e.data));
};

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useStore } from '../../app/store';
import type { SceneId } from '../../content/types';
import { hasReward } from '../../engine/rewards';
import { useT } from '../../i18n';
import { Badge, Button, Icon, Panel } from '../../ui';
import { ARENAS, ARENA_REQUIREMENTS, isArmScene } from './arenas';
import { JOINT_LIMITS, restPose } from './arm';
import { Editor } from '../codelab/Editor';
import { initialRover, stepRover, type RoverState } from './rover';
import { RobotScene, type SkinId } from './scene';

type Mode = 'sliders' | 'keys' | 'code';

interface RobotLabProps {
  scene: SceneId;
  /** Hide the arena picker when a lesson pinned the scene. */
  fixedScene?: boolean;
  compact?: boolean;
}

const DEFAULT_CODE = `// rover.forward(cm) · rover.turn(fok) · rover.distance()
// arm.joint(i, fok) · arm.moveTo(x, y, z) · arm.grip(true/false)

for (let i = 0; i < 4; i++) {
  rover.forward(30);
  rover.turn(90);
}
print("kész", rover.position());
`;

export function RobotLab({ scene: initialScene, fixedScene = false, compact = false }: RobotLabProps) {
  const t = useT();
  const state = useStore((s) => s.state);
  const setRobotSkin = useStore((s) => s.setRobotSkin);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<RobotScene | null>(null);

  const [sceneId, setSceneId] = useState<SceneId>(initialScene);
  const [mode, setMode] = useState<Mode>('sliders');
  const [rover, setRover] = useState<RoverState>(initialRover);
  const [joints, setJoints] = useState<number[]>(restPose);
  const [code, setCode] = useState(state.codeDrafts['robotlab'] ?? DEFAULT_CODE);
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const world = ARENAS[sceneId];
  const machine = isArmScene(sceneId) ? 'arm' : 'rover';

  const skin: SkinId = hasReward(state, 'skin-mk2') && state.robotSkin === 'mk2' ? 'mk2' : 'default';

  const arenaOptions = useMemo(
    () =>
      (Object.keys(ARENAS) as SceneId[]).filter((id) => {
        const need = ARENA_REQUIREMENTS[id];
        return !need || hasReward(state, need);
      }),
    [state],
  );

  // ── the 3D scene ─────────────────────────────────────────────────

  useEffect(() => {
    if (!canvasRef.current) return;
    const s = new RobotScene(canvasRef.current);
    sceneRef.current = s;
    const onResize = () => s.resize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      s.dispose();
      sceneRef.current = null;
    };
  }, []);

  useEffect(() => {
    sceneRef.current?.setWorld(world);
    sceneRef.current?.setMachine(machine);
    sceneRef.current?.resize();
  }, [world, machine]);

  useEffect(() => sceneRef.current?.setSkin(skin), [skin]);
  useEffect(() => sceneRef.current?.setRover(rover), [rover]);
  useEffect(() => sceneRef.current?.setArm(joints), [joints]);

  // ── keyboard control ─────────────────────────────────────────────

  const drive = useCallback(
    (cmd: Parameters<typeof stepRover>[1]) => {
      setRover((prev) => {
        const { state: next, collided } = stepRover(prev, cmd, world);
        setMessage(collided ? t('robot.collided') : null);
        return next;
      });
    },
    [world, t],
  );

  useEffect(() => {
    if (mode !== 'keys') return;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const map: Record<string, () => void> = {
        w: () => drive({ k: 'forward', cm: 5 }),
        s: () => drive({ k: 'forward', cm: -5 }),
        a: () => drive({ k: 'turn', deg: -10 }),
        d: () => drive({ k: 'turn', deg: 10 }),
        q: () => setJoints((j) => j.map((v, i) => (i === 1 ? Math.max(JOINT_LIMITS[1][0], v - 5) : v))),
        e: () => setJoints((j) => j.map((v, i) => (i === 1 ? Math.min(JOINT_LIMITS[1][1], v + 5) : v))),
        ' ': () => setJoints((j) => j.map((v, i) => (i === 5 ? (v > 45 ? 0 : 90) : v))),
      };
      const fn = map[k];
      if (!fn) return;
      e.preventDefault();
      fn();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mode, drive]);

  // ── code control ─────────────────────────────────────────────────

  const runCode = useCallback(async () => {
    setRunning(true);
    setMessage(null);
    setLogs([]);
    try {
      const { runRobotCode } = await import('./runRobotCode');
      const result = await runRobotCode(code, world, machine);

      if (result.timedOut) {
        setMessage(t('lab.timedOut'));
        return;
      }

      setLogs(result.logs);
      if (result.error) setMessage(result.error);

      // Replay the trace so the learner watches the robot do what they wrote,
      // rather than seeing it snap to the final position.
      sceneRef.current?.setTrail(result.trace.map((p) => ({ x: p.x, z: p.z })));
      const frames = machine === 'arm' ? result.poses : result.trace;
      for (let i = 0; i < frames.length; i++) {
        if (machine === 'arm') setJoints(result.poses[i]);
        else setRover(result.trace[i]);
        await new Promise((r) => setTimeout(r, Math.max(8, 600 / frames.length)));
      }
    } finally {
      setRunning(false);
    }
  }, [code, world, machine, t]);

  const reset = () => {
    setRover(initialRover());
    setJoints(restPose());
    setMessage(null);
    setLogs([]);
    sceneRef.current?.setTrail([]);
  };

  return (
    <div className="robotlab" data-compact={compact}>
      <div className="robotlab__stage">
        <canvas ref={canvasRef} className="robotcanvas" />
        <div className="robotlab__hud">
          {machine === 'rover' ? (
            <>
              <span>
                x <strong>{rover.x.toFixed(0)}</strong>
              </span>
              <span>
                z <strong>{rover.z.toFixed(0)}</strong>
              </span>
              <span>
                {t('robot.heading')} <strong>{rover.heading.toFixed(0)}°</strong>
              </span>
            </>
          ) : (
            joints.slice(0, 3).map((j, i) => (
              <span key={i}>
                J{i} <strong>{j.toFixed(0)}°</strong>
              </span>
            ))
          )}
        </div>
      </div>

      <div className="robotlab__side">
        <div className="row gap wrap">
          <div className="chips">
            {(['sliders', 'keys', 'code'] as const).map((m) => (
              <button key={m} type="button" className="chip" aria-pressed={mode === m} onClick={() => setMode(m)}>
                {t(`robot.mode.${m}`)}
              </button>
            ))}
          </div>
          <Button variant="quiet" onClick={reset}>
            {t('robot.reset')}
          </Button>
        </div>

        {!fixedScene && (
          <label className="field">
            <span>{t('robot.arena')}</span>
            <select value={sceneId} onChange={(e) => setSceneId(e.target.value as SceneId)}>
              {arenaOptions.map((id) => (
                <option key={id} value={id}>
                  {id}
                </option>
              ))}
            </select>
          </label>
        )}

        {hasReward(state, 'skin-mk2') && (
          <label className="field">
            <span>{t('robot.skin')}</span>
            <select value={state.robotSkin} onChange={(e) => setRobotSkin(e.target.value)}>
              <option value="default">Standard</option>
              <option value="mk2">Mk-II</option>
            </select>
          </label>
        )}

        {mode === 'sliders' && (
          <div className="sliders">
            {machine === 'rover' ? (
              <>
                <div className="row gap">
                  <Button onClick={() => drive({ k: 'forward', cm: 10 })}>↑ 10 cm</Button>
                  <Button onClick={() => drive({ k: 'forward', cm: -10 })}>↓ 10 cm</Button>
                </div>
                <div className="row gap">
                  <Button onClick={() => drive({ k: 'turn', deg: -15 })}>↰ 15°</Button>
                  <Button onClick={() => drive({ k: 'turn', deg: 15 })}>↱ 15°</Button>
                </div>
              </>
            ) : (
              joints.map((value, i) => (
                <label key={i} className="slider">
                  <span>
                    {i === 5 ? t('robot.grip') : t('robot.joint', { n: i })}
                    <em>{value.toFixed(0)}°</em>
                  </span>
                  <input
                    type="range"
                    min={JOINT_LIMITS[i][0]}
                    max={JOINT_LIMITS[i][1]}
                    value={value}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setJoints((j) => j.map((old, idx) => (idx === i ? v : old)));
                    }}
                  />
                </label>
              ))
            )}
          </div>
        )}

        {mode === 'keys' && (
          <Panel tone="accent">
            <p className="dim">{t('robot.keysHint')}</p>
          </Panel>
        )}

        {mode === 'code' && (
          <div className="col">
            <p className="dim small mono">{t('robot.apiHint')}</p>
            <div className="robotlab__editor">
              <Editor value={code} lang="js" onChange={setCode} onRun={runCode} />
            </div>
            <Button variant="primary" onClick={runCode} loading={running}>
              <Icon name="play" size={16} /> {running ? t('lab.running') : t('lab.run')}
            </Button>
          </div>
        )}

        {message && <Badge tone="warn">{message}</Badge>}
        {logs.length > 0 && <pre className="console__body">{logs.join('\n')}</pre>}
      </div>
    </div>
  );
}

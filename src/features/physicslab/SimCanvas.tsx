import { useEffect, useRef, useState } from 'react';
import type { SimId } from '../../content/types';
import { useT } from '../../i18n';
import { Button, Formula, Panel } from '../../ui';
import { SIMS } from './sims';

interface SimCanvasProps {
  sim: SimId;
  overrides?: Record<string, number>;
  compact?: boolean;
}

/** One interactive simulation: sliders, canvas, live readout and the formula. */
export function SimCanvas({ sim, overrides, compact = false }: SimCanvasProps) {
  const t = useT();
  const def = SIMS[sim];
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [params, setParams] = useState<Record<string, number>>(() => {
    const base: Record<string, number> = {};
    for (const p of def.params) base[p.key] = overrides?.[p.key] ?? p.value;
    return base;
  });
  const [playing, setPlaying] = useState(true);
  const [time, setTime] = useState(0);

  const paramsRef = useRef(params);
  paramsRef.current = params;
  const playingRef = useRef(playing);
  playingRef.current = playing;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let last = performance.now();
    let local = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const p = paramsRef.current;
      if (playingRef.current) {
        local += dt;
        if (local > def.period(p)) local = 0;
        setTime(local);
      }

      const ratio = Math.min(devicePixelRatio, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== w * ratio || canvas.height !== h * ratio) {
        canvas.width = w * ratio;
        canvas.height = h * ratio;
      }
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      def.draw(ctx, { w, h }, p, local);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [def]);

  return (
    <div className="simlab" data-compact={compact}>
      <div className="simlab__stage">
        <canvas ref={canvasRef} className="simcanvas" />
      </div>

      <div className="simlab__side">
        <div className="row gap">
          <Button variant="primary" onClick={() => setPlaying((v) => !v)}>
            {playing ? t('phys.pause') : t('phys.play')}
          </Button>
          <Button variant="quiet" onClick={() => setTime(0)}>
            {t('phys.reset')}
          </Button>
        </div>

        <div className="sliders">
          {def.params.map((p) => (
            <label key={p.key} className="slider">
              <span>
                {p.label} {p.unit && <small>({p.unit})</small>}
                <em>{params[p.key]}</em>
              </span>
              <input
                type="range"
                min={p.min}
                max={p.max}
                step={p.step}
                value={params[p.key]}
                onChange={(e) => setParams((prev) => ({ ...prev, [p.key]: Number(e.target.value) }))}
              />
            </label>
          ))}
        </div>

        <Panel title={t('phys.readout')}>
          <ul className="readout">
            {def.readout(params, time).map((r, i) => (
              <li key={i}>
                <span>{r.label}</span>
                <strong>{r.value}</strong>
              </li>
            ))}
          </ul>
        </Panel>

        <div className="formulabox">
          <Formula tex={def.formula} />
        </div>
      </div>
    </div>
  );
}

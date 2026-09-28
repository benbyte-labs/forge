import { useEffect, useRef, useState } from 'react';
import { useT } from '../../i18n';
import { Badge, Button, Panel } from '../../ui';
import { CadViewer, type ModelInfo } from './viewer';

export function CadLabPage() {
  const t = useT();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewerRef = useRef<CadViewer | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [info, setInfo] = useState<ModelInfo | null>(null);
  const [wireframe, setWireframe] = useState(false);
  const [section, setSection] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const v = new CadViewer(canvasRef.current);
    viewerRef.current = v;
    const onResize = () => v.resize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      v.dispose();
      viewerRef.current = null;
    };
  }, []);

  useEffect(() => viewerRef.current?.setWireframe(wireframe), [wireframe]);
  useEffect(() => {
    if (info) viewerRef.current?.setSection(section, info.size.z);
  }, [section, info]);

  const open = async (file: File) => {
    setError(null);
    try {
      setInfo((await viewerRef.current?.load(file)) ?? null);
    } catch (e) {
      setError(String(e));
    }
  };

  return (
    <div className="page wide">
      <h1>{t('cad.title')}</h1>

      <Panel>
        <div className="cadlab">
          <div
            className="cadlab__stage"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files?.[0];
              if (file) void open(file);
            }}
          >
            <canvas ref={canvasRef} className="cadcanvas" />
            {!info && <p className="cadlab__hint">{t('cad.dropHere')}</p>}
          </div>

          <div className="cadlab__side">
            <Button
              variant="primary"
              onClick={() => fileRef.current?.click()}
            >
              {t('cad.openFile')}
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept=".stl,.3mf"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void open(file);
              }}
            />

            <label className="togglerow">
              <input type="checkbox" checked={wireframe} onChange={(e) => setWireframe(e.target.checked)} />
              <span>{t('cad.wireframe')}</span>
            </label>

            <label className="slider">
              <span>
                {t('cad.section')}
                <em>{Math.round(section * 100)}%</em>
              </span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={section}
                onChange={(e) => setSection(Number(e.target.value))}
              />
            </label>

            {error && <Badge tone="danger">{error}</Badge>}

            {info && (
              <Panel title={t('cad.dimensions')}>
                <ul className="readout">
                  <li>
                    <span>X</span>
                    <strong>{info.size.x.toFixed(1)} mm</strong>
                  </li>
                  <li>
                    <span>Y</span>
                    <strong>{info.size.y.toFixed(1)} mm</strong>
                  </li>
                  <li>
                    <span>Z</span>
                    <strong>{info.size.z.toFixed(1)} mm</strong>
                  </li>
                  <li>
                    <span>{t('cad.volume')}</span>
                    <strong>{info.volumeCm3.toFixed(2)} cm³</strong>
                  </li>
                  <li>
                    <span>△</span>
                    <strong>{info.triangles.toLocaleString()}</strong>
                  </li>
                </ul>
              </Panel>
            )}
          </div>
        </div>
      </Panel>
    </div>
  );
}

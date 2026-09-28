interface MeterProps {
  value: number;
  max: number;
  label: string;
  tone?: 'accent' | 'ok' | 'warn';
  showText?: boolean;
}

export function Meter({ value, max, label, tone = 'accent', showText = false }: MeterProps) {
  const safeMax = Number.isFinite(max) && max > 0 ? max : 0;
  const clamped = Math.max(0, Math.min(Number.isFinite(value) ? value : 0, safeMax));
  const pct = safeMax === 0 ? 0 : (clamped / safeMax) * 100;
  return (
    <div className="meter-wrap">
      <div
        className="meter"
        role="progressbar"
        aria-label={label}
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={safeMax}
      >
        <span className="meter__fill" data-tone={tone} style={{ width: `${pct}%` }} />
      </div>
      {showText && (
        <span className="meter__text">
          {Math.round(clamped)} / {safeMax}
        </span>
      )}
    </div>
  );
}

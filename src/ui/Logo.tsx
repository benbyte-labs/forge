/**
 * The FORGE mark: an anvil struck by a spark.
 *
 * Drawn from a handful of rounded shapes so it still reads at 20 px in the
 * sidebar and at 1024 px as the application icon, and so it inherits the
 * current theme rather than carrying baked-in colours.
 */
export function Logo({ size = 32, plain = false }: { size?: number; plain?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="FORGE"
      xmlns="http://www.w3.org/2000/svg"
    >
      {!plain && <rect width="64" height="64" rx="16" fill="var(--accent)" />}

      {/* The spark, struck above the anvil. */}
      <path
        d="M36 9 L31.5 20.5 L38 19 L33 31 L45 17.5 L38.5 19 L43 9 Z"
        fill="var(--accent-2)"
        stroke="var(--accent-2)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      {/* The anvil: face, horn, waist and base. */}
      <path
        d="M15 32 H46 C48 32 49 33.4 47.6 34.9 L44 38.5 H36.5 C36.5 42 38 44 40 45.6
           H24 C26 44 27.5 42 27.5 38.5 H22.5 C18 38.5 15 36 15 32 Z"
        fill={plain ? 'var(--accent)' : '#ffffff'}
        strokeLinejoin="round"
      />
      <rect
        x="19"
        y="46.5"
        width="26"
        height="6.5"
        rx="3.25"
        fill={plain ? 'var(--accent)' : '#ffffff'}
      />
    </svg>
  );
}

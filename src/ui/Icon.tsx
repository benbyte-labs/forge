const PATHS: Record<string, string> = {
  dashboard: 'M3 13h8V3H3v10Zm0 8h8v-6H3v6Zm10 0h8V11h-8v10Zm0-18v6h8V3h-8Z',
  track: 'M12 2 4 7v10l8 5 8-5V7l-8-5Zm0 2.3L18 8v8l-6 3.7L6 16V8l6-3.7Z',
  notebook: 'M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm2 5h8v2H8V7Zm0 4h8v2H8v-2Zm0 4h5v2H8v-2Z',
  reward: 'M12 2 9.2 8.2 2.5 9l4.9 4.6L6.1 20 12 16.8 17.9 20l-1.3-6.4L21.5 9l-6.7-.8L12 2Z',
  settings: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm9.4 4a7.5 7.5 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7.6 7.6 0 0 0-2-1.2L16.5 3h-4l-.4 2.6c-.7.3-1.4.7-2 1.2l-2.4-1-2 3.4 2 1.6a7.5 7.5 0 0 0 0 2.4l-2 1.6 2 3.4 2.4-1c.6.5 1.3.9 2 1.2l.4 2.6h4l.4-2.6c.7-.3 1.4-.7 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2Z',
  robot: 'M12 2a1 1 0 0 1 1 1v2h3a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h3V3a1 1 0 0 1 1-1ZM9 10a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm6 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm-6 6h6v1.5H9V16ZM3 10h1.5v5H3a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Zm16.5 0H21a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1.5v-5Z',
  physics: 'M12 10.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm0-8.5c2 0 3.2 1.7 3.6 4.3 2.5.6 4.4 1.9 4.4 3.7s-1.9 3.1-4.4 3.7C15.2 16.3 14 18 12 18s-3.2-1.7-3.6-4.3C5.9 13.1 4 11.8 4 10s1.9-3.1 4.4-3.7C8.8 3.7 10 2 12 2Z',
  cad: 'M4 4h16v4H4V4Zm0 6h7v10H4V10Zm9 0h7v10h-7V10Z',
  code: 'M8.5 7 4 12l4.5 5 1.5-1.4L6.9 12 10 8.4 8.5 7Zm7 0L14 8.4 17.1 12 14 15.6l1.5 1.4L20 12l-4.5-5Z',
  flame: 'M12 2s1 3.5-1.5 6C8 10.5 6 12.4 6 15a6 6 0 0 0 12 0c0-2.2-1-3.8-2.3-5.3C14.2 8 12 5.6 12 2Zm0 17a3 3 0 0 1-3-3c0-1.4 1-2.3 1.8-3.2.6.9 1.2 1.6 1.2 2.7 0-1.5 1.3-2.2 1.9-3.2.7 1 2.1 2.3 2.1 3.7a3 3 0 0 1-3 3Z',
  lock: 'M12 2a5 5 0 0 1 5 5v3h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3Z',
  check: 'm9.6 16.2-3.8-3.8L4.4 13.8l5.2 5.2L20 8.6 18.6 7.2 9.6 16.2Z',
  play: 'M8 5v14l11-7L8 5Z',
  search: 'M10 2a8 8 0 1 1-4.9 14.3l-3 3-1.4-1.4 3-3A8 8 0 0 1 10 2Zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z',
};

interface IconProps {
  name: keyof typeof PATHS | string;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 20, className = '' }: IconProps) {
  const d = PATHS[name];
  if (!d) return null;
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} />
    </svg>
  );
}

export const ICON_NAMES = Object.keys(PATHS);

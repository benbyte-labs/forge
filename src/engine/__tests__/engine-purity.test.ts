import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const DIR = join(dirname(fileURLToPath(import.meta.url)), '..');
const BANNED: [RegExp, string][] = [
  [/from ['"]react/, 'React'],
  [/from ['"]three/, 'Three.js'],
  [/from ['"]@tauri-apps/, 'a static Tauri import'],
  [/\bdocument\./, 'the DOM'],
  [/\bwindow\./, 'the window object'],
];

describe('engine purity', () => {
  const files = readdirSync(DIR).filter((f) => f.endsWith('.ts'));

  it('finds engine modules to check', () => {
    expect(files.length).toBeGreaterThan(3);
  });

  for (const file of files) {
    it(`${file} depends on no UI or platform code`, () => {
      const src = readFileSync(join(DIR, file), 'utf8');
      for (const [pattern, what] of BANNED) {
        expect(pattern.test(src), `${file} reaches for ${what}`).toBe(false);
      }
    });
  }
});

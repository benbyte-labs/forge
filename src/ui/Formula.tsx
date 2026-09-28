import { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface FormulaProps {
  tex: string;
  display?: boolean;
}

/**
 * Render a TeX formula. `throwOnError: false` means a typo in the content
 * shows up as red source text in place of the formula, rather than taking the
 * whole lesson page down with it.
 */
export function Formula({ tex, display = true }: FormulaProps) {
  const html = useMemo(
    () => katex.renderToString(tex, { displayMode: display, throwOnError: false, output: 'html' }),
    [tex, display],
  );
  return <span className="formula" dangerouslySetInnerHTML={{ __html: html }} />;
}

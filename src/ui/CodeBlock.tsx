interface CodeBlockProps {
  src: string;
  lang?: string;
  /** Shown under the code — an explanation belongs after what it explains. */
  label?: string;
}

export function CodeBlock({ src, lang, label }: CodeBlockProps) {
  return (
    <figure className="codeblock">
      <div className="codeblock__bar">
        <span className="codeblock__lang">{lang ?? 'text'}</span>
      </div>
      <pre>
        <code>{src}</code>
      </pre>
      {label && <figcaption className="codeblock__label">{label}</figcaption>}
    </figure>
  );
}

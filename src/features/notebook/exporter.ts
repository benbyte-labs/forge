/**
 * Hand a text file to the learner.
 *
 * In the desktop shell this opens a real save dialog and writes the file. In a
 * plain browser it falls back to a download, so the same button works in dev.
 */
export async function saveTextFile(suggestedName: string, text: string): Promise<string | null> {
  if ('__TAURI_INTERNALS__' in globalThis) {
    const [{ save }, { invoke }] = await Promise.all([
      import('@tauri-apps/plugin-dialog'),
      import('@tauri-apps/api/core'),
    ]);
    const path = await save({ defaultPath: suggestedName, filters: [{ name: 'Markdown', extensions: ['md'] }] });
    if (!path) return null;
    await invoke('export_text', { path, text });
    return path;
  }

  const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = suggestedName;
  a.click();
  URL.revokeObjectURL(url);
  return suggestedName;
}

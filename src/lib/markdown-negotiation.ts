export function acceptsMarkdown(accept: string | null): boolean {
  return (accept ?? '').split(',').some((range) => {
    const [type, ...parameters] = range.trim().toLowerCase().split(';');
    if (type?.trim() !== 'text/markdown') return false;
    const quality = parameters.find((parameter) => parameter.trim().startsWith('q='));
    if (!quality) return true;
    const value = Number(quality.trim().slice(2));
    return Number.isFinite(value) && value > 0 && value <= 1;
  });
}

export function varyAccept(headers: Headers): void {
  const vary = headers.get('Vary');
  if (vary?.split(',').some((value) => ['*', 'accept'].includes(value.trim().toLowerCase()))) return;
  headers.set('Vary', vary ? `${vary}, Accept` : 'Accept');
}

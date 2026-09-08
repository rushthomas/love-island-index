/** Mixes a hex color toward white by `amount` (0-1). Used for tinted chips/backgrounds. */
export function tint(hex: string, amount: number): string {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const mix = (channel: number) => Math.round(channel + (255 - channel) * amount);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

/** Deterministic small rotation (-4..4 deg) from a string, so stickers look hand-placed but stay stable. */
export function hashRotation(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) & 0xffffffff;
  }
  return (Math.abs(hash) % 9) - 4;
}

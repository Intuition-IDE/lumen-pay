/** Tiny time helpers for the dashboard. Pure, no deps. */

const MS = { m: 60_000, h: 3_600_000, d: 86_400_000 }

/** "9:41 AM" */
export function clock(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
}

/** "6m", "1h", "3d" — compact relative age from now. */
export function ago(iso: string, now = Date.now()): string {
  const diff = now - new Date(iso).getTime()
  if (diff < MS.h) return `${Math.max(1, Math.round(diff / MS.m))}m`
  if (diff < MS.d) return `${Math.round(diff / MS.h)}h`
  return `${Math.round(diff / MS.d)}d`
}

/** "Jun 24" */
export function shortDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

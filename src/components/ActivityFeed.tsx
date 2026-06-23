/** Right-hand timeline of recent account events. */
import type { ActivityEvent } from '../types'

const TONE: Record<ActivityEvent['kind'], string> = {
  payout: 'var(--jade)',
  dispute: 'var(--coral)',
  payment: 'var(--iris)',
  webhook: 'var(--amber)',
  system: 'var(--text-faint)',
}

interface Props {
  events: ActivityEvent[]
  loading: boolean
}

export function ActivityFeed({ events, loading }: Props) {
  return (
    <section className="card feed rise" style={{ animationDelay: '180ms' }}>
      <div className="card__head">
        <h3>Activity</h3>
        <a className="link right" href="#">View all</a>
      </div>
      <div>
        {loading && <div style={{ padding: 20, color: 'var(--text-faint)' }}>Loading…</div>}
        {events.map((e) => (
          <div key={e.id} className="feed__item">
            <span className="feed__dot" style={{ background: TONE[e.kind], boxShadow: `0 0 8px ${TONE[e.kind]}` }} />
            <div className="feed__body">
              <b>{e.title}</b>
              <p>{e.detail}</p>
            </div>
            <span className="feed__time">{e.at}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

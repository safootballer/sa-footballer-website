// ─────────────────────────────────────────────────────────────
// WEBSITE FILE — put this in your website repo at:
//   components/SuperSaverContent.js
// Change DASHBOARD_API to your Render dashboard URL once deployed.
// ─────────────────────────────────────────────────────────────
'use client'
import { useState, useEffect, useMemo } from 'react'

const DASHBOARD_API = 'https://supersaver-dashboard.onrender.com'

const CATEGORIES = [
  'Accommodation and Travel',
  'Accounting and Bookkeeping',
  'Architect and Design',
  'Automotive Services',
  'Beauticians',
  'Business Consultants',
  'Carpenters',
  'Catering',
  'Cleaning Services',
  'Courier Freight and Removals',
  'Conveyancers',
  'Eating Out',
  'Electricians',
  'Electronics and Supplies',
  'Financial Services',
  'Fitness',
  'Hairdressing',
  'Health and Well Being',
  'Home and Garden',
  'Kitchen',
  'Medical Services',
  'Pest Control',
  'Pet Care',
  'Photography and Video',
  'Plumbers',
  'Professional Services',
  'Real Estate',
  'Telecommunications',
  'Trades People',
  'Sporting Goods',
  'Website Design',
]

export default function SuperSaverContent() {
  const [active, setActive] = useState('ALL')
  const [coupons, setCoupons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    let alive = true
    setLoading(true)
    setError(false)
    const url = active === 'ALL'
      ? `${DASHBOARD_API}/api/coupons`
      : `${DASHBOARD_API}/api/coupons?category=${encodeURIComponent(active)}`
    fetch(url)
      .then((r) => r.json())
      .then((d) => { if (alive) setCoupons(Array.isArray(d) ? d : []) })
      .catch(() => { if (alive) setError(true) })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [active])

  // count per category for the tab badges (fetched once, from ALL)
  const [counts, setCounts] = useState({})
  useEffect(() => {
    fetch(`${DASHBOARD_API}/api/coupons`)
      .then((r) => r.json())
      .then((d) => {
        if (!Array.isArray(d)) return
        const c = {}
        d.forEach((x) => { c[x.category] = (c[x.category] || 0) + 1 })
        setCounts(c)
      })
      .catch(() => {})
  }, [])

  const tabs = useMemo(() => ['ALL', ...CATEGORIES], [])

  async function download(coupon) {
    try {
      const res = await fetch(coupon.imageUrl)
      const blob = await res.blob()
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = `${(coupon.business || 'coupon').replace(/[^a-z0-9]+/gi, '-')}.png`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(a.href)
    } catch {
      window.open(coupon.imageUrl, '_blank')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: "'Barlow', system-ui, sans-serif" }}>
      {/* Hero */}
      <div style={{
        padding: '3.5rem 1.25rem 2rem', textAlign: 'center',
        backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(44,163,238,0.18) 0%, transparent 60%)',
      }}>
        <div style={{
          display: 'inline-block', background: '#e6fe00', color: '#000',
          fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800,
          fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase',
          padding: '4px 14px', borderRadius: 20, marginBottom: '1rem',
        }}>Local Partner Offers</div>
        <h1 style={{
          fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900,
          fontSize: 'clamp(2.4rem, 6vw, 4rem)', lineHeight: 1, margin: 0,
          textTransform: 'uppercase', color: '#fff',
        }}>
          Super Saver <span style={{ color: '#2ca3ee' }}>Deals</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 560, margin: '1rem auto 0', fontSize: '1rem' }}>
          Exclusive discounts and coupons from our local partners across South Australia. Tap a category to browse, then tap a card to enlarge or download.
        </p>
      </div>

      {/* Category tabs */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.25rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }}>
          {tabs.map((t) => {
            const isActive = active === t
            const n = t === 'ALL' ? null : counts[t]
            return (
              <button key={t} onClick={() => setActive(t)} style={{
                padding: '0.5rem 1rem', borderRadius: 999,
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
                fontSize: '0.8rem', letterSpacing: '0.04em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap',
                border: isActive ? '1.5px solid #2ca3ee' : '1.5px solid rgba(44,163,238,0.25)',
                background: isActive ? 'rgba(44,163,238,0.18)' : 'transparent',
                color: isActive ? '#2ca3ee' : 'rgba(255,255,255,0.6)',
              }}>
                {t}{n ? <span style={{ opacity: 0.6, marginLeft: 6 }}>{n}</span> : null}
              </button>
            )
          })}
        </div>

        {/* Grid */}
        {loading ? (
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: '3rem' }}>Loading deals…</p>
        ) : error ? (
          <p style={{ textAlign: 'center', color: '#f87171', padding: '3rem' }}>
            Couldn’t load deals right now. Please try again shortly.
          </p>
        ) : coupons.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'rgba(255,255,255,0.45)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🎟️</div>
            <p style={{ fontSize: '1.05rem' }}>
              No deals in <strong style={{ color: '#fff' }}>{active === 'ALL' ? 'any category' : active}</strong> yet.
            </p>
            <p style={{ fontSize: '0.85rem', marginTop: '0.4rem' }}>Check back soon — new offers are added regularly.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
            gap: '1.5rem', paddingBottom: '4rem',
          }}>
            {coupons.map((c) => (
              <div key={c.id} onClick={() => setLightbox(c)} style={{
                background: 'rgba(11,21,32,0.8)', border: '1px solid rgba(44,163,238,0.22)',
                borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
                transition: 'transform 0.15s, border-color 0.15s',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#2ca3ee' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(44,163,238,0.22)' }}
              >
                <div style={{ background: '#000' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.imageUrl} alt={c.title || c.business || 'Deal'} loading="lazy"
                    style={{ width: '100%', display: 'block' }} />
                </div>
                <div style={{ padding: '0.8rem' }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#fff', lineHeight: 1.2 }}>
                    {c.business || 'Local Partner'}
                  </div>
                  {c.title && <div style={{ fontSize: '0.8rem', color: '#e6fe00', marginTop: 3 }}>{c.title}</div>}
                  {active === 'ALL' && (
                    <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', marginTop: 5, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {c.category}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: 560, width: '100%', textAlign: 'center' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={lightbox.imageUrl} alt={lightbox.business || 'Deal'}
              style={{ maxWidth: '100%', maxHeight: '72vh', borderRadius: 14, border: '1px solid rgba(44,163,238,0.3)' }} />
            <div style={{ marginTop: '1rem' }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.3rem', color: '#fff' }}>
                {lightbox.business || 'Local Partner'}
              </div>
              {lightbox.title && <div style={{ color: '#e6fe00', fontSize: '0.95rem', marginTop: 2 }}>{lightbox.title}</div>}
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
                <button onClick={() => download(lightbox)} style={{
                  background: '#e6fe00', color: '#000', border: 'none', borderRadius: 9,
                  fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '0.9rem',
                  letterSpacing: '0.06em', textTransform: 'uppercase', padding: '0.6rem 1.4rem', cursor: 'pointer',
                }}>↓ Download</button>
                {lightbox.website && (
                  <a href={lightbox.website} target="_blank" rel="noopener noreferrer" style={{
                    background: 'linear-gradient(135deg, #2ca3ee, #00b8f1)', color: '#fff', textDecoration: 'none',
                    borderRadius: 9, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '0.9rem',
                    letterSpacing: '0.06em', textTransform: 'uppercase', padding: '0.6rem 1.4rem',
                  }}>Visit Website</a>
                )}
                <button onClick={() => setLightbox(null)} style={{
                  background: 'transparent', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 9, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: '0.85rem',
                  letterSpacing: '0.06em', textTransform: 'uppercase', padding: '0.6rem 1.2rem', cursor: 'pointer',
                }}>Close</button>
              </div>
              {lightbox.phone && (
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: '0.75rem' }}>
                  📞 {lightbox.phone}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

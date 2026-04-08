// sanity/plugins/sendMagazine/SendMagazineTool.jsx

import { useState } from 'react'

const API_URL = 'https://www.safootballer.com.au/api/send-magazine'
const ACCENT  = '#2ca3ee'
const YELLOW  = '#e6fe00'

const s = {
  wrap:      { maxWidth: 680, margin: '32px auto', padding: '0 20px', fontFamily: 'sans-serif' },
  heading:   { fontSize: '1.6rem', fontWeight: 900, color: '#0a1a2e', margin: '0 0 4px' },
  sub:       { color: '#64748b', fontSize: '0.9rem', margin: '0 0 28px' },
  infoBox:   { background: '#f0f9ff', border: `1px solid #bae6fd`,
               borderRadius: 10, padding: '14px 18px', marginBottom: 20 },
  infoTitle: { fontWeight: 700, color: '#0369a1', fontSize: '0.85rem', margin: '0 0 6px' },
  infoList:  { margin: 0, padding: '0 0 0 16px', color: '#475569',
               fontSize: '0.82rem', lineHeight: 1.8 },
  secretWrap:{ background: '#fff7ed', border: '2px solid #fed7aa',
               borderRadius: 10, padding: 16, marginBottom: 16 },
  editionWrap:{ background: '#f0fdf4', border: '2px solid #86efac',
               borderRadius: 10, padding: 16, marginBottom: 16 },
  overrideWrap:{ background: '#fafafa', border: '1px solid #e2e8f0',
               borderRadius: 10, padding: 16, marginBottom: 20 },
  label:     { display: 'block', fontWeight: 700, fontSize: '0.78rem',
               color: '#374151', marginBottom: 4 },
  input:     { width: '100%', padding: '9px 12px', border: '2px solid #e2e8f0',
               borderRadius: 8, fontSize: '0.88rem', color: '#0f172a',
               boxSizing: 'border-box', fontFamily: 'sans-serif',
               outline: 'none', marginBottom: 12 },
  hint:      { fontSize: '0.72rem', color: '#94a3b8',
               marginTop: -8, marginBottom: 12, display: 'block' },
  toggle:    { background: 'none', border: 'none', color: ACCENT,
               fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer',
               padding: 0, marginBottom: 12 },
  btn:       { width: '100%', padding: '14px', background: YELLOW,
               color: '#000', border: 'none', borderRadius: 50,
               fontWeight: 900, fontSize: '1rem', cursor: 'pointer' },
  btnDis:    { width: '100%', padding: '14px', background: '#d1d5db',
               color: '#6b7280', border: 'none', borderRadius: 50,
               fontWeight: 900, fontSize: '1rem', cursor: 'not-allowed' },
  error:     { background: '#fef2f2', border: '1px solid #fca5a5',
               borderRadius: 8, padding: '10px 14px', color: '#dc2626',
               fontSize: '0.82rem', marginBottom: 14 },
  success:   { background: '#f0fdf4', border: '2px solid #86efac',
               borderRadius: 12, padding: 32, textAlign: 'center' },
  statsRow:  { display: 'flex', justifyContent: 'center', gap: 32, margin: '16px 0' },
  statNum:   { fontSize: '2.5rem', fontWeight: 900, color: ACCENT },
  statLbl:   { fontSize: '0.78rem', color: '#64748b' },
  grid:      { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
}

export default function SendMagazineTool() {
  const [secret, setSecret]             = useState('')
  const [editionLabel, setEditionLabel] = useState('')
  const [showOverrides, setShowOverrides] = useState(false)
  const [pdfUrls, setPdfUrls]           = useState({
    saFootballer: '', ammoFooty: '', womensFooty: '', countryFooty: ''
  })
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)

  const updatePdf = (key, val) =>
    setPdfUrls(prev => ({ ...prev, [key]: val }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setResult(null)

    try {
      const res = await fetch(API_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ secret, editionLabel, pdfUrls }),
      })
      const data = await res.json()

      if (res.ok && data.success) {
        setStatus('success')
        setResult(data)
      } else {
        setStatus('error')
        setResult(data)
      }
    } catch {
      setStatus('error')
      setResult({ error: 'Network error. Please try again.' })
    }
  }

  const reset = () => {
    setStatus('idle')
    setResult(null)
    setEditionLabel('')
    setPdfUrls({ saFootballer: '', ammoFooty: '', womensFooty: '', countryFooty: '' })
  }

  if (status === 'success' && result) {
    return (
      <div style={s.wrap}>
        <div style={s.success}>
          <div style={{ fontSize: '3rem', marginBottom: 8 }}>🎉</div>
          <h2 style={{ margin: '0 0 8px', color: '#16a34a', fontSize: '1.4rem', fontWeight: 800 }}>
            Magazines Sent!
          </h2>
          <p style={{ color: '#475569', margin: '0 0 12px', fontSize: '0.95rem' }}>
            {result.message}
          </p>
          <div style={s.statsRow}>
            <div style={{ textAlign: 'center' }}>
              <div style={s.statNum}>{result.sent}</div>
              <div style={s.statLbl}>Sent ✅</div>
            </div>
            {result.failed > 0 && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ ...s.statNum, color: '#ef4444' }}>{result.failed}</div>
                <div style={s.statLbl}>Failed ❌</div>
              </div>
            )}
            <div style={{ textAlign: 'center' }}>
              <div style={{ ...s.statNum, color: '#64748b' }}>{result.total}</div>
              <div style={s.statLbl}>Total</div>
            </div>
          </div>
          <button onClick={reset} style={s.btn}>Send Another Edition</button>
        </div>
      </div>
    )
  }

  return (
    <div style={s.wrap}>
      <h1 style={s.heading}>📨 Send Weekly Editions</h1>
      <p style={s.sub}>Send all 4 magazines to every active subscriber at once</p>

      {/* Info */}
      <div style={s.infoBox}>
        <p style={s.infoTitle}>ℹ️ How this works</p>
        <ul style={s.infoList}>
          <li>Cover images are pulled automatically from the latest magazines in Sanity</li>
          <li>PDF links are also pulled from Sanity automatically</li>
          <li>You can override any PDF link below if needed</li>
          <li>Email is sent to all active subscribers</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit}>

        {/* Secret */}
        <div style={s.secretWrap}>
          <label style={{ ...s.label, color: '#92400e' }}>🔑 Secret Key *</label>
          <input
            style={{ ...s.input, marginBottom: 0 }}
            type="password"
            placeholder="Enter SEND_MAGAZINE_SECRET"
            value={secret}
            onChange={e => setSecret(e.target.value)}
            required
            disabled={status === 'loading'}
          />
        </div>

        {/* Edition label */}
        <div style={s.editionWrap}>
          <label style={{ ...s.label, color: '#166534' }}>📅 Edition Label *</label>
          <input
            style={{ ...s.input, marginBottom: 4 }}
            type="text"
            placeholder="e.g. Edition 05 — Round 5, 2026"
            value={editionLabel}
            onChange={e => setEditionLabel(e.target.value)}
            required
            disabled={status === 'loading'}
          />
          <span style={{ ...s.hint, marginTop: 0, marginBottom: 0 }}>
            Used as the email subject and heading inside the email
          </span>
        </div>

        {/* Optional PDF overrides */}
        <div style={s.overrideWrap}>
          <button
            type="button"
            style={s.toggle}
            onClick={() => setShowOverrides(v => !v)}
          >
            {showOverrides ? '▲ Hide' : '▼ Show'} PDF URL overrides (optional)
          </button>
          <span style={{ ...s.hint, marginBottom: 0 }}>
            Leave blank to use PDF links already saved in Sanity
          </span>

          {showOverrides && (
            <div style={{ marginTop: 12 }}>
              <div style={s.grid}>
                <div>
                  <label style={s.label}>📰 SA Footballer PDF</label>
                  <input style={s.input} type="url" placeholder="https://..."
                    value={pdfUrls.saFootballer}
                    onChange={e => updatePdf('saFootballer', e.target.value)}
                    disabled={status === 'loading'} />
                </div>
                <div>
                  <label style={s.label}>💰 Ammo Footy Budget PDF</label>
                  <input style={s.input} type="url" placeholder="https://..."
                    value={pdfUrls.ammoFooty}
                    onChange={e => updatePdf('ammoFooty', e.target.value)}
                    disabled={status === 'loading'} />
                </div>
                <div>
                  <label style={s.label}>👩 Women's Footy Budget PDF</label>
                  <input style={s.input} type="url" placeholder="https://..."
                    value={pdfUrls.womensFooty}
                    onChange={e => updatePdf('womensFooty', e.target.value)}
                    disabled={status === 'loading'} />
                </div>
                <div>
                  <label style={s.label}>🌾 Country Footy Budget PDF</label>
                  <input style={s.input} type="url" placeholder="https://..."
                    value={pdfUrls.countryFooty}
                    onChange={e => updatePdf('countryFooty', e.target.value)}
                    disabled={status === 'loading'} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Error */}
        {status === 'error' && result && (
          <div style={s.error}>⚠️ {result.error || 'Something went wrong.'}</div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          style={status === 'loading' ? s.btnDis : s.btn}
        >
          {status === 'loading'
            ? '⏳ Sending to all subscribers…'
            : '📨 Send All Magazines to Subscribers'}
        </button>

      </form>
    </div>
  )
}
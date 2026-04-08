// sanity/plugins/sendMagazine/SendMagazineTool.jsx

import { useState, useRef } from 'react'

const API_URL = 'https://www.safootballer.com.au/api/send-magazine'

const MAGAZINE_DEFAULTS = [
  { label: 'The South Australian Footballer', placeholder: 'SA Footballer Edition 05' },
  { label: 'The SA Ammo Footy Budget',        placeholder: 'Ammo Footy Budget Edition 05' },
  { label: 'The SA Women\'s Footy Budget',    placeholder: 'Women\'s Footy Budget Edition 05' },
  { label: 'The SA Country Footy Budget',     placeholder: 'Country Footy Budget Edition 05' },
]

const ACCENT = '#2ca3ee'
const YELLOW = '#e6fe00'

const s = {
  wrap:       { maxWidth: 700, margin: '32px auto', padding: '0 20px', fontFamily: 'sans-serif' },
  heading:    { fontSize: '1.6rem', fontWeight: 900, color: '#0a1a2e', margin: '0 0 4px' },
  sub:        { color: '#64748b', fontSize: '0.9rem', margin: '0 0 28px' },
  card:       { background: '#fff', border: '2px solid #e2e8f0', borderRadius: 12,
                padding: '20px', marginBottom: 20 },
  cardTitle:  { fontWeight: 800, color: ACCENT, fontSize: '0.95rem', margin: '0 0 14px',
                borderBottom: `2px solid ${ACCENT}`, paddingBottom: 8 },
  row:        { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 },
  label:      { display: 'block', fontWeight: 700, fontSize: '0.78rem',
                color: '#374151', marginBottom: 4 },
  input:      { width: '100%', padding: '9px 12px', border: '2px solid #e2e8f0',
                borderRadius: 8, fontSize: '0.88rem', color: '#0f172a',
                boxSizing: 'border-box', fontFamily: 'sans-serif', outline: 'none' },
  uploadBtn:  { display: 'inline-block', padding: '8px 16px', background: '#f0f9ff',
                border: `2px dashed ${ACCENT}`, borderRadius: 8, cursor: 'pointer',
                fontSize: '0.8rem', color: ACCENT, fontWeight: 700, textAlign: 'center',
                width: '100%', boxSizing: 'border-box' },
  preview:    { width: '100%', height: 120, objectFit: 'cover',
                borderRadius: 8, marginTop: 8 },
  secretWrap: { background: '#fff7ed', border: '2px solid #fed7aa',
                borderRadius: 10, padding: 16, marginBottom: 20 },
  editionWrap:{ background: '#f0fdf4', border: '2px solid #86efac',
                borderRadius: 10, padding: 16, marginBottom: 20 },
  btn:        { width: '100%', padding: '14px', background: YELLOW, color: '#000',
                border: 'none', borderRadius: 50, fontWeight: 900,
                fontSize: '1rem', cursor: 'pointer', letterSpacing: '0.03em' },
  btnDis:     { width: '100%', padding: '14px', background: '#d1d5db', color: '#6b7280',
                border: 'none', borderRadius: 50, fontWeight: 900,
                fontSize: '1rem', cursor: 'not-allowed', letterSpacing: '0.03em' },
  error:      { background: '#fef2f2', border: '1px solid #fca5a5',
                borderRadius: 8, padding: '10px 14px', color: '#dc2626',
                fontSize: '0.82rem', marginBottom: 14 },
  success:    { background: '#f0fdf4', border: '2px solid #86efac',
                borderRadius: 12, padding: 32, textAlign: 'center' },
  statsRow:   { display: 'flex', justifyContent: 'center', gap: 32, margin: '16px 0' },
  statNum:    { fontSize: '2.5rem', fontWeight: 900, color: ACCENT },
  statLbl:    { fontSize: '0.78rem', color: '#64748b' },
}

function MagazineCard({ index, data, onChange }) {
  const fileRef = useRef()

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const base64 = ev.target.result.split(',')[1]
      onChange(index, { coverBase64: base64, coverMime: file.type, coverPreview: ev.target.result })
    }
    reader.readAsDataURL(file)
  }

  return (
    <div style={s.card}>
      <p style={s.cardTitle}>
        {['📰', '💰', '👩', '🌾'][index]} {MAGAZINE_DEFAULTS[index].label}
      </p>

      <div style={s.row}>
        <div>
          <label style={s.label}>Magazine Title</label>
          <input
            style={s.input}
            type="text"
            placeholder={MAGAZINE_DEFAULTS[index].placeholder}
            value={data.title}
            onChange={e => onChange(index, { title: e.target.value })}
          />
        </div>
        <div>
          <label style={s.label}>PDF Download URL</label>
          <input
            style={s.input}
            type="url"
            placeholder="https://..."
            value={data.url}
            onChange={e => onChange(index, { url: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label style={s.label}>Cover Image (optional)</label>
        <div style={s.uploadBtn} onClick={() => fileRef.current.click()}>
          {data.coverPreview ? '🔄 Change Cover Image' : '📷 Upload Cover Image'}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFile}
        />
        {data.coverPreview && (
          <img src={data.coverPreview} alt="Cover preview" style={s.preview} />
        )}
      </div>
    </div>
  )
}

export default function SendMagazineTool() {
  const [secret, setSecret]           = useState('')
  const [editionLabel, setEditionLabel] = useState('')
  const [magazines, setMagazines]     = useState([
    { title: '', url: '', coverBase64: '', coverMime: '', coverPreview: '' },
    { title: '', url: '', coverBase64: '', coverMime: '', coverPreview: '' },
    { title: '', url: '', coverBase64: '', coverMime: '', coverPreview: '' },
    { title: '', url: '', coverBase64: '', coverMime: '', coverPreview: '' },
  ])
  const [status, setStatus]   = useState('idle')
  const [result, setResult]   = useState(null)

  const updateMag = (index, fields) => {
    setMagazines(prev => prev.map((m, i) => i === index ? { ...m, ...fields } : m))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setResult(null)

    // Strip preview URLs before sending (not needed in API)
    const payload = {
      secret,
      editionLabel,
      magazines: magazines.map(({ coverPreview, ...rest }) => rest),
    }

    try {
      const res  = await fetch(API_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
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
    setMagazines([
      { title: '', url: '', coverBase64: '', coverMime: '', coverPreview: '' },
      { title: '', url: '', coverBase64: '', coverMime: '', coverPreview: '' },
      { title: '', url: '', coverBase64: '', coverMime: '', coverPreview: '' },
      { title: '', url: '', coverBase64: '', coverMime: '', coverPreview: '' },
    ])
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

      <form onSubmit={handleSubmit}>

        {/* Secret key */}
        <div style={s.secretWrap}>
          <label style={{ ...s.label, color: '#92400e' }}>🔑 Secret Key *</label>
          <input
            style={s.input}
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
            style={s.input}
            type="text"
            placeholder="e.g. Edition 05 — Round 5, 2026"
            value={editionLabel}
            onChange={e => setEditionLabel(e.target.value)}
            required
            disabled={status === 'loading'}
          />
          <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 4, display: 'block' }}>
            This appears as the email subject and edition heading
          </span>
        </div>

        {/* 4 magazine cards */}
        {magazines.map((mag, i) => (
          <MagazineCard
            key={i}
            index={i}
            data={mag}
            onChange={updateMag}
          />
        ))}

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
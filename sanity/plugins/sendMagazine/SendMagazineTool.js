// sanity/plugins/sendMagazine/SendMagazineTool.jsx
// Sanity Studio custom tool — appears in the Studio sidebar

import { useState } from 'react'

const API_URL = 'https://www.safootballer.com.au/api/send-magazine'

const styles = {
  container: {
    maxWidth: '640px',
    margin:   '40px auto',
    padding:  '0 24px',
    fontFamily: 'sans-serif',
  },
  header: {
    borderBottom: '3px solid #2ca3ee',
    paddingBottom: '16px',
    marginBottom: '32px',
  },
  title: {
    margin:     0,
    fontSize:   '1.8rem',
    fontWeight: 900,
    color:      '#0a1a2e',
  },
  subtitle: {
    margin:    '6px 0 0',
    color:     '#64748b',
    fontSize:  '0.95rem',
  },
  infoBox: {
    background:   '#f0f9ff',
    border:       '1px solid #bae6fd',
    borderRadius: '10px',
    padding:      '16px 20px',
    marginBottom: '28px',
  },
  infoTitle: {
    margin:     '0 0 8px',
    color:      '#0369a1',
    fontWeight: 700,
    fontSize:   '0.9rem',
  },
  infoList: {
    margin:     0,
    padding:    '0 0 0 18px',
    color:      '#475569',
    fontSize:   '0.85rem',
    lineHeight: 1.8,
  },
  label: {
    display:      'block',
    fontWeight:   700,
    fontSize:     '0.85rem',
    color:        '#374151',
    marginBottom: '6px',
  },
  input: {
    width:        '100%',
    padding:      '11px 14px',
    border:       '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize:     '0.95rem',
    color:        '#0f172a',
    outline:      'none',
    boxSizing:    'border-box',
    marginBottom: '20px',
    fontFamily:   'sans-serif',
  },
  hint: {
    display:    'block',
    fontSize:   '0.75rem',
    color:      '#94a3b8',
    marginTop:  '-14px',
    marginBottom: '20px',
  },
  button: {
    width:         '100%',
    padding:       '14px',
    background:    '#e6fe00',
    color:         '#000',
    border:        'none',
    borderRadius:  '50px',
    fontWeight:    800,
    fontSize:      '1rem',
    cursor:        'pointer',
    letterSpacing: '0.03em',
  },
  buttonDisabled: {
    width:         '100%',
    padding:       '14px',
    background:    '#d1d5db',
    color:         '#6b7280',
    border:        'none',
    borderRadius:  '50px',
    fontWeight:    800,
    fontSize:      '1rem',
    cursor:        'not-allowed',
    letterSpacing: '0.03em',
  },
  successBox: {
    background:   '#f0fdf4',
    border:       '2px solid #86efac',
    borderRadius: '12px',
    padding:      '32px',
    textAlign:    'center',
  },
  errorBox: {
    background:   '#fef2f2',
    border:       '1px solid #fca5a5',
    borderRadius: '8px',
    padding:      '12px 16px',
    color:        '#dc2626',
    fontSize:     '0.85rem',
    marginBottom: '16px',
  },
  statsRow: {
    display:        'flex',
    justifyContent: 'center',
    gap:            '32px',
    margin:         '20px 0',
  },
  statItem: {
    textAlign: 'center',
  },
  statNum: {
    fontSize:   '2.5rem',
    fontWeight: 900,
    color:      '#2ca3ee',
  },
  statLabel: {
    fontSize: '0.8rem',
    color:    '#64748b',
  },
}

export default function SendMagazineTool() {
  const [form, setForm]     = useState({ secret: '', magazineTitle: '', magazineUrl: '' })
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setResult(null)

    try {
      const res = await fetch(API_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
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
      setResult({ error: 'Network error. Check your connection and try again.' })
    }
  }

  const reset = () => {
    setStatus('idle')
    setResult(null)
    setForm(prev => ({ ...prev, magazineTitle: '', magazineUrl: '' }))
  }

  return (
    <div style={styles.container}>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>📨 Send Magazine</h1>
        <p style={styles.subtitle}>Send the latest edition to all active subscribers</p>
      </div>

      {/* Info box */}
      <div style={styles.infoBox}>
        <p style={styles.infoTitle}>ℹ️ How this works</p>
        <ul style={styles.infoList}>
          <li>Fetches all <strong>active</strong> subscribers from Sanity</li>
          <li>Sends a branded email to each one with the magazine PDF link</li>
          <li>Shows sent / failed counts when complete</li>
        </ul>
      </div>

      {status === 'success' && result ? (
        /* Success state */
        <div style={styles.successBox}>
          <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🎉</div>
          <h2 style={{ margin: '0 0 8px', color: '#16a34a', fontSize: '1.4rem', fontWeight: 800 }}>
            Magazine Sent!
          </h2>
          <p style={{ color: '#475569', margin: '0 0 16px', fontSize: '0.95rem' }}>
            {result.message}
          </p>
          <div style={styles.statsRow}>
            <div style={styles.statItem}>
              <div style={styles.statNum}>{result.sent}</div>
              <div style={styles.statLabel}>Sent ✅</div>
            </div>
            {result.failed > 0 && (
              <div style={styles.statItem}>
                <div style={{ ...styles.statNum, color: '#ef4444' }}>{result.failed}</div>
                <div style={styles.statLabel}>Failed ❌</div>
              </div>
            )}
            <div style={styles.statItem}>
              <div style={{ ...styles.statNum, color: '#64748b' }}>{result.total}</div>
              <div style={styles.statLabel}>Total</div>
            </div>
          </div>
          <button onClick={reset} style={styles.button}>
            Send Another Edition
          </button>
        </div>
      ) : (
        /* Form */
        <form onSubmit={handleSubmit}>

          {/* Secret */}
          <label style={styles.label}>🔑 Secret Key *</label>
          <input
            type="password"
            name="secret"
            value={form.secret}
            onChange={handleChange}
            placeholder="Enter SEND_MAGAZINE_SECRET"
            required
            disabled={status === 'loading'}
            style={styles.input}
          />

          {/* Title */}
          <label style={styles.label}>📰 Magazine Title *</label>
          <input
            type="text"
            name="magazineTitle"
            value={form.magazineTitle}
            onChange={handleChange}
            placeholder="e.g. SA Footballer — Round 5, 2026"
            required
            disabled={status === 'loading'}
            style={styles.input}
          />

          {/* URL */}
          <label style={styles.label}>🔗 Magazine PDF URL *</label>
          <input
            type="url"
            name="magazineUrl"
            value={form.magazineUrl}
            onChange={handleChange}
            placeholder="https://..."
            required
            disabled={status === 'loading'}
            style={styles.input}
          />
          <span style={styles.hint}>Paste the PDF link from Sanity or your file storage</span>

          {/* Error */}
          {status === 'error' && result && (
            <div style={styles.errorBox}>
              ⚠️ {result.error || 'Something went wrong. Please try again.'}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            style={status === 'loading' ? styles.buttonDisabled : styles.button}
          >
            {status === 'loading' ? '⏳ Sending to all subscribers…' : '📨 Send to All Subscribers'}
          </button>
        </form>
      )}
    </div>
  )
}
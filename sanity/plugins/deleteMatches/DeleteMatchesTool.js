// sanity/plugins/deleteMatches/DeleteMatchesTool.js

import { useState } from 'react'
import { useClient } from 'sanity'

const ACCENT = '#2ca3ee'
const RED    = '#dc2626'

const COMPETITIONS = [
  { id: 'all',              label: 'ALL COMPETITIONS',   color: RED,    query: '*[_type == "matchResult"]' },
  { id: 'AFL',              label: 'AFL',                color: ACCENT, query: '*[_type == "matchResult" && competition == "AFL"]' },
  { id: 'AFLW',             label: 'AFLW',               color: ACCENT, query: '*[_type == "matchResult" && competition == "AFLW"]' },
  { id: 'SANFL',            label: 'SANFL',              color: ACCENT, query: '*[_type == "matchResult" && competition == "SANFL"]' },
  { id: 'SANFLW',           label: 'SANFLW',             color: ACCENT, query: '*[_type == "matchResult" && competition == "SANFLW"]' },
  { id: 'Amateur',          label: "AMATEURS",           color: ACCENT, query: '*[_type == "matchResult" && competition == "Amateur"]' },
  { id: 'SAWFL',            label: "SAWFL WOMEN'S",      color: ACCENT, query: `*[_type == "matchResult" && competition == "SAWFL Women's"]` },
  { id: 'Country Football', label: 'COUNTRY FOOTBALL',   color: ACCENT, query: '*[_type == "matchResult" && competition == "Country Football"]' },
]

const s = {
  wrap:       { maxWidth: 680, margin: '32px auto', padding: '0 20px', fontFamily: 'sans-serif' },
  heading:    { fontSize: '1.6rem', fontWeight: 900, color: '#0a1a2e', margin: '0 0 4px' },
  sub:        { color: '#64748b', fontSize: '0.9rem', margin: '0 0 28px' },
  dateWrap:   { background: '#fff7ed', border: '2px solid #fed7aa', borderRadius: 10, padding: 16, marginBottom: 24 },
  label:      { display: 'block', fontWeight: 700, fontSize: '0.78rem', color: '#374151', marginBottom: 4 },
  input:      { width: '100%', padding: '9px 12px', border: '2px solid #e2e8f0', borderRadius: 8, fontSize: '0.88rem', color: '#0f172a', boxSizing: 'border-box', fontFamily: 'sans-serif', outline: 'none' },
  hint:       { fontSize: '0.72rem', color: '#94a3b8', marginTop: 6, display: 'block' },
  clearBtn:   { background: 'none', border: 'none', color: ACCENT, fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', padding: 0, marginTop: 8 },
  card:       { display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', border: '1px solid #e5e5e5', borderRadius: 8, padding: '0.875rem 1rem', marginBottom: '0.75rem' },
  compLabel:  { fontWeight: 700, fontSize: '0.95rem', color: '#0a1a2e' },
  dateHint:   { fontSize: '0.75rem', color: '#888', marginTop: 2 },
  confirmRow: { display: 'flex', gap: '0.5rem', alignItems: 'center' },
  confirmMsg: { fontSize: '0.85rem', color: RED, fontWeight: 600 },
  yesBtn:     { background: RED, color: '#fff', border: 'none', borderRadius: 6, padding: '0.4rem 0.875rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' },
  noBtn:      { background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: 6, padding: '0.4rem 0.875rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' },
  msg:        (type) => ({
    padding: '0.75rem 1rem', borderRadius: 8, marginBottom: '1.5rem', fontWeight: 600,
    background: type === 'success' ? '#f0fdf4' : type === 'error' ? '#fef2f2' : '#eff6ff',
    border: `1px solid ${type === 'success' ? '#86efac' : type === 'error' ? '#fca5a5' : '#93c5fd'}`,
    color: type === 'success' ? '#166534' : type === 'error' ? '#991b1b' : '#1e40af',
  }),
  footer:     { color: '#999', fontSize: '0.75rem', marginTop: '2rem', textAlign: 'center' },
}

export default function DeleteMatchesTool() {
  const client = useClient({ apiVersion: '2024-01-01' })
  const [loading, setLoading]       = useState(null)
  const [message, setMessage]       = useState(null)
  const [beforeDate, setBeforeDate] = useState('')
  const [confirm, setConfirm]       = useState(null)

  async function handleDelete(comp) {
    setLoading(comp.id)
    setMessage(null)
    try {
      let query = comp.query
      if (beforeDate) {
        const iso = new Date(beforeDate).toISOString()
        query = query.replace(']', ` && matchDate < "${iso}"]`)
      }

      const docs = await client.fetch(`${query} { _id }`)

      if (!docs.length) {
        setMessage({ type: 'info', text: `No match results found for ${comp.label}${beforeDate ? ` before ${new Date(beforeDate).toLocaleDateString('en-AU')}` : ''}` })
        setLoading(null)
        setConfirm(null)
        return
      }

      const transaction = client.transaction()
      docs.forEach(doc => transaction.delete(doc._id))
      await transaction.commit()

      setMessage({ type: 'success', text: `✅ Deleted ${docs.length} match result${docs.length !== 1 ? 's' : ''} from ${comp.label}` })
    } catch (e) {
      setMessage({ type: 'error', text: `❌ Error: ${e.message}` })
    }
    setLoading(null)
    setConfirm(null)
  }

  return (
    <div style={s.wrap}>
      <h1 style={s.heading}>🗑️ Delete Match Results</h1>
      <p style={s.sub}>Bulk delete match results by competition. This action is permanent and cannot be undone.</p>

      {/* Date filter */}
      <div style={s.dateWrap}>
        <label style={{ ...s.label, color: '#92400e' }}>📅 Optional: Only delete matches BEFORE this date</label>
        <input
          type="date"
          value={beforeDate}
          onChange={e => setBeforeDate(e.target.value)}
          style={s.input}
        />
        {beforeDate ? (
          <>
            <span style={{ ...s.hint, color: '#b45309' }}>
              Will only delete matches before {new Date(beforeDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <button style={s.clearBtn} onClick={() => setBeforeDate('')}>✕ Clear date filter</button>
          </>
        ) : (
          <span style={s.hint}>Leave blank to delete ALL matches for the selected competition</span>
        )}
      </div>

      {/* Message */}
      {message && <div style={s.msg(message.type)}>{message.text}</div>}

      {/* Competition cards */}
      {COMPETITIONS.map(comp => (
        <div key={comp.id} style={{ ...s.card, borderLeft: comp.id === 'all' ? `4px solid ${RED}` : '1px solid #e5e5e5' }}>
          <div>
            <div style={s.compLabel}>{comp.label}</div>
            {beforeDate && <div style={s.dateHint}>Before {new Date(beforeDate).toLocaleDateString('en-AU')}</div>}
          </div>

          {confirm === comp.id ? (
            <div style={s.confirmRow}>
              <span style={s.confirmMsg}>Are you sure?</span>
              <button onClick={() => handleDelete(comp)} disabled={loading === comp.id} style={s.yesBtn}>
                {loading === comp.id ? 'Deleting...' : 'Yes, Delete'}
              </button>
              <button onClick={() => setConfirm(null)} style={s.noBtn}>Cancel</button>
            </div>
          ) : (
            <button
              onClick={() => { setConfirm(comp.id); setMessage(null) }}
              style={{
                background: comp.id === 'all' ? RED : '#fff',
                color: comp.id === 'all' ? '#fff' : RED,
                border: `1.5px solid ${RED}`,
                borderRadius: 6, padding: '0.4rem 1rem',
                fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem',
              }}
            >
              🗑️ {comp.id === 'all' ? 'Delete All' : `Delete ${comp.label}`}
            </button>
          )}
        </div>
      ))}

      <p style={s.footer}>Tip: Use the date filter to only remove older matches and keep recent ones.</p>
    </div>
  )
}
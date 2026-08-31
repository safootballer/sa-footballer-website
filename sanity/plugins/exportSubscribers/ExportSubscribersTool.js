// sanity/plugins/exportSubscribers/ExportSubscribersTool.js

import { useState } from 'react'
import { useClient } from 'sanity'
import * as XLSX from 'xlsx'

const ACCENT = '#2ca3ee'
const GREEN  = '#16a34a'

const s = {
  wrap:    { maxWidth: 680, margin: '32px auto', padding: '0 20px', fontFamily: 'sans-serif' },
  heading: { fontSize: '1.6rem', fontWeight: 900, color: GREEN, margin: '0 0 4px' },
  sub:     { color: '#64748b', fontSize: '0.9rem', margin: '0 0 28px' },
  card:    { background: '#fff', border: '1px solid #e5e5e5', borderRadius: 10, padding: '1.5rem', marginBottom: '1rem' },
  stat:    { fontSize: '2.5rem', fontWeight: 900, color: ACCENT, margin: '0 0 4px' },
  statLbl: { color: '#64748b', fontSize: '0.85rem', marginBottom: '1.25rem' },
  btn:     { background: GREEN, color: '#fff', border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: 8 },
  btnDisabled: { opacity: 0.6, cursor: 'not-allowed' },
  msg:     (type) => ({
    padding: '0.75rem 1rem', borderRadius: 8, marginBottom: '1.25rem', fontWeight: 600,
    background: type === 'success' ? '#f0fdf4' : type === 'error' ? '#fef2f2' : '#eff6ff',
    border: `1px solid ${type === 'success' ? '#86efac' : type === 'error' ? '#fca5a5' : '#93c5fd'}`,
    color: type === 'success' ? '#166534' : type === 'error' ? '#991b1b' : '#1e40af',
  }),
  footer:  { color: '#999', fontSize: '0.75rem', marginTop: '2rem', textAlign: 'center' },
  toggle:  { display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem', fontSize: '0.85rem', color: '#374151' },
}

export default function ExportSubscribersTool() {
  const client = useClient({ apiVersion: '2024-01-01' })
  const [loading, setLoading]   = useState(false)
  const [message, setMessage]   = useState(null)
  const [activeOnly, setActiveOnly] = useState(true)

  async function handleExport() {
    setLoading(true)
    setMessage(null)
    try {
      const filter = activeOnly
        ? `*[_type == "subscriber" && active == true]`
        : `*[_type == "subscriber"]`

      const subs = await client.fetch(
        `${filter} | order(subscribedAt desc) {
          firstName, lastName, email, subscribedAt, source, active
        }`
      )

      if (!subs.length) {
        setMessage({ type: 'info', text: 'No subscribers found to export.' })
        setLoading(false)
        return
      }

      const rows = subs.map(sub => ({
        'First Name':    sub.firstName || '',
        'Last Name':     sub.lastName || '',
        'Email':         sub.email || '',
        'Subscribed At': sub.subscribedAt ? new Date(sub.subscribedAt).toLocaleDateString('en-AU') : '',
        'Source':        sub.source || '',
        'Active':        sub.active === false ? 'No' : 'Yes',
      }))

      const worksheet = XLSX.utils.json_to_sheet(rows)
      worksheet['!cols'] = [
        { wch: 18 }, { wch: 18 }, { wch: 32 }, { wch: 16 }, { wch: 20 }, { wch: 8 },
      ]

      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Subscribers')

      const today = new Date().toISOString().slice(0, 10)
      XLSX.writeFile(workbook, `sa-footballer-subscribers-${today}.xlsx`)

      setMessage({ type: 'success', text: `✅ Exported ${subs.length} subscriber${subs.length !== 1 ? 's' : ''} to Excel` })
    } catch (e) {
      setMessage({ type: 'error', text: `❌ Error: ${e.message}` })
    }
    setLoading(false)
  }

  return (
    <div style={s.wrap}>
      <h1 style={s.heading}>📥 Export Subscribers</h1>
      <p style={s.sub}>Download your subscriber list as an Excel file with First Name, Last Name, and Email columns.</p>

      {message && <div style={s.msg(message.type)}>{message.text}</div>}

      <div style={s.card}>
        <label style={s.toggle}>
          <input
            type="checkbox"
            checked={activeOnly}
            onChange={e => setActiveOnly(e.target.checked)}
          />
          Only export active subscribers (uncheck to include unsubscribed)
        </label>

        <button
          onClick={handleExport}
          disabled={loading}
          style={{ ...s.btn, ...(loading ? s.btnDisabled : {}) }}
        >
          {loading ? 'Exporting...' : '📥 Download Excel File'}
        </button>
      </div>

      <p style={s.footer}>The Excel file includes: First Name, Last Name, Email, Subscribed At, Source, and Active status.</p>
    </div>
  )
}
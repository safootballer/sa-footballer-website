'use client'

import { useState, useEffect } from 'react'

export default function SubscribePopup() {
  const [visible, setVisible]   = useState(false)
  const [form, setForm]         = useState({ firstName: '', lastName: '', email: '', agreed: false })
  const [status, setStatus]     = useState('idle') // idle | loading | success | error
  const [message, setMessage]   = useState('')

  // Show popup after 3 seconds on first visit — never again if already seen
  useEffect(() => {
    const seen = localStorage.getItem('sa_subscribe_popup_seen')
    if (!seen) {
      const timer = setTimeout(() => setVisible(true), 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  const dismiss = () => {
    localStorage.setItem('sa_subscribe_popup_seen', '1')
    setVisible(false)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.agreed) {
      setStatus('error')
      setMessage('Please agree to receive magazines and updates.')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/subscribe', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          firstName: form.firstName.trim(),
          lastName:  form.lastName.trim(),
          email:     form.email.trim().toLowerCase(),
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage(data.message || `Welcome ${form.firstName}! Check your inbox.`)
        localStorage.setItem('sa_subscribe_popup_seen', '1')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  if (!visible) return null

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        onClick={dismiss}
        style={{
          position:        'fixed',
          inset:           0,
          background:      'rgba(0,0,0,0.65)',
          zIndex:          9998,
          backdropFilter:  'blur(4px)',
          animation:       'safie-fade-in 0.3s ease',
        }}
      />

      {/* ── Modal ── */}
      <div style={{
        position:        'fixed',
        top:             '50%',
        left:            '50%',
        transform:       'translate(-50%, -50%)',
        zIndex:          9999,
        width:           'min(520px, calc(100vw - 32px))',
        borderRadius:    '20px',
        overflow:        'hidden',
        boxShadow:       '0 24px 80px rgba(0,0,0,0.5)',
        animation:       'safie-pop-in 0.35s cubic-bezier(0.34,1.56,0.64,1)',
      }}>

        {/* Header */}
        <div style={{
          background:  'linear-gradient(135deg, #2ca3ee, #00b8f1)',
          padding:     '28px 28px 20px',
          textAlign:   'center',
          position:    'relative',
        }}>
          {/* Close button */}
          <button
            onClick={dismiss}
            aria-label="Close"
            style={{
              position:   'absolute',
              top:        '14px',
              right:      '14px',
              background: 'rgba(255,255,255,0.2)',
              border:     'none',
              borderRadius: '50%',
              width:      '30px',
              height:     '30px',
              cursor:     'pointer',
              color:      '#fff',
              fontSize:   '16px',
              display:    'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 1,
            }}
          >
            ✕
          </button>

          <div style={{ fontSize: '2.8rem', marginBottom: '8px' }}>🏈</div>
          <h2 style={{
            margin:      0,
            color:       '#ffffff',
            fontSize:    '1.5rem',
            fontWeight:  900,
            letterSpacing: '0.5px',
          }}>
            Get SA Footballer Free!
          </h2>
          <p style={{
            margin:    '8px 0 0',
            color:     'rgba(255,255,255,0.85)',
            fontSize:  '0.9rem',
          }}>
            Subscribe and get our magazines delivered straight to your inbox
          </p>

          {/* Yellow badge */}
          <span style={{
            display:       'inline-block',
            background:    '#e6fe00',
            color:         '#000',
            fontSize:      '0.7rem',
            fontWeight:    700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            borderRadius:  '20px',
            padding:       '3px 14px',
            marginTop:     '12px',
          }}>
            100% Free · No Spam
          </span>
        </div>

        {/* Body */}
        <div style={{ background: '#ffffff', padding: '24px 28px 28px' }}>

          {status === 'success' ? (
            /* Success state */
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🎉</div>
              <h3 style={{ color: '#2ca3ee', fontSize: '1.3rem', fontWeight: 800, margin: '0 0 8px' }}>
                You're subscribed!
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', margin: '0 0 20px' }}>
                {message}
              </p>
              <button
                onClick={dismiss}
                style={{
                  background:    'linear-gradient(135deg, #2ca3ee, #00b8f1)',
                  color:         '#fff',
                  border:        'none',
                  borderRadius:  '50px',
                  padding:       '12px 32px',
                  fontWeight:    700,
                  fontSize:      '0.95rem',
                  cursor:        'pointer',
                }}
              >
                Start Reading →
              </button>
            </div>
          ) : (
            /* Form state */
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

              {/* What you'll get */}
              <div style={{
                display:       'flex',
                gap:           '8px',
                flexWrap:      'wrap',
                marginBottom:  '4px',
              }}>
                {['📰 SA Footballer', '💰 Ammo Footy', '👩 Women\'s Footy', '🌾 Country Footy'].map(item => (
                  <span key={item} style={{
                    background:    '#f0f9ff',
                    border:        '1px solid #bae6fd',
                    color:         '#0369a1',
                    fontSize:      '0.72rem',
                    fontWeight:    600,
                    borderRadius:  '20px',
                    padding:       '3px 10px',
                  }}>
                    {item}
                  </span>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                  style={inputStyle}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                  style={inputStyle}
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Your email address"
                value={form.email}
                onChange={handleChange}
                required
                disabled={status === 'loading'}
                style={inputStyle}
              />

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="agreed"
                  checked={form.agreed}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                  style={{ marginTop: '3px', accentColor: '#2ca3ee' }}
                />
                <span style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.5 }}>
                  I agree to receive magazines and updates from The South Australian Footballer
                </span>
              </label>

              {/* Error */}
              {status === 'error' && (
                <div style={{
                  background:   '#fef2f2',
                  border:       '1px solid #fca5a5',
                  color:        '#dc2626',
                  borderRadius: '8px',
                  padding:      '10px 14px',
                  fontSize:     '0.82rem',
                }}>
                  ⚠️ {message}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  background:    status === 'loading' ? '#d1d5db' : '#e6fe00',
                  color:         '#000',
                  border:        'none',
                  borderRadius:  '50px',
                  padding:       '13px',
                  fontWeight:    800,
                  fontSize:      '1rem',
                  cursor:        status === 'loading' ? 'not-allowed' : 'pointer',
                  letterSpacing: '0.04em',
                  display:       'flex',
                  alignItems:    'center',
                  justifyContent:'center',
                  gap:           '8px',
                  transition:    'background 0.2s',
                }}
              >
                {status === 'loading' ? (
                  <>
                    <svg style={{ animation: 'spin 0.8s linear infinite', width: 18, height: 18 }} viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="#555" strokeWidth="3" opacity="0.25"/>
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="#555" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    Subscribing…
                  </>
                ) : (
                  'SUBSCRIBE FOR FREE 🏈'
                )}
              </button>

              <p style={{ textAlign: 'center', margin: 0, fontSize: '0.75rem', color: '#94a3b8' }}>
                No spam, ever. Unsubscribe anytime.{' '}
                <button
                  type="button"
                  onClick={dismiss}
                  style={{ background: 'none', border: 'none', color: '#2ca3ee', cursor: 'pointer', fontSize: '0.75rem', padding: 0 }}
                >
                  No thanks
                </button>
              </p>
            </form>
          )}
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes safie-fade-in {
          from { opacity: 0 } to { opacity: 1 }
        }
        @keyframes safie-pop-in {
          from { opacity: 0; transform: translate(-50%, -48%) scale(0.85); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}

const inputStyle = {
  width:        '100%',
  padding:      '11px 14px',
  border:       '2px solid #e2e8f0',
  borderRadius: '8px',
  fontSize:     '0.9rem',
  color:        '#0f172a',
  outline:      'none',
  boxSizing:    'border-box',
  transition:   'border-color 0.2s',
}
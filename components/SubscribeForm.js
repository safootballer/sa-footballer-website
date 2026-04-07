'use client'

import { useState } from 'react'

export default function SubscribeForm() {
  const [form, setForm]       = useState({ firstName: '', lastName: '', email: '', agreed: false })
  const [status, setStatus]   = useState('idle') // idle | loading | success | error
  const [message, setMessage] = useState('')

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
        setMessage(data.message || `Welcome ${form.firstName}! Check your inbox for a confirmation email.`)
        setForm({ firstName: '', lastName: '', email: '', agreed: false })
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please check your connection and try again.')
    }
  }

  return (
    <section className="bg-[#2ca3ee] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">SUBSCRIBE FOR FREE</h2>
          <p className="mb-8">Get the latest SA Footballer magazines delivered straight to your inbox</p>

          {/* Success state */}
          {status === 'success' ? (
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-[#2ca3ee] mb-2">You're subscribed!</h3>
              <p className="text-gray-600 mb-6">{message}</p>
              <button
                onClick={() => setStatus('idle')}
                className="bg-[#2ca3ee] text-white px-8 py-3 rounded-full font-bold hover:bg-[#00b8f1] transition"
              >
                Subscribe another email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                  className="w-full px-4 py-3 rounded text-gray-900 disabled:opacity-60"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                  className="w-full px-4 py-3 rounded text-gray-900 disabled:opacity-60"
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                disabled={status === 'loading'}
                className="w-full px-4 py-3 rounded text-gray-900 disabled:opacity-60"
              />

              <div className="text-left">
                <label className="flex items-start space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreed"
                    checked={form.agreed}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                    className="mt-1"
                  />
                  <span className="text-sm">
                    I agree to receive magazines and updates from The South Australian Footballer
                  </span>
                </label>
              </div>

              {/* Error message */}
              {status === 'error' && (
                <div className="bg-red-100 border border-red-300 text-red-700 rounded-lg px-4 py-3 text-sm text-left">
                  ⚠️ {message}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#e6fe00] text-black py-3 rounded-full font-bold hover:bg-yellow-400 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Subscribing…
                  </>
                ) : (
                  'SUBSCRIBE NOW'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
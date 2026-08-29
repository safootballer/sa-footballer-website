'use client'
import { useEffect, useState } from 'react'

export default function FacebookFollowers({ label = 'Facebook Followers', fallback = null }) {
  const [count, setCount] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/fb-followers')
      .then(r => r.json())
      .then(d => setCount(typeof d.followers === 'number' ? d.followers : null))
      .catch(() => setCount(null))
      .finally(() => setLoading(false))
  }, [])

  const display = count != null
    ? count.toLocaleString('en-AU')
    : fallback != null ? fallback : '—'

  return (
    <span>
      {loading && fallback == null ? '…' : display}
      {label ? ` ${label}` : ''}
    </span>
  )
}
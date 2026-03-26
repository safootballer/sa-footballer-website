'use client'

import { useEffect, useState } from 'react'

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showBanner, setShowBanner] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    // Detect iOS
    const ios = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase())
    setIsIOS(ios)
    if (ios) {
      setShowBanner(true)
      return
    }

    // Android / Desktop install prompt
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowBanner(true)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') setShowBanner(false)
    setDeferredPrompt(null)
  }

  const handleDismiss = () => setShowBanner(false)

  if (!showBanner || isInstalled) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#0066CC',
      color: 'white',
      padding: '14px 20px',
      borderRadius: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
      zIndex: 9999,
      maxWidth: '90vw',
      fontFamily: 'sans-serif',
      fontSize: '14px',
    }}>
      <span style={{ fontSize: '22px' }}>📲</span>

      {isIOS ? (
        <span>
          Tap <strong>Share</strong> then <strong>"Add to Home Screen"</strong> to install our app
        </span>
      ) : (
        <span>Install the <strong>SA Footballer</strong> app!</span>
      )}

      {!isIOS && (
        <button
          onClick={handleInstall}
          style={{
            background: 'white',
            color: '#0066CC',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            fontSize: '13px',
          }}
        >
          Install
        </button>
      )}

      <button
        onClick={handleDismiss}
        style={{
          background: 'transparent',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          fontSize: '18px',
          lineHeight: 1,
          padding: '0 4px',
        }}
      >
        ✕
      </button>
    </div>
  )
}
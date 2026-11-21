// WEBSITE FILE → save as:  components/HomeDeals.js
// Homepage "Super Saver Deals" — shows 6 CATEGORIES at a time for 20s,
// each category with a horizontal, manually-scrollable row of its coupons.
// After 20s the next 6 categories appear.
'use client'
import { useState, useEffect, useMemo } from 'react'

// ⬇️ set this to your Render dashboard URL (same as in SuperSaverContent.js)
const DASHBOARD_API = 'https://supersaver-dashboard.onrender.com'
const CATS_PER_PAGE = 6     // how many categories show at once
const ROTATE_MS = 20000     // 20 seconds, then the next 6 categories appear

// Canonical category order (same list as the dashboard)
const CATEGORIES = [
  'Accommodation and Travel','Accounting and Bookkeeping','Architect and Design',
  'Automotive Services','Beauticians','Business Consultants','Carpenters','Catering',
  'Cleaning Services','Courier Freight and Removals','Conveyancers','Eating Out',
  'Electricians','Electronics and Supplies','Financial Services','Fitness','Hairdressing',
  'Health and Well Being','Home and Garden','Kitchen','Medical Services','Pest Control',
  'Pet Care','Photography and Video','Plumbers','Professional Services','Real Estate',
  'Telecommunications','Trades People','Sporting Goods','Website Design',
]

export default function HomeDeals() {
  const [coupons, setCoupons] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [page, setPage] = useState(0)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    fetch(`${DASHBOARD_API}/api/coupons`)
      .then((r) => r.json())
      .then((d) => setCoupons(Array.isArray(d) ? d : []))
      .catch(() => {})
      .finally(() => setLoaded(true))
  }, [])

  // Group coupons by category, keep only categories that actually have coupons
  const grouped = useMemo(() => {
    const map = {}
    coupons.forEach((c) => {
      if (!map[c.category]) map[c.category] = []
      map[c.category].push(c)
    })
    return CATEGORIES.filter((cat) => map[cat]?.length).map((cat) => ({ cat, items: map[cat] }))
  }, [coupons])

  const pages = Math.max(1, Math.ceil(grouped.length / CATS_PER_PAGE))

  // rotate the set of 6 categories every 20s
  useEffect(() => {
    if (pages <= 1) return
    const t = setInterval(() => setPage((p) => (p + 1) % pages), ROTATE_MS)
    return () => clearInterval(t)
  }, [pages])

  useEffect(() => { if (page >= pages) setPage(0) }, [pages, page])

  const start = page * CATS_PER_PAGE
  const view = grouped.slice(start, start + CATS_PER_PAGE)

  async function download(c) {
    try {
      const res = await fetch(c.imageUrl)
      const blob = await res.blob()
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = `${(c.business || 'coupon').replace(/[^a-z0-9]+/gi, '-')}.png`
      document.body.appendChild(a); a.click(); a.remove()
      URL.revokeObjectURL(a.href)
    } catch { window.open(c.imageUrl, '_blank') }
  }

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8 border-b-4 border-[#e6fe00] pb-2">
          <h2 className="text-3xl font-bold text-[#2ca3ee]">🎟️ SUPER SAVER DEALS</h2>
          <a href="/super-saver-deals" className="text-[#2ca3ee] font-semibold hover:underline text-sm whitespace-nowrap">
            View All Deals →
          </a>
        </div>

        {!loaded ? (
          <p className="text-gray-400 text-center py-12">Loading deals…</p>
        ) : grouped.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-10 text-center">
            <div className="text-4xl mb-3">🎟️</div>
            <p className="text-gray-500">New deals from our local partners are coming soon.</p>
          </div>
        ) : (
          <>
            <div className="space-y-10">
              {view.map(({ cat, items }) => (
                <div key={cat}>
                  {/* Category heading */}
                  <h3 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-[#2ca3ee]">
                    <span className="pl-3">{cat}</span>
                    <span className="text-gray-400 text-sm font-normal ml-2">({items.length})</span>
                  </h3>

                  {/* Full-width, manually-scrollable row of wide voucher cards */}
                  <div className="flex gap-5 overflow-x-auto pb-3 snap-x deals-scroll">
                    {items.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => setLightbox(c)}
                        className="flex-shrink-0 w-[85vw] sm:w-[480px] lg:w-[560px] snap-start bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition"
                      >
                        <div className="bg-gray-900 flex items-center justify-center">
                          <img src={c.imageUrl} alt={c.business || 'Deal'} loading="lazy" className="w-full object-contain" />
                        </div>
                        {(c.business || c.title) && (
                          <div className="p-3">
                            <p className="font-bold text-gray-800 text-sm truncate">{c.business || 'Local Partner'}</p>
                            {c.title && <p className="text-xs text-[#2ca3ee] truncate">{c.title}</p>}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* rotation dots (each dot = a set of 6 categories) */}
            {pages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: pages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    aria-label={`Show category set ${i + 1}`}
                    className={`h-2.5 rounded-full transition-all ${i === page ? 'w-7 bg-[#2ca3ee]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'}`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} className="fixed inset-0 bg-black/90 z-[1000] flex items-center justify-center p-6">
          <div onClick={(e) => e.stopPropagation()} className="max-w-lg w-full text-center">
            <img src={lightbox.imageUrl} alt={lightbox.business || 'Deal'} className="max-w-full max-h-[70vh] rounded-xl mx-auto border border-[#2ca3ee]/40" />
            <div className="mt-4">
              <p className="text-white font-bold text-xl">{lightbox.business || 'Local Partner'}</p>
              {lightbox.title && <p className="text-[#e6fe00] text-sm">{lightbox.title}</p>}
              <p className="text-gray-400 text-xs mt-1">{lightbox.category}</p>
              <div className="flex gap-3 justify-center flex-wrap mt-4">
                <button onClick={() => download(lightbox)} className="bg-[#e6fe00] text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-yellow-400 transition">↓ Download</button>
                {lightbox.website && (
                  <a href={lightbox.website} target="_blank" rel="noopener noreferrer" className="bg-[#2ca3ee] text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-[#00b8f1] transition">Visit Website</a>
                )}
                <button onClick={() => setLightbox(null)} className="border border-white/30 text-white/80 px-5 py-2 rounded-full font-semibold text-sm hover:bg-white/10 transition">Close</button>
              </div>
              {lightbox.phone && <p className="text-gray-400 text-sm mt-3">📞 {lightbox.phone}</p>}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .deals-scroll::-webkit-scrollbar { height: 6px; }
        .deals-scroll::-webkit-scrollbar-track { background: #e5e7eb; border-radius: 3px; }
        .deals-scroll::-webkit-scrollbar-thumb { background: #2ca3ee; border-radius: 3px; }
      `}</style>
    </section>
  )
}

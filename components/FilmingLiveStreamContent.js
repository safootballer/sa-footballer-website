'use client'
import { useEffect, useState, useRef } from 'react'

function VideoCard({ videoId, title, date, accent = '#e6fe00' }) {
  const [playing, setPlaying] = useState(false)
  const thumb = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-black shadow-lg hover:shadow-2xl transition-all duration-300 flex-shrink-0">
      {videoId ? (
        <div className="relative pb-[62%] bg-black">
          {playing ? (
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <button onClick={() => setPlaying(true)} className="absolute inset-0 w-full h-full" aria-label={`Play ${title}`}>
              <img src={thumb} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              {/* Diagonal accent stripe corner */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                <div className="absolute top-0 right-0 w-28 h-6 rotate-45 translate-x-6 translate-y-3" style={{ background: accent }}></div>
              </div>
              {/* Live badge */}
              <span className="absolute top-3 left-3 flex items-center gap-1.5 text-black text-[0.65rem] font-black px-2.5 py-1 rounded uppercase tracking-wide" style={{ background: accent }}>
                <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></span>
                SA Footballer
              </span>
              {/* Play button */}
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition" style={{ background: accent }}>
                  <svg className="w-6 h-6 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </span>
              </span>
              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                <h3 className="font-bold text-white text-sm leading-tight line-clamp-2 uppercase">{title}</h3>
                {date && <p className="text-gray-400 text-xs mt-1">{new Date(date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}</p>}
              </div>
            </button>
          )}
        </div>
      ) : (
        <div className="w-full h-48 bg-gray-800 flex items-center justify-center"><span className="text-gray-500">Unavailable</span></div>
      )}
    </div>
  )
}

export default function FilmingLiveStreamContent() {
  const [sanityVideos, setSanityVideos]   = useState([])
  const [youtubeVideos, setYoutubeVideos] = useState([])
  const [loading, setLoading]             = useState(true)
  const [activeTab, setActiveTab]         = useState('ALL')
  const scrollRef = useRef(null)

  const CATEGORY_TABS = [
    'ALL',
    'Hills Football League - Country',
    'Hills Football League - Division 1',
    'Adelaide Plains',
    'Greenacres',
    'AFL MASTERS SA',
    'Southern Football League',
  ]

  useEffect(() => {
    const sanity = fetch('/api/filming-live-stream?category=filming-and-live-stream', { cache: 'no-store' })
      .then(r => r.json()).then(d => setSanityVideos(Array.isArray(d) ? d : [])).catch(() => setSanityVideos([]))
    const youtube = fetch('/api/youtube-videos')
      .then(r => r.json()).then(d => setYoutubeVideos(Array.isArray(d.videos) ? d.videos : [])).catch(() => setYoutubeVideos([]))
    Promise.all([sanity, youtube]).finally(() => setLoading(false))
  }, [])

  function getYouTubeId(url) {
    if (!url) return null
    const m = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/)
    return (m && m[2].length === 11) ? m[2] : null
  }

  const sanityYtIds = new Set(sanityVideos.map(v => getYouTubeId(v.youtubeUrl)).filter(Boolean))
  const dedupedYoutube = youtubeVideos.filter(v => !sanityYtIds.has(v.videoId))
  const allVideos = [
    ...sanityVideos.map(v => ({ id: v._id, videoId: getYouTubeId(v.youtubeUrl), title: v.title, date: v.publishedAt })),
    ...dedupedYoutube.map(v => ({ id: v.videoId, videoId: v.videoId, title: v.title, date: v.publishedAt })),
  ].filter(v => v.videoId)
  const hasAny = allVideos.length > 0
  const featured = allVideos[0]
  const rest = allVideos.slice(1)

  const scroll = (dir) => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' })
  }

  return (
    <div className="bg-[#0a0a0a]">
      {/* Bold hero banner */}
      <section className="relative bg-[#0a0a0a] pt-14 pb-10 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-red-700 to-red-600 p-8 md:p-12">
            {/* Diagonal stripes */}
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-20" style={{ background: 'repeating-linear-gradient(45deg, #e6fe00, #e6fe00 20px, transparent 20px, transparent 40px)' }}></div>
            <div className="relative z-10 max-w-2xl">
              <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-3">The Home of SA Football Streaming</p>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-none mb-4 uppercase">
                Step Up Your <span className="text-[#e6fe00]">Football</span> Streaming Game
              </h1>
              <p className="text-white/80 text-base mb-6 max-w-lg">Watch SA football matches live and on demand. Filming and live streaming across Adelaide and South Australia.</p>
              <a href="/contact" className="inline-block bg-[#e6fe00] text-black px-8 py-3 rounded-lg font-black uppercase text-sm hover:bg-yellow-300 transition">
                Get a Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Info band */}
      <section className="bg-[#0a0a0a] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <p className="text-[#e6fe00] font-bold text-sm uppercase tracking-widest mb-2">Why Choose Us</p>
            <h2 className="text-3xl md:text-4xl font-black mb-8 uppercase">Filming & Live Streaming <span className="text-[#e6fe00]">Football and Sport</span></h2>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 text-gray-300 text-base leading-relaxed mb-8">
              <div className="space-y-4">
                <p>The South Australian Footballer is the best credentialed live streaming and filming company in South Australia.</p>
                <p>The main sport we film and live stream is Australian Football, but we also film netball, cricket, basketball, motor sports, Gaelic football and many other sports.</p>
                <p>Our videographers are the best in the business, highly skilled, well trained, and specifically trained to film the way our clients want.</p>
              </div>
              <div className="space-y-4">
                <p>Our prices are the most competitive in South Australia, and we have a list of references a mile long.</p>
                <p>We hold a reference from Travis Lynn, President of the Hills Football League, and can present a host of other references and contacts regarding the quality of our work.</p>
                <a href="/references/hills-football-league-reference.pdf" target="_blank" className="inline-flex items-center gap-2 bg-[#2ca3ee] hover:bg-[#00b8f1] text-white px-5 py-2.5 rounded font-semibold transition text-sm">
                  📄 Download Reference Letter
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category tabs */}
      <section className="bg-[#0a0a0a] border-b border-gray-800 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORY_TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap transition uppercase ${
                  activeTab === tab ? 'bg-[#e6fe00] text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}>
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Videos */}
      <section className="bg-[#0a0a0a] py-14">
        <div className="container mx-auto px-4">
          {activeTab !== 'ALL' ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎥</div>
              <h3 className="text-2xl font-black text-white mb-2 uppercase">{activeTab}</h3>
              <p className="text-gray-400">Videos for this category coming soon</p>
            </div>
          ) : loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#e6fe00] border-t-transparent"></div>
              <p className="mt-4 text-gray-400">Loading videos...</p>
            </div>
          ) : hasAny ? (
            <>
              {/* Header with carousel arrows */}
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="text-[#e6fe00] font-bold text-sm uppercase tracking-widest mb-1 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[#e6fe00] rounded-full animate-pulse"></span> Latest Videos
                  </p>
                  <h2 className="text-3xl md:text-4xl font-black text-white uppercase leading-none">
                    Match <span className="text-[#e6fe00]">Highlights</span> & Live Streams
                  </h2>
                </div>
                <div className="hidden md:flex gap-2">
                  <button onClick={() => scroll(-1)} className="w-11 h-11 rounded-lg bg-gray-800 text-white hover:bg-[#e6fe00] hover:text-black transition flex items-center justify-center font-bold">←</button>
                  <button onClick={() => scroll(1)} className="w-11 h-11 rounded-lg bg-[#e6fe00] text-black hover:bg-yellow-300 transition flex items-center justify-center font-bold">→</button>
                </div>
              </div>

              {/* Featured + horizontal scroll row (KICK style) */}
              {featured && (
                <div className="grid lg:grid-cols-2 gap-6 mb-6">
                  <VideoCard videoId={featured.videoId} title={featured.title} date={featured.date} accent="#e6fe00" />
                  {rest[0] && <VideoCard videoId={rest[0].videoId} title={rest[0].title} date={rest[0].date} accent="#dc2626" />}
                </div>
              )}

              {/* Horizontal scroll carousel */}
              <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4 snap-x" style={{ scrollbarWidth: 'thin' }}>
                {rest.slice(1).map((v, i) => (
                  <div key={v.id} className="snap-start w-[300px] flex-shrink-0">
                    <VideoCard videoId={v.videoId} title={v.title} date={v.date} accent={i % 2 === 0 ? '#2ca3ee' : '#e6fe00'} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎥</div>
              <h3 className="text-2xl font-black text-white mb-2 uppercase">No Videos Yet</h3>
              <p className="text-gray-400">Check back soon for the latest videos</p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA banner */}
      <section className="bg-[#0a0a0a] pb-16">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#2ca3ee] to-[#00b8f1] p-10 md:p-14 text-center">
            <div className="absolute inset-0 opacity-10" style={{ background: 'repeating-linear-gradient(-45deg, #e6fe00, #e6fe00 20px, transparent 20px, transparent 40px)' }}></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase mb-4">Want Your Club Filmed?</h2>
              <p className="text-white/90 mb-6 max-w-xl mx-auto">Professional filming and live streaming at the most competitive prices in South Australia.</p>
              <a href="/contact" className="inline-block bg-[#e6fe00] text-black px-10 py-4 rounded-lg font-black uppercase hover:bg-yellow-300 transition">Get a Quote</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
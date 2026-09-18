'use client'
import { useEffect, useState } from 'react'

function VideoCard({ videoId, title, date, featured = false }) {
  const [playing, setPlaying] = useState(false)
  const thumb = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null

  return (
    <div className={`group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-black ${featured ? 'md:row-span-2' : ''}`}>
      {videoId ? (
        <div className={`relative ${featured ? 'pb-[75%] md:pb-[120%]' : 'pb-[65%]'} bg-black`}>
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
            <button
              onClick={() => setPlaying(true)}
              className="absolute top-0 left-0 w-full h-full"
              aria-label={`Play ${title}`}
            >
              <img src={thumb} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20"></div>
              {/* Play button */}
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-16 h-16 bg-red-600 bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-opacity-100 transition">
                  <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
              {/* Live badge */}
              <span className="absolute top-4 left-4 flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                SA FOOTBALLER
              </span>
              {/* Title overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
                <h3 className={`font-bold text-white leading-tight line-clamp-2 ${featured ? 'text-xl md:text-2xl' : 'text-base'}`}>{title}</h3>
                {date && (
                  <p className="text-gray-300 text-xs mt-1">
                    {new Date(date).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                )}
              </div>
            </button>
          )}
        </div>
      ) : (
        <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
          <span className="text-gray-500">Video unavailable</span>
        </div>
      )}
    </div>
  )
}

export default function FilmingLiveStreamContent() {
  const [sanityVideos, setSanityVideos]   = useState([])
  const [youtubeVideos, setYoutubeVideos] = useState([])
  const [loading, setLoading]             = useState(true)
  const [activeTab, setActiveTab]         = useState('ALL')

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
      .then(r => r.json())
      .then(data => setSanityVideos(Array.isArray(data) ? data : []))
      .catch(() => setSanityVideos([]))

    const youtube = fetch('/api/youtube-videos')
      .then(r => r.json())
      .then(data => setYoutubeVideos(Array.isArray(data.videos) ? data.videos : []))
      .catch(() => setYoutubeVideos([]))

    Promise.all([sanity, youtube]).finally(() => setLoading(false))
  }, [])

  function getYouTubeId(url) {
    if (!url) return null
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  const sanityYtIds = new Set(sanityVideos.map(v => getYouTubeId(v.youtubeUrl)).filter(Boolean))
  const dedupedYoutube = youtubeVideos.filter(v => !sanityYtIds.has(v.videoId))

  // Build a single merged list of videos with a common shape
  const allVideos = [
    ...sanityVideos.map(v => ({ id: v._id, videoId: getYouTubeId(v.youtubeUrl), title: v.title, date: v.publishedAt })),
    ...dedupedYoutube.map(v => ({ id: v.videoId, videoId: v.videoId, title: v.title, date: v.publishedAt })),
  ].filter(v => v.videoId)

  const hasAny = allVideos.length > 0

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">FILMING & LIVE STREAM</h1>
          <p className="text-xl">Watch SA Football matches live and on demand</p>
        </div>
      </section>

      {/* Info band */}
      <section className="bg-gray-900 text-white py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-red-500 mb-6 uppercase tracking-wide">
              Filming and Live Streaming Football and Sport
            </h2>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 text-gray-300 text-base leading-relaxed mb-10">
              <div className="space-y-4">
                <p>The South Australian Footballer is the best credentialed live streaming and filming company in South Australia.</p>
                <p>The main sport we film and live stream is Australian Football, but we also film netball, cricket, basketball, motor sports, Gaelic football and many other sports.</p>
                <p>Our videographers are the best in the business, highly skilled, well trained, and specifically trained to film the way our clients want.</p>
              </div>
              <div className="space-y-4">
                <p>Our prices are the most competitive in South Australia, and we have a list of references a mile long.</p>
                <p>We hold a reference from Travis Lynn, President of the Hills Football League, and can present a host of other references and contacts regarding the quality of our work.</p>
                <a href="/references/hills-football-league-reference.pdf" target="_blank"
                  className="inline-flex items-center gap-2 bg-[#2ca3ee] hover:bg-[#00b8f1] text-white px-5 py-2.5 rounded font-semibold transition text-sm">
                  📄 Download Reference Letter
                </a>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-8">
              <a href="/contact"
                className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition text-sm">
                Get a Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Category tabs */}
      <section className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORY_TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition ${
                  activeTab === tab ? 'bg-red-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Videos */}
      <section className="bg-gray-50 py-14">
        <div className="container mx-auto px-4">
          {activeTab !== 'ALL' ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎥</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">{activeTab}</h3>
              <p className="text-gray-600">Videos for this category coming soon</p>
            </div>
          ) : loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Loading videos...</p>
            </div>
          ) : hasAny ? (
            <>
              {/* Section header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-center gap-2 text-red-600 font-bold text-sm mb-1">
                    <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse"></span>
                    LATEST VIDEOS
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Match Highlights & Live Streams</h2>
                </div>
                <span className="hidden md:block text-gray-500 text-sm">{allVideos.length} videos</span>
              </div>

              {/* Featured layout — first video large, rest in grid */}
              <div className="grid md:grid-cols-3 gap-6 auto-rows-min">
                {allVideos.slice(0, 1).map(v => (
                  <VideoCard key={v.id} videoId={v.videoId} title={v.title} date={v.date} featured />
                ))}
                {allVideos.slice(1, 5).map(v => (
                  <VideoCard key={v.id} videoId={v.videoId} title={v.title} date={v.date} />
                ))}
              </div>

              {/* Remaining videos in standard grid */}
              {allVideos.length > 5 && (
                <div className="grid md:grid-cols-3 gap-6 mt-6">
                  {allVideos.slice(5).map(v => (
                    <VideoCard key={v.id} videoId={v.videoId} title={v.title} date={v.date} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎥</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No Videos Yet</h3>
              <p className="text-gray-600">Check back soon for the latest videos</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function FilmingLiveStreamContent() {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('cat') || 'all')
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  const categories = [
    { id: 'all', name: 'ALL' },
    { id: 'live-stream', name: 'LIVE STREAM' },
    { id: 'filming', name: 'FILMING' },
    { id: 'panel-shows', name: 'PANEL SHOWS' },
  ]

  async function fetchVideos() {
    setLoading(true)
    try {
      const response = await fetch('/api/filming-live-stream?category=' + selectedCategory, {
        cache: 'no-store'
        })
      const data = await response.json()
      setVideos(data)
    } catch (error) {
      console.error('Error fetching videos:', error)
      setVideos([])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchVideos()
  }, [selectedCategory])

  function getYouTubeId(url) {
    if (!url) return null
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">FILMING & LIVE STREAM</h1>
          <p className="text-xl">Watch SA Football matches and panel shows</p>
        </div>
      </section>

      {/* Info band — sits directly under hero */}
      <section className="bg-gray-900 text-white py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">

            <h2 className="text-2xl font-bold text-red-500 mb-6 uppercase tracking-wide">
              Filming and Live Streaming Football and Sport
            </h2>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 text-gray-300 text-base leading-relaxed mb-10">
              <div className="space-y-4">
                <p>
                  The South Australian Footballer is the best credentialed live streaming and filming company in South Australia.
                </p>
                <p>
                  The main sport we film and live stream is Australian Football, but we also film netball, cricket, basketball, motor sports, Gaelic football and many other sports.
                </p>
                <p>
                  Our videographers are the best in the business, highly skilled, well trained, and specifically trained to film the way our clients want.
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  Our prices are the most competitive in South Australia, and we have a list of references a mile long.
                </p>
                <p>
                  We hold a reference from Travis Lynn, President of the Hills Football League, and can present a host of other references and contacts regarding the quality of our work.
                </p>

                {/* Reference download */}
                <a
                  href="/references/hills-football-league-reference.pdf"
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-[#2ca3ee] hover:bg-[#00b8f1] text-white px-5 py-2.5 rounded font-semibold transition text-sm"
                >
                  📄 Download Reference Letter
                </a>
              </div>
            </div>

            {/* Contact + CTA row */}
            <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              
              <a
                href="/contact"
                className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition text-sm whitespace-nowrap"
              >
                Get a Quote
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Category nav — sticky */}
      <section className="bg-white border-b sticky top-0 z-40 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 py-4 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2 rounded-full font-bold whitespace-nowrap transition ${
                  selectedCategory === cat.id
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Videos grid */}
      <section className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#2ca3ee] border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading videos...</p>
          </div>
        ) : videos.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => {
              const videoId = getYouTubeId(video.youtubeUrl)
              return (
                <div key={video._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                  {videoId ? (
                    <div className="relative pb-[56.25%]">
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Video unavailable</span>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold mb-2 line-clamp-2 text-gray-800">{video.title}</h3>
                    {video.category && (
                      <p className="text-sm font-semibold text-[#2ca3ee] mb-2">
                        {video.category === 'live-stream' && 'Live Stream'}
                        {video.category === 'filming' && 'Filming'}
                        {video.category === 'panel-shows' && 'Panel Show'}
                      </p>
                    )}
                    <p className="text-sm text-gray-700">
                      {new Date(video.publishedAt).toLocaleDateString('en-AU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎥</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Videos Yet</h3>
            <p className="text-gray-600">
              {selectedCategory === 'all'
                ? 'Check back soon for the latest videos'
                : `No ${categories.find(c => c.id === selectedCategory)?.name} videos available yet`}
            </p>
          </div>
        )}
      </section>
    </>
  )
}

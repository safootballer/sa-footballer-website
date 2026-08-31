'use client'
import { useEffect, useState } from 'react'

export default function FilmingLiveStreamContent() {
  const [sanityVideos, setSanityVideos]   = useState([])
  const [youtubeVideos, setYoutubeVideos] = useState([])
  const [loading, setLoading]             = useState(true)

  useEffect(() => {
    // Sanity (curated) videos
    const sanity = fetch('/api/filming-live-stream?category=filming-and-live-stream', { cache: 'no-store' })
      .then(r => r.json())
      .then(data => setSanityVideos(Array.isArray(data) ? data : []))
      .catch(() => setSanityVideos([]))

    // YouTube channel videos (auto)
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

  // Sanity video IDs already shown — so we don't duplicate them from YouTube
  const sanityYtIds = new Set(
    sanityVideos.map(v => getYouTubeId(v.youtubeUrl)).filter(Boolean)
  )
  const dedupedYoutube = youtubeVideos.filter(v => !sanityYtIds.has(v.videoId))

  const hasAny = sanityVideos.length > 0 || dedupedYoutube.length > 0

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

      {/* Videos grid */}
      <section className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading videos...</p>
          </div>
        ) : hasAny ? (
          <>
            {/* Sanity (curated) videos first */}
            {sanityVideos.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {sanityVideos.map((video) => {
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
                          <p className="text-sm font-semibold text-red-600 mb-2">
                            {video.category === 'live-stream' ? 'Live Stream' : 'Filming'}
                          </p>
                        )}
                        <p className="text-sm text-gray-700">
                          {new Date(video.publishedAt).toLocaleDateString('en-AU', {
                            year: 'numeric', month: 'long', day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* YouTube channel videos (auto) */}
            {dedupedYoutube.length > 0 && (
              <>
                {sanityVideos.length > 0 && (
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-4">More From Our YouTube Channel</h2>
                )}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dedupedYoutube.map((video) => (
                    <div key={video.videoId} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                      <div className="relative pb-[56.25%]">
                        <iframe
                          className="absolute top-0 left-0 w-full h-full"
                          src={`https://www.youtube.com/embed/${video.videoId}`}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold mb-2 line-clamp-2 text-gray-800">{video.title}</h3>
                        <p className="text-sm text-gray-700">
                          {new Date(video.publishedAt).toLocaleDateString('en-AU', {
                            year: 'numeric', month: 'long', day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎥</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Videos Yet</h3>
            <p className="text-gray-600">Check back soon for the latest videos</p>
          </div>
        )}
      </section>
    </>
  )
}
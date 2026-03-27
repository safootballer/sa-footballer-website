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

  // Function before useEffect
  async function fetchVideos() {
    setLoading(true)
    try {
      const response = await fetch('/api/filming-live-stream?category=' + selectedCategory)
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
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">FILMING & LIVE STREAM</h1>
          <p className="text-xl">Watch SA Football matches and panel shows</p>
        </div>
      </section>

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
                    <h3 className="font-bold text-gray-200 mb-2 line-clamp-2 text-gray-800">{video.title}</h3>
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

      {/* Content Section */}
<section className="container mx-auto px-4 py-12 border-t">
  <div className="max-w-4xl mx-auto">
    <article className="bg-white rounded-lg shadow-lg p-8 md:p-12">
      
      <h2 className="text-2xl font-bold text-red-600 mb-6">FILMING AND LIVE STREAMING FOOTBALL AND SPORT</h2>
      
      <p className="text-gray-800 mb-6">
        The South Australian Footballer is the best credentialed live streaming and filming company in South Australia.
      </p>

      <p className="text-gray-800 mb-6">
        The main sport we film and live stream is Australian Football but we film other sports, including netball, cricket, basketball, motor sports, Gaelic football and a myriad of other sports.
      </p>

      <p className="text-gray-800 mb-6">
        Our videographers are the best in the business.
      </p>

      <p className="text-gray-800 mb-6">
        They are highly skilled, well trained, and also trained by us to film specially to how our clients want.
      </p>

      <p className="text-gray-800 mb-6">
        Our prices are the most competitive in South Australia, and we can actually show a list of reference a mile long.
      </p>

      <p className="text-gray-800 mb-6">
        Attached is a reference from the president of the Hills Football League, Travis Lynn.
      </p>

      <p className="text-gray-800 mb-8">
        We can also present a host of other references, and people to contact about our quality of work.
      </p>

      {/* Reference/Testimonial Section */}
      <div className="bg-gray-50 border-l-4 border-[#2ca3ee] p-6 mb-8">
        <h3 className="text-lg font-bold text-[#2ca3ee] mb-3">Client Reference Available</h3>
        <p className="text-gray-800 mb-4">
          Reference from Travis Lynn, President of the Hills Football League
        </p>
        {/* Add PDF download link here when you have the file */}
        <a 
          href="/references/hills-football-league-reference.pdf" 
          target="_blank"
          className="inline-block bg-[#2ca3ee] text-white px-6 py-2 rounded font-semibold hover:bg-[#00b8f1] transition"
        >
          📄 Download Reference Letter
        </a>
      </div>

      <div className="border-t pt-6">
        <p className="text-gray-800 mb-1">Kind Regards</p>
        <p className="text-gray-800 mb-1">Luke Hosie</p>
        <p className="text-gray-800 mb-6">Managing Director, The South Australian Footballer</p>

        <p className="text-gray-800 mb-1">
          <span className="text-red-600 font-semibold">Phone:</span>{' '}
          <a href="tel:0404846412" className="text-blue-600 underline">0404 846 412</a>
          {' | '}
          <span className="text-red-600 font-semibold">Email:</span>{' '}
          <a href="mailto:thesafootballer@adam.com.au" className="text-blue-600 underline">thesafootballer@adam.com.au</a>
        </p>
      </div>

      <div className="bg-gradient-to-r from-[#2ca3ee] to-[#00b8f1] rounded-lg p-8 text-white mt-12 text-center">
        <h3 className="text-2xl font-bold mb-4">Get a Quote</h3>
        <p className="text-lg mb-6">
          Contact us today for competitive pricing on filming and live streaming services
        </p>
        <a 
          href="/contact" 
          className="inline-block bg-white text-[#2ca3ee] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition"
        >
          Contact Us
        </a>
      </div>

    </article>
  </div>
</section>
    </>
  )
}
'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function FilmingLiveStreamContent() {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all')
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  const categories = [
    { id: 'all', name: 'ALL' },
    { id: 'live-stream', name: 'LIVE STREAM' },
    { id: 'filming', name: 'FILMING' },
    { id: 'panel-shows', name: 'PANEL SHOWS' },
  ]

  useEffect(() => {
    fetchVideos()
  }, [selectedCategory])

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

  function getYouTubeId(url) {
    if (!url) return null
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/.*[?&]v=([a-zA-Z0-9_-]{11})/
    ]
    
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) return match[1]
    }
    return null
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
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading videos...</p>
          </div>
        ) : videos.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => {
              const videoId = getYouTubeId(video.youtubeUrl)
              const thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null
              
              return (
                <a key={video._id} href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="group">
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
                    {thumbnail ? (
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={thumbnail} 
                          alt={video.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition">
                          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition">
                            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                        
                        {video.category && (
                          <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                            {video.category}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    )}
                    
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-red-600 transition">
                        {video.title}
                      </h3>
                      
                      {video.publishedAt && (
                        <p className="text-gray-500 text-sm">
                          {new Date(video.publishedAt).toLocaleDateString('en-AU', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                </a>
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
'use client'

export default function VideoCard({ video }) {
  // Force extract video ID - multiple patterns
  let videoId = null
  
  if (video.youtubeUrl) {
    // Try all possible patterns
    if (video.youtubeUrl.includes('youtu.be/')) {
      videoId = video.youtubeUrl.split('youtu.be/')[1]?.split('?')[0]
    } else if (video.youtubeUrl.includes('watch?v=')) {
      videoId = video.youtubeUrl.split('watch?v=')[1]?.split('&')[0]
    } else if (video.youtubeUrl.includes('/live/')) {
      videoId = video.youtubeUrl.split('/live/')[1]?.split('?')[0]
    } else if (video.youtubeUrl.includes('/embed/')) {
      videoId = video.youtubeUrl.split('/embed/')[1]?.split('?')[0]
    }
  }

  console.log('VideoCard render - Title:', video.title, '| videoId:', videoId, '| URL:', video.youtubeUrl)

  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <a 
        href={video.youtubeUrl || '#'} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block relative group"
      >
        <div className="relative h-64 bg-black">
          {thumbnailUrl ? (
            <>
              <img 
                src={thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                <div className="text-white text-7xl opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all">
                  ▶️
                </div>
              </div>
            </>
          ) : (
            <div className="h-64 bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-6xl mb-4">▶️</div>
                <h3 className="text-2xl font-bold px-4">{video.title}</h3>
              </div>
            </div>
          )}
        </div>
      </a>
      
      <div className="p-6">
        {video.show && (
          <span className="text-xs font-bold text-red-600 uppercase px-3 py-1 bg-red-50 rounded-full">
            {video.show === 'ammo' ? 'Adelaide Ammo Footy Show' : video.show === 'womens' ? "Adelaide Women's Footy Show" : video.show}
          </span>
        )}
        
        <h3 className="text-xl font-bold mt-3 mb-2 text-gray-900">
          {video.title}
        </h3>
        
        {video.description && (
          <p className="text-gray-600 text-sm mb-4">
            {video.description}
          </p>
        )}
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>
            📅 {new Date(video.publishedAt).toLocaleDateString()}
          </span>
          <a 
            href={video.youtubeUrl || '#'} 
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 font-semibold hover:text-red-800"
          >
            Watch on YouTube →
          </a>
        </div>
      </div>
    </div>
  )
}
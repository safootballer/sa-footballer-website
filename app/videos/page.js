import Header from '../../components/Header'
import BlankAreaPhoto from '../../components/BlankAreaPhoto'
import VideoCard from '../../components/VideoCard'
import { client, urlFor, getAllPhotosForPage } from '../../lib/sanity'

export const dynamic = 'force-dynamic'

export const revalidate = 60

async function getVideos() {
  const query = `*[_type == "video"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    youtubeUrl,
    show,
    publishedAt,
    description,
    thumbnail
  }`
  
  const videos = await client.fetch(query)
  return videos
}

function getYouTubeId(url) {
  if (!url) return null
  
  // Handle different YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/.*[?&]v=([a-zA-Z0-9_-]{11})/
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }
  
  return null
}

export const metadata = {
  title: 'Videos - The South Australian Footballer',
  description: 'Weekly panel shows and video content',
}

export default async function VideosPage() {
  const videos = await getVideos()
  const allPhotos = await getAllPhotosForPage('videos') || []
  
  const galleryPhotos = allPhotos.filter(p => p.placement === 'gallery')
  const cardPhotos = allPhotos.filter(p => p.placement === 'cards')
  const backgroundPhotos = allPhotos.filter(p => p.placement === 'background')
  const headerPhotos = allPhotos.filter(p => p.placement === 'header')
  const blankPhotos = allPhotos.filter(p => p.placement === 'blank')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {blankPhotos.filter(p => p.blankAreaPosition === 'top').map((photo) => (
        <BlankAreaPhoto key={photo._id} photo={photo} />
      ))}

      <section 
        className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16 bg-cover bg-center relative"
        style={headerPhotos.length > 0 ? {
          backgroundImage: `linear-gradient(rgba(220, 38, 38, 0.85), rgba(153, 27, 27, 0.85)), url(${urlFor(headerPhotos[0].image).width(1920).height(400).url()})`,
          backgroundBlendMode: 'overlay'
        } : {}}
      >
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Videos & Panel Shows</h1>
          <p className="text-xl">Watch our weekly panel shows and the latest video content covering South Australian football.</p>
        </div>
      </section>

      {blankPhotos.filter(p => p.blankAreaPosition === 'after-hero').map((photo) => (
        <BlankAreaPhoto key={photo._id} photo={photo} />
      ))}

      {backgroundPhotos.length > 0 && (
        <section 
          className="relative h-96 bg-cover bg-center"
          style={{backgroundImage: `url(${urlFor(backgroundPhotos[0].image).width(1920).height(800).url()})`}}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Watch Latest Episodes</h2>
              <p className="text-xl md:text-2xl">Panel shows and highlights</p>
            </div>
          </div>
        </section>
      )}

      <section className="container mx-auto px-4 py-16">
        {videos.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-gray-600 text-lg">No videos available yet.</p>
            <p className="text-gray-500 mt-2">Check back soon for the latest episodes!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        )}
      </section>

      {blankPhotos.filter(p => p.blankAreaPosition === 'middle').map((photo) => (
        <BlankAreaPhoto key={photo._id} photo={photo} />
      ))}

      {galleryPhotos.length > 0 && (
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-gray-900">Behind the Scenes</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {galleryPhotos.map((photo) => (
                <div key={photo._id} className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <img 
                    src={urlFor(photo.image).width(400).height(400).url()}
                    alt={photo.title || 'SA Football'}
                    className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {blankPhotos.filter(p => p.blankAreaPosition === 'between-sections').map((photo) => (
        <BlankAreaPhoto key={photo._id} photo={photo} />
      ))}

      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Weekly Panel Shows</h2>
          <div className="grid md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <div className="text-5xl mb-3">🎙️</div>
              <h3 className="text-2xl font-bold mb-2">The Adelaide "Ammo" Footy Show</h3>
              <p className="text-blue-100">Covering every division of the amateurs with expert analysis and panel discussion.</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <div className="text-5xl mb-3">🎙️</div>
              <h3 className="text-2xl font-bold mb-2">The Adelaide Women's Footy Show</h3>
              <p className="text-blue-100">The only panel show in Australia covering women's football with dedicated coverage of every SAWFL division.</p>
            </div>
          </div>
        </div>
      </section>

      {blankPhotos.filter(p => p.blankAreaPosition === 'before-footer').map((photo) => (
        <BlankAreaPhoto key={photo._id} photo={photo} />
      ))}

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">The South Australian Footballer</h3>
              <p className="text-gray-400">Premier publisher of SA footy magazines and media since 1993</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/articles" className="hover:text-white">News Articles</a></li>
                <li><a href="/videos" className="hover:text-white">Videos</a></li>
                <li><a href="/magazines" className="hover:text-white">Magazines</a></li>
                <li><a href="/match-reports" className="hover:text-white">Match Reports</a></li>
                <li><a href="/ladders" className="hover:text-white">Ladders</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Competitions</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">AFL & AFLW</a></li>
                <li><a href="#" className="hover:text-white">SANFL & SANFLW</a></li>
                <li><a href="#" className="hover:text-white">SA Amateur</a></li>
                <li><a href="#" className="hover:text-white">SAWFL Women's</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📞 0404 846 412</li>
                <li>📧 thesafootballer@adam.com.au</li>
              </ul>
            </div>
          </div>

          {blankPhotos.filter(p => p.blankAreaPosition === 'bottom').map((photo) => (
            <div key={photo._id} className="mb-8">
              <BlankAreaPhoto photo={photo} />
            </div>
          ))}
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 The South Australian Footballer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
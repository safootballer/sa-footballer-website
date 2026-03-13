// Force rebuild
import Header from '../components/Header'
import { client, urlFor, getAllPhotosForPage } from '../lib/sanity'

// Fetch latest articles from Sanity
async function getLatestArticles() {
  const query = `*[_type == "article"] | order(publishedAt desc)[0...6] {
    _id,
    title,
    slug,
    competition,
    publishedAt,
    excerpt,
    featuredImage
  }`
  return await client.fetch(query)
}

// Fetch latest videos from Sanity
async function getLatestVideos() {
  const query = `*[_type == "video"] | order(publishedAt desc)[0...2] {
    _id,
    title,
    youtubeUrl,
    show,
    description
  }`
  return await client.fetch(query)
}

// Fetch home settings from Sanity
async function getHomeSettings() {
  const query = `*[_type == "homeSettings"][0] {
    heroTitle,
    heroSubtitle,
    heroImage
  }`
  return await client.fetch(query)
}

// Extract YouTube video ID from URL
function getYouTubeId(url) {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : null
}

// Blank Area Photo Component
function BlankAreaPhoto({ photo }) {
  return (
    <section className={`py-8 ${
      photo.displayStyle === 'full-width' ? 'w-full' : 'container mx-auto px-4'
    }`}>
      <div className={`${
        photo.displayStyle === 'centered' ? 'flex justify-center' :
        photo.displayStyle === 'left' ? 'flex justify-start' :
        photo.displayStyle === 'right' ? 'flex justify-end' :
        photo.displayStyle === 'float-left' ? 'float-left mr-8 mb-4' :
        photo.displayStyle === 'float-right' ? 'float-right ml-8 mb-4' : ''
      }`}>
        <img 
          src={urlFor(photo.image).width(
            photo.photoSize === 'small' ? 300 :
            photo.photoSize === 'medium' ? 600 :
            photo.photoSize === 'large' ? 900 :
            photo.photoSize === 'xlarge' ? 1200 : 1920
          ).url()}
          alt={photo.title || 'SA Football'}
          className={`${
            photo.photoSize === 'full' ? 'w-full' : ''
          } rounded-lg shadow-lg`}
        />
      </div>
      {photo.caption && (
        <p className={`mt-2 italic text-gray-600 ${
          photo.displayStyle === 'centered' ? 'text-center' :
          photo.displayStyle === 'left' ? 'text-left' :
          photo.displayStyle === 'right' ? 'text-right' : 'text-center'
        }`}>{photo.caption}</p>
      )}
    </section>
  )
}

export const metadata = {
  title: 'Home - The South Australian Footballer',
  description: 'Celebrating 30 years of SA football coverage',
}

export default async function Home() {
  const articles = await getLatestArticles() || []
  const videos = await getLatestVideos() || []
  const homeSettings = await getHomeSettings()
  const allPhotos = await getAllPhotosForPage('homepage') || []
  
  // Separate photos by placement
  const galleryPhotos = allPhotos.filter(p => p.placement === 'gallery')
  const cardPhotos = allPhotos.filter(p => p.placement === 'cards')
  const backgroundPhotos = allPhotos.filter(p => p.placement === 'background')
  const headerPhotos = allPhotos.filter(p => p.placement === 'header')
  const blankPhotos = allPhotos.filter(p => p.placement === 'blank')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Blank Area Photos - Top of Page */}
      {blankPhotos.filter(p => p.blankAreaPosition === 'top').map((photo) => (
        <BlankAreaPhoto key={photo._id} photo={photo} />
      ))}

      {/* Hero Section with optional header photo background */}
      <section 
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 relative bg-cover bg-center"
        style={headerPhotos.length > 0 ? {
          backgroundImage: `linear-gradient(rgba(0, 102, 204, 0.85), rgba(0, 82, 163, 0.85)), url(${urlFor(headerPhotos[0].image).width(1920).height(600).url()})`,
          backgroundBlendMode: 'overlay'
        } : {}}
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-4">
            {homeSettings?.heroTitle || 'Celebrating Our 30th Year in Business!'}
          </h1>
          <p className="text-xl mb-8">
            {homeSettings?.heroSubtitle || 'For three decades now, our group of businesses and companies have been premier publishers of high-quality sporting magazines, sports media products, and multimedia in Adelaide and across South Australia.'}
          </p>
          <a href="/magazines" className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition inline-block">
            Download Latest Magazine
          </a>
        </div>
      </section>

      {/* Blank Area Photos - After Hero */}
      {blankPhotos.filter(p => p.blankAreaPosition === 'after-hero').map((photo) => (
        <BlankAreaPhoto key={photo._id} photo={photo} />
      ))}

      {/* Background Photo Section */}
      {backgroundPhotos.length > 0 && (
        <section 
          className="relative h-96 bg-cover bg-center"
          style={{backgroundImage: `url(${urlFor(backgroundPhotos[0].image).width(1920).height(800).url()})`}}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-5xl font-bold mb-4">South Australian Football</h2>
              <p className="text-2xl">Action from across all competitions</p>
            </div>
          </div>
        </section>
      )}

      {/* Quick Links */}
      <section className="bg-white py-8 shadow-md">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <a href="/magazines" className="bg-blue-600 text-white text-center py-6 rounded-lg hover:bg-blue-700 transition font-bold">
              📰 MAGAZINE DOWNLOADS
            </a>
            <a href="/match-reports" className="bg-purple-600 text-white text-center py-6 rounded-lg hover:bg-purple-700 transition font-bold">
              ✍️ MATCH REPORTS
            </a>
            <a href="/ladders" className="bg-orange-600 text-white text-center py-6 rounded-lg hover:bg-orange-700 transition font-bold">
              📊 LEAGUE LADDERS
            </a>
          </div>
        </div>
      </section>

      {/* Latest News Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-8 text-gray-900">Latest News & Articles</h2>
        {articles.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-gray-600">No articles yet. Add some in the CMS!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <div key={article._id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                {article.featuredImage ? (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={urlFor(article.featuredImage).width(600).height(400).url()}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : cardPhotos[index % cardPhotos.length]?.image ? (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={urlFor(cardPhotos[index % cardPhotos.length].image).width(600).height(400).url()}
                      alt="SA Football"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-gray-400 text-4xl">🏈</span>
                  </div>
                )}
                <div className="p-6">
                  <span className="text-xs font-bold text-blue-600 uppercase px-3 py-1 bg-blue-50 rounded-full">
                    {article.competition}
                  </span>
                  <h3 className="text-xl font-bold mt-3 mb-2 text-gray-900">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {article.excerpt || 'Read more about this story...'}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>📅 {new Date(article.publishedAt).toLocaleDateString()}</span>
                    <a href={`/articles/${article.slug.current}`} className="text-blue-600 font-semibold hover:text-blue-800">Read More →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Blank Area Photos - Middle of Page */}
      {blankPhotos.filter(p => p.blankAreaPosition === 'middle').map((photo) => (
        <BlankAreaPhoto key={photo._id} photo={photo} />
      ))}

      {/* Photo Gallery Section */}
      {galleryPhotos.length > 0 && (
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-gray-900">Latest Photos</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
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

      {/* Blank Area Photos - Between Sections */}
      {blankPhotos.filter(p => p.blankAreaPosition === 'between-sections').map((photo) => (
        <BlankAreaPhoto key={photo._id} photo={photo} />
      ))}

      {/* Weekly Videos Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Weekly Videos and Panel Shows</h2>
          {videos.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-12 text-center">
              <p className="text-gray-600">No videos yet. Add some in the CMS!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {videos.map((video) => {
                const videoId = getYouTubeId(video.youtubeUrl)
                const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null
                
                return (
                  <div key={video._id} className="bg-white rounded-lg overflow-hidden shadow-lg">
                    <a 
                      href={video.youtubeUrl || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block relative group"
                    >
                      {videoId ? (
                        <div className="relative h-64">
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
                        </div>
                      ) : (
                        <div className="h-64 bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                          <div className="text-white text-center">
                            <div className="text-6xl mb-4">▶️</div>
                            <h3 className="text-2xl font-bold">{video.title}</h3>
                          </div>
                        </div>
                      )}
                    </a>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{video.title}</h3>
                      <p className="text-gray-600">{video.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Magazine Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Our Weekly Magazines</h2>
          <p className="text-xl mb-8">Download the latest editions covering AFL, SANFL, Amateur, and Women's football</p>
          <div className="flex justify-center space-x-4">
            <a href="/magazines" className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition">
              📱 View All Magazines
            </a>
            <button className="bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition">
              📧 Subscribe to Weekly Magazines
            </button>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-2xl p-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Subscribe to Weekly Magazines</h2>
            <p className="text-xl mb-8">Get the latest SA footy news delivered to your inbox every week</p>
            <div className="flex gap-4">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-6 py-3 rounded-full text-gray-900"
              />
              <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Blank Area Photos - Before Footer */}
      {blankPhotos.filter(p => p.blankAreaPosition === 'before-footer').map((photo) => (
        <BlankAreaPhoto key={photo._id} photo={photo} />
      ))}

      {/* Footer */}
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
                <li><a href="#" className="hover:text-white">Country Football</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📞 0404 846 412</li>
                <li>📧 thesafootballer@adam.com.au</li>
                <li className="pt-4 flex space-x-4">
                  <a href="#" className="hover:text-blue-400">📷 Instagram</a>
                  <a href="#" className="hover:text-red-400">▶️ YouTube</a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Blank Area Photos - Bottom of Page (inside footer) */}
          {blankPhotos.filter(p => p.blankAreaPosition === 'bottom').map((photo) => (
            <div key={photo._id} className="mb-8">
              <BlankAreaPhoto photo={photo} />
            </div>
          ))}
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p className="mb-4">&copy; 2026 The South Australian Footballer. All rights reserved.</p>
          <div className="text-sm text-gray-500 space-y-1">
            <p className="font-semibold">Developed by Mian Talha Sarfraz</p>
            <div className="flex justify-center items-center gap-4 flex-wrap">
              <a href="https://github.com/talha-11-11" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
                GitHub: talha-11-11
              </a>
              <span>•</span>
              <a href="mailto:talhasarfraz29@gmail.com" className="hover:text-blue-400 transition">
                talhasarfraz29@gmail.com
              </a>
              <span>•</span>
              <a href="https://www.upwork.com/freelancers/~0128359f0564f06967" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
                Upwork Profile
              </a>
            </div>
        </div>
      </div>
        </div>
      </footer>
    </div>
  );
}
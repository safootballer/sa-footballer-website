import Header from '../../components/Header'
import BlankAreaPhoto from '../../components/BlankAreaPhoto'
import { client, urlFor, getAllPhotosForPage } from '../../lib/sanity'

async function getArticles() {
  const query = `*[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    competition,
    publishedAt,
    excerpt,
    featuredImage
  }`
  
  const articles = await client.fetch(query)
  return articles
}

export const metadata = {
  title: 'News Articles - The South Australian Footballer',
  description: 'Latest news and articles covering South Australian football',
}

export default async function ArticlesPage() {
  const articles = await getArticles()
  const allPhotos = await getAllPhotosForPage('articles') || []
  
  // Separate photos by placement
  const galleryPhotos = allPhotos.filter(p => p.placement === 'gallery')
  const cardPhotos = allPhotos.filter(p => p.placement === 'cards')
  const backgroundPhotos = allPhotos.filter(p => p.placement === 'background')
  const headerPhotos = allPhotos.filter(p => p.placement === 'header')
  const blankPhotos = allPhotos.filter(p => p.placement === 'blank')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Blank Area Photos - Top */}
      {blankPhotos.filter(p => p.blankAreaPosition === 'top').map((photo) => (
        <BlankAreaPhoto key={photo._id} photo={photo} />
      ))}

      {/* Header with optional background */}
      <section 
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 bg-cover bg-center relative"
        style={headerPhotos.length > 0 ? {
          backgroundImage: `linear-gradient(rgba(0, 102, 204, 0.85), rgba(0, 82, 163, 0.85)), url(${urlFor(headerPhotos[0].image).width(1920).height(400).url()})`,
          backgroundBlendMode: 'overlay'
        } : {}}
      >
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">News & Articles</h1>
          <p className="text-xl">The latest news, updates, and editorial content covering South Australian football.</p>
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
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Latest News</h2>
              <p className="text-xl md:text-2xl">Stay updated with SA Football</p>
            </div>
          </div>
        </section>
      )}

      {/* Articles Section */}
      <section className="container mx-auto px-4 py-16">
        {articles.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-gray-600 text-lg">No articles available yet.</p>
            <p className="text-gray-500 mt-2">Check back soon for the latest news!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  
                  {article.excerpt && (
                    <p className="text-gray-600 text-sm mb-4">
                      {article.excerpt}
                    </p>
                  )}
                  
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>
                      📅 {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                    <a href={`/articles/${article.slug.current}`} className="text-blue-600 font-semibold hover:text-blue-800">
                      Read More →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Blank Area Photos - Middle */}
      {blankPhotos.filter(p => p.blankAreaPosition === 'middle').map((photo) => (
        <BlankAreaPhoto key={photo._id} photo={photo} />
      ))}

      {/* Photo Gallery Section */}
      {galleryPhotos.length > 0 && (
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-gray-900">Photo Gallery</h2>
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

      {/* Blank Area Photos - Between Sections */}
      {blankPhotos.filter(p => p.blankAreaPosition === 'between-sections').map((photo) => (
        <BlankAreaPhoto key={photo._id} photo={photo} />
      ))}

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

          {/* Blank Area Photos - Bottom */}
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
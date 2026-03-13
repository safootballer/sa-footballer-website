import Header from '../../components/Header'
import BlankAreaPhoto from '../../components/BlankAreaPhoto'
import { client, urlFor, getAllPhotosForPage } from '../../lib/sanity'

export const revalidate = 60 // Revalidate every 60 seconds


async function getMagazines() {
  const query = `*[_type == "magazine"] | order(publishedAt desc) {
    _id,
    title,
    competition,
    weekEnding,
    round,
    pdfUrl,
    coverImage,
    publishedAt
  }`
  
  const magazines = await client.fetch(query)
  return magazines
}

export const metadata = {
  title: 'Magazine Downloads - The South Australian Footballer',
  description: 'Download our weekly football magazines',
}

export default async function MagazinesPage() {
  const magazines = await getMagazines()
  const allPhotos = await getAllPhotosForPage('magazines') || []
  
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
        className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16 bg-cover bg-center relative"
        style={headerPhotos.length > 0 ? {
          backgroundImage: `linear-gradient(rgba(22, 163, 74, 0.85), rgba(21, 128, 61, 0.85)), url(${urlFor(headerPhotos[0].image).width(1920).height(400).url()})`,
          backgroundBlendMode: 'overlay'
        } : {}}
      >
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Magazine Downloads</h1>
          <p className="text-xl">Download the latest editions of our weekly football magazines covering all South Australian competitions.</p>
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
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Weekly Magazines</h2>
              <p className="text-xl md:text-2xl">30 years of SA footy coverage</p>
            </div>
          </div>
        </section>
      )}

      <section className="container mx-auto px-4 py-16">
        {magazines.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-gray-600 text-lg">No magazines available yet.</p>
            <p className="text-gray-500 mt-2">Check back soon for the latest editions!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {magazines.map((magazine) => (
              <div key={magazine._id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                {magazine.coverImage ? (
                  <div className="h-64 md:h-80 overflow-hidden">
                    <img 
                      src={urlFor(magazine.coverImage).width(400).height(600).url()}
                      alt={magazine.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-64 md:h-80 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                    <div className="text-white text-center p-6">
                      <div className="text-5xl mb-4">📰</div>
                      <h3 className="text-xl font-bold">{magazine.title}</h3>
                    </div>
                  </div>
                )}
                
                <div className="p-4 md:p-6">
                  <span className="text-xs font-bold text-blue-600 uppercase px-3 py-1 bg-blue-50 rounded-full">
                    {magazine.competition}
                  </span>
                  
                  <h3 className="text-base md:text-lg font-bold mt-3 mb-2 text-gray-900">
                    {magazine.title}
                  </h3>
                  
                  <div className="text-sm text-gray-600 mb-4">
                    {magazine.round && <p className="font-semibold">{magazine.round}</p>}
                    {magazine.weekEnding && (
                      <p>Week Ending: {new Date(magazine.weekEnding).toLocaleDateString()}</p>
                    )}
                  </div>
                  
                  <a 
                    href={magazine.pdfUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full bg-blue-600 text-white text-center py-2 md:py-3 rounded-lg font-bold hover:bg-blue-700 transition text-sm md:text-base"
                  >
                    📱 Download PDF
                  </a>
                </div>
              </div>
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
            <h2 className="text-4xl font-bold mb-8 text-gray-900">Magazine Highlights</h2>
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

      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Never Miss an Edition</h2>
          <p className="text-xl mb-8">Subscribe to get notified when new magazines are published</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-6 py-3 rounded-full text-gray-900"
            />
            <button className="bg-green-500 text-white px-6 md:px-8 py-3 rounded-full font-bold hover:bg-green-600 transition">
              Subscribe
            </button>
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
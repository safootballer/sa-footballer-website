import Header from '../../components/Header'
import BlankAreaPhoto from '../../components/BlankAreaPhoto'
import { client, urlFor, getAllPhotosForPage } from '../../lib/sanity'

export const revalidate = 60 // Revalidate every 60 seconds


async function getMatchReports() {
  const query = `*[_type == "matchReport"] | order(matchDate desc) {
    _id,
    title,
    slug,
    competition,
    round,
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    matchDate,
    excerpt,
    featuredImage
  }`
  
  const reports = await client.fetch(query)
  return reports
}

export const metadata = {
  title: 'Match Reports - The South Australian Footballer',
  description: 'Detailed match reports from across SA football',
}

export default async function MatchReportsPage() {
  const reports = await getMatchReports()
  const allPhotos = await getAllPhotosForPage('match-reports') || []
  
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
        className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16 bg-cover bg-center relative"
        style={headerPhotos.length > 0 ? {
          backgroundImage: `linear-gradient(rgba(147, 51, 234, 0.85), rgba(107, 33, 168, 0.85)), url(${urlFor(headerPhotos[0].image).width(1920).height(400).url()})`,
          backgroundBlendMode: 'overlay'
        } : {}}
      >
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Match Reports</h1>
          <p className="text-xl">Comprehensive coverage and analysis from every game across SA football competitions.</p>
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
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Game Coverage</h2>
              <p className="text-xl md:text-2xl">Expert analysis and reporting</p>
            </div>
          </div>
        </section>
      )}

      <section className="container mx-auto px-4 py-16">
        {reports.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-gray-600 text-lg">No match reports available yet.</p>
            <p className="text-gray-500 mt-2">Check back soon for the latest match coverage!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {reports.map((report, index) => (
              <div key={report._id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                {report.featuredImage ? (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={urlFor(report.featuredImage).width(600).height(400).url()}
                      alt={report.title}
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
                  <div className="h-48 bg-gradient-to-br from-purple-200 to-purple-300 flex items-center justify-center">
                    <span className="text-purple-600 text-4xl">⚽</span>
                  </div>
                )}
                
                <div className="p-6">
                  <span className="text-xs font-bold text-purple-600 uppercase px-3 py-1 bg-purple-50 rounded-full">
                    {report.competition}
                  </span>
                  
                  <h3 className="text-xl font-bold mt-3 mb-2 text-gray-900">
                    {report.title}
                  </h3>
                  
                  {report.homeTeam && report.awayTeam && (
                    <div className="bg-gray-50 rounded p-3 mb-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-sm md:text-base">{report.homeTeam}</span>
                        <span className="text-purple-600 font-bold">{report.homeScore}</span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="font-semibold text-sm md:text-base">{report.awayTeam}</span>
                        <span className="text-purple-600 font-bold">{report.awayScore}</span>
                      </div>
                    </div>
                  )}
                  
                  {report.excerpt && (
                    <p className="text-gray-600 text-sm mb-4">
                      {report.excerpt}
                    </p>
                  )}
                  
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>
                      {report.round ? `${report.round} • ` : ''}
                      {new Date(report.matchDate).toLocaleDateString()}
                    </span>
                    <a href={`/match-reports/${report.slug.current}`} className="text-purple-600 font-semibold hover:text-purple-800">
                      Read More →
                    </a>
                  </div>
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
            <h2 className="text-4xl font-bold mb-8 text-gray-900">Match Action</h2>
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
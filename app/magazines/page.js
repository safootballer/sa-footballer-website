import Header from '../../components/Header'
import { client } from '../../lib/sanity'

export const revalidate = 60

async function getMagazinesContent() {
  const query = `{
    "magazines": *[_type == "magazine"] | order(publishedAt desc) {
      _id,
      title,
      coverImage,
      pdfUrl,
      publishedAt,
      competition
    },
    "aflArticles": *[_type == "editorial" && competition == "AFL"] | order(publishedAt desc)[0...2] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt
    },
    "sanflArticles": *[_type == "editorial" && competition == "SANFL"] | order(publishedAt desc)[0...2] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt
    },
    "aflMatches": *[_type == "matchResult" && competition == "AFL"] | order(matchDate desc)[0...2] {
      _id,
      title,
      slug,
      homeTeam,
      awayTeam,
      homeScore,
      awayScore,
      matchDate
    },
    "sanflMatches": *[_type == "matchResult" && competition == "SANFL"] | order(matchDate desc)[0...2] {
      _id,
      title,
      slug,
      homeTeam,
      awayTeam,
      homeScore,
      awayScore,
      matchDate
    }
  }`
  
  return await client.fetch(query)
}

export const metadata = {
  title: 'Magazines - The South Australian Footballer',
  description: 'Download SA Footballer magazines - SA Footballer, Ammo Footy Budget, Women\'s Footy Budget, Country Footy Budget',
}

export default async function MagazinesPage() {
  const content = await getMagazinesContent()

  // Get latest magazines by type
  const saFootballer = content.magazines.filter(m => m.competition === 'SA Footballer')[0]
  const ammoFooty = content.magazines.filter(m => m.competition === 'Ammo Footy Budget')[0]
  const womensFooty = content.magazines.filter(m => m.competition === 'Women\'s Footy Budget')[0]
  const countryFooty = content.magazines.filter(m => m.competition === 'Country Footy Budget')[0]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2ca3ee] to-[#00b8f1] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">OUR MAGAZINES</h1>
          <p className="text-xl">Download the latest editions and browse our archive</p>
        </div>
      </section>

      {/* Latest Magazine Covers */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-[#2ca3ee] border-b-4 border-[#2ca3ee] pb-2">LATEST EDITIONS</h2>
        
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {/* SA Footballer */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {saFootballer ? (
              <>
                {saFootballer.coverImage?.asset?._ref ? (
                  <img 
                    src={`https://cdn.sanity.io/images/2y2dueu9/production/${saFootballer.coverImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png')}`}
                    alt={saFootballer.title}
                    className="w-full h-80 object-cover"
                  />
                ) : (
                  <div className="w-full h-80 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold text-center p-4">SA FOOTBALLER</span>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">SA FOOTBALLER</h3>
                  <a href={saFootballer.pdfUrl} target="_blank" className="block w-full bg-[#2ca3ee] text-white text-center py-2 rounded font-bold hover:bg-[#00b8f1] transition mb-2">
                    Download Latest Issue
                  </a>
                  <a href="#archive" className="block w-full bg-gray-200 text-gray-700 text-center py-2 rounded font-bold hover:bg-gray-300 transition">
                    View Archive
                  </a>
                </div>
              </>
            ) : (
              <div className="p-6 text-center text-gray-500">Coming Soon</div>
            )}
          </div>

          {/* Ammo Footy Budget */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {ammoFooty ? (
              <>
                {ammoFooty.coverImage?.asset?._ref ? (
                  <img 
                    src={`https://cdn.sanity.io/images/2y2dueu9/production/${ammoFooty.coverImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png')}`}
                    alt={ammoFooty.title}
                    className="w-full h-80 object-cover"
                  />
                ) : (
                  <div className="w-full h-80 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                    <span className="text-white font-bold text-center p-4">AMMO FOOTY BUDGET</span>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">AMMO FOOTY BUDGET</h3>
                  <a href={ammoFooty.pdfUrl} target="_blank" className="block w-full bg-[#2ca3ee] text-white text-center py-2 rounded font-bold hover:bg-[#00b8f1] transition mb-2">
                    Download Latest Issue
                  </a>
                  <a href="#archive" className="block w-full bg-gray-200 text-gray-700 text-center py-2 rounded font-bold hover:bg-gray-300 transition">
                    View Archive
                  </a>
                </div>
              </>
            ) : (
              <div className="p-6 text-center text-gray-500">Coming Soon</div>
            )}
          </div>

          {/* Women's Footy Budget */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {womensFooty ? (
              <>
                {womensFooty.coverImage?.asset?._ref ? (
                  <img 
                    src={`https://cdn.sanity.io/images/2y2dueu9/production/${womensFooty.coverImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png')}`}
                    alt={womensFooty.title}
                    className="w-full h-80 object-cover"
                  />
                ) : (
                  <div className="w-full h-80 bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
                    <span className="text-white font-bold text-center p-4">WOMEN'S FOOTY BUDGET</span>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">WOMEN'S FOOTY BUDGET</h3>
                  <a href={womensFooty.pdfUrl} target="_blank" className="block w-full bg-[#2ca3ee] text-white text-center py-2 rounded font-bold hover:bg-[#00b8f1] transition mb-2">
                    Download Latest Issue
                  </a>
                  <a href="#archive" className="block w-full bg-gray-200 text-gray-700 text-center py-2 rounded font-bold hover:bg-gray-300 transition">
                    View Archive
                  </a>
                </div>
              </>
            ) : (
              <div className="p-6 text-center text-gray-500">Coming Soon</div>
            )}
          </div>

          {/* Country Footy Budget */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {countryFooty ? (
              <>
                {countryFooty.coverImage?.asset?._ref ? (
                  <img 
                    src={`https://cdn.sanity.io/images/2y2dueu9/production/${countryFooty.coverImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png')}`}
                    alt={countryFooty.title}
                    className="w-full h-80 object-cover"
                  />
                ) : (
                  <div className="w-full h-80 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                    <span className="text-white font-bold text-center p-4">COUNTRY FOOTY BUDGET</span>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">COUNTRY FOOTY BUDGET</h3>
                  <a href={countryFooty.pdfUrl} target="_blank" className="block w-full bg-[#2ca3ee] text-white text-center py-2 rounded font-bold hover:bg-[#00b8f1] transition mb-2">
                    Download Latest Issue
                  </a>
                  <a href="#archive" className="block w-full bg-gray-200 text-gray-700 text-center py-2 rounded font-bold hover:bg-gray-300 transition">
                    View Archive
                  </a>
                </div>
              </>
            ) : (
              <div className="p-6 text-center text-gray-500">Coming Soon</div>
            )}
          </div>
        </div>
      </section>

      {/* AFL Content */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-[#2ca3ee] border-b-4 border-[#2ca3ee] pb-2">AFL</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* AFL Editorials */}
            <div>
              <h3 className="text-xl font-bold mb-4">LATEST EDITORIALS</h3>
              <div className="space-y-4">
                {content.aflArticles.length > 0 ? (
                  content.aflArticles.map((article) => (
                    <div key={article._id} className="bg-gray-50 p-4 rounded-lg shadow">
                      <h4 className="font-bold text-lg mb-2">{article.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">{article.excerpt}</p>
                      <a href={`/editorials/${article.slug.current}`} className="text-[#2ca3ee] font-semibold hover:underline">
                        Read More →
                      </a>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No AFL editorials yet</p>
                )}
              </div>
            </div>

            {/* AFL Match Results */}
            <div>
              <h3 className="text-xl font-bold mb-4">LATEST MATCH RESULTS</h3>
              <div className="space-y-4">
                {content.aflMatches.length > 0 ? (
                  content.aflMatches.map((match) => (
                    <div key={match._id} className="bg-gray-50 p-4 rounded-lg shadow">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold">{match.homeTeam}</span>
                        <span className="text-xl font-bold text-[#2ca3ee]">{match.homeScore}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold">{match.awayTeam}</span>
                        <span className="text-xl font-bold text-[#2ca3ee]">{match.awayScore}</span>
                      </div>
                      <a href={`/match-results/${match.slug.current}`} className="text-[#2ca3ee] font-semibold hover:underline text-sm">
                        View Full Report →
                      </a>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No AFL match results yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SANFL Content */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-[#2ca3ee] border-b-4 border-[#2ca3ee] pb-2">SANFL</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* SANFL Editorials */}
          <div>
            <h3 className="text-xl font-bold mb-4">LATEST EDITORIALS</h3>
            <div className="space-y-4">
              {content.sanflArticles.length > 0 ? (
                content.sanflArticles.map((article) => (
                  <div key={article._id} className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold text-lg mb-2">{article.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">{article.excerpt}</p>
                    <a href={`/editorials/${article.slug.current}`} className="text-[#2ca3ee] font-semibold hover:underline">
                      Read More →
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No SANFL editorials yet</p>
              )}
            </div>
          </div>

          {/* SANFL Match Results */}
          <div>
            <h3 className="text-xl font-bold mb-4">LATEST MATCH RESULTS</h3>
            <div className="space-y-4">
              {content.sanflMatches.length > 0 ? (
                content.sanflMatches.map((match) => (
                  <div key={match._id} className="bg-white p-4 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold">{match.homeTeam}</span>
                      <span className="text-xl font-bold text-[#2ca3ee]">{match.homeScore}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold">{match.awayTeam}</span>
                      <span className="text-xl font-bold text-[#2ca3ee]">{match.awayScore}</span>
                    </div>
                    <a href={`/match-results/${match.slug.current}`} className="text-[#2ca3ee] font-semibold hover:underline text-sm">
                      View Full Report →
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No SANFL match results yet</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Form */}
      <section className="bg-[#2ca3ee] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">SUBSCRIBE FOR FREE</h2>
            <p className="mb-8">Get the latest SA Footballer magazines delivered straight to your inbox</p>
            
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="First Name" 
                  className="w-full px-4 py-3 rounded text-gray-900"
                  required
                />
                <input 
                  type="text" 
                  placeholder="Last Name" 
                  className="w-full px-4 py-3 rounded text-gray-900"
                  required
                />
              </div>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full px-4 py-3 rounded text-gray-900"
                required
              />
              <div className="text-left">
                <label className="flex items-start space-x-2">
                  <input type="checkbox" className="mt-1" required />
                  <span className="text-sm">I agree to receive magazines and updates from The South Australian Footballer</span>
                </label>
              </div>
              <button 
                type="submit" 
                className="w-full bg-[#e6fe00] text-black py-3 rounded-full font-bold hover:bg-yellow-400 transition"
              >
                SUBSCRIBE NOW
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Advertiser Logos */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">OUR MAGAZINE PARTNERS</h2>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-32 h-20 bg-white rounded shadow flex items-center justify-center">
                <span className="text-gray-400 text-xs">Partner {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Archive Section */}
      <section id="archive" className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-[#2ca3ee] border-b-4 border-[#2ca3ee] pb-2">MAGAZINE ARCHIVE</h2>
        
        <div className="grid md:grid-cols-4 lg:grid-cols-6 gap-4">
          {content.magazines.length > 0 ? (
            content.magazines.map((mag) => (
              <a key={mag._id} href={mag.pdfUrl} target="_blank" className="group">
                <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-xl transition">
                  {mag.coverImage?.asset?._ref ? (
                    <img 
                      src={`https://cdn.sanity.io/images/2y2dueu9/production/${mag.coverImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png')}`}
                      alt={mag.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <span className="text-white font-bold text-xs text-center p-2">{mag.title}</span>
                    </div>
                  )}
                  <div className="p-2 bg-[#2ca3ee] text-white text-center text-xs font-bold group-hover:bg-[#00b8f1] transition">
                    Download
                  </div>
                </div>
              </a>
            ))
          ) : (
            <div className="col-span-6 text-center text-gray-500 py-12">No archived magazines yet</div>
          )}
        </div>
      </section>
    </div>
  )
}
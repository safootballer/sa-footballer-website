import Header from '../components/Header'
import PhotoSlider from '../components/PhotoSlider'
import PartnerCarousel from '../components/PartnerCarousel'
import { client } from '../lib/sanity'

export const revalidate = 60

// Fetch latest content
async function getHomeContent() {
  const query = `{
    "articles": *[_type == "editorial"] | order(publishedAt desc)[0...10] {
      _id,
      title,
      slug,
      competition,
      publishedAt,
      excerpt,
      featuredImage
    },
    "magazines": *[_type == "magazine" && featured == true] | order(publishedAt desc)[0...4] {
      _id,
      title,
      coverImage,
      pdfUrl,
      magazineType,
      issueNumber
    },
    "videos": *[_type == "video"] | order(publishedAt desc)[0...4] {
      _id,
      title,
      youtubeUrl,
      publishedAt,
      category
    },
    "matchReports": *[_type == "matchResult"] | order(matchDate desc)[0...10] {
      _id,
      title,
      slug,
      competition,
      homeTeam,
      awayTeam,
      homeScore,
      awayScore,
      matchDate
    }
  }`
  
  return await client.fetch(query)
}

// Get 2 random country leagues
function getRandomLeagues() {
  const allLeagues = [
    { name: 'ADELAIDE PLAINS', slug: 'adelaide-plains' },
    { name: 'BAROSSA LIGHT & GAWLER', slug: 'barossa' },
    { name: 'BROKEN HILL', slug: 'broken-hill' },
    { name: 'EASTERN EYRE', slug: 'eastern-eyre' },
    { name: 'FAR NORTH', slug: 'far-north' },
    { name: 'GREAT FLINDERS', slug: 'great-flinders' },
    { name: 'GREAT SOUTHERN', slug: 'great-southern' },
    { name: 'HILLS DIVISION 1', slug: 'hills-div1' },
    { name: 'HILLS COUNTRY DIVISION', slug: 'hills-country' },
    { name: 'KANGAROO ISLAND', slug: 'kangaroo-island' },
    { name: 'KOWREE NARACOORTE TATIARA', slug: 'knt' },
    { name: 'LIMESTONE COAST', slug: 'limestone-coast' },
    { name: 'MURRAY VALLEY', slug: 'murray-valley' },
    { name: 'MID SOUTH EASTERN', slug: 'mid-south-eastern' },
    { name: 'NORTH EASTERN', slug: 'north-eastern' },
    { name: 'NORTHERN AREAS', slug: 'northern-areas' },
    { name: 'PORT LINCOLN', slug: 'port-lincoln' },
    { name: 'RIVER MURRAY', slug: 'river-murray' },
    { name: 'RIVERLAND', slug: 'riverland' },
    { name: 'SOUTHERN', slug: 'southern' },
    { name: 'SPENCER GULF', slug: 'spencer-gulf' },
    { name: 'WESTERN EYRE', slug: 'western-eyre' },
    { name: 'WHYALLA', slug: 'whyalla' },
    { name: 'YORKE PENINSULA', slug: 'yorke-peninsula' }
  ]
  
  // Shuffle and take first 2
  const shuffled = [...allLeagues].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 2)
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

export const metadata = {
  title: 'Home - The South Australian Footballer',
  description: 'South Australian Football News, Magazines, and Match Results',
}

export default async function HomePage() {
  const content = await getHomeContent()
  
  // Get 2 random leagues
  const randomLeagues = getRandomLeagues()

  // Filter content by competition
  const aflArticles = content.articles.filter(a => a.competition === 'AFL')
  const sanflArticles = content.articles.filter(a => a.competition === 'SANFL')
  const amateursArticles = content.articles.filter(a => a.competition === 'Amateur')
  const sawflArticles = content.articles.filter(a => a.competition === 'SAWFL Women\'s')

  const aflMatches = content.matchReports.filter(m => m.competition === 'AFL')
  const sanflMatches = content.matchReports.filter(m => m.competition === 'SANFL')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Photo Slider Section */}
      <section className="relative h-96 md:h-[500px] bg-black">
        <PhotoSlider 
          images={[
            '/slider/resized/1.png',
            '/slider/resized/2.png',
            '/slider/resized/3.png',
            '/slider/resized/4.png',
            '/slider/resized/5.png',
            '/slider/resized/6.png',
            '/slider/resized/7.png',
            '/slider/resized/8.png',
            '/slider/resized/9.png',
            '/slider/resized/10.png',
            '/slider/resized/11.png',
            '/slider/resized/12.png',
            '/slider/resized/13.png',
            '/slider/resized/14.png',
            '/slider/resized/15.png',
            '/slider/resized/16.png',
            '/slider/resized/17.png',
            '/slider/resized/18.png',
            '/slider/resized/19.png',
            '/slider/resized/20.png',
            '/slider/resized/21.png',
            '/slider/resized/22.png'
          ]}
          autoplayInterval={5000}
        />
      </section>

      {/* AFL Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 text-[#2ca3ee] border-b-4 border-[#2ca3ee] pb-2">AFL</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Latest Editorial */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-[#2ca3ee] text-white px-6 py-3 font-bold">LATEST EDITORIAL</div>
            {aflArticles[0] ? (
              <div className="p-6">
                <h3 className="text-xl text-[#2ca3ee] font-bold mb-2">{aflArticles[0].title}</h3>
                <p className="text-gray-600 text-sm mb-4">{aflArticles[0].excerpt}</p>
                <a href={`/editorials/${aflArticles[0].slug.current}`} className="text-[#2ca3ee] font-semibold hover:underline">
                  Read More →
                </a>
              </div>
            ) : (
              <div className="p-6 text-gray-500">No AFL editorials yet</div>
            )}
          </div>

          {/* Latest Match Result */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-[#2ca3ee] text-white px-6 py-3 font-bold">LATEST MATCH RESULT</div>
            {aflMatches[0] ? (
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-lg">{aflMatches[0].homeTeam}</span>
                  <span className="text-2xl font-bold text-[#2ca3ee]">{aflMatches[0].homeScore}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-lg">{aflMatches[0].awayTeam}</span>
                  <span className="text-2xl font-bold text-[#2ca3ee]">{aflMatches[0].awayScore}</span>
                </div>
                <a href={`/match-results/${aflMatches[0].slug.current}`} className="text-[#2ca3ee] font-semibold hover:underline">
                  View Full Report →
                </a>
              </div>
            ) : (
              <div className="p-6 text-gray-500">No AFL match results yet</div>
            )}
          </div>
        </div>
        <div className="mt-6 text-center">
          <a href="/editorials?competition=afl" className="bg-[#2ca3ee] text-white px-8 py-3 rounded-full font-bold hover:bg-[#00b8f1] transition inline-block">
            View All AFL Editorials
          </a>
        </div>
      </section>

      {/* SANFL Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-[#2ca3ee] border-b-4 border-[#2ca3ee] pb-2">SANFL</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Latest Editorial */}
            <div className="bg-gray-50 rounded-lg shadow-lg overflow-hidden">
              <div className="bg-[#2ca3ee] text-white px-6 py-3 font-bold">LATEST EDITORIAL</div>
              {sanflArticles[0] ? (
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{sanflArticles[0].title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{sanflArticles[0].excerpt}</p>
                  <a href={`/editorials/${sanflArticles[0].slug.current}`} className="text-[#2ca3ee] font-semibold hover:underline">
                    Read More →
                  </a>
                </div>
              ) : (
                <div className="p-6 text-gray-500">No SANFL editorials yet</div>
              )}
            </div>

            {/* Latest Match Result */}
            <div className="bg-gray-50 rounded-lg shadow-lg overflow-hidden">
              <div className="bg-[#2ca3ee] text-white px-6 py-3 font-bold">LATEST MATCH RESULT</div>
              {sanflMatches[0] ? (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-lg">{sanflMatches[0].homeTeam}</span>
                    <span className="text-2xl font-bold text-[#2ca3ee]">{sanflMatches[0].homeScore}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-lg">{sanflMatches[0].awayTeam}</span>
                    <span className="text-2xl font-bold text-[#2ca3ee]">{sanflMatches[0].awayScore}</span>
                  </div>
                  <a href={`/match-results/${sanflMatches[0].slug.current}`} className="text-[#2ca3ee] font-semibold hover:underline">
                    View Full Report →
                  </a>
                </div>
              ) : (
                <div className="p-6 text-gray-500">No SANFL match results yet</div>
              )}
            </div>
          </div>
          <div className="mt-6 text-center">
            <a href="/editorials?competition=sanfl" className="bg-[#2ca3ee] text-white px-8 py-3 rounded-full font-bold hover:bg-[#00b8f1] transition inline-block">
              View All SANFL Editorials
            </a>
          </div>
        </div>
      </section>

      {/* AMATEURS Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 text-[#2ca3ee] border-b-4 border-[#2ca3ee] pb-2">AMATEURS</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Latest Editorial */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-[#2ca3ee] text-white px-6 py-3 font-bold">LATEST EDITORIAL</div>
            {amateursArticles[0] ? (
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{amateursArticles[0].title}</h3>
                <p className="text-gray-600 text-sm mb-4">{amateursArticles[0].excerpt}</p>
                <a href={`/editorials/${amateursArticles[0].slug.current}`} className="text-[#2ca3ee] font-semibold hover:underline">
                  Read More →
                </a>
              </div>
            ) : (
              <div className="p-6 text-gray-500">No Amateurs editorials yet</div>
            )}
          </div>

          {/* Latest Match Result */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-[#2ca3ee] text-white px-6 py-3 font-bold">LATEST MATCH RESULT</div>
            <div className="p-6 text-gray-500">Match results coming soon</div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <a href="/editorials?competition=amateurs" className="bg-[#2ca3ee] text-white px-8 py-3 rounded-full font-bold hover:bg-[#00b8f1] transition inline-block">
            View All Amateurs Editorials
          </a>
        </div>
      </section>

      {/* SAWFL WOMEN'S Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-[#2ca3ee] border-b-4 border-[#2ca3ee] pb-2">SAWFL WOMEN'S</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Latest Editorial */}
            <div className="bg-gray-50 rounded-lg shadow-lg overflow-hidden">
              <div className="bg-[#2ca3ee] text-white px-6 py-3 font-bold">LATEST EDITORIAL</div>
              {sawflArticles[0] ? (
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{sawflArticles[0].title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{sawflArticles[0].excerpt}</p>
                  <a href={`/editorials/${sawflArticles[0].slug.current}`} className="text-[#2ca3ee] font-semibold hover:underline">
                    Read More →
                  </a>
                </div>
              ) : (
                <div className="p-6 text-gray-500">No SAWFL Women's editorials yet</div>
              )}
            </div>

            {/* Latest Match Result */}
            <div className="bg-gray-50 rounded-lg shadow-lg overflow-hidden">
              <div className="bg-[#2ca3ee] text-white px-6 py-3 font-bold">LATEST MATCH RESULT</div>
              <div className="p-6 text-gray-500">Match results coming soon</div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <a href="/editorials?competition=sawfl" className="bg-[#2ca3ee] text-white px-8 py-3 rounded-full font-bold hover:bg-[#00b8f1] transition inline-block">
              View All SAWFL Women's Editorials
            </a>
          </div>
        </div>
      </section>

      {/* Country Leagues Section - 2 Random Leagues */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 text-[#2ca3ee] border-b-4 border-[#2ca3ee] pb-2">COUNTRY FOOTBALL</h2>
        <p className="text-gray-600 mb-6">Featured leagues this week</p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {randomLeagues.map((league) => (
            <div key={league.slug} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-[#e6fe00] text-black px-6 py-3 font-bold">{league.name}</div>
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="font-bold text-sm text-gray-500 mb-2">LATEST EDITORIAL</h4>
                  <p className="text-gray-700">Latest news from {league.name}</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-bold text-sm text-gray-500 mb-2">LATEST MATCH RESULT</h4>
                  <p className="text-gray-700">Recent match results and scores</p>
                </div>
                <a href={`/country-football?league=${league.slug}`} className="text-[#2ca3ee] font-semibold hover:underline">
                  View All {league.name} Content →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a href="/country-football" className="bg-[#e6fe00] text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition inline-block">
            View All Country Leagues
          </a>
        </div>
      </section>

      {/* Magazine Covers Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-[#2ca3ee] border-b-4 border-[#2ca3ee] pb-2">LATEST MAGAZINES</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {content.magazines.length > 0 ? (
              content.magazines.map((mag) => (
                <a key={mag._id} href={mag.pdfUrl} target="_blank" className="group">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                    {mag.coverImage?.asset?._ref ? (
                      <img 
                        src={`https://cdn.sanity.io/images/2y2dueu9/production/${mag.coverImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png')}`}
                        alt={mag.title}
                        className="w-full h-64 object-cover"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                        <span className="text-white font-bold text-center p-4">{mag.title}</span>
                      </div>
                    )}
                    <div className="p-4 bg-[#2ca3ee] text-white text-center font-bold group-hover:bg-[#00b8f1] transition">
                      Download PDF
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <div className="col-span-4 text-center text-gray-500 py-12">No magazines available yet</div>
            )}
          </div>
          <div className="mt-8 text-center">
            <a href="/magazines" className="bg-[#e6fe00] text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition inline-block">
              View All Magazines
            </a>
          </div>
        </div>
      </section>

      {/* Advertiser Logos Carousel */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">OUR PARTNERS</h2>
          <PartnerCarousel />
        </div>
      </section>

      {/* Videos Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-[#2ca3ee] border-b-4 border-[#2ca3ee] pb-2">LATEST VIDEOS</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.videos.length > 0 ? (
              content.videos.map((video) => {
                const videoId = getYouTubeId(video.youtubeUrl)
                
                return (
                  <div key={video._id} className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
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
                      <div className="w-full h-40 bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                        <span className="text-white text-5xl">▶️</span>
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-bold text-sm line-clamp-2">{video.title}</h3>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="col-span-4 text-center text-gray-500 py-12">No videos available yet</div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">The South Australian Footballer</h3>
              <p className="text-gray-400">Premier publisher of SA footy magazines and media since 1993</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/magazines" className="hover:text-white">Magazines</a></li>
                <li><a href="/match-results" className="hover:text-white">Match Results</a></li>
                <li><a href="/editorials" className="hover:text-white">Editorials</a></li>
                <li><a href="/country-football" className="hover:text-white">Country Football</a></li>
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
  )
}
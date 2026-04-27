import Header from '../components/Header'
import PhotoSlider from '../components/PhotoSlider'
import PartnerCarousel from '../components/PartnerCarousel'
import { client } from '../lib/sanity'

export const revalidate = 60

async function getHomeContent() {
  const now = new Date().toISOString()
  const query = `{
    "magazines": *[_type == "magazine"] | order(publishedAt desc)[0...4] {
      _id, title, coverImage, pdfUrl, magazineType, issueNumber, publishedAt
    },
    "videos": *[_type == "video"] | order(publishedAt desc)[0...4] {
      _id, title, youtubeUrl, publishedAt, category
    },
    "matchReports": *[_type == "matchResult" && competition != "Country Football"] | order(matchDate desc)[0...20] {
      _id, title, slug, competition, homeTeam, awayTeam, homeScore, awayScore, matchDate
    },
    "upcoming": *[_type == "upcomingMatch" && matchDate > "${now}" && competition != "Country Football"] | order(matchDate asc)[0...20] {
      _id, homeTeam, awayTeam, matchDate, venue, round, competition, notes
    }
  }`
  return await client.fetch(query)
}

function getRandomLeagues() {
  const allLeagues = [
    { name: 'ADELAIDE PLAINS', slug: 'adelaide-plains' },
    { name: 'BAROSSA LIGHT & GAWLER', slug: 'barossa' },
    { name: 'EASTERN EYRE', slug: 'eastern-eyre' },
    { name: 'FAR NORTH', slug: 'far-north' },
    { name: 'GREAT FLINDERS', slug: 'great-flinders' },
    { name: 'GREAT SOUTHERN', slug: 'great-southern' },
    { name: 'HILLS DIVISION 1', slug: 'hills-div1' },
    { name: 'KANGAROO ISLAND', slug: 'kangaroo-island' },
    { name: 'LIMESTONE COAST', slug: 'limestone-coast' },
    { name: 'MURRAY VALLEY', slug: 'murray-valley' },
    { name: 'NORTH EASTERN', slug: 'north-eastern' },
    { name: 'NORTHERN AREAS', slug: 'northern-areas' },
    { name: 'PORT LINCOLN', slug: 'port-lincoln' },
    { name: 'RIVERLAND', slug: 'riverland' },
    { name: 'SOUTHERN', slug: 'southern' },
    { name: 'WHYALLA', slug: 'whyalla' },
    { name: 'YORKE PENINSULA', slug: 'yorke-peninsula' }
  ]
  return [...allLeagues].sort(() => Math.random() - 0.5).slice(0, 2)
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
  const randomLeagues = getRandomLeagues()

  const getLatestMatch  = (comp) => content.matchReports.find(m => m.competition === comp)
  const getNextUpcoming = (comp) => content.upcoming.find(u => u.competition === comp)

  const CompetitionSection = ({ title, comp, matchCat, bg = 'bg-gray-50' }) => {
    const match    = getLatestMatch(comp)
    const upcoming = getNextUpcoming(comp)

    return (
      <section className={`${bg} py-12`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-[#2ca3ee] border-b-4 border-[#2ca3ee] pb-2">{title}</h2>
          <div className="grid md:grid-cols-2 gap-6">

            {/* Latest Match Result */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-[#2ca3ee] text-white px-5 py-3 font-bold text-sm tracking-wide">🏈 LATEST MATCH RESULT</div>
              {match ? (
                <div className="p-5">
                  <p className="text-gray-400 text-xs mb-3">
                    {new Date(match.matchDate).toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    {match.round ? ` · ${match.round}` : ''}
                  </p>
                  <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-100">
                    <span className="font-bold text-gray-800 text-lg">{match.homeTeam}</span>
                    <span className="text-2xl font-bold text-[#2ca3ee]">{match.homeScore}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                    <span className="font-bold text-gray-800 text-lg">{match.awayTeam}</span>
                    <span className="text-2xl font-bold text-[#2ca3ee]">{match.awayScore}</span>
                  </div>
                  <a href={`/match-results/${match.slug.current}`} className="text-[#2ca3ee] font-semibold hover:underline text-sm">Read Full Report →</a>
                </div>
              ) : (
                <div className="p-5 text-gray-400 text-sm">No match results yet</div>
              )}
            </div>

            {/* Upcoming Match */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-[#e6fe00]">
              <div className="bg-gray-800 text-white px-5 py-3 font-bold text-sm tracking-wide">📅 UPCOMING MATCH</div>
              {upcoming ? (
                <div className="p-5">
                  <p className="text-[#2ca3ee] font-bold text-xs mb-3">
                    {new Date(upcoming.matchDate).toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    {' · '}
                    {new Date(upcoming.matchDate).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}
                    {upcoming.round ? ` · ${upcoming.round}` : ''}
                  </p>
                  <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-100">
                    <span className="font-bold text-gray-800 text-lg">{upcoming.homeTeam}</span>
                    <span className="text-xs font-bold text-gray-400">HOME</span>
                  </div>
                  <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                    <span className="font-bold text-gray-800 text-lg">{upcoming.awayTeam}</span>
                    <span className="text-xs font-bold text-gray-400">AWAY</span>
                  </div>
                  {upcoming.venue && <p className="text-gray-500 text-sm mb-1">📍 {upcoming.venue}</p>}
                  {upcoming.notes && <p className="text-[#2ca3ee] text-sm font-semibold">⭐ {upcoming.notes}</p>}
                </div>
              ) : (
                <div className="p-5 text-gray-400 text-sm">No upcoming matches scheduled</div>
              )}
            </div>
          </div>

          <div className="mt-6">
            <a href={`/match-results?cat=${matchCat}`} className="bg-[#2ca3ee] text-white px-8 py-3 rounded-full font-bold hover:bg-[#00b8f1] transition inline-block">
              View All {title} Match Results
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Photo Slider */}
      <section className="relative h-96 md:h-[500px] bg-black">
        <PhotoSlider
          images={[
            '/slider/resized/1.png','/slider/resized/2.png','/slider/resized/3.png',
            '/slider/resized/4.png','/slider/resized/5.png','/slider/resized/6.png',
            '/slider/resized/7.png','/slider/resized/8.png','/slider/resized/9.png',
            '/slider/resized/10.png','/slider/resized/11.png','/slider/resized/12.png',
            '/slider/resized/13.png','/slider/resized/14.png','/slider/resized/15.png',
            '/slider/resized/16.png','/slider/resized/17.png','/slider/resized/18.png',
            '/slider/resized/19.png','/slider/resized/20.png','/slider/resized/21.png',
            '/slider/resized/22.png'
          ]}
          autoplayInterval={5000}
        />
      </section>

      <CompetitionSection title="AFL"           comp="AFL"            matchCat="afl"      bg="bg-gray-50" />
      <CompetitionSection title="AFLW"          comp="AFLW"           matchCat="aflw"     bg="bg-white" />
      <CompetitionSection title="SANFL"         comp="SANFL"          matchCat="sanfl"    bg="bg-gray-50" />
      <CompetitionSection title="SANFLW"        comp="SANFLW"         matchCat="sanflw"   bg="bg-white" />
      <CompetitionSection title="AMATEURS"      comp="Amateur"        matchCat="amateurs" bg="bg-gray-50" />
      <CompetitionSection title="SAWFL WOMEN'S" comp="SAWFL Women's"  matchCat="sawfl"    bg="bg-white" />

      {/* Country Football */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-[#2ca3ee] border-b-4 border-[#2ca3ee] pb-2">COUNTRY FOOTBALL</h2>
          <p className="text-gray-600 mb-6">Featured leagues this week</p>
          <div className="grid md:grid-cols-2 gap-8">
            {randomLeagues.map((league) => (
              <div key={league.slug} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-[#e6fe00] text-black px-6 py-3 font-bold">{league.name}</div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">Latest match results and scores from {league.name}</p>
                  <a href={`/country-football?league=${league.slug}`} className="text-[#2ca3ee] font-semibold hover:underline">
                    View {league.name} Results →
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
        </div>
      </section>

      {/* Latest Magazines */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-[#2ca3ee] border-b-4 border-[#2ca3ee] pb-2">LATEST MAGAZINES</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {content.magazines.length > 0 ? content.magazines.map((mag) => (
              <a key={mag._id} href={mag.pdfUrl} target="_blank" rel="noreferrer" className="group">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                  {mag.coverImage?.asset?._ref ? (
                    <img src={`https://cdn.sanity.io/images/2y2dueu9/production/${mag.coverImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png')}`} alt={mag.title} className="w-full h-64 object-cover" />
                  ) : (
                    <div className="w-full h-64 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <span className="text-white font-bold text-center p-4">{mag.title}</span>
                    </div>
                  )}
                  <div className="p-4 bg-[#2ca3ee] text-white text-center font-bold group-hover:bg-[#00b8f1] transition">Download PDF</div>
                </div>
              </a>
            )) : (
              <div className="col-span-4 text-center text-gray-500 py-12">No magazines available yet</div>
            )}
          </div>
          <div className="mt-8 text-center">
            <a href="/magazines" className="bg-[#e6fe00] text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition inline-block">View All Magazines</a>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">OUR PARTNERS</h2>
          <PartnerCarousel />
        </div>
      </section>

      {/* Videos */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-[#2ca3ee] border-b-4 border-[#2ca3ee] pb-2">LATEST VIDEOS</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.videos.length > 0 ? content.videos.map((video) => {
              const videoId = getYouTubeId(video.youtubeUrl)
              return (
                <div key={video._id} className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
                  {videoId ? (
                    <div className="relative pb-[56.25%]">
                      <iframe className="absolute top-0 left-0 w-full h-full" src={`https://www.youtube.com/embed/${videoId}`} title={video.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                  ) : (
                    <div className="w-full h-40 bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                      <span className="text-white text-5xl">▶️</span>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-sm line-clamp-2 text-gray-800">{video.title}</h3>
                  </div>
                </div>
              )
            }) : (
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
                <li><a href="/ladder" className="hover:text-white">Ladders</a></li>
                <li><a href="/goal-kickers" className="hover:text-white">Goal Kickers</a></li>
                <li><a href="/country-football" className="hover:text-white">Country Football</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Competitions</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/match-results?cat=afl" className="hover:text-white">AFL & AFLW</a></li>
                <li><a href="/match-results?cat=sanfl" className="hover:text-white">SANFL & SANFLW</a></li>
                <li><a href="/match-results?cat=amateurs" className="hover:text-white">SA Amateur</a></li>
                <li><a href="/match-results?cat=sawfl" className="hover:text-white">{"SAWFL Women's"}</a></li>
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
                <a href="https://github.com/talha-11-11" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">GitHub: talha-11-11</a>
                <span>•</span>
                <a href="mailto:talhasarfraz29@gmail.com" className="hover:text-blue-400 transition">talhasarfraz29@gmail.com</a>
                <span>•</span>
                <a href="https://www.upwork.com/freelancers/~0128359f0564f06967" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">Upwork Profile</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
import Header from '../components/Header'
import PhotoSlider from '../components/PhotoSlider'
import PartnerCarousel from '../components/PartnerCarousel'
import HomeDeals from '../components/HomeDeals'
import { client } from '../lib/sanity'

export const revalidate = 60

async function getHomeContent() {
  const now = new Date().toISOString()
  const query = `{
    "magazines": *[_type == "magazine"] | order(publishedAt desc)[0...4] {
      _id, title, coverImage, pdfUrl, magazineType, issueNumber, publishedAt
    },
    "videos": *[_type == "video" && category in ["filming", "live-stream"]] | order(publishedAt desc)[0...4] {
      _id, title, youtubeUrl, publishedAt, category
    },
    "matchReports": *[_type == "matchResult" && competition != "Country Football"] | order(matchDate desc)[0...50] {
      _id, title, slug, competition, homeTeam, awayTeam, homeScore, awayScore, matchDate
    },
    "upcomingBulk": *[_type == "upcomingMatchesBulk" && matchDate > "${now}"] | order(matchDate asc)[0...50] {
      _id, competition, amateurGrade, sanflGrade, countryLeague, round, matchDate, matches
    },
    "homeSlider": *[_type == "homeSlider"][0] {
      images[] { asset, alt }
    }
  }`
  return await client.fetch(query)
}

// Fetch latest videos from the YouTube channel uploads playlist
async function getYoutubeVideos() {
  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) return []
  const UPLOADS_PLAYLIST = 'UUohBOBxeJt9AruGWffeW-OQ'
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=10&playlistId=${UPLOADS_PLAYLIST}&key=${apiKey}`,
      { next: { revalidate: 1800 } }
    )
    const data = await res.json()
    if (data.error) return []
    return (data.items ?? []).map(item => {
      const sn = item.snippet
      const videoId = item.contentDetails?.videoId
      return {
        _id: `yt-${videoId}`,
        title: sn.title,
        youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
        publishedAt: sn.contentDetails?.videoPublishedAt ?? sn.publishedAt,
        source: 'youtube',
      }
    }).filter(v => v.youtubeUrl)
  } catch {
    return []
  }
}

// Build a Sanity image URL from an asset ref
function sanityImageUrl(ref) {
  if (!ref) return null
  return `https://cdn.sanity.io/images/2y2dueu9/production/${ref
    .replace('image-', '')
    .replace(/-(jpg|jpeg|png|webp)$/, '.$1')}`
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
  // Match-result / fixtures data is still fetched but not shown while the
  // season is off. Video + magazine content stays live.
  const [content, youtubeVideos] = await Promise.all([
    getHomeContent(),
    getYoutubeVideos(),
  ])

  // Merge Sanity + YouTube videos, de-dupe by YouTube ID, sort by date, take latest 4
  const ytId = (url) => {
    if (!url) return null
    const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/)
    return m ? m[1] : null
  }
  const sanityVideos = content.videos ?? []
  const sanityIds = new Set(sanityVideos.map(v => ytId(v.youtubeUrl)).filter(Boolean))
  const mergedVideos = [
    ...sanityVideos,
    ...youtubeVideos.filter(v => !sanityIds.has(ytId(v.youtubeUrl))),
  ]
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 4)

  // Hardcoded fallback slider images
  const fallbackSlider = [
    '/slider/resized/1.png','/slider/resized/2.png','/slider/resized/3.png',
    '/slider/resized/4.png','/slider/resized/5.png','/slider/resized/6.png',
    '/slider/resized/7.png','/slider/resized/8.png','/slider/resized/9.png',
    '/slider/resized/10.png','/slider/resized/11.png','/slider/resized/12.png',
    '/slider/resized/13.png','/slider/resized/14.png','/slider/resized/15.png',
    '/slider/resized/16.png','/slider/resized/17.png','/slider/resized/18.png',
    '/slider/resized/19.png','/slider/resized/20.png','/slider/resized/21.png',
    '/slider/resized/22.png'
  ]

  // Use Sanity images if an admin has uploaded any, otherwise fall back to hardcoded
  const sliderImages = content.homeSlider?.images?.length
    ? content.homeSlider.images.map(img => sanityImageUrl(img?.asset?._ref)).filter(Boolean)
    : fallbackSlider

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Photo Slider */}
      <section className="relative h-96 md:h-[500px] bg-black">
        <PhotoSlider
          images={sliderImages}
          autoplayInterval={5000}
        />
      </section>

      {/* SUPER SAVER DEALS carousel (replaces match results while season is off) */}
      <HomeDeals />

      {/* ───────────────────────────────────────────────────────────────
          MATCH RESULTS SECTIONS — TURNED OFF until the new season starts.
          To bring them back next season, restore the CompetitionSection
          component + the four <CompetitionSection /> calls and the Country
          Football featured section from the previous version of this file.
         ─────────────────────────────────────────────────────────────── */}

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
            {mergedVideos.length > 0 ? mergedVideos.map((video) => {
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

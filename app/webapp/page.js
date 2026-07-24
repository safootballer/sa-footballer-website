import Header from '../../components/Header'
import { client } from '../../lib/sanity'

export const revalidate = 60

function sanityImg(ref) {
  if (!ref) return null
  return `https://cdn.sanity.io/images/2y2dueu9/production/${ref
    .replace('image-', '').replace(/-([a-z]+)$/, '.$1')}`
}

function getYouTubeId(url) {
  if (!url) return null
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|live\/))([a-zA-Z0-9_-]{11})/)
  return match?.[1] ?? null
}

function VideoOrPlaceholder({ url, label }) {
  const ytId = getYouTubeId(url)
  if (ytId) {
    return (
      <div className="mt-8 rounded-xl overflow-hidden shadow-lg">
        <div className="relative pb-[56.25%]">
          <iframe className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${ytId}`}
            title={label} frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen />
        </div>
      </div>
    )
  }
  if (url) {
    return (
      <div className="mt-8 rounded-xl overflow-hidden shadow-lg">
        <video controls className="w-full rounded-xl">
          <source src={url} />
        </video>
      </div>
    )
  }
  return (
    <div className="mt-8 bg-gray-100 rounded-xl h-48 flex items-center justify-center border-2 border-dashed border-gray-300">
      <div className="text-center text-gray-400">
        <div className="text-4xl mb-2">▶️</div>
        <p className="font-semibold">{label}</p>
        <p className="text-sm">Coming soon</p>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Web App - The South Australian Footballer',
  description: 'Install the SA Footballer web app on your phone for instant access to match results, ladders, goal kickers and more.',
}

export default async function WebAppPage() {
  const cms = await client.fetch(
    `*[_type == "webApp"][0] {
      title, subtitle, heroDescription,
      appScreenshot, iphoneVideoUrl, androidVideoUrl,
      iphoneScreenshot, androidScreenshot, extraImages
    }`
  ).catch(() => null)

  const heroTitle    = cms?.title       || 'SA Footballer Is Now a Web App'
  const heroSub      = cms?.subtitle    || 'Install it on your phone in seconds — no App Store required'
  const heroDesc     = cms?.heroDescription || 'Get instant access to match results, live ladders, goal kickers, upcoming fixtures and magazines — all from your home screen.'
  const appShotUrl   = sanityImg(cms?.appScreenshot?.asset?._ref)
  const iphoneShotUrl = sanityImg(cms?.iphoneScreenshot?.asset?._ref)
  const androidShotUrl = sanityImg(cms?.androidScreenshot?.asset?._ref)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-r from-[#2ca3ee] to-[#00b8f1] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="text-6xl mb-6">📱</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{heroTitle}</h1>
          <p className="text-xl md:text-2xl mb-6 opacity-90">{heroSub}</p>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">{heroDesc}</p>
        </div>
      </section>

      {/* What is a Web App */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-[#2ca3ee] border-b-4 border-[#2ca3ee] pb-2 mb-8">
            What Is the SA Footballer Web App?
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                The SA Footballer website has been built as a <strong>Progressive Web App (PWA)</strong> — modern technology that combines the best of a website with the convenience of a mobile app.
              </p>
              <p>
                Once installed on your phone, it works just like an app. You get a dedicated icon on your home screen, a faster loading experience, and everything you need to follow South Australian football in one place.
              </p>
              <p>
                Best of all — it's completely <strong>free</strong> and takes less than 30 seconds to install. No App Store. No Google Play. No downloads.
              </p>
            </div>
            {appShotUrl ? (
              <img src={appShotUrl} alt="SA Footballer App" className="rounded-2xl shadow-lg w-full object-cover" />
            ) : (
              <div className="bg-gray-100 rounded-2xl h-72 flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center text-gray-400">
                  <div className="text-5xl mb-3">📸</div>
                  <p className="font-semibold">App Screenshot</p>
                  <p className="text-sm">Upload via Sanity Studio</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-[#2ca3ee] border-b-4 border-[#2ca3ee] pb-2 mb-10">
            Everything SA Football at Your Fingertips
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              ['🏉', 'Match Results', "Full match reports across AFL, SANFL, Amateurs, SAWFL Women's and Country Football"],
              ['🏆', 'Live Ladders', 'Up-to-date standings across all competitions and divisions'],
              ['🥅', 'Goal Kickers', 'Season goal kicking leaders for every grade'],
              ['📅', 'Upcoming Fixtures', 'Never miss a game with upcoming match schedules'],
              ['📖', 'Magazines', "Download the SA Footballer, Ammo, Women's and Country editions"],
              ['🎥', 'Filming & Live Stream', 'Watch SA football matches live and on demand'],
            ].map(([icon, title, desc]) => (
              <div key={title} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to install */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-[#2ca3ee] border-b-4 border-[#2ca3ee] pb-2 mb-10">
            How to Install — It Only Takes 30 Seconds
          </h2>
          <div className="grid md:grid-cols-2 gap-12">

            {/* iPhone */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl"></span>
                <h3 className="text-2xl font-bold text-gray-800">iPhone Users</h3>
              </div>
              <ol className="space-y-4">
                {[
                  'Open Safari on your iPhone',
                  'Go to safootballer.com.au',
                  'Tap the Share button at the bottom of the screen',
                  'Scroll down and tap "Add to Home Screen"',
                  'Tap "Add" in the top right corner',
                  'The SA Footballer icon will appear on your home screen',
                ].map((step, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#2ca3ee] text-white rounded-full flex items-center justify-center font-bold text-sm">{i + 1}</span>
                    <span className="text-gray-700 pt-1">{step}</span>
                  </li>
                ))}
              </ol>
              {iphoneShotUrl && <img src={iphoneShotUrl} alt="iPhone install" className="mt-6 rounded-xl shadow-md w-full" />}
              <VideoOrPlaceholder url={cms?.iphoneVideoUrl} label="iPhone Install Video" />
            </div>

            {/* Android */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">🤖</span>
                <h3 className="text-2xl font-bold text-gray-800">Android Users</h3>
              </div>
              <ol className="space-y-4">
                {[
                  'Open Chrome on your Android phone',
                  'Go to safootballer.com.au',
                  'Tap the three-dot menu in the top right corner',
                  'Tap "Add to Home Screen"',
                  'Tap "Add" to confirm',
                  'The SA Footballer icon will appear on your home screen',
                ].map((step, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#2ca3ee] text-white rounded-full flex items-center justify-center font-bold text-sm">{i + 1}</span>
                    <span className="text-gray-700 pt-1">{step}</span>
                  </li>
                ))}
              </ol>
              {androidShotUrl && <img src={androidShotUrl} alt="Android install" className="mt-6 rounded-xl shadow-md w-full" />}
              <VideoOrPlaceholder url={cms?.androidVideoUrl} label="Android Install Video" />
            </div>
          </div>

          {/* Extra images */}
          {cms?.extraImages?.length > 0 && (
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
              {cms.extraImages.map((img, i) => {
                const url = sanityImg(img?.asset?._ref)
                return url ? <img key={i} src={url} alt={`Screenshot ${i + 1}`} className="rounded-xl shadow-md w-full object-cover" /> : null
              })}
            </div>
          )}
        </div>
      </section>

      {/* Why PWA */}
      <section className="bg-[#0A1628] text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-10 text-center">Why We Built a Web App</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              ['⚡', 'Lightning Fast', 'Loads instantly every time, even on slower connections'],
              ['📵', 'No App Store Needed', 'Install directly from your browser — no downloads, no updates'],
              ['🔒', 'Always Up to Date', 'Results, ladders and fixtures update automatically in real time'],
            ].map(([icon, title, desc]) => (
              <div key={title} className="bg-white bg-opacity-10 rounded-xl p-6">
                <div className="text-5xl mb-4">{icon}</div>
                <h3 className="font-bold text-xl mb-2 text-[#e6fe00]">{title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 mt-10 text-sm">
            More than 80% of SA Footballer visitors access the site from a mobile device — so we built the fastest, most convenient mobile experience possible.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2ca3ee] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Install?</h2>
          <p className="text-xl mb-8 opacity-90">Follow the steps above and have SA Footballer on your home screen in under 30 seconds.</p>
          <a href="https://www.safootballer.com.au" className="inline-block bg-[#e6fe00] text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition">
            Visit safootballer.com.au
          </a>
          <p className="mt-6 opacity-75 text-sm">Then tap Share → Add to Home Screen (iPhone) or Menu → Add to Home Screen (Android)</p>
        </div>
      </section>
    </div>
  )
}
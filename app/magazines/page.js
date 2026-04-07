import Header from '../../components/Header'
import { client } from '../../lib/sanity'
import SubscribeForm from '../../components/SubscribeForm'

export const revalidate = 60

async function getMagazinesContent() {
  const query = `{
    "magazines": *[_type == "magazine"] | order(publishedAt desc) {
      _id, title, coverImage, pdfUrl, publishedAt, magazineType, issueNumber, excerpt
    },
    "aflArticles": *[_type == "editorial" && competition == "AFL"] | order(publishedAt desc)[0...2] {
      _id, title, slug, excerpt, publishedAt
    },
    "sanflArticles": *[_type == "editorial" && competition == "SANFL"] | order(publishedAt desc)[0...2] {
      _id, title, slug, excerpt, publishedAt
    },
    "aflMatches": *[_type == "matchResult" && competition == "AFL"] | order(matchDate desc)[0...2] {
      _id, title, slug, homeTeam, awayTeam, homeScore, awayScore, matchDate
    },
    "sanflMatches": *[_type == "matchResult" && competition == "SANFL"] | order(matchDate desc)[0...2] {
      _id, title, slug, homeTeam, awayTeam, homeScore, awayScore, matchDate
    }
  }`
  return await client.fetch(query)
}

export const metadata = {
  title: 'Magazines - The South Australian Footballer',
  description: "Download SA Footballer magazines - SA Footballer, Ammo Footy Budget, Women's Footy Budget, Country Footy Budget",
}

const ALL_PARTNERS = [
  { name: 'Bartercard',                                logo: '/partners/bartercard.png',    link: 'https://www.bartercard.com.au' },
  { name: 'SWAARM',                                    logo: '/partners/swaarm.jpg',        link: '#' },
  { name: 'MGA Insurance Group',                       logo: '/partners/mga.png',           link: '#' },
  { name: 'Print Wrap Pack',                           logo: '/partners/printwrappack.jpg', link: '#' },
  { name: 'Farmer to Fridge',                          logo: '/partners/farmer.png',        link: '#' },
  { name: 'Alpha Trophies',                            logo: '/partners/alpha.png',         link: '#' },
  { name: 'Arbitrage Investments Quality Sourcing',    logo: '/partners/arbitrage.png',     link: '#' },
  { name: 'Boss Driving School',                       logo: '/partners/boss.png',          link: '#' },
  { name: 'FootyBanners',                              logo: '/partners/footy.png',         link: '#' },
  { name: 'GPSS',                                      logo: '/partners/gpss.png',          link: '#' },
  { name: 'Gridare',                                   logo: '/partners/griadare.png',      link: '#' },
  { name: 'iSports Solutions',                         logo: '/partners/isports.png',       link: '#' },
  { name: 'Kids Cancer Project',                       logo: '/partners/kids.png',          link: '#' },
  { name: 'MR Communications',                         logo: '/partners/mr.png',            link: '#' },
  { name: 'PWP',                                       logo: '/partners/pwp.png',           link: '#' },
  { name: 'Sailax Global Technology',                  logo: '/partners/sailex.png',        link: '#' },
  { name: 'Sports Centre',                             logo: '/partners/sportscentre.png',  link: '#' },
  { name: 'Solid Display Systems',                     logo: '/partners/solid.png',         link: '#' },
  { name: 'The Ryan Bowman Legacy of Care Foundation', logo: '/partners/ryan.png',          link: '#' },
  { name: 'The Tradie Grid',                           logo: '/partners/tradie.png',        link: '#' },
  { name: 'TwoTwoSix Digital',                         logo: '/partners/226.png',           link: '#' },
  { name: 'Variety',                                   logo: '/partners/variety.png',       link: '#' },
]

export default async function MagazinesPage() {
  const content = await getMagazinesContent()

  const saFootballer = content.magazines.filter(m => m.magazineType === 'SA Footballer')[0]
  const ammoFooty    = content.magazines.filter(m => m.magazineType === 'Ammo Footy Budget')[0]
  const womensFooty  = content.magazines.filter(m => m.magazineType === "Women's Footy Budget")[0]
  const countryFooty = content.magazines.filter(m => m.magazineType === 'Country Footy Budget')[0]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-r from-[#2ca3ee] to-[#00b8f1] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">OUR MAGAZINES</h1>
          <p className="text-xl">Download the latest editions and browse our archive</p>
        </div>
      </section>

      {/* Latest Editions */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-[#2ca3ee] border-b-4 border-[#2ca3ee] pb-2">LATEST EDITIONS</h2>
        <div className="grid md:grid-cols-4 gap-6 mb-12">

          {[
            { mag: saFootballer,  label: 'SA FOOTBALLER',      gradient: 'from-blue-400 to-blue-600' },
            { mag: ammoFooty,     label: 'AMMO FOOTY BUDGET',  gradient: 'from-red-400 to-red-600'  },
            { mag: womensFooty,   label: "WOMEN'S FOOTY BUDGET", gradient: 'from-pink-400 to-pink-600' },
            { mag: countryFooty,  label: 'COUNTRY FOOTY BUDGET', gradient: 'from-green-400 to-green-600' },
          ].map(({ mag, label, gradient }) => (
            <div key={label} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {mag ? (
                <>
                  {mag.coverImage?.asset?._ref ? (
                    <img
                      src={`https://cdn.sanity.io/images/2y2dueu9/production/${mag.coverImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png')}`}
                      alt={mag.title}
                      className="w-full h-80 object-cover"
                    />
                  ) : (
                    <div className={`w-full h-80 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                      <span className="text-white font-bold text-center p-4">{label}</span>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{label}</h3>
                    <a href={mag.pdfUrl} target="_blank" className="block w-full bg-[#2ca3ee] text-white text-center py-2 rounded font-bold hover:bg-[#00b8f1] transition mb-2">
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
          ))}

        </div>
      </section>

      {/* AFL */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-[#2ca3ee] border-b-4 border-[#2ca3ee] pb-2">AFL</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">LATEST EDITORIALS</h3>
              <div className="space-y-4">
                {content.aflArticles.length > 0 ? content.aflArticles.map(a => (
                  <div key={a._id} className="bg-gray-50 p-4 rounded-lg shadow">
                    <h4 className="font-bold text-lg mb-2">{a.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">{a.excerpt}</p>
                    <a href={`/editorials/${a.slug.current}`} className="text-[#2ca3ee] font-semibold hover:underline">Read More →</a>
                  </div>
                )) : <p className="text-gray-500">No AFL editorials yet</p>}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">LATEST MATCH RESULTS</h3>
              <div className="space-y-4">
                {content.aflMatches.length > 0 ? content.aflMatches.map(m => (
                  <div key={m._id} className="bg-gray-50 p-4 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold">{m.homeTeam}</span>
                      <span className="text-xl font-bold text-[#2ca3ee]">{m.homeScore}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold">{m.awayTeam}</span>
                      <span className="text-xl font-bold text-[#2ca3ee]">{m.awayScore}</span>
                    </div>
                    <a href={`/match-results/${m.slug.current}`} className="text-[#2ca3ee] font-semibold hover:underline text-sm">View Full Report →</a>
                  </div>
                )) : <p className="text-gray-500">No AFL match results yet</p>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SANFL */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-[#2ca3ee] border-b-4 border-[#2ca3ee] pb-2">SANFL</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">LATEST EDITORIALS</h3>
            <div className="space-y-4">
              {content.sanflArticles.length > 0 ? content.sanflArticles.map(a => (
                <div key={a._id} className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-bold text-lg mb-2">{a.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">{a.excerpt}</p>
                  <a href={`/editorials/${a.slug.current}`} className="text-[#2ca3ee] font-semibold hover:underline">Read More →</a>
                </div>
              )) : <p className="text-gray-500">No SANFL editorials yet</p>}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">LATEST MATCH RESULTS</h3>
            <div className="space-y-4">
              {content.sanflMatches.length > 0 ? content.sanflMatches.map(m => (
                <div key={m._id} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">{m.homeTeam}</span>
                    <span className="text-xl font-bold text-[#2ca3ee]">{m.homeScore}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">{m.awayTeam}</span>
                    <span className="text-xl font-bold text-[#2ca3ee]">{m.awayScore}</span>
                  </div>
                  <a href={`/match-results/${m.slug.current}`} className="text-[#2ca3ee] font-semibold hover:underline text-sm">View Full Report →</a>
                </div>
              )) : <p className="text-gray-500">No SANFL match results yet</p>}
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe Form — client component handles the API call */}
      <SubscribeForm />

      {/* Magazine Partners */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center text-[#2ca3ee]">OUR MAGAZINE PARTNERS</h2>
          <p className="text-center text-gray-500 mb-8">Proudly supported by these organisations</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {ALL_PARTNERS.map((partner, i) => (
              <a key={i} href={partner.link} target="_blank" rel="noopener noreferrer"
                className="bg-white rounded-lg shadow hover:shadow-lg transition group flex flex-col items-center justify-between p-4 text-center">
                <div className="flex items-center justify-center h-20 w-full mb-3">
                  <img src={partner.logo} alt={partner.name} className="max-h-16 max-w-full object-contain group-hover:scale-105 transition" />
                </div>
                <p className="text-xs font-semibold text-gray-700 leading-tight">{partner.name}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Archive */}
      <section id="archive" className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-[#2ca3ee] border-b-4 border-[#2ca3ee] pb-2">MAGAZINE ARCHIVE</h2>
        <div className="grid md:grid-cols-4 lg:grid-cols-6 gap-4">
          {content.magazines.length > 0 ? content.magazines.map(mag => (
            <a key={mag._id} href={mag.pdfUrl} target="_blank" className="group">
              <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-xl transition">
                {mag.coverImage?.asset?._ref ? (
                  <img src={`https://cdn.sanity.io/images/2y2dueu9/production/${mag.coverImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png')}`} alt={mag.title} className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold text-xs text-center p-2">{mag.title}</span>
                  </div>
                )}
                <div className="p-2 bg-[#2ca3ee] text-white text-center text-xs font-bold group-hover:bg-[#00b8f1] transition">Download</div>
              </div>
            </a>
          )) : <div className="col-span-6 text-center text-gray-500 py-12">No archived magazines yet</div>}
        </div>
      </section>
    </div>
  )
}
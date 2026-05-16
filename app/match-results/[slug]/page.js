import Header from '../../../components/Header'
import { client } from '../../../lib/sanity'
import { PortableText } from '@portabletext/react'

export const revalidate = 60

async function getMatchResult(slug) {
  const query = `*[_type == "matchResult" && slug.current == $slug][0] {
    _id, title, slug, competition,
    homeTeam, awayTeam, homeScore, awayScore,
    matchDate, venue, round, content, author, featuredImage
  }`
  return await client.fetch(query, { slug })
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const match = await getMatchResult(slug)
  if (!match) return { title: 'Match Result Not Found' }
  return {
    title: `${match.homeTeam} vs ${match.awayTeam} - ${match.competition} - The South Australian Footballer`,
    description: `Match result: ${match.homeTeam} ${match.homeScore} - ${match.awayScore} ${match.awayTeam}`,
  }
}

// Clean grade suffixes from team names for display
function cleanTeamName(name) {
  if (!name) return name
  return name
    .replace(/\s*-\s*M\d+R?\s*$/i, '')
    .replace(/\s*-\s*W\d+R?\s*$/i, '')
    .replace(/\s*-\s*C\d+\s*$/i, '')
    .replace(/\s*-?\s*[A-Z]\s+Grade\s*$/i, '')
    .replace(/\s*-\s*Under\s*\d+\s*$/i, '')
    .replace(/\s*-\s*U\d+\s*$/i, '')
    .replace(/\s*\bM\d+R?\b\s*$/i, '')
    .replace(/\s*\bW\d+R?\b\s*$/i, '')
    .replace(/\s*\bC\d+\b\s*$/i, '')
    .trim()
}

// Custom PortableText components for bold headings and proper spacing
const portableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-2xl font-extrabold text-gray-900 mt-8 mb-3 uppercase tracking-wide border-b-2 border-[#2ca3ee] pb-2">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-extrabold text-gray-900 mt-8 mb-3 uppercase tracking-wide border-b-2 border-[#2ca3ee] pb-2">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-extrabold text-gray-900 mt-6 mb-2 uppercase tracking-wide">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-base font-extrabold text-gray-900 mt-4 mb-2 uppercase">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-gray-700 leading-relaxed mb-4">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
    em:     ({ children }) => <em className="italic">{children}</em>,
  },
}

export default async function MatchResultPage({ params }) {
  const { slug } = await params
  const match = await getMatchResult(slug)

  if (!match) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Match Result Not Found</h1>
          <a href="/match-results" className="text-[#2ca3ee] hover:underline">Back to Match Results</a>
        </div>
      </div>
    )
  }

  const homeTeam = cleanTeamName(match.homeTeam)
  const awayTeam = cleanTeamName(match.awayTeam)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-r from-[#2ca3ee] to-[#00b8f1] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-sm font-bold mb-2 opacity-80">{match.competition}</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{match.title}</h1>
            <p className="text-lg opacity-90">
              {new Date(match.matchDate).toLocaleDateString('en-AU', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
              })}
              {match.venue && ` • ${match.venue}`}
              {match.round && ` • ${match.round}`}
            </p>
          </div>
        </div>
      </section>

      {/* Score */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center md:text-right">
                <h2 className="text-3xl text-gray-600 font-bold mb-2">{homeTeam}</h2>
                <div className="text-6xl font-bold text-[#2ca3ee]">{match.homeScore}</div>
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-3xl text-gray-600 font-bold mb-2">{awayTeam}</h2>
                <div className="text-6xl font-bold text-[#2ca3ee]">{match.awayScore}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Report */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <article className="bg-white rounded-lg shadow-lg p-8">
            {match.content ? (
              <div className="max-w-none">
                <PortableText value={match.content} components={portableTextComponents} />
              </div>
            ) : (
              <p className="text-gray-600">Match report content coming soon...</p>
            )}
            {match.author && (
              <div className="mt-8 pt-8 border-t">
                <p className="text-gray-500 text-sm">By <span className="font-semibold text-gray-700">{match.author}</span></p>
              </div>
            )}
          </article>

          <div className="mt-8 text-center">
            <a href="/match-results" className="inline-block bg-[#2ca3ee] text-white px-8 py-3 rounded-full font-bold hover:bg-[#00b8f1] transition">
              Back to Match Results
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function MatchResultsContent() {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('cat') || 'all')
  const [matchResults, setMatchResults] = useState([])
  const [loading, setLoading] = useState(true)

  const categories = [
    { id: 'all', name: 'ALL' },
    { id: 'afl', name: 'AFL' },
    { id: 'aflw', name: 'AFLW' },
    { id: 'sanfl', name: 'SANFL' },
    { id: 'sanflw', name: 'SANFLW' },
    { id: 'amateurs', name: 'AMATEURS' },
    { id: 'sawfl', name: "SAWFL WOMEN'S" },
  ]

  // Declare function before useEffect
  async function fetchMatchResults() {
    setLoading(true)
    try {
      const response = await fetch('/api/match-results?category=' + selectedCategory)
      const data = await response.json()
      setMatchResults(data)
    } catch (error) {
      console.error('Error fetching match results:', error)
      setMatchResults([])
    }
    setLoading(false)
  }

  // Now useEffect can use it
  useEffect(() => {
    fetchMatchResults()
  }, [selectedCategory])

  return (
    <>
      <section className="bg-gradient-to-r from-[#2ca3ee] to-[#00b8f1] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">MATCH RESULTS</h1>
          <p className="text-xl">Latest scores and match reports from SA Football</p>
        </div>
      </section>

      <section className="bg-white border-b sticky top-0 z-40 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 py-4 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2 rounded-full font-bold whitespace-nowrap transition ${
                  selectedCategory === cat.id
                    ? 'bg-[#2ca3ee] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#2ca3ee] border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading match results...</p>
          </div>
        ) : matchResults.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchResults.map((match) => {
              return (
                <a key={match._id} href={`/match-results/${match.slug.current}`} className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                  <div className="bg-[#2ca3ee] text-white px-4 py-2 font-bold text-sm">
                    {match.competition}
                  </div>
                  <div className="p-6">
                    <p className="text-gray-500 text-sm mb-3">
                      {new Date(match.matchDate).toLocaleDateString('en-AU', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <div className="flex justify-between items-center mb-2 pb-2 border-b">
                      <span className="font-bold text-lg">{match.homeTeam}</span>
                      <span className="text-2xl font-bold text-[#2ca3ee]">{match.homeScore}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4 pb-2 border-b">
                      <span className="font-bold text-lg">{match.awayTeam}</span>
                      <span className="text-2xl font-bold text-[#2ca3ee]">{match.awayScore}</span>
                    </div>
                    {match.venue && (
                      <p className="text-gray-600 text-sm mb-3">
                        📍 {match.venue}
                      </p>
                    )}
                    <div className="text-[#2ca3ee] font-semibold group-hover:underline">
                      Read Full Report →
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏈</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Match Results Yet</h3>
            <p className="text-gray-600">
              {selectedCategory === 'all'
                ? 'Check back soon for the latest match results'
                : `No ${categories.find(c => c.id === selectedCategory)?.name} match results available yet`}
            </p>
          </div>
        )}
      </section>
    </>
  )
}
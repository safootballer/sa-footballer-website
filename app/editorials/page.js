'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function CountryFootballContent() {
  const searchParams = useSearchParams()
  const [selectedLeague, setSelectedLeague] = useState(searchParams.get('league') || 'all')
  const [content, setContent] = useState({ articles: [], matchReports: [] })
  const [loading, setLoading] = useState(true)

  const leagues = [
    { id: 'all', name: 'ALL LEAGUES' },
    { id: 'adelaide-plains', name: 'ADELAIDE PLAINS' },
    { id: 'barossa', name: 'BAROSSA LIGHT & GAWLER' },
    { id: 'broken-hill', name: 'BROKEN HILL' },
    { id: 'eastern-eyre', name: 'EASTERN EYRE' },
    { id: 'far-north', name: 'FAR NORTH' },
    { id: 'great-flinders', name: 'GREAT FLINDERS' },
    { id: 'great-southern', name: 'GREAT SOUTHERN' },
    { id: 'hills-div1', name: 'HILLS DIVISION 1' },
    { id: 'hills-country', name: 'HILLS COUNTRY DIVISION' },
    { id: 'kangaroo-island', name: 'KANGAROO ISLAND' },
    { id: 'knt', name: 'KOWREE NARACOORTE TATIARA' },
    { id: 'limestone-coast', name: 'LIMESTONE COAST' },
    { id: 'murray-valley', name: 'MURRAY VALLEY' },
    { id: 'mid-south-eastern', name: 'MID SOUTH EASTERN' },
    { id: 'north-eastern', name: 'NORTH EASTERN' },
    { id: 'northern-areas', name: 'NORTHERN AREAS' },
    { id: 'port-lincoln', name: 'PORT LINCOLN' },
    { id: 'river-murray', name: 'RIVER MURRAY' },
    { id: 'riverland', name: 'RIVERLAND' },
    { id: 'southern', name: 'SOUTHERN' },
    { id: 'spencer-gulf', name: 'SPENCER GULF' },
    { id: 'western-eyre', name: 'WESTERN EYRE' },
    { id: 'whyalla', name: 'WHYALLA' },
    { id: 'yorke-peninsula', name: 'YORKE PENINSULA' }
  ]

  useEffect(() => {
    fetchContent()
  }, [selectedLeague])

  async function fetchContent() {
    setLoading(true)
    try {
      const response = await fetch('/api/country-football?league=' + selectedLeague)
      const data = await response.json()
      setContent(data)
    } catch (error) {
      console.error('Error fetching country football content:', error)
      setContent({ articles: [], matchReports: [] })
    }
    setLoading(false)
  }

  const currentLeague = leagues.find(l => l.id === selectedLeague)

  return (
    <>
      <section className="bg-gradient-to-r from-[#e6fe00] to-yellow-400 text-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">COUNTRY FOOTBALL</h1>
          <p className="text-xl">24 Leagues across South Australia</p>
        </div>
      </section>

      <section className="bg-white border-b sticky top-0 z-40 shadow-md">
        <div className="container mx-auto px-4">
          <div className="py-4">
            <select
              value={selectedLeague}
              onChange={(e) => setSelectedLeague(e.target.value)}
              className="w-full md:w-auto px-6 py-3 rounded-lg border-2 border-[#2ca3ee] font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2ca3ee]"
            >
              {leagues.map((league) => (
                <option key={league.id} value={league.id}>
                  {league.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        {selectedLeague !== 'all' && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#2ca3ee] mb-4">{currentLeague?.name}</h2>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#e6fe00] border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading content...</p>
          </div>
        ) : (
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-[#e6fe00] pb-2">
                LATEST EDITORIALS
              </h3>
              {content.articles.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {content.articles.map((article) => {
                    return (
                      <a key={article._id} href={`/editorials/${article.slug.current}`} className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                        {article.featuredImage?.asset?._ref ? (
                          <div className="h-48 overflow-hidden">
                            <img 
                              src={`https://cdn.sanity.io/images/2y2dueu9/production/${article.featuredImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png')}`}
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                            />
                          </div>
                        ) : (
                          <div className="h-48 bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                            <span className="text-white text-5xl">📰</span>
                          </div>
                        )}
                        
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="bg-[#e6fe00] text-black text-xs font-bold px-3 py-1 rounded-full">
                              {article.league || 'Country Football'}
                            </span>
                            <span className="text-gray-500 text-sm">
                              {new Date(article.publishedAt).toLocaleDateString('en-AU', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          
                          <h4 className="text-xl font-bold mb-2 group-hover:text-[#2ca3ee] transition">
                            {article.title}
                          </h4>
                          
                          {article.excerpt && (
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                              {article.excerpt}
                            </p>
                          )}
                          
                          <div className="text-[#2ca3ee] font-semibold group-hover:underline">
                            Read More →
                          </div>
                        </div>
                      </a>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg">
                  <p className="text-gray-500">No editorials available yet</p>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-[#e6fe00] pb-2">
                LATEST MATCH RESULTS
              </h3>
              {content.matchReports.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {content.matchReports.map((match) => {
                    return (
                      <a key={match._id} href={`/match-results/${match.slug.current}`} className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                        <div className="bg-[#e6fe00] text-black px-4 py-2 font-bold text-sm">
                          {match.league || 'Country Football'}
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
                <div className="text-center py-12 bg-white rounded-lg">
                  <p className="text-gray-500">No match results available yet</p>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  )
}
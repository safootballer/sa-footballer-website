'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function CountryFootballContent() {
  const searchParams = useSearchParams()
  const [selectedLeague, setSelectedLeague]   = useState(searchParams.get('league') || 'all')
  const [matchResults, setMatchResults]       = useState([])
  const [upcomingMatches, setUpcomingMatches] = useState([])
  const [loading, setLoading]                 = useState(true)
  const [loadingUpcoming, setLoadingUpcoming] = useState(true)

  const leagues = [
    { id: 'all',               name: 'ALL LEAGUES' },
    { id: 'adelaide-plains',   name: 'ADELAIDE PLAINS' },
    { id: 'barossa',           name: 'BAROSSA LIGHT & GAWLER' },
    { id: 'broken-hill',       name: 'BROKEN HILL' },
    { id: 'eastern-eyre',      name: 'EASTERN EYRE' },
    { id: 'far-north',         name: 'FAR NORTH' },
    { id: 'great-flinders',    name: 'GREAT FLINDERS' },
    { id: 'great-southern',    name: 'GREAT SOUTHERN' },
    { id: 'hills-div1',        name: 'HILLS DIVISION 1' },
    { id: 'hills-country',     name: 'HILLS COUNTRY DIVISION' },
    { id: 'kangaroo-island',   name: 'KANGAROO ISLAND' },
    { id: 'knt',               name: 'KOWREE NARACOORTE TATIARA' },
    { id: 'limestone-coast',   name: 'LIMESTONE COAST' },
    { id: 'murray-valley',     name: 'MURRAY VALLEY' },
    { id: 'mid-south-eastern', name: 'MID SOUTH EASTERN' },
    { id: 'north-eastern',     name: 'NORTH EASTERN' },
    { id: 'northern-areas',    name: 'NORTHERN AREAS' },
    { id: 'port-lincoln',      name: 'PORT LINCOLN' },
    { id: 'river-murray',      name: 'RIVER MURRAY' },
    { id: 'riverland',         name: 'RIVERLAND' },
    { id: 'southern',          name: 'SOUTHERN' },
    { id: 'spencer-gulf',      name: 'SPENCER GULF' },
    { id: 'western-eyre',      name: 'WESTERN EYRE' },
    { id: 'whyalla',           name: 'WHYALLA' },
    { id: 'yorke-peninsula',   name: 'YORKE PENINSULA' },
  ]

  async function fetchMatchResults() {
    setLoading(true)
    try {
      const res  = await fetch('/api/country-football?league=' + selectedLeague)
      const data = await res.json()
      setMatchResults(Array.isArray(data.matchReports) ? data.matchReports : [])
    } catch (error) {
      console.error('Error fetching country football results:', error)
      setMatchResults([])
    }
    setLoading(false)
  }

  async function fetchUpcomingMatches() {
    setLoadingUpcoming(true)
    try {
      const url = selectedLeague === 'all'
        ? '/api/upcoming-matches?category=country'
        : `/api/upcoming-matches?category=country&countryLeague=${selectedLeague}`
      const res  = await fetch(url)
      const data = await res.json()
      setUpcomingMatches(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching upcoming matches:', error)
      setUpcomingMatches([])
    }
    setLoadingUpcoming(false)
  }

  useEffect(() => {
    fetchMatchResults()
    fetchUpcomingMatches()
  }, [selectedLeague])

  const currentLeague = leagues.find(l => l.id === selectedLeague)

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#e6fe00] to-yellow-400 text-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">COUNTRY FOOTBALL MATCH RESULTS</h1>
          <p className="text-xl">24 Leagues across South Australia</p>
        </div>
      </section>

      {/* League filter */}
      <section className="bg-white border-b sticky top-0 z-40 shadow-md">
        <div className="container mx-auto px-4">
          <div className="py-4">
            <select value={selectedLeague} onChange={(e) => setSelectedLeague(e.target.value)} className="w-full md:w-auto px-6 py-3 rounded-lg border-2 border-[#2ca3ee] font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2ca3ee]">
              {leagues.map((league) => (
                <option key={league.id} value={league.id}>{league.name}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Match Results */}
      <section className="container mx-auto px-4 py-12">
        {selectedLeague !== 'all' && (
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-[#2ca3ee]">{currentLeague?.name}</h2>
          </div>
        )}

        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-2xl font-bold text-gray-800">MATCH RESULTS</h3>
          <div className="flex-1 h-1 bg-gradient-to-r from-[#e6fe00] to-transparent rounded"></div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#e6fe00] border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading match results...</p>
          </div>
        ) : matchResults.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchResults.map((match) => (
              <a key={match._id} href={`/match-results/${match.slug.current}`} className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="bg-[#e6fe00] text-black px-4 py-2 font-bold text-sm flex justify-between items-center">
                  <span>{match.countryLeague || 'Country Football'}</span>
                  {match.round && <span className="text-xs opacity-75">{match.round}</span>}
                </div>
                <div className="p-6">
                  <p className="text-gray-500 text-sm mb-3">
                    {new Date(match.matchDate).toLocaleDateString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <div className="flex justify-between items-center mb-2 pb-2 border-b">
                    <span className="font-bold text-lg">{match.homeTeam}</span>
                    <span className="text-2xl font-bold text-[#2ca3ee]">{match.homeScore}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4 pb-2 border-b">
                    <span className="font-bold text-lg">{match.awayTeam}</span>
                    <span className="text-2xl font-bold text-[#2ca3ee]">{match.awayScore}</span>
                  </div>
                  {match.venue && <p className="text-gray-600 text-sm mb-3">📍 {match.venue}</p>}
                  <div className="text-[#2ca3ee] font-semibold group-hover:underline">Read Full Report →</div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <div className="text-6xl mb-4">🏈</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Match Results Yet</h3>
            <p className="text-gray-500">
              {selectedLeague === 'all' ? 'Check back soon for the latest country football results' : `No results available yet for ${currentLeague?.name}`}
            </p>
          </div>
        )}
      </section>

      {/* Upcoming Matches */}
      <section className="container mx-auto px-4 pb-16">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-2xl font-bold text-gray-800">UPCOMING MATCHES</h3>
          <div className="flex-1 h-1 bg-gradient-to-r from-[#e6fe00] to-transparent rounded"></div>
        </div>

        {loadingUpcoming ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-[#e6fe00] border-t-transparent"></div>
            <p className="mt-3 text-gray-600">Loading upcoming matches...</p>
          </div>
        ) : upcomingMatches.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingMatches.map((match) => (
              <div key={match._id} className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-[#e6fe00]">
                <div className="bg-gray-800 text-white px-4 py-2 font-bold text-sm flex justify-between items-center">
                  <span>{match.countryLeague || 'Country Football'}</span>
                  {match.round && <span className="opacity-75 text-xs">{match.round}</span>}
                </div>
                <div className="p-6">
                  <p className="text-[#2ca3ee] font-bold text-sm mb-4">
                    {'📅 '}
                    {new Date(match.matchDate).toLocaleDateString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    {' · '}
                    {new Date(match.matchDate).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <div className="flex justify-between items-center mb-2 pb-2 border-b">
                    <span className="font-bold text-lg">{match.homeTeam}</span>
                    <span className="text-gray-400 font-bold text-sm">HOME</span>
                  </div>
                  <div className="flex justify-between items-center mb-4 pb-2 border-b">
                    <span className="font-bold text-lg">{match.awayTeam}</span>
                    <span className="text-gray-400 font-bold text-sm">AWAY</span>
                  </div>
                  {match.venue && <p className="text-gray-600 text-sm mb-2">📍 {match.venue}</p>}
                  {match.notes && <p className="text-sm font-semibold text-[#2ca3ee] mt-2">{'⭐ '}{match.notes}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-5xl mb-3">📅</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No Upcoming Matches</h3>
            <p className="text-gray-600">Check back soon for fixture announcements</p>
          </div>
        )}
      </section>
    </>
  )
}
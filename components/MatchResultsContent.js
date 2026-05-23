'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const AMATEUR_GRADES = [
  { id: 'division-1',          name: 'Division 1',          group: 'League' },
  { id: 'division-2',          name: 'Division 2',          group: 'League' },
  { id: 'division-3',          name: 'Division 3',          group: 'League' },
  { id: 'division-4',          name: 'Division 4',          group: 'League' },
  { id: 'division-5',          name: 'Division 5',          group: 'League' },
  { id: 'division-6',          name: 'Division 6',          group: 'League' },
  { id: 'division-7',          name: 'Division 7',          group: 'League' },
  { id: 'division-1-reserves', name: 'Division 1 Reserves', group: 'Reserves' },
  { id: 'division-2-reserves', name: 'Division 2 Reserves', group: 'Reserves' },
  { id: 'division-3-reserves', name: 'Division 3 Reserves', group: 'Reserves' },
  { id: 'division-4-reserves', name: 'Division 4 Reserves', group: 'Reserves' },
  { id: 'division-5-reserves', name: 'Division 5 Reserves', group: 'Reserves' },
  { id: 'division-6-reserves', name: 'Division 6 Reserves', group: 'Reserves' },
  { id: 'division-7-reserves', name: 'Division 7 Reserves', group: 'Reserves' },
  { id: 'division-c1',         name: 'Division C1',         group: 'C-Grade' },
  { id: 'division-c2',         name: 'Division C2',         group: 'C-Grade' },
  { id: 'division-c3',         name: 'Division C3',         group: 'C-Grade' },
  { id: 'division-c4',         name: 'Division C4',         group: 'C-Grade' },
  { id: 'division-c5',         name: 'Division C5',         group: 'C-Grade' },
  { id: 'division-c6',         name: 'Division C6',         group: 'C-Grade' },
  { id: 'division-c7',         name: 'Division C7',         group: 'C-Grade' },
  { id: 'division-c8',         name: 'Division C8',         group: 'C-Grade' },
]
const AMATEUR_GROUPS = ['League', 'Reserves', 'C-Grade']

const SAWFL_GRADES = [
  { id: 'division-1',          name: 'Division 1',          group: 'League' },
  { id: 'division-2',          name: 'Division 2',          group: 'League' },
  { id: 'division-3',          name: 'Division 3',          group: 'League' },
  { id: 'division-4',          name: 'Division 4',          group: 'League' },
  { id: 'division-5',          name: 'Division 5',          group: 'League' },
  { id: 'division-6',          name: 'Division 6',          group: 'League' },
  { id: 'division-1-reserves', name: 'Division 1 Reserves', group: 'Reserves' },
  { id: 'division-2-reserves', name: 'Division 2 Reserves', group: 'Reserves' },
]
const SAWFL_GROUPS = ['League', 'Reserves']

const SANFL_GRADES = [
  { id: 'league',   name: 'SANFL League', group: 'League' },
  { id: 'reserves', name: 'Reserves',     group: 'Reserves' },
  { id: 'under-18', name: 'Under 18',     group: 'Youth' },
  { id: 'under-16', name: 'Under 16',     group: 'Youth' },
]
const SANFL_GROUPS = ['League', 'Reserves', 'Youth']

export default function MatchResultsContent() {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('cat') || 'all')

  // Amateur state
  const [amateurGroup, setAmateurGroup] = useState('League')
  const [amateurGrade, setAmateurGrade] = useState('')

  // SAWFL state
  const [sawflGroup, setSawflGroup] = useState('League')
  const [sawflGrade, setSawflGrade] = useState('')

  // SANFL state
  const [sanflGroup, setSanflGroup] = useState('League')
  const [sanflGrade, setSanflGrade] = useState('')

  const [matchResults, setMatchResults]       = useState([])
  const [upcomingMatches, setUpcomingMatches] = useState([])
  const [loading, setLoading]                 = useState(true)
  const [loadingUpcoming, setLoadingUpcoming] = useState(true)

  const categories = [
    { id: 'all',      name: 'ALL' },
    { id: 'afl',      name: 'AFL' },
    { id: 'aflw',     name: 'AFLW' },
    { id: 'sanfl',    name: 'SANFL' },
    { id: 'sanflw',   name: 'SANFLW' },
    { id: 'amateurs', name: 'AMATEURS' },
    { id: 'sawfl',    name: "SAWFL WOMEN'S" },
  ]

  function handleCategoryChange(cat) {
    setSelectedCategory(cat)
    if (cat !== 'amateurs') { setAmateurGroup('League'); setAmateurGrade('') }
    if (cat !== 'sawfl')    { setSawflGroup('League');   setSawflGrade('') }
    if (cat !== 'sanfl')    { setSanflGroup('League');   setSanflGrade('') }
  }

  // Amateur handlers
  function handleAmateurGroupChange(group) {
    setAmateurGroup(group)
    const first = AMATEUR_GRADES.find(g => g.group === group)
    setAmateurGrade(first?.id ?? '')
  }

  // SAWFL handlers
  function handleSawflGroupChange(group) {
    setSawflGroup(group)
    const first = SAWFL_GRADES.find(g => g.group === group)
    setSawflGrade(first?.id ?? '')
  }

  // SANFL handlers
  function handleSanflGroupChange(group) {
    setSanflGroup(group)
    if (group === 'League') {
      setSanflGrade('league')
    } else if (group === 'Reserves') {
      setSanflGrade('reserves')
    } else {
      const first = SANFL_GRADES.find(g => g.group === group)
      setSanflGrade(first?.id ?? '')
    }
  }

  async function fetchMatchResults() {
    setLoading(true)
    try {
      let url = '/api/match-results?category=' + selectedCategory
      if (selectedCategory === 'amateurs' && amateurGrade) url += '&amateurGrade=' + amateurGrade
      if (selectedCategory === 'sawfl'    && sawflGrade)   url += '&amateurGrade=' + sawflGrade
      if (selectedCategory === 'sanfl'    && sanflGrade)   url += '&sanflGrade=' + sanflGrade
      const response = await fetch(url)
      const data = await response.json()
      setMatchResults(Array.isArray(data) ? data : [])
    } catch { setMatchResults([]) }
    setLoading(false)
  }

  async function fetchUpcomingMatches() {
    setLoadingUpcoming(true)
    try {
      const response = await fetch('/api/upcoming-matches?category=' + selectedCategory)
      const data = await response.json()
      setUpcomingMatches(Array.isArray(data) ? data : [])
    } catch { setUpcomingMatches([]) }
    setLoadingUpcoming(false)
  }

  useEffect(() => {
    fetchMatchResults()
    fetchUpcomingMatches()
  }, [selectedCategory, amateurGrade, sawflGrade, sanflGrade])

  // Auto-select first grade when switching categories
  useEffect(() => {
    if (selectedCategory === 'amateurs' && !amateurGrade) {
      const first = AMATEUR_GRADES.find(g => g.group === amateurGroup)
      if (first) setAmateurGrade(first.id)
    }
    if (selectedCategory === 'sawfl' && !sawflGrade) {
      const first = SAWFL_GRADES.find(g => g.group === sawflGroup)
      if (first) setSawflGrade(first.id)
    }
    if (selectedCategory === 'sanfl' && !sanflGrade) {
      setSanflGrade('league')
    }
  }, [selectedCategory])

  const amateurGradesInGroup = AMATEUR_GRADES.filter(g => g.group === amateurGroup)
  const sawflGradesInGroup   = SAWFL_GRADES.filter(g => g.group === sawflGroup)
  const sanflGradesInGroup   = SANFL_GRADES.filter(g => g.group === sanflGroup)

  const activeGradeName = AMATEUR_GRADES.find(g => g.id === amateurGrade)?.name ?? ''

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#2ca3ee] to-[#00b8f1] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">MATCH RESULTS</h1>
          <p className="text-xl">Latest scores and match reports from SA Football</p>
        </div>
      </section>

      {/* Navigation */}
      <section className="bg-white border-b sticky top-0 z-40 shadow-md">
        <div className="container mx-auto px-4">

          {/* Level 1 — Category */}
          <div className="flex items-center justify-center space-x-2 py-4 overflow-x-auto">
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => handleCategoryChange(cat.id)}
                className={`px-6 py-2 rounded-full font-bold whitespace-nowrap transition ${selectedCategory === cat.id ? 'bg-[#2ca3ee] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                {cat.name}
              </button>
            ))}
          </div>

          {/* Level 2 — Amateur groups */}
          {selectedCategory === 'amateurs' && (
            <div className="flex items-center justify-center space-x-2 pb-3 overflow-x-auto">
              {AMATEUR_GROUPS.map(group => (
                <button key={group} onClick={() => handleAmateurGroupChange(group)}
                  className={`px-5 py-1.5 rounded-full font-bold whitespace-nowrap transition text-sm ${amateurGroup === group ? 'bg-[#e6a800] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {group.toUpperCase()}
                </button>
              ))}
            </div>
          )}
          {selectedCategory === 'amateurs' && (
            <div className="flex items-center justify-center flex-wrap gap-2 pb-3">
              {amateurGradesInGroup.map(g => (
                <button key={g.id} onClick={() => setAmateurGrade(g.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${amateurGrade === g.id ? 'bg-[#16a34a] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {g.name}
                </button>
              ))}
            </div>
          )}

          {/* Level 2 — SAWFL groups */}
          {selectedCategory === 'sawfl' && (
            <div className="flex items-center justify-center space-x-2 pb-3 overflow-x-auto">
              {SAWFL_GROUPS.map(group => (
                <button key={group} onClick={() => handleSawflGroupChange(group)}
                  className={`px-5 py-1.5 rounded-full font-bold whitespace-nowrap transition text-sm ${sawflGroup === group ? 'bg-[#e6a800] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {group.toUpperCase()}
                </button>
              ))}
            </div>
          )}
          {selectedCategory === 'sawfl' && (
            <div className="flex items-center justify-center flex-wrap gap-2 pb-3">
              {sawflGradesInGroup.map(g => (
                <button key={g.id} onClick={() => setSawflGrade(g.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${sawflGrade === g.id ? 'bg-[#16a34a] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {g.name}
                </button>
              ))}
            </div>
          )}

          {/* Level 2 — SANFL groups */}
          {selectedCategory === 'sanfl' && (
            <div className="flex items-center justify-center space-x-2 pb-3 overflow-x-auto">
              {SANFL_GROUPS.map(group => (
                <button key={group} onClick={() => handleSanflGroupChange(group)}
                  className={`px-5 py-1.5 rounded-full font-bold whitespace-nowrap transition text-sm ${sanflGroup === group ? 'bg-[#e6a800] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {group.toUpperCase()}
                </button>
              ))}
            </div>
          )}
          {selectedCategory === 'sanfl' && sanflGroup === 'Youth' && (
            <div className="flex items-center justify-center flex-wrap gap-2 pb-3">
              {sanflGradesInGroup.map(g => (
                <button key={g.id} onClick={() => setSanflGrade(g.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${sanflGrade === g.id ? 'bg-[#16a34a] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {g.name}
                </button>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Match Results */}
      <section className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#2ca3ee] border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading match results...</p>
          </div>
        ) : matchResults.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchResults.map((match) => (
              <a key={match._id} href={`/match-results/${match.slug.current}`} className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="bg-[#2ca3ee] text-white px-4 py-2 font-bold text-sm flex justify-between items-center">
                  <span>
                    {match.amateurGrade
                      ? `${match.competition} · ${AMATEUR_GRADES.find(g => g.id === match.amateurGrade)?.name ?? SAWFL_GRADES.find(g => g.id === match.amateurGrade)?.name ?? match.amateurGrade}`
                      : match.sanflGrade
                      ? `SANFL · ${SANFL_GRADES.find(g => g.id === match.sanflGrade)?.name ?? match.sanflGrade}`
                      : match.competition}
                  </span>
                  {match.round && <span className="opacity-75 text-xs">{match.round}</span>}
                </div>
                <div className="p-6">
                  <p className="text-gray-500 text-sm mb-3">
                    {new Date(match.matchDate).toLocaleDateString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <div className="flex justify-between items-center mb-2 pb-2 border-b">
                    <span className="font-bold text-gray-400 text-lg">{match.homeTeam}</span>
                    <span className="text-2xl font-bold text-[#2ca3ee]">{match.homeScore}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4 pb-2 border-b">
                    <span className="font-bold text-gray-400 text-lg">{match.awayTeam}</span>
                    <span className="text-2xl font-bold text-[#2ca3ee]">{match.awayScore}</span>
                  </div>
                  {match.venue && <p className="text-gray-600 text-sm mb-3">📍 {match.venue}</p>}
                  <div className="text-[#2ca3ee] font-semibold group-hover:underline">Read Full Report →</div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏈</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Match Results Yet</h3>
            <p className="text-gray-600">Check back soon for the latest match results</p>
          </div>
        )}
      </section>

      {/* Upcoming Matches */}
      <section className="container mx-auto px-4 pb-16">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-3xl font-bold text-gray-800">UPCOMING MATCHES</h2>
          <div className="flex-1 h-1 bg-gradient-to-r from-[#2ca3ee] to-transparent rounded"></div>
        </div>

        {loadingUpcoming ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-[#2ca3ee] border-t-transparent"></div>
            <p className="mt-3 text-gray-600">Loading upcoming matches...</p>
          </div>
        ) : upcomingMatches.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingMatches.map((match) => (
              <div key={match._id} className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-[#e6fe00]">
                <div className="bg-gray-800 text-white px-4 py-2 font-bold text-sm flex justify-between items-center">
                  <span>{match.competition}</span>
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
                    <span className="font-bold text-gray-400 text-lg">{match.homeTeam}</span>
                    <span className="text-gray-400 font-bold text-sm">HOME</span>
                  </div>
                  <div className="flex justify-between items-center mb-4 pb-2 border-b">
                    <span className="font-bold text-gray-400 text-lg">{match.awayTeam}</span>
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
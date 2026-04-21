'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const COMPETITIONS = [
  { id: 'all',              name: 'ALL' },
  { id: 'SANFL',            name: 'SANFL' },
  { id: 'SANFLW',           name: 'SANFLW' },
  { id: 'Amateur',          name: "AMATEURS (MEN'S)" },
  { id: "SAWFL Women's",    name: "SAWFL WOMEN'S" },
  { id: 'Country Football', name: 'COUNTRY FOOTBALL' },
]

const COUNTRY_LEAGUES = [
  { id: 'adelaide-plains',   name: 'Adelaide Plains' },
  { id: 'barossa',           name: 'Barossa Light & Gawler' },
  { id: 'eastern-eyre',      name: 'Eastern Eyre' },
  { id: 'far-north',         name: 'Far North' },
  { id: 'great-flinders',    name: 'Great Flinders' },
  { id: 'great-southern',    name: 'Great Southern' },
  { id: 'hills-div1',        name: 'Hills Division 1' },
  { id: 'hills-country',     name: 'Hills Country Division' },
  { id: 'kangaroo-island',   name: 'Kangaroo Island' },
  { id: 'knt',               name: 'Kowree Naracoorte Tatiara' },
  { id: 'limestone-coast',   name: 'Limestone Coast' },
  { id: 'murray-valley',     name: 'Murray Valley' },
  { id: 'mid-south-eastern', name: 'Mid South Eastern' },
  { id: 'north-eastern',     name: 'North Eastern' },
  { id: 'northern-areas',    name: 'Northern Areas' },
  { id: 'port-lincoln',      name: 'Port Lincoln' },
  { id: 'river-murray',      name: 'River Murray' },
  { id: 'riverland',         name: 'Riverland' },
  { id: 'southern',          name: 'Southern' },
  { id: 'spencer-gulf',      name: 'Spencer Gulf' },
  { id: 'western-eyre',      name: 'Western Eyre' },
  { id: 'whyalla',           name: 'Whyalla' },
  { id: 'yorke-peninsula',   name: 'Yorke Peninsula' },
]

function cleanTeamName(name) {
  if (!name) return ''
  return name
    .replace(/\s*-\s*(C\d+|M\d+|U\d+|Under\s*\d+|Div\s*\d+|Division\s*\d+|Reserves|R1|R2)$/i, '')
    .trim()
}

export default function LadderContent() {
  const searchParams  = useSearchParams()
  const [competition, setCompetition]     = useState(searchParams.get('competition') || 'all')
  const [countryLeague, setCountryLeague] = useState(searchParams.get('league') || '')
  const [ladders, setLadders]             = useState([])
  const [loading, setLoading]             = useState(true)
  const [selected, setSelected]           = useState(null)

  async function fetchLadders() {
    setLoading(true)
    try {
      let url = `/api/ladder?competition=${encodeURIComponent(competition)}`
      if (competition === 'Country Football' && countryLeague) {
        url += `&countryLeague=${encodeURIComponent(countryLeague)}`
      }
      const data = await fetch(url).then(r => r.json())
      const list = Array.isArray(data) ? data : []
      setLadders(list)
      if (list.length > 0) setSelected(list[0]._id)
    } catch {
      setLadders([])
    }
    setLoading(false)
  }

  useEffect(() => { fetchLadders() }, [competition, countryLeague])

  const activeLadder = ladders.find(l => l._id === selected)

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#2ca3ee] to-[#00b8f1] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">LEAGUE LADDERS</h1>
          <p className="text-xl">Current standings across all SA football competitions</p>
        </div>
      </section>

      {/* Competition filter */}
      <section className="bg-white border-b sticky top-0 z-40 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 py-4 overflow-x-auto">
            {COMPETITIONS.map(c => (
              <button
                key={c.id}
                onClick={() => { setCompetition(c.id); setCountryLeague('') }}
                className={`px-5 py-2 rounded-full font-bold whitespace-nowrap transition text-sm ${
                  competition === c.id
                    ? 'bg-[#2ca3ee] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Country league sub-filter */}
          {competition === 'Country Football' && (
            <div className="flex items-center justify-center flex-wrap gap-2 pb-4">
              {COUNTRY_LEAGUES.map(l => (
                <button
                  key={l.id}
                  onClick={() => setCountryLeague(l.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                    countryLeague === l.id
                      ? 'bg-[#e6fe00] text-black'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {l.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#2ca3ee] border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading ladders...</p>
          </div>
        ) : ladders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Ladders Available</h3>
            <p className="text-gray-600">Check back soon for updated standings</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">

            {/* Left — grade selector */}
            <div className="lg:w-64 flex-shrink-0">
              <h3 className="font-bold text-gray-700 mb-3 uppercase text-sm tracking-wide">Select Grade</h3>
              <div className="flex flex-col gap-2">
                {ladders.map(l => (
                  <button
                    key={l._id}
                    onClick={() => setSelected(l._id)}
                    className={`text-left px-4 py-3 rounded-lg font-semibold text-sm transition border ${
                      selected === l._id
                        ? 'bg-[#2ca3ee] text-white border-[#2ca3ee]'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-[#2ca3ee]'
                    }`}
                  >
                    {l.gradeName || l.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Right — ladder table */}
            {activeLadder && (
              <div className="flex-1">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">

                  {/* Table header */}
                  <div className="bg-[#2ca3ee] text-white px-6 py-4 flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold">{activeLadder.competition}</h2>
                      <p className="text-sm opacity-80">
                        {activeLadder.gradeName} · {activeLadder.season}
                      </p>
                    </div>
                    {activeLadder.syncedAt && (
                      <p className="text-xs opacity-70">
                        Updated {new Date(activeLadder.syncedAt).toLocaleDateString('en-AU')}
                      </p>
                    )}
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                          <th className="px-4 py-3 text-left">#</th>
                          <th className="px-4 py-3 text-left">Team</th>
                          <th className="px-3 py-3 text-center">P</th>
                          <th className="px-3 py-3 text-center">W</th>
                          <th className="px-3 py-3 text-center">L</th>
                          <th className="px-3 py-3 text-center">D</th>
                          <th className="px-3 py-3 text-center">BYE</th>
                          <th className="px-3 py-3 text-center">%</th>
                          <th className="px-3 py-3 text-center font-bold text-[#2ca3ee]">PTS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(activeLadder.teams || []).map((team, i) => (
                          <tr key={i} className={`border-t ${i < 8 ? 'bg-blue-50' : ''} hover:bg-gray-50`}>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                                i === 0
                                  ? 'bg-yellow-400 text-white'
                                  : i < 8
                                  ? 'bg-[#2ca3ee] text-white'
                                  : 'bg-gray-200 text-gray-600'
                              }`}>
                                {team.rank}
                              </span>
                            </td>
                            <td className="px-4 py-3 font-semibold">{cleanTeamName(team.teamName)}</td>
                            <td className="px-3 py-3 text-center">{team.played}</td>
                            <td className="px-3 py-3 text-center text-green-600 font-semibold">{team.wins}</td>
                            <td className="px-3 py-3 text-center text-red-500">{team.losses}</td>
                            <td className="px-3 py-3 text-center">{team.draws}</td>
                            <td className="px-3 py-3 text-center text-gray-400">{team.byes}</td>
                            <td className="px-3 py-3 text-center">{team.percentage?.toFixed(1)}</td>
                            <td className="px-3 py-3 text-center font-bold text-[#2ca3ee]">{team.points}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="px-6 py-3 bg-gray-50 text-xs text-gray-400">
                    P = Played · W = Wins · L = Losses · D = Draws · % = Percentage · PTS = Points
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </>
  )
}
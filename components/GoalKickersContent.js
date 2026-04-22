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

export default function GoalKickersContent() {
  const searchParams  = useSearchParams()
  const [competition, setCompetition]     = useState(searchParams.get('competition') || 'all')
  const [countryLeague, setCountryLeague] = useState(searchParams.get('league') || '')
  const [tables, setTables]               = useState([])
  const [loading, setLoading]             = useState(true)
  const [selected, setSelected]           = useState(null)

  async function fetchData() {
    setLoading(true)
    try {
      let url = `/api/goal-kickers?competition=${encodeURIComponent(competition)}`
      if (competition === 'Country Football' && countryLeague) {
        url += `&countryLeague=${encodeURIComponent(countryLeague)}`
      }
      const data = await fetch(url).then(r => r.json())
      const list = Array.isArray(data) ? data : []
      setTables(list)
      if (list.length > 0) setSelected(list[0]._id)
    } catch {
      setTables([])
    }
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [competition, countryLeague])

  const activeTable = tables.find(t => t._id === selected)

  // Sort by goals desc, take top 20
  const sortedPlayers = activeTable
    ? [...(activeTable.players || [])].sort((a, b) => b.goals - a.goals).slice(0, 20)
    : []

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#2ca3ee] to-[#00b8f1] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">GOAL KICKERS</h1>
          <p className="text-xl">Season goal kicking leaders across SA football</p>
        </div>
      </section>

      {/* Competition filter */}
      <section className="bg-white border-b sticky top-0 z-40 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 py-4 overflow-x-auto">
            {COMPETITIONS.map(c => (
              <button key={c.id} onClick={() => { setCompetition(c.id); setCountryLeague('') }} className={`px-5 py-2 rounded-full font-bold whitespace-nowrap transition text-sm ${competition === c.id ? 'bg-[#2ca3ee] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                {c.name}
              </button>
            ))}
          </div>
          {competition === 'Country Football' && (
            <div className="flex items-center justify-center flex-wrap gap-2 pb-4">
              {COUNTRY_LEAGUES.map(l => (
                <button key={l.id} onClick={() => setCountryLeague(l.id)} className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${countryLeague === l.id ? 'bg-[#e6fe00] text-black' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
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
            <p className="mt-4 text-gray-600">Loading goal kickers...</p>
          </div>
        ) : tables.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏈</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Goal Kickers Data</h3>
            <p className="text-gray-600">Check back soon for updated stats</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">

            {/* Left — grade selector */}
            <div className="lg:w-64 flex-shrink-0">
              <h3 className="font-bold text-gray-700 mb-3 uppercase text-sm tracking-wide">Select Grade</h3>
              <div className="flex flex-col gap-2">
                {tables.map(t => (
                  <button key={t._id} onClick={() => setSelected(t._id)} className={`text-left px-4 py-3 rounded-lg font-semibold text-sm transition border ${selected === t._id ? 'bg-[#2ca3ee] text-white border-[#2ca3ee]' : 'bg-white text-gray-700 border-gray-200 hover:border-[#2ca3ee]'}`}>
                    {t.gradeName || t.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Right — goal kickers table */}
            {activeTable && (
              <div className="flex-1">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="bg-[#2ca3ee] text-white px-6 py-4 flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold">{activeTable.competition}</h2>
                      <p className="text-sm opacity-80">{activeTable.gradeName} · {activeTable.season}</p>
                    </div>
                    {activeTable.syncedAt && (
                      <p className="text-xs opacity-70">Updated {new Date(activeTable.syncedAt).toLocaleDateString('en-AU')}</p>
                    )}
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                          <th className="px-4 py-3 text-left">#</th>
                          <th className="px-4 py-3 text-left">Player</th>
                          <th className="px-4 py-3 text-left">Team</th>
                          <th className="px-3 py-3 text-center">GP</th>
                          <th className="px-3 py-3 text-center font-bold text-[#2ca3ee]">Goals</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedPlayers.map((p, i) => (
                          <tr key={i} className={`border-t ${i < 3 ? 'bg-yellow-50' : ''} hover:bg-gray-50`}>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${i === 0 ? 'bg-yellow-400 text-white' : i === 1 ? 'bg-gray-400 text-white' : i === 2 ? 'bg-orange-400 text-white' : 'bg-gray-100 text-gray-600'}`}>
                                {i + 1}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-[#2ca3ee] font-semibold">{p.playerName}</td>
                            <td className="px-4 py-3 text-gray-500">{cleanTeamName(p.teamName)}</td>
                            <td className="px-3 py-3 text-gray-500 text-center">{p.games}</td>
                            <td className="px-3 py-3 text-center font-bold text-[#2ca3ee] text-base">{p.goals}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="px-6 py-3 bg-gray-50 text-xs text-gray-400">
                    GP = Games Played · Top 20 goal kickers ranked by goals scored
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
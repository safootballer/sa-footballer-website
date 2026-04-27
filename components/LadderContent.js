'use client'
import { useEffect, useState } from 'react'
import { LEVEL1_ORDER, LEVEL2_ORDER, getLeagueCategory } from '../lib/leagueMap'

function cleanTeamName(name) {
  if (!name) return ''
  return name
    .replace(/\s*-\s*(C\d+|M\d+|U\d+|Under\s*\d+|Div\s*\d+|Division\s*\d+|Reserves|R1|R2|[A-Z]\d+)$/i, '')
    .trim()
}

function getGradeId(doc) {
  // _id is stored as "ladder-{gradeId}"
  return doc._id?.replace(/^ladder-/, '') || ''
}

export default function LadderContent() {
  const [allDocs, setAllDocs]   = useState([])
  const [loading, setLoading]   = useState(true)
  const [level1, setLevel1]     = useState('SANFL')
  const [level2, setLevel2]     = useState(null)
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    fetch('/api/ladder')
      .then(r => r.json())
      .then(d => setAllDocs(Array.isArray(d) ? d : []))
      .catch(() => setAllDocs([]))
      .finally(() => setLoading(false))
  }, [])

  // Reset level2 and activeId when level1 or data changes
  useEffect(() => {
    const opts = getLevel2Options(level1)
    const first = opts[0] ?? null
    setLevel2(first)
    setActiveId(null)
  }, [level1, allDocs])

  // Auto-select first grade when level2 changes
  useEffect(() => {
    if (!level2) return
    const grades = getGrades(level1, level2)
    if (grades.length > 0) setActiveId(getGradeId(grades[0]))
  }, [level2])

  function getLevel2Options(l1) {
    const order = LEVEL2_ORDER[l1] ?? []
    const available = new Set(
      allDocs.map(d => getLeagueCategory(getGradeId(d)).level2)
        .filter(l2 => allDocs.some(d => {
          const cat = getLeagueCategory(getGradeId(d))
          return cat.level1 === l1 && cat.level2 === l2
        }))
    )
    return order.filter(l2 => available.has(l2))
  }

  function getGrades(l1, l2) {
    return allDocs
      .filter(d => {
        const cat = getLeagueCategory(getGradeId(d))
        return cat.level1 === l1 && cat.level2 === l2
      })
      .sort((a, b) => {
        const sa = getLeagueCategory(getGradeId(a)).sortOrder
        const sb = getLeagueCategory(getGradeId(b)).sortOrder
        return sa - sb
      })
  }

  const level2Options = getLevel2Options(level1)
  const gradeOptions  = level2 ? getGrades(level1, level2) : []
  const activeDoc     = gradeOptions.find(d => getGradeId(d) === activeId)

  const tabBtn = (active, color) => ({
    padding: '0.4rem 1rem', borderRadius: 20, fontSize: '0.82rem',
    fontWeight: active ? 700 : 500, cursor: 'pointer', whiteSpace: 'nowrap',
    border: `1.5px solid ${active ? color : '#e5e7eb'}`,
    background: active ? color : '#fff',
    color: active ? (color === '#e6a800' ? '#000' : '#fff') : '#374151',
    transition: 'all 0.15s',
  })

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#2ca3ee] to-[#00b8f1] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">LEAGUE LADDERS</h1>
          <p className="text-xl">Current standings across all SA football competitions</p>
        </div>
      </section>

      {/* Level 1 — sticky */}
      <section className="bg-white border-b shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap gap-2 justify-center">
            {LEVEL1_ORDER.map(l1 => (
              <button key={l1} onClick={() => setLevel1(l1)} style={tabBtn(level1 === l1, '#2ca3ee')}>
                {l1}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Level 2 */}
      {level2Options.length > 0 && (
        <section className="bg-gray-50 border-b">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-wrap gap-2 justify-center">
              {level2Options.map(l2 => (
                <button key={l2} onClick={() => setLevel2(l2)} style={tabBtn(level2 === l2, '#e6a800')}>
                  {l2}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Level 3 */}
      {gradeOptions.length > 0 && (
        <section className="bg-gray-100 border-b">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-wrap gap-2 justify-center">
              {gradeOptions.map(d => {
                const gid = getGradeId(d)
                const cat = getLeagueCategory(gid)
                return (
                  <button key={gid} onClick={() => setActiveId(gid)} style={tabBtn(activeId === gid, '#16a34a')}>
                    {cat.level3}
                  </button>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <section className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#2ca3ee] border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading ladders...</p>
          </div>
        ) : !activeDoc ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Ladder Available</h3>
            <p className="text-gray-600">Select a grade above or check back soon</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
            <div className="bg-[#2ca3ee] text-white px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">{activeDoc.gradeName || getLeagueCategory(getGradeId(activeDoc)).level3}</h2>
                <p className="text-sm opacity-80">{level1} · {level2} · {activeDoc.season}</p>
              </div>
              {activeDoc.syncedAt && (
                <p className="text-xs opacity-70">Updated {new Date(activeDoc.syncedAt).toLocaleDateString('en-AU')}</p>
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
                  {(activeDoc.teams || []).map((team, i) => (
                    <tr key={i} className={`border-t ${i < 8 ? 'bg-blue-50' : ''} hover:bg-gray-50`}>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${i === 0 ? 'bg-yellow-400 text-white' : i < 8 ? 'bg-[#2ca3ee] text-white' : 'bg-gray-200 text-gray-600'}`}>
                          {team.rank}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 font-semibold">{cleanTeamName(team.teamName)}</td>
                      <td className="px-3 py-3 text-center">{team.played}</td>
                      <td className="px-3 py-3 text-center text-green-600 font-semibold">{team.wins}</td>
                      <td className="px-3 py-3 text-center text-red-500">{team.losses}</td>
                      <td className="px-3 py-3 text-gray-400 text-center">{team.draws}</td>
                      <td className="px-3 py-3 text-center text-gray-400">{team.byes}</td>
                      <td className="px-3 py-3 text-gray-400 text-center">{team.percentage?.toFixed(1)}</td>
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
        )}
      </section>
    </>
  )
}
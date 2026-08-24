'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { LEVEL1_ORDER, LEVEL2_ORDER, getLeagueCategory } from '../lib/leagueMap'

function cleanTeamName(name) {
  if (!name) return ''
  return name
    .replace(/\s*-\s*M\d+R?\s*$/i, '')
    .replace(/\s*-\s*W\d+R?\s*$/i, '')
    .replace(/\s*-\s*C\d+\s*$/i, '')
    .replace(/\s*-?\s*[A-Z]\s+Grade\s*$/i, '')
    .replace(/\s*-\s*Under\s*[\d.]+\s*$/i, '')
    .replace(/\s*-\s*U\d+\s*$/i, '')
    .replace(/\s*\bM\d+R?\b\s*$/i, '')
    .replace(/\s*\bW\d+R?\b\s*$/i, '')
    .replace(/\s*\bC\d+\b\s*$/i, '')
    .replace(/\s*[-–]\s*Men'?s?\s*$/i, '')
    .replace(/\s*[-–]\s*Women'?s?\s*$/i, '')
    .replace(/\s*\bMen'?s?\b\s*$/i, '')
    .replace(/\s*\bWomen'?s?\b\s*$/i, '')
    .replace(/\s*[-–]\s*Seniors?\s*$/i, '')
    .replace(/\s*[-–]\s*Juniors?\s*$/i, '')
    .replace(/\s*\bSeniors?\b\s*$/i, '')
    .replace(/\s*\bJuniors?\b\s*$/i, '')
    .replace(/\s*[-–]?\s*[A-H]\s+Grade\s*$/i, '')
    .replace(/\s*[-–]?\s*Senior\s+Men'?s?\s*$/i, '')
    .replace(/\s*[-–]?\s*Senior\s+Women'?s?\s*$/i, '')
    .replace(/\s*[-–]\s*[A-Z]\s*$/i, '')
    .replace(/\s+Football Club\s*$/i, '')
    .replace(/\s+FC\s*$/i, '')
    .replace(/\s*\bLeague\b\s*$/i, '')
    .replace(/\s*\bReserves\b\s*$/i, '')
    .replace(/\s*\bBoys\s+Under\s*[\d.]+\b\s*$/i, '')
    .replace(/\s*\bGirls\s+Under\s*[\d.]+\b\s*$/i, '')
    .replace(/\s*\bUnder\s*[\d.]+\s*Boys\b\s*$/i, '')
    .replace(/\s*\bUnder\s*[\d.]+\s*Girls\b\s*$/i, '')
    .replace(/\s*\bUnder\s*[\d.]+\b\s*$/i, '')
    .replace(/\s*\bU[\d.]+\s*Boys\b\s*$/i, '')
    .replace(/\s*\bU[\d.]+\s*Girls\b\s*$/i, '')
    .replace(/\s*\bU[\d.]+s?\b\s*$/i, '')
    .replace(/\s*\bSnr\s+Colts\b\s*$/i, '')
    .replace(/\s*\bSenior\s+Colts\b\s*$/i, '')
    .replace(/\s*\bMixed\b\s*$/i, '')
    .replace(/\s*\bMixed\b\s*$/i, '')
    .replace(/\s*\bUnder\s*[\d.]+\s*Mixed\b\s*$/i, '')
    .replace(/\s*\bU[\d.]+\s*Mixed\b\s*$/i, '')
    .replace(/\s*\bColts\b\s*$/i, '')
    .replace(/\s*\bU[\d.]+\s*Mixed\b\s*$/i, '')      // U14 Mixed
    .replace(/\s*\bUnder\s*[\d.]+\s*Mixed\b\s*$/i, '') // Under 14 Mixed
    .replace(/\s*\bMixed\b\s*$/i, '')                  // Mixed (leftover)
    .replace(/\s*\bU[\d.]+s?\b\s*$/i, '')              // U14, U18s
    .replace(/\s*\bUnder\s*[\d.]+\b\s*$/i, '')         // Under 14
    .trim()
}

function getGradeId(doc) {
  return doc._id?.replace(/^goalKickers-|^goalkickers-/, '') || ''
}

export default function GoalKickersContent() {
  const searchParams = useSearchParams()
  const initialCompetition = searchParams.get('competition') ?? 'SANFL'

  const [allDocs, setAllDocs]   = useState([])
  const [pastedData, setPastedData] = useState(null)
  const [loading, setLoading]   = useState(true)
  const [level1, setLevel1]     = useState(LEVEL1_ORDER.includes(initialCompetition) ? initialCompetition : initialCompetition === 'Amateur' ? "Amateurs (Men's)" : 'SANFL')
  const [level2, setLevel2]     = useState(null)
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    fetch('/api/goal-kickers')
      .then(r => r.json())
      .then(d => setAllDocs(Array.isArray(d) ? d : []))
      .catch(() => setAllDocs([]))
      .finally(() => setLoading(false))
  }, [])

  // Fetch pasted goal kickers when a grade is selected
  useEffect(() => {
    if (!level2) { setPastedData(null); return }
    // Clear immediately so stale data from the previous grade never shows
    setPastedData(null)
    const subGrade = activeId ? getLeagueCategory(activeId).level3 : ''
    const url = `/api/combined-goal-kickers?competition=${encodeURIComponent(level1)}&grade=${encodeURIComponent(level2)}${subGrade ? `&subGrade=${encodeURIComponent(subGrade)}` : ''}&t=${Date.now()}`
    let cancelled = false
    fetch(url, { cache: 'no-store' })
      .then(r => r.json())
      .then(d => { if (!cancelled) setPastedData(d?.players?.length ? d : null) })
      .catch(() => { if (!cancelled) setPastedData(null) })
    return () => { cancelled = true }
  }, [level1, level2, activeId])

  useEffect(() => {
    const opts = getLevel2Options(level1)
    setLevel2(opts[0] ?? null)
    setActiveId(null)
  }, [level1, allDocs])

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
  // Pasted data (mapped to same shape) takes priority over PlayHQ synced data
  const pastedPlayers = pastedData?.players?.length
    ? pastedData.players.map(p => ({ playerName: p.player, teamName: p.team, games: p.games, goals: p.goals }))
    : null
  const sortedPlayers = pastedPlayers
    ? [...pastedPlayers].sort((a, b) => b.goals - a.goals).slice(0, 20)
    : activeDoc
      ? [...(activeDoc.players || [])].sort((a, b) => b.goals - a.goals).slice(0, 20)
      : []

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
      <section className="bg-gradient-to-r from-[#2ca3ee] to-[#00b8f1] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">GOAL KICKERS</h1>
          <p className="text-xl">Season goal kicking leaders across SA football</p>
        </div>
      </section>

      <section className="bg-white border-b shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap gap-2 justify-center">
            {LEVEL1_ORDER.map(l1 => (
              <button key={l1} onClick={() => setLevel1(l1)} style={tabBtn(level1 === l1, '#2ca3ee')}>{l1}</button>
            ))}
          </div>
        </div>
      </section>

      {level2Options.length > 0 && (
        <section className="bg-gray-50 border-b">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-wrap gap-2 justify-center">
              {level2Options.map(l2 => (
                <button key={l2} onClick={() => setLevel2(l2)} style={tabBtn(level2 === l2, '#e6a800')}>{l2}</button>
              ))}
            </div>
          </div>
        </section>
      )}

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
            <p className="mt-4 text-gray-600">Loading goal kickers...</p>
          </div>
        ) : !activeDoc && !pastedPlayers ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏉</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Goal Kickers Data</h3>
            <p className="text-gray-600">Select a grade above or check back soon</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
            <div className="bg-[#2ca3ee] text-white px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">{pastedData ? pastedData.grade : (activeDoc?.gradeName || getLeagueCategory(getGradeId(activeDoc)).level3)}</h2>
                <p className="text-sm opacity-80">{level1} · {level2}{pastedData?.subGrade ? ' · ' + pastedData.subGrade : ''} · {pastedData ? pastedData.season : activeDoc?.season}</p>
              </div>
              {(pastedData?.syncedAt || activeDoc?.syncedAt) && (
                <p className="text-xs opacity-70">Updated {new Date(pastedData?.syncedAt || activeDoc.syncedAt).toLocaleDateString('en-AU')}</p>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                    <th className="px-4 py-3 text-left">#</th>
                    <th className="px-4 py-3 font-bold text-left">Player</th>
                    <th className="px-4 py-3 text-left">Team</th>
                    <th className="px-3 py-3 text-center">GP</th>
                    <th className="px-3 py-3 text-center font-bold">Goals</th>
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
        )}
      </section>
    </>
  )
}
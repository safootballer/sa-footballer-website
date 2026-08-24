import { createClient } from '@sanity/client'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Clean team name — strip grade suffixes like "- M7", "- W1R"
function cleanTeam(name) {
  if (!name) return ''
  return name
    .replace(/\s*[-–]\s*M\d+R?\s*$/i, '')
    .replace(/\s*[-–]\s*W\d+R?\s*$/i, '')
    .replace(/\s*[-–]\s*C\d+\s*$/i, '')
    .replace(/\s*[-–]\s*[A-H]\s*Grade\s*$/i, '')
    .trim()
}

function parseGoalKickers(text) {
  if (!text) return []
  const rawLines = text.split('\n').map(l => l.trim()).filter(Boolean)

  // ── Try tab-separated first ──────────────────────────────────────
  // Format per line: Rank<tab>Player<tab>Team<tab>GP<tab>Goals  (BP optional)
  const tabRows = rawLines.filter(l => l.includes('\t'))
  if (tabRows.length >= 2) {
    const players = []
    for (const line of tabRows) {
      const p = line.split('\t').map(s => s.trim()).filter(Boolean)
      // Skip header row
      if (/player/i.test(p[1]) || /^#$/.test(p[0])) continue
      // Expect: [rank, player, team, gp, goals, (bp)]
      if (p.length >= 5) {
        players.push({
          rank:   parseInt(p[0]) || players.length + 1,
          player: p[1],
          team:   cleanTeam(p[2]),
          games:  parseInt(p[3]) || 0,
          goals:  parseInt(p[4]) || 0,
        })
      }
    }
    if (players.length) return players
  }

  // ── PlayHQ multi-line format ─────────────────────────────────────
  // Pattern repeats: rank / player / team / GP / G / BP
  const players = []
  let i = 0
  // Skip any header tokens
  while (i < rawLines.length && /^(player|team|gp|g|bp|#|goals|games)$/i.test(rawLines[i])) i++

  while (i < rawLines.length) {
    const rankLine = rawLines[i]
    const rank = parseInt(rankLine, 10)
    if (isNaN(rank) || String(rank) !== rankLine) { i++; continue }

    const player = rawLines[i + 1] || ''
    const team   = rawLines[i + 2] || ''
    const gp     = parseInt(rawLines[i + 3], 10)
    const g      = parseInt(rawLines[i + 4], 10)
    // rawLines[i + 5] is BP — skipped

    if (player && team && !isNaN(gp) && !isNaN(g)) {
      players.push({
        rank,
        player,
        team:  cleanTeam(team),
        games: gp,
        goals: g,
      })
      i += 6  // move past rank, player, team, gp, g, bp
    } else {
      i++
    }
  }

  return players
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const competition = searchParams.get('competition')
  const grade       = searchParams.get('grade')
  const subGrade    = searchParams.get('subGrade') || ''

  if (!competition || !grade) {
    return NextResponse.json({ error: 'competition and grade required' }, { status: 400 })
  }

  try {
    let doc = null
    if (subGrade) {
      doc = await client.fetch(
        `*[_type == "pastedGoalKickers" && competition == $competition && grade == $grade && subGrade == $subGrade] | order(_updatedAt desc) [0] {
          _id, competition, grade, subGrade, season, round, data, _updatedAt
        }`,
        { competition, grade, subGrade }
      )
    }
    if (!doc) {
      doc = await client.fetch(
        `*[_type == "pastedGoalKickers" && competition == $competition && grade == $grade && (!defined(subGrade) || subGrade == "")] | order(_updatedAt desc) [0] {
          _id, competition, grade, subGrade, season, round, data, _updatedAt
        }`,
        { competition, grade }
      )
    }

    if (!doc) return NextResponse.json(null)

    const players = parseGoalKickers(doc.data)
    return NextResponse.json({
      competition: doc.competition,
      grade:       doc.grade,
      subGrade:    doc.subGrade,
      season:      doc.season,
      round:       doc.round,
      syncedAt:    doc._updatedAt,
      players,
    })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
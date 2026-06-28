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

function parsePastedLadder(teamsText, statsText) {
  if (!teamsText || !statsText) return []

  const teams = teamsText.split('\n').map(l => l.trim()).filter(Boolean)
  const stats = statsText.split('\n').map(l => l.trim()).filter(Boolean)

  return teams.map((teamName, i) => {
    const row = stats[i] ?? ''
    const parts = row.split(/\t|\s{2,}/).map(s => s.trim()).filter(Boolean)
    return {
      rank:          i + 1,
      teamName,
      played:        parseInt(parts[0]) || 0,
      points:        parseInt(parts[1]) || 0,
      percentage:    parseFloat(parts[2]) || 0,
      wins:          parseInt(parts[3]) || 0,
      losses:        parseInt(parts[4]) || 0,
      draws:         parseInt(parts[5]) || 0,
      byes:          parseInt(parts[6]) || 0,
      pointsFor:     parseInt(parts[7]) || 0,
      pointsAgainst: parseInt(parts[8]) || 0,
      forfeits:      parseInt(parts[9]) || 0,
    }
  }).filter(t => t.teamName)
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const competition = searchParams.get('competition')
  const grade       = searchParams.get('grade')

  if (!competition || !grade) {
    return NextResponse.json({ error: 'competition and grade required' }, { status: 400 })
  }

  try {
    const doc = await client.fetch(
      `*[_type == "pastedLadder" && competition == $competition && grade == $grade] | order(_updatedAt desc) [0] {
        _id, competition, grade, season, round, teams, stats, _updatedAt
      }`,
      { competition, grade }
    )

    if (!doc) return NextResponse.json(null)

    const teams = parsePastedLadder(doc.teams, doc.stats)
    return NextResponse.json({
      competition: doc.competition,
      grade:       doc.grade,
      season:      doc.season,
      round:       doc.round,
      syncedAt:    doc._updatedAt,
      teams,
    })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
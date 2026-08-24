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

// Map level3 grade name → schema field prefix
const GRADE_FIELD = {
  'A-Grade':      'aGrade',
  'A Grade':      'aGrade',
  'Reserves':     'reserves',
  'Senior Colts': 'seniorColts',
  'Junior Colts': 'juniorColts',
}

function cleanTeam(name) {
  if (!name) return ''
  return name.replace(/\s*[-–].*$/, '').trim()
}

function parseLadder(text) {
  if (!text) return []
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
  const teams = []
  const statsRows = []

  for (const line of lines) {
    if (/^#\s*(team)?$/i.test(line) || /^team$/i.test(line)) continue
    if (/^P\s+PTS/i.test(line) || /^P\t/i.test(line)) continue
    if (/^(P|PTS|%|W|L|D|BYE|F|A|FORF|DISQ|ADJ)$/i.test(line)) continue

    const cells = line.split(/\t|\s{2,}/).map(s => s.trim()).filter(Boolean)
    const allNums = cells.length >= 4 && cells.every(c => /^-?[\d.]+$/.test(c))

    if (allNums) { statsRows.push(cells); continue }

    const teamName = line.replace(/^\d+\s*[\t ]+\s*/, '').replace(/^\d+\s+/, '').trim()
    if (teamName && !/^\d+$/.test(teamName)) teams.push(cleanTeam(teamName))
  }

  return teams.map((teamName, i) => {
    const s = statsRows[i] ?? []
    return {
      rank: i + 1, teamName,
      played: parseInt(s[0]) || 0, points: parseInt(s[1]) || 0,
      percentage: parseFloat(s[2]) || 0, wins: parseInt(s[3]) || 0,
      losses: parseInt(s[4]) || 0, draws: parseInt(s[5]) || 0,
      byes: parseInt(s[6]) || 0, pointsFor: parseInt(s[7]) || 0,
      pointsAgainst: parseInt(s[8]) || 0, forfeits: parseInt(s[9]) || 0,
    }
  }).filter(t => t.teamName)
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const league = searchParams.get('league')
  const grade  = searchParams.get('grade')  // level3: A-Grade, Reserves, etc

  if (!league || !grade) {
    return NextResponse.json({ error: 'league and grade required' }, { status: 400 })
  }

  const prefix = GRADE_FIELD[grade]
  if (!prefix) return NextResponse.json(null)

  const ladderField = `${prefix}Ladder`

  try {
    const doc = await client.fetch(
      `*[_type == "countryStats" && league == $league] | order(_updatedAt desc) [0] {
        league, season, round, "${ladderField}": ${ladderField}, _updatedAt
      }`,
      { league }
    )

    if (!doc || !doc[ladderField]) return NextResponse.json(null)

    const teams = parseLadder(doc[ladderField])
    if (!teams.length) return NextResponse.json(null)

    return NextResponse.json({
      league: doc.league, grade,
      season: doc.season, round: doc.round,
      syncedAt: doc._updatedAt, teams,
    })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
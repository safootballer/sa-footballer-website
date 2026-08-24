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

function cleanTeam(name) {
  if (!name) return ''
  return name.replace(/\s*[-–].*$/, '').trim()
}

// Parse a whole ladder pasted in one box:
//   header row(s) ignored, team lines (with rank prefix) collected,
//   then stats rows collected, matched by position.
function parseLadder(text) {
  if (!text) return []
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)

  const teams = []
  const statsRows = []

  for (const line of lines) {
    // Skip header rows
    if (/^#\s*(team)?$/i.test(line) || /^team$/i.test(line)) continue
    if (/^P\s+PTS/i.test(line) || /^P\t/i.test(line)) continue
    if (/^(P|PTS|%|W|L|D|BYE|F|A|FORF|DISQ|ADJ)$/i.test(line)) continue

    // Stats row: starts with number, all cells numeric
    const cells = line.split(/\t|\s{2,}/).map(s => s.trim()).filter(Boolean)
    const allNums = cells.length >= 4 && cells.every(c => /^-?[\d.]+$/.test(c))

    if (allNums) {
      statsRows.push(cells)
      continue
    }

    // Team line: strip leading rank number ("1  Team" or "1\tTeam")
    const teamName = line.replace(/^\d+\s*[\t ]+\s*/, '').replace(/^\d+\s+/, '').trim()
    if (teamName && !/^\d+$/.test(teamName)) {
      teams.push(cleanTeam(teamName))
    }
  }

  return teams.map((teamName, i) => {
    const s = statsRows[i] ?? []
    return {
      rank:          i + 1,
      teamName,
      played:        parseInt(s[0]) || 0,
      points:        parseInt(s[1]) || 0,
      percentage:    parseFloat(s[2]) || 0,
      wins:          parseInt(s[3]) || 0,
      losses:        parseInt(s[4]) || 0,
      draws:         parseInt(s[5]) || 0,
      byes:          parseInt(s[6]) || 0,
      pointsFor:     parseInt(s[7]) || 0,
      pointsAgainst: parseInt(s[8]) || 0,
      forfeits:      parseInt(s[9]) || 0,
    }
  }).filter(t => t.teamName)
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
        `*[_type == "pastedStats" && competition == $competition && grade == $grade && subGrade == $subGrade] | order(_updatedAt desc) [0] {
          competition, grade, subGrade, season, round, ladder, _updatedAt
        }`,
        { competition, grade, subGrade }
      )
    }
    if (!doc) {
      doc = await client.fetch(
        `*[_type == "pastedStats" && competition == $competition && grade == $grade && (!defined(subGrade) || subGrade == "")] | order(_updatedAt desc) [0] {
          competition, grade, subGrade, season, round, ladder, _updatedAt
        }`,
        { competition, grade }
      )
    }

    if (!doc || !doc.ladder) return NextResponse.json(null)

    const teams = parseLadder(doc.ladder)
    if (!teams.length) return NextResponse.json(null)

    return NextResponse.json({
      competition: doc.competition,
      grade:       doc.grade,
      subGrade:    doc.subGrade,
      season:      doc.season,
      round:       doc.round,
      syncedAt:    doc._updatedAt,
      teams,
    })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
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

function parseGoalKickers(text) {
  if (!text) return []
  const rawLines = text.split('\n').map(l => l.trim()).filter(Boolean)
  const players = []
  let i = 0
  while (i < rawLines.length && /^(player|team|gp|g|bp|#|goals|games)$/i.test(rawLines[i])) i++

  while (i < rawLines.length) {
    const line = rawLines[i]
    const rank = parseInt(line, 10)

    if (!isNaN(rank) && String(rank) === line) {
      const dataLine = rawLines[i + 1] || ''
      if (dataLine.includes('\t')) {
        const p = dataLine.split('\t').map(s => s.trim())
        players.push({
          rank,
          player: p[0] || '',
          team:   cleanTeam(p[1] || ''),
          games:  parseInt(p[2]) || 0,
          goals:  parseInt(p[3]) || 0,
        })
        i += 2
        continue
      }
      i++
      continue
    }

    if (line.includes('\t')) {
      const p = line.split('\t').map(s => s.trim())
      if (!/player/i.test(p[1] || '')) {
        players.push({
          rank:   parseInt(p[0]) || players.length + 1,
          player: p[1] || '',
          team:   cleanTeam(p[2] || ''),
          games:  parseInt(p[3]) || 0,
          goals:  parseInt(p[4]) || 0,
        })
      }
      i++
      continue
    }
    i++
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
        `*[_type == "pastedStats" && competition == $competition && grade == $grade && subGrade == $subGrade] | order(_updatedAt desc) [0] {
          competition, grade, subGrade, season, round, goalKickers, _updatedAt
        }`,
        { competition, grade, subGrade }
      )
    }
    if (!doc) {
      doc = await client.fetch(
        `*[_type == "pastedStats" && competition == $competition && grade == $grade && (!defined(subGrade) || subGrade == "")] | order(_updatedAt desc) [0] {
          competition, grade, subGrade, season, round, goalKickers, _updatedAt
        }`,
        { competition, grade }
      )
    }

    if (!doc || !doc.goalKickers) return NextResponse.json(null)

    const players = parseGoalKickers(doc.goalKickers)
    if (!players.length) return NextResponse.json(null)

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
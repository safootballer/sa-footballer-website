import { createClient } from '@sanity/client'
import { NextResponse } from 'next/server'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Parse the messy AFL website paste into clean team rows
function parseAflLadder(text) {
  if (!text) return []
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
  const teams = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Check if this line is a position number
    const pos = parseInt(line, 10)
    if (!isNaN(pos) && String(pos) === line && pos >= 1 && pos <= 20) {
      i++
      // Skip junk lines like "Top 6", "WC" — next real line is club name
      // Club name is a non-numeric, non-tab line
      let club = ''
      while (i < lines.length) {
        const next = lines[i]
        if (/\t/.test(next) || /^\$/.test(next) || /^[A-Z]{2,4}$/.test(next)) break
        if (!isNaN(parseInt(next, 10)) && String(parseInt(next, 10)) === next) break
        // Skip known junk
        if (/^Top \d+/.test(next) || /^WC$/.test(next) || next === '') { i++; continue }
        club = next
        i++
        break
      }

      // Next tab-separated line is the stats
      let stats = null
      while (i < lines.length) {
        const next = lines[i]
        if (/\t/.test(next)) {
          stats = next
          i++
          break
        }
        // Skip form/odds lines
        if (/^[A-Z]{2,5}$/.test(next) || /^\$/.test(next)) { i++; continue }
        break
      }

      if (club && stats) {
        const parts = stats.split('\t').map(s => s.trim()).filter(Boolean)
        if (parts.length >= 8) {
          teams.push({
            rank:          pos,
            teamName:      club,
            played:        parseInt(parts[0]) || 0,
            points:        parseInt(parts[1]) || 0,
            percentage:    parseFloat(parts[2]) || 0,
            wins:          parseInt(parts[3]) || 0,
            losses:        parseInt(parts[4]) || 0,
            draws:         parseInt(parts[5]) || 0,
            pointsFor:     parseInt(parts[6]) || 0,
            pointsAgainst: parseInt(parts[7]) || 0,
          })
        }
      }
    } else {
      i++
    }
  }

  return teams
}

export async function GET() {
  try {
    const doc = await client.fetch(
      `*[_type == "aflLadder"] | order(_updatedAt desc) [0] { _id, season, round, ladderText, _updatedAt }`
    )
    if (!doc) return NextResponse.json({ teams: [], season: '', round: '' })

    const teams = parseAflLadder(doc.ladderText)
    return NextResponse.json({
      teams,
      season:    doc.season,
      round:     doc.round,
      syncedAt:  doc._updatedAt,
    })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
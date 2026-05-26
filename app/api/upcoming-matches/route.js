import { createClient } from '@sanity/client'
import { NextResponse } from 'next/server'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const CATEGORY_MAP = {
  afl:      'AFL',
  aflw:     'AFLW',
  sanfl:    'SANFL',
  sanflw:   'SANFLW',
  amateurs: 'Amateur',
  sawfl:    "SAWFL Women's",
  country:  'Country Football',
}

// Parse "Home Team v Away Team @ Venue" lines
function parseMatches(text, matchDate, round, competition, amateurGrade, sanflGrade, countryLeague) {
  if (!text) return []
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0 && line.includes(' v '))
    .map(line => {
      const atIdx    = line.lastIndexOf(' @ ')
      const venue    = atIdx !== -1 ? line.slice(atIdx + 3).trim() : ''
      const matchPart = atIdx !== -1 ? line.slice(0, atIdx).trim() : line.trim()
      const vIdx     = matchPart.indexOf(' v ')
      const homeTeam = vIdx !== -1 ? matchPart.slice(0, vIdx).trim() : matchPart
      const awayTeam = vIdx !== -1 ? matchPart.slice(vIdx + 3).trim() : ''

      return {
        _type:        'upcomingMatch',
        homeTeam,
        awayTeam,
        venue,
        matchDate,
        round,
        competition,
        amateurGrade: amateurGrade || undefined,
        sanflGrade:   sanflGrade   || undefined,
        countryLeague: countryLeague || undefined,
      }
    })
    .filter(m => m.homeTeam && m.awayTeam)
}

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const category      = searchParams.get('category')
  const countryLeague = searchParams.get('countryLeague')
  const amateurGrade  = searchParams.get('amateurGrade')
  const sanflGrade    = searchParams.get('sanflGrade')

  // Build filter for bulk documents
  const conditions = ['_type == "upcomingMatchesBulk"', 'matchDate > now()']

  if (category && category !== 'all' && CATEGORY_MAP[category]) {
    conditions.push(`competition == "${CATEGORY_MAP[category]}"`)
  }
  if (category === 'country') {
    conditions.push('competition == "Country Football"')
  }
  if (countryLeague) {
    conditions.push(`countryLeague == "${countryLeague}"`)
  }
  if (amateurGrade) {
    conditions.push(`amateurGrade == "${amateurGrade}"`)
  }
  if (sanflGrade) {
    if (sanflGrade === 'league') {
      conditions.push(`(sanflGrade == "league" || !defined(sanflGrade))`)
    } else {
      conditions.push(`sanflGrade == "${sanflGrade}"`)
    }
  }

  const query = `*[${conditions.join(' && ')}] | order(matchDate asc) {
    _id, competition, amateurGrade, sanflGrade, countryLeague,
    round, matchDate, matches
  }`

  try {
    const docs = await client.fetch(query)

    // Parse each bulk doc into individual match objects
    const allMatches = docs.flatMap(doc =>
      parseMatches(
        doc.matches,
        doc.matchDate,
        doc.round,
        doc.competition,
        doc.amateurGrade,
        doc.sanflGrade,
        doc.countryLeague,
      ).map((m, i) => ({ ...m, _id: `${doc._id}-${i}` }))
    )

    // Sort by matchDate
    allMatches.sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate))

    return NextResponse.json(allMatches)
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
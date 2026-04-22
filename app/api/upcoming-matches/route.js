import { createClient } from '@sanity/client'
import { NextResponse } from 'next/server'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
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

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const category      = searchParams.get('category')
  const countryLeague = searchParams.get('countryLeague')

  const conditions = [
    '_type == "upcomingMatch"',
    'matchDate > now()',
  ]

  if (category && category !== 'all' && CATEGORY_MAP[category]) {
    conditions.push(`competition == "${CATEGORY_MAP[category]}"`)
  }

  // For country football pages, ONLY show Country Football matches
  // Never show Amateur/SANFL etc on country football page
  if (category === 'country') {
    conditions.push('competition == "Country Football"')
  }

  if (countryLeague) {
    conditions.push(`countryLeague == "${countryLeague}"`)
  }

  const query = `*[${conditions.join(' && ')}] | order(matchDate asc) {
    _id, homeTeam, awayTeam, matchDate, venue, round, competition, countryLeague, notes
  }`

  try {
    const data = await client.fetch(query)
    return NextResponse.json(data)
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
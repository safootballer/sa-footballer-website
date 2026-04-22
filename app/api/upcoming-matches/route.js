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
}

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')

  const conditions = [
    '_type == "upcomingMatch"',
    'matchDate > now()',
  ]

  if (category && category !== 'all' && CATEGORY_MAP[category]) {
    conditions.push(`competition == "${CATEGORY_MAP[category]}"`)
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
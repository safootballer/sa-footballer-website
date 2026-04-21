import { createClient } from '@sanity/client'
import { NextResponse } from 'next/server'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const competition   = searchParams.get('competition')
  const countryLeague = searchParams.get('countryLeague')

  const conditions = ['_type == "ladder"']

  if (competition && competition !== 'all') {
    conditions.push(`competition == "${competition}"`)
  }
  if (countryLeague) {
    conditions.push(`countryLeague == "${countryLeague}"`)
  }

  const filter = `*[${conditions.join(' && ')}]`

  const query = `${filter} | order(syncedAt desc) {
    _id, title, slug, competition, countryLeague, gradeName, season, syncedAt,
    teams[] { rank, teamName, played, wins, losses, draws, byes, points, percentage, pointsFor, pointsAgainst, forfeits }
  }`

  try {
    const data = await client.fetch(query)
    return NextResponse.json(data)
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
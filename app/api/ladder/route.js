import { createClient } from '@sanity/client'
import { NextResponse } from 'next/server'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

export async function GET() {
  const query = `*[_type == "ladder"] | order(syncedAt desc) {
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
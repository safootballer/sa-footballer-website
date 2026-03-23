import { client } from '../../../lib/sanity'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 60

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') || 'all'

  let filter = '*[_type == "matchResult"]'
  
  if (category !== 'all') {
    const competitionMap = {
      'afl': 'AFL',
      'aflw': 'AFLW',
      'sanfl': 'SANFL',
      'sanflw': 'SANFLW',
      'amateurs': 'Amateur',
      'sawfl': 'SAWFL Women\'s'
    }
    
    const competition = competitionMap[category]
    if (competition) {
      filter = `*[_type == "matchResult" && competition == "${competition}"]`
    }
  }

  const query = `${filter} | order(matchDate desc) {
    _id,
    title,
    slug,
    competition,
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    matchDate,
    venue,
    round
  }`

  try {
    const matchResults = await client.fetch(query)
    return NextResponse.json(matchResults)
  } catch (error) {
    console.error('Error fetching match results:', error)
    return NextResponse.json([], { status: 500 })
  }
}
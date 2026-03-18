import { client } from '../../../lib/sanity'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 60

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') || 'all'

  let filter = '*[_type == "matchReport"]'
  
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
      filter = `*[_type == "matchReport" && competition == "${competition}"]`
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
    const matchReports = await client.fetch(query)
    return NextResponse.json(matchReports)
  } catch (error) {
    console.error('Error fetching match reports:', error)
    return NextResponse.json([], { status: 500 })
  }
}
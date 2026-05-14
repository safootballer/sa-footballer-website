import { client } from '../../../lib/sanity'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 60

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const category     = searchParams.get('category') || 'all'
  const amateurGrade = searchParams.get('amateurGrade') || null
  const sanflGrade   = searchParams.get('sanflGrade') || null

  let filter = '*[_type == "matchResult" && competition != "Country Football"]'

  if (category !== 'all') {
    const competitionMap = {
      afl:      'AFL',
      aflw:     'AFLW',
      sanfl:    'SANFL',
      sanflw:   'SANFLW',
      amateurs: 'Amateur',
      sawfl:    "SAWFL Women's",
    }
    const competition = competitionMap[category]
    if (competition) {
      filter = `*[_type == "matchResult" && competition == "${competition}"]`
    }
  }

  // Amateur grade filter
  if (category === 'amateurs' && amateurGrade) {
    filter = `*[_type == "matchResult" && competition == "Amateur" && amateurGrade == "${amateurGrade}"]`
  }

  // SAWFL Women's grade filter
  if (category === 'sawfl' && amateurGrade) {
    filter = `*[_type == "matchResult" && competition == "SAWFL Women's" && amateurGrade == "${amateurGrade}"]`
  }

  // SANFL grade filter
  if (category === 'sanfl' && sanflGrade) {
    if (sanflGrade === 'league') {
      filter = `*[_type == "matchResult" && competition == "SANFL" && (sanflGrade == "league" || !defined(sanflGrade))]`
    } else {
      filter = `*[_type == "matchResult" && competition == "SANFL" && sanflGrade == "${sanflGrade}"]`
    }
  }

  const query = `${filter} | order(matchDate desc) {
    _id, title, slug, competition, amateurGrade, sanflGrade,
    homeTeam, awayTeam, homeScore, awayScore,
    matchDate, venue, round
  }`

  try {
    const matchResults = await client.fetch(query)
    return NextResponse.json(matchResults)
  } catch (error) {
    console.error('Error fetching match results:', error)
    return NextResponse.json([], { status: 500 })
  }
}
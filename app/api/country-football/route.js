import { client } from '../../../lib/sanity'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 60

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const league = searchParams.get('league') || 'all'

  let editorialFilter = '*[_type == "editorial" && countryLeague != null]'
  let matchFilter = '*[_type == "matchResult" && countryLeague != null]'
  
  if (league !== 'all') {
    editorialFilter = `*[_type == "editorial" && countryLeague == "${league}"]`
    matchFilter = `*[_type == "matchResult" && countryLeague == "${league}"]`
  }

  const editorialsQuery = `${editorialFilter} | order(publishedAt desc)[0...20] {
    _id,
    title,
    slug,
    league,
    countryLeague,
    publishedAt,
    excerpt,
    featuredImage,
    author
  }`

  const matchesQuery = `${matchFilter} | order(matchDate desc)[0...20] {
    _id,
    title,
    slug,
    league,
    countryLeague,
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    matchDate,
    venue,
    round
  }`

  try {
    const [editorials, matchResults] = await Promise.all([
      client.fetch(editorialsQuery),
      client.fetch(matchesQuery)
    ])
    
    return NextResponse.json({ articles: editorials, matchReports: matchResults })
  } catch (error) {
    console.error('Error fetching country football content:', error)
    return NextResponse.json({ articles: [], matchReports: [] }, { status: 500 })
  }
}
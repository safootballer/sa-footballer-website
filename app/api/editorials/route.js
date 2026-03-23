import { client } from '../../../lib/sanity'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 60

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') || 'all'

  let filter = '*[_type == "editorial"]'
  
  if (category !== 'all') {
    const competitionMap = {
      'afl': 'AFL',
      'aflw': 'AFLW',
      'sanfl': 'SANFL',
      'sanflw': 'SANFLW',
      'amateurs': 'Amateur',
      'sawfl': "SAWFL Women's"
    }
    
    const competition = competitionMap[category]
    if (competition) {
      filter = `*[_type == "editorial" && competition == "${competition}"]`
    }
  }

  const query = `${filter} | order(publishedAt desc) {
    _id,
    title,
    slug,
    competition,
    publishedAt,
    excerpt,
    featuredImage,
    author
  }`

  try {
    const editorials = await client.fetch(query)
    return NextResponse.json(editorials)
  } catch (error) {
    console.error('Error fetching editorials:', error)
    return NextResponse.json([], { status: 500 })
  }
}
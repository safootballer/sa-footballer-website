import { client } from '../../../lib/sanity'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 60

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') || 'all'

  let filter = '*[_type == "video"]'
  
  if (category !== 'all') {
    const categoryMap = {
      'live-stream': 'Live Stream',
      'filming': 'Filming',
      'panel-shows': 'Panel Shows'
    }
    
    const categoryName = categoryMap[category]
    if (categoryName) {
      filter = `*[_type == "video" && category == "${categoryName}"]`
    }
  }

  const query = `${filter} | order(publishedAt desc) {
    _id,
    title,
    youtubeUrl,
    category,
    publishedAt
  }`

  try {
    const videos = await client.fetch(query)
    return NextResponse.json(videos)
  } catch (error) {
    console.error('Error fetching videos:', error)
    return NextResponse.json([], { status: 500 })
  }
}
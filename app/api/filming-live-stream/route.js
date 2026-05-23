import { client } from '../../../lib/sanity'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') || 'all'

  let filter

  if (category === 'filming-and-live-stream' || category === 'all') {
    // Show only filming and live-stream — exclude panel shows
    filter = `*[_type == "video" && category in ["filming", "live-stream"]]`
  } else if (category === 'live-stream') {
    filter = `*[_type == "video" && category == "live-stream"]`
  } else if (category === 'filming') {
    filter = `*[_type == "video" && category == "filming"]`
  } else {
    filter = `*[_type == "video" && category in ["filming", "live-stream"]]`
  }

  const query = `${filter} | order(publishedAt desc) {
    _id, title, youtubeUrl, category, publishedAt
  }`

  try {
    const videos = await client.fetch(query, {}, { cache: 'no-store' })
    return NextResponse.json(videos)
  } catch (error) {
    console.error('Error fetching videos:', error)
    return NextResponse.json([], { status: 500 })
  }
}
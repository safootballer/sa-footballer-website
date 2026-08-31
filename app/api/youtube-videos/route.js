import { NextResponse } from 'next/server'

export const revalidate = 1800 // cache 30 min

// Channel UCohBOBxeJt9AruGWffeW-OQ → uploads playlist UUohBOBxeJt9AruGWffeW-OQ
const UPLOADS_PLAYLIST = 'UUohBOBxeJt9AruGWffeW-OQ'

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'YouTube API key not configured' }, { status: 500 })
  }

  try {
    const videos = []
    let pageToken = ''
    let pages = 0

    // Fetch up to 3 pages (150 videos max) to keep it fast
    do {
      const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${UPLOADS_PLAYLIST}&key=${apiKey}${pageToken ? `&pageToken=${pageToken}` : ''}`
      const res  = await fetch(url, { next: { revalidate: 1800 } })
      const data = await res.json()

      if (data.error) {
        return NextResponse.json({ error: data.error.message }, { status: 400 })
      }

      for (const item of data.items ?? []) {
        const s = item.snippet
        const videoId = item.contentDetails?.videoId
        if (!videoId) continue
        videos.push({
          videoId,
          title:       s.title,
          description: s.description?.slice(0, 200) ?? '',
          publishedAt: s.contentDetails?.videoPublishedAt ?? s.publishedAt,
          thumbnail:   s.thumbnails?.maxres?.url
                     ?? s.thumbnails?.high?.url
                     ?? s.thumbnails?.medium?.url
                     ?? s.thumbnails?.default?.url,
          url: `https://www.youtube.com/watch?v=${videoId}`,
        })
      }

      pageToken = data.nextPageToken ?? ''
      pages++
    } while (pageToken && pages < 3)

    // Newest first
    videos.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

    return NextResponse.json({ videos })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
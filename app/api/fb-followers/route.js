import { NextResponse } from 'next/server'

export const revalidate = 3600 // cache for 1 hour

export async function GET() {
  const pageId    = process.env.FACEBOOK_PAGE_ID
  const pageToken = process.env.FACEBOOK_PAGE_TOKEN

  if (!pageId || !pageToken) {
    return NextResponse.json({ error: 'Facebook not configured' }, { status: 500 })
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${pageId}?fields=followers_count,fan_count&access_token=${pageToken}`,
      { next: { revalidate: 3600 } }
    )
    const data = await res.json()

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 })
    }

    return NextResponse.json({
      followers: data.followers_count ?? data.fan_count ?? null,
      likes:     data.fan_count ?? null,
    })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
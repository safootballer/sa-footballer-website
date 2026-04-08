// app/api/send-magazine/route.js

import { NextResponse } from 'next/server'

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const SANITY_DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const SANITY_TOKEN      = process.env.SANITY_API_TOKEN
const RESEND_API_KEY    = process.env.RESEND_API_KEY
const SEND_SECRET       = process.env.SEND_MAGAZINE_SECRET
const FROM_EMAIL        = 'noreply@safootballer.com.au'
const FROM_NAME         = 'The South Australian Footballer'

// ── Sanity CDN image URL builder ──────────────────────────────────
function sanityImageUrl(ref) {
  if (!ref) return null
  // ref format: image-xxxx-800x600-jpg
  const cleaned = ref
    .replace('image-', '')
    .replace(/-(\w+)$/, '.$1') // last -jpg/-png → .jpg/.png
  return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${cleaned}`
}

// ── Fetch latest magazine covers from Sanity ──────────────────────
async function getMagazineCovers() {
  const query = encodeURIComponent(`{
    "saFootballer":  *[_type == "magazine" && magazineType == "SA Footballer"]  | order(publishedAt desc)[0]{ coverImage, pdfUrl },
    "ammoFooty":     *[_type == "magazine" && magazineType == "Ammo Footy Budget"]  | order(publishedAt desc)[0]{ coverImage, pdfUrl },
    "womensFooty":   *[_type == "magazine" && magazineType == "Women's Footy Budget"] | order(publishedAt desc)[0]{ coverImage, pdfUrl },
    "countryFooty":  *[_type == "magazine" && magazineType == "Country Footy Budget"] | order(publishedAt desc)[0]{ coverImage, pdfUrl }
  }`)

  const res = await fetch(
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${SANITY_DATASET}?query=${query}`,
    { headers: { 'Authorization': `Bearer ${SANITY_TOKEN}` } }
  )

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Sanity covers fetch error: ${err}`)
  }

  const data = await res.json()
  return data.result
}

// ── Fetch all active subscribers ──────────────────────────────────
async function getActiveSubscribers() {
  const query = encodeURIComponent(
    `*[_type == "subscriber" && active == true]{ firstName, lastName, email }`
  )
  const res = await fetch(
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${SANITY_DATASET}?query=${query}`,
    { headers: { 'Authorization': `Bearer ${SANITY_TOKEN}` } }
  )
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Sanity fetch error: ${err}`)
  }
  const data = await res.json()
  return data.result || []
}

// ── Build email HTML ──────────────────────────────────────────────
function buildEmailHtml(firstName, magazines, editionLabel) {
  const magazineRows = magazines
    .filter(m => m.title && m.url)
    .map(m => {
      const coverHtml = m.coverUrl
        ? `<img src="${m.coverUrl}" alt="${m.title}" width="180"
                style="width:180px;max-width:100%;height:auto;display:block;
                       border-radius:10px;box-shadow:0 4px 16px rgba(0,0,0,0.25);
                       margin:0 auto;" />`
        : `<div style="width:180px;height:240px;
                       background:linear-gradient(135deg,#2ca3ee,#00b8f1);
                       border-radius:10px;display:flex;align-items:center;
                       justify-content:center;margin:0 auto;">
             <span style="color:#fff;font-weight:800;font-size:13px;
                          text-align:center;padding:16px;">${m.title}</span>
           </div>`

      return `
      <tr>
        <td style="padding:20px 0;border-bottom:1px solid #f1f5f9;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="200" align="center"
                  style="vertical-align:middle;padding-right:24px;">
                ${coverHtml}
              </td>
              <td style="vertical-align:middle;">
                <h3 style="margin:0 0 6px;color:#0a1a2e;
                           font-size:1.05rem;font-weight:800;">
                  ${m.title}
                </h3>
                <p style="margin:0 0 14px;color:#64748b;
                          font-size:0.83rem;line-height:1.5;">
                  ${editionLabel} — Download your free copy now
                </p>
                <a href="${m.url}"
                   style="display:inline-block;background:#e6fe00;
                          color:#000000;text-decoration:none;
                          padding:10px 22px;border-radius:50px;
                          font-weight:800;font-size:0.85rem;">
                  ⬇ Download Free Copy
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
    }).join('')

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>New Editions — The South Australian Footballer</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0"
         style="background:#f1f5f9;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="620" cellpadding="0" cellspacing="0"
          style="max-width:620px;width:100%;background:#ffffff;
                 border-radius:16px;overflow:hidden;
                 box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#000000,#0a1a2e);
                       padding:36px 32px;text-align:center;">
              <h1 style="margin:0 0 4px;color:#2ca3ee;font-size:1.5rem;
                         font-weight:900;letter-spacing:2px;">
                🏈 THE SOUTH AUSTRALIAN FOOTBALLER
              </h1>
              <p style="margin:0 0 12px;color:rgba(255,255,255,0.5);
                        font-size:0.8rem;letter-spacing:0.1em;text-transform:uppercase;">
                www.safootballer.com.au
              </p>
              <div style="display:inline-block;background:#e6fe00;color:#000;
                          font-size:11px;font-weight:800;letter-spacing:2px;
                          text-transform:uppercase;border-radius:20px;
                          padding:5px 18px;">
                Welcome to Your Weekly Editions
              </div>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:28px 32px 8px;">
              <h2 style="margin:0 0 8px;color:#0a1a2e;font-size:1.15rem;
                         font-weight:800;">
                G'day ${firstName}! 👋
              </h2>
              <p style="margin:0;color:#475569;font-size:0.92rem;line-height:1.7;">
                Your latest editions of the SA Footballer magazines are ready —
                download them free below!
              </p>
            </td>
          </tr>

          <!-- Magazines -->
          <tr>
            <td style="padding:8px 32px 16px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                ${magazineRows}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:16px 32px 28px;text-align:center;">
              <a href="https://www.safootballer.com.au/magazines"
                 style="display:inline-block;
                        background:linear-gradient(135deg,#2ca3ee,#00b8f1);
                        color:#ffffff;text-decoration:none;
                        padding:12px 30px;border-radius:50px;
                        font-weight:700;font-size:0.9rem;">
                Browse All Magazines →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0a1a2e;padding:22px 32px;text-align:center;">
              <p style="margin:0 0 6px;color:#2ca3ee;font-weight:700;font-size:13px;">
                The South Australian Footballer
              </p>
              <p style="margin:0 0 4px;color:rgba(255,255,255,0.4);font-size:11px;">
                📞 0404 846 412 &nbsp;·&nbsp; 📧 noreply@safootballer.com.au
              </p>
              <p style="margin:0;color:rgba(255,255,255,0.2);font-size:10px;">
                © 2026 The South Australian Footballer. All rights reserved.<br/>
                You received this because you subscribed at www.safootballer.com.au
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

// ── Send to one subscriber ────────────────────────────────────────
async function sendToSubscriber(firstName, email, magazines, editionLabel) {
  const html = buildEmailHtml(firstName, magazines, editionLabel)

  const res = await fetch('https://api.resend.com/emails', {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from:    `${FROM_NAME} <${FROM_EMAIL}>`,
      to:      [email],
      subject: `📰 ${editionLabel} — Your SA Footballer Magazines Are Here!`,
      html,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error(`Failed to send to ${email}: ${err}`)
    return { success: false, email }
  }
  return { success: true, email }
}

// ── POST handler ──────────────────────────────────────────────────
export async function POST(request) {
  try {
    const { secret, editionLabel, pdfUrls } = await request.json()

    // Auth
    if (!SEND_SECRET || secret !== SEND_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!editionLabel) {
      return NextResponse.json(
        { error: 'editionLabel is required.' },
        { status: 400 }
      )
    }

    // 1. Fetch covers from Sanity
    const covers = await getMagazineCovers()

    // 2. Build magazine list — merge Sanity covers with provided PDF URLs
    const magazines = [
      {
        title:    'The South Australian Footballer',
        coverUrl: sanityImageUrl(covers?.saFootballer?.coverImage?.asset?._ref),
        url:      pdfUrls?.saFootballer || covers?.saFootballer?.pdfUrl || '',
      },
      {
        title:    'The SA Ammo Footy Budget',
        coverUrl: sanityImageUrl(covers?.ammoFooty?.coverImage?.asset?._ref),
        url:      pdfUrls?.ammoFooty || covers?.ammoFooty?.pdfUrl || '',
      },
      {
        title:    "The SA Women's Footy Budget",
        coverUrl: sanityImageUrl(covers?.womensFooty?.coverImage?.asset?._ref),
        url:      pdfUrls?.womensFooty || covers?.womensFooty?.pdfUrl || '',
      },
      {
        title:    'The SA Country Footy Budget',
        coverUrl: sanityImageUrl(covers?.countryFooty?.coverImage?.asset?._ref),
        url:      pdfUrls?.countryFooty || covers?.countryFooty?.pdfUrl || '',
      },
    ].filter(m => m.url) // only include magazines that have a URL

    if (magazines.length === 0) {
      return NextResponse.json(
        { error: 'No magazines found. Make sure magazines are uploaded in Sanity.' },
        { status: 400 }
      )
    }

    // 3. Get subscribers
    const subscribers = await getActiveSubscribers()
    if (subscribers.length === 0) {
      return NextResponse.json({ message: 'No active subscribers found.', sent: 0 })
    }

    // 4. Send to each subscriber
    const results = []
    for (const sub of subscribers) {
      const result = await sendToSubscriber(
        sub.firstName,
        sub.email,
        magazines,
        editionLabel
      )
      results.push(result)
      await new Promise(r => setTimeout(r, 200))
    }

    const sent   = results.filter(r => r.success).length
    const failed = results.filter(r => !r.success).length

    return NextResponse.json({
      success: true,
      message: `Sent to ${sent} subscriber${sent !== 1 ? 's' : ''}${failed > 0 ? `. ${failed} failed.` : '.'}`,
      sent,
      failed,
      total: subscribers.length,
    })

  } catch (error) {
    console.error('Send magazine error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
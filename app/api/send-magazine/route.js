// app/api/send-magazine/route.js
// Protected endpoint — requires SEND_SECRET env var to prevent unauthorized use
// Call with: POST /api/send-magazine
// Body: { secret, magazineTitle, magazineUrl, magazineType }

import { NextResponse } from 'next/server'

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const SANITY_DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const SANITY_TOKEN      = process.env.SANITY_API_TOKEN
const RESEND_API_KEY    = process.env.RESEND_API_KEY
const SEND_SECRET       = process.env.SEND_MAGAZINE_SECRET
const FROM_EMAIL        = 'noreply@safootballer.com.au'
const FROM_NAME         = 'The South Australian Footballer'

// ── Fetch all active subscribers from Sanity ──────────────────────
async function getActiveSubscribers() {
  const query = encodeURIComponent(
    `*[_type == "subscriber" && active == true]{ firstName, lastName, email }`
  )

  const res = await fetch(
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${SANITY_DATASET}?query=${query}`,
    {
      headers: {
        'Authorization': `Bearer ${SANITY_TOKEN}`,
      },
    }
  )

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Sanity fetch error: ${err}`)
  }

  const data = await res.json()
  return data.result || []
}

// ── Send magazine email to one subscriber ─────────────────────────
async function sendMagazineEmail(firstName, email, magazineTitle, magazineUrl, magazineType) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${magazineTitle} - The South Australian Footballer</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
          style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;
                 overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#2ca3ee,#00b8f1);
                       padding:40px 32px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:900;letter-spacing:1px;">
                🏈 THE SOUTH AUSTRALIAN FOOTBALLER
              </h1>
              <div style="display:inline-block;background:#e6fe00;color:#000000;
                          font-size:11px;font-weight:700;letter-spacing:2px;
                          text-transform:uppercase;border-radius:20px;
                          padding:4px 16px;margin-top:12px;">
                New Edition Out Now!
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 32px;">
              <h2 style="margin:0 0 8px 0;color:#0a1a2e;font-size:22px;">
                G'day ${firstName}! 👋
              </h2>
              <p style="color:#475569;font-size:16px;line-height:1.7;margin:0 0 24px 0;">
                The latest edition of <strong>${magazineTitle}</strong> is here —
                and it's ready to download right now.
              </p>

              <!-- Magazine badge -->
              <div style="background:#f0f9ff;border:2px solid #2ca3ee;border-radius:12px;
                          padding:20px 24px;margin-bottom:32px;text-align:center;">
                <p style="margin:0 0 4px 0;color:#64748b;font-size:13px;
                           text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">
                  New Edition
                </p>
                <h3 style="margin:0 0 16px 0;color:#0a1a2e;font-size:20px;font-weight:800;">
                  📰 ${magazineTitle}
                </h3>
                <a href="${magazineUrl}"
                   style="display:inline-block;background:#e6fe00;color:#000000;
                          text-decoration:none;padding:14px 36px;border-radius:50px;
                          font-weight:800;font-size:15px;letter-spacing:0.5px;">
                  Download Now →
                </a>
              </div>

              <p style="color:#475569;font-size:15px;line-height:1.7;margin:0 0 16px 0;">
                You can also browse all our past editions in the magazine archive:
              </p>

              <div style="text-align:center;margin-bottom:32px;">
                <a href="https://www.safootballer.com.au/magazines"
                   style="display:inline-block;background:linear-gradient(135deg,#2ca3ee,#00b8f1);
                          color:#ffffff;text-decoration:none;padding:12px 32px;
                          border-radius:50px;font-weight:700;font-size:14px;">
                  View All Magazines →
                </a>
              </div>

              <p style="color:#94a3b8;font-size:12px;text-align:center;margin:0;">
                You're receiving this because you subscribed at safootballer.com.au
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0a1a2e;padding:24px 32px;text-align:center;">
              <p style="margin:0 0 8px 0;color:#2ca3ee;font-weight:700;font-size:14px;">
                The South Australian Footballer
              </p>
              <p style="margin:0 0 8px 0;color:rgba(255,255,255,0.5);font-size:12px;">
                📞 0404 846 412 &nbsp;·&nbsp; 📧 noreply@safootballer.com.au
              </p>
              <p style="margin:0;color:rgba(255,255,255,0.3);font-size:11px;">
                © 2026 The South Australian Footballer. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `

  const res = await fetch('https://api.resend.com/emails', {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from:    `${FROM_NAME} <${FROM_EMAIL}>`,
      to:      [email],
      subject: `📰 New Edition: ${magazineTitle} — Download Now!`,
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
    const { secret, magazineTitle, magazineUrl } = await request.json()

    // Auth check
    if (!SEND_SECRET || secret !== SEND_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!magazineTitle || !magazineUrl) {
      return NextResponse.json(
        { error: 'magazineTitle and magazineUrl are required.' },
        { status: 400 }
      )
    }

    // 1. Get all active subscribers
    const subscribers = await getActiveSubscribers()

    if (subscribers.length === 0) {
      return NextResponse.json({ message: 'No active subscribers found.', sent: 0 })
    }

    // 2. Send to each subscriber with a small delay to avoid rate limits
    const results = []
    for (const sub of subscribers) {
      const result = await sendMagazineEmail(
        sub.firstName,
        sub.email,
        magazineTitle,
        magazineUrl,
      )
      results.push(result)
      // 200ms delay between sends to respect Resend rate limits
      await new Promise(r => setTimeout(r, 200))
    }

    const sent   = results.filter(r => r.success).length
    const failed = results.filter(r => !r.success).length

    return NextResponse.json({
      success: true,
      message: `Magazine sent to ${sent} subscriber${sent !== 1 ? 's' : ''}${failed > 0 ? `. ${failed} failed.` : '.'}`,
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
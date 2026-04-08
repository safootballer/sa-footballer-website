// app/api/send-magazine/route.js

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
    { headers: { 'Authorization': `Bearer ${SANITY_TOKEN}` } }
  )
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Sanity fetch error: ${err}`)
  }
  const data = await res.json()
  return data.result || []
}

// ── Build the email HTML ───────────────────────────────────────────
function buildEmailHtml(firstName, magazines, editionLabel) {
  // magazines = array of { title, url, coverBase64, coverMime }

  const magazineRows = magazines
    .filter(m => m.title && m.url)
    .map(m => {
      const coverHtml = m.coverBase64
        ? `<img src="data:${m.coverMime || 'image/jpeg'};base64,${m.coverBase64}"
                alt="${m.title}" width="200"
                style="width:200px;max-width:100%;height:auto;display:block;
                       border-radius:8px;margin:0 auto 12px;
                       box-shadow:0 4px 12px rgba(0,0,0,0.2);" />`
        : `<div style="width:200px;height:260px;background:linear-gradient(135deg,#2ca3ee,#00b8f1);
                       border-radius:8px;margin:0 auto 12px;display:flex;
                       align-items:center;justify-content:center;">
             <span style="color:#fff;font-weight:800;font-size:14px;
                          text-align:center;padding:16px;">${m.title}</span>
           </div>`

      return `
      <tr>
        <td style="padding:16px 0;border-bottom:1px solid #f1f5f9;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="220" style="vertical-align:top;padding-right:20px;text-align:center;">
                ${coverHtml}
              </td>
              <td style="vertical-align:middle;">
                <h3 style="margin:0 0 8px;color:#0a1a2e;font-size:1.1rem;font-weight:800;">
                  ${m.title}
                </h3>
                <p style="margin:0 0 16px;color:#64748b;font-size:0.85rem;line-height:1.5;">
                  ${editionLabel} — Download your free copy now
                </p>
                <a href="${m.url}"
                   style="display:inline-block;background:#e6fe00;color:#000000;
                          text-decoration:none;padding:10px 24px;border-radius:50px;
                          font-weight:800;font-size:0.9rem;letter-spacing:0.03em;">
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
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 0;">
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
              <h1 style="margin:0 0 4px;color:#2ca3ee;font-size:1.6rem;
                          font-weight:900;letter-spacing:2px;">
                🏈 THE SOUTH AUSTRALIAN FOOTBALLER
              </h1>
              <p style="margin:0;color:rgba(255,255,255,0.6);font-size:0.85rem;
                        letter-spacing:0.1em;text-transform:uppercase;">
                www.safootballer.com.au
              </p>
              <div style="display:inline-block;background:#e6fe00;color:#000;
                          font-size:11px;font-weight:800;letter-spacing:2px;
                          text-transform:uppercase;border-radius:20px;
                          padding:5px 18px;margin-top:14px;">
                Welcome to Your Weekly Editions
              </div>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:28px 32px 8px;">
              <h2 style="margin:0 0 8px;color:#0a1a2e;font-size:1.2rem;">
                G'day ${firstName}! 👋
              </h2>
              <p style="margin:0;color:#475569;font-size:0.95rem;line-height:1.7;">
                Your latest editions of the SA Footballer magazines are ready —
                download them free below!
              </p>
            </td>
          </tr>

          <!-- Magazine list -->
          <tr>
            <td style="padding:16px 32px 8px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                ${magazineRows}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:24px 32px;text-align:center;">
              <a href="https://www.safootballer.com.au/magazines"
                 style="display:inline-block;
                        background:linear-gradient(135deg,#2ca3ee,#00b8f1);
                        color:#ffffff;text-decoration:none;padding:13px 32px;
                        border-radius:50px;font-weight:700;font-size:0.95rem;">
                Browse All Magazines →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0a1a2e;padding:24px 32px;text-align:center;">
              <p style="margin:0 0 6px;color:#2ca3ee;font-weight:700;font-size:13px;">
                The South Australian Footballer
              </p>
              <p style="margin:0 0 6px;color:rgba(255,255,255,0.45);font-size:11px;">
                📞 0404 846 412 &nbsp;·&nbsp; 📧 noreply@safootballer.com.au
              </p>
              <p style="margin:0;color:rgba(255,255,255,0.25);font-size:10px;">
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
    const body = await request.json()
    const { secret, editionLabel, magazines } = body

    // Auth
    if (!SEND_SECRET || secret !== SEND_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Validate
    if (!editionLabel) {
      return NextResponse.json({ error: 'editionLabel is required.' }, { status: 400 })
    }
    if (!magazines || !Array.isArray(magazines) || magazines.length === 0) {
      return NextResponse.json({ error: 'At least one magazine is required.' }, { status: 400 })
    }
    const validMags = magazines.filter(m => m.title && m.url)
    if (validMags.length === 0) {
      return NextResponse.json(
        { error: 'Each magazine needs a title and URL.' },
        { status: 400 }
      )
    }

    // Get subscribers
    const subscribers = await getActiveSubscribers()
    if (subscribers.length === 0) {
      return NextResponse.json({ message: 'No active subscribers found.', sent: 0 })
    }

    // Send to each
    const results = []
    for (const sub of subscribers) {
      const result = await sendToSubscriber(
        sub.firstName,
        sub.email,
        validMags,
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
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
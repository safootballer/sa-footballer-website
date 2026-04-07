// app/api/subscribe/route.js

import { NextResponse } from 'next/server'

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const SANITY_DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const SANITY_TOKEN      = process.env.SANITY_API_TOKEN
const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID
const RESEND_API_KEY     = process.env.RESEND_API_KEY
const FROM_EMAIL         = 'noreply@safootballer.com.au'
const FROM_NAME          = 'The South Australian Footballer'

// ── Add contact to Resend Audience ───────────────────────────────
async function addToResendAudience(firstName, lastName, email) {
  if (!RESEND_AUDIENCE_ID) return // skip if not configured

  const res = await fetch(
    `https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`,
    {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        first_name:   firstName,
        last_name:    lastName,
        unsubscribed: false,
      }),
    }
  )

  if (!res.ok) {
    // Non-fatal — log but don't throw so subscribe still works
    const err = await res.text()
    console.warn(`Resend Audience sync warning: ${err}`)
  }
}

// ── Save subscriber to Sanity ─────────────────────────────────────
async function saveToSanity(firstName, lastName, email) {
  const doc = {
    _type:        'subscriber',
    firstName,
    lastName,
    email,
    subscribedAt: new Date().toISOString(),
    source:       'magazines-page',
    active:       true,
  }

  const res = await fetch(
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${SANITY_DATASET}`,
    {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${SANITY_TOKEN}`,
      },
      body: JSON.stringify({ mutations: [{ create: doc }] }),
    }
  )

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Sanity error: ${err}`)
  }

  return res.json()
}

// ── Send welcome email via Resend ─────────────────────────────────
async function sendWelcomeEmail(firstName, email) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to The South Australian Footballer</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#2ca3ee,#00b8f1);padding:40px 32px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:900;letter-spacing:1px;">
                🏈 THE SOUTH AUSTRALIAN FOOTBALLER
              </h1>
              <div style="display:inline-block;background:#e6fe00;color:#000000;font-size:11px;font-weight:700;
                          letter-spacing:2px;text-transform:uppercase;border-radius:20px;
                          padding:4px 16px;margin-top:12px;">
                Welcome Aboard!
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 32px;">
              <h2 style="margin:0 0 16px 0;color:#0a1a2e;font-size:22px;">
                G'day ${firstName}! 👋
              </h2>
              <p style="color:#475569;font-size:16px;line-height:1.7;margin:0 0 20px 0;">
                Thanks for subscribing to <strong>The South Australian Footballer</strong> — 
                South Australia's premier footy publication since 1993.
              </p>
              <p style="color:#475569;font-size:16px;line-height:1.7;margin:0 0 28px 0;">
                You'll be the first to receive our latest editions straight to your inbox, including:
              </p>

              <!-- Benefits list -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                ${[
                  ['📰', 'SA Footballer Magazine',      'The complete weekly wrap of South Australian football'],
                  ['💰', 'Ammo Footy Budget',           'In-depth tips and analysis for footy fans'],
                  ['👩', "Women's Footy Budget",        "Dedicated coverage of women's football"],
                  ['🌾', 'Country Footy Budget',        'The best of country SA football'],
                ].map(([icon, title, desc]) => `
                <tr>
                  <td style="padding:10px 0;vertical-align:top;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="48" style="vertical-align:middle;">
                          <div style="background:#f0f9ff;border-radius:10px;width:40px;height:40px;
                                      text-align:center;line-height:40px;font-size:20px;">
                            ${icon}
                          </div>
                        </td>
                        <td style="padding-left:12px;vertical-align:middle;">
                          <strong style="color:#0a1a2e;font-size:14px;">${title}</strong><br/>
                          <span style="color:#64748b;font-size:13px;">${desc}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>`).join('')}
              </table>

              <!-- CTA button -->
              <div style="text-align:center;margin-bottom:32px;">
                <a href="https://www.safootballer.com.au/magazines"
                   style="display:inline-block;background:linear-gradient(135deg,#2ca3ee,#00b8f1);
                          color:#ffffff;text-decoration:none;padding:14px 36px;border-radius:50px;
                          font-weight:700;font-size:15px;letter-spacing:0.5px;">
                  Browse Our Magazines →
                </a>
              </div>

              <p style="color:#94a3b8;font-size:13px;text-align:center;margin:0;">
                Can't wait? Download the latest edition right now from our website.
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
                © 2026 The South Australian Footballer. All rights reserved.<br/>
                You're receiving this because you subscribed at www.safootballer.com.au
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
      subject: `Welcome to The South Australian Footballer, ${firstName}! 🏈`,
      html,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Resend error: ${err}`)
  }

  return res.json()
}

// ── POST handler ──────────────────────────────────────────────────
export async function POST(request) {
  try {
    const { firstName, lastName, email } = await request.json()

    // Basic validation
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'First name, last name and email are required.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    // 1. Save to Sanity
    await saveToSanity(firstName, lastName, email)

    // 2. Sync to Resend Audience (for Broadcasts)
    await addToResendAudience(firstName, lastName, email)

    // 3. Send welcome email
    await sendWelcomeEmail(firstName, email)

    return NextResponse.json(
      { success: true, message: `Welcome ${firstName}! Check your inbox.` },
      { status: 200 }
    )

  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
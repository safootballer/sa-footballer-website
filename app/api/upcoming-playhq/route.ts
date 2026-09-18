// sa-footballer-website/app/api/upcoming-playhq/route.js
// Reads synced PlayHQ fixtures from the database.
import { NextResponse } from 'next/server'
import { Pool } from 'pg'

export const dynamic = 'force-dynamic'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

// Map website category → the competition name(s) PlayHQ stores in the fixtures table.
// PlayHQ uses full official names, so we match with ILIKE patterns.
const CATEGORY_PATTERNS = {
  afl:      ['AFL'],
  aflw:     ['AFLW'],
  sanfl:    ['SANFL', 'South Australia National Football League'],
  sanflw:   ['SANFLW'],
  amateurs: ['Adelaide Footy League', 'Adelaide Football League'],
  sawfl:    ["Women", 'SAWFL'],
  country:  [], // country handled separately by league
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const gradeId  = searchParams.get('gradeId')

  try {
    let query = `SELECT match_id, match_date, home_team, away_team, venue, competition, grade_id, grade_name, round
                 FROM fixtures WHERE match_date >= NOW()`
    const params = []

    if (gradeId) {
      params.push(gradeId)
      query += ` AND grade_id = $${params.length}`
    } else if (category && category !== 'all') {
      const patterns = CATEGORY_PATTERNS[category] ?? []
      if (patterns.length) {
        const ors = patterns.map(p => {
          params.push(`%${p}%`)
          return `competition ILIKE $${params.length}`
        })
        query += ` AND (${ors.join(' OR ')})`
      }
    }

    query += ` ORDER BY match_date ASC LIMIT 100`

    const { rows } = await pool.query(query, params)
    return NextResponse.json(rows)
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
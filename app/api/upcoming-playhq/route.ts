// sa-footballer-website/app/api/upcoming-playhq/route.js
// Reads synced PlayHQ fixtures from the database for the website.
import { NextResponse } from 'next/server'
import { Pool } from 'pg'

export const dynamic = 'force-dynamic'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const gradeId = searchParams.get('gradeId')
  const competition = searchParams.get('competition')

  try {
    let query = `SELECT match_id, match_date, home_team, away_team, venue, competition, grade_id, grade_name, round
                 FROM fixtures WHERE match_date >= NOW()`
    const params = []

    if (gradeId) {
      params.push(gradeId)
      query += ` AND grade_id = $${params.length}`
    } else if (competition) {
      params.push(competition)
      query += ` AND competition = $${params.length}`
    }

    query += ` ORDER BY match_date ASC LIMIT 100`

    const { rows } = await pool.query(query, params)
    return NextResponse.json(rows)
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
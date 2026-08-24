export default {
  name: 'countryStats',
  title: 'Country Football Stats (Combined)',
  type: 'document',
  fields: [
    {
      name: 'league',
      title: 'Country League',
      type: 'string',
      description: 'Exact league name as it appears on the website, e.g. Yorke Peninsula, Adelaide Plains, Barossa Light & Gawler',
      validation: Rule => Rule.required()
    },
    {
      name: 'season',
      title: 'Season',
      type: 'string',
      initialValue: '2026',
      validation: Rule => Rule.required()
    },
    {
      name: 'round',
      title: 'Round',
      type: 'string',
      description: 'e.g. Round 17',
      validation: Rule => Rule.required()
    },

    // ─── A-GRADE ───────────────────────────────────────────
    {
      name: 'aGradeLadder',
      title: 'A-Grade — Ladder',
      type: 'text',
      rows: 12,
      description: 'Paste the whole A-Grade ladder (team names with rank + stats rows). Headers & rank numbers ignored.',
      fieldset: 'agrade',
    },
    {
      name: 'aGradeGoalKickers',
      title: 'A-Grade — Goal Kickers',
      type: 'text',
      rows: 12,
      description: 'Paste A-Grade goal kickers from PlayHQ.',
      fieldset: 'agrade',
    },

    // ─── RESERVES ──────────────────────────────────────────
    {
      name: 'reservesLadder',
      title: 'Reserves — Ladder',
      type: 'text',
      rows: 12,
      fieldset: 'reserves',
    },
    {
      name: 'reservesGoalKickers',
      title: 'Reserves — Goal Kickers',
      type: 'text',
      rows: 12,
      fieldset: 'reserves',
    },

    // ─── SENIOR COLTS ──────────────────────────────────────
    {
      name: 'seniorColtsLadder',
      title: 'Senior Colts — Ladder',
      type: 'text',
      rows: 12,
      fieldset: 'seniorColts',
    },
    {
      name: 'seniorColtsGoalKickers',
      title: 'Senior Colts — Goal Kickers',
      type: 'text',
      rows: 12,
      fieldset: 'seniorColts',
    },

    // ─── JUNIOR COLTS ──────────────────────────────────────
    {
      name: 'juniorColtsLadder',
      title: 'Junior Colts — Ladder',
      type: 'text',
      rows: 12,
      fieldset: 'juniorColts',
    },
    {
      name: 'juniorColtsGoalKickers',
      title: 'Junior Colts — Goal Kickers',
      type: 'text',
      rows: 12,
      fieldset: 'juniorColts',
    },
  ],
  fieldsets: [
    { name: 'agrade',      title: '🏆 A-Grade',      options: { collapsible: true, collapsed: false } },
    { name: 'reserves',    title: '🥈 Reserves',     options: { collapsible: true, collapsed: true } },
    { name: 'seniorColts', title: '🎓 Senior Colts', options: { collapsible: true, collapsed: true } },
    { name: 'juniorColts', title: '🧒 Junior Colts', options: { collapsible: true, collapsed: true } },
  ],
  preview: {
    select: { league: 'league', round: 'round', season: 'season' },
    prepare({ league, round, season }) {
      return {
        title: `${league || 'Country League'}`,
        subtitle: `${round || ''} · ${season || ''}`,
      }
    }
  }
}
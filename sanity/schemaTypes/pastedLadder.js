export default {
  name: 'pastedLadder',
  title: 'Pasted Ladder',
  type: 'document',
  fields: [
    {
      name: 'competition',
      title: 'Competition',
      type: 'string',
      options: {
        list: [
          {title: 'AFL',              value: 'AFL'},
          {title: 'AFLW',             value: 'AFLW'},
          {title: 'SANFL',            value: 'SANFL'},
          {title: 'SANFLW',           value: 'SANFLW'},
          {title: "Amateurs (Men's)", value: "Amateurs (Men's)"},
          {title: "SAWFL Women's",    value: "SAWFL Women's"},
          {title: 'Country Football', value: 'Country Football'},
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'grade',
      title: 'Grade',
      type: 'string',
      description: 'e.g. League, Reserves, Under 18, Division 1, Division 1 Reserves, Hills Division 1 A-Grade',
      validation: Rule => Rule.required()
    },
    {
      name: 'season',
      title: 'Season',
      type: 'string',
      description: 'e.g. 2026',
      initialValue: '2026',
      validation: Rule => Rule.required()
    },
    {
      name: 'round',
      title: 'Round',
      type: 'string',
      description: 'e.g. Round 11',
      validation: Rule => Rule.required()
    },
    {
      name: 'teams',
      title: 'Team Names',
      type: 'text',
      rows: 12,
      description: 'Paste team names only — one per line, in ladder order (1st to last)',
      validation: Rule => Rule.required()
    },
    {
      name: 'stats',
      title: 'Stats',
      type: 'text',
      rows: 12,
      description: 'Paste stats rows — one per line, tab-separated: P PTS % W L D BYE F A FORF',
      validation: Rule => Rule.required()
    },
  ],
  preview: {
    select: { competition: 'competition', grade: 'grade', round: 'round' },
    prepare({ competition, grade, round }) {
      return {
        title: `${competition} — ${grade}`,
        subtitle: round,
      }
    }
  }
}
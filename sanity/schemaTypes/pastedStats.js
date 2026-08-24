export default {
  name: 'pastedStats',
  title: 'Pasted Stats (Ladder + Goal Kickers)',
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
      title: 'Grade (Level 2)',
      type: 'string',
      description: 'e.g. League, Reserves, Youth, C-Grade',
      validation: Rule => Rule.required()
    },
    {
      name: 'subGrade',
      title: 'Sub Grade (Level 3 — optional)',
      type: 'string',
      description: 'e.g. Under 18, Under 16, Division 1, Division 7. Leave blank if none.',
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
    {
      name: 'ladder',
      title: '① Ladder (paste whole table)',
      type: 'text',
      rows: 20,
      description: 'Paste the entire ladder in one go — team names (with rank numbers) at the top, then the stats rows below. Header rows and rank numbers are ignored automatically.',
    },
    {
      name: 'goalKickers',
      title: '② Goal Kickers',
      type: 'text',
      rows: 16,
      description: 'Paste directly from PlayHQ. Rank on its own line, then Player [tab] Team [tab] GP [tab] Goals [tab] BP.',
    },
  ],
  preview: {
    select: { competition: 'competition', grade: 'grade', subGrade: 'subGrade', round: 'round' },
    prepare({ competition, grade, subGrade, round }) {
      return {
        title: `${competition} — ${grade}${subGrade ? ' / ' + subGrade : ''}`,
        subtitle: `Ladder + Goal Kickers · ${round}`,
      }
    }
  }
}
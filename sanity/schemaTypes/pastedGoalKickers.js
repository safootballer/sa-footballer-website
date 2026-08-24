export default {
  name: 'pastedGoalKickers',
  title: 'Pasted Goal Kickers',
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
      description: 'e.g. Under 18, Under 16, Division 1, Division 7. Leave blank if no sub grade.',
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
      name: 'data',
      title: 'Goal Kickers Data',
      type: 'text',
      rows: 20,
      description: 'Paste directly from PlayHQ. Each player on its own set of lines: Rank, Player, Team, GP, Goals, BP. The parser extracts Player, Team, Games, Goals. Tab-separated rows also work.',
      validation: Rule => Rule.required()
    },
  ],
  preview: {
    select: { competition: 'competition', grade: 'grade', subGrade: 'subGrade', round: 'round' },
    prepare({ competition, grade, subGrade, round }) {
      return {
        title: `${competition} — ${grade}${subGrade ? ' / ' + subGrade : ''}`,
        subtitle: `Goal Kickers · ${round}`,
      }
    }
  }
}
export default {
  name: 'aflGoalKickers',
  title: 'AFL Goal Kickers',
  type: 'document',
  fields: [
    {
      name: 'season',
      title: 'Season',
      type: 'string',
      description: 'e.g. 2026',
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
      name: 'goalKickersText',
      title: 'Goal Kickers Data',
      type: 'text',
      rows: 20,
      description: 'Paste one player per line: Rank  Player Name  Club  Goals  Games (tab-separated)',
    },
  ],
  preview: {
    select: { season: 'season', round: 'round' },
    prepare: ({ season, round }) => ({
      title: `AFL Goal Kickers — ${season ?? ''} ${round ?? ''}`,
    })
  }
}
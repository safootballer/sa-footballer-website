export default {
  name: 'aflLadder',
  title: 'AFL Ladder',
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
      name: 'ladderText',
      title: 'Ladder Data',
      type: 'text',
      rows: 20,
      description: 'Paste the ladder data copied from AFL website. Format per team: position line, club name line, then stats line (tab-separated: Played Points % Won Lost Drawn PF PA)',
    },
  ],
  preview: {
    select: { season: 'season', round: 'round' },
    prepare: ({ season, round }) => ({
      title: `AFL Ladder — ${season ?? ''} ${round ?? ''}`,
    })
  }
}
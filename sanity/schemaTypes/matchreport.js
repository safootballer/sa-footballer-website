export default {
  name: 'matchReport',
  title: 'Match Reports',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'competition',
      title: 'Competition',
      type: 'string',
      options: {
        list: [
          {title: 'SANFL', value: 'sanfl'},
          {title: 'AFL', value: 'afl'},
          {title: 'Amateur', value: 'amateur'},
          {title: "Women's", value: 'womens'},
          {title: 'Country', value: 'country'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'round',
      title: 'Round',
      type: 'string'
    },
    {
      name: 'homeTeam',
      title: 'Home Team',
      type: 'string'
    },
    {
      name: 'awayTeam',
      title: 'Away Team',
      type: 'string'
    },
    {
      name: 'homeScore',
      title: 'Home Score',
      type: 'string'
    },
    {
      name: 'awayScore',
      title: 'Away Score',
      type: 'string'
    },
    {
      name: 'matchDate',
      title: 'Match Date',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3
    },
    {
      name: 'content',
      title: 'Match Report',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'featuredImage',
      subtitle: 'competition'
    }
  }
}
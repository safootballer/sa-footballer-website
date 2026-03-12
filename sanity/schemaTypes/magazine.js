export default {
  name: 'magazine',
  title: 'Magazines',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
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
          {title: 'Women\'s', value: 'womens'},
          {title: 'Country', value: 'country'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'weekEnding',
      title: 'Week Ending',
      type: 'date',
      validation: Rule => Rule.required()
    },
    {
      name: 'round',
      title: 'Round',
      type: 'string',
      description: 'e.g., Round 5, Finals Week 1, etc.'
    },
    {
      name: 'pdfUrl',
      title: 'PDF URL',
      type: 'url',
      description: 'Link to PDF file (from your automation or cloud storage)',
      validation: Rule => Rule.required()
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      subtitle: 'competition',
      round: 'round'
    },
    prepare({title, media, subtitle, round}) {
      return {
        title: title,
        subtitle: `${subtitle} - ${round}`,
        media: media
      }
    }
  }
}
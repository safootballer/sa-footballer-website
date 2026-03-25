export default {
  name: 'magazine',
  title: 'Magazine',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
  name: 'magazineType',
  title: 'Magazine Type',
  type: 'string',
  options: {
    list: [
      {title: 'SA Footballer', value: 'SA Footballer'},
      {title: 'Ammo Division 1', value: 'Ammo Division 1'},
      {title: 'Ammo Division 2', value: 'Ammo Division 2'},
      {title: 'Ammo Division 3', value: 'Ammo Division 3'},
      {title: 'Ammo Division 4', value: 'Ammo Division 4'},
      {title: 'Ammo Division 5', value: 'Ammo Division 5'},
      {title: 'Ammo Division 6', value: 'Ammo Division 6'},
      {title: 'Ammo Division 7', value: 'Ammo Division 7'},
      {title: 'Women\'s Footy Budget', value: 'Women\'s Footy Budget'},
      {title: 'Country Footy Budget', value: 'Country Footy Budget'},
    ]
  },
  validation: Rule => Rule.required()
},
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'pdfUrl',
      title: 'PDF URL',
      type: 'url',
      description: 'Link to the PDF file',
      validation: Rule => Rule.required()
    },
    {
      name: 'issueNumber',
      title: 'Issue Number',
      type: 'string',
      description: 'E.g., "Issue 245" or "Round 10"'
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short description of this issue'
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on homepage?',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'title',
      magazineType: 'magazineType',
      media: 'coverImage',
      published: 'publishedAt'
    },
    prepare({title, magazineType, media, published}) {
      return {
        title,
        subtitle: `${magazineType} - ${new Date(published).toLocaleDateString()}`,
        media
      }
    }
  }
}
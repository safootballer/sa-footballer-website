export default {
  name: 'article',
  title: 'News Articles',
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
          {title: 'Women\'s', value: 'womens'},
          {title: 'Country', value: 'country'}
        ]
      }
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
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
      title: 'Content',
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
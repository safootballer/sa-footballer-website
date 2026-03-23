export default {
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Video Category',
      type: 'string',
      options: {
        list: [
          {title: 'Live Stream', value: 'live-stream'},
          {title: 'Filming', value: 'filming'},
          {title: 'Panel Shows', value: 'panel-shows'},
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category'
    },
    prepare({title, category}) {
      return {
        title,
        subtitle: category
      }
    }
  }
}
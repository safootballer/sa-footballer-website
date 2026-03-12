export default {
  name: 'video',
  title: 'Videos',
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
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description: 'Full YouTube URL (e.g., https://www.youtube.com/watch?v=...)',
      validation: Rule => Rule.required()
    },
    {
      name: 'show',
      title: 'Show',
      type: 'string',
      options: {
        list: [
          {title: 'Adelaide Ammo Footy Show', value: 'ammo'},
          {title: 'Adelaide Women\'s Footy Show', value: 'womens'},
          {title: 'Other', value: 'other'}
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
      name: 'thumbnail',
      title: 'Custom Thumbnail (optional)',
      type: 'image',
      description: 'Leave empty to use YouTube thumbnail',
      options: {
        hotspot: true
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'thumbnail',
      subtitle: 'show'
    }
  }
}
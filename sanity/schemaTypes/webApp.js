export default {
  name: 'webApp',
  title: 'Web App Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'SA Footballer Is Now a Web App',
      validation: Rule => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      initialValue: 'Install it on your phone in seconds — no App Store required',
    },
    {
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'appScreenshot',
      title: 'App Screenshot (shown in What Is section)',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'iphoneVideoUrl',
      title: 'iPhone Install Video URL (YouTube or direct)',
      type: 'url',
      description: 'YouTube link or direct video URL for iPhone install instructions',
    },
    {
      name: 'androidVideoUrl',
      title: 'Android Install Video URL (YouTube or direct)',
      type: 'url',
      description: 'YouTube link or direct video URL for Android install instructions',
    },
    {
      name: 'iphoneScreenshot',
      title: 'iPhone Install Screenshot',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'androidScreenshot',
      title: 'Android Install Screenshot',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'extraImages',
      title: 'Additional Screenshots / Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => ({ title: title || 'Web App Page' })
  }
}
export default {
  name: 'homeSettings',
  title: 'Home Page Settings',
  type: 'document',
  fields: [
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      initialValue: 'Celebrating Our 30th Year in Business!'
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 3,
      initialValue: 'For three decades now, our group of businesses and companies have been premier publishers of high-quality sporting magazines, sports media products, and multimedia in Adelaide and across South Australia.'
    },
    {
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page Settings'
      }
    }
  }
}
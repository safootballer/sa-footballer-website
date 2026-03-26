export default {
  name: 'customPage',
  title: 'Custom Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      description: 'This will be the page URL (e.g., /about-us)',
      validation: Rule => Rule.required()
    },
    {
      name: 'showInMenu',
      title: 'Show in Menu?',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'menuTitle',
      title: 'Menu Title (if different from page title)',
      type: 'string',
      description: 'Optional - leave blank to use Page Title'
    },
    {
      name: 'headerImage',
      title: 'Header Banner Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'headerColor',
      title: 'Header Background Color',
      type: 'string',
      description: 'Hex color code (e.g., #2ca3ee). Used if no header image.',
      placeholder: '#2ca3ee'
    },
    {
      name: 'content',
      title: 'Page Content',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption'
            }
          ]
        }
      ]
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string'
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3
        }
      ]
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
      slug: 'slug.current',
      showInMenu: 'showInMenu'
    },
    prepare({title, slug, showInMenu}) {
      return {
        title,
        subtitle: `/${slug} ${showInMenu ? '• In Menu' : '• Hidden from Menu'}`
      }
    }
  }
}
export default {
  name: 'photo',
  title: 'Photo Gallery',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title (Optional)',
      type: 'string',
      description: 'Optional title for the photo'
    },
    {
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'caption',
      title: 'Caption (Optional)',
      type: 'text',
      rows: 2,
      description: 'Optional caption or description'
    },
    {
      name: 'displayPages',
      title: 'Display on Pages',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Homepage', value: 'homepage'},
          {title: 'News Articles Page', value: 'articles'},
          {title: 'Videos Page', value: 'videos'},
          {title: 'Magazines Page', value: 'magazines'},
          {title: 'Match Reports Page', value: 'match-reports'},
          {title: 'All Pages', value: 'all'}
        ]
      },
      description: 'Select which pages should display this photo',
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'placement',
      title: 'Photo Placement',
      type: 'string',
      options: {
        list: [
          {title: 'Background Image (Full Width)', value: 'background'},
          {title: 'Photo Gallery Grid', value: 'gallery'},
          {title: 'Article/Card Images', value: 'cards'},
          {title: 'Header Background', value: 'header'},
          {title: 'Blank Area / Custom Position', value: 'blank'}
        ]
      },
      description: 'Where should this photo appear on the page?',
      validation: Rule => Rule.required()
    },
    {
      name: 'blankAreaPosition',
      title: 'Blank Area Position',
      type: 'string',
      options: {
        list: [
          {title: 'Top of Page', value: 'top'},
          {title: 'After Hero Section', value: 'after-hero'},
          {title: 'Middle of Page', value: 'middle'},
          {title: 'Before Footer', value: 'before-footer'},
          {title: 'Bottom of Page', value: 'bottom'},
          {title: 'Sidebar (if available)', value: 'sidebar'},
          {title: 'Between Sections', value: 'between-sections'}
        ]
      },
      description: 'Only used if placement is "Blank Area / Custom Position"',
      hidden: ({document}) => document?.placement !== 'blank'
    },
    {
      name: 'displayStyle',
      title: 'Display Style',
      type: 'string',
      options: {
        list: [
          {title: 'Full Width', value: 'full-width'},
          {title: 'Centered', value: 'centered'},
          {title: 'Left Aligned', value: 'left'},
          {title: 'Right Aligned', value: 'right'},
          {title: 'Floating Left', value: 'float-left'},
          {title: 'Floating Right', value: 'float-right'}
        ]
      },
      initialValue: 'centered',
      description: 'How should the photo be displayed?'
    },
    {
      name: 'photoSize',
      title: 'Photo Size',
      type: 'string',
      options: {
        list: [
          {title: 'Small (300px)', value: 'small'},
          {title: 'Medium (600px)', value: 'medium'},
          {title: 'Large (900px)', value: 'large'},
          {title: 'Extra Large (1200px)', value: 'xlarge'},
          {title: 'Full Width', value: 'full'}
        ]
      },
      initialValue: 'medium',
      description: 'What size should the photo be?'
    },
    {
      name: 'competition',
      title: 'Competition (Optional)',
      type: 'string',
      options: {
        list: [
          {title: 'SANFL', value: 'sanfl'},
          {title: 'AFL', value: 'afl'},
          {title: 'Amateur', value: 'amateur'},
          {title: 'Women\'s', value: 'womens'},
          {title: 'Country', value: 'country'},
          {title: 'General', value: 'general'}
        ]
      }
    },
    {
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower numbers appear first (1, 2, 3...). Leave blank for random order.',
      validation: Rule => Rule.min(0)
    },
    {
      name: 'uploadedAt',
      title: 'Upload Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Turn off to hide this photo without deleting it'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      placement: 'placement',
      pages: 'displayPages',
      active: 'active'
    },
    prepare({title, media, placement, pages, active}) {
      const pageList = pages?.join(', ') || 'No pages'
      return {
        title: title || 'Untitled Photo',
        subtitle: `${placement || 'Not set'} on ${pageList} ${active ? '✓' : '(Hidden)'}`,
        media: media
      }
    }
  }
}
export default {
  name: 'photoBulkUpload',
  title: 'Bulk Photo Upload',
  type: 'document',
  fields: [
    {
      name: 'uploadName',
      title: 'Upload Batch Name',
      type: 'string',
      description: 'Name this batch of photos (e.g., "March 2026 Match Photos")',
      validation: Rule => Rule.required()
    },
    {
      name: 'photos',
      title: 'Upload Multiple Photos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ],
      description: 'Upload multiple photos at once - drag and drop or click to select multiple files',
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'defaultPages',
      title: 'Apply to Pages (Default for all photos)',
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
      description: 'These pages will be applied to all photos in this batch',
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'defaultPlacement',
      title: 'Default Placement',
      type: 'string',
      options: {
        list: [
          {title: 'Background Image', value: 'background'},
          {title: 'Photo Gallery Grid', value: 'gallery'},
          {title: 'Article/Card Images', value: 'cards'},
          {title: 'Header Background', value: 'header'},
          {title: 'Blank Area / Custom Position', value: 'blank'}
        ]
      },
      description: 'Default placement for all photos in this batch',
      validation: Rule => Rule.required()
    },
    {
      name: 'defaultBlankAreaPosition',
      title: 'Default Blank Area Position',
      type: 'string',
      options: {
        list: [
          {title: 'Top of Page', value: 'top'},
          {title: 'After Hero Section', value: 'after-hero'},
          {title: 'Middle of Page', value: 'middle'},
          {title: 'Before Footer', value: 'before-footer'},
          {title: 'Bottom of Page', value: 'bottom'}
        ]
      },
      description: 'Only applies if placement is "Blank Area"'
    },
    {
      name: 'defaultDisplayStyle',
      title: 'Default Display Style',
      type: 'string',
      options: {
        list: [
          {title: 'Full Width', value: 'full-width'},
          {title: 'Centered', value: 'centered'},
          {title: 'Left Aligned', value: 'left'},
          {title: 'Right Aligned', value: 'right'}
        ]
      },
      initialValue: 'centered'
    },
    {
      name: 'defaultPhotoSize',
      title: 'Default Photo Size',
      type: 'string',
      options: {
        list: [
          {title: 'Small (300px)', value: 'small'},
          {title: 'Medium (600px)', value: 'medium'},
          {title: 'Large (900px)', value: 'large'},
          {title: 'Full Width', value: 'full'}
        ]
      },
      initialValue: 'medium'
    },
    {
      name: 'defaultCompetition',
      title: 'Default Competition',
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
      },
      description: 'Default competition for all photos in this batch'
    },
    {
      name: 'uploadedAt',
      title: 'Upload Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'autoProcess',
      title: 'Auto-Process Photos',
      type: 'boolean',
      initialValue: true,
      description: 'Automatically create individual gallery items when you publish this bulk upload'
    },
    {
      name: 'processed',
      title: 'Processed',
      type: 'boolean',
      initialValue: false,
      readOnly: true,
      description: 'Photos have been converted to individual gallery items'
    },
    {
      name: 'processedCount',
      title: 'Photos Processed',
      type: 'number',
      readOnly: true,
      description: 'Number of photos successfully processed'
    }
  ],
  preview: {
    select: {
      title: 'uploadName',
      photoCount: 'photos',
      processed: 'processed',
      processedCount: 'processedCount'
    },
    prepare({title, photoCount, processed, processedCount}) {
      const count = photoCount?.length || 0
      const status = processed ? `✅ ${processedCount || count} photos processed` : `⏳ ${count} photos pending`
      return {
        title: title || 'Untitled Upload',
        subtitle: status
      }
    }
  }
}
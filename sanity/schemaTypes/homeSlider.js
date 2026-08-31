export default {
  name: 'homeSlider',
  title: 'Home Page Slider',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title (internal only)',
      type: 'string',
      initialValue: 'Homepage Photo Slider',
      readOnly: true,
    },
    {
      name: 'images',
      title: 'Slider Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt text (optional)',
              type: 'string',
            },
          ],
        },
      ],
      description: 'Upload, reorder (drag), or remove homepage slider photos. Recommended size: 1920x800 or similar wide format.',
      options: { layout: 'grid' },
    },
  ],
  preview: {
    select: { images: 'images' },
    prepare({ images }) {
      const count = images?.length || 0
      return {
        title: 'Homepage Photo Slider',
        subtitle: `${count} image${count !== 1 ? 's' : ''}`,
      }
    },
  },
}
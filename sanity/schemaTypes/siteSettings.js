export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      description: 'Name of the website'
    },
    
    // COLORS SECTION
    {
      name: 'colors',
      title: 'Brand Colors',
      type: 'object',
      description: 'Enter colors as hex codes (e.g., #2ca3ee)',
      fields: [
        {
          name: 'primary',
          title: 'Primary Blue',
          type: 'string',
          description: 'Main brand color (currently #2ca3ee)',
          placeholder: '#2ca3ee'
        },
        {
          name: 'secondary',
          title: 'Secondary Blue',
          type: 'string',
          description: 'Secondary brand color (currently #00b8f1)',
          placeholder: '#00b8f1'
        },
        {
          name: 'yellow',
          title: 'Yellow/Highlight Color',
          type: 'string',
          description: 'Yellow color for country football (currently #e6fe00)',
          placeholder: '#e6fe00'
        },
        {
          name: 'textDark',
          title: 'Dark Text Color',
          type: 'string',
          description: 'Main text color (default: #000000)',
          placeholder: '#000000'
        },
        {
          name: 'textLight',
          title: 'Light Text Color',
          type: 'string',
          description: 'Light text color (default: #ffffff)',
          placeholder: '#ffffff'
        }
      ]
    },

    // LOGOS SECTION
    {
      name: 'logos',
      title: 'Logos & Images',
      type: 'object',
      fields: [
        {
          name: 'mainLogo',
          title: 'Main Logo',
          type: 'image',
          description: 'Main SA Footballer logo (optional)'
        },
        {
          name: 'partnerLogo1',
          title: 'Partner Logo 1 (Left)',
          type: 'image'
        },
        {
          name: 'partnerLogo2',
          title: 'Partner Logo 2 (Center)',
          type: 'image'
        },
        {
          name: 'partnerLogo3',
          title: 'Partner Logo 3 (Right)',
          type: 'image'
        },
        {
          name: 'favicon',
          title: 'Favicon',
          type: 'image',
          description: 'Small icon that appears in browser tabs'
        }
      ]
    },

    // SOCIAL MEDIA
    {
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
          placeholder: 'https://www.facebook.com/yourpage'
        },
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
          placeholder: 'https://www.instagram.com/yourpage'
        },
        {
          name: 'youtube',
          title: 'YouTube URL',
          type: 'url',
          placeholder: 'https://www.youtube.com/@yourpage'
        },
        {
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
          placeholder: 'https://www.linkedin.com/in/yourpage'
        },
        {
          name: 'twitter',
          title: 'Twitter/X URL',
          type: 'url',
          placeholder: 'https://twitter.com/yourpage'
        }
      ]
    },

    // CONTACT INFO
    {
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Contact Email',
          type: 'string',
          placeholder: 'contact@example.com'
        },
        {
          name: 'phone',
          title: 'Contact Phone',
          type: 'string',
          placeholder: '0404 846 412'
        },
        {
          name: 'address',
          title: 'Office Address',
          type: 'text',
          rows: 3
        }
      ]
    },

    // HEADER MENU
    {
      name: 'headerMenu',
      title: 'Header Navigation Menu',
      type: 'array',
      description: 'Customize the main navigation menu items',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Menu Item Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string',
              description: 'e.g., /about or https://external-site.com',
              validation: Rule => Rule.required()
            },
            {
              name: 'hasDropdown',
              title: 'Has Dropdown?',
              type: 'boolean',
              initialValue: false
            },
            {
              name: 'dropdownItems',
              title: 'Dropdown Items',
              type: 'array',
              of: [{
                type: 'object',
                fields: [
                  {
                    name: 'title',
                    title: 'Title',
                    type: 'string'
                  },
                  {
                    name: 'link',
                    title: 'Link',
                    type: 'string'
                  }
                ]
              }],
              hidden: ({parent}) => !parent?.hasDropdown
            }
          ],
          preview: {
            select: {
              title: 'title',
              link: 'link'
            },
            prepare({title, link}) {
              return {
                title: title,
                subtitle: link
              }
            }
          }
        }
      ]
    },

    // FOOTER
    {
      name: 'footerText',
      title: 'Footer Copyright Text',
      type: 'text',
      rows: 2,
      placeholder: '© 2026 The South Australian Footballer. All rights reserved.'
    },

    // SLIDER IMAGES
    {
      name: 'sliderImages',
      title: 'Homepage Slider Images',
      type: 'array',
      of: [{
        type: 'image',
        options: {hotspot: true}
      }],
      description: 'Images for the homepage slider (recommended: 5-10 images)'
    },

    // PARTNER CAROUSEL
    {
      name: 'partnerLogos',
      title: 'Partner Logos (Carousel)',
      type: 'array',
      of: [{
        type: 'image',
        fields: [
          {
            name: 'link',
            title: 'Partner Website Link',
            type: 'url',
            description: 'Optional - click to visit partner website'
          },
          {
            name: 'altText',
            title: 'Alt Text',
            type: 'string',
            description: 'Partner name for accessibility'
          }
        ]
      }]
    },

    // SEO
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Default Meta Title',
          type: 'string',
          placeholder: 'The South Australian Footballer'
        },
        {
          name: 'metaDescription',
          title: 'Default Meta Description',
          type: 'text',
          rows: 3,
          placeholder: 'South Australia\'s largest independent football and sports media company'
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'string',
          placeholder: 'SA Football, SANFL, AFL, South Australian Football'
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: '⚙️ Site Settings'
      }
    }
  }
}
// schemas/subscriber.js
// Add this to your Sanity schema index

export default {
  name: 'subscriber',
  title: 'Subscribers',
  type: 'document',
  fields: [
    {
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: Rule => Rule.required().email(),
    },
    {
      name: 'subscribedAt',
      title: 'Subscribed At',
      type: 'datetime',
    },
    {
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'Where the subscriber signed up from',
      initialValue: 'magazines-page',
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Uncheck to unsubscribe this person',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'firstName',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle || 'Subscriber',
      }
    },
  },
}
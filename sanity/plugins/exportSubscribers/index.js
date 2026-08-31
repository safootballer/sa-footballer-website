// sanity/plugins/exportSubscribers/index.js

import { definePlugin } from 'sanity'
import ExportSubscribersTool from './ExportSubscribersTool'

export const exportSubscribersPlugin = definePlugin(() => ({
  name: 'export-subscribers',
  tools: (prev) => [
    ...prev,
    {
      name: 'export-subscribers',
      title: 'Export Subscribers',
      icon: () => '📥',
      component: ExportSubscribersTool,
    },
  ],
}))
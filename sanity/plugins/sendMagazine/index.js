// sanity/plugins/sendMagazine/index.js
// Registers the Send Magazine tool in Sanity Studio

import { definePlugin } from 'sanity'
import SendMagazineTool from './SendMagazineTool.jsx'

export const sendMagazinePlugin = definePlugin({
  name: 'send-magazine',
  tools: [
    {
      name:      'send-magazine',
      title:     'Send Magazine',
      icon:      () => '📨',
      component: SendMagazineTool,
    },
  ],
})
// sanity/plugins/deleteMatches/index.js

import { definePlugin } from 'sanity'
import DeleteMatchesTool from './DeleteMatchesTool'

export const deleteMatchesPlugin = definePlugin({
  name: 'delete-matches',
  tools: [
    {
      name:      'delete-matches',
      title:     'Delete Matches',
      icon:      () => '🗑️',
      component: DeleteMatchesTool,
    },
  ],
})
'use client'

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {apiVersion, dataset, projectId} from './sanity/env'
import {schemaTypes} from './sanity/schemaTypes'
import {structure} from './sanity/structure'
import {sendMagazinePlugin} from './sanity/plugins/sendMagazine'

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '2y2dueu9',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: '2026-03-11'}),
    sendMagazinePlugin(),
  ],
})
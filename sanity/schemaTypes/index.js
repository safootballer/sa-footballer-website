import editorial from './editorial'
import matchResult from './matchResult'
import magazine from './magazine'
import video from './video'
import photo from './photo'
import photoBulkUpload from './photoBulkUpload'
import siteSettings from './siteSettings'
import customPage from './customPage'

export const schemaTypes = [
  // Content
  editorial,
  matchResult,
  magazine,
  video,
  photo,
  photoBulkUpload,
  customPage,
  
  // Settings
  siteSettings
]
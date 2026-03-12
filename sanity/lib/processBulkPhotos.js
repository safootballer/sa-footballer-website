export async function processBulkPhotos(client, bulkUploadId) {
  try {
    console.log('Starting bulk photo processing for:', bulkUploadId)
    
    // Fetch the bulk upload document
    const bulkUpload = await client.getDocument(bulkUploadId)
    
    if (!bulkUpload) {
      console.error('Bulk upload not found:', bulkUploadId)
      return { success: false, error: 'Document not found' }
    }
    
    if (bulkUpload.processed) {
      console.log('Already processed')
      return { success: true, message: 'Already processed', count: bulkUpload.processedCount || 0 }
    }
    
    if (!bulkUpload.autoProcess) {
      console.log('Auto-process is disabled')
      return { success: false, error: 'Auto-process is disabled' }
    }
    
    const {
      photos, 
      defaultPages, 
      defaultPlacement, 
      defaultCompetition, 
      uploadName,
      defaultBlankAreaPosition,
      defaultDisplayStyle,
      defaultPhotoSize
    } = bulkUpload
    
    if (!photos || photos.length === 0) {
      console.log('No photos to process')
      return { success: false, error: 'No photos found' }
    }
    
    console.log(`Processing ${photos.length} photos...`)
    
    // Create individual photo documents
    const photoPromises = photos.map(async (photoAsset, index) => {
      const newPhoto = {
        _type: 'photo',
        title: uploadName ? `${uploadName} - Photo ${index + 1}` : `Photo ${index + 1}`,
        image: photoAsset,
        displayPages: defaultPages || ['all'],
        placement: defaultPlacement || 'gallery',
        blankAreaPosition: defaultPlacement === 'blank' ? defaultBlankAreaPosition : undefined,
        displayStyle: defaultDisplayStyle || 'centered',
        photoSize: defaultPhotoSize || 'medium',
        competition: defaultCompetition,
        active: true,
        uploadedAt: new Date().toISOString(),
        sortOrder: index + 1
      }
      
      return client.create(newPhoto)
    })
    
    const results = await Promise.all(photoPromises)
    
    // Mark bulk upload as processed
    await client
      .patch(bulkUploadId)
      .set({
        processed: true,
        processedCount: results.length
      })
      .commit()
    
    console.log(`✅ Successfully processed ${results.length} photos!`)
    
    return { 
      success: true, 
      count: results.length,
      message: `Successfully processed ${results.length} photos`
    }
    
  } catch (error) {
    console.error('Error processing bulk photos:', error)
    return { 
      success: false, 
      error: error.message 
    }
  }
}
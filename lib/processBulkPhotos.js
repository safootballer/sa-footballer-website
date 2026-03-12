export async function processBulkPhotos(client, bulkUploadId) {
  try {
    // Fetch the bulk upload document
    const bulkUpload = await client.getDocument(bulkUploadId)
    
    if (!bulkUpload || bulkUpload.processed) {
      console.log('Already processed or not found')
      return
    }
    
    const {photos, defaultPages, defaultPlacement, defaultCompetition, uploadName, defaultBlankAreaPosition, defaultDisplayStyle, defaultPhotoSize} = bulkUpload
    
    if (!photos || photos.length === 0) {
      console.log('No photos to process')
      return
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
        blankAreaPosition: defaultBlankAreaPosition,
        displayStyle: defaultDisplayStyle || 'centered',
        photoSize: defaultPhotoSize || 'medium',
        competition: defaultCompetition,
        active: true,
        uploadedAt: new Date().toISOString(),
        sortOrder: index + 1
      }
      
      return client.create(newPhoto)
    })
    
    await Promise.all(photoPromises)
    
    // Mark bulk upload as processed
    await client.patch(bulkUploadId).set({processed: true}).commit()
    
    console.log(`✅ Successfully processed ${photos.length} photos!`)
    return {success: true, count: photos.length}
    
  } catch (error) {
    console.error('Error processing bulk photos:', error)
    throw error
  }
}
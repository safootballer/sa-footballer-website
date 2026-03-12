import { client } from '../../../lib/sanity'
import { processBulkPhotos } from '../../../sanity/lib/processBulkPhotos'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { bulkUploadId } = body
    
    if (!bulkUploadId) {
      return NextResponse.json(
        { error: 'Missing bulkUploadId' }, 
        { status: 400 }
      )
    }
    
    console.log('API: Processing bulk upload:', bulkUploadId)
    
    const result = await processBulkPhotos(client, bulkUploadId)
    
    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: result.message || `Processed ${result.count} photos successfully!`,
        count: result.count 
      })
    } else {
      return NextResponse.json({ 
        success: false,
        error: result.error || 'Processing failed'
      }, { status: 400 })
    }
    
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ 
      error: 'Failed to process photos',
      details: error.message 
    }, { status: 500 })
  }
}

// Allow CORS for Sanity Studio webhooks
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  )
}
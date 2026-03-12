import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false, // Changed to false for write operations
  token: process.env.SANITY_API_TOKEN, // Add this line
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source).quality(100).fit('max')
}

// Fetch photos for specific page and placement
export async function getPhotosForPage(page, placement, count = 6) {
  const query = `*[_type == "photo" && active == true && "${page}" in displayPages && placement == "${placement}"] | order(_createdAt desc) {
    _id,
    image,
    title,
    caption
  }`
  
  const photos = await client.fetch(query)
  const shuffled = photos.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// Fetch photos for "All Pages"
export async function getPhotosForAllPages(placement, count = 6) {
  const query = `*[_type == "photo" && active == true && "all" in displayPages && placement == "${placement}"] | order(_createdAt desc) {
    _id,
    image,
    title,
    caption
  }`
  
  const photos = await client.fetch(query)
  const shuffled = photos.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// Get all photos for a page (any placement)
export async function getAllPhotosForPage(page) {
  const query = `*[_type == "photo" && active == true && ("${page}" in displayPages || "all" in displayPages)] {
    _id,
    image,
    title,
    caption,
    placement
  }`
  
  return await client.fetch(query)
}

// Legacy function - keep for now
export async function getRandomPhotos(count = 6) {
  const query = `*[_type == "photo" && active == true] | order(_createdAt desc) {
    _id,
    image,
    title,
    caption
  }`
  
  const allPhotos = await client.fetch(query)
  const shuffled = allPhotos.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}
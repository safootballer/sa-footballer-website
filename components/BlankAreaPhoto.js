import { urlFor } from '../lib/sanity'

export default function BlankAreaPhoto({ photo }) {
  return (
    <section className={`py-8 ${
      photo.displayStyle === 'full-width' ? 'w-full' : 'container mx-auto px-4'
    }`}>
      <div className={`${
        photo.displayStyle === 'centered' ? 'flex justify-center' :
        photo.displayStyle === 'left' ? 'flex justify-start' :
        photo.displayStyle === 'right' ? 'flex justify-end' :
        photo.displayStyle === 'float-left' ? 'float-left mr-8 mb-4' :
        photo.displayStyle === 'float-right' ? 'float-right ml-8 mb-4' : ''
      }`}>
        <img 
          src={urlFor(photo.image).width(
            photo.photoSize === 'small' ? 300 :
            photo.photoSize === 'medium' ? 600 :
            photo.photoSize === 'large' ? 900 :
            photo.photoSize === 'xlarge' ? 1200 : 1920
          ).url()}
          alt={photo.title || 'SA Football'}
          className={`${
            photo.photoSize === 'full' ? 'w-full' : ''
          } rounded-lg shadow-lg`}
        />
      </div>
      {photo.caption && (
        <p className={`mt-2 italic text-gray-600 ${
          photo.displayStyle === 'centered' ? 'text-center' :
          photo.displayStyle === 'left' ? 'text-left' :
          photo.displayStyle === 'right' ? 'text-right' : 'text-center'
        }`}>{photo.caption}</p>
      )}
    </section>
  )
}
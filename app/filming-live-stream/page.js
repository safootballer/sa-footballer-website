import { Suspense } from 'react'
import Header from '../../components/Header'
import FilmingLiveStreamContent from '../../components/FilmingLiveStreamContent'

export const metadata = {
  title: 'Filming & Live Stream - The South Australian Footballer',
  description: 'Watch live streams, filmed matches, and panel shows from SA Football',
}

export default function FilmingLiveStreamPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        <FilmingLiveStreamContent />
      </Suspense>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">FILMING & LIVE STREAM</h1>
          <p className="text-xl">Watch SA Football matches and panel shows</p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  )
}
import { Suspense } from 'react'
import Header from '../../components/Header'
import CountryFootballContent from '../../components/CountryFootballContent'

export default function CountryFootballPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        <CountryFootballContent />
      </Suspense>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-[#e6fe00] to-yellow-400 text-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">COUNTRY FOOTBALL</h1>
          <p className="text-xl">24 Leagues across South Australia</p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#e6fe00] border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  )
}
import { Suspense } from 'react'
import Header from '../../components/Header'
import EditorialsContent from '../../components/EditorialsContent'

export default function EditorialsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        <EditorialsContent />
      </Suspense>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-[#2ca3ee] to-[#00b8f1] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">EDITORIALS</h1>
          <p className="text-xl">Expert analysis and commentary on SA Football</p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#2ca3ee] border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  )
}
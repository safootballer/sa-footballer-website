import { Suspense } from 'react'
import Header from '../../components/Header'
import GoalKickersContent from '../../components/GoalKickersContent'

export default function GoalKickersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        <GoalKickersContent />
      </Suspense>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-[#2ca3ee] to-[#00b8f1] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">GOAL KICKERS</h1>
          <p className="text-xl">Season goal kicking leaders across SA football</p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#2ca3ee] border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Loading goal kickers...</p>
      </div>
    </div>
  )
}
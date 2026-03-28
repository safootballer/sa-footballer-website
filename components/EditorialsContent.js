'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function EditorialsContent() {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('competition') || 'all')
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  const categories = [
    { id: 'all', name: 'ALL' },
    { id: 'afl', name: 'AFL' },
    { id: 'aflw', name: 'AFLW' },
    { id: 'sanfl', name: 'SANFL' },
    { id: 'sanflw', name: 'SANFLW' },
    { id: 'amateurs', name: 'AMATEURS' },
    { id: 'sawfl', name: "SAWFL WOMEN'S" },
  ]

  useEffect(() => {
    fetchArticles()
  }, [selectedCategory])

  async function fetchArticles() {
    setLoading(true)
    try {
      const response = await fetch('/api/editorials?category=' + selectedCategory)
      const data = await response.json()
      setArticles(data)
    } catch (error) {
      console.error('Error fetching editorials:', error)
      setArticles([])
    }
    setLoading(false)
  }

  return (
    <>
      <section className="bg-gradient-to-r from-[#2ca3ee] to-[#00b8f1] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">EDITORIALS</h1>
          <p className="text-xl">Expert analysis and commentary on SA Football</p>
        </div>
      </section>

      <section className="bg-white border-b sticky top-0 z-40 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 py-4 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2 rounded-full font-bold whitespace-nowrap transition ${
                  selectedCategory === cat.id
                    ? 'bg-[#2ca3ee] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#2ca3ee] border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading editorials...</p>
          </div>
        ) : articles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => {
              return (
                <a key={article._id} href={`/editorials/${article.slug.current}`} className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                  {article.featuredImage?.asset?._ref ? (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={`https://cdn.sanity.io/images/2y2dueu9/production/${article.featuredImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png')}`}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <span className="text-white text-5xl">📰</span>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-[#2ca3ee] text-white text-xs font-bold px-3 py-1 rounded-full">
                        {article.competition}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {new Date(article.publishedAt).toLocaleDateString('en-AU', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    <h3 className="text-xl text-gray-600 font-bold mb-2 group-hover:text-[#2ca3ee] transition">
                      {article.title}
                    </h3>
                    
                    {article.excerpt && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                    )}
                    
                    <div className="text-[#2ca3ee] font-semibold group-hover:underline">
                      Read More →
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Editorials Yet</h3>
            <p className="text-gray-600">
              {selectedCategory === 'all'
                ? 'Check back soon for the latest editorials'
                : `No ${categories.find(c => c.id === selectedCategory)?.name} editorials available yet`}
            </p>
          </div>
        )}
      </section>
    </>
  )
}
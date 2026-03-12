export const metadata = {
  title: 'News Articles - The South Australian Footballer',
  description: 'Latest news and articles covering South Australian football',
}

import Header from '../../components/Header'
import { client } from '../../lib/sanity'
import { urlFor } from '../../lib/sanity'

// Fetch articles from Sanity
async function getArticles() {
  const query = `*[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    competition,
    publishedAt,
    excerpt,
    featuredImage
  }`
  
  const articles = await client.fetch(query)
  return articles
}

export default async function ArticlesPage() {
  const articles = await getArticles()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Articles Section */}
      <section className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">News & Articles</h1>
        <p className="text-gray-600 mb-12">The latest news, updates, and editorial content covering South Australian football.</p>
        
        {articles.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-gray-600 text-lg">No articles available yet.</p>
            <p className="text-gray-500 mt-2">Check back soon for the latest news!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div key={article._id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                {article.featuredImage ? (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={urlFor(article.featuredImage).width(600).height(400).url()}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-gray-400 text-4xl">🏈</span>
                  </div>
                )}
                
                <div className="p-6">
                  <span className="text-xs font-bold text-blue-600 uppercase px-3 py-1 bg-blue-50 rounded-full">
                    {article.competition}
                  </span>
                  
                  <h3 className="text-xl font-bold mt-3 mb-2 text-gray-900">
                    {article.title}
                  </h3>
                  
                  {article.excerpt && (
                    <p className="text-gray-600 text-sm mb-4">
                      {article.excerpt}
                    </p>
                  )}
                  
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>
                      📅 {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                    <a href={`/articles/${article.slug.current}`} className="text-blue-600 font-semibold hover:text-blue-800">
                      Read More →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">The South Australian Footballer</h3>
              <p className="text-gray-400">Premier publisher of SA footy magazines and media since 1993</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/articles" className="hover:text-white">News Articles</a></li>
                <li><a href="/videos" className="hover:text-white">Videos</a></li>
                <li><a href="/magazines" className="hover:text-white">Magazines</a></li>
                <li><a href="/match-reports" className="hover:text-white">Match Reports</a></li>
                <li><a href="/ladders" className="hover:text-white">Ladders</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Competitions</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">AFL & AFLW</a></li>
                <li><a href="#" className="hover:text-white">SANFL & SANFLW</a></li>
                <li><a href="#" className="hover:text-white">SA Amateur</a></li>
                <li><a href="#" className="hover:text-white">SAWFL Women's</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📞 0404 846 412</li>
                <li>📧 thesafootballer@adam.com.au</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 The South Australian Footballer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
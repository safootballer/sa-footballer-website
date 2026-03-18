import Header from '../../../components/Header'
import { client } from '../../../lib/sanity'
import { PortableText } from '@portabletext/react'

export const revalidate = 60

async function getArticle(slug) {
  const query = `*[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    competition,
    publishedAt,
    excerpt,
    content,
    author,
    featuredImage
  }`
  
  return await client.fetch(query, { slug })
}

export async function generateMetadata({ params }) {
  const article = await getArticle(params.slug)
  
  if (!article) {
    return {
      title: 'Editorial Not Found',
    }
  }

  return {
    title: `${article.title} - The South Australian Footballer`,
    description: article.excerpt || 'SA Football editorial and analysis',
  }
}

export default async function EditorialPage({ params }) {
  const article = await getArticle(params.slug)

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Editorial Not Found</h1>
          <a href="/editorials" className="text-[#2ca3ee] hover:underline">
            Back to Editorials
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {article.featuredImage?.asset?._ref && (
        <div className="w-full h-96 overflow-hidden">
          <img 
            src={`https://cdn.sanity.io/images/2y2dueu9/production/${article.featuredImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png')}`}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-[#2ca3ee] text-white text-sm font-bold px-4 py-1 rounded-full">
                {article.competition}
              </span>
              <span className="text-gray-500">
                {new Date(article.publishedAt).toLocaleDateString('en-AU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>

            <h1 className="text-4xl font-bold mb-6">{article.title}</h1>

            {article.excerpt && (
              <p className="text-xl text-gray-600 mb-8 italic border-l-4 border-[#2ca3ee] pl-4">
                {article.excerpt}
              </p>
            )}

            {article.content ? (
              <div className="prose prose-lg max-w-none">
                <PortableText value={article.content} />
              </div>
            ) : (
              <p className="text-gray-600">Editorial content coming soon...</p>
            )}

            {article.author && (
              <div className="mt-8 pt-8 border-t">
                <p className="text-gray-600">By {article.author}</p>
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <a href="/editorials" className="inline-block bg-[#2ca3ee] text-white px-8 py-3 rounded-full font-bold hover:bg-[#00b8f1] transition">
              Back to Editorials
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
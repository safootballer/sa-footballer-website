async function getArticle(slug) {
  const query = `*[_type == "editorial" && slug.current == $slug][0] {
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
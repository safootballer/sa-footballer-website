async function getMatchReport(slug) {
  const query = `*[_type == "matchResult" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    competition,
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    matchDate,
    venue,
    round,
    content,
    author,
    featuredImage
  }`
  
  return await client.fetch(query, { slug })
}
// Shared component — reused by all 4 magazine pages
import { client } from '../../lib/sanity'

function coverUrl(ref) {
  if (!ref) return null
  return `https://cdn.sanity.io/images/2y2dueu9/production/${ref
    .replace('image-', '')
    .replace(/-([a-z]+)$/, '.$1')}`
}

function MagCard({ mag, accent = '#2ca3ee' }) {
  return (
    <a href={mag.pdfUrl} target="_blank" rel="noreferrer" className="group block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
      {coverUrl(mag.coverImage?.asset?._ref) ? (
        <img src={coverUrl(mag.coverImage.asset._ref)} alt={mag.title} className="w-full h-64 object-cover group-hover:scale-105 transition duration-300" />
      ) : (
        <div className="w-full h-64 flex items-center justify-center text-white font-bold text-center p-4" style={{ background: accent }}>
          {mag.title}
        </div>
      )}
      <div className="p-3">
        <p className="font-bold text-gray-800 text-sm line-clamp-2 mb-1">{mag.title}</p>
        {mag.issueNumber && <p className="text-xs text-gray-500 mb-1">{mag.issueNumber}</p>}
        <p className="text-xs text-gray-400 mb-2">
          {new Date(mag.publishedAt).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <div className="text-center text-white text-xs font-bold py-1.5 rounded transition" style={{ background: accent }}>
          Download PDF
        </div>
      </div>
    </a>
  )
}

export function MagazineSection({ title, magazines, accent = '#2ca3ee', id }) {
  if (!magazines?.length) return null
  return (
    <div id={id} className="mb-14">
      <h2 className="text-2xl font-bold mb-6 pb-2 border-b-4" style={{ color: accent, borderColor: accent }}>
        {title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
        {magazines.map(mag => <MagCard key={mag._id} mag={mag} accent={accent} />)}
      </div>
    </div>
  )
}
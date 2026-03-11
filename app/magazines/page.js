export default function Magazines() {
  const magazines = [
    { edition: 'Round 1 - 2026', league: 'SANFL', date: 'March 2026', url: '#' },
    { edition: 'Round 1 - 2026', league: 'Amateur', date: 'March 2026', url: '#' },
    { edition: 'Round 1 - 2026', league: 'Women\'s', date: 'March 2026', url: '#' },
    { edition: 'Round 1 - 2026', league: 'Country', date: 'March 2026', url: '#' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <a href="/" className="text-sm hover:underline mb-2 block">← Back to Home</a>
          <h1 className="text-4xl font-bold">Magazine Downloads</h1>
          <p className="text-blue-100 mt-2">Download the latest editions - Season 2026</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {magazines.map((mag, i) => (
            <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-64 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">📰</div>
                  <h3 className="text-xl font-bold">{mag.league}</h3>
                  <p className="text-sm">{mag.edition}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{mag.date}</p>
                <a href={mag.url} className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                  Download PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
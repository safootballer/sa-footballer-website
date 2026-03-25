import Header from '../../../components/Header'
import { client } from '../../../lib/sanity'

export const revalidate = 60

async function getAmmoMagazines() {
  const query = `{
    "division1": *[_type == "magazine" && magazineType == "Ammo Division 1"] | order(publishedAt desc)[0...6] {
      _id,
      title,
      coverImage,
      pdfUrl,
      publishedAt,
      issueNumber
    },
    "division2": *[_type == "magazine" && magazineType == "Ammo Division 2"] | order(publishedAt desc)[0...6] {
      _id,
      title,
      coverImage,
      pdfUrl,
      publishedAt,
      issueNumber
    },
    "division3": *[_type == "magazine" && magazineType == "Ammo Division 3"] | order(publishedAt desc)[0...6] {
      _id,
      title,
      coverImage,
      pdfUrl,
      publishedAt,
      issueNumber
    },
    "division4": *[_type == "magazine" && magazineType == "Ammo Division 4"] | order(publishedAt desc)[0...6] {
      _id,
      title,
      coverImage,
      pdfUrl,
      publishedAt,
      issueNumber
    },
    "division5": *[_type == "magazine" && magazineType == "Ammo Division 5"] | order(publishedAt desc)[0...6] {
      _id,
      title,
      coverImage,
      pdfUrl,
      publishedAt,
      issueNumber
    },
    "division6": *[_type == "magazine" && magazineType == "Ammo Division 6"] | order(publishedAt desc)[0...6] {
      _id,
      title,
      coverImage,
      pdfUrl,
      publishedAt,
      issueNumber
    },
    "division7": *[_type == "magazine" && magazineType == "Ammo Division 7"] | order(publishedAt desc)[0...6] {
      _id,
      title,
      coverImage,
      pdfUrl,
      publishedAt,
      issueNumber
    }
  }`
  
  return await client.fetch(query)
}

export default async function AmmoFootyBudgetPage() {
  const magazines = await getAmmoMagazines()

  const divisions = [
    { key: 'division1', name: 'Division 1', data: magazines.division1 },
    { key: 'division2', name: 'Division 2', data: magazines.division2 },
    { key: 'division3', name: 'Division 3', data: magazines.division3 },
    { key: 'division4', name: 'Division 4', data: magazines.division4 },
    { key: 'division5', name: 'Division 5', data: magazines.division5 },
    { key: 'division6', name: 'Division 6', data: magazines.division6 },
    { key: 'division7', name: 'Division 7', data: magazines.division7 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="bg-gradient-to-r from-[#2ca3ee] to-[#00b8f1] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AMMO FOOTY BUDGET</h1>
          <p className="text-xl">Latest Issues - All Divisions</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        {divisions.map((division) => (
          <div key={division.key} className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-[#2ca3ee] border-b-2 border-[#2ca3ee] pb-2">
              {division.name}
            </h2>

            {division.data && division.data.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {division.data.map((mag) => {
                  const imageUrl = mag.coverImage?.asset?._ref
                    ? `https://cdn.sanity.io/images/2y2dueu9/production/${mag.coverImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png')}`
                    : null

                  return (
                    <div key={mag._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                      {imageUrl ? (
                        <img 
                          src={imageUrl}
                          alt={mag.title}
                          className="w-full h-64 object-cover"
                        />
                      ) : (
                        <div className="w-full h-64 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                          <span className="text-white text-5xl">📖</span>
                        </div>
                      )}
                      <div className="p-4">
                        <p className="font-bold text-sm mb-2 line-clamp-2">{mag.title}</p>
                        {mag.issueNumber && (
                          <p className="text-xs text-gray-600 mb-2">{mag.issueNumber}</p>
                        )}
                        <p className="text-xs text-gray-500 mb-3">
                          {new Date(mag.publishedAt).toLocaleDateString('en-AU')}
                        </p>
                        {mag.pdfUrl && (
                          <a 
                            href={mag.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-[#2ca3ee] text-white text-center py-2 rounded text-sm font-semibold hover:bg-[#00b8f1] transition"
                          >
                            Download PDF
                          </a>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-gray-500">No magazines available yet for {division.name}</p>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  )
}
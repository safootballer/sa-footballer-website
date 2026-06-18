import Header from '../../../components/Header'
import { MagazineSection } from '../../../components/MagazineGrid'
import SubscribeForm from '../../../components/SubscribeForm'
import { client } from '../../../lib/sanity'

export const revalidate = 60

export const metadata = {
  title: 'SA Country Footballer Magazine',
  description: 'All editions of the SA Country Footy Budget magazine — 2026 season',
}

async function getMagazines() {
  return client.fetch(`*[_type == "magazine" && magazineType == "Country Footy Budget"] | order(publishedAt desc) {
    _id, title, coverImage, pdfUrl, publishedAt, issueNumber, excerpt
  }`)
}

export default async function CountryPage() {
  const magazines = await getMagazines()
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">SA COUNTRY FOOTBALLER</h1>
          <p className="text-xl">All 2026 SA Country Footy Budget Editions</p>
        </div>
      </section>
      <section className="container mx-auto px-4 py-12">
        <MagazineSection title="2026 Country Footy Budget Editions" magazines={magazines} accent="#16a34a" />
        {!magazines.length && (
          <div className="text-center py-20 text-gray-500">
            <div className="text-6xl mb-4">📖</div>
            <p className="text-xl font-bold">No editions yet — check back soon</p>
          </div>
        )}
      </section>
      <SubscribeForm />
    </div>
  )
}
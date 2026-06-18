import Header from '../../../components/Header'
import { MagazineSection } from '../../../components/MagazineGrid'
import SubscribeForm from '../../../components/SubscribeForm'
import { client } from '../../../lib/sanity'

export const revalidate = 60

export const metadata = {
  title: 'Ammo Footy Budget - The South Australian Footballer',
  description: 'All editions of the Ammo Footy Budget magazine — full edition and all divisions',
}

async function getMagazines() {
  return client.fetch(`*[_type == "magazine" && magazineType in [
    "Ammo Footy Budget",
    "Ammo Division 1","Ammo Division 2","Ammo Division 3","Ammo Division 4",
    "Ammo Division 5","Ammo Division 6","Ammo Division 7"
  ]] | order(publishedAt desc) {
    _id, title, coverImage, pdfUrl, publishedAt, issueNumber, excerpt, magazineType
  }`)
}

export default async function AmmoPage() {
  const all = await getMagazines()

  const full = all.filter(m => m.magazineType === 'Ammo Footy Budget')
  const div1 = all.filter(m => m.magazineType === 'Ammo Division 1')
  const div2 = all.filter(m => m.magazineType === 'Ammo Division 2')
  const div3 = all.filter(m => m.magazineType === 'Ammo Division 3')
  const div4 = all.filter(m => m.magazineType === 'Ammo Division 4')
  const div5 = all.filter(m => m.magazineType === 'Ammo Division 5')
  const div6 = all.filter(m => m.magazineType === 'Ammo Division 6')
  const div7 = all.filter(m => m.magazineType === 'Ammo Division 7')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AMMO FOOTY BUDGET</h1>
          <p className="text-xl">Full Edition + All Division Editions — 2026</p>
        </div>
      </section>

      {/* Jump links */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-2 flex flex-wrap gap-2 justify-center">
          {[
            ['Full Edition', '#full'],
            ['Division 1', '#div1'], ['Division 2', '#div2'], ['Division 3', '#div3'],
            ['Division 4', '#div4'], ['Division 5', '#div5'], ['Division 6', '#div6'],
            ['Division 7', '#div7'],
          ].map(([label, href]) => (
            <a key={href} href={href} className="px-4 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-semibold hover:bg-red-600 hover:text-white transition">
              {label}
            </a>
          ))}
        </div>
      </div>

      <section className="container mx-auto px-4 py-12">
        <MagazineSection id="full"  title="Full Ammo Edition"   magazines={full}  accent="#dc2626" />
        <MagazineSection id="div1"  title="Ammo Division 1"     magazines={div1}  accent="#dc2626" />
        <MagazineSection id="div2"  title="Ammo Division 2"     magazines={div2}  accent="#dc2626" />
        <MagazineSection id="div3"  title="Ammo Division 3"     magazines={div3}  accent="#dc2626" />
        <MagazineSection id="div4"  title="Ammo Division 4"     magazines={div4}  accent="#dc2626" />
        <MagazineSection id="div5"  title="Ammo Division 5"     magazines={div5}  accent="#dc2626" />
        <MagazineSection id="div6"  title="Ammo Division 6"     magazines={div6}  accent="#dc2626" />
        <MagazineSection id="div7"  title="Ammo Division 7"     magazines={div7}  accent="#dc2626" />
        {!all.length && (
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
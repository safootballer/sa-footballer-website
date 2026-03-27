import Header from '../../components/Header'

export const metadata = {
  title: 'Advertising With Us - The South Australian Footballer',
  description: 'Best rates to advertise to the masses with a passion for football in South Australia',
}

export default function AdvertisingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="bg-gradient-to-r from-[#2ca3ee] to-[#00b8f1] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">ADVERTISING WITH THE SOUTH AUSTRALIAN FOOTBALLER</h1>
          <p className="text-lg">Reach the masses who have a passion for football in South Australia</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <article className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            
            <h2 className="text-xl font-bold text-red-600 mb-4">ADVERTISING IN THE SOUTH AUSTRALIAN FOOTBALLER MAGAZINES</h2>
            
            <p className="text-gray-800 mb-6">
              We offer the best rates to advertise to the masses, who have a passion for football in South Australia
            </p>

            <p className="text-red-600 font-bold mb-6">
              Nowhere else, will you reach as many people as affordably as advertising with the South Australian Footballer.
            </p>

            <ul className="space-y-3 mb-8 text-gray-800">
              <li>• We have a huge readership base of 107,000 people, who receive our weekly digital magazines via email for <strong>FREE</strong> during the season</li>
              <li>• Our Magazines are also available to download for <strong>FREE</strong> from our website and we also have our weekly Magazines on our Facebook page. Which can be read for <strong>FREE</strong> in Flipbook format. We have a readership of over 10,000,000 million people a month on our Facebook page. <span className="text-blue-600 font-semibold">So your business, is reaching an enormous audience.</span></li>
            </ul>

            <h2 className="text-base font-bold text-blue-600 mb-4">EACH WEEK DURING THE FOOTBALL SEASON - WE PRODUCE 4 MAGAZINES THAT COVER EVERY FOOTBALL LEAGUE IN THE STATE</h2>
            
            <ul className="space-y-2 mb-8 text-gray-800">
              <li>• <span className="text-red-600 font-bold">The SA Footballer Magazine</span> - Covers the AFL and SANFL competitions. The professional leagues played</li>
              <li>• <span className="text-red-600 font-bold">The Adelaide Footballer Magazine</span> - Covers the AMMO competition across metropolitan Adelaide and the 68 clubs</li>
              <li>• <span className="text-red-600 font-bold">The Women's Footballer Magazine</span> - Is the only Women's Footballer Magazine in Australia. And covers Women's Football</li>
              <li>• <span className="text-red-600 font-bold">The Country Football Magazine</span> - Covers all of the 24 Country Leagues, played across regional South Australia</li>
            </ul>

            <h2 className="text-xl font-bold text-red-600 mb-4">ADVERTISING ON OUR FACEBOOK PAGE</h2>
            
            <p className="text-gray-800 mb-4">
              The South Australian Footballer Facebook page is the biggest sports media page in South Australia
            </p>

            <ul className="space-y-3 mb-6 text-gray-800">
              <li>• In April 2026 we have 67,000 fans on our page and we reach an enormous audience of 10,000,000 million people a month</li>
              <li>• By the end of 2026, we will have a projected figure of 78,000 fans on our Facebook page and an even bigger monthly reach</li>
            </ul>

            <p className="text-gray-800 mb-8">
              Many businesses wish to advertise their company and products on our Facebook page. As they prefer social media and our enormous audience. We cater to what businesses want. If you wish to advertise on our Facebook page. We can arrange that.
            </p>

            <h2 className="text-xl font-bold text-red-600 mb-4">ADVERTISING ON OUR INTERNET TELEVISION SHOWS</h2>
            
            <ul className="space-y-2 mb-8 text-gray-800">
              <li>• The South Australian Footballer offers advertising on our weekly interviews with AMMO, Country and Women's Footballers</li>
              <li>• Your logo is on the screen and your business name is also read out by our presenters during the weekly interviews</li>
            </ul>

            <h2 className="text-xl font-bold text-red-600 mb-4">TO ADVERTISE ON ANY OF OUR PLATFORMS</h2>
            
            <p className="text-blue-600 font-semibold mb-2">
              PLEASE EMAIL THE MANAGING DIRECTOR LUKE HOSIE AT - <a href="mailto:thesafootballer@adam.com.au" className="underline">thesafootballer@adam.com.au</a>
            </p>
            
            <p className="text-blue-600 font-semibold mb-8">
              OR RING HIM DIRECT ON <a href="tel:0404846412" className="underline">0404 846 412</a> AND HE CAN ASSIST YOU WITH ANY QUESTIONS INCLUDING PRICING
            </p>

          </article>
        </div>
      </section>
    </div>
  )
}
'use client'
import Header from '../../components/Header'

export default function PartnersPage() {
  const principalPartners = [
    {
      name: 'Bartercard',
      logo: '/partners/bartercard.png',
      link: 'https://www.bartercard.com.au'
    }
  ]

  const platinumPartners = [
    
    {
      name: 'SWAARM',
      logo: '/partners/swaarm.jpg',
      link: '#'
    },
    {
      name: 'MGA Insurance Group',
      logo: '/partners/mga.png',
      link: '#'
    },
    {
      name: 'Print Wrap Pack',
      logo: '/partners/printwrappack.jpg',
      link: '#'
    },
    {
      name: 'Farmer to Fridge',
      logo: '/partners/farmer.png',
      link: '#'
    },
    
  ]

  const majorPartners = [
    {
      name: 'Alpha Trophies',
      logo: '/partners/alpha.png',
      link: '#'
    },
    {
      name: 'Arbitrage Investments Quality Sourcing',
      logo: '/partners/arbitrage.png',
      link: '#'
    },
    {
      name: 'Boss Driving School',
      logo: '/partners/boss.png',
      link: '#'
    },
    {
      name: 'FootyBanners',
      logo: '/partners/footy.png',
      link: '#'
    },
    {
      name: 'GPSS',
      logo: '/partners/gpss.png',
      link: '#'
    },
    {
      name: 'Gridare',
      logo: '/partners/griadare.png',
      link: '#'
    },
    {
      name: 'iSports Solutions',
      logo: '/partners/isports.png',
      link: '#'
    },{
      name: 'Kids Cancer Project',
      logo: '/partners/kids.png',
      link: '#'
    },{
      name: 'MR Communications',
      logo: '/partners/mr.png',
      link: '#'
    },
    {
      name: 'PWP',
      logo: '/partners/pwp.png',
      link: '#'
    },
    {
      name: 'Sailax Global Technology',
      logo: '/partners/sailex.png',
      link: '#'
    },
    {
      name: 'Sports Centre',
      logo: '/partners/sportscentre.png',
      link: '#'
    },
    {
      name: 'Solid Display Systems',
      logo: '/partners/solid.png',
      link: '#'
    },
    ,{
      name: 'The Ryan Bowman Legacy of Care Foundation',
      logo: '/partners/ryan.png',
      link: '#'
    },{
      name: 'The Tradie Grid',
      logo: '/partners/tradie.png',
      link: '#'
    },
    {
      name: 'TwoTwoSix Digital',
      logo: '/partners/226.png',
      link: '#'
    },
    {
      name: 'Variety',
      logo: '/partners/variety.png',
      link: '#'
    },
  
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="bg-gradient-to-r from-[#2ca3ee] to-[#00b8f1] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">OUR MAJOR PARTNERS</h1>
          <p className="text-xl">Supporting South Australian Football</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">

          {/* Principal Partners */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#2ca3ee]">PRINCIPAL PARTNERS</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {principalPartners.map((partner, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-12 text-center">
                  <div className="flex justify-center items-center mb-6">
                    <a href={partner.link} target="_blank" rel="noopener noreferrer">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-40 object-contain hover:scale-105 transition"
                      />
                    </a>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{partner.name}</h3>
                  <p className="text-gray-600">Principal Partner</p>
                </div>
              ))}
            </div>
          </div>

          {/* Platinum Partners */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#2ca3ee]">PLATINUM PARTNERS</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {platinumPartners.map((partner, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center">
                  <div className="flex justify-center items-center mb-6">
                    <a href={partner.link} target="_blank" rel="noopener noreferrer">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-32 object-contain hover:scale-105 transition"
                      />
                    </a>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{partner.name}</h3>
                  <p className="text-gray-600">Platinum Partner</p>
                </div>
              ))}
            </div>
          </div>

          {/* Major Partners */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#2ca3ee]">MAJOR PARTNERS</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
              {majorPartners.map((partner, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <div className="flex justify-center items-center mb-4">
                    <a href={partner.link} target="_blank" rel="noopener noreferrer">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-24 object-contain hover:scale-105 transition"
                      />
                    </a>
                  </div>
                  <p className="text-sm font-semibold text-gray-700">{partner.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-[#2ca3ee] to-[#00b8f1] rounded-lg p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Become a Partner</h3>
            <p className="text-lg mb-6">
              Join our family of valued partners and support South Australian Football
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-[#2ca3ee] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition"
            >
              Contact Us
            </a>
          </div>

        </div>
      </section>
    </div>
  )
}
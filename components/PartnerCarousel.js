'use client'
import { useState, useEffect } from 'react'

export default function PartnerCarousel() {
  const [currentPage, setCurrentPage] = useState(0)

  const partners = [
    { name: 'Bartercard', logo: '/partners/bartercard.png', link: 'https://www.bartercard.com.au' },
    { name: 'PWP', logo: '/partners/pwp.png', link: '#' },
    { name: 'SWAARM', logo: '/partners/swaarm.jpg', link: '#' },
    { name: 'MGA Insurance Group', logo: '/partners/mga.png', link: '#' },
    { name: 'Print Wrap Pack', logo: '/partners/printwrappack.jpg', link: '#' },
    { name: 'Farmer to Fridge', logo: '/partners/farmer.png', link: '#' },
    { name: 'Sports Centre', logo: '/partners/sportscentre.png', link: '#' },
    { name: 'Alpha Trophies', logo: '/partners/alpha.png', link: '#' },
    { name: 'Arbitrage Investments Quality Sourcing', logo: '/partners/arbitrage.png', link: '#' },
    { name: 'Boss Driving School', logo: '/partners/boss.png', link: '#' },
    { name: 'FootyBanners', logo: '/partners/footy.png', link: '#' },
    { name: 'GPSS', logo: '/partners/gpss.png', link: '#' },
    { name: 'Gridare', logo: '/partners/griadare.png', link: '#' },
    { name: 'iSports Solutions', logo: '/partners/isports.png', link: '#' },
    { name: 'Kids Cancer Project', logo: '/partners/kids.png', link: '#' },
    { name: 'MR Communications', logo: '/partners/mr.png', link: '#' },
    { name: 'Sailax Global Technology', logo: '/partners/sailex.png', link: '#' },
    { name: 'Solid Display Systems', logo: '/partners/solid.png', link: '#' },
    { name: 'The Ryan Bowman Legacy of Care Foundation', logo: '/partners/ryan.png', link: '#' },
    { name: 'The Tradie Grid', logo: '/partners/tradie.png', link: '#' },
    { name: 'TwoTwoSix Digital', logo: '/partners/226.png', link: '#' },
    { name: 'Variety', logo: '/partners/variety.png', link: '#' },
  ]

  const PER_PAGE = 4
  const totalPages = Math.ceil(partners.length / PER_PAGE)

  // Auto-rotate to the next group of 4 every 4 seconds
  useEffect(() => {
    if (partners.length === 0) return
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages)
    }, 4000)
    return () => clearInterval(timer)
  }, [totalPages, partners.length])

  if (partners.length === 0) return null

  const start = currentPage * PER_PAGE
  const visible = partners.slice(start, start + PER_PAGE)

  const Logo = ({ partner }) => (
    partner.link && partner.link !== '#' ? (
      <a href={partner.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
        <img src={partner.logo} alt={partner.name} className="h-20 max-w-full object-contain hover:scale-105 transition" />
      </a>
    ) : (
      <div className="flex items-center justify-center">
        <img src={partner.logo} alt={partner.name} className="h-20 max-w-full object-contain" />
      </div>
    )
  )

  return (
    <div className="bg-white py-8 border-t border-b">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-xl font-bold mb-6 text-gray-800">OUR PARTNERS</h3>

        {/* 4 partners at a time */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center min-h-[6rem] transition-opacity duration-500">
          {visible.map((partner, index) => (
            <Logo key={start + index} partner={partner} />
          ))}
        </div>

        {/* Navigation dots — one per page of 4 */}
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-2 h-2 rounded-full transition ${
                index === currentPage ? 'bg-[#2ca3ee]' : 'bg-gray-300'
              }`}
              aria-label={`Go to partner group ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
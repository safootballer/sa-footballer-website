'use client'
import { useState, useEffect } from 'react'

export default function PartnerCarousel({ partners = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Default partners if none provided
  const defaultPartners = [
    { name: 'Partner 1', logo: '/partners/partner1.png' },
    { name: 'Partner 2', logo: '/partners/partner2.png' },
    { name: 'Partner 3', logo: '/partners/partner3.png' },
    { name: 'Partner 4', logo: '/partners/partner4.png' },
    { name: 'Partner 5', logo: '/partners/partner5.png' },
    { name: 'Partner 6', logo: '/partners/partner6.png' },
  ]
  
  const logos = partners.length > 0 ? partners : defaultPartners
  
  // Auto-scroll every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(logos.length - 3, 1))
    }, 3000)
    
    return () => clearInterval(timer)
  }, [logos.length])
  
  return (
    <div className="relative overflow-hidden">
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * (100 / 4)}%)` }}
      >
        {logos.map((partner, index) => (
          <div key={index} className="flex-shrink-0 w-1/4 px-4">
            <div className="bg-white rounded shadow-lg h-24 flex items-center justify-center p-4">
              <img 
                src={partner.logo}
                alt={partner.name}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML = `<span class="text-gray-400 text-xs">${partner.name}</span>`
                }}
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: Math.max(logos.length - 3, 1) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition ${
              index === currentIndex ? 'bg-[#2ca3ee]' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
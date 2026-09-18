'use client'
import Header from '../../components/Header'

export default function PartnersPage() {
  const principalPartners = [
    { name: 'Bartercard', logo: '/partners/bartercard.png', link: 'https://www.bartercard.com.au' },
  ]

  const platinumPartners = [
    { name: 'SWAARM', logo: '/partners/swaarm.jpg', link: '#' },
    { name: 'MGA Insurance Group', logo: '/partners/mga.png', link: '#' },
    { name: 'Print Wrap Pack', logo: '/partners/printwrappack.jpg', link: '#' },
    { name: 'Farmer to Fridge', logo: '/partners/farmer.png', link: '#' },
  ]

  const majorPartners = [
    { name: 'Alpha Trophies', logo: '/partners/alpha.png', link: '#' },
    { name: 'Arbitrage Investments Quality Sourcing', logo: '/partners/arbitrage.png', link: '#' },
    { name: 'Bash Performance', logo: '/partners/bash.png', link: '#' },
    { name: 'Boss Driving School', logo: '/partners/boss.png', link: '#' },
    { name: 'FootyBanners', logo: '/partners/footy.png', link: '#' },
    { name: 'GPSS', logo: '/partners/gpss.png', link: '#' },
    { name: 'Gridare', logo: '/partners/griadare.png', link: '#' },
    { name: 'iSports Solutions', logo: '/partners/isports.png', link: '#' },
    { name: 'Kids Cancer Project', logo: '/partners/kids.png', link: '#' },
    { name: 'Livestock SA', logo: '/partners/livestock.jpeg', link: '#' },
    { name: 'MR Communications', logo: '/partners/mr.png', link: '#' },
    { name: 'Private Wealth Partners', logo: '/partners/pwp.png', link: '#' },
    { name: 'Sailax Global Technology', logo: '/partners/sailex.png', link: '#' },
    { name: 'Sports Centre', logo: '/partners/sportscentre.png', link: '#' },
    { name: 'Solid Display Systems', logo: '/partners/solid.png', link: '#' },
    { name: 'The Ryan Bowman Legacy of Care Foundation', logo: '/partners/ryan.png', link: '#' },
    { name: 'The Tradie Grid', logo: '/partners/tradie.png', link: '#' },
    { name: 'TwoTwoSix Digital', logo: '/partners/226.png', link: '#' },
    { name: 'Variety', logo: '/partners/variety.png', link: '#' },
  ]

  const LogoCircle = ({ partner, size = 90 }) => (
    <a href={partner.link} target="_blank" rel="noopener noreferrer"
      title={partner.name}
      className="bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300 border border-gray-100"
      style={{ width: size, height: size }}>
      <img src={partner.logo} alt={partner.name} className="object-contain" style={{ maxWidth: size * 0.62, maxHeight: size * 0.62 }} />
    </a>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="bg-gradient-to-r from-[#2ca3ee] to-[#00b8f1] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">OUR MAJOR PARTNERS</h1>
          <p className="text-xl">Supporting South Australian Football</p>
        </div>
      </section>

      {/* ── Radial orbit layout (desktop) ───────────────────────────── */}
      <section className="hidden lg:block relative bg-white overflow-hidden" style={{ minHeight: 960 }}>
        <div className="container mx-auto px-4 pt-14 text-center relative">
          <p className="text-[#2ca3ee] font-bold text-sm uppercase tracking-widest mb-3">Our Valued Partners</p>
          <h2 className="text-4xl font-black text-gray-900 mb-4">Partnering With the Best</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Our success is built in partnership with businesses who support South Australian football at every level.
          </p>

          {/* Tier legend */}
          <div className="flex justify-center gap-6 flex-wrap mb-2">
            <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <span className="w-4 h-4 rounded-full" style={{ background: 'rgba(44,163,238,0.55)' }}></span>
              Principal Partner
            </span>
            <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <span className="w-4 h-4 rounded-full" style={{ background: 'rgba(44,163,238,0.30)' }}></span>
              Platinum Partners
            </span>
            <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <span className="w-4 h-4 rounded-full" style={{ background: 'rgba(44,163,238,0.12)' }}></span>
              Major Partners
            </span>
          </div>
        </div>

        {/* Concentric rings */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: 270, width: 1200, height: 660 }}>
          {/* Ring backgrounds (semi-circles) */}
          {[
            { d: 1160, tint: 'rgba(44,163,238,0.04)' },
            { d: 920,  tint: 'rgba(44,163,238,0.07)' },
            { d: 660,  tint: 'rgba(44,163,238,0.11)' },
            { d: 400,  tint: 'rgba(44,163,238,0.16)' },
          ].map((r, i) => (
            <div key={i} className="absolute left-1/2 -translate-x-1/2 rounded-full border border-[#2ca3ee]/25"
              style={{ width: r.d, height: r.d, bottom: 60, background: r.tint }} />
          ))}

          {/* Ring labels on the arcs */}
          <div className="absolute left-1/2 -translate-x-1/2 text-[0.7rem] font-bold uppercase tracking-widest text-[#2ca3ee]/70" style={{ bottom: 175 }}>Principal</div>
          <div className="absolute left-1/2 -translate-x-1/2 text-[0.7rem] font-bold uppercase tracking-widest text-[#2ca3ee]/60" style={{ bottom: 375 }}>Platinum</div>
          <div className="absolute left-1/2 -translate-x-1/2 text-[0.7rem] font-bold uppercase tracking-widest text-[#2ca3ee]/50" style={{ bottom: 630 }}>Major Partners</div>

          {/* Center — Principal partner */}
          <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: 5 }}>
            {principalPartners.map((p, i) => <LogoCircle key={i} partner={p} size={130} />)}
          </div>

          {/* Ring 2 — Platinum (inner arc) */}
          {platinumPartners.map((p, i) => {
            const angle = 40 + (i * (100 / Math.max(platinumPartners.length - 1, 1)))
            const rad = (angle * Math.PI) / 180
            const R = 330
            const x = 600 + R * Math.cos(rad)
            const y = 660 - R * Math.sin(rad)
            return (
              <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: x, top: y }}>
                <LogoCircle partner={p} size={100} />
              </div>
            )
          })}

          {/* Ring 3 & 4 — Major partners spread across outer two arcs */}
          {majorPartners.map((p, i) => {
            const half = Math.ceil(majorPartners.length / 2)
            const ring = i < half ? 0 : 1
            const idxInRing = ring === 0 ? i : i - half
            const countInRing = ring === 0 ? half : majorPartners.length - half
            const angle = 18 + (idxInRing * (144 / Math.max(countInRing - 1, 1)))
            const rad = (angle * Math.PI) / 180
            const R = ring === 0 ? 460 : 580
            const x = 600 + R * Math.cos(rad)
            const y = 660 - R * Math.sin(rad)
            return (
              <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: x, top: y }}>
                <LogoCircle partner={p} size={78} />
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Grid fallback (mobile/tablet) ───────────────────────────── */}
      <section className="lg:hidden container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-6 text-[#2ca3ee]">PRINCIPAL PARTNER</h2>
            <div className="flex justify-center">
              {principalPartners.map((p, i) => (
                <div key={i} className="bg-white rounded-lg shadow-lg p-8 text-center w-full max-w-xs">
                  <img src={p.logo} alt={p.name} className="max-h-32 object-contain mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800">{p.name}</h3>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-6 text-[#2ca3ee]">PLATINUM PARTNERS</h2>
            <div className="grid grid-cols-2 gap-4">
              {platinumPartners.map((p, i) => (
                <div key={i} className="bg-white rounded-lg shadow p-5 text-center">
                  <img src={p.logo} alt={p.name} className="max-h-20 object-contain mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-700">{p.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-6 text-[#2ca3ee]">MAJOR PARTNERS</h2>
            <div className="grid grid-cols-3 gap-3">
              {majorPartners.map((p, i) => (
                <div key={i} className="bg-white rounded-lg shadow p-4 text-center">
                  <img src={p.logo} alt={p.name} className="max-h-16 object-contain mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-[#2ca3ee] to-[#00b8f1] rounded-lg p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Become a Partner</h3>
            <p className="text-lg mb-6">Join our family of valued partners and support South Australian Football</p>
            <a href="/contact" className="inline-block bg-white text-[#2ca3ee] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
import Header from '../../components/Header'

export const metadata = {
  title: 'Our Major Partners - The South Australian Footballer',
  description: 'Our valued partners who support SA Football',
}

export default function PartnersPage() {
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
          
          {/* Principal Partner */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#2ca3ee]">PRINCIPAL PARTNER</h2>
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <div className="flex justify-center items-center mb-6">
                <div className="w-full max-w-md h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-400 text-lg font-semibold">Bartercard</p>
                    <p className="text-gray-400 text-sm mt-2">Logo Coming Soon</p>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Bartercard</h3>
              <p className="text-gray-600">Our valued Principal Partner</p>
            </div>
          </div>

          {/* Platinum Partners */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#2ca3ee]">PLATINUM PARTNERS</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* PWP */}
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="flex justify-center items-center mb-6">
                  <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-gray-400 text-lg font-semibold">PWP</p>
                      <p className="text-gray-400 text-sm mt-2">Logo Coming Soon</p>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">PWP</h3>
                <p className="text-gray-600">Platinum Partner</p>
              </div>

              {/* SWAARM */}
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="flex justify-center items-center mb-6">
                  <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-gray-400 text-lg font-semibold">SWAARM</p>
                      <p className="text-gray-400 text-sm mt-2">Logo Coming Soon</p>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">SWAARM</h3>
                <p className="text-gray-600">Platinum Partner</p>
              </div>
            </div>
          </div>

          {/* Major Partners */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#2ca3ee]">MAJOR PARTNERS</h2>
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <p className="text-gray-500 text-lg">Major Partners logos coming soon...</p>
              <p className="text-gray-400 text-sm mt-2">Check back soon for our complete list of Major Partners</p>
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
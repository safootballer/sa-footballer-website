import Header from '../../components/Header'

export const metadata = {
  title: 'Contact Us - The South Australian Footballer',
  description: 'Get in touch with The South Australian Footballer team',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2ca3ee] to-[#00b8f1] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">CONTACT US</h1>
          <p className="text-xl">Get in touch with The South Australian Footballer team</p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Managing Director */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-[#2ca3ee] border-b-2 border-[#2ca3ee] pb-2">
                Managing Director
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 font-bold text-lg mb-1">Luke Hosie</p>
                  <p className="text-gray-600">Managing Director</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-1">Phone</p>
                  <a href="tel:0404846412" className="text-[#2ca3ee] font-bold hover:underline">
                    0404 846 412
                  </a>
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-1">Email</p>
                  <a href="mailto:thesafootballer@adam.com.au" className="text-[#2ca3ee] hover:underline break-all">
                    thesafootballer@adam.com.au
                  </a>
                </div>
              </div>
            </div>

            {/* Chief of Staff */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-[#2ca3ee] border-b-2 border-[#2ca3ee] pb-2">
                Chief of Staff & Accounts
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 font-bold text-lg mb-1">Lyka Ituralba</p>
                  <p className="text-gray-600">Chief of Staff & Accounts</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-1">AU Mobile</p>
                  <a href="tel:0480041170" className="text-[#2ca3ee] font-bold hover:underline">
                    0480 041 170
                  </a>
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-1">Email</p>
                  <a href="mailto:safootballer.lyka@adam.com.au" className="text-[#2ca3ee] hover:underline break-all">
                    safootballer.lyka@adam.com.au
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* General Contact & Social Media */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-[#2ca3ee] border-b-2 border-[#2ca3ee] pb-2">
              Connect With Us
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-gray-600 font-bold text-lg mb-4">Website</h3>
                <a href="https://safootballer.com.au" target="_blank" className="text-[#2ca3ee] hover:underline">
                  safootballer.com.au
                </a>
              </div>
              <div>
                <h3 className="text-gray-600 font-bold text-lg mb-4">General Enquiries</h3>
                <a href="mailto:thesafootballer@adam.com.au" className="text-[#2ca3ee] hover:underline">
                  thesafootballer@adam.com.au
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-gray-600 font-bold text-lg mb-4">Follow Us on Social Media</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <a 
                  href="https://www.facebook.com/southaustralianfootballerandsport" 
                  target="_blank"
                  className="flex items-center gap-3 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <div>
                    <p className="font-bold">Facebook</p>
                    <p className="text-sm opacity-90">65k followers</p>
                  </div>
                </a>

                <a 
                  href="https://www.instagram.com/southaustralianfootballer" 
                  target="_blank"
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <div>
                    <p className="font-bold">Instagram</p>
                    <p className="text-sm opacity-90">@southaustralianfootballer</p>
                  </div>
                </a>

                <a 
                  href="https://www.youtube.com/@SouthAustralianFootballer" 
                  target="_blank"
                  className="flex items-center gap-3 p-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <div>
                    <p className="font-bold">YouTube</p>
                    <p className="text-sm opacity-90">@SouthAustralianFootballer</p>
                  </div>
                </a>

                <a 
                  href="https://www.linkedin.com/in/straliasports" 
                  target="_blank"
                  className="flex items-center gap-3 p-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <div>
                    <p className="font-bold">LinkedIn</p>
                    <p className="text-sm opacity-90">Stralia Sports</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
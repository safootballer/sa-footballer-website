export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2">
        <div className="container mx-auto px-4 flex items-center justify-between text-sm">
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-200">📷 Instagram</a>
            <a href="#" className="hover:text-blue-200">▶️ YouTube</a>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-200">News & Editorials</a>
            <a href="#" className="hover:text-blue-200">Videos & Panel Shows</a>
            <a href="#" className="hover:text-blue-200">About Us</a>
            <a href="#" className="hover:text-blue-200">Our Partners</a>
            <a href="#" className="hover:text-blue-200">Advertise With Us</a>
            <a href="https://safootballer-dashbaord.onrender.com" target="_blank" className="hover:text-blue-200">📊 Admin Dashboard</a>
          </div>
        </div>
      </div>

      {/* Main Header - Logo Centered */}
      <header className="bg-black shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          {/* Logo - Centered */}
          <div className="flex justify-center mb-4">
            <img 
              src="/logo.png" 
              alt="SA Footballer Logo" 
              className="h-16"
            />
          </div>
          
          {/* Menu - Below Logo - Centered */}
          <nav className="flex justify-center items-center space-x-8 text-sm font-semibold text-white">
            <div className="relative group">
              <button className="hover:text-blue-400 flex items-center uppercase">
                GAME RESULTS <span className="ml-1">▼</span>
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded mt-2 py-2 w-48 text-gray-900">
                <a href="#" className="block px-4 py-2 hover:bg-blue-50">AFL & AFLW</a>
                <a href="#" className="block px-4 py-2 hover:bg-blue-50">SANFL & SANFLW</a>
                <a href="#" className="block px-4 py-2 hover:bg-blue-50">Amateur</a>
                <a href="#" className="block px-4 py-2 hover:bg-blue-50">SAWFL Women's</a>
              </div>
            </div>
            <a href="/magazines" className="hover:text-blue-400 uppercase">MAGAZINE DOWNLOADS</a>
            <a href="/match-reports" className="hover:text-blue-400 uppercase">MATCH REPORTS</a>
            <a href="/ladders" className="hover:text-blue-400 uppercase">LEAGUE LADDERS</a>
            <a href="#" className="hover:text-blue-400 uppercase">COUNTRY FOOTBALL</a>
            <a href="#" className="hover:text-blue-400 uppercase">COUNTRY NETBALL</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Celebrating Our 30th Year in Business!
          </h1>
          <p className="text-xl mb-8">
            For three decades now, our group of businesses and companies have been premier publishers of high-quality sporting magazines, sports media products, and multimedia in Adelaide and across South Australia.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition">
            Download Latest Magazine
          </button>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-white py-8 shadow-md">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="/magazines" className="bg-blue-600 text-white text-center py-6 rounded-lg hover:bg-blue-700 transition font-bold">
              📰 MAGAZINE DOWNLOADS
            </a>
            <a href="#" className="bg-green-600 text-white text-center py-6 rounded-lg hover:bg-green-700 transition font-bold">
              🏆 GAME RESULTS
            </a>
            <a href="/ladders" className="bg-orange-600 text-white text-center py-6 rounded-lg hover:bg-orange-700 transition font-bold">
              📊 LEAGUE LADDERS
            </a>
            <a href="/match-reports" className="bg-purple-600 text-white text-center py-6 rounded-lg hover:bg-purple-700 transition font-bold">
              ✍️ MATCH REPORTS
            </a>
          </div>
        </div>
      </section>

      {/* Latest News Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-8 text-gray-900">Latest News & Match Reports</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {generateNewsCards()}
        </div>
      </section>

      {/* Weekly Videos Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-gray-900">Weekly Videos and Panel Shows</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="h-64 bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">▶️</div>
                  <h3 className="text-2xl font-bold">The Adelaide "Ammo" Footy Show</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600">Covering every division of the amateurs with expert analysis and panel discussion.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="h-64 bg-gradient-to-br from-pink-600 to-pink-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">▶️</div>
                  <h3 className="text-2xl font-bold">The Adelaide Women's Footy Show</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600">The only panel show in Australia covering women's football with dedicated coverage of every SAWFL division.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Magazine Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Our Weekly Magazines</h2>
          <p className="text-xl mb-8">Download the latest editions covering AFL, SANFL, Amateur, and Women's football</p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition">
              📱 Read on Any Device
            </button>
            <button className="bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition">
              📧 Subscribe to Weekly Magazines
            </button>
          </div>
        </div>
      </section>

      {/* Game Results Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-gray-900">Weekly Game Results</h2>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { name: 'AFL vs Port Adelaide', color: 'bg-red-600' },
              { name: 'SANFL Results', color: 'bg-blue-600' },
              { name: 'SAAFL Results', color: 'bg-green-600' },
              { name: 'SAWFL Results', color: 'bg-pink-600' },
              { name: 'Country Results', color: 'bg-orange-600' },
            ].map((league, i) => (
              <a key={i} href="#" className={`${league.color} text-white p-8 rounded-lg hover:opacity-90 transition text-center font-bold shadow-lg`}>
                {league.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-2xl p-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Subscribe to Weekly Magazines</h2>
            <p className="text-xl mb-8">Get the latest SA footy news delivered to your inbox every week</p>
            <div className="flex gap-4">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-6 py-3 rounded-full text-gray-900"
              />
              <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">The South Australian Footballer</h3>
              <p className="text-gray-400">Premier publisher of SA footy magazines and media since 1993</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/magazines" className="hover:text-white">Magazine Downloads</a></li>
                <li><a href="#" className="hover:text-white">Game Results</a></li>
                <li><a href="/match-reports" className="hover:text-white">Match Reports</a></li>
                <li><a href="#" className="hover:text-white">Videos & Shows</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Competitions</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">AFL & AFLW</a></li>
                <li><a href="#" className="hover:text-white">SANFL & SANFLW</a></li>
                <li><a href="#" className="hover:text-white">SA Amateur</a></li>
                <li><a href="#" className="hover:text-white">SAWFL Women's</a></li>
                <li><a href="#" className="hover:text-white">Country Football</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📞 0404 846 412</li>
                <li>📧 thesafootballer@adam.com.au</li>
                <li className="pt-4 flex space-x-4">
                  <a href="#" className="hover:text-blue-400">📷 Instagram</a>
                  <a href="#" className="hover:text-red-400">▶️ YouTube</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 The South Australian Footballer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper function to generate news cards
function generateNewsCards() {
  const competitions = ['SANFL', 'AFL', 'Amateur', 'Women\'s', 'Country', 'SANFL'];
  const colors = ['blue', 'red', 'green', 'pink', 'orange', 'blue'];
  
  return [1, 2, 3, 4, 5, 6].map((i) => (
    <div key={i} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
        <span className="text-gray-400 text-4xl">🏈</span>
      </div>
      <div className="p-6">
        <span className={`text-xs font-bold text-${colors[i-1]}-600 uppercase px-3 py-1 bg-${colors[i-1]}-50 rounded-full`}>
          {competitions[i-1]}
        </span>
        <h3 className="text-xl font-bold mt-3 mb-2 text-gray-900">
          Round {i} Match Report: Team A defeats Team B
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          A thrilling contest saw the home team secure a hard-fought victory in challenging conditions at Adelaide Oval...
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>📅 March {i}, 2026</span>
          <a href="#" className="text-blue-600 font-semibold hover:text-blue-800">Read More →</a>
        </div>
      </div>
    </div>
  ));
}
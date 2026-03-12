export default function Header() {
  return (
    <>
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

      {/* Main Header */}
      <header className="bg-black shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-center mb-4">
            <a href="/">
              <img 
                src="/logo.png" 
                alt="SA Footballer Logo" 
                className="h-16"
              />
            </a>
          </div>
          
          <nav className="flex justify-center items-center space-x-8 text-sm font-semibold text-white">
            <a href="/" className="hover:text-blue-400 uppercase">HOME</a>
            <div className="relative group">
              <button className="hover:text-blue-400 flex items-center uppercase">
                GAME RESULTS <span className="ml-1">▼</span>
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded mt-2 py-2 w-48 text-gray-900 z-50">
                <a href="#" className="block px-4 py-2 hover:bg-blue-50">AFL & AFLW</a>
                <a href="#" className="block px-4 py-2 hover:bg-blue-50">SANFL & SANFLW</a>
                <a href="#" className="block px-4 py-2 hover:bg-blue-50">Amateur</a>
                <a href="#" className="block px-4 py-2 hover:bg-blue-50">SAWFL Women's</a>
              </div>
            </div>
            <a href="/articles" className="hover:text-blue-400 uppercase">NEWS ARTICLES</a>
            <a href="/videos" className="hover:text-blue-400 uppercase">VIDEOS</a>
            <a href="/magazines" className="hover:text-blue-400 uppercase">MAGAZINE DOWNLOADS</a>
            <a href="/match-reports" className="hover:text-blue-400 uppercase">MATCH REPORTS</a>
            <a href="#" className="hover:text-blue-400 uppercase">COUNTRY FOOTBALL</a>
            <a href="#" className="hover:text-blue-400 uppercase">COUNTRY NETBALL</a>
          </nav>
        </div>
      </header>
    </>
  )
}
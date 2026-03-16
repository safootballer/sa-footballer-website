'use client'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2 text-sm">
            {/* Social Media Icons - Left */}
            <div className="flex items-center space-x-3">
              <a href="#" className="text-blue-500 hover:text-blue-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="text-red-600 hover:text-red-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>

            {/* Top Right Menu */}
            <div className="hidden md:flex items-center space-x-6 text-gray-700">
              <a href="#" className="hover:text-blue-500">ABOUT US</a>
              <a href="#" className="hover:text-blue-500">OUR PARTNERS</a>
              <a href="#" className="hover:text-blue-500">ADVERTISING WITH US</a>
              <a href="#" className="hover:text-blue-500">CONTACT US</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Logo Section */}
      <div className="bg-white py-4">
        <div className="container mx-auto px-4 flex justify-center">
          <a href="/">
            <img src="/logo.png" alt="The South Australian Footballer" className="h-20" />
          </a>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <nav className="bg-[#2ca3ee] sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4">
          <div className="hidden md:flex items-center justify-center space-x-1">
            <a href="/" className="px-4 py-4 text-white font-semibold hover:bg-[#00b8f1] transition">
              HOME
            </a>

            {/* MAGAZINES Dropdown */}
            <div className="relative group">
              <button className="px-4 py-4 text-white font-semibold hover:bg-[#00b8f1] transition">
                MAGAZINES
              </button>
              <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg z-50 w-64">
                <a href="/magazines" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-b">SA FOOTBALLER</a>
                <a href="/magazines" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-b">AMMO FOOTY BUDGET</a>
                <a href="/magazines" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-b">WOMEN'S FOOTY BUDGET</a>
                <a href="/magazines" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-b">COUNTRY FOOTY BUDGET</a>
                <a href="/magazines" className="block px-6 py-3 text-gray-700 hover:bg-gray-100">SUBSCRIBE FOR FREE</a>
              </div>
            </div>

            {/* MATCH RESULTS Dropdown */}
            <div className="relative group">
              <button className="px-4 py-4 text-white font-semibold hover:bg-[#00b8f1] transition">
                MATCH RESULTS
              </button>
              <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg z-50 w-64">
                <a href="/match-results?cat=afl" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-b">AFL</a>
                <a href="/match-results?cat=aflw" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-b">AFLW</a>
                <a href="/match-results?cat=sanfl" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-b">SANFL</a>
                <a href="/match-results?cat=sanflw" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-b">SANFLW</a>
                <a href="/match-results?cat=amateurs" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-b">AMATEURS</a>
                <a href="/match-results?cat=sawfl" className="block px-6 py-3 text-gray-700 hover:bg-gray-100">SAWFL WOMEN'S</a>
              </div>
            </div>

            <a href="/editorials" className="px-4 py-4 text-white font-semibold hover:bg-[#00b8f1] transition">
              EDITORIALS
            </a>

            {/* COUNTRY FOOTBALL Dropdown */}
            <div className="relative group">
              <button className="px-4 py-4 text-white font-semibold hover:bg-[#00b8f1] transition">
                COUNTRY FOOTBALL
              </button>
              <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg z-50 w-72 max-h-96 overflow-y-auto">
                <a href="/country-football?league=adelaide-plains" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-b text-sm">ADELAIDE PLAINS</a>
                <a href="/country-football?league=barossa" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-b text-sm">BAROSSA LIGHT & GAWLER</a>
                <a href="/country-football?league=broken-hill" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-b text-sm">BROKEN HILL</a>
                <a href="/country-football?league=eastern-eyre" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-b text-sm">EASTERN EYRE</a>
                <a href="/country-football?league=far-north" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-b text-sm">FAR NORTH</a>
                <a href="/country-football?league=great-flinders" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-b text-sm">GREAT FLINDERS</a>
                <a href="/country-football?league=great-southern" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-b text-sm">GREAT SOUTHERN</a>
                <a href="/country-football?league=hills-div1" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-b text-sm">HILLS DIVISION 1</a>
                <a href="/country-football?league=hills-country" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-b text-sm">HILLS COUNTRY DIVISION</a>
                <a href="/country-football?league=kangaroo-island" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-b text-sm">KANGAROO ISLAND</a>
                <a href="/country-football?league=knt" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-b text-sm">KOWREE NARACOORTE TATIARA</a>
                <a href="/country-football?league=limestone-coast" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-b text-sm">LIMESTONE COAST</a>
                <a href="/country-football?league=murray-valley" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-b text-sm">MURRAY VALLEY</a>
                <a href="/country-football?league=mid-south-eastern" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-b text-sm">MID SOUTH EASTERN</a>
                <a href="/country-football?league=north-eastern" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-b text-sm">NORTH EASTERN</a>
                <a href="/country-football?league=northern-areas" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-b text-sm">NORTHERN AREAS</a>
                <a href="/country-football?league=port-lincoln" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-b text-sm">PORT LINCOLN</a>
                <a href="/country-football?league=river-murray" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-b text-sm">RIVER MURRAY</a>
                <a href="/country-football?league=riverland" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-b text-sm">RIVERLAND</a>
                <a href="/country-football?league=southern" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-b text-sm">SOUTHERN</a>
                <a href="/country-football?league=spencer-gulf" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-b text-sm">SPENCER GULF</a>
                <a href="/country-football?league=western-eyre" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-b text-sm">WESTERN EYRE</a>
                <a href="/country-football?league=whyalla" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-b text-sm">WHYALLA</a>
                <a href="/country-football?league=yorke-peninsula" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 text-sm">YORKE PENINSULA</a>
              </div>
            </div>

            <a href="/filming-live-stream" className="px-4 py-4 text-white font-semibold hover:bg-[#00b8f1] transition">
              FILMING & LIVE STREAM
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center justify-between py-3">
            <span className="text-white font-bold">MENU</span>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            <a href="/" className="block py-2 text-gray-700 font-semibold">HOME</a>
            
            <div className="py-2">
              <p className="font-bold text-[#2ca3ee]">MAGAZINES</p>
              <a href="/magazines" className="block py-1 pl-4 text-gray-600">SA FOOTBALLER</a>
              <a href="/magazines" className="block py-1 pl-4 text-gray-600">AMMO FOOTY BUDGET</a>
              <a href="/magazines" className="block py-1 pl-4 text-gray-600">WOMEN'S FOOTY BUDGET</a>
              <a href="/magazines" className="block py-1 pl-4 text-gray-600">COUNTRY FOOTY BUDGET</a>
              <a href="/magazines" className="block py-1 pl-4 text-gray-600">SUBSCRIBE FOR FREE</a>
            </div>

            <div className="py-2">
              <p className="font-bold text-[#2ca3ee]">MATCH RESULTS</p>
              <a href="/match-results?cat=afl" className="block py-1 pl-4 text-gray-600">AFL</a>
              <a href="/match-results?cat=aflw" className="block py-1 pl-4 text-gray-600">AFLW</a>
              <a href="/match-results?cat=sanfl" className="block py-1 pl-4 text-gray-600">SANFL</a>
              <a href="/match-results?cat=sanflw" className="block py-1 pl-4 text-gray-600">SANFLW</a>
              <a href="/match-results?cat=amateurs" className="block py-1 pl-4 text-gray-600">AMATEURS</a>
              <a href="/match-results?cat=sawfl" className="block py-1 pl-4 text-gray-600">SAWFL WOMEN'S</a>
            </div>

            <a href="/editorials" className="block py-2 text-gray-700 font-semibold">EDITORIALS</a>
            
            <a href="/country-football" className="block py-2 text-gray-700 font-semibold">COUNTRY FOOTBALL</a>
            
            <a href="/filming-live-stream" className="block py-2 text-gray-700 font-semibold">FILMING & LIVE STREAM</a>

            <div className="border-t mt-4 pt-4">
              <a href="#" className="block py-2 text-gray-600">ABOUT US</a>
              <a href="#" className="block py-2 text-gray-600">OUR PARTNERS</a>
              <a href="#" className="block py-2 text-gray-600">ADVERTISING WITH US</a>
              <a href="#" className="block py-2 text-gray-600">CONTACT US</a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
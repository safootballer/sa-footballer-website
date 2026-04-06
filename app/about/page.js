import Header from '../../components/Header'

export const metadata = {
  title: 'About Us - The South Australian Footballer',
  description: "South Australia's largest Independent Australian football and sports media company",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* HERO */}
      <section className="bg-gradient-to-r from-[#2ca3ee] to-[#00b8f1] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">ABOUT US</h1>
          <p className="text-xl">32+ Years of SA Football Coverage</p>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-black text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-6 text-center max-w-3xl mx-auto">
            <div>
              <div className="text-3xl md:text-4xl font-black text-[#e6fe00]">107K+</div>
              <div className="text-sm text-gray-400 mt-1">Weekly Subscribers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-[#e6fe00]">67K+</div>
              <div className="text-sm text-gray-400 mt-1">Facebook Fans</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-[#e6fe00]">10M+</div>
              <div className="text-sm text-gray-400 mt-1">Monthly Readers</div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Intro */}
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <p className="text-xl font-semibold text-[#ff0000] mb-6">
              After 32 years of hard work and longevity, we can safely say that we're South Australia's largest Independent Australian football and sports media company.
            </p>
            <h2 className="text-2xl font-bold text-[#ff0000] mt-8 mb-4">Most importantly. We are not an overnight success story</h2>
            <ul className="list-disc list-inside mb-6 space-y-2 ml-4">
              <li className="text-gray-700">We have worked hard over 32 years, and continue to work bloody hard. To be regarded as an industry leader across sports media in South Australia</li>
              <li className="text-gray-700">No overnight success here at the SA Footballer. Any success we may have had has come through lots of hours, and plain hard work</li>
            </ul>
          </div>

          {/* Numbers — 3 cards */}
          <div>
            <h2 className="text-2xl font-bold text-[#ff0000] mb-6">Our vast numbers tell the story why your business is best seen when advertising with the SA Footballer</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: '📰', stat: '107,000+', label: 'Subscribers to our magazines each week of the season', note: 'As of 30/3/2026' },
                { icon: '👍', stat: '67,000+', label: 'Fans on Facebook and 4,000 fans on Instagram', note: 'As of 30/3/2026' },
                { icon: '👁️', stat: '10,000,000+', label: 'Average readership of our Facebook page per month', note: 'As of 30/3/2026' },
              ].map((item) => (
                <div key={item.stat} className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-[#ff0000] text-center">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <div className="text-2xl font-bold text-[#0000FF] mb-2">{item.stat}</div>
                  <p className="text-gray-700 text-sm mb-2">{item.label}</p>
                  <p className="text-gray-400 text-xs">({item.note})</p>
                </div>
              ))}
            </div>
            <div className="bg-white border-l-4 border-[#0000FF] p-6 mt-6 rounded-lg shadow">
              <p className="font-bold text-[#0000FF]">
                THESE NUMBERS WILL GROW DURING 2026 BY APPROXIMATELY 20%
              </p>
            </div>
          </div>

          {/* Best Value */}
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <h2 className="text-4xl font-bold text-[#ff0000] mb-4">Best Value for Money Guaranteed</h2>
            <p className="text-gray-700">
              More than that, we understand that businesses don't want to be paying vast amounts of money for advertising and media. So we give the "very best" value for money in Australia.
            </p>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <h2 className="text-4xl font-bold text-[#ff0000] mb-8">Built From Experience</h2>
            <div className="relative border-l-4 border-[#2ca3ee] pl-8 space-y-8">
              {[
                { year: 'The Beginning', desc: 'Luke Hosie personally worked at all levels of the print, publishing, media and radio industries — from sweeping floors and getting lunches, composing newspapers, graphic design, designing magazines, journalism, plate making, dark room pre-press, working on the printing press, in the bindery, through to advertising sales.' },
                { year: 'Building Character', desc: 'Although not knowing it at the time, beginning at the very bottom has helped build our Managing Director as a person.' },
                { year: 'Today', desc: 'A lot of changes have occurred over the last 32 years in media, print and publishing. Having an ability to draw on past experiences from handling the menial tasks, to dealing with company CEOs, helps enormously for both our Managing Director, Luke Hosie, our Chief of Staff, Lyka Ituralba, and our valued staff members.' },
              ].map((item) => (
                <div key={item.year} className="relative">
                  <div className="absolute -left-11 w-4 h-4 bg-[#2ca3ee] rounded-full border-4 border-white shadow" />
                  <div className="font-bold text-[#0000FF] mb-1">{item.year}</div>
                  <p className="text-gray-700">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div>
            <h2 className="text-4xl font-bold text-[#ff0000] mb-6">Our Team and Services</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: '👩‍💼', title: 'Office Team', desc: 'Our office staff with Lyka at the helm, is brilliant and they try to help businesses at every opportunity.' },
                { icon: '🏆', title: 'Premier Company', desc: "We are one of Adelaide's premier companies, dealing exclusively in the niche market of sports media." },
                { icon: '✍️', title: 'Content Team', desc: 'Our team of Business Partnership Executives, journalists, and graphic designers create and produce a brilliant mix of South Australian sports media.' },
                { icon: '📱', title: 'Social Media', desc: 'Supported by social media content writers and bloggers, who promote stories, videos, and our magazines through our large social media platforms.' },
                { icon: '🤝', title: 'Sales Team', desc: 'Our sales team are partnership builders. They create a partnership with each business they deal with. Many of these partnerships last a lifetime.' },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-lg shadow-lg p-6 flex gap-4 hover:shadow-xl transition">
                  <div className="text-3xl">{item.icon}</div>
                  <div>
                    <div className="font-bold text-gray-900 mb-1">{item.title}</div>
                    <p className="text-gray-700 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Publications */}
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <h2 className="text-2xl font-bold text-[#ff0000] mb-4">Our Publications</h2>
            <p className="mb-6 font-bold text-[#0000FF]">Most notable in our myriad of media work is our publications. They include:</p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: 'South Australian Footballer Magazine', icon: '🏈' },
                { title: 'South Australian Adelaide Footballer Magazine', icon: '🏟️' },
                { title: 'South Australian Country Footballer Magazine', icon: '🌾' },
                { title: "South Australian Women's Footballer Magazine", icon: '⭐', note: "The only women's football magazine in Australia" },
              ].map((pub) => (
                <div key={pub.title} className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <span className="text-2xl">{pub.icon}</span>
                  <div>
                    <div className="text-gray-700 font-semibold">{pub.title}</div>
                    {pub.note && <div className="text-[#ff0000] text-xs font-bold mt-1">{pub.note}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Broadcasting */}
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <h2 className="text-4xl font-bold text-[#ff0000] mb-6">Broadcasting including both Live Streaming and Filming of Australian Football and all Sport</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: '📻', text: 'We produce and present our own radio and podcasts discussing football' },
                { icon: '📡', text: 'We live broadcast and live stream games of football and other sporting events' },
                { icon: '🎥', text: 'We video local amateur and country games, throughout both Adelaide and South Australia' },
              ].map((item) => (
                <div key={item.text} className="bg-gray-50 rounded-lg p-5 border border-gray-200 text-center">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <p className="text-gray-700 text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* New & Innovative */}
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <h2 className="text-2xl font-bold text-[#ff0000] mb-4">New and Innovative</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li className="text-gray-700">We have embraced new technology and most importantly use AI to help our clients and assist in the running of our business</li>
              <li className="text-gray-700">Our technology is the best in the business. From AI to the best in publishing, and the best videographers in the business. We are technology driven</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-[#2ca3ee] to-[#00b8f1] rounded-lg p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Want to Advertise With Us?</h3>
            <p className="text-lg mb-6">Join hundreds of businesses who trust SA Footballer to reach their audience</p>
            <a href="/contact" className="inline-block bg-white text-[#2ca3ee] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition">
              Contact Us →
            </a>
          </div>

        </div>
      </section>
    </div>
  )
}
import Header from '../../components/Header'
import FacebookFollowers from '../../components/FacebookFollowers'

export const metadata = {
  title: 'About Us - The South Australian Footballer',
  description: "South Australia's largest Independent Australian football and sports media company",
}

function Pill({ children }) {
  return (
    <span className="inline-block bg-white/5 border border-white/10 text-gray-300 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
      {children}
    </span>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0f16] text-white">
      <Header />

      {/* HERO */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1a2b] via-[#0a0f16] to-[#0a0f16]"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Pill>About Us</Pill>
          <h1 className="text-4xl md:text-6xl font-black leading-tight max-w-4xl mx-auto">
            We Turn <span className="text-[#2ca3ee]">Passion</span> for Footy
            <br className="hidden md:block" /> Into South Australia&apos;s Biggest
            <br className="hidden md:block" /> <span className="text-[#e6fe00]">Sports Media</span> Company
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mt-10 leading-relaxed">
            &ldquo;After 32 years of hard work and longevity, we can safely say that we&apos;re South Australia&apos;s largest Independent Australian football and sports media company.&rdquo;
          </p>
        </div>
      </section>

      {/* STATS STRIP — dark cards */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-2xl py-8 text-center">
              <div className="text-3xl md:text-5xl font-black text-[#e6fe00]">107K+</div>
              <div className="text-sm text-gray-400 mt-2">Weekly Subscribers</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl py-8 text-center">
              <div className="text-3xl md:text-5xl font-black text-[#e6fe00]">
                <FacebookFollowers label="" fallback="74K+" />
              </div>
              <div className="text-sm text-gray-400 mt-2">Facebook Fans</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl py-8 text-center">
              <div className="text-3xl md:text-5xl font-black text-[#e6fe00]">10M+</div>
              <div className="text-sm text-gray-400 mt-2">Monthly Readers</div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <Pill>Our Story</Pill>
              <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
                Not an Overnight <span className="text-[#ff0000]">Success</span> Story
              </h2>
              <div className="flex gap-8 mt-10">
                <div>
                  <div className="text-4xl font-black text-white">32+</div>
                  <div className="text-gray-500 text-sm mt-1">Years</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-white">1993</div>
                  <div className="text-gray-500 text-sm mt-1">Founded</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-white">#1</div>
                  <div className="text-gray-500 text-sm mt-1">In SA</div>
                </div>
              </div>
            </div>
            <div className="space-y-5 text-gray-400 leading-relaxed">
              <p>We have worked hard over 32 years, and continue to work bloody hard, to be regarded as an industry leader across sports media in South Australia.</p>
              <p>No overnight success here at the SA Footballer. Any success we may have had has come through lots of hours, and plain hard work.</p>
              <p>More than that, we understand that businesses don&apos;t want to be paying vast amounts of money for advertising and media. So we give the very best value for money in Australia.</p>
            </div>
          </div>
        </div>
      </section>

      {/* NUMBERS */}
      <section className="py-20 border-y border-white/5">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <Pill>Numbers</Pill>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Our Numbers Tell the <span className="text-[#2ca3ee]">Story</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-14">
            Why your business is best seen when advertising with the SA Footballer.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="text-4xl mb-4">📰</div>
              <div className="text-3xl font-black text-[#e6fe00] mb-2">107,000+</div>
              <p className="text-gray-400 text-sm">Subscribers to our magazines each week of the season</p>
              <p className="text-gray-600 text-xs mt-3">As of 30/3/2026</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="text-4xl mb-4">👍</div>
              <div className="text-3xl font-black text-[#e6fe00] mb-2">
                <FacebookFollowers label="" fallback="67,000+" />
              </div>
              <p className="text-gray-400 text-sm">Fans on Facebook and 4,000 fans on Instagram</p>
              <p className="text-gray-600 text-xs mt-3">Live count</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="text-4xl mb-4">👁️</div>
              <div className="text-3xl font-black text-[#e6fe00] mb-2">10,000,000+</div>
              <p className="text-gray-400 text-sm">Average readership of our Facebook page per month</p>
              <p className="text-gray-600 text-xs mt-3">As of 30/3/2026</p>
            </div>
          </div>
          <div className="mt-8 inline-block bg-[#2ca3ee]/10 border border-[#2ca3ee]/30 rounded-xl px-6 py-4">
            <p className="font-bold text-[#2ca3ee]">These numbers will grow during 2026 by approximately 20%</p>
          </div>
        </div>
      </section>

      {/* BUILT FROM EXPERIENCE — timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Pill>Our Journey</Pill>
          <h2 className="text-3xl md:text-4xl font-black mb-12">Built From <span className="text-[#ff0000]">Experience</span></h2>
          <div className="relative border-l-2 border-[#2ca3ee]/30 pl-8 space-y-10">
            {[
              { year: 'The Beginning', desc: 'Luke Hosie personally worked at all levels of the print, publishing, media and radio industries, from sweeping floors and getting lunches, composing newspapers, graphic design, designing magazines, journalism, plate making, dark room pre-press, working on the printing press, in the bindery, through to advertising sales.' },
              { year: 'Building Character', desc: 'Although not knowing it at the time, beginning at the very bottom has helped build our Managing Director as a person.' },
              { year: 'Today', desc: 'A lot of changes have occurred over the last 32 years in media, print and publishing. Having an ability to draw on past experiences from handling the menial tasks, to dealing with company CEOs, helps enormously for both our Managing Director, Luke Hosie, our Chief of Staff, Lyka Ituralba, and our valued staff members.' },
            ].map(item => (
              <div key={item.year} className="relative">
                <div className="absolute -left-[41px] w-4 h-4 bg-[#2ca3ee] rounded-full border-4 border-[#0a0f16]" />
                <div className="font-bold text-[#2ca3ee] mb-2 text-lg">{item.year}</div>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM & SERVICES */}
      <section className="py-20 border-y border-white/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <Pill>Our Team</Pill>
          <h2 className="text-3xl md:text-4xl font-black mb-12">Our Team and <span className="text-[#e6fe00]">Services</span></h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: '👩‍💼', title: 'Office Team', desc: 'Our office staff with Lyka at the helm, is brilliant and they try to help businesses at every opportunity.' },
              { icon: '🏆', title: 'Premier Company', desc: "We are one of Adelaide's premier companies, dealing exclusively in the niche market of sports media." },
              { icon: '✍️', title: 'Content Team', desc: 'Our team of Business Partnership Executives, journalists, and graphic designers create and produce a brilliant mix of South Australian sports media.' },
              { icon: '📱', title: 'Social Media', desc: 'Supported by social media content writers and bloggers, who promote stories, videos, and our magazines through our large social media platforms.' },
              { icon: '🤝', title: 'Sales Team', desc: 'Our sales team are partnership builders. They create a partnership with each business they deal with. Many of these partnerships last a lifetime.' },
            ].map(item => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-4 hover:bg-white/10 transition">
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <div className="font-bold text-white mb-1">{item.title}</div>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PUBLICATIONS */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <Pill>Our Publications</Pill>
          <h2 className="text-3xl md:text-4xl font-black mb-4">The Media We <span className="text-[#2ca3ee]">Produce</span></h2>
          <p className="text-gray-400 mb-12">Most notable in our myriad of media work is our publications.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: 'South Australian Footballer Magazine', icon: '🏉' },
              { title: 'South Australian Adelaide Footballer Magazine', icon: '🏟️' },
              { title: 'South Australian Country Footballer Magazine', icon: '🌾' },
              { title: "South Australian Women's Footballer Magazine", icon: '⭐', note: "The only women's football magazine in Australia" },
            ].map(pub => (
              <div key={pub.title} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-2xl p-5">
                <span className="text-2xl">{pub.icon}</span>
                <div>
                  <div className="text-white font-semibold">{pub.title}</div>
                  {pub.note && <div className="text-[#e6fe00] text-xs font-bold mt-1">{pub.note}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BROADCASTING */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <Pill>Broadcasting</Pill>
          <h2 className="text-3xl md:text-4xl font-black mb-12">Live Streaming & <span className="text-[#ff0000]">Filming</span></h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '📻', text: 'We produce and present our own radio and podcasts discussing football' },
              { icon: '📡', text: 'We live broadcast and live stream games of football and other sporting events' },
              { icon: '🎥', text: 'We video local amateur and country games, throughout both Adelaide and South Australia' },
            ].map(item => (
              <div key={item.text} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a2b] to-[#0a0f16]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-4">Want to <span className="text-[#e6fe00]">Advertise</span> With Us?</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">Join hundreds of businesses who trust SA Footballer to reach their audience.</p>
          <a href="/contact" className="inline-block bg-[#2ca3ee] text-white px-10 py-4 rounded-full font-bold hover:bg-[#00b8f1] transition">
            Contact Us →
          </a>
        </div>
      </section>
    </div>
  )
}
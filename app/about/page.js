import Header from '../../components/Header'

export const metadata = {
  title: 'About Us - The South Australian Footballer',
  description: "South Australia's largest Independent Australian football and sports media company",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="bg-gradient-to-r from-[#2ca3ee] to-[#00b8f1] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">ABOUT US</h1>
          <p className="text-xl">30+ Years of SA Football Coverage</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <article className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl font-semibold text-[#2ca3ee] mb-6">
                After 30 years of hard work and longevity, we can safely say that we're South Australia's largest Independent Australian football and sports media company.
              </p>

              <p className="text-gray-600 mb-6">
                We have over 155,000 subscribers to our magazines, videos, live streaming and broadcasting of football and sporting events each week of the season.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Best Value for Money Guarantee</h2>
              
              <p className="text-gray-600 mb-6">
                More than that, we understand that businesses don't want to be paying vast amounts of money for advertising and media. So we give the "very best" value for money in Australia.
              </p>

              <div className="bg-[#0d3270] border-l-4 border-[#2ca3ee] p-6 my-8">
                <p className="font-bold text-lg">
                  If you can find a company that offers better value for money than us, then we will give your advertising for FREE for 12 months. We are that certain.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Built From Experience</h2>

              <p className="text-gray-600 mb-6">
                One of the major reasons we have thrived with our business for 30 years is that I personally have worked at all levels of the print, publishing, media and radio industries. From sweeping floors and getting lunches, composing newspapers, graphic design, designing magazines, journalism, plate making, dark room pre-press, working on the printing press, in the bindery, through to advertising sales.
              </p>

              <p className="text-gray-600 mb-6">
                Although not knowing it at the time, beginning at the very bottom has helped build me as a person.
              </p>

              <p className="text-gray-600 mb-6">
                A lot of changes have occurred over the last 35 years in media, print and publishing. Having an ability to draw on past experiences from handling the menial tasks, to dealing with company CEOs, helps enormously.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Our Team &amp; Services</h2>

              <p className="text-gray-600 mb-6">
                We are one of Adelaide's premier companies, dealing exclusively in the niche market of sports media. Our team of Business Partnership Executives, journalists, and graphic designers create and produce a brilliant mix of South Australian sports media. They are supported by social media content writers and bloggers, who promote stories, videos, and our magazines through our large social media platforms.
              </p>

              <p className="text-gray-600 mb-6">
                Our sales team are partnership builders. They create a partnership with each business they deal with. Many of these partnerships last a lifetime.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Our Publications</h2>

              <p className="text-gray-600 mb-6">
                Most notable in our myriad of media work is our publications. They include:
              </p>

              <ul className="list-disc list-inside mb-6 space-y-2 ml-4">
                <li className="text-gray-700">South Australian Footballer Magazine</li>
                <li className="text-gray-700">South Australian Adelaide Footballer Magazine</li>
                <li className="text-gray-700">South Australian Country Footballer Magazine</li>
                <li className="text-gray-700">South Australian Women's Footballer Magazine - the only women's football magazine in Australia</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Broadcasting &amp; Media</h2>

              <p className="text-gray-600 mb-6">
                We also produce and present our own radio and podcasts discussing football. Plus we live broadcast and live stream games of football and other sporting events. We also video local amateur and country games, throughout both Adelaide and South Australia.
              </p>

              <div className="bg-gray-100 rounded-lg p-6 mt-8">
                <h3 className="text-gray-600 text-xl font-bold mb-4">By The Numbers</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-[#2ca3ee]">30+</p>
                    <p className="text-gray-600">Years in Business</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-[#2ca3ee]">155k+</p>
                    <p className="text-gray-600">Subscribers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-[#2ca3ee]">65k+</p>
                    <p className="text-gray-600">Facebook Followers</p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <div className="mt-8 text-center">
            <a href="/contact" className="inline-block bg-[#2ca3ee] text-white px-8 py-3 rounded-full font-bold hover:bg-[#00b8f1] transition">
              Get In Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
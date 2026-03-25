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
          <p className="text-xl">32+ Years of SA Football Coverage</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <article className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl font-semibold text-[#ff0000] mb-6">
                After 32 years of hard work and longevity, we can safely say that we're South Australia's largest Independent Australian football and sports media company.
              </p>

              <h2 className="text-2xl font-bold text-[#ff0000] mt-8 mb-4">Most importantly. We are not an overnight success story</h2>
              
              <ul className="list-disc list-inside mb-6 space-y-2 ml-4">
                <li className="text-gray-700">We have worked hard over 32 years, and continue to work bloody hard. To be regarded as an industry leader across sports media in South Australia</li>
                <li className="text-gray-700">No overnight success here at the SA Footballer. Any success we may have had has come through lots of hours, and plain hard work</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#ff0000] mt-8 mb-4">Our vast numbers tell the story why your business is best seen when advertising with the SA Footballer</h2>
              
              <ul className="list-disc list-inside mb-6 space-y-2 ml-4">
                <li className="text-gray-700">We have over 107,000 subscribers to our magazines each week of the season. (As of 30/3/2026)</li>
                <li className="text-gray-700">We have over 67,000 fans on Facebook and 4,000 fans on Instagram. (As of 30/3/2026)</li>
                <li className="text-gray-700">We average a readership of our Facebook page of 10,000,000 million people per month (As of 30/3/2026)</li>
              </ul>

              <div className="bg-00FFFF border-l-4 border-[#0000FF] p-6 my-8">
                <p className="font-bold text-[#0000FF]">
                  THESE NUMBERS WILL GROW DURING 2026 BY APPROXIMATELY 20%
                </p>
              </div>

              <h2 className="text-4xl font-bold text-[#ff0000] mt-8 mb-4">Best Value for Money Guaranteed</h2>

              <p className="mb-6">
                More than that, we understand that businesses don't want to be paying vast amounts of money for advertising and media. So we give the "very best" value for money in Australia.
              </p>

              <h2 className="text-4xl font-bold text-[#ff0000] mt-8 mb-4">Built From Experience</h2>

              <ul className="list-disc list-inside mb-6 space-y-2 ml-4">
                <li className="text-gray-700">One of the major reasons we have thrived with our business for 32 years is that managing director Luke Hosie, personally has worked at all levels of the print, publishing, media and radio industries. From sweeping floors and getting lunches, composing newspapers, graphic design, designing magazines, journalism, plate making, dark room pre-press, working on the printing press, in the bindery, through to advertising sales</li>
                <li className="text-gray-700">Although not knowing it at the time, beginning at the very bottom has helped build our Managing Director as a person</li>
                <li className="text-gray-700">A lot of changes have occurred over the last 32 years in media, print and publishing. Having an ability to draw on past experiences from handling the menial tasks, to dealing with company CEOs, helps enormously for both our Managing Director, Luke Hosie, our Chief of Staff, Lyka Ituralba, and our valued staff members</li>
              </ul>

              <h2 className="text-4xl font-bold text-[#ff0000] mt-8 mb-4">Our Team and Services</h2>

              <ul className="list-disc list-inside mb-6 space-y-2 ml-4">
                <li className="text-gray-700 font-bold">Our office staff with Lyka at the helm, is brilliant and they try to help businesses at every opportunity</li>
                <li className="text-gray-700">We are one of Adelaide's premier companies, dealing exclusively in the niche market of sports media</li>
                <li className="text-gray-700">Our team of Business Partnership Executives, journalists, and graphic designers create and produce a brilliant mix of South Australian sports media</li>
                <li className="text-gray-700">They are supported by social media content writers and bloggers, who promote stories, videos, and our magazines through our large social media platforms</li>
                <li className="text-gray-700">Our sales team are partnership builders. They create a partnership with each business they deal with. Many of these partnerships last a lifetime</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#ff0000] mt-8 mb-4">Our Publications</h2>

              <p className="mb-4 font-bold text-[#0000FF]">Most notable in our myriad of media work is our publications. They include:</p>

              <ul className="list-disc list-inside mb-6 space-y-2 ml-4">
                <li className="text-gray-700">South Australian Footballer Magazine</li>
                <li className="text-gray-700">South Australian Adelaide Footballer Magazine</li>
                <li className="text-gray-700">South Australian Country Footballer Magazine</li>
                <li className="text-gray-700">South Australian Women's Footballer Magazine - the only women's football magazine in Australia</li>
              </ul>

              <h2 className="text-4xl font-bold text-[#ff0000] mt-8 mb-4">Broadcasting including both Live Streaming and Filming of Australian Football and all Sport</h2>

              <ul className="list-disc list-inside mb-6 space-y-2 ml-4">
                <li className="text-gray-700">We also produce and present our own radio and podcasts discussing football</li>
                <li className="text-gray-700">Plus we live broadcast and live stream games of football and other sporting events</li>
                <li className="text-gray-700">We also video local amateur and country games, throughout both Adelaide and South Australia</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#ff0000] mt-8 mb-4">New and Innovative</h2>

              <ul className="list-disc list-inside mb-6 space-y-2 ml-4">
                <li className="text-gray-700">We have embraced new technology and most importantly use AI to help our clients and assist in the running of our business</li>
                <li className="text-gray-700">Our technology is the best in the business. From AI to the best in publishing, and the best videographers in the business. We are technology driven</li>
              </ul>

              
            </div>
          </article>

          
        </div>
      </section>
    </div>
  )
}
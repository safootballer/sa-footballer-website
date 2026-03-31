# SA Footballer Website

Official website for The South Australian Footballer - South Australia's largest Independent Australian football and sports media company.

**Live Site:** https://safootballer.com.au  
**Sanity Studio:** https://safootballer.com.au/studio

---

## 🏗️ Project Overview

This is a Next.js 16 website integrated with Sanity CMS for content management. The site showcases SA Football coverage including magazines, match results, editorials, videos, and partner information.

### Tech Stack
- **Frontend:** Next.js 16.1.6 (App Router)
- **CMS:** Sanity v4
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **Node Version:** 22.19.0

---

## 📁 Project Structure
```
sa-footballer-new/
├── app/                          # Next.js App Router pages
│   ├── page.js                   # Homepage
│   ├── about/                    # About Us page
│   ├── contact/                  # Contact page
│   ├── partners/                 # Our Major Partners page
│   ├── advertising/              # Advertising With Us page
│   ├── magazines/                # Magazines overview
│   │   └── ammo/                 # Ammo Footy Budget (7 divisions)
│   ├── match-results/            # Match results listing & details
│   │   └── [slug]/              # Individual match result pages
│   ├── editorials/               # Editorials listing & details
│   │   └── [slug]/              # Individual editorial pages
│   ├── country-football/         # Country Football (24 leagues)
│   ├── filming-live-stream/      # Filming & Live Stream page
│   ├── api/                      # API routes
│   │   ├── editorials/          # Editorials API
│   │   ├── match-results/       # Match results API
│   │   ├── country-football/    # Country football API
│   │   └── filming-live-stream/ # Videos API
│   └── studio/                   # Sanity Studio routes
│
├── components/                   # Reusable React components
│   ├── Header.js                # Main navigation header
│   ├── PhotoSlider.js           # Homepage image slider
│   ├── PartnerCarousel.js       # Partner logos carousel
│   ├── EditorialsContent.js     # Editorials filtering
│   ├── MatchResultsContent.js   # Match results filtering
│   ├── CountryFootballContent.js # Country league selector
│   └── FilmingLiveStreamContent.js # Video filtering
│
├── sanity/                       # Sanity CMS configuration
│   ├── schemaTypes/             # Content schemas
│   │   ├── editorial.js         # Editorial/Article schema
│   │   ├── matchResult.js       # Match result schema
│   │   ├── magazine.js          # Magazine schema
│   │   ├── video.js             # Video schema
│   │   ├── siteSettings.js      # Site-wide settings
│   │   └── customPage.js        # Dynamic pages
│   ├── structure.js             # Studio sidebar structure
│   └── lib/
│       └── client.js            # Sanity client config
│
├── public/                       # Static files
│   ├── slider/                  # Homepage slider images (1920x500px)
│   ├── partners/                # Partner logo files
│   └── references/              # Reference PDFs
│
└── scripts/                      # Utility scripts
    └── resize-slider-images.js  # Image resizing tool
```

---

## 🎨 Brand Colors
```css
Primary Blue:    #2ca3ee
Secondary Blue:  #00b8f1
Yellow/Highlight: #e6fe00
Text Dark:       #000000
Text Light:      #ffffff
```

---

## 📄 Key Pages

### 1. Homepage (`/`)
- Auto-playing photo slider
- Latest content sections: AFL, SANFL, Amateurs, SAWFL Women's
- Random 2 country leagues
- Magazine covers grid
- Partner carousel
- Latest videos
- Footer

### 2. Magazines (`/magazines`)
- 4 magazine types overview
- AFL & SANFL content sections
- Subscription form
- Magazine archive grid

### 3. Ammo Footy Budget (`/magazines/ammo`)
- 7 separate divisions (Division 1-7)
- 6 latest magazines per division
- Download PDF buttons

### 4. Match Results (`/match-results`)
- Category filtering (ALL, AFL, AFLW, SANFL, SANFLW, AMATEURS, SAWFL)
- Match cards with scores, venue, date
- Links to full match reports

### 5. Editorials (`/editorials`)
- Category filtering
- Article cards with featured images
- Competition badges and excerpts

### 6. Country Football (`/country-football`)
- Dropdown selector for 24 leagues
- Editorials and match results per league

### 7. Filming & Live Stream (`/filming-live-stream`)
- Video category filtering (Live Stream, Filming, Panel Shows)
- Company information section
- Contact details

### 8. About Us (`/about`)
- 32-year history
- Statistics (107k subscribers, 67k FB followers, 10M monthly reach)
- Team information
- Publications overview

### 9. Contact Us (`/contact`)
- Managing Director: Luke Hosie (0404 846 412)
- Chief of Staff: Lyka Ituralba (0480 041 170)
- Social media links with follower counts

### 10. Our Major Partners (`/partners`)
- Principal Partner (Bartercard)
- Platinum Partners (PWP, SWAARM)
- Major Partners section
- Logos from `/public/partners/` folder

### 11. Advertising With Us (`/advertising`)
- Magazine advertising details
- Facebook advertising
- Internet TV advertising
- Pricing contact information

---

## 🗄️ Sanity CMS Schemas

### Editorial
Content type for articles and editorials.
- **Fields:** title, slug, competition, countryLeague, excerpt, featuredImage, content, author, publishedAt
- **Competitions:** AFL, AFLW, SANFL, SANFLW, Amateur, SAWFL Women's, Country Football
- **Country Leagues:** 24 leagues (Adelaide Hills, Barossa, etc.)

### Match Result
Content type for match reports.
- **Fields:** title, slug, competition, countryLeague, homeTeam, awayTeam, homeScore, awayScore, matchDate, venue, round, content, author
- **Same competitions and leagues as Editorial**

### Magazine
Content type for digital magazines.
- **Magazine Types:**
  - SA Footballer
  - Ammo Division 1-7
  - Women's Footy Budget
  - Country Footy Budget
- **Fields:** title, magazineType, coverImage, pdfUrl, issueNumber, publishedAt, excerpt, featured

### Video
Content type for YouTube videos.
- **Categories:** live-stream, filming, panel-shows
- **Fields:** title, youtubeUrl, category, publishedAt

### Site Settings (Singleton)
Global site configuration.
- **Sections:**
  - Brand colors (hex codes)
  - Logos (main, partner 1-3, favicon)
  - Social media links
  - Contact information
  - Header menu customization
  - Slider images array
  - Partner logos carousel array
  - SEO settings

### Custom Page
Create dynamic pages with custom content.
- **Fields:** title, slug, showInMenu, menuTitle, headerImage, headerColor, content (PortableText), SEO settings

---

## 🔧 Setup & Installation

### Prerequisites
- Node.js v22.19.0
- npm 10.9.3
- Git

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/safootballer/sa-footballer-website.git
cd sa-footballer-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=2y2dueu9
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token_here
```

4. **Run development server**
```bash
npm run dev
```
Open http://localhost:3000

5. **Access Sanity Studio**
```bash
# Studio runs at /studio route
# Visit: http://localhost:3000/studio
```

---

## 📝 Content Management (Sanity Studio)

### Accessing the Studio
- **Production:** https://safootballer.com.au/studio
- **Local:** http://localhost:3000/studio

### Adding Content

#### 1. Upload Editorial/Article
1. Go to Studio → Editorials
2. Click "Create" → "Editorial"
3. Fill in:
   - Title
   - Generate slug (click Generate)
   - Select competition (AFL, SANFL, etc.)
   - If Country Football: select league
   - Add excerpt (brief description)
   - Upload featured image
   - Write content (rich text editor)
   - Add author name
   - Set publish date
4. Click "Publish"

#### 2. Upload Match Result
1. Go to Studio → Match Results
2. Click "Create" → "Match Result"
3. Fill in:
   - Title
   - Generate slug
   - Select competition
   - Home team name & score
   - Away team name & score
   - Match date
   - Venue
   - Round (e.g., "Round 10")
   - Write match report
4. Click "Publish"

#### 3. Upload Magazine
1. Go to Studio → Magazines
2. Click "Create" → "Magazine"
3. Fill in:
   - Title
   - Select magazine type (SA Footballer, Ammo Division 1-7, etc.)
   - Upload cover image
   - Add PDF URL (upload PDF somewhere and paste link)
   - Issue number (e.g., "Issue 245" or "Round 10")
   - Publish date
   - Excerpt
   - Check "Featured" to show on homepage
4. Click "Publish"

#### 4. Upload Video
1. Go to Studio → Videos
2. Click "Create" → "Video"
3. Fill in:
   - Title
   - YouTube URL (full URL: https://www.youtube.com/watch?v=...)
   - Select category (live-stream, filming, panel-shows)
   - Publish date
4. Click "Publish"

#### 5. Update Site Settings
1. Go to Studio → ⚙️ Site Settings
2. If doesn't exist, click "Create"
3. Update:
   - **Partner Logos (Carousel):**
     - Item 1 = Principal Partner (Bartercard)
     - Items 2-3 = Platinum Partners (PWP, SWAARM)
     - Items 4+ = Major Partners
   - **Slider Images:** Upload homepage slider images
   - **Social Media:** Update follower counts and URLs
   - **Contact Info:** Update email, phone, address
4. Click "Publish"

---

## 🖼️ Managing Images

### Homepage Slider Images
- **Location:** `/public/slider/`
- **Recommended size:** 1920x500px
- **Format:** .jpg or .png
- **Naming:** photo1.jpg, photo2.jpg, photo3.jpg, etc.

#### Resize Slider Images Script
```bash
# Install Sharp (first time only)
npm install sharp

# Run resize script
node scripts/resize-slider-images.js

# Copy resized images (Windows PowerShell)
Copy-Item -Path "public\slider\resized\*" -Destination "public\slider\" -Force
```

### Partner Logos
- **Location:** `/public/partners/`
- **Format:** .png or .jpg (transparent PNG recommended)
- **Files needed:**
  - `bartercard.png` (Principal Partner)
  - `pwp.png` (Platinum Partner)
  - `swaarm.png` (Platinum Partner)
  - Add more as needed

### To Add Partner Logo:
1. Save logo file to `/public/partners/filename.png`
2. Update `/app/partners/page.js`:
```javascript
const majorPartners = [
  { name: 'Company Name', logo: '/partners/filename.png', link: 'https://example.com' },
]
```
3. Commit and push to deploy

---

## 🚀 Deployment

### GitHub Repository
- **Repo:** https://github.com/safootballer/sa-footballer-website
- **Branch:** master
- **Owner:** talha-11-11

### Vercel Deployment
- **Project:** safootballers-projects/sa-footballer-website
- **Production URL:** https://safootballer.com.au
- **Auto-deploy:** Enabled on push to master

### Deploy Process
```bash
# Standard deployment
git add .
git commit -m "Your commit message"
git push

# Force deployment trigger
git commit --allow-empty -m "Trigger Vercel deployment"
git push

# Reset to specific commit (if needed)
git reset --hard <commit-hash>
git push --force
```

### Environment Variables (Vercel)
Set in Vercel Dashboard → Project Settings → Environment Variables:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=2y2dueu9
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=<your_token>
```

---

## 🎯 24 Country Football Leagues

1. Adelaide Hills Football League
2. Barossa Light & Gawler Football Association
3. Eastern Football League
4. Eyre Peninsula Football League
5. Great Southern Football League
6. Hills Football League
7. Kangaroo Island Football League
8. Limestone Coast Football League
9. Lower Eyre Football Association
10. Mid Murray Football League
11. Murray Football League
12. Northern Areas Football Association
13. River Murray Football League
14. Riverland Football League
15. South East Football League
16. Southern Football League
17. Spencer Gulf Football League
18. Western Border Football League
19. Yorke Peninsula Football League
20. Adelaide Plains Football League
21. Great Northern Football League
22. Fleurieu Peninsula Football League
23. West Adelaide Football League
24. Whyalla Football League

---

## 📞 Contact Information

### Managing Director
- **Name:** Luke Hosie
- **Phone:** 0404 846 412
- **Email:** thesafootballer@adam.com.au

### Chief of Staff
- **Name:** Lyka Ituralba
- **AU Mobile:** 0480 041 170
- **WhatsApp:** +63 977 277 1563
- **Email:** safootballer.lyka@adam.com.au

### Social Media
- **Facebook:** 67,000+ followers (@southaustralianfootballer.netball)
- **Instagram:** 4,000+ followers (@southaustralianfootballer)
- **YouTube:** The South Australian Footballer
- **Website:** www.safootballer.com.au

---

## 🐛 Common Issues & Solutions

### Issue: Videos not showing
**Solution:** Check that category in Sanity matches exactly: `live-stream`, `filming`, or `panel-shows` (lowercase with hyphens)

### Issue: Partner logos not appearing
**Solution:** 
1. Ensure files are in `/public/partners/` folder
2. Check filename matches exactly (case-sensitive)
3. Verify file extension (.png or .jpg) matches code

### Issue: Disk space error (ENOSPC)
**Solution:**
```bash
# Clean build files
rm -rf .next node_modules
npm cache clean --force

# Reinstall
npm install
```

### Issue: Build fails on Vercel
**Solution:**
1. Check build logs for specific error
2. Test build locally: `npm run build`
3. Check all imports are correct
4. Verify no server-only code in client components

### Issue: Slider images not fitting
**Solution:** Resize images to 1920x500px using the resize script

---

## 📊 Website Statistics

- **Years in Business:** 32+
- **Magazine Subscribers:** 107,000+
- **Facebook Followers:** 67,000+
- **Instagram Followers:** 4,000+
- **Monthly Facebook Reach:** 10,000,000+
- **Expected 2026 Growth:** 20%

---

## 🔐 Important Files & Folders

### Do NOT Delete
- `/sanity/` - CMS configuration
- `/lib/sanity.js` - Sanity client
- `/components/` - All components
- `/app/api/` - API routes
- `.env.local` - Environment variables (local only, not in git)

### Can Safely Modify
- `/public/slider/` - Homepage images
- `/public/partners/` - Partner logos
- `/app/partners/page.js` - Partner names and links
- Brand colors in components (search for `#2ca3ee`)

---

## 📚 Additional Resources

- **Next.js Documentation:** https://nextjs.org/docs
- **Sanity Documentation:** https://www.sanity.io/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Vercel Deployment:** https://vercel.com/docs

---

## 📝 Development Notes

- **Revalidation:** Pages revalidate every 60 seconds
- **Image Optimization:** Use Next.js Image component when possible
- **SEO:** Each page has metadata export for SEO
- **Mobile Responsive:** All pages optimized for mobile
- **Accessibility:** Semantic HTML and ARIA labels used throughout

---

## 🎉 Credits

**Developed by:** Talha Sarfraz  
**Email:** talhasarfraz29@gmail.com  
**GitHub:** [@talha-11-11](https://github.com/talha-11-11)  
**Development Period:** Feb 2026 - March 2026  

**Client:** The South Australian Footballer  
**Managing Director:** Luke Hosie  
**Email:** thesafootballer@adam.com.au  

---

*For technical support, contact Talha Sarfraz at talhasarfraz29@gmail.com*  
*For content/business inquiries, contact Luke Hosie at thesafootballer@adam.com.au*

*For support or questions, contact Luke Hosie at thesafootballer@adam.com.au*
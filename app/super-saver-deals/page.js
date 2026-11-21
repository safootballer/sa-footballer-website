// ─────────────────────────────────────────────────────────────
// WEBSITE FILE — put this in your existing (Vercel) website repo at:
//   app/super-saver-deals/page.js
// This page has NO database. It fetches coupons from the dashboard's
// public API (deployed on Render) cross-origin, same pattern as your
// PlayHQ fixtures. Edit DASHBOARD_API below to your Render URL.
// ─────────────────────────────────────────────────────────────
import SuperSaverContent from '@/components/SuperSaverContent'

export const metadata = {
  title: 'Super Saver Deals | The South Australian Footballer',
  description: 'Exclusive discounts and coupons from our local partners across South Australia.',
}

export default function SuperSaverDealsPage() {
  return <SuperSaverContent />
}

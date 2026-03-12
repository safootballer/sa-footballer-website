import './globals.css'

export const metadata = {
  title: {
    default: 'The South Australian Footballer',
    template: '%s | The South Australian Footballer'
  },
  description: 'Premier publisher of high-quality sporting magazines, sports media products, and multimedia in Adelaide and across South Australia since 1993.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="shortcut icon" href="/logo.png" type="image/png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
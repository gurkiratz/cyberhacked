import { Metadata } from 'next'
import { Toaster } from 'sonner'

import { Navbar } from '@/components/custom/navbar'
import { ThemeProvider } from '@/components/custom/theme-provider'

import './globals.css'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://gemini.vercel.ai'),
  title: 'Cyberhacked',
  description:
    'Test your cybersecurity skills against a simulated hacker in CyberHacked.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster position="top-center" />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

import './globals.css'
import { Inter } from 'next/font/google'
import AuthProviders from '@/components/providers/authProviders'
import Navigation from '@/components/ui/Navigation'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProviders>
      <html lang="en">
        <body className={inter.className}>
          <Navigation />
          <main>{children}</main>
        </body>
      </html>
    </AuthProviders>
  )
}

// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', 
  preload: true,
  variable: '--font-inter'
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={inter.variable}>
      <title>Shop Online</title>
      <head>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <meta name="description" content="Trang mua sắm trực tuyến với nhiều sản phẩm công nghệ chất lượng." />

  <meta name="robots" content="index, follow" />
  <meta name="theme-color" content="#FFD500" />

  <link rel="preconnect" href="https://api.escuelajs.co" crossOrigin="anonymous" />
  <link rel="dns-prefetch" href="https://api.escuelajs.co" />

  <link rel="preload" href="/logo.png" as="image" type="image/png" />
  <link rel="preload" href="/header1.png" as="image" type="image/png" />
</head>

      <body className={`${inter.className} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
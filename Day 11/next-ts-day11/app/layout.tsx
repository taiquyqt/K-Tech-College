
import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="flex gap-6 p-4 pr-20 bg-gray-200 justify-end">
          <Link className="text-blue-500 " href="/">Home</Link>
          <Link className="text-blue-500 " href="/products">Products</Link>
          <Link className="text-blue-500 " href="/login">Login</Link>
          <Link className="text-blue-500 " href="/contact">Contact</Link>
          <Link className="text-blue-500 " href="/blog">Blog</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}

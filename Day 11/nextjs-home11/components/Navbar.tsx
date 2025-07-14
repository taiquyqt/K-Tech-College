import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex gap-4 p-4 pr-10 bg-gray-100 justify-end">
      <Link href="/">Home</Link>
      <Link href="/products">Products</Link>
      <Link href="/login">Login</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/blog">Blog</Link>
    </nav>
  );
}


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
      <div className="flex flex-wrap justify-between items-center gap-4 bg-gray-200 text-black p-2">
        <h1 className="text-2xl font-bold">Management Task</h1>
        <div className="flex gap-4 pr-10 ">
          <Link className="hover:text-blue-500 scale-105" href="/task-ssr">Task SSR</Link>
          <Link className="hover:text-red-500 scale-105" href="/task-ssg">Task SSG</Link>
          <Link className="hover:text-yellow-500 scale-105" href="/task-csr">Task CSR</Link> 
          <Link className="hover:text-green-500 scale-105" href="/task-isr/">Task ISR</Link>
        </div>
      </div>
      <hr />
        {children}
      </body>
    </html>
  );
}

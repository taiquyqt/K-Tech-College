'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navigation = () => {
  const { data: session } = useSession()
  const pathname = usePathname()

  if (!session) return null

  const navItems = [
    { path: '/task', label: 'Tasks' },
    { path: '/create', label: 'Create Task' },
    { path: '/my-task', label: 'My Task' },
  ]

  return (
    <nav className="bg-white shadow-md border-b mb-6">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <h1 className="text-xl font-bold text-gray-800">Tasks Management</h1>
        <div className="flex items-center space-x-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                pathname === item.path
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="px-4 py-2 rounded-md bg-red-500 text-white text-sm hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation

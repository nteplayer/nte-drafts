'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  {
    title: 'Home',
    href: '/'
  },
  {
    title: 'Profile',
    href: '/profile'
  },
  {
    title: 'Drafts',
    href: '/drafts'
  },
  {
    title: 'Tournaments',
    href: '/tournaments'
  },
  {
    title: 'Draft systems',
    href: '/draft-systems'
  },
  {
    title: 'News',
    href: '/news'
  }
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className='w-[220px] border-r border-zinc-900 bg-black p-3'>
      <div className='flex flex-col gap-3'>
        {navItems.map((item) => {
          const active = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                rounded-full
                border
                border-zinc-800
                px-5
                py-4
                text-center
                text-lg
                font-black
                transition-all

                ${
                  active
                    ? 'bg-lime-300 text-black'
                    : 'bg-zinc-950 text-white hover:bg-zinc-900'
                }
              `}
            >
              {item.title}
            </Link>
          )
        })}
      </div>
    </aside>
  )
}

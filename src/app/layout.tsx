import './globals.css'

import Sidebar from '@/components/sidebar/Sidebar'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru'>
      <body>
        <div className='flex min-h-screen'>
          <Sidebar />

          <main className='flex-1 p-5'>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}

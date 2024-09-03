import './globals.css'
import { Providers } from './provider'
import { Inter, Dela_Gothic_One } from 'next/font/google'
import UserProvider from './context/User'

const inter = Inter({ subsets: ['latin'] })
const delaGothic = Dela_Gothic_One({ weight: "400", subsets: ['latin'] })

export const metadata = {
  title: 'LinkMe | A Link In Bio Solution for Content Creators',
  description: 'LinkMe is a link-in bio solution built for content creators',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={delaGothic.className + ' bg-[--global-green]'}>
          <Providers>
            <UserProvider>
              {children}
              </UserProvider>
          </Providers>
      </body>
    </html>
  )
}

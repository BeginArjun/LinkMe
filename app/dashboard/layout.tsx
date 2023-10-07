import Navbar from '../components/DashNavbar'
import { Providers } from '../provider'
import { Inter} from 'next/font/google'
import UserProvider from '../context/User'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dashboard | LINKME - Link In Bio Solution',
  description: 'LINKME is a link in bio solution for creators, influencers, and businesses.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <UserProvider>
            <Navbar/>
            {children}
        </UserProvider>
        </Providers>
      </body>
    </html>
  )
}
import { Providers } from '../provider'
import { Dela_Gothic_One } from 'next/font/google'

const delaGothic= Dela_Gothic_One({weight:"400",subsets:['latin']})

export const metadata = {
  title: 'LinkMe | A Link In Bio Solution for Content Creators',
  description: 'LinkMe is a link-in bio solution built for content creators',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={delaGothic.className}>
        <Providers>
              {children}
        </Providers>
      </body>
    </html>
  )
}

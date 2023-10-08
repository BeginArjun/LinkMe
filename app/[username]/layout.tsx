import { Providers } from '../provider'
import { Inter, Poppins,Dela_Gothic_One } from 'next/font/google'

const delaGothic= Dela_Gothic_One({weight:"400",subsets:['latin']})

import type { Metadata, ResolvingMetadata } from 'next'
 
type Props = {
  params: { username: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
    const {username}=params
  return {
    title: username.toUpperCase()+' | LinkMe',
    description:'LinkMe Site for'+username
  }
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
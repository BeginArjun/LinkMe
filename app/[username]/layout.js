import { Providers } from '../provider'
import { Inter, Poppins,Dela_Gothic_One } from 'next/font/google'

const delaGothic= Dela_Gothic_One({weight:"400",subsets:['latin']})

 

 
export async function generateMetadata(
  { params }){
  // read route params
    const {username}=params
  return {
    title: username.toUpperCase()+' | LinkMe',
    description:'LinkMe Site for '+username
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
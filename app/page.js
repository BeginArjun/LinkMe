'use client'
import FAQ from './components/FAQ'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center min-h-screen'>
      <div className='bg-[--global-green]'>
      <Navbar/>
      <Hero/>
      </div>
      <FAQ/>
    </main>
  )
}

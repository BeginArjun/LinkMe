'use client'
import FAQ from './components/FAQ'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
export default function Home() {
  return (
    <main className='flex flex-col justify-center min-h-screen'>
      <Navbar/>
      <Hero/>
      <FAQ/>
      <Footer/>
    </main>
  )
}

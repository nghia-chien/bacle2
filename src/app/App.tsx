import { useState } from 'react'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { Story } from '../components/Story'
import { About } from '../components/About'
import { Concepts } from '../components/Concepts'
import { Gallery } from '../components/Gallery'
import { Testimonials } from '../components/Testimonials'
import { Pricing } from '../components/Pricing'
import { Booking } from '../components/Booking'
import { Footer } from '../components/Footer'
import { FloatingContact } from '../components/FloatingContact'

export default function App() {
  const [concept, setConcept] = useState('')

  return (
    <>
      <a
        href="#main"
        className="caps sr-only z-50 bg-ink px-4 py-3 text-cream focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Bỏ qua đến nội dung
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Story />
        <About />
        <Concepts onChoose={setConcept} />
        <Gallery />
        <Testimonials />
        <Pricing />
        <Booking concept={concept} onConceptChange={setConcept} />
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}

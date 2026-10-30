import { useState } from 'react'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { About } from '../components/About'
import { Portfolio } from '../components/Portfolio'
import { ConceptDetail } from '../components/ConceptDetail'
import { Process } from '../components/Process'
import { Pricing } from '../components/Pricing'
import { Gallery } from '../components/Gallery'
import { Testimonials } from '../components/Testimonials'
import { Booking } from '../components/Booking'
import { Footer } from '../components/Footer'
import { FloatingContact } from '../components/FloatingContact'

export default function App() {
  // Gói hoặc concept khách đã chọn, điền sẵn vào form đặt lịch
  const [choice, setChoice] = useState('')
  const [detail, setDetail] = useState<string | null>(null)

  const chooseAndBook = (slug: string) => {
    setChoice(slug)
    setDetail(null)
    // Chờ bảng chi tiết đóng rồi mới cuộn tới form
    window.setTimeout(() => document.getElementById('dat-lich')?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <Hero />
        <About />
        <Portfolio onOpen={setDetail} />
        <Process />
        <Pricing onChoose={chooseAndBook} />
        <Gallery />
        <Testimonials />
        <Booking concept={choice} onConceptChange={setChoice} />
      </main>
      <Footer />
      <FloatingContact />
      <ConceptDetail slug={detail} onClose={() => setDetail(null)} onChoose={chooseAndBook} />
    </>
  )
}

/**
 * FnbTemplate — Template B
 * Karakter: Warm, Visual, Menu-focused, Large hero
 * Color palette: Amber / Orange warm tones
 *
 * Props:
 *   data  : object  — full website data
 *   theme : string
 */
import Hero          from '../sections/Hero'
import About         from '../sections/About'
import Services      from '../sections/Services'
import Testimonials  from '../sections/Testimonials'
import Contact       from '../sections/Contact'

// Warm-style navbar
function Navbar({ businessName, whatsappNumber, ctaText, ctaWhatsappMessage }) {
  const waUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(ctaWhatsappMessage ?? '')}`
    : '#'

  return (
    <header className="sticky top-0 z-50 bg-amber-900/95 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <span className="font-bold text-xl text-amber-100 tracking-tight">
          ☕ {businessName}
        </span>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-amber-200">
            <a href="#about"        className="hover:text-white transition-colors">Tentang</a>
            <a href="#services"     className="hover:text-white transition-colors">Menu</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Ulasan</a>
          </nav>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-[#25d366] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#128c4a] transition-colors"
          >
            <span>Pesan</span>
          </a>
        </div>
      </div>
    </header>
  )
}

// Decorative wavy divider
function WaveDivider({ flip = false }) {
  return (
    <div className={flip ? 'rotate-180' : ''}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 block" aria-hidden="true">
        <path
          d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  )
}

function Footer({ businessName, tagline, instagram }) {
  return (
    <footer className="bg-amber-900 text-amber-300 py-8">
      <div className="mx-auto max-w-6xl px-6 flex flex-col items-center gap-3 text-sm text-center">
        <span className="text-xl">☕</span>
        <span className="font-bold text-amber-100 text-lg">{businessName}</span>
        <span className="italic">{tagline}</span>
        {instagram && <span>{instagram}</span>}
        <span className="text-amber-500 text-xs mt-2">© {new Date().getFullYear()} Hak Cipta Dilindungi</span>
      </div>
    </footer>
  )
}

export default function FnbTemplate({ data = {}, theme }) {
  const { meta = {}, hero = {}, about = {}, services = [], testimonials = [], contact = {} } = data

  return (
    <div className="min-h-screen bg-amber-50 text-amber-900">
      {/* Navbar */}
      <Navbar
        businessName={meta.businessName}
        whatsappNumber={contact.whatsappNumber}
        ctaText={hero.ctaText}
        ctaWhatsappMessage={hero.ctaWhatsappMessage}
      />

      {/* Hero — warm amber gradient, large */}
      <Hero
        data={hero}
        contact={contact}
        className="bg-gradient-to-b from-amber-900 via-amber-800 to-amber-700 text-white min-h-[70vh] flex flex-col justify-center"
        theme="fnb"
      />

      {/* Wave into About */}
      <div className="text-amber-50">
        <WaveDivider />
      </div>

      {/* About — cream bg */}
      <About
        data={about}
        meta={meta}
        className="bg-amber-50 text-amber-600"
      />

      {/* Menu section — white bg with warm accent */}
      <div className="text-white">
        <WaveDivider />
      </div>
      <Services
        data={services}
        sectionLabel="Menu Kami"
        sectionDesc="Pilihan menu terbaik yang kami siapkan dengan bahan segar setiap harinya"
        className="bg-white text-amber-500"
        cardVariant="default"
      />
      <div className="text-amber-50">
        <WaveDivider />
      </div>

      {/* Testimonials — warm cream */}
      <Testimonials
        data={testimonials}
        className="bg-amber-50 text-amber-600"
      />

      {/* Contact — dark amber */}
      <Contact
        data={contact}
        hero={hero}
        meta={meta}
        className="bg-amber-800 text-white [&_h2]:text-white [&_p]:text-amber-100 [&_.bg-slate-50]:bg-amber-900 [&_.text-slate-800]:text-white [&_.text-slate-700]:text-amber-100 [&_.text-slate-400]:text-amber-400 [&_.text-slate-500]:text-amber-200"
      />

      <Footer
        businessName={meta.businessName}
        tagline={meta.tagline}
        instagram={contact.instagram}
      />
    </div>
  )
}

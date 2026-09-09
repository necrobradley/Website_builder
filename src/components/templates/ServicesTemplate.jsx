/**
 * ServicesTemplate — Template A
 * Karakter: Clean, Professional, Lots of whitespace, Strong CTA
 * Color palette: Slate + Blue accent
 *
 * Props: (semua diterima melalui WebsiteRenderer)
 *   data  : object  — full website data (meta, hero, about, services, testimonials, contact)
 *   theme : string  — optional theme hint
 */
import Hero          from '../sections/Hero'
import About         from '../sections/About'
import Services      from '../sections/Services'
import Testimonials  from '../sections/Testimonials'
import Contact       from '../sections/Contact'

// Minimal navbar untuk template profesional
function Navbar({ businessName }) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-100">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <span className="font-bold text-lg text-blue-600 tracking-tight">
          {businessName}
        </span>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#about"        className="hover:text-blue-600 transition-colors">Tentang</a>
          <a href="#services"     className="hover:text-blue-600 transition-colors">Layanan</a>
          <a href="#testimonials" className="hover:text-blue-600 transition-colors">Testimoni</a>
          <a href="#contact"      className="hover:text-blue-600 transition-colors">Kontak</a>
        </nav>
      </div>
    </header>
  )
}

function Footer({ businessName, tagline }) {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-white">{businessName}</span>
        <span>{tagline}</span>
        <span>© {new Date().getFullYear()} Dibuat dengan ❤️</span>
      </div>
    </footer>
  )
}

export default function ServicesTemplate({ data = {}, theme }) {
  const { meta = {}, hero = {}, about = {}, services = [], testimonials = [], contact = {} } = data

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Navbar */}
      <Navbar businessName={meta.businessName} />

      {/* Hero — clean blue gradient */}
      <Hero
        data={hero}
        contact={contact}
        className="bg-gradient-to-br from-blue-50 via-white to-slate-50 text-slate-900"
        theme="services"
      />

      {/* About — white bg */}
      <About
        data={about}
        meta={meta}
        className="bg-white text-blue-600"
      />

      {/* Divider */}
      <div className="mx-auto max-w-6xl px-6">
        <hr className="border-slate-100" />
      </div>

      {/* Services — light slate bg */}
      <Services
        data={services}
        sectionLabel="Layanan Kami"
        sectionDesc="Kami menyediakan berbagai layanan profesional untuk membantu bisnis Anda berkembang"
        className="bg-slate-50 text-blue-600"
        cardVariant="default"
      />

      {/* Testimonials — white */}
      <Testimonials
        data={testimonials}
        className="bg-white text-blue-600"
      />

      {/* Contact — blue accent */}
      <Contact
        data={contact}
        hero={hero}
        meta={meta}
        className="bg-blue-600 text-white [&_h2]:text-white [&_p]:text-blue-100 [&_.bg-slate-50]:bg-blue-700 [&_.text-slate-800]:text-white [&_.text-slate-700]:text-blue-100 [&_.text-slate-400]:text-blue-300 [&_.text-slate-500]:text-blue-200"
      />

      <Footer businessName={meta.businessName} tagline={meta.tagline} />
    </div>
  )
}

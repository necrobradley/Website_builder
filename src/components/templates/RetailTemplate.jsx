/**
 * RetailTemplate — Template C
 * Karakter: Bold, Compact, Product-focused
 * Color palette: Indigo / Violet bold tones
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
import Container     from '../ui/Container'

// Bold navbar
function Navbar({ businessName, whatsappNumber, ctaWhatsappMessage }) {
  const waUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(ctaWhatsappMessage ?? '')}`
    : '#'

  return (
    <header className="sticky top-0 z-50 bg-violet-700">
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        <span className="font-black text-lg text-white tracking-tight uppercase">
          {businessName}
        </span>
        <div className="flex items-center gap-3">
          <nav className="hidden md:flex items-center gap-4 text-sm font-semibold text-violet-200">
            <a href="#about"        className="hover:text-white transition-colors">Tentang</a>
            <a href="#services"     className="hover:text-white transition-colors">Produk</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Ulasan</a>
            <a href="#contact"      className="hover:text-white transition-colors">Kontak</a>
          </nav>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-white text-violet-700 text-sm font-bold px-4 py-1.5 rounded-full hover:bg-violet-50 transition-colors"
          >
            Belanja
          </a>
        </div>
      </div>
    </header>
  )
}

// Keunggulan / advantages section — retail specific
function Advantages() {
  const items = [
    { icon: '🚚', title: 'Pengiriman Cepat', desc: 'Kirim ke seluruh Indonesia dalam 2-5 hari kerja' },
    { icon: '✅', title: 'Produk Original', desc: '100% original dari pengrajin lokal bersertifikat' },
    { icon: '🔄', title: 'Garansi Produk', desc: 'Garansi retur jika produk tidak sesuai deskripsi' },
    { icon: '💳', title: 'Bayar Apa Saja', desc: 'Transfer bank, e-wallet, COD tersedia' },
  ]
  return (
    <section id="advantages" className="py-16 bg-violet-50">
      <Container>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-violet-900">Kenapa Pilih Kami?</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.title} className="bg-white rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-violet-900 text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Footer({ businessName, tagline, instagram }) {
  return (
    <footer className="bg-violet-950 text-violet-400 py-8">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
        <span className="font-black text-white uppercase tracking-widest">{businessName}</span>
        {instagram && (
          <span className="text-violet-300">{instagram}</span>
        )}
        <span className="text-xs">© {new Date().getFullYear()} {tagline}</span>
      </div>
    </footer>
  )
}

export default function RetailTemplate({ data = {}, theme }) {
  const { meta = {}, hero = {}, about = {}, services = [], testimonials = [], contact = {} } = data

  return (
    <div className="min-h-screen bg-white text-violet-900">
      {/* Navbar */}
      <Navbar
        businessName={meta.businessName}
        whatsappNumber={contact.whatsappNumber}
        ctaWhatsappMessage={hero.ctaWhatsappMessage}
      />

      {/* Hero — bold violet gradient */}
      <Hero
        data={hero}
        contact={contact}
        className="bg-gradient-to-br from-violet-700 via-indigo-700 to-violet-900 text-white"
        theme="retail"
      />

      {/* About — compact, violet accent */}
      <About
        data={about}
        meta={meta}
        className="bg-white text-violet-600"
      />

      {/* Products — compact grid */}
      <Services
        data={services}
        sectionLabel="Produk Kami"
        sectionDesc="Koleksi terbaik kami yang siap dikirim ke seluruh Indonesia"
        className="bg-slate-50 text-violet-600"
        cardVariant="default"
      />

      {/* Keunggulan — static retail-specific section */}
      <Advantages />

      {/* Testimonials */}
      <Testimonials
        data={testimonials}
        className="bg-white text-violet-600"
      />

      {/* Contact — dark violet */}
      <Contact
        data={contact}
        hero={hero}
        meta={meta}
        className="bg-violet-700 text-white [&_h2]:text-white [&_p]:text-violet-100 [&_.bg-slate-50]:bg-violet-800 [&_.text-slate-800]:text-white [&_.text-slate-700]:text-violet-100 [&_.text-slate-400]:text-violet-300 [&_.text-slate-500]:text-violet-200"
      />

      <Footer
        businessName={meta.businessName}
        tagline={meta.tagline}
        instagram={contact.instagram}
      />
    </div>
  )
}

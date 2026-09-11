/**
 * mockWebsiteData.js
 *
 * Mock JSON datasets mengikuti kontrak FRD.
 * Digunakan oleh Dev 2B untuk development UI sebelum LLM API tersedia.
 * Dev 2A akan mengganti ini dengan data real dari state/LLM output.
 *
 * JSON Contract:
 *   meta         : { businessName, category, tagline }
 *   hero         : { title, subtitle, ctaText, ctaWhatsappMessage }
 *   about        : { description, vision, values[] }
 *   services     : [{ name, description, priceEstimate, icon? }]
 *   testimonials : [{ name, text, rating }]
 *   contact      : { whatsappNumber, address, instagram, email }
 */

// ============================================================
// TEMPLATE B — F&B (Warung Kopi Sejahtera)
// Test case utama capstone project
// ============================================================
export const mockFnbData = {
  meta: {
    businessName: 'Warung Kopi Sejahtera',
    category: 'F&B',
    tagline: 'Kopi nyaman untuk teman nugas',
  },
  hero: {
    title: 'Kopi Enak, Teman Nugas',
    subtitle: 'Tempat nyaman untuk nongkrong, bekerja, dan menikmati kopi pilihan terbaik',
    ctaText: 'Pesan via WhatsApp',
    ctaWhatsappMessage: 'Halo, saya ingin pesan kopi di Warung Kopi Sejahtera',
  },
  about: {
    description:
      'Warung Kopi Sejahtera hadir sejak 2018 sebagai tempat nyaman untuk beristirahat sambil menikmati kopi berkualitas. Kami menggunakan biji kopi pilihan dari petani lokal Nusantara.',
    vision: 'Menjadi tempat kopi favorit warga Surabaya yang mengutamakan kenyamanan dan cita rasa.',
    values: ['Kopi segar dari biji pilihan', 'Harga ramah di kantong', 'Suasana nyaman untuk bekerja'],
  },
  services: [
    {
      name: 'Kopi Tubruk',
      description: 'Kopi klasik dengan cita rasa kuat dan aroma yang menggugah selera',
      priceEstimate: 'Rp15.000',
      icon: '☕',
    },
    {
      name: 'Roti Bakar',
      description: 'Roti bakar dengan berbagai pilihan topping, renyah di luar lembut di dalam',
      priceEstimate: 'Rp18.000',
      icon: '🍞',
    },
    {
      name: 'Es Kopi Susu',
      description: 'Kopi susu creamy dan segar, cocok untuk hari yang panas',
      priceEstimate: 'Rp20.000',
      icon: '🧋',
    },
    {
      name: 'Pisang Goreng',
      description: 'Pisang goreng crispy dengan balutan tepung renyah, cocok menemani kopi',
      priceEstimate: 'Rp12.000',
      icon: '🍌',
    },
    {
      name: 'Matcha Latte',
      description: 'Perpaduan matcha premium Jepang dengan susu segar yang creamy',
      priceEstimate: 'Rp22.000',
      icon: '🍵',
    },
    {
      name: 'Indomie Spesial',
      description: 'Indomie goreng dengan topping telur dan keju, comfort food favorit',
      priceEstimate: 'Rp16.000',
      icon: '🍜',
    },
  ],
  testimonials: [
    {
      name: 'Budi Santoso',
      text: 'Kopinya enak banget! Tempatnya nyaman buat nugas, WiFinya juga kenceng. Sering balik lagi.',
      rating: 5,
    },
    {
      name: 'Siti Rahayu',
      text: 'Harga terjangkau, suasana homey. Es kopi susunya jadi favorit saya.',
      rating: 5,
    },
    {
      name: 'Ahmad Fauzi',
      text: 'Kalau lagi deadline tugas, pasti ke sini. Kopi tubruknya mantap!',
      rating: 4,
    },
  ],
  contact: {
    whatsappNumber: '628123456789',
    address: 'Jl. Raya Darmo No. 15, Surabaya',
    instagram: '@warungkopisejahtera',
    email: 'hello@warungkopi.id',
  },
}

// ============================================================
// TEMPLATE A — Jasa / Konsultan
// ============================================================
export const mockServicesData = {
  meta: {
    businessName: 'Solusi Digital Pro',
    category: 'Jasa & Konsultasi',
    tagline: 'Konsultan Digital terpercaya untuk UMKM',
  },
  hero: {
    title: 'Solusi Profesional Untuk Bisnis Anda',
    subtitle: 'Kami membantu UMKM bertransformasi digital dengan strategi yang tepat dan terukur',
    ctaText: 'Konsultasi Gratis Sekarang',
    ctaWhatsappMessage: 'Halo, saya ingin konsultasi gratis tentang layanan digital Solusi Digital Pro',
  },
  about: {
    description:
      'Solusi Digital Pro adalah konsultan teknologi dan pemasaran digital yang berpengalaman membantu lebih dari 200 UMKM berkembang secara online sejak 2019.',
    vision: 'Menjadi mitra teknologi terpercaya bagi setiap pelaku usaha di Indonesia.',
    values: [
      'Solusi tepat sasaran untuk setiap bisnis',
      'Transparan dalam proses dan harga',
      'Dukungan after-sales 24/7',
    ],
  },
  services: [
    {
      name: 'Pembuatan Website',
      description: 'Website profesional yang mobile-friendly dan siap untuk meningkatkan konversi bisnis Anda',
      priceEstimate: 'Mulai Rp2.500.000',
      icon: '🌐',
    },
    {
      name: 'Digital Marketing',
      description: 'Strategi marketing digital komprehensif: SEO, Google Ads, dan Social Media Management',
      priceEstimate: 'Mulai Rp1.500.000/bln',
      icon: '📈',
    },
    {
      name: 'Konsultasi Bisnis',
      description: 'Sesi konsultasi mendalam untuk strategi digital bisnis Anda bersama ahli berpengalaman',
      priceEstimate: 'Rp500.000/sesi',
      icon: '💼',
    },
    {
      name: 'Desain Grafis',
      description: 'Identitas visual merek yang kuat: logo, banner, dan materi promosi profesional',
      priceEstimate: 'Mulai Rp750.000',
      icon: '🎨',
    },
    {
      name: 'Kelola Media Sosial',
      description: 'Pengelolaan media sosial harian dengan konten berkualitas dan engagement aktif',
      priceEstimate: 'Mulai Rp1.200.000/bln',
      icon: '📱',
    },
    {
      name: 'Pelatihan Digital',
      description: 'Pelatihan tim Anda untuk mengelola aset digital secara mandiri dan efektif',
      priceEstimate: 'Rp800.000/sesi',
      icon: '🎓',
    },
  ],
  testimonials: [
    {
      name: 'Dewi Hartono',
      text: 'Website kami langsung ramai sejak dikerjakan Solusi Digital Pro. Omzet naik 40% dalam 3 bulan.',
      rating: 5,
    },
    {
      name: 'Rian Prakoso',
      text: 'Konsultasinya sangat detail dan actionable. Tim mereka responsif dan profesional.',
      rating: 5,
    },
    {
      name: 'Fatimah Zuhra',
      text: 'Harga sangat worth it dengan hasil yang didapat. Sangat recommended untuk UMKM!',
      rating: 5,
    },
  ],
  contact: {
    whatsappNumber: '628987654321',
    address: 'Jl. Sudirman Kav. 52, Jakarta Selatan',
    instagram: '@solusidgitalpro',
    email: 'info@solusidgitalpro.id',
  },
}

// ============================================================
// TEMPLATE C — Retail / Produk
// ============================================================
export const mockRetailData = {
  meta: {
    businessName: 'Batik Nusantara',
    category: 'Retail & Fashion',
    tagline: 'Produk lokal berkualitas tinggi',
  },
  hero: {
    title: 'Produk Lokal Berkualitas Tinggi',
    subtitle: 'Koleksi batik premium dari pengrajin lokal terbaik Nusantara. Bangga pakai produk Indonesia!',
    ctaText: 'Belanja Sekarang',
    ctaWhatsappMessage: 'Halo, saya tertarik dengan koleksi Batik Nusantara. Boleh lihat katalog lengkapnya?',
  },
  about: {
    description:
      'Batik Nusantara menghadirkan koleksi batik premium yang dibuat langsung oleh pengrajin lokal berpengalaman. Setiap produk dibuat dengan bahan pilihan dan motif autentik dari berbagai penjuru Indonesia.',
    vision: 'Melestarikan budaya batik Indonesia dengan menjangkau pasar modern yang lebih luas.',
    values: [
      'Bahan premium pilihan',
      'Dibuat tangan oleh pengrajin lokal',
      'Pengiriman ke seluruh Indonesia',
    ],
  },
  services: [
    {
      name: 'Batik Tulis Premium',
      description: 'Batik tulis tangan asli dengan motif khas Jawa, tersedia dalam berbagai ukuran',
      priceEstimate: 'Rp350.000',
      icon: '🎨',
    },
    {
      name: 'Batik Cap Modern',
      description: 'Batik cap dengan desain kontemporer cocok untuk casual dan formal',
      priceEstimate: 'Rp175.000',
      icon: '👔',
    },
    {
      name: 'Kemeja Batik',
      description: 'Kemeja batik pria dan wanita dengan potongan modern dan bahan nyaman',
      priceEstimate: 'Rp225.000',
      icon: '👕',
    },
    {
      name: 'Dress Batik',
      description: 'Dress batik elegan untuk berbagai kesempatan formal maupun semi-formal',
      priceEstimate: 'Rp280.000',
      icon: '👗',
    },
    {
      name: 'Tas Batik',
      description: 'Tas batik eksklusif handmade, perpaduan tradisional dan modern',
      priceEstimate: 'Rp195.000',
      icon: '👜',
    },
    {
      name: 'Paket Custom',
      description: 'Pesan batik custom dengan motif dan ukuran sesuai keinginan Anda',
      priceEstimate: 'Hubungi Kami',
      icon: '✨',
    },
  ],
  testimonials: [
    {
      name: 'Kartika Sari',
      text: 'Batiknya cantik banget! Kualitas jahitan rapi dan bahan adem. Sudah order 3 kali!',
      rating: 5,
    },
    {
      name: 'Hendro Wibowo',
      text: 'Kemeja batiknya cocok untuk meeting formal. Banyak yang tanya beli di mana.',
      rating: 5,
    },
    {
      name: 'Nadia Rahman',
      text: 'Pengiriman cepat, packing aman. Batiknya sesuai foto bahkan lebih bagus!',
      rating: 5,
    },
  ],
  contact: {
    whatsappNumber: '628765432109',
    address: 'Jl. Malioboro No. 88, Yogyakarta',
    instagram: '@batiknusantara.id',
    email: 'order@batiknusantara.id',
  },
}

// ============================================================
// DEFAULT EXPORT — mapping untuk WebsiteRenderer
// ============================================================
export const mockDataByTemplate = {
  'template-services': mockServicesData,
  'template-fnb':      mockFnbData,
  'template-retail':   mockRetailData,
}

export default mockFnbData

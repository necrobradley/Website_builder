/**
 * App.jsx — Demo/Development Preview
 *
 * Halaman demo untuk Dev 2B testing.
 * Dev 2A akan mengintegrasikan WebsiteRenderer ke dalam sistem mereka sendiri.
 *
 * Fitur:
 * - Tab selector untuk 3 template
 * - Viewport toggle (desktop / mobile) — US-02
 * - Menggunakan mock data dari mockWebsiteData.js
 */
import { useState } from 'react'
import WebsiteRenderer from './components/WebsiteRenderer'
import { mockDataByTemplate } from './data/mockWebsiteData'
import { useWebsite } from './store/websiteStore.jsx'

const TEMPLATES = [
  { id: 'template-services', label: '🏢 Services', desc: 'Professional & Clean' },
  { id: 'template-fnb',      label: '☕ F&B',       desc: 'Warm & Visual' },
  { id: 'template-retail',   label: '🛍️ Retail',   desc: 'Bold & Compact' },
]

const VIEWPORTS = [
  { id: 'desktop', label: '🖥️ Desktop', width: '100%' },
  { id: 'mobile',  label: '📱 Mobile',  width: '390px' },
]

export default function App() {
  const [activeTemplate, setActiveTemplate] = useState('template-fnb')
  const [activeViewport, setActiveViewport] = useState('desktop')
  // ponytail: E2E wiring for TSK-04A — no extra page, reuse same preview
  const { website, generate, loading } = useWebsite()
  const [e2eInput, setE2eInput] = useState('Warung Kopi Sejahtera, jual kopi tubruk dan roti bakar di Surabaya, target anak muda nugas, wa 08123456789')
  const isE2EActive = !!website
  const currentData = isE2EActive ? website : mockDataByTemplate[activeTemplate]
  const effectiveTemplate = isE2EActive ? website.templateId : activeTemplate
  const currentViewport = VIEWPORTS.find((v) => v.id === activeViewport)

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* E2E bar — TSK-04A/06A (Dev 1A/1B) — ponytail: 1 bar */}
      <div className="bg-white border-b px-3 py-2 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
        <input value={e2eInput} onChange={(e) => setE2eInput(e.target.value)} placeholder="Deskripsi bisnis..." className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button onClick={() => generate(e2eInput)} disabled={loading || !e2eInput.trim()} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold disabled:opacity-50 hover:bg-blue-700 shrink-0">
          {loading ? 'Generating...' : 'Generate'}
        </button>
        {isE2EActive && (
          <button onClick={async () => { const { exportZip, downloadBlob } = await import('./lib/export.js'); const blob = await exportZip(website); downloadBlob(blob); }} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 shrink-0">
            Download ZIP
          </button>
        )}
        {isE2EActive && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full self-center">E2E: {website.meta?.businessName}</span>}
      </div>
      {/* Dev toolbar */}
      <div className="bg-slate-900 text-white px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 shrink-0">
        {/* Brand */}
        <span className="font-bold text-sm text-slate-300 shrink-0">
          🛠️ Dev 2B Preview
        </span>

        {/* Template selector */}
        <div className="flex items-center gap-1 bg-slate-800 rounded-xl p-1">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTemplate(t.id)}
              className={[
                'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150',
                activeTemplate === t.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-400 hover:text-white',
              ].join(' ')}
              title={t.desc}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Viewport toggle — US-02 */}
        <div className="flex items-center gap-1 bg-slate-800 rounded-xl p-1 ml-auto sm:ml-0">
          {VIEWPORTS.map((v) => (
            <button
              key={v.id}
              onClick={() => setActiveViewport(v.id)}
              className={[
                'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150',
                activeViewport === v.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-400 hover:text-white',
              ].join(' ')}
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* Info badge */}
        <div className="hidden sm:flex ml-auto items-center gap-2">
          <span className="text-xs text-slate-500">Mock data aktif</span>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </div>
      </div>

      {/* Preview area */}
      <div className="flex-1 flex justify-center p-4 md:p-8 overflow-auto">
        <div
          className={[
            'transition-all duration-300 ease-in-out bg-white shadow-2xl rounded-lg overflow-hidden',
            activeViewport === 'mobile' ? 'ring-8 ring-slate-700 rounded-[2rem]' : 'w-full',
          ].join(' ')}
          style={{
            width: currentViewport.width,
            maxWidth: '100%',
          }}
        >
          {/* Website renderer — same API Dev 2A will use */}
           <div className={activeViewport === 'mobile' ? 'overflow-y-auto max-h-[85vh]' : ''}>
             <WebsiteRenderer
               templateId={effectiveTemplate}
               data={currentData}
               theme={effectiveTemplate.replace('template-', '')}
             />
           </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="bg-slate-900 text-slate-500 text-xs px-4 py-2 text-center shrink-0">
        Dev 2B Output — Siap integrasi dengan Dev 2A via{' '}
        <code className="text-slate-400">&lt;WebsiteRenderer templateId="..." data={'{...}'} /&gt;</code>
      </div>
    </div>
  )
}

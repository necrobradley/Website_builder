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

  const currentData = mockDataByTemplate[activeTemplate]
  const currentViewport = VIEWPORTS.find((v) => v.id === activeViewport)

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
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
              templateId={activeTemplate}
              data={currentData}
              theme={activeTemplate.replace('template-', '')}
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

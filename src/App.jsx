import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 gap-6">
      <h1 className="text-4xl font-bold">React + Tailwind v4</h1>
      <p className="text-gray-600">
        Edit <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">src/App.jsx</code> and save to test HMR
      </p>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        count is {count}
      </button>
    </div>
  )
}

export default App

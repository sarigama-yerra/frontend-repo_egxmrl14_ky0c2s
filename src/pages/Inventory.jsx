import { useEffect, useState } from 'react'
import { api } from '../lib/api'

const text = '#e5e7eb'

export default function Inventory() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const data = await api.get('/inventory')
        setItems(data.items || [])
      } catch (e) {
        // noop
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return <div>Loading inventory...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold">Inventory</h1>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((v) => (
          <div key={v._id} className="rounded-2xl p-5 bg-white/5 backdrop-blur-xl border border-white/10">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-300/80">{v.stock_number || '—'}</div>
              <div className="px-2 py-1 rounded bg-white/10 text-xs">{v.status}</div>
            </div>
            <div className="mt-2 text-xl font-semibold" style={{color: text}}>{v.year} {v.make} {v.model}</div>
            <div className="mt-1 text-slate-300/80">VIN • {v.vin?.slice(-6) || '—'}</div>
            {v.price && <div className="mt-3 text-lg" style={{color: text}}>${v.price.toLocaleString()}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

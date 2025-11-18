import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

gsap.registerPlugin(ScrollTrigger)

const text = '#e5e7eb'

function Metric({ label, value }) {
  return (
    <div className="metric glass-card rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
      <div className="text-sm text-slate-300/80">{label}</div>
      <div className="mt-2 text-3xl font-semibold" style={{color: text}}>{value}</div>
    </div>
  )
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null)
  const [trend, setTrend] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const data = await api.get('/metrics/dashboard')
        setMetrics(data)
        const weeks = data.weekly_collections || []
        const parsed = weeks.map((w, idx) => ({ name: `W${idx+1}`, amount: w.total || 0 }))
        setTrend(parsed)
      } catch (e) {
        // noop
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.metric', { opacity: 0, y: 20, stagger: 0.1, duration: 0.6, ease: 'power2.out' })
      gsap.from('.chart', { scrollTrigger: { trigger: '.chart', start: 'top 80%' }, opacity: 0, y: 50, duration: 0.8 })
    })
    return () => ctx.revert()
  }, [])

  if (loading) return <div>Loading dashboard...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Metric label="YTD Sales" value={metrics?.ytd_sales ?? '—'} />
        <Metric label="Inventory" value={metrics?.inventory_count ?? '—'} />
        <Metric label="Weekly Collections" value={`$${metrics?.weekly_total ?? 0}`} />
        <Metric label="Delinquency Rate" value={`${metrics?.delinquency_rate ?? 0}%`} />
      </div>

      <div className="mt-8 chart rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#0b1220', border: '1px solid rgba(255,255,255,0.1)', color: '#e5e7eb' }} />
            <Line type="monotone" dataKey="amount" stroke="#ff6b35" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

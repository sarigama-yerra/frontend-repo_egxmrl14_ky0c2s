import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Spline from '@splinetool/react-spline'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const bg = '#0a0e14'
const text = '#e5e7eb'
const accent = '#ff6b35'

function MetricCard({ label, value }) {
  return (
    <div className="metric-card rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="text-sm text-slate-300/80">{label}</div>
      <div className="mt-2 text-3xl font-semibold" style={{color: text}}>{value}</div>
    </div>
  )
}

function App() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.metric-card', { opacity: 0, y: 20, stagger: 0.1, duration: 0.6, ease: 'power2.out' })
      gsap.from('.chart', {
        scrollTrigger: { trigger: '.chart', start: 'top 80%' },
        opacity: 0, y: 50, duration: 0.8, ease: 'power2.out'
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen" style={{ background: bg, color: text }}>
      <div className="relative h-[60vh] overflow-hidden">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e14] via-[#0a0e14]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 flex items-end md:items-center">
          <div className="px-6 md:px-12 w-full">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight" style={{ color: text }}>
                BBB Auto Sales DMS
              </h1>
              <p className="mt-4 text-slate-300/90 md:text-lg max-w-2xl">
                A modern Buy Here Pay Here dealership system with glass morphism UI and buttery GSAP animations.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/login" className="px-5 py-2.5 rounded-xl" style={{ background: accent, color: '#0a0e14' }}>
                  Sign in to continue
                </Link>
                <a href="/test" className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/15 hover:bg-white/15">
                  Backend test
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="px-6 md:px-12 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard label="YTD Sales" value="—" />
          <MetricCard label="Inventory Count" value="—" />
          <MetricCard label="Weekly Collections" value="$—" />
          <MetricCard label="Delinquency Rate" value="—%" />
        </div>
      </section>

      <section className="px-6 md:px-12 py-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="chart rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 h-72" />
          <div className="chart rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 h-72" />
        </div>
      </section>

      <footer className="px-6 md:px-12 py-12">
        <div className="max-w-6xl mx-auto text-slate-400/80 text-sm">
          Built with GSAP, glass morphism, and love. Accent color {accent}.
        </div>
      </footer>
    </div>
  )
}

export default App

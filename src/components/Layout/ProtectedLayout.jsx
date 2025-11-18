import { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { api, getToken, clearToken } from '../../lib/api'
import { gsap } from 'gsap'

const bg = '#0a0e14'
const text = '#e5e7eb'
const accent = '#ff6b35'

export default function ProtectedLayout() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = getToken()
    if (!token) {
      navigate('/login')
      return
    }
    ;(async () => {
      try {
        const session = await api.get('/auth/session')
        setUser(session.user)
      } catch (e) {
        clearToken()
        navigate('/login')
      } finally {
        setLoading(false)
      }
    })()
  }, [navigate])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.glass-card', { opacity: 0, y: 16, duration: 0.6, stagger: 0.06, ease: 'power2.out' })
    })
    return () => ctx.revert()
  }, [])

  if (loading) return <div className="min-h-screen flex items-center justify-center" style={{ background: bg, color: text }}>Loading...</div>

  return (
    <div className="min-h-screen flex" style={{ background: bg, color: text }}>
      <aside className="hidden md:flex md:w-64 p-4 flex-col gap-3 bg-white/5 backdrop-blur-xl border-r border-white/10">
        <div className="text-xl font-bold">BBB DMS</div>
        <NavLink to="/dashboard" className={({isActive}) => `glass-card px-4 py-2 rounded-lg ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`}>Dashboard</NavLink>
        <NavLink to="/inventory" className={({isActive}) => `glass-card px-4 py-2 rounded-lg ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`}>Inventory</NavLink>
        <NavLink to="/sales" className={({isActive}) => `glass-card px-4 py-2 rounded-lg ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`}>Sales</NavLink>
        <NavLink to="/collections" className={({isActive}) => `glass-card px-4 py-2 rounded-lg ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`}>Collections</NavLink>
        {user?.role === 'admin' && (
          <>
            <div className="mt-2 text-xs uppercase tracking-wide text-slate-400/70">Admin</div>
            <NavLink to="/reports/commission" className={({isActive}) => `glass-card px-4 py-2 rounded-lg ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`}>Commission</NavLink>
            <NavLink to="/reports/closing" className={({isActive}) => `glass-card px-4 py-2 rounded-lg ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`}>Daily Closing</NavLink>
            <NavLink to="/data" className={({isActive}) => `glass-card px-4 py-2 rounded-lg ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`}>Data</NavLink>
            <NavLink to="/settings" className={({isActive}) => `glass-card px-4 py-2 rounded-lg ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`}>Settings</NavLink>
          </>
        )}
        <div className="mt-auto text-sm text-slate-400/70">{user?.email}</div>
        <button onClick={() => { clearToken(); navigate('/login') }} className="mt-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20">Sign out</button>
      </aside>

      <main className="flex-1 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  )
}

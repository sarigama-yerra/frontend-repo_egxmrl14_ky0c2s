import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, setToken } from '../../lib/api'

const bg = '#0a0e14'
const text = '#e5e7eb'
const accent = '#ff6b35'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await api.post('/auth/login', { email, password })
      if (data && data.token) {
        setToken(data.token)
        navigate('/dashboard')
      } else {
        throw new Error('Invalid response from server')
      }
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: bg, color: text }}>
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="mt-2 text-slate-300/80">Sign in to your dealership workspace</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm mb-2">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/15 focus:outline-none focus:ring-2"
              style={{ color: text }} />
          </div>
          <div>
            <label className="block text-sm mb-2">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/15 focus:outline-none focus:ring-2"
              style={{ color: text }} />
          </div>
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <button type="submit" disabled={loading}
            className="w-full px-4 py-2.5 rounded-xl font-semibold shadow hover:shadow-lg transition-all"
            style={{ background: accent, color: '#0a0e14', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

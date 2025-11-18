// Simple API helper with auth token handling
const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export function getToken() {
  return localStorage.getItem('session_token') || ''
}

export function setToken(token) {
  localStorage.setItem('session_token', token)
}

export function clearToken() {
  localStorage.removeItem('session_token')
}

async function request(path, options = {}) {
  const headers = new Headers(options.headers || {})
  headers.set('Content-Type', 'application/json')
  const token = getToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  })
  const contentType = res.headers.get('content-type') || ''
  const data = contentType.includes('application/json') ? await res.json().catch(() => ({})) : await res.text()
  if (!res.ok) {
    const message = (data && (data.detail || data.message)) || res.statusText
    throw new Error(message)
  }
  return data
}

export const api = {
  base: API_BASE,
  get: (path) => request(path, { method: 'GET' }),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: 'PUT', body: JSON.stringify(body) }),
  del: (path) => request(path, { method: 'DELETE' }),
}

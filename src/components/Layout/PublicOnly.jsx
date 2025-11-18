import { Navigate, Outlet } from 'react-router-dom'
import { getToken } from '../../lib/api'

export default function PublicOnly() {
  const token = getToken()
  if (token) return <Navigate to="/dashboard" replace />
  return <Outlet />
}

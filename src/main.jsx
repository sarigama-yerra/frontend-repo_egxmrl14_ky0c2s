import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'
import Test from './Test'
import './index.css'

// Auth & Layout
import Login from './components/Auth/Login'
import ProtectedLayout from './components/Layout/ProtectedLayout'
import PublicOnly from './components/Layout/PublicOnly'

// Pages
import Dashboard from './pages/Dashboard'
import Inventory from './pages/Inventory'
import Sales from './pages/Sales'
import Collections from './pages/Collections'
import ReportsCommission from './pages/ReportsCommission'
import ReportsClosing from './pages/ReportsClosing'
import Data from './pages/Data'
import Settings from './pages/Settings'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public landing page */}
        <Route path="/" element={<App />} />
        <Route path="/test" element={<Test />} />

        {/* Auth */}
        <Route element={<PublicOnly />}> 
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Protected app */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/collections" element={<Collections />} />
          {/* Admin-only sections show in sidebar only for admins */}
          <Route path="/reports/commission" element={<ReportsCommission />} />
          <Route path="/reports/closing" element={<ReportsClosing />} />
          <Route path="/data" element={<Data />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

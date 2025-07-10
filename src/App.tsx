import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Components
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import PackageDeals from './components/PackageDeals'
import BookingCalendar from './components/BookingCalendar'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'
import Footer from './components/Footer'

// Context
import { AdminProvider } from './context/AdminContext'

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <Services />
      <PackageDeals />
      <BookingCalendar />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <AdminProvider>
      <Router>
        <div className="min-h-screen">
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </AdminProvider>
  )
}

export default App
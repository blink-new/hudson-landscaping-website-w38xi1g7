import { useState } from 'react'
import { Menu, X, Phone, Mail } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-green-700">Hudson Landscaping & Snow</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-green-700 transition"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('packages')}
              className="text-gray-700 hover:text-green-700 transition"
            >
              Packages
            </button>
            <button 
              onClick={() => scrollToSection('booking')}
              className="text-gray-700 hover:text-green-700 transition"
            >
              Book Now
            </button>
            <a href="/admin" className="text-gray-700 hover:text-green-700 transition">
              Admin
            </a>
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-600">
              <Phone size={16} className="mr-1" />
              <span>216-316-7289</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Mail size={16} className="mr-1" />
              <span>dniaura@iCloud.com</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t">
            <div className="flex flex-col space-y-3 pt-4">
              <button 
                onClick={() => scrollToSection('services')}
                className="text-left text-gray-700 hover:text-green-700 transition"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('packages')}
                className="text-left text-gray-700 hover:text-green-700 transition"
              >
                Packages
              </button>
              <button 
                onClick={() => scrollToSection('booking')}
                className="text-left text-gray-700 hover:text-green-700 transition"
              >
                Book Now
              </button>
              <a href="/admin" className="text-left text-gray-700 hover:text-green-700 transition">
                Admin
              </a>
              <div className="pt-2 border-t">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Phone size={16} className="mr-2" />
                  <span>216-316-7289 | 216-379-1335</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail size={16} className="mr-2" />
                  <span>dniaura@iCloud.com</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
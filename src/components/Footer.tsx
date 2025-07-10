import { Leaf, Snowflake, Phone, Mail, Clock, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="flex items-center space-x-2 mr-3">
                <div className="bg-green-600 p-2 rounded-full">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                <div className="bg-blue-600 p-2 rounded-full">
                  <Snowflake className="h-5 w-5 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold">Hudson Landscaping & Snow Services</h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Professional landscaping and snow removal services for all seasons. 
              We keep your property beautiful and accessible year-round with our 
              comprehensive seasonal service packages.
            </p>
            <div className="flex items-center text-gray-300 mb-2">
              <Clock className="h-4 w-4 mr-2" />
              <span>Available 24/7 for emergency snow removal</span>
            </div>
            <div className="flex items-center text-gray-300">
              <MapPin className="h-4 w-4 mr-2" />
              <span>Serving the Greater Cleveland Area</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Spring Cleanup & Preparation</li>
              <li>Summer Lawn Maintenance</li>
              <li>Fall Leaf Removal & Winterizing</li>
              <li>Winter Snow & Ice Management</li>
              <li>Tree & Shrub Care</li>
              <li>Landscape Design & Installation</li>
              <li>Emergency Snow Removal</li>
              <li>Commercial Property Services</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-3 text-green-400" />
                <div>
                  <p className="font-medium">Primary: 216-316-7289</p>
                  <p className="text-sm">Secondary: 216-379-1335</p>
                </div>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-3 text-green-400" />
                <div>
                  <p className="font-medium">dniaura@iCloud.com</p>
                  <p className="text-sm">ethanpmoore@iCloud.com</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Quick Links</h4>
              <div className="space-y-1">
                <button 
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-gray-300 hover:text-green-400 transition text-sm"
                >
                  View Services
                </button>
                <button 
                  onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-gray-300 hover:text-green-400 transition text-sm"
                >
                  Package Deals
                </button>
                <button 
                  onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-gray-300 hover:text-green-400 transition text-sm"
                >
                  Book Appointment
                </button>
                <a 
                  href="/admin"
                  className="block text-gray-300 hover:text-green-400 transition text-sm"
                >
                  Admin Login
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              <p>&copy; {currentYear} Hudson Landscaping & Snow Services. All rights reserved.</p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Professional • Reliable • Year-Round Service</span>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Licensed and insured for your protection. Free estimates available.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
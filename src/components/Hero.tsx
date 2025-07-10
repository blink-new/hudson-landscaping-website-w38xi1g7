import { Button } from './ui/button'
import { Leaf, Snowflake, Calendar, Phone } from 'lucide-react'

export default function Hero() {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative bg-gradient-to-br from-green-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Snowflake className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Hudson Landscaping 
            <span className="text-green-600"> & </span>
            <span className="text-blue-600">Snow Services</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Professional landscaping and snow removal services for all seasons. 
            From spring cleanup to winter snow plowing, we keep your property beautiful year-round.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <Button 
              onClick={scrollToBooking} 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Appointment
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3"
              onClick={() => window.open('tel:2163167289')}
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Now
            </Button>
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Primary Contact</h3>
              <p className="text-gray-600">216-316-7289</p>
              <p className="text-gray-600">dniaura@iCloud.com</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Secondary Contact</h3>
              <p className="text-gray-600">216-379-1335</p>
              <p className="text-gray-600">ethanpmoore@iCloud.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
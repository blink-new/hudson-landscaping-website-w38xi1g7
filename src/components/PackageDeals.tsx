import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Check, Star, Calendar, DollarSign, Clock } from 'lucide-react'

const packageDeals = [
  {
    id: 'pkg_1',
    name: 'Spring Starter Package',
    description: 'Complete spring property preparation to get your lawn ready for the growing season',
    services: ['Spring Cleanup', 'Lawn Dethatching', 'Fertilizer Application', 'Mulch Installation'],
    price: 299.99,
    duration: '3 months',
    season: 'spring',
    popular: true,
    savings: '$100'
  },
  {
    id: 'pkg_2',
    name: 'Summer Maintenance Pro',
    description: 'Weekly lawn care and garden maintenance to keep your property beautiful all summer',
    services: ['Weekly Lawn Mowing', 'Flower Bed Weeding', 'Lawn Fertilization', 'Pest Monitoring'],
    price: 199.99,
    duration: 'monthly',
    season: 'summer',
    popular: true,
    savings: '$75'
  },
  {
    id: 'pkg_3',
    name: 'Fall Cleanup Complete',
    description: 'Comprehensive fall preparation to protect your property through winter',
    services: ['Leaf Removal', 'Gutter Cleaning', 'Tree Pruning', 'Winterizing Irrigation'],
    price: 399.99,
    duration: '2 months',
    season: 'fall',
    popular: false,
    savings: '$125'
  },
  {
    id: 'pkg_4',
    name: 'Winter Snow Protection',
    description: 'Full winter snow and ice management for safe and accessible property',
    services: ['Snow Plowing', 'Sidewalk Shoveling', 'Ice Control', 'Emergency Snow Service'],
    price: 499.99,
    duration: '4 months',
    season: 'winter',
    popular: true,
    savings: '$150'
  },
  {
    id: 'pkg_5',
    name: 'Year-Round Lawn Care',
    description: 'Complete lawn maintenance program for all seasons',
    services: ['Weekly Mowing', 'Seasonal Fertilization', 'Aeration', 'Overseeding'],
    price: 149.99,
    duration: 'monthly',
    season: 'all',
    popular: true,
    savings: '$50'
  },
  {
    id: 'pkg_6',
    name: 'Tree & Shrub Care',
    description: 'Professional tree and shrub maintenance to keep plants healthy',
    services: ['Tree Pruning', 'Shrub Trimming', 'Tree Fertilization', 'Disease Prevention'],
    price: 249.99,
    duration: '6 months',
    season: 'all',
    popular: false,
    savings: '$80'
  },
  {
    id: 'pkg_7',
    name: 'Garden Deluxe Package',
    description: 'Premium garden design and maintenance for beautiful landscaping',
    services: ['Flower Bed Preparation', 'Planting Annual Flowers', 'Mulch Application', 'Garden Cleanup'],
    price: 349.99,
    duration: '3 months',
    season: 'spring',
    popular: false,
    savings: '$100'
  },
  {
    id: 'pkg_8',
    name: 'Commercial Snow Contract',
    description: 'Priority commercial snow removal service for businesses',
    services: ['Snow Plowing', 'Ice Control', '24/7 Emergency Service', 'Storm Cleanup'],
    price: 899.99,
    duration: '4 months',
    season: 'winter',
    popular: false,
    savings: '$200'
  },
  {
    id: 'pkg_9',
    name: 'Property Preservation Plus',
    description: 'Complete property maintenance to protect your investment',
    services: ['Gutter Cleaning', 'Power Washing', 'Hardscape Cleaning', 'Drainage Inspection'],
    price: 279.99,
    duration: '2 months',
    season: 'fall',
    popular: false,
    savings: '$90'
  },
  {
    id: 'pkg_10',
    name: 'Seasonal Transition Package',
    description: 'Smooth transition between seasons with comprehensive preparation',
    services: ['Seasonal Cleanup', 'Equipment Winterizing', 'Plant Protection', 'Property Preparation'],
    price: 189.99,
    duration: '1 month',
    season: 'all',
    popular: false,
    savings: '$60'
  }
]

const seasonColors = {
  spring: 'bg-green-100 text-green-700',
  summer: 'bg-yellow-100 text-yellow-700',
  fall: 'bg-orange-100 text-orange-700',
  winter: 'bg-blue-100 text-blue-700',
  all: 'bg-purple-100 text-purple-700'
}

export default function PackageDeals() {
  const [selectedSeason, setSelectedSeason] = useState('all')
  
  const filteredPackages = selectedSeason === 'all' 
    ? packageDeals 
    : packageDeals.filter(pkg => pkg.season === selectedSeason || pkg.season === 'all')

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="packages" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Package Deals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Save money with our specially designed package deals for constant customers. 
            All packages include priority scheduling and discounted rates.
          </p>
          
          {/* Season Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['all', 'spring', 'summer', 'fall', 'winter'].map((season) => (
              <Button
                key={season}
                variant={selectedSeason === season ? 'default' : 'outline'}
                onClick={() => setSelectedSeason(season)}
                className="capitalize"
              >
                {season === 'all' ? 'All Seasons' : season}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <Card key={pkg.id} className={`relative hover:shadow-xl transition-shadow ${pkg.popular ? 'ring-2 ring-green-500' : ''}`}>
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-500 text-white px-4 py-1">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <Badge className={seasonColors[pkg.season as keyof typeof seasonColors]}>
                    {pkg.season === 'all' ? 'Year-Round' : pkg.season}
                  </Badge>
                </div>
                <p className="text-gray-600">{pkg.description}</p>
              </CardHeader>
              
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-baseline mb-2">
                    <span className="text-3xl font-bold text-gray-900">${pkg.price}</span>
                    <span className="text-gray-500 ml-2">/ {pkg.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-green-600">
                    <span className="bg-green-100 px-2 py-1 rounded">Save {pkg.savings}</span>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-gray-900">Included Services:</h4>
                  {pkg.services.map((service, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{service}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    <span>Fixed Price</span>
                  </div>
                </div>
                
                <Button 
                  onClick={scrollToBooking}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book This Package
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Need a custom package? Contact us to create a personalized service plan.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <a href="tel:2163167289" className="text-green-600 hover:text-green-700 font-semibold">
              216-316-7289
            </a>
            <span className="hidden sm:inline text-gray-400">|</span>
            <a href="mailto:dniaura@iCloud.com" className="text-green-600 hover:text-green-700 font-semibold">
              dniaura@iCloud.com
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
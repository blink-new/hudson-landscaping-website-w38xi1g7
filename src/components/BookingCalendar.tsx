import { useState } from 'react'
import { Calendar } from './ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { CalendarIcon, Calculator, Phone, Mail } from 'lucide-react'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

// Import services from Services.tsx
const services = {
  spring: [
    { name: 'Spring Cleanup', description: 'Complete yard cleanup after winter', hours: 4, category: 'Cleanup' },
    { name: 'Lawn Dethatching', description: 'Remove dead grass and debris', hours: 3, category: 'Lawn Care' },
    { name: 'Aeration', description: 'Core aeration for healthy grass growth', hours: 2, category: 'Lawn Care' },
    { name: 'Overseeding', description: 'Seed bare spots and thicken lawn', hours: 2, category: 'Lawn Care' },
    { name: 'Fertilizer Application', description: 'Spring fertilizer treatment', hours: 1, category: 'Lawn Care' },
    { name: 'Mulch Installation', description: 'Fresh mulch for flower beds', hours: 3, category: 'Landscaping' },
    { name: 'Tree Pruning', description: 'Prune trees for healthy growth', hours: 4, category: 'Tree Care' },
    { name: 'Shrub Trimming', description: 'Shape and trim shrubs', hours: 2, category: 'Plant Care' },
    // ... truncated for brevity, in real app would include all 25
  ],
  summer: [
    { name: 'Weekly Lawn Mowing', description: 'Regular grass cutting service', hours: 1.5, category: 'Lawn Care' },
    { name: 'Watering Systems Maintenance', description: 'Maintain irrigation systems', hours: 2, category: 'Irrigation' },
    // ... truncated
  ],
  fall: [
    { name: 'Leaf Removal', description: 'Rake and remove fallen leaves', hours: 4, category: 'Cleanup' },
    { name: 'Gutter Cleaning', description: 'Clean gutters before winter', hours: 2, category: 'Maintenance' },
    // ... truncated
  ],
  winter: [
    { name: 'Snow Plowing', description: 'Clear driveways and parking areas', hours: 2, category: 'Snow Removal' },
    { name: 'Sidewalk Shoveling', description: 'Hand shovel walkways', hours: 1, category: 'Snow Removal' },
    // ... truncated
  ]
}

const packageDeals = [
  { id: 'pkg_1', name: 'Spring Starter Package', price: 299.99 },
  { id: 'pkg_2', name: 'Summer Maintenance Pro', price: 199.99 },
  { id: 'pkg_3', name: 'Fall Cleanup Complete', price: 399.99 },
  { id: 'pkg_4', name: 'Winter Snow Protection', price: 499.99 },
  { id: 'pkg_5', name: 'Year-Round Lawn Care', price: 149.99 },
  { id: 'pkg_6', name: 'Tree & Shrub Care', price: 249.99 },
  { id: 'pkg_7', name: 'Garden Deluxe Package', price: 349.99 },
  { id: 'pkg_8', name: 'Commercial Snow Contract', price: 899.99 },
  { id: 'pkg_9', name: 'Property Preservation Plus', price: 279.99 },
  { id: 'pkg_10', name: 'Seasonal Transition Package', price: 189.99 }
]

const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
]

export default function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState('')
  const [serviceType, setServiceType] = useState<'individual' | 'package'>('individual')
  const [selectedSeason, setSelectedSeason] = useState('spring')
  const [selectedService, setSelectedService] = useState('')
  const [selectedPackage, setSelectedPackage] = useState('')
  const [hours, setHours] = useState(1)
  const [people, setPeople] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  })

  const currentService = selectedService ? 
    services[selectedSeason as keyof typeof services]?.find(s => s.name === selectedService) : null
  
  const currentPackage = selectedPackage ? 
    packageDeals.find(p => p.id === selectedPackage) : null

  const calculatePrice = () => {
    if (serviceType === 'package' && currentPackage) {
      return currentPackage.price
    }
    if (serviceType === 'individual' && currentService) {
      return hours * people * 20 // $20/hour per person
    }
    return 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedDate || !selectedTime || !formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields')
      return
    }

    if (serviceType === 'individual' && !selectedService) {
      toast.error('Please select a service')
      return
    }

    if (serviceType === 'package' && !selectedPackage) {
      toast.error('Please select a package')
      return
    }

    try {
      const appointmentData = {
        id: `apt_${Date.now()}`,
        userName: formData.name,
        userEmail: formData.email,
        userPhone: formData.phone,
        serviceType,
        serviceName: serviceType === 'package' ? currentPackage?.name : selectedService,
        season: serviceType === 'package' ? 'package' : selectedSeason,
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedTime,
        hours: serviceType === 'package' ? 0 : hours,
        people: serviceType === 'package' ? 0 : people,
        totalPrice: calculatePrice(),
        status: 'pending',
        notes: formData.notes,
        createdAt: new Date().toISOString()
      }

      // Store in localStorage for now (in real app would use database)
      const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]')
      existingAppointments.push(appointmentData)
      localStorage.setItem('appointments', JSON.stringify(existingAppointments))

      toast.success('Appointment booked successfully! We will contact you soon.')
      
      // Reset form
      setSelectedDate(undefined)
      setSelectedTime('')
      setSelectedService('')
      setSelectedPackage('')
      setFormData({ name: '', email: '', phone: '', notes: '' })
      setHours(1)
      setPeople(1)
      
    } catch (error) {
      console.error('Booking error:', error)
      toast.error('Failed to book appointment. Please try again.')
    }
  }

  return (
    <section id="booking" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Schedule Your Appointment
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Book your landscaping or snow removal service online. Choose from individual services 
            or our money-saving package deals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5" />
                Select Date & Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates and Sundays
                className="rounded-md border mb-6"
              />
              
              {selectedDate && (
                <div>
                  <Label className="text-sm font-medium mb-2 block">Available Times</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? 'default' : 'outline'}
                        onClick={() => setSelectedTime(time)}
                        className="text-sm"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Booking Form */}
          <Card>
            <CardHeader>
              <CardTitle>Service Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service Type Selection */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Service Type</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      variant={serviceType === 'individual' ? 'default' : 'outline'}
                      onClick={() => setServiceType('individual')}
                    >
                      Individual Service
                    </Button>
                    <Button
                      type="button"
                      variant={serviceType === 'package' ? 'default' : 'outline'}
                      onClick={() => setServiceType('package')}
                    >
                      Package Deal
                    </Button>
                  </div>
                </div>

                {/* Individual Service Selection */}
                {serviceType === 'individual' && (
                  <>
                    <div>
                      <Label htmlFor="season">Season</Label>
                      <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select season" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="spring">Spring</SelectItem>
                          <SelectItem value="summer">Summer</SelectItem>
                          <SelectItem value="fall">Fall</SelectItem>
                          <SelectItem value="winter">Winter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="service">Service</Label>
                      <Select value={selectedService} onValueChange={setSelectedService}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services[selectedSeason as keyof typeof services]?.map((service) => (
                            <SelectItem key={service.name} value={service.name}>
                              {service.name} ({service.hours}h)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="hours">Hours</Label>
                        <Input
                          id="hours"
                          type="number"
                          min="1"
                          max="12"
                          value={hours}
                          onChange={(e) => setHours(Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="people">People</Label>
                        <Input
                          id="people"
                          type="number"
                          min="1"
                          max="10"
                          value={people}
                          onChange={(e) => setPeople(Number(e.target.value))}
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Package Selection */}
                {serviceType === 'package' && (
                  <div>
                    <Label htmlFor="package">Package</Label>
                    <Select value={selectedPackage} onValueChange={setSelectedPackage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select package" />
                      </SelectTrigger>
                      <SelectContent>
                        {packageDeals.map((pkg) => (
                          <SelectItem key={pkg.id} value={pkg.id}>
                            {pkg.name} (${pkg.price})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Price Calculator */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Calculator className="mr-2 h-4 w-4 text-green-600" />
                    <span className="font-semibold text-green-800">Price Estimate</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    ${calculatePrice().toFixed(2)}
                  </div>
                  {serviceType === 'individual' && (
                    <p className="text-sm text-green-700 mt-1">
                      {hours} hours × {people} people × $20/hour
                    </p>
                  )}
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Contact Information</h3>
                  
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Special Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special requirements or notes..."
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Book Appointment
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Info */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold mb-4">Questions? Contact Us Directly</h3>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <a 
              href="tel:2163167289"
              className="flex items-center text-green-600 hover:text-green-700 transition"
            >
              <Phone className="mr-2 h-4 w-4" />
              216-316-7289
            </a>
            <a 
              href="tel:2163791335"
              className="flex items-center text-green-600 hover:text-green-700 transition"
            >
              <Phone className="mr-2 h-4 w-4" />
              216-379-1335
            </a>
            <a 
              href="mailto:dniaura@iCloud.com"
              className="flex items-center text-green-600 hover:text-green-700 transition"
            >
              <Mail className="mr-2 h-4 w-4" />
              dniaura@iCloud.com
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
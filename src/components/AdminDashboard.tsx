import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { useAdmin } from '../context/AdminContext'
import { 
  Calendar, 
  DollarSign, 
  Settings, 
  LogOut, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Phone,
  Mail
} from 'lucide-react'

// Mock data for appointments
const mockAppointments = [
  {
    id: 1,
    customerName: 'John Smith',
    customerEmail: 'john@example.com',
    customerPhone: '216-555-0123',
    service: 'Lawn Mowing',
    date: '2024-01-15',
    time: '10:00 AM',
    hours: 2,
    people: 1,
    totalPrice: 40,
    status: 'pending'
  },
  {
    id: 2,
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah@example.com',
    customerPhone: '216-555-0456',
    service: 'Spring Cleanup',
    date: '2024-01-16',
    time: '9:00 AM',
    hours: 4,
    people: 2,
    totalPrice: 160,
    status: 'confirmed'
  },
  {
    id: 3,
    customerName: 'Mike Wilson',
    customerEmail: 'mike@example.com',
    customerPhone: '216-555-0789',
    service: 'Year-Round Care Package',
    date: '2024-01-17',
    time: '2:00 PM',
    hours: 0,
    people: 0,
    totalPrice: 3600,
    status: 'pending'
  }
]

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-red-100 text-red-800'
}

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState(mockAppointments)
  const { isLoggedIn, logout, currentAdmin } = useAdmin()
  const navigate = useNavigate()

  // Redirect if not logged in - MUST be at the top
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/admin')
    }
  }, [isLoggedIn, navigate])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const updateAppointmentStatus = (id: number, newStatus: string) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === id ? { ...apt, status: newStatus } : apt
      )
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={16} />
      case 'confirmed': return <CheckCircle size={16} />
      case 'completed': return <CheckCircle size={16} />
      case 'cancelled': return <AlertCircle size={16} />
      default: return <Clock size={16} />
    }
  }

  // Calculate statistics
  const totalRevenue = appointments.reduce((sum, apt) => sum + apt.totalPrice, 0)
  const pendingCount = appointments.filter(apt => apt.status === 'pending').length
  const confirmedCount = appointments.filter(apt => apt.status === 'confirmed').length

  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-green-700">Hudson Landscaping Admin</h1>
              <p className="text-gray-600">Welcome back, {currentAdmin}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                View Website
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Confirmed</p>
                  <p className="text-2xl font-bold text-gray-900">{confirmedCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList>
            <TabsTrigger value="appointments" className="flex items-center">
              <Calendar size={16} className="mr-2" />
              Appointments
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings size={16} className="mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Recent Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div 
                      key={appointment.id} 
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{appointment.customerName}</h3>
                          <p className="text-gray-600">{appointment.service}</p>
                        </div>
                        <Badge className={statusColors[appointment.status as keyof typeof statusColors]}>
                          {getStatusIcon(appointment.status)}
                          <span className="ml-1 capitalize">{appointment.status}</span>
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Date & Time</p>
                          <p className="font-medium">{appointment.date}</p>
                          <p className="font-medium">{appointment.time}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Contact</p>
                          <div className="flex items-center">
                            <Phone size={14} className="mr-1" />
                            <p className="font-medium">{appointment.customerPhone}</p>
                          </div>
                          <div className="flex items-center">
                            <Mail size={14} className="mr-1" />
                            <p className="font-medium">{appointment.customerEmail}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-500">Details</p>
                          {appointment.hours > 0 && (
                            <>
                              <p className="font-medium">{appointment.hours} hours</p>
                              <p className="font-medium">{appointment.people} people</p>
                            </>
                          )}
                          {appointment.hours === 0 && (
                            <p className="font-medium">Package Deal</p>
                          )}
                        </div>
                        <div>
                          <p className="text-gray-500">Total Price</p>
                          <p className="font-medium text-lg text-green-600">
                            ${appointment.totalPrice}
                          </p>
                        </div>
                      </div>

                      {appointment.status === 'pending' && (
                        <div className="flex space-x-2 mt-4">
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                          >
                            Confirm
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}

                      {appointment.status === 'confirmed' && (
                        <div className="flex space-x-2 mt-4">
                          <Button 
                            size="sm" 
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                          >
                            Mark Complete
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">Business Name</p>
                    <p className="text-gray-600">Hudson Landscaping & Snow Services</p>
                  </div>
                  <div>
                    <p className="font-medium">Primary Phone</p>
                    <p className="text-gray-600">216-316-7289</p>
                  </div>
                  <div>
                    <p className="font-medium">Secondary Phone</p>
                    <p className="text-gray-600">216-379-1335</p>
                  </div>
                  <div>
                    <p className="font-medium">Primary Email</p>
                    <p className="text-gray-600">dniaura@iCloud.com</p>
                  </div>
                  <div>
                    <p className="font-medium">Secondary Email</p>
                    <p className="text-gray-600">ethanpmoore@iCloud.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pricing Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">Hourly Rate</p>
                    <p className="text-gray-600">$20 per hour per person</p>
                  </div>
                  <div>
                    <p className="font-medium">Service Areas</p>
                    <p className="text-gray-600">Greater Cleveland Area</p>
                  </div>
                  <div>
                    <p className="font-medium">Operating Hours</p>
                    <p className="text-gray-600">8:00 AM - 5:00 PM (Mon-Sat)</p>
                  </div>
                  <div>
                    <p className="font-medium">Emergency Services</p>
                    <p className="text-gray-600">24/7 Snow Removal Available</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
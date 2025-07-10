import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Lock, User, LogIn } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import toast from 'react-hot-toast'

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const { isLoggedIn, login } = useAdmin()

  // Redirect if already logged in
  if (isLoggedIn) {
    return <Navigate to="/admin/dashboard" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = login(credentials.username, credentials.password)
      
      if (success) {
        toast.success('Login successful!')
        // Navigation will happen automatically due to redirect above
      } else {
        toast.error('Invalid username or password')
      }
    } catch {
      toast.error('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Hudson Landscaping & Snow
          </h1>
          <h2 className="text-xl text-gray-600">Admin Login</h2>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center">
              <Lock className="mr-2 h-5 w-5 text-green-600" />
              Administrative Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="username">Username</Label>
                <div className="relative mt-1">
                  <Input
                    id="username"
                    type="text"
                    required
                    value={credentials.username}
                    onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                    className="pl-10"
                    placeholder="Enter username"
                  />
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type="password"
                    required
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    className="pl-10"
                    placeholder="Enter password"
                  />
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-blue-800 mb-2">Demo Credentials</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>Username:</strong> admin | <strong>Password:</strong> admin123</p>
              <p><strong>Username:</strong> hudson | <strong>Password:</strong> landscape2024</p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center">
          <a 
            href="/"
            className="text-green-600 hover:text-green-700 transition font-medium"
          >
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  )
}
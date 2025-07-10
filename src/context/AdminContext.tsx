import React, { createContext, useContext, useState, ReactNode } from 'react'

interface AdminContextType {
  isLoggedIn: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
  currentAdmin: string | null
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentAdmin, setCurrentAdmin] = useState<string | null>(null)

  // Simple admin credentials (in a real app, this would be handled by backend)
  const adminCredentials = {
    admin: 'admin123',
    hudson: 'landscape2024'
  }

  const login = (username: string, password: string): boolean => {
    if (adminCredentials[username as keyof typeof adminCredentials] === password) {
      setIsLoggedIn(true)
      setCurrentAdmin(username)
      localStorage.setItem('adminSession', username)
      return true
    }
    return false
  }

  const logout = () => {
    setIsLoggedIn(false)
    setCurrentAdmin(null)
    localStorage.removeItem('adminSession')
  }

  // Check for existing session on load
  React.useEffect(() => {
    const session = localStorage.getItem('adminSession')
    if (session) {
      setIsLoggedIn(true)
      setCurrentAdmin(session)
    }
  }, [])

  return (
    <AdminContext.Provider value={{ isLoggedIn, login, logout, currentAdmin }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}
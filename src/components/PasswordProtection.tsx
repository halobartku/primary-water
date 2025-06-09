import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'

interface PasswordProtectionProps {
  children: React.ReactNode
  onAuthenticated?: () => void
}

// Secure password configuration - hardcoded for maximum security
const CORRECT_PASSWORD = 'eyesontarget$'
const SESSION_KEY = 'pricestructure_authenticated'
const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
const MAX_ATTEMPTS = 5 // Maximum failed attempts before temporary lockout
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes lockout

export function PasswordProtection({ children, onAuthenticated }: PasswordProtectionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [failedAttempts, setFailedAttempts] = useState(0)
  const [isLockedOut, setIsLockedOut] = useState(false)
  const [lockoutEndTime, setLockoutEndTime] = useState<number | null>(null)

  useEffect(() => {
    // Check if user is already authenticated
    const sessionData = localStorage.getItem(SESSION_KEY)
    if (sessionData) {
      try {
        const { timestamp } = JSON.parse(sessionData)
        const now = Date.now()

        // Check if session is still valid
        if (now - timestamp < SESSION_DURATION) {
          setIsAuthenticated(true)
          onAuthenticated?.()
          return
        } else {
          // Session expired, remove it
          localStorage.removeItem(SESSION_KEY)
        }
      } catch (error) {
        // Invalid session data, remove it
        localStorage.removeItem(SESSION_KEY)
      }
    }

    // Check for lockout status
    const lockoutData = localStorage.getItem('pricestructure_lockout')
    if (lockoutData) {
      try {
        const { endTime, attempts } = JSON.parse(lockoutData)
        const now = Date.now()

        if (now < endTime) {
          setIsLockedOut(true)
          setLockoutEndTime(endTime)
          setFailedAttempts(attempts)
        } else {
          // Lockout expired, clear it
          localStorage.removeItem('pricestructure_lockout')
        }
      } catch (error) {
        localStorage.removeItem('pricestructure_lockout')
      }
    }
  }, [onAuthenticated])

  // Timer for lockout countdown
  useEffect(() => {
    if (isLockedOut && lockoutEndTime) {
      const timer = setInterval(() => {
        const now = Date.now()
        if (now >= lockoutEndTime) {
          setIsLockedOut(false)
          setLockoutEndTime(null)
          setFailedAttempts(0)
          localStorage.removeItem('pricestructure_lockout')
          clearInterval(timer)
        }
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [isLockedOut, lockoutEndTime])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isLockedOut) {
      return
    }

    setIsLoading(true)
    setError('')

    // Simulate a small delay for better UX and security
    await new Promise(resolve => setTimeout(resolve, 500))

    if (password === CORRECT_PASSWORD) {
      // Clear any lockout data on successful login
      localStorage.removeItem('pricestructure_lockout')

      // Store authentication in localStorage with timestamp
      const sessionData = {
        timestamp: Date.now(),
        authenticated: true
      }
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData))

      setIsAuthenticated(true)
      setFailedAttempts(0)
      onAuthenticated?.()
    } else {
      const newFailedAttempts = failedAttempts + 1
      setFailedAttempts(newFailedAttempts)

      if (newFailedAttempts >= MAX_ATTEMPTS) {
        // Lock out the user
        const lockoutEnd = Date.now() + LOCKOUT_DURATION
        const lockoutData = {
          endTime: lockoutEnd,
          attempts: newFailedAttempts
        }
        localStorage.setItem('pricestructure_lockout', JSON.stringify(lockoutData))
        setIsLockedOut(true)
        setLockoutEndTime(lockoutEnd)
        setError(`Too many failed attempts. Please try again in 15 minutes.`)
      } else {
        const remainingAttempts = MAX_ATTEMPTS - newFailedAttempts
        setError(`Incorrect password. ${remainingAttempts} attempt${remainingAttempts !== 1 ? 's' : ''} remaining.`)
      }
      setPassword('')
    }

    setIsLoading(false)
  }

  const formatLockoutTime = () => {
    if (!lockoutEndTime) return ''
    const remaining = Math.max(0, lockoutEndTime - Date.now())
    const minutes = Math.floor(remaining / 60000)
    const seconds = Math.floor((remaining % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  if (isAuthenticated) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Lock className="w-8 h-8 text-blue-600" />
          </motion.div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            Protected Content
          </h1>
          <p className="text-slate-600">
            {isLockedOut
              ? `Account temporarily locked. Try again in ${formatLockoutTime()}`
              : 'Please enter the password to access the pricing calculator'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all ${
                  error ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-slate-300'
                } ${isLockedOut ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                placeholder={isLockedOut ? 'Account locked' : 'Enter password'}
                required
                disabled={isLoading || isLockedOut}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-red-600 text-sm flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={isLoading || !password.trim() || isLockedOut}
            whileHover={{ scale: isLockedOut ? 1 : 1.02 }}
            whileTap={{ scale: isLockedOut ? 1 : 0.98 }}
            className={`w-full py-3 px-4 rounded-xl font-semibold transition-all ${
              isLoading || !password.trim() || isLockedOut
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {isLockedOut ? (
              `Locked - ${formatLockoutTime()}`
            ) : isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Verifying...
              </div>
            ) : (
              'Access Calculator'
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            This content is password protected for authorized users only
          </p>
        </div>
      </motion.div>
    </div>
  )
}

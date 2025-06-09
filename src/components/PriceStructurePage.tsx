import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, LogOut } from 'lucide-react'
import { PasswordProtection } from './PasswordProtection'
import { PricingCalculator } from './PricingModel'

export function PriceStructurePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('pricestructure_authenticated')
    setIsAuthenticated(false)
    window.location.reload()
  }

  return (
    <PasswordProtection onAuthenticated={() => setIsAuthenticated(true)}>
      <div className="min-h-screen bg-hero-gradient overflow-x-hidden flex flex-col">
        {/* Logo */}
        <div className="fixed left-4 top-4 z-30">
          <img
            src="/files/Primary-Water_LOGO_v03.png"
            alt="Primary Water Logo"
            className="h-8 md:h-12 w-auto"
          />
        </div>

        {/* Navigation Header */}
        <div className="absolute top-4 right-4 z-20">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-blue-600
                       hover:text-blue-800 transition-colors rounded-xl shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back to Home</span>
            </Link>

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/90 backdrop-blur-sm text-white
                         hover:bg-red-600 transition-colors rounded-xl shadow-lg hover:shadow-xl"
              >
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Logout</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex-1">
          <PricingCalculator />
        </div>
      </div>
    </PasswordProtection>
  )
}

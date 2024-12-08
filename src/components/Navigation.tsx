import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../lib/utils'
import { NavItem } from '../types'

interface NavigationProps {
  sections: NavItem[]
  currentSection: number
  onNavigate: (index: number) => void
}

export function Navigation({ sections, currentSection, onNavigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 top-4 z-50 p-3 rounded-xl bg-white/90 text-blue-500 hover:bg-blue-50 transition-colors md:hidden shadow-lg backdrop-blur-sm"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Desktop Navigation */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-6">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onNavigate(section.id)}
            className={cn(
              "p-4 rounded-xl transition-all duration-300 group relative",
              currentSection === section.id
                ? "bg-blue-500 text-white shadow-lg scale-110 hover:bg-blue-600"
                : "bg-white/90 text-blue-500 hover:bg-blue-50 hover:scale-105"
            )}
          >
            <section.icon className="w-6 h-6" />
            <span className="sr-only">{section.title}</span>
            <div 
              className={cn(
                "absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0",
                currentSection === section.id
                  ? "bg-blue-500 text-white"
                  : "bg-white/90 text-blue-500"
              )}
            >
              {section.title}
            </div>
          </button>
        ))}
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-md z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute inset-x-0 top-0 min-h-screen bg-white"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-4 flex justify-end border-b border-gray-100">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
              <div className="px-6 py-4">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      onNavigate(section.id)
                      setIsOpen(false)
                    }}
                    className={cn(
                      "w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all mb-2 text-lg",
                      currentSection === section.id
                        ? "bg-blue-50 text-blue-600 scale-[0.98] font-medium"
                        : "text-gray-700 hover:bg-gray-50 active:scale-[0.98]"
                    )}
                  >
                    <section.icon className="w-6 h-6" />
                    {section.title}
                  </button>
                ))}
                
                {/* Privacy Policy Link */}
                <Link
                  to="/privacy"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all text-gray-700 hover:bg-gray-50 active:scale-[0.98] mt-4 text-lg border-t border-gray-100 pt-6"
                >
                  <Shield className="w-6 h-6" />
                  Privacy Policy
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
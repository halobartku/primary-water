import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
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
        className="fixed right-4 top-4 z-50 p-3 rounded-xl bg-white/90 text-blue-500 hover:bg-blue-50 transition-colors md:hidden shadow-lg"
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
            className="fixed inset-0 bg-blue-900/80 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute right-0 top-0 bottom-0 w-64 bg-white shadow-lg"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-4 flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <X className="w-6 h-6 text-blue-500" />
                </button>
              </div>
              <div className="px-4 py-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      onNavigate(section.id)
                      setIsOpen(false)
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-2",
                      currentSection === section.id
                        ? "bg-blue-50 text-blue-500"
                        : "text-blue-900 hover:bg-blue-50"
                    )}
                  >
                    <section.icon className="w-5 h-5" />
                    {section.title}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
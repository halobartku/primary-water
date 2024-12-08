import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function Footer() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return (
    <motion.footer
      className={`
        fixed bottom-0 left-0 right-0 z-60
        bg-white/80 backdrop-blur-sm border-t border-blue-100
        ${isMobile ? 'pb-[env(safe-area-inset-bottom,0px)]' : ''}
      `}
      style={{
        transform: 'translate3d(0, 0, 0)',
        WebkitTransform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        willChange: 'transform'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-center md:justify-between items-center">
        <div className={`flex flex-col md:flex-row md:items-center gap-2 md:gap-4 ${isMobile ? '' : 'mb-2 md:mb-0'}`}>
          <p className="text-sm text-blue-700 text-center md:text-left whitespace-nowrap">
            &copy; {new Date().getFullYear()} Primary Water
            <span className="hidden md:inline">. All rights reserved.</span>
          </p>
          <span className="hidden md:inline text-blue-300">|</span>
          <a 
            href="mailto:office@findprimarywater.com"
            className="hidden md:inline text-sm text-blue-600 hover:text-blue-800 transition-colors text-center md:text-left"
          >
            office@findprimarywater.com
          </a>
        </div>
        <nav className="hidden md:block text-center md:text-left">
          <a 
            href="/privacy" 
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            Privacy Policy
          </a>
        </nav>
      </div>
    </motion.footer>
  )
}
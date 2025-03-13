import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Youtube, Droplet } from 'lucide-react'

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
        fixed bottom-0 left-0 right-0 z-[9999]
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
      <div className="relative max-w-7xl mx-auto px-4 py-2 md:py-3 flex justify-between items-center">
        <div className="relative flex-1 flex justify-between md:justify-start items-center gap-4">
          <div className="flex-1 md:flex-none flex flex-row items-center gap-2 md:gap-4 justify-center md:justify-start">
            <p className="text-sm text-blue-700 whitespace-nowrap">
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
          <div className="flex items-center gap-3 md:hidden ml-4">
            <a
              href="https://www.linkedin.com/company/primary-water/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-blue-600 hover:text-blue-800 transition-colors cursor-pointer z-[9999]"
              aria-label="Follow us on LinkedIn"
            >
              <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
            </a>
            <a
              href="https://www.youtube.com/@findprimarywater"
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-blue-600 hover:text-blue-800 transition-colors cursor-pointer z-[9999]"
              aria-label="Subscribe to our YouTube channel"
            >
              <Youtube className="w-5 h-5 md:w-6 md:h-6" />
            </a>
            <a
              href="/flow"
              className="relative text-blue-600 hover:text-blue-800 transition-colors cursor-pointer z-[9999]"
              aria-label="Go to Flow Calculator"
            >
              <Droplet className="w-5 h-5 md:w-6 md:h-6" />
            </a>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <nav className="hidden md:block">
            <a 
              href="/privacy" 
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Privacy Policy
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/company/primary-water/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-blue-600 hover:text-blue-800 transition-colors cursor-pointer z-[9999]"
              aria-label="Follow us on LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://www.youtube.com/@findprimarywater"
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-blue-600 hover:text-blue-800 transition-colors cursor-pointer z-[9999]"
              aria-label="Subscribe to our YouTube channel"
            >
              <Youtube className="w-6 h-6" />
            </a>
            <a
              href="/flow"
              className="relative text-blue-600 hover:text-blue-800 transition-colors cursor-pointer z-[9999]"
              aria-label="Go to Flow Calculator"
            >
              <Droplet className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

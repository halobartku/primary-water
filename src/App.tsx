import { useRef, useState, useEffect } from 'react'
import { Mail, Info, HelpCircle, Home, BookOpen, ExternalLink } from 'lucide-react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BackgroundAnimations } from './components/BackgroundAnimations'
import { MouseAnimations } from './components/MouseAnimations'
import { WaterCollector } from './components/WaterCollector'
import { Navigation } from './components/Navigation'
import { AboutUs } from './components/AboutUs'
import { WhatIsPrimaryWater } from './components/WhatIsPrimaryWater'
import { CaseStudyCard } from './components/CaseStudyCard'
import { ContactCard } from './components/ContactCard'
import { CookieConsent } from './components/CookieConsent'
import { Footer } from './components/Footer'
import { PrivacyPolicy } from './components/PrivacyPolicy'
import { Hero } from './components/Hero'
import { useWaterGame } from './hooks/useWaterGame'
import { caseStudies } from './data/caseStudies'
import type { NavItem } from './types'
import { SpeedInsights } from '@vercel/speed-insights/react'

function MainContent() {
  const [currentSection, setCurrentSection] = useState(0)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const { waterDrops, waterCollected, mousePosition, handleMouseMove } = useWaterGame()
  const [showCookieConsent, setShowCookieConsent] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollAccumulator = useRef(0)
  const lastScrollTime = useRef(Date.now())
  const lastDelta = useRef(0)
  const SCROLL_THRESHOLD = 150
  const SCROLL_COOLDOWN = 300
  const ACCUMULATOR_RESET_DELAY = 200
  const lastAccumulatorReset = useRef(Date.now())

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isMobile) return

      if (e.target instanceof Element) {
        const targetElement = e.target as Element
        if (
          targetElement.tagName === 'SELECT' ||
          targetElement.closest('select') ||
          targetElement.closest('.dropdown-content')
        ) {
          return
        }
      }
      
      e.preventDefault()
      
      if (isScrolling || !containerRef.current) return

      const now = Date.now()
      
      if (now - lastAccumulatorReset.current > ACCUMULATOR_RESET_DELAY) {
        scrollAccumulator.current = 0
        lastAccumulatorReset.current = now
      }

      if (now - lastScrollTime.current < SCROLL_COOLDOWN) {
        return
      }

      let normalizedDelta = e.deltaY
      if (e.deltaMode === 1) {
        normalizedDelta *= 5
      } else if (e.deltaMode === 2) {
        normalizedDelta *= window.innerHeight / 4
      }

      if (Math.sign(normalizedDelta) !== Math.sign(lastDelta.current)) {
        scrollAccumulator.current = 0
      }
      lastDelta.current = normalizedDelta

      if (Math.abs(normalizedDelta) < 50) {
        normalizedDelta *= 0.3
      }

      scrollAccumulator.current += normalizedDelta

      if (Math.abs(scrollAccumulator.current) < SCROLL_THRESHOLD) {
        return
      }

      setIsScrolling(true)
      lastScrollTime.current = now
      
      let nextSection = currentSection
      
      if (scrollAccumulator.current < 0 && currentSection > 0) {
        nextSection = currentSection - 1
      } else if (scrollAccumulator.current > 0 && currentSection < sectionsRef.current.length - 1) {
        nextSection = currentSection + 1
      }
      
      scrollAccumulator.current = 0
      lastAccumulatorReset.current = now
      
      scrollToSection(nextSection)
      
      setTimeout(() => {
        setIsScrolling(false)
      }, 500)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel)
      }
    }
  }, [currentSection, isScrolling, isMobile])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionsRef.current.findIndex((ref) => ref === entry.target)
            if (index !== -1) {
              setCurrentSection(index)
            }
          }
        })
      },
      { threshold: 0.5 }
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [])

  const sections: NavItem[] = [
    { id: 0, title: 'Home', icon: Home },
    { id: 1, title: 'What is Primary Water', icon: HelpCircle },
    { id: 2, title: 'About', icon: Info },
    { id: 3, title: 'Case Studies', icon: BookOpen },
    { id: 4, title: 'Contact', icon: Mail },
  ]

  const scrollToSection = (index: number) => {
    const section = sectionsRef.current[index]
    if (section) {
      if (isMobile) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        section.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
      }
      setCurrentSection(index)
    }
  }

  return (
    <div 
      className="min-h-screen bg-hero-gradient overflow-hidden flex flex-col"
      onMouseMove={handleMouseMove}
    >
      {/* Logo */}
      <div className="fixed left-4 top-4 z-50">
        <img 
          src="https://primerywater.com/images/Primary-Water_LOGO_v03.png"
          alt="Primary Water Logo"
          className="h-8 md:h-12 w-auto"
        />
      </div>

      <BackgroundAnimations />
      <MouseAnimations waterDrops={waterDrops} mousePosition={mousePosition} />
      <WaterCollector waterCollected={waterCollected} />
      <Navigation 
        sections={sections}
        currentSection={currentSection}
        onNavigate={scrollToSection}
      />

      {/* Content sections */}
      <div 
        ref={containerRef}
        className={`
          relative z-10 flex-1 w-full
          ${isMobile ? 'snap-y overflow-y-auto' : 'snap-x overflow-x-auto overflow-y-hidden'}
          snap-mandatory smooth-scroll
          ${isMobile ? 'flex-col' : 'flex-row'}
          flex
        `}
      >
        {sections.map((section, index) => (
          <section 
            key={section.id}
            ref={el => sectionsRef.current[index] = el}
            className={`
              relative
              ${isMobile ? 'min-h-screen w-full' : 'min-w-full w-screen h-screen flex-shrink-0'}
              snap-start
              flex items-center justify-center
              ${isMobile ? 'py-16 pb-32 px-4' : 'px-20'}
            `}
          >
            {index === 0 && <Hero onDiscoverClick={() => scrollToSection(1)} onContactClick={() => scrollToSection(4)} />}
            {index === 1 && <WhatIsPrimaryWater />}
            {index === 2 && <AboutUs />}
            {index === 3 && (
              <div className="w-full max-w-[85%] lg:max-w-[1000px] mx-auto flex flex-col justify-center h-full">
                <h2 className="text-4xl md:text-5xl font-bold text-blue-900 text-center mb-6">
                  Case Studies
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5 mb-2">
                  {caseStudies.map((study, idx) => (
                    <motion.div
                      key={study.location}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <CaseStudyCard 
                        {...study}
                      />
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-center -mt-0"
                >
                  <a
                    href="https://www.youtube.com/@FindPrimaryWater"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 hover:bg-white rounded-full shadow-md hover:shadow-lg transition-all group text-sm"
                  >
                    <span className="text-blue-700 font-medium">Watch more on our YouTube channel</span>
                    <ExternalLink className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </a>
                </motion.div>
              </div>
            )}
            {index === 4 && <ContactCard />}
          </section>
        ))}
      </div>

      {showCookieConsent && (
        <div className={isMobile ? 'mb-16' : ''}>
          <CookieConsent onClose={() => setShowCookieConsent(false)} />
        </div>
      )}
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <SpeedInsights />
    </Router>
  )
}

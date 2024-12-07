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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
    sectionsRef.current[index]?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div 
      className="min-h-screen bg-hero-gradient overflow-x-hidden flex flex-col"
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
      <div className="snap-y snap-mandatory h-screen overflow-y-auto smooth-scroll flex-grow">
        {sections.map((section, index) => (
          <section 
            key={section.id}
            ref={el => sectionsRef.current[index] = el}
            className={`min-h-screen snap-start flex items-center justify-center relative ${
              isMobile ? 'py-16 px-4' : 'py-20'
            }`}
          >
            {index === 0 && <Hero onDiscoverClick={() => scrollToSection(1)} onContactClick={() => scrollToSection(4)} />}
            {index === 1 && <WhatIsPrimaryWater />}
            {index === 2 && <AboutUs />}
            {index === 3 && (
              <div className="max-w-7xl mx-auto p-4 md:p-6">
                <h2 className="text-3xl md:text-5xl font-bold text-blue-900 text-center mb-8">
                  Case Studies
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6">
                  {caseStudies.map((study, idx) => (
                    <motion.div
                      key={study.location}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <CaseStudyCard 
                        {...study}
                        index={idx}
                      />
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-center mt-6 md:mt-8"
                >
                  <a
                    href="https://www.youtube.com/@FindPrimaryWater"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 hover:bg-white rounded-full shadow-md hover:shadow-lg transition-all group"
                  >
                    <span className="text-blue-700 font-medium">Watch more on our YouTube channel</span>
                    <ExternalLink className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />
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

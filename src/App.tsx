import { useRef, useEffect, Suspense, lazy } from 'react'
import { Mail, Info, HelpCircle, Home, BookOpen, ExternalLink, Droplets } from 'lucide-react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import { BackgroundAnimations } from './components/BackgroundAnimations'
import { MouseAnimations } from './components/MouseAnimations'
import { WaterCollector } from './components/WaterCollector'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { SEO } from './components/SEO'
import { SkipLink } from './components/SkipLink'
import { KeyboardInstructions } from './components/KeyboardInstructions'
import { PrivacyPreferences } from './components/PrivacyPreferences'
import { caseStudies } from './data/caseStudies'
import type { NavItem } from './types'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'
import { AppProvider, useApp } from './context/AppContext'
import { WaterGameProvider, useWaterGame } from './context/WaterGameContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import { LoadingSpinner } from './components/LoadingSpinner'
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation'

// Lazy load components with named exports
const AboutUs = lazy(() =>
  import('./components/AboutUs').then(module => ({ default: module.AboutUs }))
)
const WhatIsPrimaryWater = lazy(() =>
  import('./components/WhatIsPrimaryWater').then(module => ({ default: module.WhatIsPrimaryWater }))
)
const CaseStudyCard = lazy(() =>
  import('./components/CaseStudyCard').then(module => ({ default: module.CaseStudyCard }))
)
const ContactCard = lazy(() =>
  import('./components/ContactCard').then(module => ({ default: module.ContactCard }))
)
const Footer = lazy(() =>
  import('./components/Footer').then(module => ({ default: module.Footer }))
)
const PrivacyPolicy = lazy(() =>
  import('./components/PrivacyPolicy').then(module => ({ default: module.PrivacyPolicy }))
)
const WaterStressVisualization = lazy(() =>
  import('./components/WaterStressVisualization')
)
const InteractiveWellCalculator = lazy(() =>
  import('./components/InteractiveWellCalculator').then(module => ({ default: module.InteractiveWellCalculator }))
)

// Page transition variants
const pageTransition = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
}

function MainContent() {
  const {
    currentSection,
    setCurrentSection,
    isMobile,
    showPrivacyPreferences,
    setShowPrivacyPreferences,
    isScrolling,
    setIsScrolling
  } = useApp()

  const { waterDrops, waterCollected, mousePosition, handleMouseMove } = useWaterGame()

  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollAccumulator = useRef(0)
  const lastScrollTime = useRef(Date.now())
  const lastDelta = useRef(0)
  const SCROLL_THRESHOLD = 150
  const SCROLL_COOLDOWN = 300
  const ACCUMULATOR_RESET_DELAY = 200
  const lastAccumulatorReset = useRef(Date.now())

  const sections: NavItem[] = [
    { id: 0, title: 'Home', icon: Home },
    { id: 1, title: 'What is Primary Water', icon: HelpCircle },
    { id: 2, title: 'About', icon: Info },
    { id: 3, title: 'Case Studies', icon: BookOpen },
    { id: 4, title: 'Water Stress', icon: Droplets },
    { id: 5, title: 'Contact', icon: Mail },
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

  // Enable keyboard navigation
  useKeyboardNavigation({
    currentSection,
    totalSections: sections.length,
    onNavigate: scrollToSection,
    enabled: !isMobile
  })

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
  }, [currentSection, isScrolling, isMobile, setIsScrolling])

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
  }, [setCurrentSection])

  return (
    <div
      className="min-h-screen bg-hero-gradient overflow-x-hidden flex flex-col"
      onMouseMove={handleMouseMove}
    >
      <SEO
        title={`Primary Water - ${sections[currentSection].title}`}
        description={
          currentSection === 0
            ? "Discover sustainable water sources with Primary Water. We specialize in locating natural water sources using innovative methods."
            : `Learn about ${sections[currentSection].title.toLowerCase()} at Primary Water`
        }
      />

      {/* Accessibility Skip Links */}
      <SkipLink targetId="main-content">Skip to main content</SkipLink>
      <SkipLink targetId="main-nav">Skip to navigation</SkipLink>

      {/* Logo */}
      <div className="fixed left-4 top-4 z-50">
        <img
          src="/files/Primary-Water_LOGO_v03.png"
          alt="Primary Water Logo"
          className="h-8 md:h-12 w-auto"
        />
      </div>

      <BackgroundAnimations />
      <MouseAnimations waterDrops={waterDrops} mousePosition={mousePosition} />
      <WaterCollector waterCollected={waterCollected} />

      {/* Main Navigation */}
      <nav id="main-nav" role="navigation" aria-label="Main navigation">
        <Navigation
          sections={sections}
          currentSection={currentSection}
          onNavigate={scrollToSection}
        />
      </nav>

      {/* Content sections */}
      <main
        id="main-content"
        ref={containerRef}
        className={`
          relative z-10 flex-1 w-full
          ${isMobile ? 'snap-y snap-mandatory overflow-y-auto overflow-x-hidden' : 'snap-x snap-mandatory overflow-x-auto overflow-y-hidden'}
          smooth-scroll
          ${isMobile ? 'flex-col' : 'flex-row'}
          flex
        `}
        role="main"
        aria-live="polite"
      >
        {sections.map((section, index) => (
          <motion.section
            key={section.id}
            ref={el => sectionsRef.current[index] = el}
            className={`
              relative
              ${isMobile ? 'min-h-screen w-full max-w-full' : 'min-w-full w-screen h-screen flex-shrink-0'}
              snap-start
              flex items-center justify-center
              ${isMobile ? 'py-12 px-3' : 'px-20'}
            `}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
            role="region"
            aria-label={section.title}
            tabIndex={0}
          >
            <div className="w-full max-w-[100vw] overflow-x-hidden">
              <ErrorBoundary>
                <Suspense fallback={<LoadingSpinner />}>
                  {index === 0 && <Hero onDiscoverClick={() => scrollToSection(1)} onContactClick={() => scrollToSection(5)} />}
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
                        className="text-center"
                      >
                        <a
                          href="https://www.youtube.com/@FindPrimaryWater"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/80 hover:bg-white rounded-full shadow-md hover:shadow-lg transition-all group text-sm"
                          aria-label="Watch more case studies on our YouTube channel"
                        >
                          <span className="text-blue-700 font-medium">Watch more on our YouTube channel</span>
                          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                        </a>
                      </motion.div>
                    </div>
                  )}
                  {index === 4 && <WaterStressVisualization />}
                  {index === 5 && <ContactCard />}
                </Suspense>
              </ErrorBoundary>
            </div>
          </motion.section>
        ))}
      </main>

      {showPrivacyPreferences && (
        <div role="complementary" aria-label="Privacy preferences">
          <PrivacyPreferences onClose={() => setShowPrivacyPreferences(false)} />
        </div>
      )}

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {/* Keyboard Navigation Instructions */}
      {!isMobile && <KeyboardInstructions />}
    </div>
  )
}

function AppWithProviders() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <AppProvider>
          <WaterGameProvider>
            <MainContent />
          </WaterGameProvider>
        </AppProvider>
      </HelmetProvider>
    </ErrorBoundary>
  )
}

export default function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ErrorBoundary>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<AppWithProviders />} />
            <Route path="/privacy" element={
              <Suspense fallback={<LoadingSpinner />}>
                <PrivacyPolicy />
              </Suspense>
            } />
            <Route path="/flow" element={
              <Suspense fallback={<LoadingSpinner />}>
                <InteractiveWellCalculator />
              </Suspense>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </ErrorBoundary>
      <SpeedInsights />
      <Analytics />
    </Router>
  )
}

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AppContextType {
  currentSection: number
  setCurrentSection: (section: number) => void
  isMobile: boolean
  showPrivacyPreferences: boolean
  setShowPrivacyPreferences: (show: boolean) => void
  isScrolling: boolean
  setIsScrolling: (scrolling: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [showPrivacyPreferences, setShowPrivacyPreferences] = useState(true)
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <AppContext.Provider
      value={{
        currentSection,
        setCurrentSection,
        isMobile,
        showPrivacyPreferences,
        setShowPrivacyPreferences,
        isScrolling,
        setIsScrolling
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

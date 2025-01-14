import { useEffect } from 'react'

interface UseKeyboardNavigationProps {
  currentSection: number
  totalSections: number
  onNavigate: (index: number) => void
  enabled?: boolean
}

export function useKeyboardNavigation({
  currentSection,
  totalSections,
  onNavigate,
  enabled = true
}: UseKeyboardNavigationProps) {
  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          if (currentSection < totalSections - 1) {
            e.preventDefault()
            onNavigate(currentSection + 1)
          }
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          if (currentSection > 0) {
            e.preventDefault()
            onNavigate(currentSection - 1)
          }
          break
        case 'Home':
          e.preventDefault()
          onNavigate(0)
          break
        case 'End':
          e.preventDefault()
          onNavigate(totalSections - 1)
          break
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
          const sectionIndex = parseInt(e.key) - 1
          if (sectionIndex < totalSections) {
            e.preventDefault()
            onNavigate(sectionIndex)
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSection, totalSections, onNavigate, enabled])
}

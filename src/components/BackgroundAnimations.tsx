import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Bubble {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  wobbleScale: number
  wobbleSpeed: number
}

export function BackgroundAnimations() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight)

  useEffect(() => {
    const createBubbles = () => {
      const newBubbles: Bubble[] = []
      const vh = window.innerHeight
      setViewportHeight(vh)
      
      for (let i = 0; i < 15; i++) { // Reduced number of bubbles
        newBubbles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: vh + Math.random() * 100,
          size: Math.random() * 40 + 20, // Smaller size range
          duration: Math.random() * 20 + 15, // Slower duration
          delay: Math.random() * 8, // Longer initial delay
          wobbleScale: Math.random() * 60 + 30, // Reduced wobble range
          wobbleSpeed: Math.random() * 1.2 + 0.4 // Slower wobble speed
        })
      }
      setBubbles(newBubbles)
    }

    createBubbles()

    const handleResize = () => {
      createBubbles()
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute"
          style={{
            width: bubble.size,
            height: bubble.size,
            x: bubble.x,
            y: bubble.y,
          }}
          animate={{
            y: -bubble.size * 2,
            x: [
              bubble.x,
              bubble.x + Math.sin(bubble.wobbleSpeed) * bubble.wobbleScale,
              bubble.x - Math.sin(bubble.wobbleSpeed) * bubble.wobbleScale * 0.3,
              bubble.x + Math.sin(bubble.wobbleSpeed) * bubble.wobbleScale * 0.2,
              bubble.x
            ],
            scale: [1, 1.05, 0.95, 1.08, 1], // More subtle scale changes
            rotate: [0, 5, -8, 3, 0], // Reduced rotation
            opacity: [0.6, 0.6, 0.6, 0.4, 0] // Lower initial opacity
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut",
            x: {
              duration: bubble.duration * 0.8, // Slower horizontal movement
              repeat: Infinity,
              ease: "easeInOut"
            },
            scale: {
              duration: bubble.duration * 0.6,
              repeat: Infinity,
              ease: "easeInOut"
            },
            rotate: {
              duration: bubble.duration * 0.7,
              repeat: Infinity,
              ease: "easeInOut"
            },
            opacity: {
              duration: bubble.duration * 0.3,
              delay: bubble.duration * 0.7,
              repeat: Infinity,
              ease: "easeOut"
            }
          }}
        >
          <div
            className="w-full h-full rounded-full relative"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(2, 132, 199, 0.3) 0%, rgba(14, 165, 233, 0.15) 100%)', // More transparent
              boxShadow: '0 4px 12px rgba(2, 132, 199, 0.1)', // Lighter shadow
              transform: 'translateZ(0)'
            }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 70%)', // More subtle highlight
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
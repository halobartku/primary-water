import { useState, useEffect } from 'react'
import { Droplets } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const waterFacts = [
  "Primary water forms deep within the Earth's crust through various geological processes.",
  "Primary water is independent of the hydrologic cycle and rainfall patterns.",
  "The Earth continuously generates new water through natural geological processes.",
  "Primary water is typically purer than surface water or shallow groundwater.",
  "Primary water can be found in both coastal and inland areas.",
  "Primary water sources can provide sustainable water supply for generations.",
  "Primary water is often found in fractured rock formations.",
  "The Earth's mantle contains more water than all surface water combined.",
  "Primary water wells can maintain consistent flow rates year-round.",
  "Primary water has been successfully located in desert regions worldwide.",
  "People can only live for about 4 days without water.",
  "Adults should drink about 8-10 glasses of water each day.",
  "A child's body is mostly water - about 75% of it!",
  "Water covers about three-quarters of Earth's surface.",
  "The Pacific Ocean is bigger than all the land on Earth combined.",
  "The average home uses about 500 liters of water every day.",
  "Jellyfish are almost all water - 97% water, to be exact!",
  "Our tears are mostly water - 98% water.",
  "A forest the size of a football field drinks about 3,000 cubic meters of water each year.",
  "Making one car uses enough water to fill a swimming pool - about 379,000 liters!",
  "It takes 462 liters of water to make one loaf of bread.",
  "Making one glass of orange juice needs 50 glasses of water.",
  "A 10-minute shower uses 30-38 liters while a bath uses 115-150 liters.",
  "Each toilet flush uses about 11 liters of water.",
  "Dishwashers save water! They use 11 liters while hand-washing uses 38 liters.",
  "Making one kilogram of paper uses 250 liters of water.",
  "Making one liter of beer needs 8 liters of water.",
  "Making one kilogram of steel uses 300 liters of water.",
  "Growing rice needs three times more water than growing wheat.",
  "Water vapor in the air helps regulate Earth's temperature.",
  "All of Earth's water came once from a Primary Water source."
]

interface WaterCollectorProps {
  waterCollected: number
}

export function WaterCollector({ waterCollected }: WaterCollectorProps) {
  const [showFact, setShowFact] = useState(false)
  const [currentFact, setCurrentFact] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const displayDuration = 4800 // 4.8 seconds (60% of 8 seconds)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleClick = () => {
    const randomFact = waterFacts[Math.floor(Math.random() * waterFacts.length)]
    setCurrentFact(randomFact)
    setShowFact(true)
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={`
          fixed left-4 z-[999] bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg 
          flex items-center gap-2 hover:bg-white transition-colors
          ${isMobile ? 'bottom-2' : 'bottom-16'}
        `}
      >
        <Droplets className="w-5 h-5 text-blue-500" />
        <span className="font-bold text-blue-900">{waterCollected}</span>
      </button>

      <AnimatePresence>
        {showFact && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setShowFact(false)} />
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              exit={{ y: 20 }}
              className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-blue-100 max-w-lg mx-auto relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent rounded-2xl" />
              <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-blue-500"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ 
                  duration: displayDuration / 1000,
                  ease: "linear"
                }}
                onAnimationComplete={() => setShowFact(false)}
              />
              <p className="text-blue-800 text-xl text-center relative">
                {currentFact}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
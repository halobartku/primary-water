import { motion } from 'framer-motion'

interface HeroProps {
  onDiscoverClick: () => void
  onContactClick: () => void
}

export function Hero({ onDiscoverClick, onContactClick }: HeroProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto text-center px-4"
    >
      <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-6">
       Primary Water
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-blue-800 mb-4">
         We Find Water Everywhere
      </h2>
      <p className="text-lg md:text-xl text-blue-700 max-w-2xl mx-auto leading-relaxed">
        Unlock sustainable, weather-independent water sources with our innovative primary water location techniques. 
        Expert solutions for agriculture, industry, and communities worldwide.
      </p>
      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <motion.button
          onClick={onDiscoverClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          Discover Primary Water
        </motion.button>
        <motion.button
          onClick={onContactClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-blue-500 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
        >
          Contact Us
        </motion.button>
      </div>
    </motion.div>
  )
}
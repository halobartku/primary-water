import { motion } from 'framer-motion'

interface HeroProps {
  onDiscoverClick: () => void
  onContactClick: () => void
}

export function Hero({ onDiscoverClick, onContactClick }: HeroProps) {
  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const letterVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      rotateX: -90
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full h-full flex items-start md:items-center justify-center px-4 md:px-8 pt-24 md:pt-0"
    >
      <div className="max-w-[90%] md:max-w-4xl mx-auto text-center">
        <motion.h1 
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-3xl md:text-7xl lg:text-8xl font-bold text-blue-900 mb-4 md:mb-6 whitespace-nowrap"
        >
          {Array.from("Primary Water").map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="inline-block"
              style={{ display: letter === " " ? "inline" : "inline-block" }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-blue-800 mb-3 md:mb-4">
          We Find Water Everywhere
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl text-blue-700 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed mb-6 md:mb-8">
          Unlock sustainable, weather-independent water sources with our innovative primary water location techniques. 
          Expert solutions for agriculture, industry, and communities worldwide.
        </p>
        <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
          <motion.button
            onClick={onDiscoverClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:shadow-lg hover:bg-blue-600 transition-all font-medium"
          >
            Discover Primary Water
          </motion.button>
          <motion.button
            onClick={onContactClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-white/80 hover:bg-white rounded-full shadow-md hover:shadow-lg transition-all text-blue-700 font-medium"
          >
            Contact Us
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

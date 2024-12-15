import { motion } from 'framer-motion'

export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-hero-gradient">
      <motion.div
        className="relative w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-blue-500/30"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 0 }}
          animate={{ scale: [0.8, 1.1, 0.8] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-4 h-4 bg-blue-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
      </motion.div>
    </div>
  )
}

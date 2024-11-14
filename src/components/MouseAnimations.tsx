import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface WaterDrop {
  id: string
  x: number
  y: number
}

interface MouseAnimationsProps {
  waterDrops: WaterDrop[]
  mousePosition: { x: number; y: number }
}

export function MouseAnimations({ waterDrops, mousePosition }: MouseAnimationsProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence mode="popLayout">
        {waterDrops.map((drop) => (
          <motion.div
            key={drop.id}
            initial={{ 
              opacity: 0.6,
              scale: 0.5,
              x: drop.x - 8,
              y: drop.y - 8,
            }}
            animate={{
              opacity: 0,
              scale: 1.5,
              x: drop.x - 8,
              y: drop.y + 20,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.32, 0, 0.67, 0],
            }}
            className="absolute w-4 h-4 rounded-full bg-blue-400/20 backdrop-blur-sm"
          />
        ))}
      </AnimatePresence>
      
      <motion.div
        className="w-6 h-6 rounded-full bg-blue-500/20 backdrop-blur-sm absolute"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: 'spring',
          stiffness: 1000,
          damping: 50,
          mass: 0.1,
        }}
      />
    </div>
  )
}
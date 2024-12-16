import { createContext, useContext, useState, ReactNode } from 'react'
import { generateWaterStats, calculateWaterScore } from '../lib/utils'

interface WaterDrop {
  id: string
  x: number
  y: number
}

interface WaterGameContextType {
  waterDrops: WaterDrop[]
  waterCollected: number
  mousePosition: { x: number; y: number }
  waterSources: Array<{
    stats: ReturnType<typeof generateWaterStats>
    score: number
  }>
  handleMouseMove: (e: React.MouseEvent) => void
}

const WaterGameContext = createContext<WaterGameContextType | undefined>(undefined)

export function WaterGameProvider({ children }: { children: ReactNode }) {
  const [waterDrops, setWaterDrops] = useState<WaterDrop[]>([])
  const [lastDropTime, setLastDropTime] = useState(0)
  const [waterCollected, setWaterCollected] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [waterSources] = useState(() => 
    Array.from({ length: 3 }, () => ({
      stats: generateWaterStats(),
      score: calculateWaterScore(generateWaterStats())
    }))
  )

  const createDrop = (x: number, y: number) => {
    const now = Date.now()
    if (now - lastDropTime < 50) return

    const newDrop: WaterDrop = {
      id: `drop-${now}-${Math.random().toString(36).substr(2, 9)}`,
      x,
      y,
    }

    setWaterDrops(prev => [...prev.slice(-5), newDrop])
    setLastDropTime(now)
    setWaterCollected(prev => prev + 1)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    setMousePosition({ x: clientX, y: clientY })
    createDrop(clientX, clientY)
  }

  return (
    <WaterGameContext.Provider
      value={{
        waterDrops,
        waterCollected,
        mousePosition,
        waterSources,
        handleMouseMove
      }}
    >
      {children}
    </WaterGameContext.Provider>
  )
}

export function useWaterGame() {
  const context = useContext(WaterGameContext)
  if (context === undefined) {
    throw new Error('useWaterGame must be used within a WaterGameProvider')
  }
  return context
}

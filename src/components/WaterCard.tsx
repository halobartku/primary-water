import { motion } from 'framer-motion'
import { Droplets, Thermometer, Gauge, ArrowDown } from 'lucide-react'

interface WaterCardProps {
  stats: {
    quality: number
    depth: number
    pressure: number
    temperature: number
  }
  score: number
  index: number
}

export function WaterCard({ stats, score, index }: WaterCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-blue-900">Water Source #{index + 1}</h3>
        <div className="text-2xl font-bold text-blue-500">{score}%</div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-blue-500" />
          <div>
            <div className="text-sm text-blue-700">Quality</div>
            <div className="font-semibold">{stats.quality}%</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <ArrowDown className="w-5 h-5 text-blue-500" />
          <div>
            <div className="text-sm text-blue-700">Depth</div>
            <div className="font-semibold">{stats.depth}m</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Gauge className="w-5 h-5 text-blue-500" />
          <div>
            <div className="text-sm text-blue-700">Pressure</div>
            <div className="font-semibold">{stats.pressure} PSI</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Thermometer className="w-5 h-5 text-blue-500" />
          <div>
            <div className="text-sm text-blue-700">Temperature</div>
            <div className="font-semibold">{stats.temperature}°C</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
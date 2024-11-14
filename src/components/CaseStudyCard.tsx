import { motion } from 'framer-motion'
import { MapPin, Droplets, ArrowDown, Play } from 'lucide-react'
import { useState } from 'react'

interface CaseStudyProps {
  location: string
  depth: number
  capacity: number
  index: number
  videoId: string
  description: string
  flag: string
}

export function CaseStudyCard({ location, depth, capacity, index, videoId, description, flag }: CaseStudyProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all group"
    >
      <div className="aspect-video w-full overflow-hidden rounded-t-2xl relative">
        {isPlaying ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={location}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0"
          />
        ) : (
          <div className="relative w-full h-full bg-blue-900/10 group cursor-pointer" onClick={() => setIsPlaying(true)}>
            <img 
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt={location}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-blue-900/30 group-hover:bg-blue-900/40 transition-colors">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/90 shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-blue-500 ml-1" />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <span className="text-2xl">{flag}</span>
          <div>
            <h3 className="text-xl font-bold text-blue-900">{location}</h3>
            <p className="text-blue-700 text-sm mt-2 line-clamp-2">{description}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <ArrowDown className="w-5 h-5 text-blue-500" />
            <div>
              <div className="text-sm text-blue-700">Depth</div>
              <div className="font-semibold">{depth}m</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-blue-500" />
            <div>
              <div className="text-sm text-blue-700">Daily Capacity</div>
              <div className="font-semibold">{capacity} m³/day</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
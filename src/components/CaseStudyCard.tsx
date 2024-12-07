import { Droplets, ArrowDown, Play } from 'lucide-react'
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
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all group h-full">
      <div className="aspect-video w-full overflow-hidden rounded-t-xl relative">
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
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90 shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 text-blue-500 ml-1" />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start gap-2 mb-3">
          <span className="text-xl">{flag}</span>
          <div>
            <h3 className="text-lg font-bold text-blue-900 line-clamp-1">{location}</h3>
            <p className="text-blue-700 text-xs mt-1 line-clamp-2">{description}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1">
            <ArrowDown className="w-4 h-4 text-blue-500" />
            <div>
              <div className="text-xs text-blue-700">Depth</div>
              <div className="text-sm font-semibold">{depth}m</div>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <Droplets className="w-4 h-4 text-blue-500" />
            <div>
              <div className="text-xs text-blue-700">Daily Capacity</div>
              <div className="text-sm font-semibold">{capacity} m³/day</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Droplets, ArrowDown, Play } from 'lucide-react'
import { useState } from 'react'

interface CaseStudyProps {
  location: string
  depth: number
  capacity: number
  videoId: string
  description: string
  flag: string
}

export function CaseStudyCard({ location, depth, capacity, videoId, description, flag }: CaseStudyProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-md shadow-md hover:shadow-lg transition-all group h-full">
      <div className="aspect-video w-full overflow-hidden rounded-t-md relative">
        {isPlaying ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={location}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-4"
          />
        ) : (
          <div className="relative w-full h-full bg-blue-900/10 group cursor-pointer" onClick={() => setIsPlaying(true)}>
            <img 
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt={location}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-blue-900/30 group-hover:bg-blue-900/40 transition-colors">
              <div className="w-7 h-7 flex items-center justify-center rounded-full bg-white/90 shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-3 h-3 text-blue-500 ml-0.5" />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="p-2">
        <div className="flex items-start gap-2">
          <span className="text-base leading-none">{flag}</span>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-blue-900 leading-tight">{location}</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <ArrowDown className="w-3 h-3 text-blue-500 flex-shrink-0" />
                  <div className="text-[11px] font-semibold leading-tight text-blue-900">{depth}m</div>
                </div>
                <div className="flex items-center gap-1">
                  <Droplets className="w-3 h-3 text-blue-500 flex-shrink-0" />
                  <div className="text-[11px] font-semibold leading-tight text-blue-900">{capacity} m³/day</div>
                </div>
              </div>
            </div>
            <p className="text-xs text-blue-700 mt-1.5 leading-snug">{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

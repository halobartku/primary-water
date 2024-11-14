import { motion } from 'framer-motion'
import { Search, CloudRain, Droplets, Award } from 'lucide-react'

export function AboutUs() {
  const features = [
    {
      icon: Search,
      title: "Unique Discovery Methods",
      description: "We excel in discovering water sources where others have given up."
    },
    {
      icon: CloudRain,
      title: "Weather Independent",
      description: "Our water sources remain unaffected by weather conditions or rainfall."
    },
    {
      icon: Droplets,
      title: "Superior Quality",
      description: "Water quality surpasses typical groundwater, free from contamination."
    },
    {
      icon: Award,
      title: "No-Find, No-Pay",
      description: "You only pay when water is successfully located."
    }
  ]

  const process = [
    {
      step: 1,
      title: "Planning",
      description: "Pre-planning and agreement signing"
    },
    {
      step: 2,
      title: "Preparation",
      description: "Equipment and permits securing"
    },
    {
      step: 3,
      title: "Analysis",
      description: "Field measurements and lab data analysis"
    },
    {
      step: 4,
      title: "Execution",
      description: "Professional drilling and casing"
    },
    {
      step: 5,
      title: "Measurement",
      description: "Water source capacity determination"
    },
    {
      step: 6,
      title: "Completion",
      description: "Final documentation and payment"
    }
  ]

  return (
    <div className="max-w-5xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-blue-900">About Us</h2>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="aspect-video rounded-xl overflow-hidden shadow-md mb-3">
                <video 
                  className="w-full h-full object-cover"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                >
                  <source src="https://primerywater.com/images/PrimaryWater1.mp4" type="video/mp4" />
                </video>
              </div>
              <p className="text-blue-700 text-sm leading-relaxed">
                Primary Water (PW) is understood by a narrow group of specialists worldwide. Only recently
                has the mainstream scientific community begun to discover its importance. Primary Water Sp. z o. o. 
                has the expertise to discover PW sources anywhere in the world.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white p-5 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Our Process</h3>
              <div className="space-y-3">
                {process.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 relative"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-xs font-bold">{step.step}</span>
                    </div>
                    
                    {index < process.length - 1 && (
                      <div className="absolute left-3 top-6 w-[1px] h-6 bg-blue-500/30" />
                    )}
                    
                    <div className="flex-1">
                      <h4 className="text-blue-200 font-medium text-sm">{step.title}</h4>
                      <p className="text-blue-100 text-xs">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-blue-50/50 p-3 rounded-xl group hover:bg-blue-50 transition-colors text-center"
              >
                <div className="p-1.5 rounded-lg bg-white text-blue-500 mx-auto w-fit mb-2 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-blue-900 mb-0.5">{feature.title}</h3>
                  <p className="text-blue-700 text-xs leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
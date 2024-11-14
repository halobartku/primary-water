import { motion } from 'framer-motion'
import { Droplets, Mountain, Leaf, Gauge, ExternalLink, FileText } from 'lucide-react'

export function WhatIsPrimaryWater() {
  const features = [
    {
      icon: Mountain,
      title: "Deep Earth Origin",
      description: "Forms through geological processes deep within the Earth's crust, creating a renewable water source independent of surface conditions."
    },
    {
      icon: Droplets,
      title: "Natural Filtration",
      description: "Water undergoes natural purification as it moves through various rock layers, enriching it with essential minerals."
    },
    {
      icon: Leaf,
      title: "Sustainable Solution",
      description: "Provides a continuous supply of fresh water, unaffected by climate changes or seasonal variations in rainfall."
    },
    {
      icon: Gauge,
      title: "High Pressure System",
      description: "Natural geological pressure helps bring water to the surface, reducing energy needs for extraction and distribution."
    }
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
          What is Primary Water?
        </h2>
        <p className="text-lg text-blue-700 max-w-2xl mx-auto leading-relaxed">
          Discover a revolutionary approach to water sourcing that taps into Earth's natural water creation process
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto scale-85">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-morphism p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/30 rounded-full -mr-16 -mt-16 transform group-hover:scale-150 transition-transform duration-500 ease-out" />
            
            <div className="relative z-10">
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                <div className="w-12 h-12 rounded-2xl bg-primary-gradient flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                {feature.title}
              </h3>
              
              <p className="text-blue-700 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-8 space-y-4"
      >
        <a
          href="https://findprimarywater.com/images/Primary%20Water%20Introduction%20EN.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:shadow-lg hover:bg-blue-600 transition-all group"
        >
          <FileText className="w-5 h-5" />
          <span className="font-medium">Primary Water Introduction</span>
          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>

        <div>
          <a
            href="https://primarywaterinstitute.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 hover:bg-white rounded-full shadow-md hover:shadow-lg transition-all group"
          >
            <span className="text-blue-700 font-medium">Learn more at Primary Water Institute</span>
            <ExternalLink className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </motion.div>
    </div>
  )
}
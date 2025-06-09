import { useState } from 'react'
import { motion } from 'framer-motion'

interface PricingCalculatorProps {
  className?: string
}

export function PricingCalculator({ className = '' }: PricingCalculatorProps) {
  const [volume, setVolume] = useState(100000)
  const [activeCard, setActiveCard] = useState<string | null>(null)

  // Calculations
  const instantTotal = volume * 400
  const balancedMonthly = volume * 15
  const balancedTotal = volume * 540
  const premiumMonthly = volume * 10
  const premiumTotal = volume * 700

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const generateTimelineData = () => {
    const keyMonths = [0, 1, 6, 12, 18, 24, 30, 36, 48, 60, 70]

    return keyMonths.map(month => {
      let instantCumulative, balancedCumulative, premiumCumulative
      let instantMonthlyPayment = 0, balancedMonthlyPayment = 0, premiumMonthlyPayment = 0

      if (month === 0) {
        instantCumulative = instantTotal
        balancedCumulative = 0
        premiumCumulative = 0
        instantMonthlyPayment = instantTotal
      } else {
        instantCumulative = instantTotal
        balancedCumulative = month <= 36 ? month * balancedMonthly : balancedTotal
        premiumCumulative = month <= 70 ? month * premiumMonthly : premiumTotal

        if (month <= 36) balancedMonthlyPayment = balancedMonthly
        if (month <= 70) premiumMonthlyPayment = premiumMonthly
      }

      // Determine best option
      let bestOption = 'Instant'
      let maxValue = instantCumulative

      if (balancedCumulative > maxValue) {
        bestOption = '36-Month'
        maxValue = balancedCumulative
      }
      if (premiumCumulative > maxValue) {
        bestOption = '70-Month'
      }

      return {
        month,
        instantMonthlyPayment,
        balancedMonthlyPayment,
        premiumMonthlyPayment,
        instantCumulative,
        balancedCumulative,
        premiumCumulative,
        bestOption,
        isHighlight: month === 0 || month === 36 || month === 70
      }
    })
  }

  const timelineData = generateTimelineData()

  return (
    <div className={`py-8 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Content */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-blue-900">
              💧 Water Supply Partnership Calculator
            </h1>
            <p className="text-lg md:text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed">
              Choose the optimal payment structure that maximizes your revenue while providing flexible cash flow options for your business growth
            </p>
          </div>
          {/* Input Section */}
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-8 rounded-2xl mb-12 text-center border-2 border-slate-200">
            <div className="inline-block">
              <label htmlFor="volume" className="block text-xl font-semibold text-slate-800 mb-4">
                Enter Water Volume (m³):
              </label>
              <input
                type="number"
                id="volume"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value) || 1)}
                min="1"
                step="1000"
                className="w-64 px-6 py-4 text-xl font-semibold text-center border-3 border-slate-300 rounded-xl
                         focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none
                         transition-all duration-300 hover:transform hover:-translate-y-1"
              />
            </div>
          </div>
          {/* Models Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Instant Payment Model */}
            <motion.div
              className={`bg-gradient-to-br from-red-50 to-white rounded-2xl p-8 border-3 border-red-200
                         relative overflow-hidden transition-all duration-300 cursor-pointer
                         hover:transform hover:-translate-y-2 hover:shadow-xl hover:border-red-500
                         ${activeCard === 'instant' ? 'ring-4 ring-red-200' : ''}`}
              onClick={() => setActiveCard(activeCard === 'instant' ? null : 'instant')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-red-600"></div>
              <div className="bg-red-600 text-white px-5 py-2 rounded-full text-sm font-semibold mb-5 inline-block">
                INSTANT LIQUIDITY
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-5">🚀 Immediate Payment</h3>
              <div className="text-3xl font-extrabold text-red-600 mb-5">€400 per m³</div>

              <div className="bg-black/5 p-5 rounded-xl mb-5 border-l-4 border-red-600">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Per m³ rate:</span>
                  <span className="font-semibold">€400</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Payment terms:</span>
                  <span className="font-semibold">Single payment</span>
                </div>
                <div className="flex justify-between items-center pt-4 mt-4 border-t-2 border-slate-200 font-bold text-lg text-red-600">
                  <span>Total Revenue:</span>
                  <span>{formatCurrency(instantTotal)}</span>
                </div>
              </div>

              <div className="text-left">
                <h4 className="font-semibold text-slate-800 mb-3 text-lg">Perfect for:</h4>
                <ul className="space-y-2">
                  {['Immediate capital needs', 'Quick project funding', 'No long-term commitment', 'One-time transactions'].map((item, idx) => (
                    <li key={idx} className="flex items-center text-slate-600">
                      <span className="text-red-600 font-bold text-lg mr-3">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Balanced Payment Model */}
            <motion.div
              className={`bg-gradient-to-br from-orange-50 to-white rounded-2xl p-8 border-3 border-orange-200
                         relative overflow-hidden transition-all duration-300 cursor-pointer
                         hover:transform hover:-translate-y-2 hover:shadow-xl hover:border-orange-500
                         ${activeCard === 'balanced' ? 'ring-4 ring-orange-200' : ''}`}
              onClick={() => setActiveCard(activeCard === 'balanced' ? null : 'balanced')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-orange-600"></div>
              <div className="bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-semibold mb-5 inline-block">
                BALANCED APPROACH
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-5">⚖️ 36-Month Plan</h3>
              <div className="text-3xl font-extrabold text-orange-600 mb-5">€15 × 36 months</div>

              <div className="bg-black/5 p-5 rounded-xl mb-5 border-l-4 border-orange-600">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Monthly per m³:</span>
                  <span className="font-semibold">€15</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Payment period:</span>
                  <span className="font-semibold">36 months</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Total per m³:</span>
                  <span className="font-semibold">€540</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Monthly payment:</span>
                  <span className="font-semibold">{formatCurrency(balancedMonthly)}</span>
                </div>
                <div className="flex justify-between items-center pt-4 mt-4 border-t-2 border-slate-200 font-bold text-lg text-orange-600">
                  <span>Total Revenue:</span>
                  <span>{formatCurrency(balancedTotal)}</span>
                </div>
              </div>

              <div className="text-left">
                <h4 className="font-semibold text-slate-800 mb-3 text-lg">Ideal for:</h4>
                <ul className="space-y-2">
                  {['Steady income stream', 'Medium-term planning', '35% higher total revenue', 'Manageable payment periods'].map((item, idx) => (
                    <li key={idx} className="flex items-center text-slate-600">
                      <span className="text-orange-600 font-bold text-lg mr-3">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Premium Payment Model */}
            <motion.div
              className={`bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 border-3 border-green-200
                         relative overflow-hidden transition-all duration-300 cursor-pointer
                         hover:transform hover:-translate-y-2 hover:shadow-xl hover:border-green-500
                         ${activeCard === 'premium' ? 'ring-4 ring-green-200' : ''}`}
              onClick={() => setActiveCard(activeCard === 'premium' ? null : 'premium')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-green-600"></div>
              <div className="bg-green-600 text-white px-5 py-2 rounded-full text-sm font-semibold mb-5 inline-block">
                MAXIMUM REVENUE
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-5">💎 Premium 70-Month Plan</h3>
              <div className="text-3xl font-extrabold text-green-600 mb-5">€10 × 70 months</div>

              <div className="bg-black/5 p-5 rounded-xl mb-5 border-l-4 border-green-600">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Monthly per m³:</span>
                  <span className="font-semibold">€10</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Payment period:</span>
                  <span className="font-semibold">70 months</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Total per m³:</span>
                  <span className="font-semibold">€700</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Monthly payment:</span>
                  <span className="font-semibold">{formatCurrency(premiumMonthly)}</span>
                </div>
                <div className="flex justify-between items-center pt-4 mt-4 border-t-2 border-slate-200 font-bold text-lg text-green-600">
                  <span>Total Revenue:</span>
                  <span>{formatCurrency(premiumTotal)}</span>
                </div>
              </div>

              <div className="text-left">
                <h4 className="font-semibold text-slate-800 mb-3 text-lg">Best for:</h4>
                <ul className="space-y-2">
                  {['Maximum profit potential', '75% higher total revenue', 'Long-term partnerships', 'Sustainable cash flow'].map((item, idx) => (
                    <li key={idx} className="flex items-center text-slate-600">
                      <span className="text-green-600 font-bold text-lg mr-3">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
          {/* Timeline Section */}
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-8 md:p-12 rounded-3xl">
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                📊 Revenue Timeline Comparison
              </h3>
              <p className="text-lg text-slate-600">
                Track cumulative earnings and identify optimal break-even points
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-2xl overflow-hidden shadow-lg text-sm md:text-base">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
                    <th className="px-3 md:px-6 py-4 text-center font-semibold">Period</th>
                    <th className="px-3 md:px-6 py-4 text-center font-semibold">
                      Instant<br />Monthly
                    </th>
                    <th className="px-3 md:px-6 py-4 text-center font-semibold">
                      36-Month<br />Monthly
                    </th>
                    <th className="px-3 md:px-6 py-4 text-center font-semibold">
                      70-Month<br />Monthly
                    </th>
                    <th className="px-3 md:px-6 py-4 text-center font-semibold">
                      Instant<br />Cumulative
                    </th>
                    <th className="px-3 md:px-6 py-4 text-center font-semibold">
                      36-Month<br />Cumulative
                    </th>
                    <th className="px-3 md:px-6 py-4 text-center font-semibold">
                      70-Month<br />Cumulative
                    </th>
                    <th className="px-3 md:px-6 py-4 text-center font-semibold">Best Option</th>
                  </tr>
                </thead>
                <tbody>
                  {timelineData.map((row, index) => (
                    <motion.tr
                      key={row.month}
                      className={`
                        ${index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}
                        ${row.isHighlight ? 'bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 border-yellow-400' : ''}
                        hover:bg-blue-50 transition-colors duration-200
                      `}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="px-3 md:px-6 py-4 text-center font-semibold">
                        {row.month === 0 ? 'Start' : row.month}
                      </td>
                      <td className="px-3 md:px-6 py-4 text-center">
                        {formatCurrency(row.instantMonthlyPayment)}
                      </td>
                      <td className="px-3 md:px-6 py-4 text-center">
                        {formatCurrency(row.balancedMonthlyPayment)}
                      </td>
                      <td className="px-3 md:px-6 py-4 text-center">
                        {formatCurrency(row.premiumMonthlyPayment)}
                      </td>
                      <td className="px-3 md:px-6 py-4 text-center">
                        {formatCurrency(row.instantCumulative)}
                      </td>
                      <td className="px-3 md:px-6 py-4 text-center">
                        {formatCurrency(row.balancedCumulative)}
                      </td>
                      <td className="px-3 md:px-6 py-4 text-center">
                        {formatCurrency(row.premiumCumulative)}
                      </td>
                      <td className="px-3 md:px-6 py-4 text-center font-bold">
                        {row.bestOption}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
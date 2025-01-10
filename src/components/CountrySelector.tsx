import { getCountriesByRegion } from '../data/countries';

interface CountrySelectorProps {
  onSelect: (countryCode: string) => void;
}

export function CountrySelector({ onSelect }: CountrySelectorProps) {
  const countriesByRegion = getCountriesByRegion();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-3">Water Stress Analysis</h2>
        <p className="text-blue-700 text-base mb-8">
          Explore water stress levels, resource availability, and usage patterns across different countries.
        </p>

        <div className="relative mb-12">
          <select
            onChange={(e) => onSelect(e.target.value)}
            className="w-full p-4 bg-white/70 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-blue-900 appearance-none cursor-pointer shadow-sm hover:border-blue-300 transition-colors"
            defaultValue=""
          >
            <option value="" disabled>Choose a country to analyze...</option>
            {Array.from(countriesByRegion.entries()).map(([region, countries]) => (
              <optgroup key={region} label={region} className="text-blue-900">
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Information cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Water Stress Level</h3>
            <p className="text-blue-700 leading-relaxed">
              Understand the pressure on renewable water resources and sustainability of water usage.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Resource Distribution</h3>
            <p className="text-blue-700 leading-relaxed">
              Analyze water usage across industrial, domestic, and agricultural sectors.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Risk Assessment</h3>
            <p className="text-blue-700 leading-relaxed">
              Evaluate drought risk, flood risk, and other water-related challenges.
            </p>
          </div>
        </div>

        <div className="text-sm text-blue-600">
          Data source: World Bank Water Data Indicators
        </div>
      </div>
    </div>
  );
}

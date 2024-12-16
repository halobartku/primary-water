import { getCountriesByRegion } from '../data/countries';

interface CountrySelectorProps {
  onSelect: (countryCode: string) => void;
}

export function CountrySelector({ onSelect }: CountrySelectorProps) {
  const countriesByRegion = getCountriesByRegion();

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-2">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 sm:p-6 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Water Stress Analysis</h2>
          <p className="text-sm text-gray-600 mb-4">
            Explore water stress levels, resource availability, and usage patterns across different countries.
          </p>

          <div className="relative">
            <select
              onChange={(e) => onSelect(e.target.value)}
              className="w-full p-3 pr-10 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none cursor-pointer"
              defaultValue=""
            >
              <option value="" disabled>Choose a country to analyze...</option>
              {Array.from(countriesByRegion.entries()).map(([region, countries]) => (
                <optgroup key={region} label={region} className="text-gray-700">
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Information cards */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Water Stress Level</h3>
              <p className="text-xs text-gray-600">
                Understand the pressure on renewable water resources and sustainability of water usage.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Resource Distribution</h3>
              <p className="text-xs text-gray-600">
                Analyze water usage across industrial, domestic, and agricultural sectors.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Risk Assessment</h3>
              <p className="text-xs text-gray-600">
                Evaluate drought risk, flood risk, and other water-related challenges.
              </p>
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-500">
            Data source: World Bank Water Data Indicators
          </div>
        </div>
      </div>
    </div>
  );
}

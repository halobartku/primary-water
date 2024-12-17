import { useState, useEffect } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { WaterStressIndicator } from './WaterStressIndicator';
import { WaterMetrics } from './WaterMetrics';
import { WaterRiskAssessment } from './WaterRiskAssessment';
import { WaterUsage } from './WaterUsage';
import { CountrySelector } from './CountrySelector';
import { fetchWaterData } from '../services/worldbank';
import { calculateWaterStressData } from '../utils/waterCalculations';
import type { WaterStressData } from '../utils/waterCalculations';

interface ExtendedWaterData extends WaterStressData {
  industrialUse: number | null;
  domesticUse: number | null;
  agricultureUse: number | null;
  totalWithdrawal: number | null;
}

export default function WaterStressVisualization() {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ExtendedWaterData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedCountry) return;

      setLoading(true);
      setError(null);

      try {
        const rawData = await fetchWaterData(selectedCountry);
        const processedData = calculateWaterStressData(rawData);
        
        setData({
          ...processedData,
          industrialUse: rawData.industrialUse,
          domesticUse: rawData.domesticUse,
          agricultureUse: rawData.agricultureUse,
          totalWithdrawal: rawData.totalWithdrawal
        });
      } catch (err) {
        console.error('Error fetching water stress data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCountry]);

  if (!selectedCountry) {
    return <CountrySelector onSelect={setSelectedCountry} />;
  }

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-2">
        <div className="flex justify-center items-center min-h-[300px]">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-2">
      <div className="bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="p-3 bg-gray-50 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <h2 className="text-xl font-bold text-gray-800">Water Stress Analysis</h2>
            <button
              onClick={() => setSelectedCountry('')}
              className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
            >
              Choose Different Country
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-3">
          {error && (
            <div className="p-2 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          {data && (
            <div className="space-y-3">
              <WaterStressIndicator 
                waterStress={data.waterStress}
                year={data.year}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <WaterMetrics
                  population={data.waterAccess}
                  waterResources={data.waterResources}
                  waterProductivity={data.waterProductivity}
                />

                <WaterUsage
                  industrialUse={data.industrialUse}
                  domesticUse={data.domesticUse}
                  agricultureUse={data.agricultureUse}
                  totalWithdrawal={data.totalWithdrawal}
                />

                <WaterRiskAssessment
                  droughtRisk={data.droughtRisk}
                  floodRisk={data.floodRisk}
                  groundwaterDepletion={data.groundwaterDepletion}
                  seasonalVariability={data.seasonalVariability}
                />
              </div>

              <div className="bg-blue-50 p-2 rounded-lg text-xs">
                <h4 className="font-medium text-blue-800 mb-1">Understanding Water Stress</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-gray-700">
                  <div className="flex items-baseline gap-1">
                    <span className="font-medium">•</span>
                    <div>
                      <strong>Water Stress:</strong>
                      <span className="text-gray-600"> Pressure on water resources</span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-medium">•</span>
                    <div>
                      <strong>Population Access:</strong>
                      <span className="text-gray-600"> Basic water services</span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-medium">•</span>
                    <div>
                      <strong>Resources:</strong>
                      <span className="text-gray-600"> Available freshwater per capita</span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-medium">•</span>
                    <div>
                      <strong>Productivity:</strong>
                      <span className="text-gray-600"> Economic output per water unit</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-500 mt-1.5 text-[10px]">
                  Source: World Bank Water Data Indicators ({data.year})
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

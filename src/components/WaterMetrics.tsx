import { THRESHOLDS } from '../utils/waterCalculations';

interface WaterMetricsProps {
  population: number;
  waterResources: number;
  waterProductivity: number;
}

export function WaterMetrics({ population, waterResources, waterProductivity }: WaterMetricsProps) {
  return (
    <div className="bg-gray-50 p-3 rounded-lg">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Key Metrics</h4>
      <div className="space-y-2">
        <div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Population With Access</span>
            <span className={`font-medium ${
              population < THRESHOLDS.WATER_ACCESS.SEVERE.value ? 'text-red-600' :
              population < THRESHOLDS.WATER_ACCESS.HIGH.value ? 'text-orange-600' :
              population < THRESHOLDS.WATER_ACCESS.MODERATE.value ? 'text-yellow-600' : 'text-green-600'
            }`}>
              {population.toFixed(1)}%
            </span>
          </div>
          <div className="text-[10px] text-gray-500">
            {population < THRESHOLDS.WATER_ACCESS.SEVERE.value
              ? THRESHOLDS.WATER_ACCESS.SEVERE.consequence
              : population < THRESHOLDS.WATER_ACCESS.HIGH.value
              ? THRESHOLDS.WATER_ACCESS.HIGH.consequence
              : population < THRESHOLDS.WATER_ACCESS.MODERATE.value
              ? THRESHOLDS.WATER_ACCESS.MODERATE.consequence
              : THRESHOLDS.WATER_ACCESS.GOOD.consequence}
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Water Resources</span>
            <span className="font-medium">{(waterResources / 1000).toFixed(1)}K m³/capita</span>
          </div>
          <div className="text-[10px] text-gray-500">
            {waterResources < THRESHOLDS.RESOURCES_PER_CAPITA.ABSOLUTE_SCARCITY.value
              ? THRESHOLDS.RESOURCES_PER_CAPITA.ABSOLUTE_SCARCITY.consequence
              : waterResources < THRESHOLDS.RESOURCES_PER_CAPITA.SCARCITY.value
              ? THRESHOLDS.RESOURCES_PER_CAPITA.SCARCITY.consequence
              : waterResources < THRESHOLDS.RESOURCES_PER_CAPITA.STRESS.value
              ? THRESHOLDS.RESOURCES_PER_CAPITA.STRESS.consequence
              : THRESHOLDS.RESOURCES_PER_CAPITA.SUFFICIENT.consequence}
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Water Productivity</span>
            <span className="font-medium">${waterProductivity.toFixed(2)}/m³</span>
          </div>
          <div className="text-[10px] text-gray-500">GDP per cubic meter of water used</div>
        </div>
      </div>
    </div>
  );
}

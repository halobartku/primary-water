import { getRiskLevel } from '../utils/waterCalculations';

interface WaterRiskAssessmentProps {
  droughtRisk: number;
  floodRisk: number;
  groundwaterDepletion: number;
  seasonalVariability: number;
}

export function WaterRiskAssessment({
  droughtRisk,
  floodRisk,
  groundwaterDepletion,
  seasonalVariability
}: WaterRiskAssessmentProps) {
  const getRiskColor = (risk: number) => {
    if (risk >= 3) return 'text-red-600';
    if (risk === 2) return 'text-orange-600';
    return 'text-green-600';
  };

  const getDepletionColor = (depletion: number) => {
    if (depletion > 5) return 'text-red-600';
    if (depletion > 2) return 'text-orange-600';
    return 'text-green-600';
  };

  const RiskIndicator = ({ level }: { level: number }) => {
    const dots = Array(4).fill(0);
    return (
      <div className="flex gap-0.5">
        {dots.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full ${
              i < level 
                ? getRiskColor(level)
                : 'bg-gray-300'
            } ${i < level ? 'bg-current' : ''}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 p-3 rounded-lg">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Risk Assessment</h4>
      <div className="space-y-2">
        <div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Drought Risk</span>
            <div className="flex items-center gap-2">
              <RiskIndicator level={droughtRisk} />
              <span className={`font-medium ${getRiskColor(droughtRisk)}`}>
                {getRiskLevel(droughtRisk)}
              </span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Flood Risk</span>
            <div className="flex items-center gap-2">
              <RiskIndicator level={floodRisk} />
              <span className={`font-medium ${getRiskColor(floodRisk)}`}>
                {getRiskLevel(floodRisk)}
              </span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Groundwater Depletion</span>
            <span className={`font-medium ${getDepletionColor(groundwaterDepletion)}`}>
              {groundwaterDepletion.toFixed(1)}%/year
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Seasonal Variability</span>
            <div className="flex items-center gap-2">
              <RiskIndicator level={seasonalVariability} />
              <span className={`font-medium ${getRiskColor(seasonalVariability)}`}>
                {getRiskLevel(seasonalVariability)}
              </span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-2 pt-2 border-t border-gray-200 grid grid-cols-2 gap-x-2 text-[10px] text-gray-500">
          <div>• Low: Minimal risk</div>
          <div>• Medium: Moderate risk</div>
          <div>• High: Significant risk</div>
          <div>• Very High: Critical risk</div>
        </div>
      </div>
    </div>
  );
}
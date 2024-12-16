import { THRESHOLDS, getStressLevel } from '../utils/waterCalculations';

interface WaterStressIndicatorProps {
  waterStress: number;
  year: number;
}

export function WaterStressIndicator({ waterStress, year }: WaterStressIndicatorProps) {
  const getStressColor = (stress: number): string => {
    if (stress < THRESHOLDS.WATER_STRESS.LOW.value) return 'bg-green-500';
    if (stress < THRESHOLDS.WATER_STRESS.MEDIUM.value) return 'bg-yellow-500';
    if (stress < THRESHOLDS.WATER_STRESS.HIGH.value) return 'bg-orange-500';
    if (stress < THRESHOLDS.WATER_STRESS.SEVERE.value) return 'bg-red-500';
    return 'bg-purple-500';
  };

  // Calculate percentage for visualization (capped at 100% for display)
  const displayPercentage = Math.min(waterStress, 100);

  const getStressDescription = (stress: number): { level: string; impact: string } => {
    if (stress > 100) {
      return {
        level: `${stress.toFixed(1)}% of renewable resources`,
        impact: 'Exceeding sustainable limits'
      };
    }
    if (stress > 80) {
      return {
        level: `${stress.toFixed(1)}% of renewable resources`,
        impact: 'Extremely high stress'
      };
    }
    if (stress > 40) {
      return {
        level: `${stress.toFixed(1)}% of renewable resources`,
        impact: 'High stress'
      };
    }
    if (stress > 20) {
      return {
        level: `${stress.toFixed(1)}% of renewable resources`,
        impact: 'Medium-high stress'
      };
    }
    if (stress > 10) {
      return {
        level: `${stress.toFixed(1)}% of renewable resources`,
        impact: 'Low-medium stress'
      };
    }
    return {
      level: `${stress.toFixed(1)}% of renewable resources`,
      impact: 'Sustainable use'
    };
  };

  const description = getStressDescription(waterStress);

  return (
    <div className="bg-gray-50 p-3 rounded-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
        <div>
          <h3 className="text-base font-semibold">Water Stress Level</h3>
          <p className="text-xs text-gray-500">
            Annual withdrawal of renewable water resources
          </p>
        </div>
        <span className="text-xs text-gray-500 whitespace-nowrap">Data from {year}</span>
      </div>
      
      {/* Progress bar */}
      <div className="relative h-2.5 bg-gray-200 rounded-full overflow-hidden mb-1.5">
        {/* Threshold markers */}
        {Object.entries(THRESHOLDS.WATER_STRESS).map(([key, { value }]) => (
          <div
            key={key}
            className="absolute top-0 bottom-0 border-l border-gray-300"
            style={{ 
              left: `${Math.min(100, value)}%`,
              borderColor: value > 100 ? 'transparent' : undefined
            }}
          />
        ))}
        {/* Stress level indicator */}
        <div
          className={`absolute left-0 top-0 h-full ${getStressColor(waterStress)} transition-all duration-500`}
          style={{ width: `${displayPercentage}%` }}
        />
      </div>

      {/* Threshold labels */}
      <div className="flex justify-between text-[10px] text-gray-500 mb-2">
        <span>0%</span>
        <span>20%</span>
        <span>40%</span>
        <span>80%</span>
      </div>

      {/* Status and explanation */}
      <div className="space-y-1.5">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
          <p className="text-sm font-medium text-gray-700">
            {getStressLevel(waterStress)}
          </p>
          <div className="flex flex-col text-xs">
            <span className="text-gray-600">{description.level}</span>
            <span className="text-gray-500">{description.impact}</span>
          </div>
        </div>
        
        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-0.5 text-[10px] text-gray-500 pt-1.5 border-t border-gray-200">
          <div>• &lt;10%: Sustainable</div>
          <div>• 10-20%: Low-medium</div>
          <div>• 20-40%: Medium-high</div>
          <div>• 40-80%: High</div>
          <div>• &gt;80%: Extreme</div>
          <div>• &gt;100%: Unsustainable</div>
        </div>
      </div>
    </div>
  );
}

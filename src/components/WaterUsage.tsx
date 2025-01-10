interface WaterUsageProps {
  industrialUse: number | null;
  domesticUse: number | null;
  agricultureUse: number | null;
  totalWithdrawal: number | null;
}

export function WaterUsage({ 
  industrialUse, 
  domesticUse, 
  agricultureUse,
  totalWithdrawal 
}: WaterUsageProps) {
  // Calculate percentages ensuring they sum to 100%
  const normalizePercentages = () => {
    const values = [industrialUse, domesticUse, agricultureUse]
      .map(v => v ?? 0)
      .filter(v => v > 0);
    
    if (values.length === 0) return [0, 0, 0];
    
    const total = values.reduce((a, b) => a + b, 0);
    return [
      industrialUse ? (industrialUse / total) * 100 : 0,
      domesticUse ? (domesticUse / total) * 100 : 0,
      agricultureUse ? (agricultureUse / total) * 100 : 0
    ];
  };

  const [indPercent, domPercent, agrPercent] = normalizePercentages();

  // Format the total withdrawal value
  const formatWithdrawal = (value: number | null): string => {
    if (value === null) return 'N/A';
    if (value < 1) return `${(value * 1000).toFixed(0)} million m³`;
    return `${value.toFixed(1)} billion m³`;
  };

  // Calculate stroke-dasharray values for the circular segments
  const circumference = 2 * Math.PI * 25; // radius = 25
  const getStrokeDashArray = (percentage: number) => {
    const length = (percentage / 100) * circumference;
    return `${length} ${circumference - length}`;
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm p-3 rounded-xl shadow-sm">
      <h4 className="text-sm font-medium text-blue-900 mb-2">Water Usage by Sector</h4>
      
      <div className="flex items-start space-x-3">
        {/* SVG Pie Chart */}
        <div className="relative flex-shrink-0">
          <svg width="70" height="70" viewBox="0 0 70 70" className="transform -rotate-90">
            {/* Agriculture (green) */}
            <circle
              cx="35"
              cy="35"
              r="25"
              fill="none"
              stroke="#22c55e"
              strokeWidth="16"
              strokeDasharray={getStrokeDashArray(agrPercent)}
              className="transition-all duration-500"
            />
            {/* Industrial (blue) */}
            <circle
              cx="35"
              cy="35"
              r="25"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="16"
              strokeDasharray={getStrokeDashArray(indPercent)}
              strokeDashoffset={-((agrPercent / 100) * circumference)}
              className="transition-all duration-500"
            />
            {/* Domestic (orange) */}
            <circle
              cx="35"
              cy="35"
              r="25"
              fill="none"
              stroke="#f97316"
              strokeWidth="16"
              strokeDasharray={getStrokeDashArray(domPercent)}
              strokeDashoffset={-(((agrPercent + indPercent) / 100) * circumference)}
              className="transition-all duration-500"
            />
          </svg>
        </div>

        {/* Legend and percentages */}
        <div className="flex-grow min-w-0">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-sm mr-1.5" />
                <span className="text-blue-700">Industrial</span>
              </div>
              <span className="font-medium text-blue-900">{indPercent.toFixed(1)}%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-sm mr-1.5" />
                <span className="text-blue-700">Domestic</span>
              </div>
              <span className="font-medium text-blue-900">{domPercent.toFixed(1)}%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-sm mr-1.5" />
                <span className="text-blue-700">Agriculture</span>
              </div>
              <span className="font-medium text-blue-900">{agrPercent.toFixed(1)}%</span>
            </div>
          </div>
          
          {/* Total withdrawal */}
          <div className="mt-2 pt-2 border-t border-blue-100">
            <div className="flex justify-between items-center text-xs">
              <span className="text-blue-700">Total Annual Withdrawal</span>
              <span className="font-medium text-blue-900">{formatWithdrawal(totalWithdrawal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

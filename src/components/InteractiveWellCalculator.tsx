import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { generateWellReportPDF } from './pdfgenerator/index';

export const InteractiveWellCalculator = () => {
  // State for user inputs
  const [wellDepth, setWellDepth] = useState(250);
  const [staticLevel, setStaticLevel] = useState(20);
  const [dynamicLevel, setDynamicLevel] = useState(61);
  const [flowCoefficient, setFlowCoefficient] = useState(0.2);
  const [pumpDepth, setPumpDepth] = useState(245);
  const [placeName, setPlaceName] = useState(""); // New state for place name
  
  // Calculated values
  const [waterColumn, setWaterColumn] = useState(0);
  const [drawdown, setDrawdown] = useState(0);
  const [hourlyCapacity, setHourlyCapacity] = useState(0);
  const [dailyCapacity, setDailyCapacity] = useState(0);
  const [error, setError] = useState("");
  
  // Update calculated values when inputs change
  useEffect(() => {
    // Validation
    if (staticLevel > wellDepth) {
      setError("Static level cannot be greater than well depth");
      return;
    }
    if (dynamicLevel > wellDepth) {
      setError("Dynamic level cannot be greater than well depth");
      return;
    }
    if (dynamicLevel < staticLevel) {
      setError("Dynamic level must be greater than static level");
      return;
    }
    if (pumpDepth > wellDepth) {
      setError("Pump depth cannot be greater than well depth");
      return;
    }
    
    // Clear error if validation passes
    setError("");
    
    // Calculate values
    const hw = wellDepth - staticLevel;
    const dd = dynamicLevel - staticLevel;
    const q = flowCoefficient / dd * hw;
    
    setWaterColumn(hw);
    setDrawdown(dd);
    setHourlyCapacity(q);
    setDailyCapacity(q * 24);
  }, [wellDepth, staticLevel, dynamicLevel, flowCoefficient, pumpDepth]);
  
  // Scale factors for SVG diagram
  const totalHeight = 320;
  const scale = totalHeight / wellDepth;
  
  // Calculate positions for SVG elements
  const scaledStaticLevel = staticLevel * scale;
  const scaledDynamicLevel = dynamicLevel * scale;
  const scaledWellDepth = wellDepth * scale;
  
  // PDF Generation Function
  const generatePDF = () => {
    // Collect all data needed for the PDF
    const data = {
      placeName,
      wellDepth,
      staticLevel,
      dynamicLevel,
      pumpDepth,
      flowCoefficient,
      waterColumn,
      drawdown,
      hourlyCapacity,
      dailyCapacity
    };
    
    // Show loading indicator or message
    if (!placeName.trim()) {
      alert("Please enter a location name before generating a PDF");
      return;
    }
    
    // Generate the PDF using our utility
    generateWellReportPDF(data)
      .catch(error => {
        console.error("Error generating PDF:", error);
        alert("There was an error generating the PDF. Please try again.");
      });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center justify-center p-2">
      <div className="w-full max-w-7xl mx-auto mb-2 px-4">
        <Link 
          to="/"
          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Home</span>
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg max-w-7xl mx-auto w-full p-4 overflow-hidden scale-95 transform origin-top">
        <h2 className="text-xl md:text-2xl font-bold text-blue-900 mb-4 text-center">Primary Water Well Capacity Calculator</h2>
        
        {/* Location Input Field */}
        <div className="mb-4 max-w-md mx-auto">
          <label className="block text-sm font-medium text-blue-800 mb-1">Location Name:</label>
          <input 
            type="text" 
            value={placeName} 
            onChange={(e) => setPlaceName(e.target.value)}
            placeholder="Enter location name (required for PDF export)"
            className="w-full p-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-4 items-start justify-center">
          {/* Left side: Interactive diagram with sliders */}
          <div className="w-full lg:w-3/5 bg-white rounded-xl shadow-md p-3 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex justify-center">
                <div className="relative overflow-visible">
                  <svg width="320" height="340" viewBox="0 0 340 380" overflow="visible">
                    {/* Well structure */}
                    <rect x="170" y="20" width="40" height={totalHeight} fill="white" stroke="#333" strokeWidth="1.5" />
                    <rect x="180" y="20" width="20" height={totalHeight} fill="#f2f2f2" stroke="#333" strokeWidth="1.5" />
                    
                    {/* Static water level line */}
                    <line 
                      x1="170" 
                      y1={20 + scaledStaticLevel} 
                      x2="210" 
                      y2={20 + scaledStaticLevel} 
                      stroke="#aaa" 
                      strokeWidth="1" 
                      strokeDasharray="5,3" 
                    />
                    
                    {/* Dynamic water level line */}
                    <line 
                      x1="170" 
                      y1={20 + scaledDynamicLevel} 
                      x2="210" 
                      y2={20 + scaledDynamicLevel} 
                      stroke="#aaa" 
                      strokeWidth="1" 
                      strokeDasharray="5,3" 
                    />
                    
                    {/* Water - light blue for drawdown section */}
                    <rect 
                      x="180" 
                      y={20 + scaledStaticLevel} 
                      width="20" 
                      height={Math.min(scaledDynamicLevel - scaledStaticLevel, totalHeight - scaledStaticLevel)} 
                      fill="#a8d1ff" 
                    />
                    
                    {/* Water - dark blue for main water column */}
                    <rect 
                      x="180" 
                      y={20 + Math.min(scaledDynamicLevel, totalHeight)} 
                      width="20" 
                      height={Math.max(0, totalHeight - Math.min(scaledDynamicLevel, totalHeight))} 
                      fill="#0066cc" 
                    />
                    
                    {/* Static level arrow (Hs) - left side */}
                    <line 
                      x1="80" 
                      y1="20" 
                      x2="80" 
                      y2={20 + Math.min(scaledStaticLevel, totalHeight)} 
                      stroke="#4682b4" 
                      strokeWidth="1.5" 
                      strokeDasharray="5,3" 
                    />
                    <polygon 
                      points={`80,20 75,30 85,30`} 
                      fill="#4682b4" 
                    />
                    <polygon 
                      points={`80,${20 + Math.min(scaledStaticLevel, totalHeight)} 75,${10 + Math.min(scaledStaticLevel, totalHeight)} 85,${10 + Math.min(scaledStaticLevel, totalHeight)}`} 
                      fill="#4682b4" 
                    />
                    <text 
                      x="46" 
                      y={20 + Math.min(scaledStaticLevel, totalHeight)/2} 
                      fill="#4682b4" 
                      fontFamily="Arial" 
                      fontSize="16" 
                      fontWeight="bold"
                    >
                      Hs
                    </text>
                    <text 
                      x="44" 
                      y={20 + Math.min(scaledStaticLevel, totalHeight)/2 + 20} 
                      fill="#4682b4" 
                      fontFamily="Arial" 
                      fontSize="12"
                    >
                      {staticLevel.toFixed(0)}m
                    </text>
                    
                    {/* Dynamic level arrow (Hd) - left side */}
                    <line 
                      x1="130" 
                      y1="20" 
                      x2="130" 
                      y2={20 + Math.min(scaledDynamicLevel, totalHeight)} 
                      stroke="#4682b4" 
                      strokeWidth="1.5" 
                      strokeDasharray="5,3" 
                    />
                    <polygon 
                      points={`130,20 125,30 135,30`} 
                      fill="#4682b4" 
                    />
                    <polygon 
                      points={`130,${20 + Math.min(scaledDynamicLevel, totalHeight)} 125,${10 + Math.min(scaledDynamicLevel, totalHeight)} 135,${10 + Math.min(scaledDynamicLevel, totalHeight)}`} 
                      fill="#4682b4" 
                    />
                    <text 
                      x="94" 
                      y={20 + Math.min(scaledDynamicLevel, totalHeight)/2} 
                      fill="#4682b4" 
                      fontFamily="Arial" 
                      fontSize="16" 
                      fontWeight="bold"
                    >
                      Hd
                    </text>
                    <text 
                      x="92" 
                      y={20 + Math.min(scaledDynamicLevel, totalHeight)/2 + 20} 
                      fill="#4682b4" 
                      fontFamily="Arial" 
                      fontSize="12"
                    >
                      {dynamicLevel.toFixed(0)}m
                    </text>
                    
                    {/* Water column arrow (Hw) - right side */}
                    <line 
                      x1="245" 
                      y1={20 + Math.min(scaledStaticLevel, totalHeight)} 
                      x2="245" 
                      y2={20 + scaledWellDepth} 
                      stroke="#4682b4" 
                      strokeWidth="1.5" 
                      strokeDasharray="5,3" 
                    />
                    <polygon 
                      points={`245,${20 + Math.min(scaledStaticLevel, totalHeight)} 240,${30 + Math.min(scaledStaticLevel, totalHeight)} 250,${30 + Math.min(scaledStaticLevel, totalHeight)}`} 
                      fill="#4682b4" 
                    />
                    <polygon 
                      points={`245,${20 + scaledWellDepth} 240,${10 + scaledWellDepth} 250,${10 + scaledWellDepth}`} 
                      fill="#4682b4" 
                    />
                    <text 
                      x="260" 
                      y={20 + (Math.min(scaledStaticLevel, totalHeight) + scaledWellDepth)/2} 
                      fill="#4682b4" 
                      fontFamily="Arial" 
                      fontSize="16" 
                      fontWeight="bold"
                    >
                      Hw
                    </text>
                    <text 
                      x="260" 
                      y={20 + (Math.min(scaledStaticLevel, totalHeight) + scaledWellDepth)/2 + 20} 
                      fill="#4682b4" 
                      fontFamily="Arial" 
                      fontSize="12"
                    >
                      {waterColumn.toFixed(1)}m
                    </text>
                    
                    {/* H label (height) - left side near bottom */}
                    <line 
                      x1="25" 
                      y1="20" 
                      x2="25" 
                      y2={20 + Math.min(scaledWellDepth, totalHeight)} 
                      stroke="#4682b4" 
                      strokeWidth="1.5" 
                      strokeDasharray="5,3" 
                    />
                    <polygon 
                      points={`25,20 20,30 30,30`} 
                      fill="#4682b4" 
                    />
                    <polygon 
                      points={`25,${20 + Math.min(scaledWellDepth, totalHeight)} 20,${10 + Math.min(scaledWellDepth, totalHeight)} 30,${10 + Math.min(scaledWellDepth, totalHeight)}`} 
                      fill="#4682b4" 
                    />
                    <text 
                      x="44" 
                      y={20 + Math.min(scaledWellDepth, totalHeight) - 40} 
                      fill="#4682b4" 
                      fontFamily="Arial" 
                      fontSize="16" 
                      fontWeight="bold"
                    >
                      H
                    </text>
                    <text 
                      x="42" 
                      y={20 + Math.min(scaledWellDepth, totalHeight) - 20} 
                      fill="#4682b4" 
                      fontFamily="Arial" 
                      fontSize="12"
                    >
                      {wellDepth.toFixed(0)}m
                    </text>
                    
                    {/* Pump position - with higher z-index to ensure visibility */}
                    <g style={{ zIndex: 10 }}>
                      <line 
                        x1="170" 
                        y1={20 + Math.min(pumpDepth * scale, totalHeight)} 
                        x2="210" 
                        y2={20 + Math.min(pumpDepth * scale, totalHeight)} 
                        stroke="#ff6347" 
                        strokeWidth="2" 
                        strokeDasharray="5,3" 
                      />
                      <text 
                        x="125" 
                        y={25 + Math.min(pumpDepth * scale, totalHeight)} 
                        fill="#ff6347" 
                        fontFamily="Arial" 
                        fontSize="14" 
                        fontWeight="bold"
                      >
                        Pump
                      </text>
                      <text 
                        x="125" 
                        y={25 + Math.min(pumpDepth * scale, totalHeight) + 20} 
                        fill="#ff6347" 
                        fontFamily="Arial" 
                        fontSize="12"
                      >
                        {pumpDepth.toFixed(0)}m
                      </text>
                    </g>
                  </svg>
                </div>
              </div>
            
              {/* Interactive sliders for parameters */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium text-blue-800">Well Depth (H):</label>
                    <div className="flex items-center">
                      <input 
                        type="number" 
                        min="1" 
                        max="1000"
                        value={wellDepth} 
                        onChange={(e) => setWellDepth(Number(e.target.value))}
                        className="w-16 p-1 text-sm text-center border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                      <span className="ml-1 text-sm text-blue-700">m</span>
                    </div>
                  </div>
                  <input 
                    type="range" 
                    min="50" 
                    max="500"
                    value={wellDepth} 
                    onChange={(e) => setWellDepth(Number(e.target.value))}
                    className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium text-blue-800">Static Level (Hs):</label>
                    <div className="flex items-center">
                      <input 
                        type="number" 
                        min="0" 
                        max={wellDepth}
                        value={staticLevel} 
                        onChange={(e) => setStaticLevel(Number(e.target.value))}
                        className="w-16 p-1 text-sm text-center border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                      <span className="ml-1 text-sm text-blue-700">m</span>
                    </div>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max={wellDepth}
                    value={staticLevel} 
                    onChange={(e) => setStaticLevel(Number(e.target.value))}
                    className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium text-blue-800">Dynamic Level (Hd):</label>
                    <div className="flex items-center">
                      <input 
                        type="number" 
                        min={staticLevel} 
                        max={wellDepth}
                        value={dynamicLevel} 
                        onChange={(e) => setDynamicLevel(Number(e.target.value))}
                        className="w-16 p-1 text-sm text-center border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                      <span className="ml-1 text-sm text-blue-700">m</span>
                    </div>
                  </div>
                  <input 
                    type="range" 
                    min={staticLevel} 
                    max={wellDepth}
                    value={dynamicLevel} 
                    onChange={(e) => setDynamicLevel(Number(e.target.value))}
                    className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium text-blue-800">Pump Depth:</label>
                    <div className="flex items-center">
                      <input 
                        type="number" 
                        min={dynamicLevel} 
                        max={wellDepth}
                        value={pumpDepth} 
                        onChange={(e) => setPumpDepth(Number(e.target.value))}
                        className="w-16 p-1 text-sm text-center border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                      <span className="ml-1 text-sm text-blue-700">m</span>
                    </div>
                  </div>
                  <input 
                    type="range" 
                    min={dynamicLevel} 
                    max={wellDepth}
                    value={pumpDepth} 
                    onChange={(e) => setPumpDepth(Number(e.target.value))}
                    className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium text-blue-800">Flow Coefficient (V):</label>
                    <div className="flex items-center">
                      <input 
                        type="number" 
                        min="0.01" 
                        max="10"
                        step="0.01"
                        value={flowCoefficient} 
                        onChange={(e) => setFlowCoefficient(Number(e.target.value))}
                        className="w-16 p-1 text-sm text-center border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                      <span className="ml-1 text-sm text-blue-700">m³/h</span>
                    </div>
                  </div>
                  <input 
                    type="range" 
                    min="0.01" 
                    max="10"
                    step="0.01"
                    value={flowCoefficient} 
                    onChange={(e) => setFlowCoefficient(Number(e.target.value))}
                    className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
                
                {error && (
                  <div className="p-2 bg-red-50 text-red-700 rounded-md text-sm border border-red-200">
                    {error}
                  </div>
                )}
              </div>
            </div>
            
            {/* Calculated Results section - positioned below the calculator inputs */}
            <div className="mt-5 bg-blue-50 rounded-xl shadow-md p-3">
              <h3 className="text-lg font-semibold text-blue-700 mb-3">Calculated Results</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-2 shadow-sm">
                  <span className="block text-sm font-medium text-blue-800">Hourly Capacity (Q)</span>
                  <div className="flex items-baseline">
                    <span className="text-xl font-bold text-blue-900">{hourlyCapacity.toFixed(2)}</span>
                    <span className="ml-1 text-sm text-blue-600">m³/hour</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-2 shadow-sm">
                  <span className="block text-sm font-medium text-blue-800">Daily Capacity</span>
                  <div className="flex items-baseline">
                    <span className="text-xl font-bold text-blue-900">{dailyCapacity.toFixed(2)}</span>
                    <span className="ml-1 text-sm text-blue-600">m³/day</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-2 shadow-sm">
                  <span className="block text-sm font-medium text-blue-800">Water Column (Hw)</span>
                  <div className="flex items-baseline">
                    <span className="text-xl font-bold text-blue-900">{waterColumn.toFixed(2)}</span>
                    <span className="ml-1 text-sm text-blue-600">meters</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-2 shadow-sm">
                  <span className="block text-sm font-medium text-blue-800">Drawdown (Hd-Hs)</span>
                  <div className="flex items-baseline">
                    <span className="text-xl font-bold text-blue-900">{drawdown.toFixed(2)}</span>
                    <span className="ml-1 text-sm text-blue-600">meters</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side: Results and formula */}
          <div className="w-full lg:w-2/5 space-y-3">
            {/* Formula Used section */}
            <div className="bg-blue-100 rounded-xl shadow-md p-4">
              <h3 className="text-lg font-semibold text-blue-700 mb-3">Formula Used</h3>
              <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
                <p className="font-mono text-center text-lg">Q = V / (Hd-Hs) × Hw</p>
              </div>
              
              <div className="space-y-2">
                <p className="text-blue-800 font-medium">Where:</p>
                <ul className="space-y-1 text-blue-700 text-sm">
                  <li className="flex items-start">
                    <span className="font-mono mr-2">Q</span>
                    <span>= Water output (m³/hour)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-mono mr-2">V</span>
                    <span>= Flow coefficient (m³/hour)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-mono mr-2">Hs</span>
                    <span>= Static water level (m)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-mono mr-2">Hd</span>
                    <span>= Dynamic water level (m)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-mono mr-2">Hw</span>
                    <span>= Water column height (m)</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Notes section */}
            <div className="bg-white rounded-lg shadow-sm p-3">
              <h3 className="text-lg font-semibold text-blue-700 mb-2">Notes</h3>
              <ul className="space-y-1 text-blue-700 text-sm">
                <li>• Static level is the water level before pumping begins.</li>
                <li>• Dynamic level is the water level during pumping.</li>
                <li>• The flow coefficient (V) is determined through field testing.</li>
                <li>• This calculator uses the Dupuit-Sass formula.</li>
                <li>• Adjust values using the sliders for interactive results.</li>
              </ul>
              
              {/* Download PDF Button */}
              <div className="mt-4">
                <button
                  onClick={generatePDF}
                  disabled={!placeName.trim()}
                  className={`w-full flex items-center justify-center gap-2 p-2 rounded-md ${
                    placeName.trim() 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-gray-300 cursor-not-allowed text-gray-500'
                  } transition-colors`}
                >
                  <Download size={18} />
                  <span>Download PDF Report</span>
                </button>
                {!placeName.trim() && (
                  <p className="text-xs text-red-500 mt-1">Please enter a location name to enable PDF download</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveWellCalculator;

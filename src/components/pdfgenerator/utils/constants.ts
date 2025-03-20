/**
 * Constants for PDF generation styling and layout
 * Aligned with the app's Tailwind color scheme
 */

// Colors with Tailwind equivalents as comments
export const COLORS = {
  // Primary blues
  primaryBlue: [30, 64, 175] as [number, number, number],     // #1e40af - equivalent to text-blue-800
  secondaryBlue: [59, 130, 246] as [number, number, number],  // #3b82f6 - equivalent to text-blue-500
  lightBlue: [191, 219, 254] as [number, number, number],     // #bfdbfe - equivalent to bg-blue-200 (static water)
  darkBlue: [59, 130, 246] as [number, number, number],       // #3b82f6 - equivalent to bg-blue-500 (dynamic water)
  
  // Background colors
  resultBg: [240, 249, 255] as [number, number, number],      // #f0f9ff - equivalent to bg-blue-50
  
  // Text colors
  text: [51, 65, 85] as [number, number, number],             // #334155 - equivalent to text-slate-700
  textLight: [100, 116, 139] as [number, number, number],     // #64748b - equivalent to text-slate-500
  
  // Accent colors
  pumpRed: [239, 68, 68] as [number, number, number],         // #ef4444 - equivalent to text-red-500
  
  // Neutral colors
  borderGray: [148, 163, 184] as [number, number, number],    // #94a3b8 - equivalent to border-slate-400
  white: [255, 255, 255] as [number, number, number],         // #ffffff - white
  lightGray: [248, 250, 252] as [number, number, number]      // #f8fafc - equivalent to bg-slate-50
};

// Grid system for consistent positioning
export const GRID = {
  margins: { left: 15, right: 15, top: 15, bottom: 15 },
  width: 180, // Page width minus margins
  height: 267 // Page height minus margins
};

// Font sizes for better consistency
export const FONT_SIZES = {
  title: 16,
  subtitle: 14,
  sectionTitle: 14,
  normal: 11,
  small: 10,
  smallest: 9,
  large: 18
};

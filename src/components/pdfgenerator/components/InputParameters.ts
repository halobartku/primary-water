import { jsPDF } from 'jspdf';
import { COLORS, GRID, FONT_SIZES } from '../utils/constants';
import { WellReportData } from '../utils/types';

/**
 * Add parameter inputs with clear two-column layout and consistent alignment
 * @param doc jsPDF document instance
 * @param data Well report data
 */
export const addInputParameters = (doc: jsPDF, data: WellReportData): void => {
  // Section dimensions and position - aligned with the section title
  const sectionWidth = GRID.width/2 - 5;
  const x = GRID.margins.left + GRID.width/2 + 5;
  const startY = 55;
  const containerHeight = 80; // Match the height of the visualization section
  const rowWidth = sectionWidth - 0; // Match title width
  
  // Define the parameters
  const parameters = [
    { label: "Well Depth (H):", value: data.wellDepth, unit: "m" },
    { label: "Static Level (Hs):", value: data.staticLevel, unit: "m" },
    { label: "Dynamic Level (Hd):", value: data.dynamicLevel, unit: "m" },
    { label: "Pump Depth:", value: data.pumpDepth, unit: "m" },
    { label: "Flow Coefficient (V):", value: data.flowCoefficient, unit: "m³/h" }
  ];
  
  // Draw single main container with very light blue background - matching the image
  doc.setFillColor(240, 249, 255); // Very light blue background
  doc.roundedRect(x, startY - 2, rowWidth, containerHeight, 3, 3, 'F');
  
  // Calculate spacing to distribute parameters evenly in the container
  const availableHeight = containerHeight - 10; // Subtract padding
  const rowSpacing = availableHeight / parameters.length;
  
  // Calculate the width of the longest label to ensure proper alignment
  doc.setFont("helvetica", "bold");
  doc.setFontSize(FONT_SIZES.normal);
  let maxLabelWidth = 0;
  parameters.forEach(param => {
    const labelWidth = doc.getTextWidth(param.label);
    if (labelWidth > maxLabelWidth) {
      maxLabelWidth = labelWidth;
    }
  });
  
  // Simple two-column layout with fixed positions
  const labelX = x + 10; // Left column for labels
  const valueX = x + rowWidth - 25; // Right column for values and units
  
  parameters.forEach((param, index) => {
    // Calculate vertical position to distribute evenly
    const rowY = startY + 10 + (index * rowSpacing);
    
    // Add parameter label in bold blue (left column)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(FONT_SIZES.normal);
    doc.setTextColor(30, 64, 175); // Primary blue for labels
    doc.text(param.label, labelX, rowY, {
      baseline: 'middle',
      align: 'left'
    });
    
    // Format value with proper spacing
    const valueText = `${param.value.toFixed(param.value % 1 === 0 ? 0 : 2)}`;
    
    // Add parameter value with highlighted numbers (right column)
    doc.setFont("helvetica", "bold");
    doc.setTextColor(44, 62, 80); // Dark gray for values
    
    // Position value right-aligned
    doc.text(valueText, valueX, rowY, {
      baseline: 'middle',
      align: 'right' // Right-align the values
    });
    
    // Add unit immediately after value
    doc.setFont("helvetica", "normal");
    doc.setTextColor(44, 62, 80); // Match value color
    
    // Position unit with fixed spacing after value
    doc.text(` ${param.unit}`, valueX + 3, rowY, { // Add space before unit
      baseline: 'middle',
      align: 'left'
    });
  });
};

import { jsPDF } from 'jspdf';
import { COLORS, GRID } from '../utils/constants';
import { WellReportData } from '../utils/types';

/**
 * Add the well visualization with proper spacing and dimension lines
 * @param doc jsPDF document instance
 * @param data Well report data
 */
export const addWellVisualization = (doc: jsPDF, data: WellReportData): void => {
  const sectionWidth = GRID.width/2 - 5;
  const centerX = GRID.margins.left + sectionWidth/2 + 5; // Adjusted +5 to shift right
  const startY = 53;
  
  // Well dimensions - properly sized for visibility
  const wellWidth = 15;
  const wellHeight = 60;
  const innerWellWidth = 8;
  
  // Calculate positions with proper centering
  const wellLeftX = centerX - (wellWidth / 2);
  const wellRightX = centerX + (wellWidth / 2);
  const innerWellLeftX = centerX - (innerWellWidth / 2);
  // innerWellRightX is not used in this component
  
  // Scale factor for proper positioning - use adaptive scaling based on well depth
  const maxHeight = Math.min(800, data.wellDepth); // Cap maximum height for extreme depths
  const scale = wellHeight / maxHeight;
  const scaleFactor = data.wellDepth > 300 ? 300 / data.wellDepth : 1; // Additional scaling for very deep wells
  
  // Calculate water levels with adaptive scaling
  const staticY = startY + (data.staticLevel * scale * scaleFactor);
  const dynamicY = startY + (data.dynamicLevel * scale * scaleFactor);
  
  // Ensure pump is positioned proportionally to well depth
  // Calculate pump position as a percentage of well depth
  const pumpDepthPercentage = data.pumpDepth / data.wellDepth;
  const pumpY = startY + (wellHeight * pumpDepthPercentage);
  
  const wellBottomY = startY + wellHeight;
  
  // Draw well structure with crisp lines
  doc.setDrawColor(COLORS.borderGray[0], COLORS.borderGray[1], COLORS.borderGray[2]);
  doc.setLineWidth(0.5);
  doc.setFillColor(COLORS.lightGray[0], COLORS.lightGray[1], COLORS.lightGray[2]);
  doc.rect(wellLeftX, startY, wellWidth, wellHeight, 'FD');
  
  // Inner well with clean border
  doc.setFillColor(COLORS.white[0], COLORS.white[1], COLORS.white[2]);
  doc.rect(innerWellLeftX, startY, innerWellWidth, wellHeight, 'FD');
  
  // Static level line with enhanced label including measurement
  doc.setDrawColor(COLORS.borderGray[0], COLORS.borderGray[1], COLORS.borderGray[2]);
  doc.setLineWidth(0.3);
  doc.setLineDashPattern([2, 1], 0);
  doc.line(wellLeftX, staticY, wellRightX, staticY);
  
  // Static label with Hs code and measurement - consistent font size
  doc.setFontSize(9);
  doc.setTextColor(COLORS.secondaryBlue[0], COLORS.secondaryBlue[1], COLORS.secondaryBlue[2]);
  // Position label with more space to avoid overlap
  doc.text(`Static (Hs): ${data.staticLevel} m`, wellRightX + 3, staticY - 1);
  
  // Dynamic level line with enhanced label including measurement
  doc.line(wellLeftX, dynamicY, wellRightX, dynamicY);
  // Position dynamic label with proper spacing to avoid overlap with static
  const dynamicLabelY = (dynamicY - staticY < 10) ? dynamicY + 3 : dynamicY + 1;
  doc.text(`Dynamic (Hd): ${data.dynamicLevel} m`, wellRightX + 3, dynamicLabelY);
  
  // Water visualization - use alpha colors for better visibility
  // Static to dynamic - light blue
  doc.setFillColor(COLORS.lightBlue[0], COLORS.lightBlue[1], COLORS.lightBlue[2]);
  doc.rect(innerWellLeftX, staticY, innerWellWidth, dynamicY - staticY, 'F');
  
  // Dynamic to bottom - dark blue
  doc.setFillColor(COLORS.darkBlue[0], COLORS.darkBlue[1], COLORS.darkBlue[2]);
  doc.rect(innerWellLeftX, dynamicY, innerWellWidth, wellBottomY - dynamicY, 'F');
  
  // Pump position with more prominent indicator
  doc.setDrawColor(COLORS.pumpRed[0], COLORS.pumpRed[1], COLORS.pumpRed[2]);
  doc.setLineDashPattern([], 0);
  doc.setLineWidth(0.7);
  doc.line(wellLeftX, pumpY, wellRightX, pumpY);
  
  // Pump label - position to avoid overlap with other elements
  doc.setTextColor(COLORS.pumpRed[0], COLORS.pumpRed[1], COLORS.pumpRed[2]);
  // Check if pump is close to dynamic level and adjust position
  const pumpLabelY = (Math.abs(pumpY - dynamicY) < 10) ? pumpY + 3  : pumpY + 1;
  doc.text('Pump', wellRightX + 3, pumpLabelY);
  doc.text(`${data.pumpDepth} m`, wellRightX + 3, pumpLabelY + 5);
  
  // Use adaptive positioning for dimension lines based on well depth
  drawDimensionLines(doc, data, wellLeftX, wellRightX, startY, wellBottomY, staticY);
};

/**
 * Draw dimension lines with adaptive positioning based on well depth
 */
function drawDimensionLines(
  doc: jsPDF, 
  data: WellReportData, 
  wellLeftX: number, 
  _wellRightX: number, // Prefixed with underscore as it's not used in this function
  startY: number, 
  wellBottomY: number, 
  staticY: number
): void {
  // Determine spacing based on well depth to avoid crowding
  const spacingFactor = data.wellDepth > 300 ? 0.8 : 1;
  
  // H dimension (total well height) - leftmost position
  const hX = wellLeftX - 30 * spacingFactor;
  doc.setDrawColor(COLORS.primaryBlue[0], COLORS.primaryBlue[1], COLORS.primaryBlue[2]);
  doc.setLineDashPattern([2, 1], 0);
  doc.setLineWidth(0.5);
  doc.line(hX, startY, hX, wellBottomY);
  
  drawArrow(doc, hX, startY, 'up');
  drawArrow(doc, hX, wellBottomY, 'down');
  
  // Position H label with better spacing
  doc.setTextColor(COLORS.primaryBlue[0], COLORS.primaryBlue[1], COLORS.primaryBlue[2]);
  doc.setFontSize(10);
  // Vertically align the H label
  doc.text("H", hX - 12, startY + (wellBottomY - startY) / 2 - 8);
  doc.setFontSize(9);
  doc.text(`${data.wellDepth} m`, hX - 12, startY + (wellBottomY - startY) / 2 + 1);
  
  // Hw dimension (water column) - positioned closer to well
  const hwX = wellLeftX - 10 * spacingFactor;
  doc.line(hwX, staticY, hwX, wellBottomY);
  drawArrow(doc, hwX, staticY, 'up');
  drawArrow(doc, hwX, wellBottomY, 'down');
  
  // Position Hw label with better spacing and alignment
  // Only show if space allows
  if (wellBottomY - staticY > 20) {
    doc.text("Hw", hwX - 12, staticY + ((wellBottomY - staticY) / 2) - 5);
    doc.text(`${data.waterColumn.toFixed(0)} m`, hwX - 12, staticY + ((wellBottomY - staticY) / 2) + 3);
  }
}

/**
 * Draw high-quality arrow for dimension lines
 */
function drawArrow(doc: jsPDF, x: number, y: number, direction: 'up' | 'down'): void {
  const size = 2;
  doc.setFillColor(COLORS.primaryBlue[0], COLORS.primaryBlue[1], COLORS.primaryBlue[2]);
  doc.setLineDashPattern([], 0);
  
  if (direction === 'up') {
    doc.triangle(
      x, y - size,
      x - size, y + size,
      x + size, y + size,
      'F'
    );
  } else {
    doc.triangle(
      x, y + size,
      x - size, y - size,
      x + size, y - size,
      'F'
    );
  }
}

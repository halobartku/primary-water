import { jsPDF } from 'jspdf';
import { COLORS, GRID, FONT_SIZES } from '../utils/constants';
import { WellReportData } from '../utils/types';

/**
 * Add results cards with proper alignment and consistent spacing
 * @param doc jsPDF document instance
 * @param data Well report data
 */
export const addResultsCards = (doc: jsPDF, data: WellReportData): void => {
  // Create 2x2 grid of result cards
  const cards = [
    {
      title: "Hourly Capacity (Q)",
      value: data.hourlyCapacity.toFixed(2),
      unit: "m³/hour",
      col: 0,
      row: 0
    },
    {
      title: "Daily Capacity",
      value: data.dailyCapacity.toFixed(2),
      unit: "m³/day",
      col: 1,
      row: 0
    },
    {
      title: "Water Column (Hw)",
      value: data.waterColumn.toFixed(2),
      unit: "meters",
      col: 0,
      row: 1
    },
    {
      title: "Drawdown (Hd-Hs)",
      value: data.drawdown.toFixed(2),
      unit: "meters",
      col: 1,
      row: 1
    }
  ];
  
  // Card dimensions and spacing
  const cardWidth = (GRID.width - 10) / 2;
  const cardHeight = 40;
  const spacing = 10;
  const startX = GRID.margins.left + 5;
  const startY = 155;
  
  cards.forEach(card => {
    const x = startX + (card.col * (cardWidth + spacing));
    const y = startY + (card.row * (cardHeight + spacing));
    
    // Card background with soft color
    doc.setFillColor(COLORS.resultBg[0], COLORS.resultBg[1], COLORS.resultBg[2]);
    doc.roundedRect(x, y, cardWidth, cardHeight, 3, 3, 'F');
    
    // Card title - improved vertical positioning
    doc.setFont("helvetica", "bold");
    doc.setFontSize(FONT_SIZES.large);
    doc.setTextColor(COLORS.primaryBlue[0], COLORS.primaryBlue[1], COLORS.primaryBlue[2]);
    doc.text(card.title, x + 5, y + 12);
    
    // Card value - large and bold with improved positioning
    doc.setFont("helvetica", "bold");
    doc.setFontSize(FONT_SIZES.large);
    doc.setTextColor(30, 58, 138); // Darker blue for main values - don't change this
    doc.text(card.value, x + 5, y + 30);
    
    // Card unit with proper alignment
    doc.setFont("helvetica", "normal");
    doc.setFontSize(FONT_SIZES.large);
    doc.setTextColor(COLORS.secondaryBlue[0], COLORS.secondaryBlue[1], COLORS.secondaryBlue[2]);
    const valueWidth = doc.getTextWidth(card.value);
    doc.text(` ${card.unit}`, x + 12 + valueWidth, y + 30); // Consistent spacing before unit
  });
};

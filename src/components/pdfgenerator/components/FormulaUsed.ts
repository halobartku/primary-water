import { jsPDF } from 'jspdf';
import { COLORS, GRID, FONT_SIZES } from '../utils/constants';

/**
 * Add simple formula display for page 1
 * @param doc jsPDF document instance
 */
export const addSimpleFormula = (doc: jsPDF): void => {
  // Add formula section background
  doc.setFillColor(COLORS.resultBg[0], COLORS.resultBg[1], COLORS.resultBg[2]);
  doc.roundedRect(GRID.margins.left + 10, 260, GRID.width - 20, 10, 2, 2, 'F');
  
  // Add formula text
  doc.setFont("helvetica", "normal");
  doc.setFontSize(FONT_SIZES.normal);
  doc.setTextColor(COLORS.text[0], COLORS.text[1], COLORS.text[2]);
  doc.text('Q = V / (Hd-Hs) × Hw', GRID.margins.left + GRID.width/2, 267, { align: 'center' });
};

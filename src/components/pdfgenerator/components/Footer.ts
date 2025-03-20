import { jsPDF } from 'jspdf';
import { COLORS, GRID, FONT_SIZES } from '../utils/constants';

/**
 * Add footer with report information
 * @param doc jsPDF document instance
 */
export const addFooter = (doc: jsPDF): void => {
  // Add footer line
  doc.setDrawColor(COLORS.secondaryBlue[0], COLORS.secondaryBlue[1], COLORS.secondaryBlue[2]);
  doc.setLineWidth(1);
  doc.line(GRID.margins.left, 275, GRID.margins.left + GRID.width, 275);
  
  // Set font for copyright text
  doc.setFont("helvetica", "normal");
  doc.setFontSize(FONT_SIZES.smallest);
  doc.setTextColor(COLORS.textLight[0], COLORS.textLight[1], COLORS.textLight[2]);
  
  // Add copyright text
  const currentYear = new Date().getFullYear();
  doc.text(`© ${currentYear} Primary Water sp. z o. o.`, GRID.margins.left, 288);
};

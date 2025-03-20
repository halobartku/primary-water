import { jsPDF } from 'jspdf';
import { COLORS, GRID, FONT_SIZES } from '../utils/constants';
import { WellReportData } from '../utils/types';

/**
 * Add title section with title and location
 * @param doc jsPDF document instance
 * @param data Well report data
 */
export const addTitleSection = (doc: jsPDF, data: WellReportData): void => {
  // Add title section background and text
  doc.setFillColor(COLORS.white[0], COLORS.white[1], COLORS.white[2]);
  doc.roundedRect(GRID.margins.left, GRID.margins.top, GRID.width, 15, 3, 3, 'F');
  
  // Add title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(FONT_SIZES.title);
  doc.setTextColor(COLORS.primaryBlue[0], COLORS.primaryBlue[1], COLORS.primaryBlue[2]);
  doc.text('Primary Water Well Capacity Calculator', GRID.margins.left + GRID.width/2, GRID.margins.top + 8, { align: 'center' });
  
  // Add location
  doc.setFont("helvetica", "normal");
  doc.setFontSize(FONT_SIZES.normal);
  doc.setTextColor(COLORS.textLight[0], COLORS.textLight[1], COLORS.textLight[2]);
  doc.text(`Location: ${data.placeName}`, GRID.margins.left + GRID.width/2, GRID.margins.top + 14, { align: 'center' });
};

/**
 * Add section title with consistent styling
 * @param doc jsPDF document instance
 * @param title Section title text
 * @param x X position
 * @param y Y position
 * @param width Width of the section
 */
export const addSectionTitle = (doc: jsPDF, title: string, x: number, y: number, width: number): void => {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(FONT_SIZES.sectionTitle);
  doc.setTextColor(COLORS.primaryBlue[0], COLORS.primaryBlue[1], COLORS.primaryBlue[2]);
  doc.text(title, x + width/2, y, { align: 'center' });
};

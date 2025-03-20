import { jsPDF } from 'jspdf';
import { COLORS, GRID } from '../utils/constants';

/**
 * Add logo to the top right corner of the page
 * @param doc jsPDF document instance
 */
export const addHeader = (doc: jsPDF): void => {
  try {
    try {
      // Use the specified logo file with proper URL encoding for spaces and special characters
      const logoUrl = window.location.origin + '/files/Primary%20Water%20Logo%20(1200%20x%20630%20px).png';
      
      // Use the exact dimensions from the file name
      const originalWidth = 1200; // pixels
      const originalHeight = 630; // pixels
      
      // Scale factor for the logo (10% of original size)
      const scaleFactor = 0.10;
      
      // Convert to mm and apply scale factor (assuming 72 dpi)
      const logoWidthMM = (originalWidth * scaleFactor) / 72 * 25.4;
      const logoHeightMM = (originalHeight * scaleFactor) / 72 * 25.4;
      
      // Position in top right corner
      const logoX = GRID.margins.left + GRID.width - logoWidthMM - 2; // 2mm padding from right edge
      const logoY = 0; // 5mm from top of page
      
      // Add the logo with proper dimensions
      doc.addImage(logoUrl, 'PNG', logoX, logoY, logoWidthMM, logoHeightMM);
    } catch (imageError) {
      // Fallback to text if image fails to load
      console.error('Error loading logo image:', imageError);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(COLORS.primaryBlue[0], COLORS.primaryBlue[1], COLORS.primaryBlue[2]);
      doc.text("PRIMARY WATER", GRID.margins.left + GRID.width - 30, 10, { align: 'right' });
    }
    
    // Add current date in top left corner
    const dateStr = new Date().toLocaleDateString();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(COLORS.textLight[0], COLORS.textLight[1], COLORS.textLight[2]);
    doc.text(dateStr, GRID.margins.left, 10);
    
    console.log('Header added successfully');
  } catch (error) {
    console.error('Error adding header:', error);
    // Continue PDF generation even if header fails to load
  }
};

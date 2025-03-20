import { jsPDF } from 'jspdf';
import { WellReportData } from './utils/types';
import { addHeader } from './components/Header';
import { addTitleSection, addSectionTitle } from './components/TitleSection';
import { addFooter } from './components/Footer';
import { addWellVisualization } from './components/WellVisualization';
import { addInputParameters } from './components/InputParameters';
import { addResultsCards } from './components/CalculatedResults';
import { addSimpleFormula } from './components/FormulaUsed';
import { COLORS, GRID } from './utils/constants';

/**
 * Generate a clean, professional PDF report for well capacity data
 * with consistent spacing, typography, and layout
 * @param data Well report data
 * @returns Promise that resolves when PDF is generated and saved
 */
export const generateWellReportPDF = (data: WellReportData): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // Create new PDF document
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Set PDF metadata
      doc.setProperties({
        title: `Well Capacity Report - ${data.placeName}`,
        subject: 'Primary Water Well Capacity Analysis',
        author: 'Primary Water Well Capacity Calculator',
        keywords: 'water well, capacity, hydrology, primary water',
        creator: 'Primary Water Well Capacity Calculator'
      });
      
      // Generate PDF Layout
      generateCalculatorPage(doc, data);
      
      // Save the PDF with sanitized filename
      const safeName = data.placeName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const dateStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
      doc.save(`${safeName}_well_report_${dateStr}.pdf`);
      resolve();
    } catch (error) {
      console.error('Error generating PDF report:', error);
      reject(error);
    }
  });
};

/**
 * Generate the PDF with calculator and results
 * @param doc jsPDF document instance
 * @param data Well report data
 */
function generateCalculatorPage(doc: jsPDF, data: WellReportData): void {
  // Add header with logo and date
  addHeader(doc);
  
  // Add title section with title and location
  addTitleSection(doc, data);
  
  // Draw two-column layout boxes for visualization and parameters
  // Left box: Well visualization
  doc.setFillColor(COLORS.white[0], COLORS.white[1], COLORS.white[2]);
  doc.roundedRect(GRID.margins.left, 35, GRID.width/2 - 5, 90, 3, 3, 'F');
  
  // Right box: Input parameters
  doc.roundedRect(GRID.margins.left + GRID.width/2 + 5, 35, GRID.width/2 - 5, 90, 3, 3, 'F');
  
  // Add section titles
  addSectionTitle(doc, 'Well Visualization', GRID.margins.left, 45, GRID.width/2 - 5);
  addSectionTitle(doc, 'Input Parameters', GRID.margins.left + GRID.width/2 + 5, 45, GRID.width/2 - 5);
  
  // Add well visualization
  addWellVisualization(doc, data);
  
  // Add input parameters
  addInputParameters(doc, data);
  
  // Add results section
  doc.setFillColor(COLORS.white[0], COLORS.white[1], COLORS.white[2]);
  doc.roundedRect(GRID.margins.left, 135, GRID.width, 100, 3, 3, 'F');
  
  addSectionTitle(doc, 'Calculated Results', GRID.margins.left, 145, GRID.width);
  
  // Add results cards
  addResultsCards(doc, data);
  
  // Add formula section
  doc.setFillColor(COLORS.white[0], COLORS.white[1], COLORS.white[2]);
  doc.roundedRect(GRID.margins.left, 245, GRID.width, 25, 3, 3, 'F');
  
  addSectionTitle(doc, 'Formula Used', GRID.margins.left, 255, GRID.width);
  
  // Add simple formula
  addSimpleFormula(doc);
  
  // Add footer
  addFooter(doc);
}


// Re-export types for external use
export type { WellReportData } from './utils/types';

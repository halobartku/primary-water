/**
 * Type definitions for the PDF generator
 */

/**
 * Data structure for well report information
 */
export interface WellReportData {
  placeName: string;
  wellDepth: number;
  staticLevel: number;
  dynamicLevel: number;
  pumpDepth: number;
  flowCoefficient: number;
  waterColumn: number;
  drawdown: number;
  hourlyCapacity: number;
  dailyCapacity: number;
}

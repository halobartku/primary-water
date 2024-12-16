export const THRESHOLDS = {
  WATER_STRESS: {
    LOW: { value: 10, consequence: 'Low pressure on water resources' },
    MEDIUM: { value: 20, consequence: 'Moderate pressure on water resources' },
    HIGH: { value: 40, consequence: 'High pressure on water resources' },
    SEVERE: { value: 80, consequence: 'Severe water stress' }
  },
  WATER_ACCESS: {
    SEVERE: { value: 60, consequence: 'Critical: Below 60% population has basic water access' },
    HIGH: { value: 75, consequence: 'High Risk: 60-75% have basic water access' },
    MODERATE: { value: 90, consequence: 'Moderate: 75-90% have basic water access' },
    GOOD: { value: 100, consequence: 'Good: Over 90% have basic water access' }
  },
  RESOURCES_PER_CAPITA: {
    ABSOLUTE_SCARCITY: { value: 500, consequence: 'Absolute water scarcity' },
    SCARCITY: { value: 1000, consequence: 'Water scarcity' },
    STRESS: { value: 1700, consequence: 'Water stress' },
    SUFFICIENT: { value: 2500, consequence: 'Water sufficient' }
  }
};

export interface WaterStressData {
  waterStress: number;
  waterAccess: number;
  waterResources: number;
  waterProductivity: number;
  groundwaterDepletion: number;
  seasonalVariability: number;
  droughtRisk: number;
  floodRisk: number;
  year: number;
}

export function calculateWaterStressData(rawData: {
  waterStress: number | null;
  waterAccess: number | null;
  waterResources: number | null;
  waterProductivity: number | null;
  year: number;
}): WaterStressData {
  // Validate and normalize input values
  const waterStress = rawData.waterStress ?? 0;
  const waterAccess = rawData.waterAccess ?? 0;
  const waterResources = rawData.waterResources ?? 0;
  const waterProductivity = rawData.waterProductivity ?? 0;

  // Calculate seasonal variability based on water resources and stress
  const seasonalVariability = calculateSeasonalVariability(waterStress, waterResources);
  
  // Calculate drought risk considering multiple factors
  const droughtRisk = calculateDroughtRisk(waterStress, waterResources, seasonalVariability);
  
  // Calculate flood risk based on resources and seasonal variability
  const floodRisk = calculateFloodRisk(waterResources, seasonalVariability);
  
  // Calculate groundwater depletion rate
  const groundwaterDepletion = calculateGroundwaterDepletion(waterStress, waterResources);

  return {
    waterStress,
    waterAccess,
    waterResources,
    waterProductivity,
    groundwaterDepletion,
    seasonalVariability,
    droughtRisk,
    floodRisk,
    year: rawData.year
  };
}

export function calculateGroundwaterDepletion(waterStress: number, waterResources: number): number {
  // Enhanced calculation considering water stress and resource availability
  const stressFactor = waterStress / 40; // Normalize to typical stress threshold
  const resourceScarcity = Math.max(0, 1 - (waterResources / THRESHOLDS.RESOURCES_PER_CAPITA.SCARCITY.value));
  
  // Higher depletion when stress is high and resources are scarce
  return Math.min(stressFactor * (1 + resourceScarcity) * 3, 15); // Max 15% per year
}

export function calculateSeasonalVariability(waterStress: number, waterResources: number): number {
  // Consider both stress and resource availability
  const resourceVariability = waterResources < THRESHOLDS.RESOURCES_PER_CAPITA.SCARCITY.value ? 2 :
                            waterResources < THRESHOLDS.RESOURCES_PER_CAPITA.STRESS.value ? 1.5 : 1;
  
  const stressVariability = waterStress > THRESHOLDS.WATER_STRESS.SEVERE.value ? 2 :
                           waterStress > THRESHOLDS.WATER_STRESS.HIGH.value ? 1.5 : 1;
  
  const variabilityScore = resourceVariability * stressVariability;
  
  if (variabilityScore > 3) return 4; // Very High
  if (variabilityScore > 2) return 3; // High
  if (variabilityScore > 1.5) return 2; // Medium
  return 1; // Low
}

export function calculateDroughtRisk(
  waterStress: number,
  waterResources: number,
  seasonalVariability: number
): number {
  // Enhanced drought risk calculation considering multiple factors
  let riskScore = 0;
  
  // Water stress contribution
  if (waterStress > THRESHOLDS.WATER_STRESS.SEVERE.value) riskScore += 3;
  else if (waterStress > THRESHOLDS.WATER_STRESS.HIGH.value) riskScore += 2;
  else if (waterStress > THRESHOLDS.WATER_STRESS.MEDIUM.value) riskScore += 1;
  
  // Water resources contribution
  if (waterResources < THRESHOLDS.RESOURCES_PER_CAPITA.ABSOLUTE_SCARCITY.value) riskScore += 3;
  else if (waterResources < THRESHOLDS.RESOURCES_PER_CAPITA.SCARCITY.value) riskScore += 2;
  else if (waterResources < THRESHOLDS.RESOURCES_PER_CAPITA.STRESS.value) riskScore += 1;
  
  // Seasonal variability contribution
  riskScore += seasonalVariability - 1;
  
  // Normalize to 1-4 scale
  if (riskScore >= 6) return 4; // Very High
  if (riskScore >= 4) return 3; // High
  if (riskScore >= 2) return 2; // Medium
  return 1; // Low
}

export function calculateFloodRisk(waterResources: number, seasonalVariability: number): number {
  // Enhanced flood risk calculation
  let riskScore = 0;
  
  // Water resources contribution (excess water availability)
  if (waterResources > 10000) riskScore += 3;
  else if (waterResources > 5000) riskScore += 2;
  else if (waterResources > 2500) riskScore += 1;
  
  // Seasonal variability contribution
  riskScore += seasonalVariability - 1;
  
  // Normalize to 1-4 scale
  if (riskScore >= 5) return 4; // Very High
  if (riskScore >= 3) return 3; // High
  if (riskScore >= 2) return 2; // Medium
  return 1; // Low
}

export function getStressLevel(stress: number): string {
  if (stress < THRESHOLDS.WATER_STRESS.LOW.value) return 'Low';
  if (stress < THRESHOLDS.WATER_STRESS.MEDIUM.value) return 'Low-medium';
  if (stress < THRESHOLDS.WATER_STRESS.HIGH.value) return 'Medium-high';
  if (stress < THRESHOLDS.WATER_STRESS.SEVERE.value) return 'High';
  return 'Extremely high';
}

export function getStressConsequence(stress: number): string {
  if (stress < THRESHOLDS.WATER_STRESS.LOW.value) return THRESHOLDS.WATER_STRESS.LOW.consequence;
  if (stress < THRESHOLDS.WATER_STRESS.MEDIUM.value) return THRESHOLDS.WATER_STRESS.MEDIUM.consequence;
  if (stress < THRESHOLDS.WATER_STRESS.HIGH.value) return THRESHOLDS.WATER_STRESS.HIGH.consequence;
  return THRESHOLDS.WATER_STRESS.SEVERE.consequence;
}

export function getRiskLevel(value: number): string {
  if (value === 1) return 'Low';
  if (value === 2) return 'Medium';
  if (value === 3) return 'High';
  return 'Very High';
}

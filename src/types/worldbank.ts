export interface WorldBankIndicatorValue {
  indicator: {
    id: string;
    value: string;
  };
  country: {
    id: string;
    value: string;
  };
  countryiso3code: string;
  date: string;
  value: number | null;
  unit: string;
  obs_status: string;
  decimal: number;
}

export interface WorldBankResponse {
  page: number;
  pages: number;
  per_page: number;
  total: number;
  sourceid: string;
  sourcename: string;
  lastupdated: string;
}

export type WorldBankApiResponse = [WorldBankResponse, WorldBankIndicatorValue[]];

// World Bank Water Stress Indicator (ER.H2O.FWTL.ZS) explanation:
// 
// Water Stress = (Annual Freshwater Withdrawals / Total Internal Renewable Water Resources) × 100
//
// Where:
// - Annual Freshwater Withdrawals: Total volume of water withdrawn annually
// - Total Internal Renewable Water Resources: Total available renewable water resources
//
// Examples:
// - Value of 100% means a country is withdrawing all of its renewable water resources
// - Value > 100% indicates withdrawals exceed renewable resources (unsustainable)
// - Value < 20% generally indicates low water stress
//
// Thresholds:
// - < 10%: Low water stress
// - 10-20%: Low-medium water stress
// - 20-40%: Medium-high water stress
// - 40-80%: High water stress
// - > 80%: Extremely high water stress
//
// Note: This indicator measures pressure on renewable water resources,
// not absolute water availability or access to water services.

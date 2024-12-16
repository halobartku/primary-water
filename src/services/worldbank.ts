import type { WorldBankApiResponse, WorldBankIndicatorValue } from '../types/worldbank';

export const INDICATORS = {
  // Annual freshwater withdrawals (% of internal resources)
  // Formula: (Total freshwater withdrawals / Total internal renewable water resources) * 100
  WATER_STRESS: 'ER.H2O.FWTL.ZS',
  
  // People using at least basic drinking water services (% of population)
  WATER_ACCESS: 'SH.H2O.BASW.ZS',
  
  // Renewable internal freshwater resources per capita (cubic meters)
  WATER_RESOURCES: 'ER.H2O.INTR.PC',
  
  // Water productivity, GDP per cubic meter of total freshwater withdrawal
  WATER_PRODUCTIVITY: 'ER.GDP.FWTL.M3.KD',
  
  // Sectoral usage percentages
  INDUSTRIAL_USE: 'ER.H2O.FWIN.ZS',
  DOMESTIC_USE: 'ER.H2O.FWDM.ZS',
  AGRICULTURE_USE: 'ER.H2O.FWAG.ZS',
  
  // Total annual freshwater withdrawals (billion cubic meters)
  TOTAL_WITHDRAWAL: 'ER.H2O.FWTL.K3',
} as const;

interface FetchIndicatorOptions {
  country: string;
  indicator: string;
  perPage?: number;
}

export async function fetchIndicator({ 
  country, 
  indicator, 
  perPage = 10 
}: FetchIndicatorOptions): Promise<{
  value: number | null;
  year: string | null;
}> {
  try {
    const response = await fetch(
      `https://api.worldbank.org/v2/country/${country}/indicator/${indicator}?format=json&per_page=${perPage}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch indicator ${indicator} for ${country}: ${response.statusText}`);
    }

    const data = await response.json() as WorldBankApiResponse;
    
    if (!data[1] || data[1].length === 0) {
      console.warn(`No data available for indicator ${indicator} in ${country}`);
      return { value: null, year: null };
    }

    // Sort by date to ensure we get the most recent valid data
    const sortedData = [...data[1]].sort((a, b) => 
      parseInt(b.date) - parseInt(a.date)
    );

    // Find the most recent non-null value
    const validData = sortedData.find(item => 
      item.value !== null && !isNaN(item.value)
    );

    // For water stress specifically, we want to log the raw value
    if (indicator === INDICATORS.WATER_STRESS && validData) {
      console.log(`Water Stress for ${country}:`, {
        value: validData.value,
        year: validData.date,
        description: 'Percentage of internal renewable freshwater resources withdrawn annually'
      });
    }
    
    return {
      value: validData?.value ?? null,
      year: validData?.date ?? null
    };
  } catch (error) {
    console.error(`Error fetching ${indicator} for ${country}:`, error);
    return { value: null, year: null };
  }
}

export async function fetchWaterData(countryCode: string) {
  try {
    // Fetch all indicators
    const [
      waterStress,
      waterAccess,
      waterResources,
      waterProductivity,
      industrialUse,
      domesticUse,
      agricultureUse,
      totalWithdrawal
    ] = await Promise.all([
      fetchIndicator({ country: countryCode, indicator: INDICATORS.WATER_STRESS }),
      fetchIndicator({ country: countryCode, indicator: INDICATORS.WATER_ACCESS }),
      fetchIndicator({ country: countryCode, indicator: INDICATORS.WATER_RESOURCES }),
      fetchIndicator({ country: countryCode, indicator: INDICATORS.WATER_PRODUCTIVITY }),
      fetchIndicator({ country: countryCode, indicator: INDICATORS.INDUSTRIAL_USE }),
      fetchIndicator({ country: countryCode, indicator: INDICATORS.DOMESTIC_USE }),
      fetchIndicator({ country: countryCode, indicator: INDICATORS.AGRICULTURE_USE }),
      fetchIndicator({ country: countryCode, indicator: INDICATORS.TOTAL_WITHDRAWAL })
    ]);

    // Log raw data for verification
    console.log('Raw water data for', countryCode, {
      waterStress: waterStress.value,
      waterAccess: waterAccess.value,
      waterResources: waterResources.value,
      waterProductivity: waterProductivity.value,
      industrialUse: industrialUse.value,
      domesticUse: domesticUse.value,
      agricultureUse: agricultureUse.value,
      totalWithdrawal: totalWithdrawal.value
    });

    // Return normalized data
    return {
      // Water stress is directly from World Bank - no need to calculate
      waterStress: waterStress.value,
      
      // Other metrics with basic validation
      waterAccess: waterAccess.value !== null ? Math.min(Math.max(waterAccess.value, 0), 100) : null,
      waterResources: waterResources.value !== null ? Math.max(waterResources.value, 0) : null,
      waterProductivity: waterProductivity.value !== null ? Math.max(waterProductivity.value, 0) : null,
      industrialUse: industrialUse.value !== null ? Math.min(Math.max(industrialUse.value, 0), 100) : null,
      domesticUse: domesticUse.value !== null ? Math.min(Math.max(domesticUse.value, 0), 100) : null,
      agricultureUse: agricultureUse.value !== null ? Math.min(Math.max(agricultureUse.value, 0), 100) : null,
      totalWithdrawal: totalWithdrawal.value !== null ? Math.max(totalWithdrawal.value, 0) : null,
      
      year: Math.max(
        ...[waterStress, waterAccess, waterResources, waterProductivity, 
           industrialUse, domesticUse, agricultureUse, totalWithdrawal]
          .map(d => d.year ? parseInt(d.year) : 0)
          .filter(Boolean)
      )
    };
  } catch (error) {
    console.error('Error fetching water data:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch water data');
  }
}

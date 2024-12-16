import { CountryData } from '../types/countries';

// Countries organized by region for easier maintenance
const REGIONS = {
  NORTH_AMERICA: 'North America',
  SOUTH_AMERICA: 'South America',
  EUROPE: 'Europe',
  ASIA: 'Asia',
  AFRICA: 'Africa',
  OCEANIA: 'Oceania',
  MIDDLE_EAST: 'Middle East',
  CARIBBEAN: 'Caribbean',
  CENTRAL_AMERICA: 'Central America',
} as const;

export const countries: CountryData[] = [
  // North America
  { name: 'United States', code: 'USA', region: REGIONS.NORTH_AMERICA },
  { name: 'Canada', code: 'CAN', region: REGIONS.NORTH_AMERICA },
  { name: 'Mexico', code: 'MEX', region: REGIONS.NORTH_AMERICA },

  // South America
  { name: 'Brazil', code: 'BRA', region: REGIONS.SOUTH_AMERICA },
  { name: 'Argentina', code: 'ARG', region: REGIONS.SOUTH_AMERICA },
  { name: 'Chile', code: 'CHL', region: REGIONS.SOUTH_AMERICA },
  { name: 'Colombia', code: 'COL', region: REGIONS.SOUTH_AMERICA },
  { name: 'Peru', code: 'PER', region: REGIONS.SOUTH_AMERICA },
  { name: 'Venezuela', code: 'VEN', region: REGIONS.SOUTH_AMERICA },
  { name: 'Ecuador', code: 'ECU', region: REGIONS.SOUTH_AMERICA },
  { name: 'Bolivia', code: 'BOL', region: REGIONS.SOUTH_AMERICA },
  { name: 'Paraguay', code: 'PRY', region: REGIONS.SOUTH_AMERICA },
  { name: 'Uruguay', code: 'URY', region: REGIONS.SOUTH_AMERICA },
  { name: 'Guyana', code: 'GUY', region: REGIONS.SOUTH_AMERICA },
  { name: 'Suriname', code: 'SUR', region: REGIONS.SOUTH_AMERICA },

  // Europe
  { name: 'United Kingdom', code: 'GBR', region: REGIONS.EUROPE },
  { name: 'Germany', code: 'DEU', region: REGIONS.EUROPE },
  { name: 'France', code: 'FRA', region: REGIONS.EUROPE },
  { name: 'Italy', code: 'ITA', region: REGIONS.EUROPE },
  { name: 'Spain', code: 'ESP', region: REGIONS.EUROPE },
  { name: 'Poland', code: 'POL', region: REGIONS.EUROPE },
  { name: 'Romania', code: 'ROU', region: REGIONS.EUROPE },
  { name: 'Netherlands', code: 'NLD', region: REGIONS.EUROPE },
  { name: 'Belgium', code: 'BEL', region: REGIONS.EUROPE },
  { name: 'Greece', code: 'GRC', region: REGIONS.EUROPE },
  { name: 'Czech Republic', code: 'CZE', region: REGIONS.EUROPE },
  { name: 'Portugal', code: 'PRT', region: REGIONS.EUROPE },
  { name: 'Sweden', code: 'SWE', region: REGIONS.EUROPE },
  { name: 'Hungary', code: 'HUN', region: REGIONS.EUROPE },
  { name: 'Austria', code: 'AUT', region: REGIONS.EUROPE },
  { name: 'Switzerland', code: 'CHE', region: REGIONS.EUROPE },
  { name: 'Bulgaria', code: 'BGR', region: REGIONS.EUROPE },
  { name: 'Denmark', code: 'DNK', region: REGIONS.EUROPE },
  { name: 'Finland', code: 'FIN', region: REGIONS.EUROPE },
  { name: 'Slovakia', code: 'SVK', region: REGIONS.EUROPE },
  { name: 'Norway', code: 'NOR', region: REGIONS.EUROPE },
  { name: 'Ireland', code: 'IRL', region: REGIONS.EUROPE },
  { name: 'Croatia', code: 'HRV', region: REGIONS.EUROPE },
  { name: 'Moldova', code: 'MDA', region: REGIONS.EUROPE },
  { name: 'Bosnia and Herzegovina', code: 'BIH', region: REGIONS.EUROPE },
  { name: 'Albania', code: 'ALB', region: REGIONS.EUROPE },
  { name: 'Lithuania', code: 'LTU', region: REGIONS.EUROPE },
  { name: 'North Macedonia', code: 'MKD', region: REGIONS.EUROPE },
  { name: 'Slovenia', code: 'SVN', region: REGIONS.EUROPE },
  { name: 'Latvia', code: 'LVA', region: REGIONS.EUROPE },
  { name: 'Estonia', code: 'EST', region: REGIONS.EUROPE },
  { name: 'Montenegro', code: 'MNE', region: REGIONS.EUROPE },
  { name: 'Luxembourg', code: 'LUX', region: REGIONS.EUROPE },
  { name: 'Malta', code: 'MLT', region: REGIONS.EUROPE },
  { name: 'Iceland', code: 'ISL', region: REGIONS.EUROPE },

  // Asia
  { name: 'China', code: 'CHN', region: REGIONS.ASIA },
  { name: 'India', code: 'IND', region: REGIONS.ASIA },
  { name: 'Indonesia', code: 'IDN', region: REGIONS.ASIA },
  { name: 'Pakistan', code: 'PAK', region: REGIONS.ASIA },
  { name: 'Bangladesh', code: 'BGD', region: REGIONS.ASIA },
  { name: 'Japan', code: 'JPN', region: REGIONS.ASIA },
  { name: 'Philippines', code: 'PHL', region: REGIONS.ASIA },
  { name: 'Vietnam', code: 'VNM', region: REGIONS.ASIA },
  { name: 'Turkey', code: 'TUR', region: REGIONS.ASIA },
  { name: 'Iran', code: 'IRN', region: REGIONS.ASIA },
  { name: 'Thailand', code: 'THA', region: REGIONS.ASIA },
  { name: 'Myanmar', code: 'MMR', region: REGIONS.ASIA },
  { name: 'South Korea', code: 'KOR', region: REGIONS.ASIA },
  { name: 'Iraq', code: 'IRQ', region: REGIONS.ASIA },
  { name: 'Afghanistan', code: 'AFG', region: REGIONS.ASIA },
  { name: 'Saudi Arabia', code: 'SAU', region: REGIONS.ASIA },
  { name: 'Uzbekistan', code: 'UZB', region: REGIONS.ASIA },
  { name: 'Malaysia', code: 'MYS', region: REGIONS.ASIA },
  { name: 'Yemen', code: 'YEM', region: REGIONS.ASIA },
  { name: 'Nepal', code: 'NPL', region: REGIONS.ASIA },
  { name: 'North Korea', code: 'PRK', region: REGIONS.ASIA },

  // Africa
  { name: 'Nigeria', code: 'NGA', region: REGIONS.AFRICA },
  { name: 'Ethiopia', code: 'ETH', region: REGIONS.AFRICA },
  { name: 'Egypt', code: 'EGY', region: REGIONS.AFRICA },
  { name: 'Democratic Republic of the Congo', code: 'COD', region: REGIONS.AFRICA },
  { name: 'South Africa', code: 'ZAF', region: REGIONS.AFRICA },
  { name: 'Tanzania', code: 'TZA', region: REGIONS.AFRICA },
  { name: 'Kenya', code: 'KEN', region: REGIONS.AFRICA },
  { name: 'Uganda', code: 'UGA', region: REGIONS.AFRICA },
  { name: 'Algeria', code: 'DZA', region: REGIONS.AFRICA },
  { name: 'Sudan', code: 'SDN', region: REGIONS.AFRICA },
  { name: 'Morocco', code: 'MAR', region: REGIONS.AFRICA },
  { name: 'Angola', code: 'AGO', region: REGIONS.AFRICA },
  { name: 'Ghana', code: 'GHA', region: REGIONS.AFRICA },
  { name: 'Mozambique', code: 'MOZ', region: REGIONS.AFRICA },
  { name: 'Ivory Coast', code: 'CIV', region: REGIONS.AFRICA },
  { name: 'Madagascar', code: 'MDG', region: REGIONS.AFRICA },
  { name: 'Cameroon', code: 'CMR', region: REGIONS.AFRICA },
  { name: 'Niger', code: 'NER', region: REGIONS.AFRICA },
  { name: 'Burkina Faso', code: 'BFA', region: REGIONS.AFRICA },
  { name: 'Mali', code: 'MLI', region: REGIONS.AFRICA },
  { name: 'Malawi', code: 'MWI', region: REGIONS.AFRICA },
  { name: 'Zambia', code: 'ZMB', region: REGIONS.AFRICA },
  { name: 'Senegal', code: 'SEN', region: REGIONS.AFRICA },
  { name: 'Chad', code: 'TCD', region: REGIONS.AFRICA },
  { name: 'Somalia', code: 'SOM', region: REGIONS.AFRICA },
  { name: 'Zimbabwe', code: 'ZWE', region: REGIONS.AFRICA },
  { name: 'Guinea', code: 'GIN', region: REGIONS.AFRICA },
  { name: 'Rwanda', code: 'RWA', region: REGIONS.AFRICA },
  { name: 'Benin', code: 'BEN', region: REGIONS.AFRICA },
  { name: 'Burundi', code: 'BDI', region: REGIONS.AFRICA },
  { name: 'Tunisia', code: 'TUN', region: REGIONS.AFRICA },
  { name: 'South Sudan', code: 'SSD', region: REGIONS.AFRICA },
  { name: 'Togo', code: 'TGO', region: REGIONS.AFRICA },
  { name: 'Sierra Leone', code: 'SLE', region: REGIONS.AFRICA },
  { name: 'Libya', code: 'LBY', region: REGIONS.AFRICA },

  // Oceania
  { name: 'Australia', code: 'AUS', region: REGIONS.OCEANIA },
  { name: 'Papua New Guinea', code: 'PNG', region: REGIONS.OCEANIA },
  { name: 'New Zealand', code: 'NZL', region: REGIONS.OCEANIA },
  { name: 'Fiji', code: 'FJI', region: REGIONS.OCEANIA },
  { name: 'Solomon Islands', code: 'SLB', region: REGIONS.OCEANIA },
  { name: 'Vanuatu', code: 'VUT', region: REGIONS.OCEANIA },
  { name: 'New Caledonia', code: 'NCL', region: REGIONS.OCEANIA },
  { name: 'French Polynesia', code: 'PYF', region: REGIONS.OCEANIA },
  { name: 'Samoa', code: 'WSM', region: REGIONS.OCEANIA },

  // Middle East
  { name: 'United Arab Emirates', code: 'ARE', region: REGIONS.MIDDLE_EAST },
  { name: 'Israel', code: 'ISR', region: REGIONS.MIDDLE_EAST },
  { name: 'Lebanon', code: 'LBN', region: REGIONS.MIDDLE_EAST },
  { name: 'Jordan', code: 'JOR', region: REGIONS.MIDDLE_EAST },
  { name: 'Palestine', code: 'PSE', region: REGIONS.MIDDLE_EAST },
  { name: 'Kuwait', code: 'KWT', region: REGIONS.MIDDLE_EAST },
  { name: 'Oman', code: 'OMN', region: REGIONS.MIDDLE_EAST },
  { name: 'Qatar', code: 'QAT', region: REGIONS.MIDDLE_EAST },
  { name: 'Bahrain', code: 'BHR', region: REGIONS.MIDDLE_EAST },

  // Caribbean
  { name: 'Cuba', code: 'CUB', region: REGIONS.CARIBBEAN },
  { name: 'Haiti', code: 'HTI', region: REGIONS.CARIBBEAN },
  { name: 'Dominican Republic', code: 'DOM', region: REGIONS.CARIBBEAN },
  { name: 'Jamaica', code: 'JAM', region: REGIONS.CARIBBEAN },
  { name: 'Trinidad and Tobago', code: 'TTO', region: REGIONS.CARIBBEAN },
  { name: 'Bahamas', code: 'BHS', region: REGIONS.CARIBBEAN },
  { name: 'Barbados', code: 'BRB', region: REGIONS.CARIBBEAN },

  // Central America
  { name: 'Guatemala', code: 'GTM', region: REGIONS.CENTRAL_AMERICA },
  { name: 'Honduras', code: 'HND', region: REGIONS.CENTRAL_AMERICA },
  { name: 'Nicaragua', code: 'NIC', region: REGIONS.CENTRAL_AMERICA },
  { name: 'El Salvador', code: 'SLV', region: REGIONS.CENTRAL_AMERICA },
  { name: 'Costa Rica', code: 'CRI', region: REGIONS.CENTRAL_AMERICA },
  { name: 'Panama', code: 'PAN', region: REGIONS.CENTRAL_AMERICA },
  { name: 'Belize', code: 'BLZ', region: REGIONS.CENTRAL_AMERICA },
].sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name

export const getCountriesByRegion = () => {
  const countryMap = new Map<string, CountryData[]>();
  
  countries.forEach(country => {
    if (!countryMap.has(country.region)) {
      countryMap.set(country.region, []);
    }
    countryMap.get(country.region)?.push(country);
  });

  return countryMap;
};

export const findCountryByCode = (code: string): CountryData | undefined => {
  return countries.find(country => country.code === code);
};

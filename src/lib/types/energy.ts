export interface EnergyUsageData {
  id: string;
  year: number;
  month: number;
  region: string;
  industry: string;
  companySize: 'small' | 'medium' | 'large';
  electricityUsage: number; // kWh
  gasUsage: number; // m³
  totalCost: number; // 원
  co2Emission: number; // kg
}

export interface IndustryBenchmark {
  industry: string;
  avgElectricityUsage: number;
  avgGasUsage: number;
  avgCost: number;
  co2EmissionFactor: number;
}

export interface RegionData {
  region: string;
  code: string;
  population: number;
  industrialComplexes: number;
  renewableCapacity: number; // MW
}

export interface RenewableEnergyData {
  region: string;
  solarCapacity: number; // MW
  windCapacity: number; // MW
  hydroCapacity: number; // MW
  totalCapacity: number; // MW
  yearlyGeneration: number; // MWh
}

export interface EnergyAnalysisResult {
  currentUsage: EnergyUsageData;
  benchmark: IndustryBenchmark;
  savingPotential: number; // 절약 가능 비용 (원)
  co2ReductionPotential: number; // CO2 절감 가능량 (kg)
  recommendations: string[];
}

export interface RenewableEnergyPotential {
  region: string;
  solarPotential: number; // MW
  windPotential: number; // MW
  estimatedGeneration: number; // MWh/year
  investmentCost: number; // 원
  roi: number; // 투자 회수 기간 (년)
  governmentIncentives: number; // 정부 지원금 (원)
}
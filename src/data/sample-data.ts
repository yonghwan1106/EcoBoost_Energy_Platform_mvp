import { EnergyUsageData, IndustryBenchmark, RegionData, RenewableEnergyData } from '@/lib/types/energy';

// 확장된 에너지 사용량 데이터
export const energyUsageData: EnergyUsageData[] = [
  // 서울특별시 데이터
  { id: '1', year: 2024, month: 1, region: '서울특별시', industry: '제조업', companySize: 'small', electricityUsage: 1500, gasUsage: 300, totalCost: 450000, co2Emission: 850 },
  { id: '2', year: 2024, month: 2, region: '서울특별시', industry: '제조업', companySize: 'small', electricityUsage: 1400, gasUsage: 280, totalCost: 420000, co2Emission: 800 },
  { id: '3', year: 2024, month: 3, region: '서울특별시', industry: '제조업', companySize: 'small', electricityUsage: 1600, gasUsage: 320, totalCost: 480000, co2Emission: 900 },
  { id: '4', year: 2024, month: 4, region: '서울특별시', industry: '서비스업', companySize: 'small', electricityUsage: 800, gasUsage: 150, totalCost: 240000, co2Emission: 420 },
  { id: '5', year: 2024, month: 5, region: '서울특별시', industry: '서비스업', companySize: 'medium', electricityUsage: 1200, gasUsage: 200, totalCost: 360000, co2Emission: 600 },
  
  // 경기도 데이터
  { id: '6', year: 2024, month: 1, region: '경기도', industry: '제조업', companySize: 'medium', electricityUsage: 3500, gasUsage: 700, totalCost: 980000, co2Emission: 1850 },
  { id: '7', year: 2024, month: 2, region: '경기도', industry: '제조업', companySize: 'medium', electricityUsage: 3200, gasUsage: 650, totalCost: 920000, co2Emission: 1750 },
  { id: '8', year: 2024, month: 3, region: '경기도', industry: '제조업', companySize: 'large', electricityUsage: 8500, gasUsage: 1200, totalCost: 2400000, co2Emission: 4200 },
  { id: '9', year: 2024, month: 4, region: '경기도', industry: '도소매업', companySize: 'small', electricityUsage: 950, gasUsage: 180, totalCost: 285000, co2Emission: 500 },
  
  // 부산광역시 데이터
  { id: '10', year: 2024, month: 1, region: '부산광역시', industry: '서비스업', companySize: 'small', electricityUsage: 800, gasUsage: 150, totalCost: 240000, co2Emission: 420 },
  { id: '11', year: 2024, month: 2, region: '부산광역시', industry: '제조업', companySize: 'medium', electricityUsage: 2800, gasUsage: 580, totalCost: 840000, co2Emission: 1500 },
  { id: '12', year: 2024, month: 3, region: '부산광역시', industry: '건설업', companySize: 'large', electricityUsage: 4200, gasUsage: 850, totalCost: 1260000, co2Emission: 2100 },
  
  // 대구광역시 데이터
  { id: '13', year: 2024, month: 1, region: '대구광역시', industry: '제조업', companySize: 'small', electricityUsage: 1350, gasUsage: 270, totalCost: 405000, co2Emission: 750 },
  { id: '14', year: 2024, month: 2, region: '대구광역시', industry: '서비스업', companySize: 'medium', electricityUsage: 1100, gasUsage: 190, totalCost: 330000, co2Emission: 580 },
  
  // 인천광역시 데이터
  { id: '15', year: 2024, month: 1, region: '인천광역시', industry: '도소매업', companySize: 'small', electricityUsage: 880, gasUsage: 160, totalCost: 264000, co2Emission: 460 },
  { id: '16', year: 2024, month: 2, region: '인천광역시', industry: '제조업', companySize: 'medium', electricityUsage: 3100, gasUsage: 620, totalCost: 930000, co2Emission: 1650 },
];

// 업종별 벤치마크 데이터
export const industryBenchmarks: IndustryBenchmark[] = [
  {
    industry: '제조업',
    avgElectricityUsage: 2500,
    avgGasUsage: 500,
    avgCost: 700000,
    co2EmissionFactor: 0.5,
  },
  {
    industry: '서비스업',
    avgElectricityUsage: 1000,
    avgGasUsage: 200,
    avgCost: 300000,
    co2EmissionFactor: 0.4,
  },
  {
    industry: '도소매업',
    avgElectricityUsage: 1200,
    avgGasUsage: 250,
    avgCost: 350000,
    co2EmissionFactor: 0.45,
  },
  {
    industry: '건설업',
    avgElectricityUsage: 1800,
    avgGasUsage: 400,
    avgCost: 540000,
    co2EmissionFactor: 0.48,
  },
  {
    industry: '정보통신업',
    avgElectricityUsage: 2200,
    avgGasUsage: 150,
    avgCost: 660000,
    co2EmissionFactor: 0.35,
  },
];

// 지역 데이터
export const regionData: RegionData[] = [
  {
    region: '서울특별시',
    code: '11',
    population: 9720846,
    industrialComplexes: 15,
    renewableCapacity: 50,
  },
  {
    region: '경기도',
    code: '41',
    population: 13427014,
    industrialComplexes: 85,
    renewableCapacity: 180,
  },
  {
    region: '부산광역시',
    code: '26',
    population: 3349016,
    industrialComplexes: 25,
    renewableCapacity: 75,
  },
  {
    region: '대구광역시',
    code: '27',
    population: 2438031,
    industrialComplexes: 18,
    renewableCapacity: 62,
  },
  {
    region: '인천광역시',
    code: '28',
    population: 2954955,
    industrialComplexes: 22,
    renewableCapacity: 58,
  },
  {
    region: '광주광역시',
    code: '29',
    population: 1456468,
    industrialComplexes: 12,
    renewableCapacity: 35,
  },
  {
    region: '대전광역시',
    code: '30',
    population: 1475221,
    industrialComplexes: 8,
    renewableCapacity: 28,
  },
  {
    region: '울산광역시',
    code: '31',
    population: 1136017,
    industrialComplexes: 35,
    renewableCapacity: 95,
  },
];

// 신재생에너지 데이터
export const renewableEnergyData: RenewableEnergyData[] = [
  {
    region: '서울특별시',
    solarCapacity: 45.2,
    windCapacity: 2.1,
    hydroCapacity: 1.8,
    totalCapacity: 49.1,
    yearlyGeneration: 85000,
  },
  {
    region: '경기도',
    solarCapacity: 180.5,
    windCapacity: 15.3,
    hydroCapacity: 8.7,
    totalCapacity: 204.5,
    yearlyGeneration: 350000,
  },
  {
    region: '부산광역시',
    solarCapacity: 75.8,
    windCapacity: 25.6,
    hydroCapacity: 4.2,
    totalCapacity: 105.6,
    yearlyGeneration: 180000,
  },
  {
    region: '대구광역시',
    solarCapacity: 62.3,
    windCapacity: 8.1,
    hydroCapacity: 3.5,
    totalCapacity: 73.9,
    yearlyGeneration: 125000,
  },
  {
    region: '인천광역시',
    solarCapacity: 58.9,
    windCapacity: 18.7,
    hydroCapacity: 2.1,
    totalCapacity: 79.7,
    yearlyGeneration: 140000,
  },
  {
    region: '광주광역시',
    solarCapacity: 35.4,
    windCapacity: 5.2,
    hydroCapacity: 1.8,
    totalCapacity: 42.4,
    yearlyGeneration: 72000,
  },
  {
    region: '대전광역시',
    solarCapacity: 28.7,
    windCapacity: 3.1,
    hydroCapacity: 2.2,
    totalCapacity: 34.0,
    yearlyGeneration: 58000,
  },
  {
    region: '울산광역시',
    solarCapacity: 95.2,
    windCapacity: 32.8,
    hydroCapacity: 6.5,
    totalCapacity: 134.5,
    yearlyGeneration: 230000,
  },
];

// 월별 에너지 사용 트렌드 데이터
export const monthlyTrendData = [
  { month: '1월', electricity: 1500, gas: 300, cost: 450000, efficiency: 85 },
  { month: '2월', electricity: 1400, gas: 280, cost: 420000, efficiency: 88 },
  { month: '3월', electricity: 1600, gas: 320, cost: 480000, efficiency: 82 },
  { month: '4월', electricity: 1550, gas: 310, cost: 465000, efficiency: 86 },
  { month: '5월', electricity: 1650, gas: 330, cost: 495000, efficiency: 80 },
  { month: '6월', electricity: 1800, gas: 360, cost: 540000, efficiency: 78 },
  { month: '7월', electricity: 2200, gas: 420, cost: 660000, efficiency: 72 },
  { month: '8월', electricity: 2400, gas: 450, cost: 720000, efficiency: 70 },
  { month: '9월', electricity: 1900, gas: 380, cost: 570000, efficiency: 76 },
  { month: '10월', electricity: 1650, gas: 330, cost: 495000, efficiency: 80 },
  { month: '11월', electricity: 1500, gas: 320, cost: 450000, efficiency: 84 },
  { month: '12월', electricity: 1450, gas: 340, cost: 435000, efficiency: 86 },
];

// 업종별 성과 비교 데이터
export const industryPerformanceData = [
  { industry: '제조업', average: 2500, myUsage: 1600, efficiency: 64, savings: 270000 },
  { industry: '서비스업', average: 1000, myUsage: 800, efficiency: 80, savings: 60000 },
  { industry: '도소매업', average: 1200, myUsage: 950, efficiency: 79, savings: 75000 },
  { industry: '건설업', average: 1800, myUsage: 1400, efficiency: 78, savings: 120000 },
  { industry: '정보통신업', average: 2200, myUsage: 1800, efficiency: 82, savings: 120000 },
];

// 에너지 절약 권장사항
export const energySavingRecommendations = [
  {
    category: '조명 시스템',
    title: 'LED 조명 교체',
    description: '기존 형광등을 고효율 LED로 교체',
    savingsPerYear: 350000,
    investmentCost: 1200000,
    roi: 3.4,
    co2Reduction: 580,
    priority: 'high' as const,
  },
  {
    category: '냉난방 시스템',
    title: '고효율 에어컨 설치',
    description: '1등급 인버터 에어컨으로 교체',
    savingsPerYear: 580000,
    investmentCost: 3500000,
    roi: 6.0,
    co2Reduction: 960,
    priority: 'high' as const,
  },
  {
    category: '신재생에너지',
    title: '태양광 패널 설치',
    description: '옥상 태양광 발전 시설 설치',
    savingsPerYear: 1200000,
    investmentCost: 15000000,
    roi: 12.5,
    co2Reduction: 2400,
    priority: 'medium' as const,
  },
  {
    category: '에너지 관리',
    title: '스마트 에너지 관리 시스템',
    description: 'IoT 기반 실시간 에너지 모니터링',
    savingsPerYear: 450000,
    investmentCost: 2800000,
    roi: 6.2,
    co2Reduction: 720,
    priority: 'medium' as const,
  },
  {
    category: '건물 단열',
    title: '고성능 단열재 시공',
    description: '외벽 및 지붕 단열 성능 개선',
    savingsPerYear: 320000,
    investmentCost: 4200000,
    roi: 13.1,
    co2Reduction: 540,
    priority: 'low' as const,
  },
];

// 정부 지원 제도 정보
export const governmentIncentives = [
  {
    name: '신재생에너지 설비 지원사업',
    agency: '한국에너지공단',
    supportType: '설치비 보조',
    maxAmount: 10000000,
    supportRate: 50,
    targetSector: ['태양광', '풍력', '연료전지'],
    applicationPeriod: '연중',
  },
  {
    name: '에너지 효율화 자금 지원',
    agency: '산업통상자원부',
    supportType: '저리 융자',
    maxAmount: 50000000,
    supportRate: 80,
    targetSector: ['고효율설비', 'LED조명', '단열공사'],
    applicationPeriod: '3월, 9월',
  },
  {
    name: '중소기업 에너지 컨설팅',
    agency: '중소벤처기업부',
    supportType: '컨설팅 비용 지원',
    maxAmount: 3000000,
    supportRate: 70,
    targetSector: ['제조업', '서비스업'],
    applicationPeriod: '상시',
  },
];

export type { EnergyUsageData, IndustryBenchmark, RegionData, RenewableEnergyData };
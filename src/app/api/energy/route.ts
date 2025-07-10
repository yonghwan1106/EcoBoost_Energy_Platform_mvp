import { NextResponse } from 'next/server';
import { EnergyUsageData, IndustryBenchmark, RegionData } from '@/lib/types/energy';

// 샘플 데이터 (실제 공공데이터로 대체 예정)
const sampleEnergyData: EnergyUsageData[] = [
  {
    id: '1',
    year: 2024,
    month: 1,
    region: '서울특별시',
    industry: '제조업',
    companySize: 'small',
    electricityUsage: 1500,
    gasUsage: 300,
    totalCost: 450000,
    co2Emission: 850,
  },
  {
    id: '2',
    year: 2024,
    month: 2,
    region: '경기도',
    industry: '제조업',
    companySize: 'medium',
    electricityUsage: 3500,
    gasUsage: 700,
    totalCost: 980000,
    co2Emission: 1850,
  },
  {
    id: '3',
    year: 2024,
    month: 3,
    region: '부산광역시',
    industry: '서비스업',
    companySize: 'small',
    electricityUsage: 800,
    gasUsage: 150,
    totalCost: 240000,
    co2Emission: 420,
  },
];

const industryBenchmarks: IndustryBenchmark[] = [
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
];

const regionData: RegionData[] = [
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
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const region = searchParams.get('region');
  const industry = searchParams.get('industry');
  const year = searchParams.get('year');

  let filteredData = sampleEnergyData;

  if (region) {
    filteredData = filteredData.filter(item => item.region === region);
  }

  if (industry) {
    filteredData = filteredData.filter(item => item.industry === industry);
  }

  if (year) {
    filteredData = filteredData.filter(item => item.year === parseInt(year));
  }

  return NextResponse.json({
    data: filteredData,
    benchmarks: industryBenchmarks,
    regions: regionData,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  
  // 여기서 실제 데이터 분석 로직 구현
  const { industry, electricityUsage, gasUsage } = body;
  
  const benchmark = industryBenchmarks.find(b => b.industry === industry);
  
  if (!benchmark) {
    return NextResponse.json({ error: '해당 업종 데이터를 찾을 수 없습니다.' }, { status: 404 });
  }

  const analysis = {
    currentUsage: {
      electricityUsage,
      gasUsage,
      totalCost: electricityUsage * 300 + gasUsage * 1500, // 단순 계산
      co2Emission: electricityUsage * benchmark.co2EmissionFactor,
    },
    benchmark,
    savingPotential: Math.max(0, (electricityUsage - benchmark.avgElectricityUsage) * 300),
    co2ReductionPotential: Math.max(0, (electricityUsage - benchmark.avgElectricityUsage) * benchmark.co2EmissionFactor),
    recommendations: [
      '에너지 효율 등급이 높은 설비로 교체하세요.',
      '스마트 에너지 관리 시스템을 도입하세요.',
      '태양광 발전 설비 설치를 검토하세요.',
    ],
  };

  return NextResponse.json(analysis);
}
import { NextResponse } from 'next/server';
import { RenewableEnergyData, RenewableEnergyPotential } from '@/lib/types/energy';

// 샘플 신재생에너지 데이터
const renewableData: RenewableEnergyData[] = [
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
];

const calculatePotential = (region: string, installationType: string, capacity: number): RenewableEnergyPotential => {
  const regionData = renewableData.find(r => r.region === region);
  
  if (!regionData) {
    throw new Error('해당 지역 데이터를 찾을 수 없습니다.');
  }

  let solarPotential = 0;
  let windPotential = 0;
  let estimatedGeneration = 0;
  let investmentCost = 0;
  let governmentIncentives = 0;

  if (installationType === 'solar' || installationType === 'both') {
    solarPotential = capacity;
    estimatedGeneration += capacity * 1400; // 연간 1400kWh/kW 가정
    investmentCost += capacity * 1500000; // kW당 150만원 가정
    governmentIncentives += Math.min(capacity * 500000, 10000000); // kW당 50만원, 최대 1천만원
  }

  if (installationType === 'wind' || installationType === 'both') {
    windPotential = capacity;
    estimatedGeneration += capacity * 2200; // 연간 2200kWh/kW 가정
    investmentCost += capacity * 2000000; // kW당 200만원 가정
    governmentIncentives += Math.min(capacity * 700000, 15000000); // kW당 70만원, 최대 1천5백만원
  }

  const annualSavings = estimatedGeneration * 150; // kWh당 150원 절약 가정
  const roi = investmentCost / annualSavings; // 투자 회수 기간 (년)

  return {
    region,
    solarPotential,
    windPotential,
    estimatedGeneration,
    investmentCost,
    roi: parseFloat(roi.toFixed(1)),
    governmentIncentives,
  };
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const region = searchParams.get('region');

  if (region) {
    const regionData = renewableData.find(r => r.region === region);
    if (!regionData) {
      return NextResponse.json({ error: '해당 지역 데이터를 찾을 수 없습니다.' }, { status: 404 });
    }
    return NextResponse.json({ data: regionData });
  }

  return NextResponse.json({ data: renewableData });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { region, installationType, capacity } = body;

    if (!region || !installationType || !capacity) {
      return NextResponse.json(
        { error: '필수 입력값이 누락되었습니다.' },
        { status: 400 }
      );
    }

    const potential = calculatePotential(region, installationType, parseFloat(capacity));
    
    return NextResponse.json({ data: potential });
  } catch (error) {
    console.error('신재생에너지 잠재력 계산 오류:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '계산 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
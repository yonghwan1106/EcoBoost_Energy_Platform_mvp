// 한국전력공사 전기요금표 데이터 (2025년 기준)

export interface ElectricityRate {
  id: string;
  name: string;
  type: 'residential' | 'general' | 'industrial';
  description: string;
  basicFee: number; // 기본요금 (원/kW)
  energyRates: {
    range: [number, number | null]; // kWh 구간 [최소, 최대] (null은 무제한)
    rate: number; // 전력량요금 (원/kWh)
    season?: 'summer' | 'winter' | 'other'; // 계절별 요금
  }[];
  demandCharge?: number; // 수요전력요금 (원/kW)
  powerFactor?: number; // 역률적용 기준
}

// 주택용 전기요금표
export const residentialRates: ElectricityRate[] = [
  {
    id: 'residential_progressive',
    name: '주택용(저압)',
    type: 'residential',
    description: '일반 가정용 누진제 요금',
    basicFee: 910, // 기본요금 (월)
    energyRates: [
      { range: [0, 300], rate: 120.0 },
      { range: [301, 450], rate: 214.6 },
      { range: [451, null], rate: 307.3 }
    ]
  }
];

// 일반용 전기요금표
export const generalRates: ElectricityRate[] = [
  {
    id: 'general_low_voltage',
    name: '일반용(저압)',
    type: 'general',
    description: '소상공인, 중소기업용',
    basicFee: 730, // 기본요금 (kW당)
    energyRates: [
      { range: [0, null], rate: 142.3, season: 'summer' },
      { range: [0, null], rate: 142.3, season: 'winter' },
      { range: [0, null], rate: 105.7, season: 'other' }
    ]
  },
  {
    id: 'general_high_voltage',
    name: '일반용(고압)',
    type: 'general',
    description: '대형 상업시설용',
    basicFee: 1050, // 기본요금 (kW당)
    energyRates: [
      { range: [0, null], rate: 140.7, season: 'summer' },
      { range: [0, null], rate: 140.7, season: 'winter' },
      { range: [0, null], rate: 104.1, season: 'other' }
    ],
    demandCharge: 6160 // 수요전력요금
  }
];

// 산업용 전기요금표
export const industrialRates: ElectricityRate[] = [
  {
    id: 'industrial_low_voltage',
    name: '산업용(저압)',
    type: 'industrial',
    description: '소규모 제조업용',
    basicFee: 730, // 기본요금 (kW당)
    energyRates: [
      { range: [0, null], rate: 104.3, season: 'summer' },
      { range: [0, null], rate: 104.3, season: 'winter' },
      { range: [0, null], rate: 67.7, season: 'other' }
    ]
  },
  {
    id: 'industrial_high_voltage_a',
    name: '산업용(고압A)',
    type: 'industrial',
    description: '중소 제조업용',
    basicFee: 1050, // 기본요금 (kW당)
    energyRates: [
      { range: [0, null], rate: 102.7, season: 'summer' },
      { range: [0, null], rate: 102.7, season: 'winter' },
      { range: [0, null], rate: 66.1, season: 'other' }
    ],
    demandCharge: 6160 // 수요전력요금
  },
  {
    id: 'industrial_high_voltage_b',
    name: '산업용(고압B)',
    type: 'industrial',
    description: '대규모 제조업용',
    basicFee: 1680, // 기본요금 (kW당)
    energyRates: [
      { range: [0, null], rate: 101.4, season: 'summer' },
      { range: [0, null], rate: 101.4, season: 'winter' },
      { range: [0, null], rate: 64.8, season: 'other' }
    ],
    demandCharge: 6160 // 수요전력요금
  }
];

// 전체 요금표
export const allElectricityRates: ElectricityRate[] = [
  ...residentialRates,
  ...generalRates,
  ...industrialRates
];

// 계절 구분 함수
export function getCurrentSeason(month: number): 'summer' | 'winter' | 'other' {
  if (month >= 7 && month <= 8) return 'summer'; // 7~8월
  if (month >= 12 || month <= 2) return 'winter'; // 12~2월
  return 'other'; // 3~6월, 9~11월
}

// 전기요금 계산 함수
export interface ElectricityCostInput {
  rateId: string;
  monthlyUsage: number; // kWh
  contractedPower?: number; // kW (계약전력)
  month: number; // 1-12
}

export interface ElectricityCostResult {
  basicFee: number;
  energyFee: number;
  demandFee: number;
  totalBeforeTax: number;
  vat: number;
  fundFee: number;
  totalAfterTax: number;
  averageUnitCost: number; // 평균 단가 (원/kWh)
}

export function calculateElectricityCost(input: ElectricityCostInput): ElectricityCostResult {
  const rate = allElectricityRates.find(r => r.id === input.rateId);
  if (!rate) {
    throw new Error(`전기요금표를 찾을 수 없습니다: ${input.rateId}`);
  }

  const season = getCurrentSeason(input.month);
  const contractedPower = input.contractedPower || 0;

  // 1. 기본요금 계산
  let basicFee = 0;
  if (rate.type === 'residential') {
    basicFee = rate.basicFee; // 월 고정
  } else {
    basicFee = rate.basicFee * contractedPower; // kW당
  }

  // 2. 전력량요금 계산
  let energyFee = 0;
  let remainingUsage = input.monthlyUsage;

  for (const energyRate of rate.energyRates) {
    if (energyRate.season && energyRate.season !== season) continue;
    if (!energyRate.season && rate.type !== 'residential') continue;

    const [min, max] = energyRate.range;
    const usageInThisRange = max === null 
      ? remainingUsage 
      : Math.min(remainingUsage, max - min + 1);

    if (usageInThisRange > 0) {
      energyFee += usageInThisRange * energyRate.rate;
      remainingUsage -= usageInThisRange;
    }

    if (remainingUsage <= 0) break;
  }

  // 3. 수요전력요금 계산
  const demandFee = (rate.demandCharge || 0) * contractedPower;

  // 4. 세금 및 부가금 계산
  const totalBeforeTax = basicFee + energyFee + demandFee;
  const vat = Math.round(totalBeforeTax * 0.1); // 부가가치세 10%
  const fundFee = Math.round(totalBeforeTax * 0.037); // 전력산업기반기금 3.7%
  const totalAfterTax = totalBeforeTax + vat + fundFee;

  // 5. 평균 단가 계산
  const averageUnitCost = input.monthlyUsage > 0 ? totalAfterTax / input.monthlyUsage : 0;

  return {
    basicFee: Math.round(basicFee),
    energyFee: Math.round(energyFee),
    demandFee: Math.round(demandFee),
    totalBeforeTax: Math.round(totalBeforeTax),
    vat,
    fundFee,
    totalAfterTax: Math.round(totalAfterTax),
    averageUnitCost: Math.round(averageUnitCost * 100) / 100
  };
}

// 절약 시나리오 계산
export interface SavingScenario {
  name: string;
  description: string;
  savingPercentage: number; // 절약률 (0-100)
}

export const savingScenarios: SavingScenario[] = [
  {
    name: '기본 절약',
    description: 'LED 교체, 대기전력 차단',
    savingPercentage: 10
  },
  {
    name: '중급 절약',
    description: '에너지 효율 기기 도입, 운영시간 최적화',
    savingPercentage: 20
  },
  {
    name: '고급 절약',
    description: '스마트 에너지 관리시스템 도입',
    savingPercentage: 30
  },
  {
    name: '최대 절약',
    description: '신재생에너지 도입, 종합 에너지 효율화',
    savingPercentage: 50
  }
];

export function calculateSavingScenarios(
  currentCost: ElectricityCostResult,
  monthlyUsage: number,
  rateId: string,
  contractedPower: number,
  month: number
): Array<{ scenario: SavingScenario; newCost: ElectricityCostResult; monthlySaving: number; yearlySaving: number }> {
  return savingScenarios.map(scenario => {
    const newUsage = monthlyUsage * (1 - scenario.savingPercentage / 100);
    const newCost = calculateElectricityCost({
      rateId,
      monthlyUsage: newUsage,
      contractedPower,
      month
    });

    const monthlySaving = currentCost.totalAfterTax - newCost.totalAfterTax;
    const yearlySaving = monthlySaving * 12;

    return {
      scenario,
      newCost,
      monthlySaving,
      yearlySaving
    };
  });
}
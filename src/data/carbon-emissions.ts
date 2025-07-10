// 환경부 온실가스 배출량 통계 기반 탄소 배출 계수 및 ESG 평가 데이터

export interface CarbonEmissionFactor {
  id: string;
  name: string;
  category: 'electricity' | 'fuel' | 'transport' | 'industrial';
  unit: string;
  emissionFactor: number; // kg CO2/unit
  source: string;
  lastUpdated: string;
}

// 전력 부문 배출계수 (2023년 기준)
export const electricityEmissionFactors: CarbonEmissionFactor[] = [
  {
    id: 'electricity_grid',
    name: '한국 전력망 평균',
    category: 'electricity',
    unit: 'kWh',
    emissionFactor: 0.4781, // kg CO2/kWh
    source: '환경부 온실가스 배출계수',
    lastUpdated: '2023-12-31'
  },
  {
    id: 'electricity_renewable',
    name: '신재생에너지',
    category: 'electricity',
    unit: 'kWh',
    emissionFactor: 0.0, // kg CO2/kWh
    source: '환경부 온실가스 배출계수',
    lastUpdated: '2023-12-31'
  }
];

// 연료 부문 배출계수
export const fuelEmissionFactors: CarbonEmissionFactor[] = [
  {
    id: 'natural_gas',
    name: '천연가스',
    category: 'fuel',
    unit: 'Nm³',
    emissionFactor: 2.176, // kg CO2/Nm³
    source: '환경부 온실가스 배출계수',
    lastUpdated: '2023-12-31'
  },
  {
    id: 'diesel',
    name: '경유',
    category: 'fuel',
    unit: 'L',
    emissionFactor: 2.619, // kg CO2/L
    source: '환경부 온실가스 배출계수',
    lastUpdated: '2023-12-31'
  },
  {
    id: 'gasoline',
    name: '휘발유',
    category: 'fuel',
    unit: 'L',
    emissionFactor: 2.097, // kg CO2/L
    source: '환경부 온실가스 배출계수',
    lastUpdated: '2023-12-31'
  }
];

// 전체 배출계수
export const allEmissionFactors: CarbonEmissionFactor[] = [
  ...electricityEmissionFactors,
  ...fuelEmissionFactors
];

// 업종별 탄소 배출 벤치마크 (tCO2/년)
export interface IndustryEmissionBenchmark {
  industryCode: string;
  industryName: string;
  averageEmission: number; // tCO2/year per employee
  bestPerformance: number; // tCO2/year per employee (상위 25%)
  worstPerformance: number; // tCO2/year per employee (하위 25%)
  sampleSize: number;
  dataYear: number;
}

export const industryEmissionBenchmarks: IndustryEmissionBenchmark[] = [
  {
    industryCode: 'C10',
    industryName: '식품제조업',
    averageEmission: 12.5,
    bestPerformance: 8.2,
    worstPerformance: 18.7,
    sampleSize: 1250,
    dataYear: 2023
  },
  {
    industryCode: 'C13',
    industryName: '섬유제품 제조업',
    averageEmission: 15.8,
    bestPerformance: 10.5,
    worstPerformance: 23.1,
    sampleSize: 890,
    dataYear: 2023
  },
  {
    industryCode: 'C20',
    industryName: '화학물질 및 화학제품 제조업',
    averageEmission: 45.2,
    bestPerformance: 28.7,
    worstPerformance: 67.9,
    sampleSize: 567,
    dataYear: 2023
  },
  {
    industryCode: 'C24',
    industryName: '1차 금속 제조업',
    averageEmission: 78.5,
    bestPerformance: 52.3,
    worstPerformance: 112.8,
    sampleSize: 432,
    dataYear: 2023
  },
  {
    industryCode: 'C25',
    industryName: '금속가공제품 제조업',
    averageEmission: 18.9,
    bestPerformance: 12.1,
    worstPerformance: 28.7,
    sampleSize: 1150,
    dataYear: 2023
  },
  {
    industryCode: 'C26',
    industryName: '전자부품, 컴퓨터 제조업',
    averageEmission: 22.4,
    bestPerformance: 14.8,
    worstPerformance: 33.6,
    sampleSize: 780,
    dataYear: 2023
  },
  {
    industryCode: 'G47',
    industryName: '소매업',
    averageEmission: 3.2,
    bestPerformance: 1.8,
    worstPerformance: 5.7,
    sampleSize: 2100,
    dataYear: 2023
  },
  {
    industryCode: 'I56',
    industryName: '음식점 및 주점업',
    averageEmission: 2.8,
    bestPerformance: 1.5,
    worstPerformance: 4.9,
    sampleSize: 1800,
    dataYear: 2023
  }
];

// ESG 평가 기준
export interface ESGCriteria {
  category: 'environmental' | 'social' | 'governance';
  subcategory: string;
  weight: number; // 가중치 (%)
  description: string;
  metrics: string[];
}

export const esgCriteria: ESGCriteria[] = [
  // Environmental (환경) - 40%
  {
    category: 'environmental',
    subcategory: '온실가스 관리',
    weight: 15,
    description: '온실가스 배출량 관리 및 감축 노력',
    metrics: ['배출량 절감률', '재생에너지 사용비율', '에너지 효율성']
  },
  {
    category: 'environmental',
    subcategory: '자원 효율성',
    weight: 10,
    description: '에너지 및 자원 사용 효율성',
    metrics: ['에너지 사용량', '물 사용량', '폐기물 발생량']
  },
  {
    category: 'environmental',
    subcategory: '환경경영',
    weight: 10,
    description: '환경경영 시스템 및 인증',
    metrics: ['ISO 14001 인증', '환경경영시스템', '환경투자']
  },
  {
    category: 'environmental',
    subcategory: '친환경 제품/서비스',
    weight: 5,
    description: '친환경 제품 개발 및 서비스 제공',
    metrics: ['친환경 제품 비율', '녹색기술 투자', 'R&D 투자']
  },
  // Social (사회) - 30%
  {
    category: 'social',
    subcategory: '근로자 권익',
    weight: 15,
    description: '근로자의 권익 보호 및 복지',
    metrics: ['안전사고율', '교육훈련비', '복리후생비']
  },
  {
    category: 'social',
    subcategory: '사회공헌',
    weight: 10,
    description: '지역사회 공헌 및 사회적 책임',
    metrics: ['사회공헌비', '지역사회 프로그램', '자원봉사 시간']
  },
  {
    category: 'social',
    subcategory: '공급망 관리',
    weight: 5,
    description: '공급망 내 사회적 책임 관리',
    metrics: ['협력업체 ESG 평가', '공정거래', '상생협력']
  },
  // Governance (지배구조) - 30%
  {
    category: 'governance',
    subcategory: '이사회 구성',
    weight: 10,
    description: '이사회의 독립성 및 다양성',
    metrics: ['사외이사 비율', '여성 임원 비율', '이사회 운영']
  },
  {
    category: 'governance',
    subcategory: '윤리경영',
    weight: 10,
    description: '윤리경영 및 준법경영',
    metrics: ['윤리강령', '내부통제시스템', '부패방지']
  },
  {
    category: 'governance',
    subcategory: '정보공개',
    weight: 10,
    description: '투명한 정보공개 및 소통',
    metrics: ['재무정보 공개', 'ESG 보고서', '이해관계자 소통']
  }
];

// 탄소 배출량 계산 입력 데이터
export interface CarbonEmissionInput {
  companyInfo: {
    name: string;
    industryCode: string;
    employees: number;
    location: string;
  };
  energyUsage: {
    electricity: number; // kWh/year
    naturalGas?: number; // Nm³/year
    diesel?: number; // L/year
    gasoline?: number; // L/year
  };
  renewableEnergy?: {
    solar?: number; // kWh/year
    wind?: number; // kWh/year
    other?: number; // kWh/year
  };
}

// 탄소 배출량 계산 결과
export interface CarbonEmissionResult {
  totalEmission: number; // tCO2/year
  emissionBySource: {
    electricity: number;
    naturalGas?: number;
    diesel?: number;
    gasoline?: number;
  };
  emissionPerEmployee: number; // tCO2/year per employee
  industryBenchmark: {
    ranking: 'excellent' | 'good' | 'average' | 'poor';
    percentile: number;
    difference: number; // vs average
  };
  reductionPotential: {
    renewable: number; // tCO2 reduction potential
    efficiency: number; // tCO2 reduction potential
    total: number; // tCO2 reduction potential
  };
}

// ESG 점수 계산 결과
export interface ESGScoreResult {
  totalScore: number; // 0-100
  scores: {
    environmental: number;
    social: number;
    governance: number;
  };
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D';
  recommendations: string[];
  carbonNeutralTarget: {
    currentYear: number;
    targetYear: number;
    requiredReduction: number; // % per year
    roadmap: Array<{
      year: number;
      target: number; // tCO2
      actions: string[];
    }>;
  };
}

// 탄소 배출량 계산 함수
export function calculateCarbonEmission(input: CarbonEmissionInput): CarbonEmissionResult {
  // 1. 에너지원별 배출량 계산
  const electricityEmission = input.energyUsage.electricity * 0.4781 / 1000; // tCO2
  const naturalGasEmission = (input.energyUsage.naturalGas || 0) * 2.176 / 1000; // tCO2
  const dieselEmission = (input.energyUsage.diesel || 0) * 2.619 / 1000; // tCO2
  const gasolineEmission = (input.energyUsage.gasoline || 0) * 2.097 / 1000; // tCO2

  // 2. 신재생에너지 절감량 계산
  const renewableReduction = input.renewableEnergy ? 
    ((input.renewableEnergy.solar || 0) + 
     (input.renewableEnergy.wind || 0) + 
     (input.renewableEnergy.other || 0)) * 0.4781 / 1000 : 0;

  // 3. 총 배출량 계산
  const totalEmission = electricityEmission + naturalGasEmission + dieselEmission + gasolineEmission - renewableReduction;
  const emissionPerEmployee = totalEmission / input.companyInfo.employees;

  // 4. 업종 벤치마킹
  const benchmark = industryEmissionBenchmarks.find(b => b.industryCode === input.companyInfo.industryCode);
  let ranking: 'excellent' | 'good' | 'average' | 'poor' = 'average';
  let percentile = 50;

  if (benchmark) {
    if (emissionPerEmployee <= benchmark.bestPerformance) {
      ranking = 'excellent';
      percentile = 90;
    } else if (emissionPerEmployee <= benchmark.averageEmission) {
      ranking = 'good';
      percentile = 70;
    } else if (emissionPerEmployee <= benchmark.worstPerformance) {
      ranking = 'average';
      percentile = 30;
    } else {
      ranking = 'poor';
      percentile = 10;
    }
  }

  // 5. 감축 잠재량 계산
  const renewablePotential = input.energyUsage.electricity * 0.3 * 0.4781 / 1000; // 30% 신재생 전환 가정
  const efficiencyPotential = totalEmission * 0.2; // 20% 효율성 개선 가정

  return {
    totalEmission: Math.round(totalEmission * 100) / 100,
    emissionBySource: {
      electricity: Math.round(electricityEmission * 100) / 100,
      naturalGas: naturalGasEmission > 0 ? Math.round(naturalGasEmission * 100) / 100 : undefined,
      diesel: dieselEmission > 0 ? Math.round(dieselEmission * 100) / 100 : undefined,
      gasoline: gasolineEmission > 0 ? Math.round(gasolineEmission * 100) / 100 : undefined,
    },
    emissionPerEmployee: Math.round(emissionPerEmployee * 100) / 100,
    industryBenchmark: {
      ranking,
      percentile,
      difference: benchmark ? Math.round((emissionPerEmployee - benchmark.averageEmission) * 100) / 100 : 0
    },
    reductionPotential: {
      renewable: Math.round(renewablePotential * 100) / 100,
      efficiency: Math.round(efficiencyPotential * 100) / 100,
      total: Math.round((renewablePotential + efficiencyPotential) * 100) / 100
    }
  };
}

// ESG 점수 계산 함수 (간소화된 버전)
export function calculateESGScore(
  carbonResult: CarbonEmissionResult,
  companySize: 'small' | 'medium' | 'large'
): ESGScoreResult {
  // 환경 점수 (40점 만점)
  let environmentalScore = 0;
  
  // 탄소 배출 성과 기반 점수
  switch (carbonResult.industryBenchmark.ranking) {
    case 'excellent': environmentalScore += 35; break;
    case 'good': environmentalScore += 28; break;
    case 'average': environmentalScore += 20; break;
    case 'poor': environmentalScore += 10; break;
  }

  // 사회 점수 (30점 만점) - 기업 규모별 기본 점수
  let socialScore = 0;
  switch (companySize) {
    case 'large': socialScore = 25; break;
    case 'medium': socialScore = 20; break;
    case 'small': socialScore = 15; break;
  }

  // 지배구조 점수 (30점 만점) - 기업 규모별 기본 점수
  let governanceScore = 0;
  switch (companySize) {
    case 'large': governanceScore = 25; break;
    case 'medium': governanceScore = 20; break;
    case 'small': governanceScore = 18; break;
  }

  const totalScore = environmentalScore + socialScore + governanceScore;

  // 등급 계산
  let grade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D';
  if (totalScore >= 90) grade = 'A+';
  else if (totalScore >= 80) grade = 'A';
  else if (totalScore >= 70) grade = 'B+';
  else if (totalScore >= 60) grade = 'B';
  else if (totalScore >= 50) grade = 'C+';
  else if (totalScore >= 40) grade = 'C';
  else grade = 'D';

  // 개선 권고사항
  const recommendations: string[] = [];
  if (environmentalScore < 25) {
    recommendations.push('에너지 효율성 개선 및 신재생에너지 도입 검토');
    recommendations.push('온실가스 배출량 모니터링 시스템 구축');
  }
  if (socialScore < 20) {
    recommendations.push('근로자 안전 및 복지 제도 강화');
    recommendations.push('지역사회 공헌 활동 확대');
  }
  if (governanceScore < 20) {
    recommendations.push('투명한 경영 정보 공개 확대');
    recommendations.push('윤리경영 및 준법경영 시스템 강화');
  }

  // 탄소중립 로드맵 (2050년 목표)
  const currentYear = new Date().getFullYear();
  const yearsToNeutral = 2050 - currentYear;
  const requiredReduction = (1 - Math.pow(0.1, 1/yearsToNeutral)) * 100; // 90% 감축 목표

  const roadmap = [];
  for (let i = 1; i <= Math.min(5, yearsToNeutral); i++) {
    const year = currentYear + i * 5;
    const target = carbonResult.totalEmission * Math.pow(0.9, i);
    roadmap.push({
      year,
      target: Math.round(target * 100) / 100,
      actions: [
        `${year}년까지 ${i * 10}% 배출량 감축`,
        i <= 2 ? '에너지 효율성 개선' : '신재생에너지 확대',
        i >= 3 ? '탄소포집 기술 도입' : '스마트 에너지 관리'
      ]
    });
  }

  return {
    totalScore: Math.round(totalScore),
    scores: {
      environmental: Math.round(environmentalScore),
      social: Math.round(socialScore),
      governance: Math.round(governanceScore)
    },
    grade,
    recommendations,
    carbonNeutralTarget: {
      currentYear,
      targetYear: 2050,
      requiredReduction: Math.round(requiredReduction * 100) / 100,
      roadmap
    }
  };
}
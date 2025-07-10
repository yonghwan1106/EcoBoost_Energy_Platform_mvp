// 한국부동산원 건물 에너지 효율등급 기반 개선안 데이터

export interface BuildingEfficiencyGrade {
  grade: '1+++' | '1++' | '1+' | '1' | '2' | '3' | '4' | '5' | '6' | '7';
  description: string;
  energyConsumption: number; // kWh/m²·year
  co2Emission: number; // kg CO2/m²·year
  percentile: number; // 상위 몇 %
}

export interface BuildingInfo {
  buildingType: 'office' | 'factory' | 'retail' | 'warehouse' | 'mixed';
  floorArea: number; // m²
  constructionYear: number;
  currentGrade: string;
  location: string;
  heatingSystem: 'gas' | 'electric' | 'district' | 'oil';
  coolingSystem: 'central' | 'individual' | 'none';
  insulationLevel: 'excellent' | 'good' | 'average' | 'poor';
  windowType: 'triple' | 'double' | 'single';
  hasRenewableEnergy: boolean;
}

export interface ImprovementMeasure {
  id: string;
  category: 'insulation' | 'windows' | 'hvac' | 'lighting' | 'renewable' | 'bems';
  title: string;
  description: string;
  applicableTo: string[];
  energySavings: number; // %
  co2Reduction: number; // %
  estimatedCost: number; // 원/m²
  paybackPeriod: number; // 년
  difficulty: 'easy' | 'medium' | 'hard';
  gradeImprovement: number; // 등급 상승 효과
  prerequisites: string[];
  benefits: string[];
}

export interface BuildingAnalysisResult {
  currentStatus: {
    grade: string;
    energyConsumption: number;
    co2Emission: number;
    annualEnergyCost: number;
    efficiencyRanking: string;
  };
  improvementPlan: {
    targetGrade: string;
    totalInvestment: number;
    expectedSavings: number;
    paybackPeriod: number;
    co2ReductionTotal: number;
    measures: ImprovementMeasure[];
  };
  phaseImplementation: {
    phase1: {
      title: string;
      measures: string[];
      cost: number;
      gradeImprovement: string;
      timeframe: string;
    };
    phase2: {
      title: string;
      measures: string[];
      cost: number;
      gradeImprovement: string;
      timeframe: string;
    };
    phase3: {
      title: string;
      measures: string[];
      cost: number;
      gradeImprovement: string;
      timeframe: string;
    };
  };
  incentives: {
    certificationBenefits: string[];
    governmentSupport: string[];
    taxIncentives: string[];
    financingOptions: string[];
  };
}

// 에너지 효율등급 기준
export const efficiencyGrades: BuildingEfficiencyGrade[] = [
  {
    grade: '1+++',
    description: '최고 효율 (제로에너지건물)',
    energyConsumption: 20,
    co2Emission: 4,
    percentile: 1
  },
  {
    grade: '1++',
    description: '최우수 효율',
    energyConsumption: 40,
    co2Emission: 8,
    percentile: 3
  },
  {
    grade: '1+',
    description: '우수 효율',
    energyConsumption: 60,
    co2Emission: 12,
    percentile: 7
  },
  {
    grade: '1',
    description: '양호 효율',
    energyConsumption: 80,
    co2Emission: 16,
    percentile: 15
  },
  {
    grade: '2',
    description: '보통 효율',
    energyConsumption: 120,
    co2Emission: 24,
    percentile: 30
  },
  {
    grade: '3',
    description: '보통 효율',
    energyConsumption: 160,
    co2Emission: 32,
    percentile: 50
  },
  {
    grade: '4',
    description: '일반 수준',
    energyConsumption: 200,
    co2Emission: 40,
    percentile: 70
  },
  {
    grade: '5',
    description: '개선 필요',
    energyConsumption: 250,
    co2Emission: 50,
    percentile: 85
  },
  {
    grade: '6',
    description: '개선 필요',
    energyConsumption: 300,
    co2Emission: 60,
    percentile: 95
  },
  {
    grade: '7',
    description: '시급히 개선 필요',
    energyConsumption: 350,
    co2Emission: 70,
    percentile: 99
  }
];

// 개선 방안 데이터베이스
export const improvementMeasures: ImprovementMeasure[] = [
  {
    id: 'wall_insulation',
    category: 'insulation',
    title: '외벽 단열 강화',
    description: '고성능 단열재를 활용한 외벽 단열 성능 개선',
    applicableTo: ['office', 'factory', 'retail', 'warehouse', 'mixed'],
    energySavings: 15,
    co2Reduction: 15,
    estimatedCost: 150000,
    paybackPeriod: 8,
    difficulty: 'medium',
    gradeImprovement: 1,
    prerequisites: ['구조 안전성 검토', '시공 공간 확보'],
    benefits: [
      '냉난방비 15% 절감',
      '실내 온도 균일성 향상',
      '결로 현상 방지',
      '건물 자산가치 상승'
    ]
  },
  {
    id: 'roof_insulation',
    title: '지붕 단열 개선',
    category: 'insulation',
    description: '지붕 단열재 추가 설치 및 열교 차단',
    applicableTo: ['factory', 'warehouse', 'office'],
    energySavings: 12,
    co2Reduction: 12,
    estimatedCost: 80000,
    paybackPeriod: 6,
    difficulty: 'easy',
    gradeImprovement: 1,
    prerequisites: ['지붕 구조 점검'],
    benefits: [
      '냉난방부하 12% 감소',
      '여름철 실내온도 2-3℃ 저감',
      '에너지 효율등급 1등급 상승'
    ]
  },
  {
    id: 'triple_glazing',
    category: 'windows',
    title: '삼중유리 창호 교체',
    description: '기존 창호를 고성능 삼중유리 창호로 교체',
    applicableTo: ['office', 'retail', 'mixed'],
    energySavings: 20,
    co2Reduction: 20,
    estimatedCost: 300000,
    paybackPeriod: 10,
    difficulty: 'medium',
    gradeImprovement: 2,
    prerequisites: ['창호 크기 측정', '구조 검토'],
    benefits: [
      '열손실 50% 감소',
      '소음 차단 효과',
      '결로 방지',
      '실내 쾌적성 향상'
    ]
  },
  {
    id: 'high_efficiency_hvac',
    category: 'hvac',
    title: '고효율 냉난방 시스템',
    description: '인버터 방식 고효율 냉난방 장비로 교체',
    applicableTo: ['office', 'retail', 'mixed'],
    energySavings: 25,
    co2Reduction: 25,
    estimatedCost: 200000,
    paybackPeriod: 7,
    difficulty: 'hard',
    gradeImprovement: 2,
    prerequisites: ['전기 용량 검토', '배관 공간 확보'],
    benefits: [
      'HVAC 에너지 25% 절감',
      '자동 온도 제어',
      '유지보수비 절감',
      '실내 공기질 개선'
    ]
  },
  {
    id: 'led_lighting',
    category: 'lighting',
    title: 'LED 조명 시스템',
    description: '전체 조명을 고효율 LED로 교체 및 자동제어 시스템 구축',
    applicableTo: ['office', 'factory', 'retail', 'warehouse', 'mixed'],
    energySavings: 18,
    co2Reduction: 18,
    estimatedCost: 50000,
    paybackPeriod: 3,
    difficulty: 'easy',
    gradeImprovement: 1,
    prerequisites: ['조명 회로 점검'],
    benefits: [
      '조명 전력 60% 절감',
      '조명 수명 10배 연장',
      '발열량 감소로 냉방부하 절감',
      '조도 개선으로 작업환경 향상'
    ]
  },
  {
    id: 'solar_panels',
    category: 'renewable',
    title: '태양광 발전 시스템',
    description: '옥상 태양광 패널 설치 및 계통연계',
    applicableTo: ['office', 'factory', 'warehouse', 'mixed'],
    energySavings: 30,
    co2Reduction: 35,
    estimatedCost: 1200000,
    paybackPeriod: 8,
    difficulty: 'medium',
    gradeImprovement: 3,
    prerequisites: ['옥상 구조 안전성 검토', '일조권 확인'],
    benefits: [
      '전기요금 30% 절감',
      'REC 판매 수익',
      '탄소중립 기여',
      '에너지 자립도 향상'
    ]
  },
  {
    id: 'bems_system',
    category: 'bems',
    title: '건물 에너지 관리 시스템',
    description: 'IoT 기반 실시간 에너지 모니터링 및 제어 시스템',
    applicableTo: ['office', 'factory', 'retail', 'mixed'],
    energySavings: 15,
    co2Reduction: 15,
    estimatedCost: 100000,
    paybackPeriod: 5,
    difficulty: 'medium',
    gradeImprovement: 1,
    prerequisites: ['네트워크 인프라', '센서 설치 공간'],
    benefits: [
      '실시간 에너지 모니터링',
      '자동 최적 제어',
      '에너지 사용 패턴 분석',
      '예방적 유지보수'
    ]
  },
  {
    id: 'heat_recovery',
    category: 'hvac',
    title: '폐열 회수 환기 시스템',
    description: '전열교환기를 활용한 폐열 회수 및 환기 시스템',
    applicableTo: ['office', 'factory', 'mixed'],
    energySavings: 20,
    co2Reduction: 20,
    estimatedCost: 180000,
    paybackPeriod: 7,
    difficulty: 'hard',
    gradeImprovement: 2,
    prerequisites: ['덕트 공간 확보', '환기 설계'],
    benefits: [
      '환기 에너지 70% 절감',
      '실내 공기질 개선',
      '난방부하 20% 감소',
      '습도 조절 효과'
    ]
  }
];

// 건물 효율 분석 함수
export function analyzeBuildingEfficiency(buildingInfo: BuildingInfo): BuildingAnalysisResult {
  // 현재 등급 정보 조회
  const currentGradeInfo = efficiencyGrades.find(g => g.grade === buildingInfo.currentGrade);
  if (!currentGradeInfo) {
    throw new Error('유효하지 않은 에너지 효율등급입니다.');
  }

  // 현재 상태 계산
  const currentEnergyConsumption = currentGradeInfo.energyConsumption;
  const currentCo2Emission = currentGradeInfo.co2Emission;
  const annualEnergyCost = currentEnergyConsumption * buildingInfo.floorArea * 120; // 120원/kWh
  
  // 건물 유형별 적용 가능한 개선 방안 필터링
  const applicableMeasures = improvementMeasures.filter(measure => 
    measure.applicableTo.includes(buildingInfo.buildingType)
  );

  // 건물 특성에 따른 우선순위 조정
  let prioritizedMeasures = [...applicableMeasures];
  
  // 건축년도에 따른 우선순위 조정
  if (buildingInfo.constructionYear < 2010) {
    prioritizedMeasures = prioritizedMeasures.sort((a, b) => {
      if (a.category === 'insulation' && b.category !== 'insulation') return -1;
      if (b.category === 'insulation' && a.category !== 'insulation') return 1;
      return b.energySavings - a.energySavings;
    });
  }

  // 현재 단열 수준에 따른 조정
  if (buildingInfo.insulationLevel === 'poor') {
    prioritizedMeasures = prioritizedMeasures.map(measure => {
      if (measure.category === 'insulation') {
        return { ...measure, energySavings: measure.energySavings * 1.3 };
      }
      return measure;
    });
  }

  // 최적 개선안 선별 (상위 5개)
  const selectedMeasures = prioritizedMeasures
    .sort((a, b) => (b.energySavings / b.paybackPeriod) - (a.energySavings / a.paybackPeriod))
    .slice(0, 5);

  // 총 개선 효과 계산
  const totalEnergySavings = selectedMeasures.reduce((sum, measure) => 
    sum + measure.energySavings, 0) * 0.8; // 중복 효과 고려 20% 할인
  
  const totalCo2Reduction = selectedMeasures.reduce((sum, measure) => 
    sum + measure.co2Reduction, 0) * 0.8;
  
  const totalInvestment = selectedMeasures.reduce((sum, measure) => 
    sum + (measure.estimatedCost * buildingInfo.floorArea), 0);
  
  const expectedSavings = (totalEnergySavings / 100) * annualEnergyCost;
  const paybackPeriod = totalInvestment / expectedSavings;

  // 목표 등급 계산
  const gradeImprovementTotal = selectedMeasures.reduce((sum, measure) => 
    sum + measure.gradeImprovement, 0);
  
  const currentGradeIndex = efficiencyGrades.findIndex(g => g.grade === buildingInfo.currentGrade);
  const targetGradeIndex = Math.max(0, currentGradeIndex - Math.min(gradeImprovementTotal, 3));
  const targetGrade = efficiencyGrades[targetGradeIndex].grade;

  // 단계별 구현 계획
  const phaseImplementation = {
    phase1: {
      title: '1단계: 즉시 적용 가능한 개선',
      measures: selectedMeasures
        .filter(m => m.difficulty === 'easy')
        .map(m => m.title),
      cost: selectedMeasures
        .filter(m => m.difficulty === 'easy')
        .reduce((sum, m) => sum + (m.estimatedCost * buildingInfo.floorArea), 0),
      gradeImprovement: '1등급 상승',
      timeframe: '1-3개월'
    },
    phase2: {
      title: '2단계: 중기 투자 개선',
      measures: selectedMeasures
        .filter(m => m.difficulty === 'medium')
        .map(m => m.title),
      cost: selectedMeasures
        .filter(m => m.difficulty === 'medium')
        .reduce((sum, m) => sum + (m.estimatedCost * buildingInfo.floorArea), 0),
      gradeImprovement: '1-2등급 상승',
      timeframe: '3-12개월'
    },
    phase3: {
      title: '3단계: 장기 투자 개선',
      measures: selectedMeasures
        .filter(m => m.difficulty === 'hard')
        .map(m => m.title),
      cost: selectedMeasures
        .filter(m => m.difficulty === 'hard')
        .reduce((sum, m) => sum + (m.estimatedCost * buildingInfo.floorArea), 0),
      gradeImprovement: '2-3등급 상승',
      timeframe: '1-2년'
    }
  };

  return {
    currentStatus: {
      grade: buildingInfo.currentGrade,
      energyConsumption: currentEnergyConsumption,
      co2Emission: currentCo2Emission,
      annualEnergyCost: Math.round(annualEnergyCost),
      efficiencyRanking: `상위 ${currentGradeInfo.percentile}%`
    },
    improvementPlan: {
      targetGrade,
      totalInvestment: Math.round(totalInvestment),
      expectedSavings: Math.round(expectedSavings),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      co2ReductionTotal: Math.round(totalCo2Reduction),
      measures: selectedMeasures
    },
    phaseImplementation,
    incentives: {
      certificationBenefits: [
        '에너지효율등급 인증서 발급',
        '그린빌딩 인증 취득 지원',
        '건물 자산가치 5-10% 상승',
        '임대료 프리미엄 확보'
      ],
      governmentSupport: [
        '건물에너지 효율화 자금 지원',
        '그린리모델링 이자지원',
        '에너지 진단 무료 지원',
        '성과보증 방식 개선사업'
      ],
      taxIncentives: [
        '에너지절약시설 투자세액공제',
        '취득세 감면 혜택',
        '재산세 경감 (3년간)',
        '환경개선부담금 면제'
      ],
      financingOptions: [
        '한국환경공단 녹색자금',
        '에너지공단 효율향상 자금',
        'ESG 투자 연계 대출',
        '그린본드 발행 지원'
      ]
    }
  };
}

// 건물 유형별 벤치마크 데이터
export const buildingTypeBenchmarks = {
  office: {
    excellent: 60,
    good: 100,
    average: 140,
    poor: 200
  },
  factory: {
    excellent: 80,
    good: 120,
    average: 180,
    poor: 250
  },
  retail: {
    excellent: 120,
    good: 180,
    average: 250,
    poor: 350
  },
  warehouse: {
    excellent: 40,
    good: 80,
    average: 120,
    poor: 180
  },
  mixed: {
    excellent: 70,
    good: 110,
    average: 160,
    poor: 220
  }
};

// 효율등급별 인센티브 정보
export const gradeIncentives = {
  '1+++': {
    subsidyRate: 50,
    taxReduction: 100,
    loanInterest: 1.5,
    description: '제로에너지건물 최고 혜택'
  },
  '1++': {
    subsidyRate: 40,
    taxReduction: 75,
    loanInterest: 2.0,
    description: '최우수등급 혜택'
  },
  '1+': {
    subsidyRate: 30,
    taxReduction: 50,
    loanInterest: 2.5,
    description: '우수등급 혜택'
  },
  '1': {
    subsidyRate: 20,
    taxReduction: 25,
    loanInterest: 3.0,
    description: '양호등급 혜택'
  }
};
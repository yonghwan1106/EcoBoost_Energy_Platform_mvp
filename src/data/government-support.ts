// 중소벤처기업부 및 관련 부처 정부지원사업 데이터

export interface GovernmentSupportProgram {
  id: string;
  title: string;
  agency: string;
  department: string;
  category: 'energy_efficiency' | 'renewable_energy' | 'esg' | 'digital_transformation' | 'facility_upgrade' | 'r_and_d';
  supportType: 'grant' | 'loan' | 'tax_benefit' | 'subsidy' | 'guarantee';
  maxAmount: number; // 최대 지원금액 (만원)
  supportRate: number; // 지원율 (%)
  applicationPeriod: {
    start: string; // YYYY-MM-DD
    end: string; // YYYY-MM-DD
    isOngoing: boolean;
  };
  eligibility: {
    companySize: ('small' | 'medium' | 'large')[];
    industries: string[]; // 업종 코드
    minEmployees?: number;
    maxEmployees?: number;
    minRevenue?: number; // 억원
    maxRevenue?: number; // 억원
    requiredCertifications?: string[];
    excludedRegions?: string[];
  };
  requirements: string[];
  benefits: string[];
  applicationProcess: string[];
  contactInfo: {
    phone: string;
    email: string;
    website: string;
  };
  tags: string[];
  priority: 'high' | 'medium' | 'low';
  successRate: number; // 선정률 (%)
  lastUpdated: string;
}

// 에너지 효율화 지원사업
export const energyEfficiencyPrograms: GovernmentSupportProgram[] = [
  {
    id: 'energy_eff_001',
    title: '중소기업 에너지효율 향상 지원사업',
    agency: '중소벤처기업부',
    department: '에너지혁신과',
    category: 'energy_efficiency',
    supportType: 'grant',
    maxAmount: 5000, // 5천만원
    supportRate: 80,
    applicationPeriod: {
      start: '2025-02-01',
      end: '2025-03-31',
      isOngoing: true
    },
    eligibility: {
      companySize: ['small', 'medium'],
      industries: ['C10', 'C13', 'C20', 'C24', 'C25', 'C26'],
      minEmployees: 5,
      maxEmployees: 300,
      maxRevenue: 1000
    },
    requirements: [
      '에너지 사용량 연간 100TOE 이상 사업장',
      '에너지경영시스템(ISO 50001) 인증 또는 구축 계획',
      '에너지 절약 목표 설정 (최소 10% 이상)',
      '3년 이상 사업 운영 실적'
    ],
    benefits: [
      '에너지 효율 개선 설비 구축비 지원',
      '에너지 진단 및 컨설팅 무료 제공',
      '성과 달성 시 인센티브 추가 지원',
      '금융기관 대출 시 우대 금리 적용'
    ],
    applicationProcess: [
      '온라인 신청서 제출 (중소기업통합관리시스템)',
      '사업계획서 및 첨부서류 제출',
      '현장 실사 및 평가위원회 심사',
      '선정 결과 발표 및 협약 체결',
      '사업 수행 및 중간 점검',
      '완료 보고서 제출 및 성과 평가'
    ],
    contactInfo: {
      phone: '042-481-8888',
      email: 'energy@mss.go.kr',
      website: 'https://www.mss.go.kr'
    },
    tags: ['에너지효율', '설비개선', '컨설팅', 'ISO50001'],
    priority: 'high',
    successRate: 65,
    lastUpdated: '2025-01-15'
  },
  {
    id: 'energy_eff_002',
    title: 'KEA 에너지절약시설 설치 지원사업',
    agency: '한국에너지공단',
    department: '에너지절약실',
    category: 'energy_efficiency',
    supportType: 'grant',
    maxAmount: 3000, // 3천만원
    supportRate: 50,
    applicationPeriod: {
      start: '2025-03-01',
      end: '2025-05-31',
      isOngoing: true
    },
    eligibility: {
      companySize: ['small', 'medium'],
      industries: ['C10', 'C13', 'C20', 'C21', 'C22', 'C24', 'C25', 'C26', 'C27', 'C28'],
      minEmployees: 10,
      maxEmployees: 300,
      maxRevenue: 800
    },
    requirements: [
      '제조업 또는 산업단지 입주 기업',
      '에너지 절약률 15% 이상 달성 가능 사업',
      '설비 투자비 1억원 이상',
      '사업 완료 후 3년간 운영 의무'
    ],
    benefits: [
      'LED 조명, 고효율 모터 등 절약시설 설치비 지원',
      '에너지관리시스템(BEMS) 구축 지원',
      '전문기관 기술지도 및 사후관리',
      '우수 성과 기업 포상 및 홍보'
    ],
    applicationProcess: [
      'KEA 에너지절약전문기업 사전 컨설팅',
      '온라인 신청 (에너지관리공단 홈페이지)',
      '기술성 및 경제성 평가',
      '지원 대상 선정 및 협약',
      '설비 설치 및 시험 운전',
      '성과 검증 및 지원금 지급'
    ],
    contactInfo: {
      phone: '031-260-4114',
      email: 'save@energy.or.kr',
      website: 'https://www.energy.or.kr'
    },
    tags: ['LED조명', 'BEMS', '고효율설비', '제조업'],
    priority: 'high',
    successRate: 72,
    lastUpdated: '2025-01-10'
  }
];

// 신재생에너지 지원사업
export const renewableEnergyPrograms: GovernmentSupportProgram[] = [
  {
    id: 'renewable_001',
    title: '자가용 신재생에너지 발전설비 지원사업',
    agency: '한국에너지공단',
    department: '신재생에너지센터',
    category: 'renewable_energy',
    supportType: 'subsidy',
    maxAmount: 20000, // 2억원
    supportRate: 30,
    applicationPeriod: {
      start: '2025-01-01',
      end: '2025-12-31',
      isOngoing: true
    },
    eligibility: {
      companySize: ['small', 'medium', 'large'],
      industries: ['C10', 'C13', 'C20', 'C24', 'C25', 'C26', 'G47', 'I56'],
      minEmployees: 5,
      requiredCertifications: ['사업자등록증']
    },
    requirements: [
      '자가소비용 신재생에너지 발전설비 설치',
      '태양광 3kW 이상, 풍력 10kW 이상',
      '계통연계 및 전력거래소 등록',
      '5년간 발전설비 유지 관리 의무'
    ],
    benefits: [
      '설치비의 일정 비율 보조금 지원',
      'RPS 인증서(REC) 가중치 우대',
      '한국전력공사 계통연계 우선 처리',
      '신재생에너지 발전량 정산금 수령'
    ],
    applicationProcess: [
      '신재생에너지센터 홈페이지 접수',
      '설계도서 및 사업계획서 제출',
      '기술성 검토 및 현장 확인',
      '지원 결정 통지 및 설치 승인',
      '설비 설치 및 계통연계',
      '준공 검사 및 보조금 지급'
    ],
    contactInfo: {
      phone: '031-260-4600',
      email: 'renewable@energy.or.kr',
      website: 'https://www.knrec.or.kr'
    },
    tags: ['태양광', '풍력', 'REC', '자가발전'],
    priority: 'high',
    successRate: 78,
    lastUpdated: '2025-01-05'
  },
  {
    id: 'renewable_002',
    title: '그린뉴딜 신재생에너지 확산사업',
    agency: '산업통상자원부',
    department: '신재생에너지정책과',
    category: 'renewable_energy',
    supportType: 'loan',
    maxAmount: 50000, // 5억원
    supportRate: 70,
    applicationPeriod: {
      start: '2025-02-01',
      end: '2025-11-30',
      isOngoing: true
    },
    eligibility: {
      companySize: ['medium', 'large'],
      industries: ['C20', 'C24', 'C25', 'C26', 'C27', 'C28'],
      minEmployees: 50,
      minRevenue: 100
    },
    requirements: [
      '신재생에너지 설비 투자 계획',
      '온실가스 감축 목표 설정',
      '그린뉴딜 관련 기술 도입',
      '지역경제 활성화 기여 방안'
    ],
    benefits: [
      '저리 융자 지원 (연 2-3%)',
      '최대 5년 거치 10년 상환',
      '신용보증기금 보증 우대',
      '그린뉴딜 인증서 발급'
    ],
    applicationProcess: [
      '사업계획서 작성 및 제출',
      '금융기관 사전 대출 심사',
      '정부 정책심사위원회 평가',
      '융자 승인 및 실행',
      '분기별 진도 점검',
      '사업 완료 및 성과 보고'
    ],
    contactInfo: {
      phone: '044-203-5361',
      email: 'greennewdeal@korea.kr',
      website: 'https://www.motie.go.kr'
    },
    tags: ['그린뉴딜', '저리융자', '온실가스감축'],
    priority: 'medium',
    successRate: 58,
    lastUpdated: '2025-01-08'
  }
];

// ESG 경영 지원사업
export const esgPrograms: GovernmentSupportProgram[] = [
  {
    id: 'esg_001',
    title: '중소기업 ESG 경영 확산 지원사업',
    agency: '중소벤처기업부',
    department: 'ESG전담팀',
    category: 'esg',
    supportType: 'grant',
    maxAmount: 2000, // 2천만원
    supportRate: 90,
    applicationPeriod: {
      start: '2025-03-01',
      end: '2025-06-30',
      isOngoing: true
    },
    eligibility: {
      companySize: ['small', 'medium'],
      industries: ['C10', 'C13', 'C20', 'C25', 'C26', 'G47'],
      minEmployees: 10,
      maxEmployees: 300
    },
    requirements: [
      'ESG 경영 도입 의지 및 계획',
      '지속가능경영 보고서 발간 계획',
      'ESG 관련 인증 취득 목표',
      '임직원 ESG 교육 실시 계획'
    ],
    benefits: [
      'ESG 경영체계 구축 컨설팅',
      'ESG 평가 및 개선방안 제시',
      'ESG 보고서 작성 지원',
      'ESG 인증 취득 비용 지원'
    ],
    applicationProcess: [
      'ESG 현황 진단 및 신청',
      '전문기관 매칭 및 계약',
      'ESG 경영체계 구축',
      '중간 점검 및 피드백',
      'ESG 보고서 작성',
      '성과 평가 및 인증 신청'
    ],
    contactInfo: {
      phone: '042-481-4444',
      email: 'esg@mss.go.kr',
      website: 'https://www.mss.go.kr/esg'
    },
    tags: ['ESG', '지속가능경영', '보고서', '인증'],
    priority: 'medium',
    successRate: 68,
    lastUpdated: '2025-01-12'
  }
];

// 전체 지원사업 목록
export const allSupportPrograms: GovernmentSupportProgram[] = [
  ...energyEfficiencyPrograms,
  ...renewableEnergyPrograms,
  ...esgPrograms
];

// 기업 정보 인터페이스
export interface CompanyProfile {
  name: string;
  industryCode: string;
  companySize: 'small' | 'medium' | 'large';
  employees: number;
  revenue: number; // 억원
  location: string;
  establishedYear: number;
  certifications: string[];
  currentChallenges: string[];
  investmentPlan: {
    energyEfficiency: boolean;
    renewableEnergy: boolean;
    digitalTransformation: boolean;
    facilityUpgrade: boolean;
    esgManagement: boolean;
  };
}

// 매칭 결과 인터페이스
export interface ProgramMatchResult {
  program: GovernmentSupportProgram;
  matchScore: number; // 0-100
  eligibilityStatus: 'eligible' | 'partially_eligible' | 'not_eligible';
  missingRequirements: string[];
  recommendations: string[];
  estimatedAmount: number; // 예상 지원금액
  applicationDeadline: string;
  competitiveness: 'high' | 'medium' | 'low';
}

// 매칭 알고리즘
export function matchSupportPrograms(company: CompanyProfile): ProgramMatchResult[] {
  return allSupportPrograms.map(program => {
    let matchScore = 0;
    let eligibilityStatus: 'eligible' | 'partially_eligible' | 'not_eligible' = 'not_eligible';
    const missingRequirements: string[] = [];
    const recommendations: string[] = [];

    // 1. 기본 자격 요건 검토
    // 회사 규모
    if (program.eligibility.companySize.includes(company.companySize)) {
      matchScore += 20;
    } else {
      missingRequirements.push('회사 규모 조건 불충족');
    }

    // 업종
    if (program.eligibility.industries.includes(company.industryCode)) {
      matchScore += 25;
    } else {
      missingRequirements.push('해당 업종 대상 아님');
    }

    // 임직원 수
    const minEmp = program.eligibility.minEmployees || 0;
    const maxEmp = program.eligibility.maxEmployees || Infinity;
    if (company.employees >= minEmp && company.employees <= maxEmp) {
      matchScore += 15;
    } else {
      missingRequirements.push(`임직원 수 조건 (${minEmp}-${maxEmp}명)`);
    }

    // 매출액
    const minRev = program.eligibility.minRevenue || 0;
    const maxRev = program.eligibility.maxRevenue || Infinity;
    if (company.revenue >= minRev && company.revenue <= maxRev) {
      matchScore += 15;
    } else if (program.eligibility.maxRevenue) {
      missingRequirements.push(`매출액 조건 (${maxRev}억원 이하)`);
    }

    // 2. 투자 계획 매칭
    let investmentMatch = false;
    switch (program.category) {
      case 'energy_efficiency':
        if (company.investmentPlan.energyEfficiency) {
          matchScore += 15;
          investmentMatch = true;
        }
        break;
      case 'renewable_energy':
        if (company.investmentPlan.renewableEnergy) {
          matchScore += 15;
          investmentMatch = true;
        }
        break;
      case 'esg':
        if (company.investmentPlan.esgManagement) {
          matchScore += 15;
          investmentMatch = true;
        }
        break;
      case 'facility_upgrade':
        if (company.investmentPlan.facilityUpgrade) {
          matchScore += 15;
          investmentMatch = true;
        }
        break;
      case 'digital_transformation':
        if (company.investmentPlan.digitalTransformation) {
          matchScore += 15;
          investmentMatch = true;
        }
        break;
    }

    if (!investmentMatch) {
      missingRequirements.push('해당 분야 투자 계획 없음');
    }

    // 3. 신청 기간 확인
    const today = new Date();
    const startDate = new Date(program.applicationPeriod.start);
    const endDate = new Date(program.applicationPeriod.end);
    
    if (today >= startDate && today <= endDate) {
      matchScore += 10;
    } else if (today < startDate) {
      recommendations.push(`신청 시작일: ${program.applicationPeriod.start}`);
    } else {
      missingRequirements.push('신청 기간 만료');
    }

    // 4. 자격 상태 결정
    if (missingRequirements.length === 0) {
      eligibilityStatus = 'eligible';
    } else if (matchScore >= 50) {
      eligibilityStatus = 'partially_eligible';
    }

    // 5. 예상 지원금액 계산
    let estimatedAmount = 0;
    if (eligibilityStatus !== 'not_eligible') {
      if (program.supportType === 'grant' || program.supportType === 'subsidy') {
        estimatedAmount = Math.min(
          program.maxAmount,
          (company.revenue * 10000) * (program.supportRate / 100) * 0.1
        );
      } else {
        estimatedAmount = program.maxAmount;
      }
    }

    // 6. 경쟁력 평가
    let competitiveness: 'high' | 'medium' | 'low' = 'low';
    if (program.successRate >= 70) {
      competitiveness = 'high';
    } else if (program.successRate >= 50) {
      competitiveness = 'medium';
    }

    // 7. 추천사항 생성
    if (eligibilityStatus === 'partially_eligible') {
      recommendations.push('부족한 요건 보완 후 재신청 권장');
    }
    if (program.priority === 'high') {
      recommendations.push('정부 중점 지원 분야로 우선 검토');
    }
    if (competitiveness === 'high') {
      recommendations.push('선정률이 높아 신청 권장');
    }

    return {
      program,
      matchScore: Math.min(100, matchScore),
      eligibilityStatus,
      missingRequirements,
      recommendations,
      estimatedAmount: Math.round(estimatedAmount),
      applicationDeadline: program.applicationPeriod.end,
      competitiveness
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
}

// 지원사업 카테고리별 필터링
export function filterProgramsByCategory(
  results: ProgramMatchResult[], 
  category: string
): ProgramMatchResult[] {
  return results.filter(result => result.program.category === category);
}

// 자격 요건별 필터링
export function filterProgramsByEligibility(
  results: ProgramMatchResult[], 
  eligibility: 'eligible' | 'partially_eligible' | 'not_eligible'
): ProgramMatchResult[] {
  return results.filter(result => result.eligibilityStatus === eligibility);
}

// 지원 유형별 필터링
export function filterProgramsBySupportType(
  results: ProgramMatchResult[], 
  supportType: string
): ProgramMatchResult[] {
  return results.filter(result => result.program.supportType === supportType);
}
import { NextRequest, NextResponse } from 'next/server';
import { 
  matchSupportPrograms,
  filterProgramsByCategory,
  filterProgramsByEligibility,
  allSupportPrograms,
  CompanyProfile 
} from '@/data/government-support';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const companyProfile = body as CompanyProfile;

    // 입력값 검증
    if (!companyProfile.name || !companyProfile.industryCode || !companyProfile.companySize) {
      return NextResponse.json(
        { error: '필수 기업 정보가 누락되었습니다.' },
        { status: 400 }
      );
    }

    if (companyProfile.employees <= 0 || companyProfile.revenue < 0) {
      return NextResponse.json(
        { error: '임직원 수와 매출액을 정확히 입력해주세요.' },
        { status: 400 }
      );
    }

    // 지원사업 매칭 실행
    const matchResults = matchSupportPrograms(companyProfile);

    // 결과 분류
    const eligiblePrograms = filterProgramsByEligibility(matchResults, 'eligible');
    const partiallyEligiblePrograms = filterProgramsByEligibility(matchResults, 'partially_eligible');
    const recommendedPrograms = matchResults.slice(0, 5); // 상위 5개

    // 카테고리별 통계
    const categoryStats = {
      energy_efficiency: filterProgramsByCategory(matchResults, 'energy_efficiency').length,
      renewable_energy: filterProgramsByCategory(matchResults, 'renewable_energy').length,
      esg: filterProgramsByCategory(matchResults, 'esg').length,
      digital_transformation: filterProgramsByCategory(matchResults, 'digital_transformation').length,
      facility_upgrade: filterProgramsByCategory(matchResults, 'facility_upgrade').length,
      r_and_d: filterProgramsByCategory(matchResults, 'r_and_d').length
    };

    // 총 예상 지원금액 계산
    const totalEstimatedAmount = eligiblePrograms.reduce(
      (sum, result) => sum + result.estimatedAmount, 0
    );

    return NextResponse.json({
      success: true,
      data: {
        companyProfile,
        summary: {
          totalPrograms: matchResults.length,
          eligiblePrograms: eligiblePrograms.length,
          partiallyEligiblePrograms: partiallyEligiblePrograms.length,
          totalEstimatedAmount,
          categoryStats
        },
        recommendations: {
          topMatches: recommendedPrograms,
          eligible: eligiblePrograms,
          partiallyEligible: partiallyEligiblePrograms
        },
        analysisDate: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('지원사업 매칭 오류:', error);
    return NextResponse.json(
      { error: '지원사업 매칭 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 지원사업 목록 및 필터링 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const supportType = searchParams.get('supportType');
    const agency = searchParams.get('agency');
    const onlyOngoing = searchParams.get('ongoing') === 'true';

    let filteredPrograms = allSupportPrograms;

    // 카테고리 필터
    if (category) {
      filteredPrograms = filteredPrograms.filter(p => p.category === category);
    }

    // 지원 유형 필터
    if (supportType) {
      filteredPrograms = filteredPrograms.filter(p => p.supportType === supportType);
    }

    // 기관 필터
    if (agency) {
      filteredPrograms = filteredPrograms.filter(p => p.agency === agency);
    }

    // 진행 중인 사업만 필터
    if (onlyOngoing) {
      const today = new Date();
      filteredPrograms = filteredPrograms.filter(p => {
        const endDate = new Date(p.applicationPeriod.end);
        return endDate >= today && p.applicationPeriod.isOngoing;
      });
    }

    // 통계 정보 생성
    const statistics = {
      totalPrograms: filteredPrograms.length,
      byCategory: {
        energy_efficiency: filteredPrograms.filter(p => p.category === 'energy_efficiency').length,
        renewable_energy: filteredPrograms.filter(p => p.category === 'renewable_energy').length,
        esg: filteredPrograms.filter(p => p.category === 'esg').length,
        digital_transformation: filteredPrograms.filter(p => p.category === 'digital_transformation').length,
        facility_upgrade: filteredPrograms.filter(p => p.category === 'facility_upgrade').length,
        r_and_d: filteredPrograms.filter(p => p.category === 'r_and_d').length
      },
      bySupportType: {
        grant: filteredPrograms.filter(p => p.supportType === 'grant').length,
        loan: filteredPrograms.filter(p => p.supportType === 'loan').length,
        subsidy: filteredPrograms.filter(p => p.supportType === 'subsidy').length,
        tax_benefit: filteredPrograms.filter(p => p.supportType === 'tax_benefit').length,
        guarantee: filteredPrograms.filter(p => p.supportType === 'guarantee').length
      },
      averageSuccessRate: filteredPrograms.reduce((sum, p) => sum + p.successRate, 0) / filteredPrograms.length || 0,
      totalMaxAmount: filteredPrograms.reduce((sum, p) => sum + p.maxAmount, 0)
    };

    return NextResponse.json({
      success: true,
      data: {
        programs: filteredPrograms.map(program => ({
          id: program.id,
          title: program.title,
          agency: program.agency,
          category: program.category,
          supportType: program.supportType,
          maxAmount: program.maxAmount,
          supportRate: program.supportRate,
          applicationPeriod: program.applicationPeriod,
          eligibility: {
            companySize: program.eligibility.companySize,
            industries: program.eligibility.industries
          },
          tags: program.tags,
          priority: program.priority,
          successRate: program.successRate
        })),
        statistics,
        filters: {
          categories: ['energy_efficiency', 'renewable_energy', 'esg', 'digital_transformation', 'facility_upgrade', 'r_and_d'],
          supportTypes: ['grant', 'loan', 'subsidy', 'tax_benefit', 'guarantee'],
          agencies: [...new Set(allSupportPrograms.map(p => p.agency))]
        }
      }
    });

  } catch (error) {
    console.error('지원사업 조회 오류:', error);
    return NextResponse.json(
      { error: '지원사업 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
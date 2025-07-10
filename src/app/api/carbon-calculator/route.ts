import { NextRequest, NextResponse } from 'next/server';
import { 
  calculateCarbonEmission, 
  calculateESGScore,
  CarbonEmissionInput,
  industryEmissionBenchmarks,
  esgCriteria 
} from '@/data/carbon-emissions';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input = body as CarbonEmissionInput;

    // 입력값 검증
    if (!input.companyInfo?.name || !input.companyInfo?.industryCode || !input.companyInfo?.employees) {
      return NextResponse.json(
        { error: '기업 정보가 누락되었습니다.' },
        { status: 400 }
      );
    }

    if (!input.energyUsage?.electricity || input.energyUsage.electricity <= 0) {
      return NextResponse.json(
        { error: '전력 사용량을 입력해주세요.' },
        { status: 400 }
      );
    }

    if (input.companyInfo.employees <= 0) {
      return NextResponse.json(
        { error: '임직원 수를 정확히 입력해주세요.' },
        { status: 400 }
      );
    }

    // 탄소 배출량 계산
    const carbonResult = calculateCarbonEmission(input);

    // 기업 규모 분류
    let companySize: 'small' | 'medium' | 'large';
    if (input.companyInfo.employees < 50) {
      companySize = 'small';
    } else if (input.companyInfo.employees < 300) {
      companySize = 'medium';
    } else {
      companySize = 'large';
    }

    // ESG 점수 계산
    const esgResult = calculateESGScore(carbonResult, companySize);

    // 업종 정보 조회
    const industryInfo = industryEmissionBenchmarks.find(
      b => b.industryCode === input.companyInfo.industryCode
    );

    return NextResponse.json({
      success: true,
      data: {
        companyInfo: input.companyInfo,
        carbonEmission: carbonResult,
        esgScore: esgResult,
        industryInfo,
        companySize,
        calculatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('탄소 배출량 계산 오류:', error);
    return NextResponse.json(
      { error: '탄소 배출량 계산 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 업종별 벤치마크 및 ESG 기준 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (type === 'industries') {
      return NextResponse.json({
        success: true,
        data: {
          industries: industryEmissionBenchmarks.map(industry => ({
            code: industry.industryCode,
            name: industry.industryName,
            averageEmission: industry.averageEmission,
            sampleSize: industry.sampleSize
          }))
        }
      });
    }

    if (type === 'esg-criteria') {
      return NextResponse.json({
        success: true,
        data: {
          criteria: esgCriteria
        }
      });
    }

    // 기본: 전체 정보 반환
    return NextResponse.json({
      success: true,
      data: {
        industries: industryEmissionBenchmarks.map(industry => ({
          code: industry.industryCode,
          name: industry.industryName,
          averageEmission: industry.averageEmission,
          bestPerformance: industry.bestPerformance,
          worstPerformance: industry.worstPerformance,
          sampleSize: industry.sampleSize,
          dataYear: industry.dataYear
        })),
        esgCriteria,
        lastUpdated: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('데이터 조회 오류:', error);
    return NextResponse.json(
      { error: '데이터 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { 
  analyzeBuildingEfficiency, 
  BuildingInfo,
  BuildingEfficiencyGrade,
  efficiencyGrades,
  buildingTypeBenchmarks,
  gradeIncentives
} from '@/data/building-efficiency';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const buildingInfo = body as BuildingInfo;

    // 입력값 검증
    if (!buildingInfo.buildingType || !buildingInfo.floorArea || !buildingInfo.currentGrade) {
      return NextResponse.json(
        { error: '건물 유형, 연면적, 현재 에너지 효율등급을 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    if (buildingInfo.floorArea <= 0 || buildingInfo.floorArea > 100000) {
      return NextResponse.json(
        { error: '연면적은 1m² 이상 100,000m² 이하로 입력해주세요.' },
        { status: 400 }
      );
    }

    if (buildingInfo.constructionYear < 1950 || buildingInfo.constructionYear > new Date().getFullYear()) {
      return NextResponse.json(
        { error: '준공년도를 올바르게 입력해주세요.' },
        { status: 400 }
      );
    }

    const validGrades = efficiencyGrades.map(g => g.grade);
    if (!validGrades.includes(buildingInfo.currentGrade as BuildingEfficiencyGrade['grade'])) {
      return NextResponse.json(
        { error: '유효하지 않은 에너지 효율등급입니다.' },
        { status: 400 }
      );
    }

    // 건물 효율 분석 수행
    const analysisResult = analyzeBuildingEfficiency(buildingInfo);

    // 건물 유형별 벤치마크 정보 추가
    const benchmark = buildingTypeBenchmarks[buildingInfo.buildingType];
    let performanceLevel = 'poor';
    if (analysisResult.currentStatus.energyConsumption <= benchmark.excellent) {
      performanceLevel = 'excellent';
    } else if (analysisResult.currentStatus.energyConsumption <= benchmark.good) {
      performanceLevel = 'good';
    } else if (analysisResult.currentStatus.energyConsumption <= benchmark.average) {
      performanceLevel = 'average';
    }

    // 투자 우선순위 분석
    const investmentPriority = analysisResult.improvementPlan.measures
      .map(measure => ({
        ...measure,
        costEffectiveness: measure.energySavings / (measure.estimatedCost / 1000000), // 백만원당 절감률
        priorityScore: (measure.energySavings * measure.gradeImprovement) / measure.paybackPeriod
      }))
      .sort((a, b) => b.priorityScore - a.priorityScore);

    return NextResponse.json({
      success: true,
      data: {
        ...analysisResult,
        buildingInfo,
        benchmark: {
          buildingType: buildingInfo.buildingType,
          performanceLevel,
          comparison: {
            excellent: benchmark.excellent,
            good: benchmark.good,
            average: benchmark.average,
            poor: benchmark.poor,
            current: analysisResult.currentStatus.energyConsumption
          }
        },
        investmentPriority,
        recommendations: {
          immediate: investmentPriority.filter(m => m.difficulty === 'easy').slice(0, 2),
          shortTerm: investmentPriority.filter(m => m.difficulty === 'medium').slice(0, 2),
          longTerm: investmentPriority.filter(m => m.difficulty === 'hard').slice(0, 1)
        },
        financialSummary: {
          totalInvestment: analysisResult.improvementPlan.totalInvestment,
          annualSavings: analysisResult.improvementPlan.expectedSavings,
          lifetimeSavings: analysisResult.improvementPlan.expectedSavings * 20, // 20년 기준
          netPresentValue: analysisResult.improvementPlan.expectedSavings * 15 - analysisResult.improvementPlan.totalInvestment, // 간단한 NPV
          roi: (analysisResult.improvementPlan.expectedSavings / analysisResult.improvementPlan.totalInvestment) * 100
        },
        analysisDate: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('건물 효율 분석 오류:', error);
    return NextResponse.json(
      { error: '건물 효율 분석 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 효율등급 및 벤치마크 정보 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const buildingType = searchParams.get('buildingType');
    const action = searchParams.get('action');

    if (action === 'grades') {
      // 효율등급 정보 반환
      return NextResponse.json({
        success: true,
        data: {
          grades: efficiencyGrades,
          incentives: gradeIncentives,
          description: '한국부동산원 건물 에너지 효율등급 기준'
        }
      });
    }

    if (action === 'benchmarks') {
      // 건물 유형별 벤치마크 정보 반환
      const benchmarks = buildingType ? 
        { [buildingType]: buildingTypeBenchmarks[buildingType as keyof typeof buildingTypeBenchmarks] } :
        buildingTypeBenchmarks;

      return NextResponse.json({
        success: true,
        data: {
          benchmarks,
          unit: 'kWh/m²·year',
          description: '건물 유형별 에너지 소비 벤치마크'
        }
      });
    }

    // 전체 기본 정보 반환
    return NextResponse.json({
      success: true,
      data: {
        buildingTypes: [
          { code: 'office', name: '사무소' },
          { code: 'factory', name: '공장' },
          { code: 'retail', name: '상업시설' },
          { code: 'warehouse', name: '창고' },
          { code: 'mixed', name: '복합용도' }
        ],
        heatingSystemTypes: [
          { code: 'gas', name: '가스보일러' },
          { code: 'electric', name: '전기난방' },
          { code: 'district', name: '지역난방' },
          { code: 'oil', name: '기름보일러' }
        ],
        coolingSystemTypes: [
          { code: 'central', name: '중앙공조' },
          { code: 'individual', name: '개별공조' },
          { code: 'none', name: '없음' }
        ],
        insulationLevels: [
          { code: 'excellent', name: '우수' },
          { code: 'good', name: '양호' },
          { code: 'average', name: '보통' },
          { code: 'poor', name: '미흡' }
        ],
        windowTypes: [
          { code: 'triple', name: '삼중유리' },
          { code: 'double', name: '복층유리' },
          { code: 'single', name: '단판유리' }
        ],
        efficiencyGrades: efficiencyGrades.map(grade => ({
          code: grade.grade,
          name: `${grade.grade}등급 (${grade.description})`
        }))
      }
    });

  } catch (error) {
    console.error('건물 정보 조회 오류:', error);
    return NextResponse.json(
      { error: '건물 정보 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
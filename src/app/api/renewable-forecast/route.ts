import { NextRequest, NextResponse } from 'next/server';
import { 
  calculateRenewableEnergyForecast, 
  evaluateRenewableEnergyPotential,
  getAllRegions 
} from '@/data/weather-data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { regionCode, capacity, energyType } = body;

    // 입력값 검증
    if (!regionCode || !capacity || !energyType) {
      return NextResponse.json(
        { error: '지역, 용량, 에너지 타입을 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    if (capacity <= 0 || capacity > 10000) {
      return NextResponse.json(
        { error: '설치 용량은 1kW 이상 10,000kW 이하로 입력해주세요.' },
        { status: 400 }
      );
    }

    if (!['solar', 'wind'].includes(energyType)) {
      return NextResponse.json(
        { error: '에너지 타입은 solar 또는 wind만 지원합니다.' },
        { status: 400 }
      );
    }

    // 신재생에너지 발전량 예측 계산
    const forecast = calculateRenewableEnergyForecast(regionCode, capacity, energyType);
    
    // 지역별 잠재력 평가
    const potential = evaluateRenewableEnergyPotential(regionCode);

    return NextResponse.json({
      success: true,
      data: {
        forecast,
        potential,
        analysis: {
          feasibility: forecast.investmentAnalysis.roi >= 10 ? 'high' : 
                     forecast.investmentAnalysis.roi >= 7 ? 'medium' : 'low',
          recommendation: forecast.investmentAnalysis.roi >= 10 
            ? '투자 수익성이 우수하여 설치를 적극 권장합니다.'
            : forecast.investmentAnalysis.roi >= 7
            ? '적정 수준의 수익성으로 설치를 권장합니다.'
            : '수익성이 제한적이므로 신중한 검토가 필요합니다.',
          keyInsights: [
            `연간 예상 발전량: ${forecast.annualProduction.totalOutput.toLocaleString()}kWh`,
            `연간 탄소 감축: ${forecast.annualProduction.co2Reduction}tCO2`,
            `투자 회수기간: ${forecast.investmentAnalysis.paybackPeriod}년`,
            `IRR: ${forecast.investmentAnalysis.irr}%`
          ]
        },
        calculationDate: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('신재생에너지 예측 오류:', error);
    return NextResponse.json(
      { error: '신재생에너지 예측 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 지역 정보 및 잠재력 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const regionCode = searchParams.get('regionCode');

    if (regionCode) {
      // 특정 지역의 잠재력 평가
      const potential = evaluateRenewableEnergyPotential(regionCode);
      
      if (!potential) {
        return NextResponse.json(
          { error: '해당 지역 정보를 찾을 수 없습니다.' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: potential
      });
    } else {
      // 모든 지역 정보 조회
      const regions = getAllRegions();
      
      return NextResponse.json({
        success: true,
        data: {
          regions,
          summary: {
            totalRegions: regions.length,
            highSolarPotential: regions.filter(r => r.solarScore >= 80).length,
            highWindPotential: regions.filter(r => r.windScore >= 80).length,
            averageSolarScore: Math.round(
              regions.reduce((sum, r) => sum + r.solarScore, 0) / regions.length
            ),
            averageWindScore: Math.round(
              regions.reduce((sum, r) => sum + r.windScore, 0) / regions.length
            )
          }
        }
      });
    }

  } catch (error) {
    console.error('지역 정보 조회 오류:', error);
    return NextResponse.json(
      { error: '지역 정보 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
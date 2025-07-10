import { NextRequest, NextResponse } from 'next/server';
import { 
  calculateElectricityCost, 
  calculateSavingScenarios,
  allElectricityRates,
  ElectricityCostInput 
} from '@/data/electricity-rates';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { rateId, monthlyUsage, contractedPower, month } = body as ElectricityCostInput;

    // 입력값 검증
    if (!rateId || typeof monthlyUsage !== 'number' || typeof month !== 'number') {
      return NextResponse.json(
        { error: '필수 입력값이 누락되었습니다.' },
        { status: 400 }
      );
    }

    if (monthlyUsage < 0 || month < 1 || month > 12) {
      return NextResponse.json(
        { error: '입력값이 유효하지 않습니다.' },
        { status: 400 }
      );
    }

    // 요금표 존재 확인
    const rate = allElectricityRates.find(r => r.id === rateId);
    if (!rate) {
      return NextResponse.json(
        { error: '존재하지 않는 요금표입니다.' },
        { status: 400 }
      );
    }

    // 전기요금 계산
    const currentCost = calculateElectricityCost({
      rateId,
      monthlyUsage,
      contractedPower: contractedPower || 0,
      month
    });

    // 절약 시나리오 계산
    const savingScenarios = calculateSavingScenarios(
      currentCost,
      monthlyUsage,
      rateId,
      contractedPower || 0,
      month
    );

    return NextResponse.json({
      success: true,
      data: {
        rateInfo: rate,
        currentCost,
        savingScenarios,
        calculatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('전기요금 계산 오류:', error);
    return NextResponse.json(
      { error: '전기요금 계산 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 전기요금표 목록 조회
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: {
        rates: allElectricityRates.map(rate => ({
          id: rate.id,
          name: rate.name,
          type: rate.type,
          description: rate.description
        }))
      }
    });
  } catch (error) {
    console.error('전기요금표 조회 오류:', error);
    return NextResponse.json(
      { error: '전기요금표 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
import CarbonESGCalculator from '@/components/carbon-calculator/carbon-esg-calculator';

export default function ESGCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CarbonESGCalculator />
    </div>
  );
}

export const metadata = {
  title: '탄소 배출량 & ESG 평가 시스템 | EcoBoost Energy Platform',
  description: '환경부 온실가스 통계 기반 정확한 탄소 배출량 계산 및 ESG 경영 평가, 탄소중립 로드맵 제공',
  keywords: ['탄소 배출량', 'ESG', '온실가스', '탄소중립', '환경경영', '지속가능경영'],
};
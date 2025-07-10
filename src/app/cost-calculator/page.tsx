import EnergyCostCalculator from '@/components/cost-calculator/energy-cost-calculator';
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function CostCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <EnergyCostCalculator />
      <Footer />
    </div>
  );
}

export const metadata = {
  title: '실시간 에너지 비용 계산기 | EcoBoost Energy Platform',
  description: '한국전력공사 공식 요금표 기반 정확한 전기요금 계산 및 절약 시나리오 분석',
  keywords: ['전기요금', '에너지 비용', '절약 계산기', '한국전력공사', '전력요금'],
};
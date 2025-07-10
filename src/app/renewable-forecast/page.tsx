import RenewableEnergyForecast from '@/components/renewable-forecast/renewable-energy-forecast';
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function RenewableForecastPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <RenewableEnergyForecast />
      <Footer />
    </div>
  );
}

export const metadata = {
  title: '기상 데이터 기반 신재생에너지 예측 | EcoBoost Energy Platform',
  description: '기상청 관측 데이터를 활용하여 태양광 및 풍력 발전량을 정확히 예측하고 투자 타당성을 분석합니다.',
  keywords: ['신재생에너지', '태양광', '풍력', '발전량예측', '투자분석', '기상데이터', 'ROI'],
};
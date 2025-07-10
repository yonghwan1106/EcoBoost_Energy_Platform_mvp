import GovernmentSupportEngine from '@/components/support-programs/government-support-engine';
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function SupportProgramsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <GovernmentSupportEngine />
      <Footer />
    </div>
  );
}

export const metadata = {
  title: '정부 지원사업 추천 엔진 | EcoBoost Energy Platform',
  description: '중소벤처기업부 및 관련 부처의 지원사업을 분석하여 맞춤형 지원사업을 추천하는 AI 추천 시스템',
  keywords: ['정부지원사업', '중소벤처기업부', '에너지효율화', '신재생에너지', 'ESG', '보조금', '융자'],
};
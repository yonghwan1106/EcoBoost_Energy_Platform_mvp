import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import OverviewDashboard from "@/components/dashboard/overview-dashboard";
import { Award, TrendingUp, Users, Activity } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section - Condensed */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-4">
              <Award className="h-4 w-4 text-yellow-300" />
              <span className="text-sm text-white font-semibold">
                산업통상자원부 공공데이터 활용 아이디어 공모전 출품작
              </span>
              <Award className="h-4 w-4 text-yellow-300" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              에너지 효율화 대시보드
            </h1>
            <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
              실시간 에너지 데이터 분석 및 효율화 현황을 한눈에 확인하세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                <Link href="/analysis">상세 분석</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white bg-transparent hover:bg-white hover:text-green-600">
                <Link href="/report">리포트 다운로드</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">실시간</div>
              <div className="text-sm text-gray-600">데이터 모니터링</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">1,247</div>
              <div className="text-sm text-gray-600">참여 기업</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-2">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">15.2%</div>
              <div className="text-sm text-gray-600">평균 절감률</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mx-auto mb-2">
                <Award className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">A등급</div>
              <div className="text-sm text-gray-600">플랫폼 신뢰도</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              에너지 효율화 현황 대시보드
            </h2>
            <p className="text-gray-600">
              전국 중소기업 에너지 사용 현황과 효율화 성과를 실시간으로 확인하세요
            </p>
          </div>
          
          <OverviewDashboard />
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              빠른 실행
            </h2>
            <p className="text-gray-600">
              필요한 분석과 도구를 바로 실행하세요
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <CardTitle className="text-lg">
                  <Link href="/analysis" className="text-green-600 hover:text-green-700">
                    에너지 분석
                  </Link>
                </CardTitle>
                <CardDescription>
                  업종별 에너지 사용 패턴 분석
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <CardTitle className="text-lg">
                  <Link href="/cost-calculator" className="text-blue-600 hover:text-blue-700">
                    비용 계산
                  </Link>
                </CardTitle>
                <CardDescription>
                  에너지 비용 절감 시뮬레이션
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <CardTitle className="text-lg">
                  <Link href="/potential" className="text-emerald-600 hover:text-emerald-700">
                    잠재력 평가
                  </Link>
                </CardTitle>
                <CardDescription>
                  신재생에너지 설치 가능성
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <CardTitle className="text-lg">
                  <Link href="/support-programs" className="text-purple-600 hover:text-purple-700">
                    지원 사업
                  </Link>
                </CardTitle>
                <CardDescription>
                  정부 지원사업 및 인센티브
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

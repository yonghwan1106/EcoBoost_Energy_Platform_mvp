import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { BarChart3, TrendingUp, Zap, Leaf, Award } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <Award className="h-4 w-4 text-yellow-300" />
              <span className="text-sm md:text-base text-white font-semibold">
                산업통상자원부 공공데이터 활용 아이디어 공모전 출품작
              </span>
              <Award className="h-4 w-4 text-yellow-300" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              에너지 효율화의 새로운 시작
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              산업통상자원부 공공데이터를 활용한 중소기업 에너지 사용 분석 및 효율화 플랫폼
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                <Link href="/analysis">에너지 분석 시작하기</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white bg-transparent hover:bg-white hover:text-green-600">
                <Link href="/potential">신재생에너지 잠재력 확인</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              주요 기능
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              공공데이터를 활용한 정확한 분석으로 에너지 비용 절감과 효율성 향상을 지원합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>에너지 사용량 분석</CardTitle>
                <CardDescription>
                  업종별, 지역별 에너지 사용 패턴 분석
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  한국에너지공단 데이터를 활용한 정확한 분석
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>효율화 가이드</CardTitle>
                <CardDescription>
                  업종별 벤치마킹 기반 절약 방안 제시
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  동종 업계 대비 에너지 효율성 비교
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Leaf className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <CardTitle>신재생에너지</CardTitle>
                <CardDescription>
                  지역별 신재생에너지 설치 잠재력 평가
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  태양광, 풍력 등 설치 적합성 분석
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Zap className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <CardTitle>비용 절감 시뮬레이션</CardTitle>
                <CardDescription>
                  에너지 절약 시나리오별 절감 효과 계산
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  ROI 계산 및 투자 회수 기간 분석
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              활용 데이터 현황
            </h2>
            <p className="text-lg text-gray-600">
              신뢰할 수 있는 공공데이터를 기반으로 한 분석 서비스
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">3+</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">공공데이터 활용</div>
              <div className="text-gray-600">
                한국에너지공단, 한국전력공사 등 공공기관 데이터
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">17</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">시도별 분석</div>
              <div className="text-gray-600">
                전국 17개 시도 지역별 에너지 데이터 분석
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">10+</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">업종별 벤치마킹</div>
              <div className="text-gray-600">
                제조업, 서비스업 등 주요 업종별 데이터 제공
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            지금 바로 에너지 효율화를 시작하세요
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            무료 분석 서비스로 여러분의 에너지 비용 절감 가능성을 확인해보세요.
          </p>
          <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
            <Link href="/analysis">무료 분석 시작</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

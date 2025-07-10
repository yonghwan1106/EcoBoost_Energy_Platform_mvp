'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, TrendingUp, DollarSign, Leaf, Clock, AlertCircle } from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import BuildingEfficiencyCalculator from '@/components/building-efficiency/building-efficiency-calculator';

export default function BuildingEfficiencyPage() {
  const [showCalculator, setShowCalculator] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Building2 className="h-16 w-16 mx-auto mb-6 text-blue-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              건물 에너지 효율등급 진단
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              한국부동산원 기준 건물 에너지 효율등급 진단 및 개선 방안 제시
            </p>
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => setShowCalculator(true)}
            >
              무료 효율등급 진단 시작하기
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              건물 효율등급 진단 서비스
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              전문적인 분석을 통해 건물의 에너지 효율성을 진단하고 개선 방안을 제시합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Building2 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>정확한 등급 진단</CardTitle>
                <CardDescription>
                  한국부동산원 기준 정확한 에너지 효율등급 평가
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  건물 특성을 종합적으로 분석하여 현재 효율등급을 정확히 진단
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>맞춤형 개선안</CardTitle>
                <CardDescription>
                  건물별 특성에 맞는 효율 개선 방안 제시
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  투자 효과가 높은 우선 순위별 개선 방안 추천
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <DollarSign className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <CardTitle>투자 수익 분석</CardTitle>
                <CardDescription>
                  정확한 투자 비용 및 회수 기간 계산
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  ROI, NPV 등 재무적 분석을 통한 투자 타당성 검토
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Leaf className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <CardTitle>정부 지원 정보</CardTitle>
                <CardDescription>
                  효율 개선 관련 정부 지원사업 및 인센티브
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  보조금, 세제 혜택, 융자 지원 등 종합 정보 제공
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Efficiency Grades Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              건물 에너지 효율등급 체계
            </h2>
            <p className="text-lg text-gray-600">
              한국부동산원에서 운영하는 건물 에너지 효율등급 인증 기준
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="text-center">
                <Badge className="mx-auto mb-2 bg-green-600">1+++ 등급</Badge>
                <CardTitle className="text-green-800">제로에너지건물</CardTitle>
                <CardDescription>≤ 20 kWh/m²·년</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-green-700">
                  최고 수준의 에너지 효율성을 보유한 건물
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="text-center">
                <Badge className="mx-auto mb-2 bg-blue-600">1++ 등급</Badge>
                <CardTitle className="text-blue-800">최우수 효율</CardTitle>
                <CardDescription>≤ 40 kWh/m²·년</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-700">
                  우수한 에너지 효율성을 보유한 고성능 건물
                </p>
              </CardContent>
            </Card>

            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader className="text-center">
                <Badge className="mx-auto mb-2 bg-yellow-600">1+ ~ 3 등급</Badge>
                <CardTitle className="text-yellow-800">양호 ~ 보통</CardTitle>
                <CardDescription>60 ~ 160 kWh/m²·년</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-yellow-700">
                  일반적인 수준의 에너지 효율성
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardHeader className="text-center">
                <Badge className="mx-auto mb-2 bg-red-600">4 ~ 7 등급</Badge>
                <CardTitle className="text-red-800">개선 필요</CardTitle>
                <CardDescription>≥ 200 kWh/m²·년</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-red-700">
                  에너지 효율 개선이 필요한 건물
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              효율등급 개선 혜택
            </h2>
            <p className="text-lg text-gray-600">
              건물 에너지 효율등급 개선을 통해 얻을 수 있는 다양한 혜택
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <DollarSign className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>경제적 혜택</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 에너지비용 15-30% 절감</li>
                  <li>• 건물 자산가치 5-10% 상승</li>
                  <li>• 임대료 프리미엄 확보</li>
                  <li>• 유지관리비 절감</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Building2 className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>세제 혜택</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 투자세액공제 최대 10%</li>
                  <li>• 취득세 감면 혜택</li>
                  <li>• 재산세 경감 (3년간)</li>
                  <li>• 환경개선부담금 면제</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Leaf className="h-8 w-8 text-emerald-600 mb-2" />
                <CardTitle>환경적 가치</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 탄소배출량 20-40% 감소</li>
                  <li>• ESG 경영 평가 향상</li>
                  <li>• 그린빌딩 인증 취득</li>
                  <li>• 실내 환경 품질 개선</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              진단 프로세스
            </h2>
            <p className="text-lg text-gray-600">
              간단한 3단계 과정으로 건물 효율등급 진단 완료
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">건물 정보 입력</h3>
              <p className="text-gray-600">
                건물 유형, 연면적, 준공년도 등 기본 정보를 입력합니다.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">자동 분석</h3>
              <p className="text-gray-600">
                AI 기반 분석 시스템이 건물의 에너지 효율성을 종합 분석합니다.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">결과 확인</h3>
              <p className="text-gray-600">
                현재 등급, 개선 방안, 투자 효과 등 상세 결과를 확인합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Clock className="h-16 w-16 mx-auto mb-6 text-blue-200" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            지금 바로 건물 효율등급을 진단해보세요
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            단 5분만에 건물의 에너지 효율성을 분석하고 개선 방안을 확인할 수 있습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => setShowCalculator(true)}
            >
              무료 진단 시작하기
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white bg-transparent hover:bg-white hover:text-blue-600"
            >
              진단 사례 보기
            </Button>
          </div>
        </div>
      </section>

      {/* Calculator Modal/Section */}
      {showCalculator && (
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                건물 에너지 효율등급 진단
              </h2>
              <Button 
                variant="outline"
                onClick={() => setShowCalculator(false)}
              >
                닫기
              </Button>
            </div>
            <BuildingEfficiencyCalculator />
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
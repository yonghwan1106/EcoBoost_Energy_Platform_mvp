'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, Award, Calendar, DollarSign, CheckCircle, AlertCircle, 
  Phone, Mail, Globe, TrendingUp, Target, ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface CompanyProfile {
  name: string;
  industryCode: string;
  companySize: 'small' | 'medium' | 'large';
  employees: number;
  revenue: number;
  location: string;
  establishedYear: number;
  certifications: string[];
  currentChallenges: string[];
  investmentPlan: {
    energyEfficiency: boolean;
    renewableEnergy: boolean;
    digitalTransformation: boolean;
    facilityUpgrade: boolean;
    esgManagement: boolean;
  };
}

interface GovernmentProgram {
  id: string;
  title: string;
  agency: string;
  department: string;
  category: string;
  supportType: string;
  maxAmount: number;
  supportRate: number;
  applicationPeriod: {
    start: string;
    end: string;
    isOngoing: boolean;
  };
  eligibility: {
    companySize: string[];
    industries: string[];
    minEmployees?: number;
    maxEmployees?: number;
  };
  requirements: string[];
  benefits: string[];
  applicationProcess: string[];
  contactInfo: {
    phone: string;
    email: string;
    website: string;
  };
  tags: string[];
  priority: string;
  successRate: number;
}

interface ProgramMatchResult {
  program: GovernmentProgram;
  matchScore: number;
  eligibilityStatus: 'eligible' | 'partially_eligible' | 'not_eligible';
  missingRequirements: string[];
  recommendations: string[];
  estimatedAmount: number;
  applicationDeadline: string;
  competitiveness: 'high' | 'medium' | 'low';
}

interface MatchingResult {
  companyProfile: CompanyProfile;
  summary: {
    totalPrograms: number;
    eligiblePrograms: number;
    partiallyEligiblePrograms: number;
    totalEstimatedAmount: number;
    categoryStats: Record<string, number>;
  };
  recommendations: {
    topMatches: ProgramMatchResult[];
    eligible: ProgramMatchResult[];
    partiallyEligible: ProgramMatchResult[];
  };
}

// 업종 옵션
const industryOptions = [
  { code: 'C10', name: '식품제조업' },
  { code: 'C13', name: '섬유제품 제조업' },
  { code: 'C20', name: '화학물질 및 화학제품 제조업' },
  { code: 'C24', name: '1차 금속 제조업' },
  { code: 'C25', name: '금속가공제품 제조업' },
  { code: 'C26', name: '전자부품, 컴퓨터 제조업' },
  { code: 'G47', name: '소매업' },
  { code: 'I56', name: '음식점 및 주점업' }
];

export default function GovernmentSupportEngine() {
  const [formData, setFormData] = useState<CompanyProfile>({
    name: '',
    industryCode: 'C25',
    companySize: 'small',
    employees: 30,
    revenue: 50, // 억원
    location: '서울특별시',
    establishedYear: 2020,
    certifications: [],
    currentChallenges: [],
    investmentPlan: {
      energyEfficiency: true,
      renewableEnergy: false,
      digitalTransformation: false,
      facilityUpgrade: true,
      esgManagement: false
    }
  });

  const [result, setResult] = useState<MatchingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<ProgramMatchResult | null>(null);

  // 지원사업 매칭 실행
  const findSupportPrograms = async () => {
    if (!formData.name.trim()) {
      alert('기업명을 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/support-programs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setResult(data.data);
      } else {
        alert(data.error || '매칭 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('매칭 오류:', error);
      alert('매칭 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 자격 상태 색상
  const getEligibilityColor = (status: string) => {
    switch (status) {
      case 'eligible': return 'text-green-600 bg-green-50';
      case 'partially_eligible': return 'text-yellow-600 bg-yellow-50';
      case 'not_eligible': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // 지원 유형 색상
  const getSupportTypeColor = (type: string) => {
    switch (type) {
      case 'grant': return 'text-blue-600 bg-blue-50';
      case 'loan': return 'text-purple-600 bg-purple-50';
      case 'subsidy': return 'text-green-600 bg-green-50';
      case 'tax_benefit': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // 경쟁력 아이콘
  const getCompetitivenessIcon = (level: string) => {
    switch (level) {
      case 'high': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'medium': return <Target className="h-4 w-4 text-yellow-600" />;
      case 'low': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  // 카테고리별 통계 차트 데이터
  const categoryChartData = result ? Object.entries(result.summary.categoryStats).map(([key, value]) => ({
    name: key === 'energy_efficiency' ? '에너지효율' :
          key === 'renewable_energy' ? '신재생에너지' :
          key === 'esg' ? 'ESG' :
          key === 'digital_transformation' ? '디지털전환' :
          key === 'facility_upgrade' ? '시설개선' : 'R&D',
    value,
    color: key === 'energy_efficiency' ? '#8884d8' :
           key === 'renewable_energy' ? '#82ca9d' :
           key === 'esg' ? '#ffc658' :
           key === 'digital_transformation' ? '#ff7c7c' :
           key === 'facility_upgrade' ? '#8dd1e1' : '#d084d0'
  })).filter(item => item.value > 0) : [];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* 네비게이션 섹션 */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          메인으로 돌아가기
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/cost-calculator" className="text-sm text-gray-600 hover:text-green-600 transition-colors">
            비용 계산기
          </Link>
          <Link href="/esg-calculator" className="text-sm text-gray-600 hover:text-green-600 transition-colors">
            ESG 평가
          </Link>
          <Link href="/renewable-forecast" className="text-sm text-gray-600 hover:text-green-600 transition-colors">
            발전량 예측
          </Link>
        </div>
      </div>

      {/* 제목 섹션 */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          정부 지원사업 추천 엔진
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          중소벤처기업부 및 관련 부처의 지원사업을 분석하여 
          귀하의 기업에 최적화된 맞춤형 지원사업을 추천해드립니다.
        </p>
      </div>

      {/* 기업 정보 입력 폼 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            기업 정보 입력
          </CardTitle>
          <CardDescription>
            정확한 추천을 위해 기업의 기본 정보와 투자 계획을 입력해주세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 기본 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                기업명 *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="예: (주)에코부스트"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                업종 *
              </label>
              <select
                value={formData.industryCode}
                onChange={(e) => setFormData({ ...formData, industryCode: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {industryOptions.map((industry) => (
                  <option key={industry.code} value={industry.code}>
                    {industry.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                기업 규모 *
              </label>
              <select
                value={formData.companySize}
                onChange={(e) => setFormData({ ...formData, companySize: e.target.value as 'small' | 'medium' | 'large' })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="small">소기업 (50인 미만)</option>
                <option value="medium">중기업 (50-300인)</option>
                <option value="large">대기업 (300인 이상)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                임직원 수 *
              </label>
              <input
                type="number"
                value={formData.employees}
                onChange={(e) => setFormData({ ...formData, employees: Number(e.target.value) })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="30"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                연매출 (억원) *
              </label>
              <input
                type="number"
                value={formData.revenue}
                onChange={(e) => setFormData({ ...formData, revenue: Number(e.target.value) })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="50"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                소재지
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="서울특별시"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                설립연도
              </label>
              <input
                type="number"
                value={formData.establishedYear}
                onChange={(e) => setFormData({ ...formData, establishedYear: Number(e.target.value) })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="2020"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>
          </div>

          {/* 투자 계획 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">투자 계획 (중복 선택 가능)</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { key: 'energyEfficiency', label: '에너지 효율화', icon: '⚡' },
                { key: 'renewableEnergy', label: '신재생에너지', icon: '🌱' },
                { key: 'digitalTransformation', label: '디지털 전환', icon: '💻' },
                { key: 'facilityUpgrade', label: '시설 개선', icon: '🏭' },
                { key: 'esgManagement', label: 'ESG 경영', icon: '🌍' }
              ].map((plan) => (
                <label key={plan.key} className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.investmentPlan[plan.key as keyof typeof formData.investmentPlan]}
                    onChange={(e) => setFormData({
                      ...formData,
                      investmentPlan: {
                        ...formData.investmentPlan,
                        [plan.key]: e.target.checked
                      }
                    })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-lg">{plan.icon}</span>
                  <span className="text-sm font-medium">{plan.label}</span>
                </label>
              ))}
            </div>
          </div>

          <Button
            onClick={findSupportPrograms}
            disabled={loading || !formData.name.trim()}
            className="w-full"
            size="lg"
          >
            {loading ? '분석 중...' : '맞춤형 지원사업 찾기'}
          </Button>
        </CardContent>
      </Card>

      {/* 분석 결과 */}
      {result && (
        <div className="space-y-6">
          {/* 요약 통계 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">총 발견된 사업</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {result.summary.totalPrograms}개
                    </p>
                  </div>
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">신청 가능</p>
                    <p className="text-2xl font-bold text-green-600">
                      {result.summary.eligiblePrograms}개
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">부분 적합</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {result.summary.partiallyEligiblePrograms}개
                    </p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">예상 지원금</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {(result.summary.totalEstimatedAmount / 10000).toFixed(1)}억원
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 분야별 통계 */}
          <Card>
            <CardHeader>
              <CardTitle>분야별 지원사업 현황</CardTitle>
              <CardDescription>
                투자 계획에 맞는 분야별 지원사업 분포를 확인하세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                    >
                      {categoryChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}개 사업`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* 추천 지원사업 */}
          <Card>
            <CardHeader>
              <CardTitle>맞춤 추천 지원사업</CardTitle>
              <CardDescription>
                귀하의 기업에 가장 적합한 상위 5개 지원사업입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.recommendations.topMatches.map((match) => (
                  <Card key={match.program.id} className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedProgram(match)}>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{match.program.title}</h3>
                            <Badge className={getEligibilityColor(match.eligibilityStatus)}>
                              {match.eligibilityStatus === 'eligible' ? '신청가능' :
                               match.eligibilityStatus === 'partially_eligible' ? '부분적합' : '부적합'}
                            </Badge>
                            <Badge className={getSupportTypeColor(match.program.supportType)}>
                              {match.program.supportType === 'grant' ? '보조금' :
                               match.program.supportType === 'loan' ? '융자' :
                               match.program.supportType === 'subsidy' ? '지원금' : '세제혜택'}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-3">
                            {match.program.agency} · {match.program.department}
                          </p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">최대 지원금</p>
                              <p className="font-semibold">{(match.program.maxAmount / 10000).toFixed(1)}억원</p>
                            </div>
                            <div>
                              <p className="text-gray-500">지원율</p>
                              <p className="font-semibold">{match.program.supportRate}%</p>
                            </div>
                            <div>
                              <p className="text-gray-500">예상 지원금</p>
                              <p className="font-semibold text-green-600">{(match.estimatedAmount / 10000).toFixed(1)}억원</p>
                            </div>
                            <div>
                              <p className="text-gray-500">선정률</p>
                              <div className="flex items-center gap-1">
                                {getCompetitivenessIcon(match.competitiveness)}
                                <span className="font-semibold">{match.program.successRate}%</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mt-3">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              신청마감: {match.applicationDeadline}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600 mb-1">
                            {match.matchScore}점
                          </div>
                          <div className="text-xs text-gray-500">매칭점수</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 신청 가능한 지원사업 목록 */}
          {result.recommendations.eligible.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  즉시 신청 가능한 지원사업
                </CardTitle>
                <CardDescription>
                  모든 자격 요건을 충족하여 바로 신청할 수 있는 사업들입니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.recommendations.eligible.slice(0, 4).map((match) => (
                    <Card key={match.program.id} className="border-l-4 border-l-green-500">
                      <CardContent className="pt-4">
                        <h3 className="font-semibold mb-2">{match.program.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{match.program.agency}</p>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>최대 지원금:</span>
                            <span className="font-semibold">{(match.program.maxAmount / 10000).toFixed(1)}억원</span>
                          </div>
                          <div className="flex justify-between">
                            <span>예상 지원금:</span>
                            <span className="font-semibold text-green-600">{(match.estimatedAmount / 10000).toFixed(1)}억원</span>
                          </div>
                          <div className="flex justify-between">
                            <span>신청마감:</span>
                            <span>{match.applicationDeadline}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-3">
                          {match.program.tags.slice(0, 3).map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* 상세 정보 모달 (간소화된 형태) */}
      {selectedProgram && (
        <Card className="fixed inset-4 z-50 overflow-auto bg-white shadow-2xl">
          <CardHeader className="border-b">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl">{selectedProgram.program.title}</CardTitle>
                <CardDescription className="mt-1">
                  {selectedProgram.program.agency} · {selectedProgram.program.department}
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedProgram(null)}
              >
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 기본 정보 */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">지원 내용</h3>
                  <ul className="space-y-1 text-sm">
                    {selectedProgram.program.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">신청 자격</h3>
                  <ul className="space-y-1 text-sm">
                    {selectedProgram.program.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedProgram.missingRequirements.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3 text-red-600">부족한 요건</h3>
                    <ul className="space-y-1 text-sm">
                      {selectedProgram.missingRequirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* 사이드바 정보 */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">지원 규모</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>최대 지원금:</span>
                      <span className="font-semibold">{(selectedProgram.program.maxAmount / 10000).toFixed(1)}억원</span>
                    </div>
                    <div className="flex justify-between">
                      <span>지원율:</span>
                      <span className="font-semibold">{selectedProgram.program.supportRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>예상 지원금:</span>
                      <span className="font-semibold text-green-600">{(selectedProgram.estimatedAmount / 10000).toFixed(1)}억원</span>
                    </div>
                    <div className="flex justify-between">
                      <span>선정률:</span>
                      <span className="font-semibold">{selectedProgram.program.successRate}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">신청 기간</h3>
                  <div className="space-y-1 text-sm">
                    <p>시작: {selectedProgram.program.applicationPeriod.start}</p>
                    <p>마감: {selectedProgram.program.applicationPeriod.end}</p>
                    <Badge className={selectedProgram.program.applicationPeriod.isOngoing ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {selectedProgram.program.applicationPeriod.isOngoing ? '신청 중' : '마감'}
                    </Badge>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">담당 기관</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{selectedProgram.program.contactInfo.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>{selectedProgram.program.contactInfo.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <a 
                        href={selectedProgram.program.contactInfo.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        홈페이지 방문
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
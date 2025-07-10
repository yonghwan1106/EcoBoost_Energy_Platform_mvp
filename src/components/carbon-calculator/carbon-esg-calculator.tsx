'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Leaf, Award, TrendingUp, Target, AlertTriangle, CheckCircle } from 'lucide-react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

interface IndustryInfo {
  code: string;
  name: string;
  averageEmission: number;
  bestPerformance: number;
  worstPerformance: number;
  sampleSize: number;
  dataYear: number;
}

interface CarbonEmissionResult {
  totalEmission: number;
  emissionBySource: {
    electricity: number;
    naturalGas?: number;
    diesel?: number;
    gasoline?: number;
  };
  emissionPerEmployee: number;
  industryBenchmark: {
    ranking: 'excellent' | 'good' | 'average' | 'poor';
    percentile: number;
    difference: number;
  };
  reductionPotential: {
    renewable: number;
    efficiency: number;
    total: number;
  };
}

interface ESGScoreResult {
  totalScore: number;
  scores: {
    environmental: number;
    social: number;
    governance: number;
  };
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D';
  recommendations: string[];
  carbonNeutralTarget: {
    currentYear: number;
    targetYear: number;
    requiredReduction: number;
    roadmap: Array<{
      year: number;
      target: number;
      actions: string[];
    }>;
  };
}

interface CalculationResult {
  companyInfo: {
    name: string;
    industryCode: string;
    employees: number;
    location: string;
  };
  carbonEmission: CarbonEmissionResult;
  esgScore: ESGScoreResult;
  industryInfo: IndustryInfo;
  companySize: 'small' | 'medium' | 'large';
}

export default function CarbonESGCalculator() {
  const [formData, setFormData] = useState({
    companyInfo: {
      name: '',
      industryCode: 'C25',
      employees: 50,
      location: '서울특별시'
    },
    energyUsage: {
      electricity: 100000, // kWh/year
      naturalGas: 5000, // Nm³/year
      diesel: 1000, // L/year
      gasoline: 500 // L/year
    },
    renewableEnergy: {
      solar: 0,
      wind: 0,
      other: 0
    }
  });

  const [industries, setIndustries] = useState<IndustryInfo[]>([]);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [loading, setLoading] = useState(false);

  // 업종 목록 로드
  const loadIndustries = async () => {
    try {
      const response = await fetch('/api/carbon-calculator');
      const data = await response.json();
      if (data.success) {
        setIndustries(data.data.industries);
      }
    } catch (error) {
      console.error('업종 데이터 로드 실패:', error);
    }
  };

  useEffect(() => {
    loadIndustries();
  }, []);

  // 탄소 배출량 및 ESG 점수 계산
  const calculateEmission = async () => {
    if (!formData.companyInfo.name.trim()) {
      alert('기업명을 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/carbon-calculator', {
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
        alert(data.error || '계산 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('계산 오류:', error);
      alert('계산 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 탄소 배출원별 차트 데이터
  const emissionSourceData = result ? Object.entries(result.carbonEmission.emissionBySource)
    .filter(([, value]) => value !== undefined && value > 0)
    .map(([source, value]) => ({
      name: source === 'electricity' ? '전력' : 
            source === 'naturalGas' ? '천연가스' :
            source === 'diesel' ? '경유' : '휘발유',
      value: value as number,
      color: source === 'electricity' ? '#8884d8' :
             source === 'naturalGas' ? '#82ca9d' :
             source === 'diesel' ? '#ffc658' : '#ff7c7c'
    })) : [];

  // ESG 점수 레이더 차트 데이터
  const esgRadarData = result ? [
    {
      category: '환경(E)',
      score: result.esgScore.scores.environmental,
      fullMark: 40
    },
    {
      category: '사회(S)',
      score: result.esgScore.scores.social,
      fullMark: 30
    },
    {
      category: '지배구조(G)',
      score: result.esgScore.scores.governance,
      fullMark: 30
    }
  ] : [];

  // 탄소중립 로드맵 차트 데이터
  const roadmapData = result?.esgScore.carbonNeutralTarget.roadmap.map(item => ({
    year: item.year,
    target: item.target,
    current: result.carbonEmission.totalEmission
  })) || [];

  // 순위 색상 및 아이콘
  const getRankingColor = (ranking: string) => {
    switch (ranking) {
      case 'excellent': return 'text-green-600 bg-green-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'average': return 'text-yellow-600 bg-yellow-50';
      case 'poor': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRankingIcon = (ranking: string) => {
    switch (ranking) {
      case 'excellent': return <CheckCircle className="h-5 w-5" />;
      case 'good': return <TrendingUp className="h-5 w-5" />;
      case 'average': return <Target className="h-5 w-5" />;
      case 'poor': return <AlertTriangle className="h-5 w-5" />;
      default: return <Target className="h-5 w-5" />;
    }
  };

  const getESGGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-50';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-50';
    if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* 제목 섹션 */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          탄소 배출량 & ESG 평가 시스템
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          환경부 온실가스 통계 기반으로 정확한 탄소 배출량을 계산하고, 
          ESG 경영 평가 및 탄소중립 로드맵을 제공합니다.
        </p>
      </div>

      {/* 입력 폼 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-600" />
            기업 정보 및 에너지 사용량 입력
          </CardTitle>
          <CardDescription>
            정확한 분석을 위해 최근 1년간의 에너지 사용량을 입력해주세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 기업 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                기업명 *
              </label>
              <input
                type="text"
                value={formData.companyInfo.name}
                onChange={(e) => setFormData({
                  ...formData,
                  companyInfo: { ...formData.companyInfo, name: e.target.value }
                })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="예: (주)에코부스트"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                업종 선택 *
              </label>
              <select
                value={formData.companyInfo.industryCode}
                onChange={(e) => setFormData({
                  ...formData,
                  companyInfo: { ...formData.companyInfo, industryCode: e.target.value }
                })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {industries.map((industry) => (
                  <option key={industry.code} value={industry.code}>
                    {industry.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                임직원 수 *
              </label>
              <input
                type="number"
                value={formData.companyInfo.employees}
                onChange={(e) => setFormData({
                  ...formData,
                  companyInfo: { ...formData.companyInfo, employees: Number(e.target.value) }
                })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="50"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                소재지
              </label>
              <input
                type="text"
                value={formData.companyInfo.location}
                onChange={(e) => setFormData({
                  ...formData,
                  companyInfo: { ...formData.companyInfo, location: e.target.value }
                })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="서울특별시"
              />
            </div>
          </div>

          {/* 에너지 사용량 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">연간 에너지 사용량</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  전력 사용량 (kWh/년) *
                </label>
                <input
                  type="number"
                  value={formData.energyUsage.electricity}
                  onChange={(e) => setFormData({
                    ...formData,
                    energyUsage: { ...formData.energyUsage, electricity: Number(e.target.value) }
                  })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="100000"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  천연가스 (Nm³/년)
                </label>
                <input
                  type="number"
                  value={formData.energyUsage.naturalGas}
                  onChange={(e) => setFormData({
                    ...formData,
                    energyUsage: { ...formData.energyUsage, naturalGas: Number(e.target.value) }
                  })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="5000"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  경유 (L/년)
                </label>
                <input
                  type="number"
                  value={formData.energyUsage.diesel}
                  onChange={(e) => setFormData({
                    ...formData,
                    energyUsage: { ...formData.energyUsage, diesel: Number(e.target.value) }
                  })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="1000"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  휘발유 (L/년)
                </label>
                <input
                  type="number"
                  value={formData.energyUsage.gasoline}
                  onChange={(e) => setFormData({
                    ...formData,
                    energyUsage: { ...formData.energyUsage, gasoline: Number(e.target.value) }
                  })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="500"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* 신재생에너지 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">신재생에너지 발전량 (선택사항)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  태양광 (kWh/년)
                </label>
                <input
                  type="number"
                  value={formData.renewableEnergy.solar}
                  onChange={(e) => setFormData({
                    ...formData,
                    renewableEnergy: { ...formData.renewableEnergy, solar: Number(e.target.value) }
                  })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  풍력 (kWh/년)
                </label>
                <input
                  type="number"
                  value={formData.renewableEnergy.wind}
                  onChange={(e) => setFormData({
                    ...formData,
                    renewableEnergy: { ...formData.renewableEnergy, wind: Number(e.target.value) }
                  })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  기타 (kWh/년)
                </label>
                <input
                  type="number"
                  value={formData.renewableEnergy.other}
                  onChange={(e) => setFormData({
                    ...formData,
                    renewableEnergy: { ...formData.renewableEnergy, other: Number(e.target.value) }
                  })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>
          </div>

          <Button
            onClick={calculateEmission}
            disabled={loading || !formData.companyInfo.name.trim()}
            className="w-full"
            size="lg"
          >
            {loading ? '계산 중...' : '탄소 배출량 & ESG 점수 계산하기'}
          </Button>
        </CardContent>
      </Card>

      {/* 계산 결과 */}
      {result && (
        <div className="space-y-6">
          {/* 주요 지표 요약 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">연간 탄소 배출량</p>
                    <p className="text-2xl font-bold text-red-600">
                      {result.carbonEmission.totalEmission} tCO₂
                    </p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">1인당 배출량</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {result.carbonEmission.emissionPerEmployee} tCO₂
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">ESG 점수</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {result.esgScore.totalScore}점
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
                    <p className="text-sm font-medium text-gray-600">ESG 등급</p>
                    <p className={`text-2xl font-bold ${getESGGradeColor(result.esgScore.grade).split(' ')[0]}`}>
                      {result.esgScore.grade}
                    </p>
                  </div>
                  <CheckCircle className={`h-8 w-8 ${getESGGradeColor(result.esgScore.grade).split(' ')[0]}`} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 업종 벤치마킹 */}
          <Card>
            <CardHeader>
              <CardTitle>업종별 벤치마킹 분석</CardTitle>
              <CardDescription>
                {result.industryInfo.name} 업종 내 탄소 배출량 순위를 확인하세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg border-l-4 ${getRankingColor(result.carbonEmission.industryBenchmark.ranking)}`}>
                    <div className="flex items-center gap-3">
                      {getRankingIcon(result.carbonEmission.industryBenchmark.ranking)}
                      <div>
                        <h3 className="font-semibold text-lg">
                          {result.carbonEmission.industryBenchmark.ranking === 'excellent' ? '우수' :
                           result.carbonEmission.industryBenchmark.ranking === 'good' ? '양호' :
                           result.carbonEmission.industryBenchmark.ranking === 'average' ? '보통' : '개선필요'}
                        </h3>
                        <p className="text-sm">
                          상위 {result.carbonEmission.industryBenchmark.percentile}% 수준
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="font-medium text-green-600">우수 기업</p>
                      <p className="text-lg font-bold">{result.industryInfo.bestPerformance}</p>
                      <p className="text-xs">tCO₂/인</p>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <p className="font-medium text-yellow-600">업종 평균</p>
                      <p className="text-lg font-bold">{result.industryInfo.averageEmission}</p>
                      <p className="text-xs">tCO₂/인</p>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <p className="font-medium text-red-600">개선필요</p>
                      <p className="text-lg font-bold">{result.industryInfo.worstPerformance}</p>
                      <p className="text-xs">tCO₂/인</p>
                    </div>
                  </div>
                </div>

                {/* 배출원별 분석 */}
                <div className="h-80">
                  <h3 className="font-semibold mb-4">배출원별 구성</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={emissionSourceData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                      >
                        {emissionSourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value} tCO₂`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ESG 점수 분석 */}
          <Card>
            <CardHeader>
              <CardTitle>ESG 점수 상세 분석</CardTitle>
              <CardDescription>
                환경(E), 사회(S), 지배구조(G) 영역별 평가 결과입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* ESG 레이더 차트 */}
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={esgRadarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="category" />
                      <PolarRadiusAxis angle={90} domain={[0, 40]} />
                      <Radar
                        name="점수"
                        dataKey="score"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.3}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* 개선 권고사항 */}
                <div className="space-y-4">
                  <h3 className="font-semibold">개선 권고사항</h3>
                  <div className="space-y-2">
                    {result.esgScore.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{recommendation}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="font-medium text-green-600">환경(E)</p>
                      <p className="text-2xl font-bold">{result.esgScore.scores.environmental}</p>
                      <p className="text-xs">/40점</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium text-blue-600">사회(S)</p>
                      <p className="text-2xl font-bold">{result.esgScore.scores.social}</p>
                      <p className="text-xs">/30점</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <p className="font-medium text-purple-600">지배구조(G)</p>
                      <p className="text-2xl font-bold">{result.esgScore.scores.governance}</p>
                      <p className="text-xs">/30점</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 탄소중립 로드맵 */}
          <Card>
            <CardHeader>
              <CardTitle>탄소중립 달성 로드맵</CardTitle>
              <CardDescription>
                2050년 탄소중립 목표 달성을 위한 단계별 감축 계획입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* 로드맵 차트 */}
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={roadmapData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => `${value} tCO₂`} />
                      <Tooltip formatter={(value, name) => [
                        `${value} tCO₂`,
                        name === 'current' ? '현재 배출량' : '목표 배출량'
                      ]} />
                      <Line 
                        type="monotone" 
                        dataKey="current" 
                        stroke="#ff7c7c" 
                        strokeDasharray="5 5"
                        name="current"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="target" 
                        stroke="#82ca9d" 
                        strokeWidth={3}
                        name="target"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* 로드맵 세부 계획 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {result.esgScore.carbonNeutralTarget.roadmap.map((milestone, index) => (
                    <Card key={index} className="border-l-4 border-l-green-500">
                      <CardContent className="pt-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{milestone.year}년</h3>
                            <Badge variant="secondary">
                              {milestone.target} tCO₂
                            </Badge>
                          </div>
                          <div className="space-y-1">
                            {milestone.actions.map((action, actionIndex) => (
                              <p key={actionIndex} className="text-sm text-gray-600">
                                • {action}
                              </p>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* 감축 잠재량 */}
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-4">감축 잠재량 분석</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        {result.carbonEmission.reductionPotential.renewable} tCO₂
                      </p>
                      <p className="text-sm text-green-700">신재생에너지 도입</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        {result.carbonEmission.reductionPotential.efficiency} tCO₂
                      </p>
                      <p className="text-sm text-green-700">에너지 효율성 개선</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        {result.carbonEmission.reductionPotential.total} tCO₂
                      </p>
                      <p className="text-sm text-green-700">총 감축 가능량</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
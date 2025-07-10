'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sun, Wind, TrendingUp, Calendar, DollarSign, Leaf, 
  MapPin, BarChart3, Target, Lightbulb
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Area, AreaChart
} from 'recharts';

interface RenewableForecastInput {
  regionCode: string;
  capacity: number;
  energyType: 'solar' | 'wind';
}

interface MonthlyProduction {
  month: number;
  estimatedOutput: number;
  capacityFactor: number;
  weatherImpact: string;
}

interface ForecastResult {
  forecast: {
    regionCode: string;
    capacity: number;
    energyType: 'solar' | 'wind';
    monthlyProduction: MonthlyProduction[];
    annualProduction: {
      totalOutput: number;
      averageCapacityFactor: number;
      co2Reduction: number;
      costSavings: number;
    };
    investmentAnalysis: {
      initialCost: number;
      maintenanceCost: number;
      roi: number;
      paybackPeriod: number;
      irr: number;
      npv: number;
    };
  };
  potential: {
    region: string;
    coordinates: { latitude: number; longitude: number };
    solarPotential: {
      rating: string;
      score: number;
      estimatedCapacityFactor: number;
      optimalTiltAngle: number;
    };
    windPotential: {
      rating: string;
      score: number;
      estimatedCapacityFactor: number;
      turbineRecommendation: string;
    };
    recommendations: {
      solar: {
        recommended: boolean;
        reason: string;
        optimalCapacity: string;
        expectedROI: string;
      };
      wind: {
        recommended: boolean;
        reason: string;
        optimalCapacity: string;
        expectedROI: string;
      };
    };
    weatherConsiderations: string[];
  };
  analysis: {
    feasibility: 'high' | 'medium' | 'low';
    recommendation: string;
    keyInsights: string[];
  };
}

// 지역 옵션
const regionOptions = [
  { code: 'SEOUL', name: '서울특별시' },
  { code: 'BUSAN', name: '부산광역시' },
  { code: 'JEJU', name: '제주특별자치도' }
];

const monthNames = [
  '1월', '2월', '3월', '4월', '5월', '6월',
  '7월', '8월', '9월', '10월', '11월', '12월'
];

export default function RenewableEnergyForecast() {
  const [formData, setFormData] = useState<RenewableForecastInput>({
    regionCode: 'SEOUL',
    capacity: 100,
    energyType: 'solar'
  });

  const [result, setResult] = useState<ForecastResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleForecast = async () => {
    if (formData.capacity <= 0) {
      alert('설치 용량을 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/renewable-forecast', {
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
        alert(data.error || '예측 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('예측 오류:', error);
      alert('예측 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 잠재력 등급 색상
  const getPotentialColor = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'text-green-600 bg-green-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'average': return 'text-yellow-600 bg-yellow-50';
      case 'poor': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // 타당성 아이콘
  const getFeasibilityIcon = (level: string) => {
    switch (level) {
      case 'high': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'medium': return <Target className="h-4 w-4 text-yellow-600" />;
      case 'low': return <BarChart3 className="h-4 w-4 text-red-600" />;
      default: return <BarChart3 className="h-4 w-4 text-gray-600" />;
    }
  };

  // 월별 발전량 차트 데이터
  const monthlyChartData = result ? result.forecast.monthlyProduction.map((month, index) => ({
    month: monthNames[index],
    output: Math.round(month.estimatedOutput / 1000), // MWh로 변환
    capacityFactor: month.capacityFactor,
    weatherImpact: month.weatherImpact
  })) : [];

  // 투자 분석 차트 데이터 (20년 누적)
  const investmentChartData = result ? Array.from({ length: 20 }, (_, year) => {
    const annualCashFlow = result.forecast.annualProduction.costSavings - result.forecast.investmentAnalysis.maintenanceCost;
    const cumulativeCashFlow = (year + 1) * annualCashFlow - result.forecast.investmentAnalysis.initialCost;
    return {
      year: year + 1,
      투자회수: Math.round(cumulativeCashFlow / 1000000), // 백만원 단위
      연간수익: Math.round(annualCashFlow / 1000000)
    };
  }).slice(0, 15) : []; // 15년까지만 표시

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* 제목 섹션 */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          기상 데이터 기반 신재생에너지 예측
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          기상청 관측 데이터를 활용하여 태양광 및 풍력 발전량을 정확히 예측하고 
          투자 타당성을 분석합니다.
        </p>
      </div>

      {/* 예측 설정 폼 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-blue-600" />
            신재생에너지 예측 설정
          </CardTitle>
          <CardDescription>
            지역, 설치 용량, 에너지 종류를 선택하여 발전량을 예측하세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                설치 지역 *
              </label>
              <select
                value={formData.regionCode}
                onChange={(e) => setFormData({ ...formData, regionCode: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {regionOptions.map((region) => (
                  <option key={region.code} value={region.code}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                설치 용량 (kW) *
              </label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="100"
                min="1"
                max="10000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                에너지 종류 *
              </label>
              <select
                value={formData.energyType}
                onChange={(e) => setFormData({ ...formData, energyType: e.target.value as 'solar' | 'wind' })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="solar">태양광</option>
                <option value="wind">풍력</option>
              </select>
            </div>
          </div>

          <Button
            onClick={handleForecast}
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? '예측 중...' : '발전량 예측 분석'}
          </Button>
        </CardContent>
      </Card>

      {/* 예측 결과 */}
      {result && (
        <div className="space-y-6">
          {/* 요약 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">연간 발전량</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {(result.forecast.annualProduction.totalOutput / 1000).toFixed(1)}MWh
                    </p>
                  </div>
                  {formData.energyType === 'solar' ? 
                    <Sun className="h-8 w-8 text-blue-600" /> : 
                    <Wind className="h-8 w-8 text-blue-600" />
                  }
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">투자 회수기간</p>
                    <p className="text-2xl font-bold text-green-600">
                      {result.forecast.investmentAnalysis.paybackPeriod}년
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">연간 절약액</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {(result.forecast.annualProduction.costSavings / 10000).toFixed(0)}만원
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">탄소 감축량</p>
                    <p className="text-2xl font-bold text-emerald-600">
                      {result.forecast.annualProduction.co2Reduction}tCO2
                    </p>
                  </div>
                  <Leaf className="h-8 w-8 text-emerald-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 지역 잠재력 평가 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-600" />
                {result.potential.region} 지역 잠재력 평가
              </CardTitle>
              <CardDescription>
                기상 조건을 종합한 신재생에너지 설치 적합성 평가입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 태양광 잠재력 */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Sun className="h-5 w-5 text-yellow-600" />
                    태양광 발전 잠재력
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">잠재력 등급</span>
                      <Badge className={getPotentialColor(result.potential.solarPotential.rating)}>
                        {result.potential.solarPotential.rating === 'excellent' ? '최우수' :
                         result.potential.solarPotential.rating === 'good' ? '우수' :
                         result.potential.solarPotential.rating === 'average' ? '보통' : '미흡'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">잠재력 점수</span>
                      <span className="font-semibold">{result.potential.solarPotential.score}점</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">설치 권장</span>
                      <span className={`font-semibold ${result.potential.recommendations.solar.recommended ? 'text-green-600' : 'text-yellow-600'}`}>
                        {result.potential.recommendations.solar.recommended ? '권장' : '검토 필요'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {result.potential.recommendations.solar.reason}
                    </div>
                  </div>
                </div>

                {/* 풍력 잠재력 */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Wind className="h-5 w-5 text-cyan-600" />
                    풍력 발전 잠재력
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">잠재력 등급</span>
                      <Badge className={getPotentialColor(result.potential.windPotential.rating)}>
                        {result.potential.windPotential.rating === 'excellent' ? '최우수' :
                         result.potential.windPotential.rating === 'good' ? '우수' :
                         result.potential.windPotential.rating === 'average' ? '보통' : '미흡'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">잠재력 점수</span>
                      <span className="font-semibold">{result.potential.windPotential.score}점</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">설치 권장</span>
                      <span className={`font-semibold ${result.potential.recommendations.wind.recommended ? 'text-green-600' : 'text-yellow-600'}`}>
                        {result.potential.recommendations.wind.recommended ? '권장' : '검토 필요'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {result.potential.recommendations.wind.reason}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 월별 발전량 예측 */}
          <Card>
            <CardHeader>
              <CardTitle>월별 발전량 예측</CardTitle>
              <CardDescription>
                기상 조건을 반영한 월별 예상 발전량과 설비 이용률입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'output' ? `${value}MWh` : `${value}%`,
                        name === 'output' ? '발전량' : '설비이용률'
                      ]}
                      labelFormatter={(label) => `${label}`}
                    />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="output"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.3}
                      name="output"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="capacityFactor"
                      stroke="#10b981"
                      strokeWidth={2}
                      name="capacityFactor"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* 투자 회수 분석 */}
          <Card>
            <CardHeader>
              <CardTitle>투자 회수 분석</CardTitle>
              <CardDescription>
                초기 투자비 대비 연간 수익 및 누적 투자 회수 현황입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 투자 분석 차트 */}
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={investmentChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip formatter={(value) => `${value}백만원`} />
                      <Line
                        type="monotone"
                        dataKey="투자회수"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        name="누적 투자회수"
                      />
                      <Line
                        type="monotone"
                        dataKey="연간수익"
                        stroke="#10b981"
                        strokeWidth={2}
                        name="연간 수익"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* 투자 지표 */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg mb-4">투자 지표</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-600">초기 투자비</p>
                      <p className="text-xl font-bold text-blue-800">
                        {(result.forecast.investmentAnalysis.initialCost / 100000000).toFixed(1)}억원
                      </p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-600">ROI</p>
                      <p className="text-xl font-bold text-green-800">
                        {result.forecast.investmentAnalysis.roi}%
                      </p>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm text-purple-600">IRR</p>
                      <p className="text-xl font-bold text-purple-800">
                        {result.forecast.investmentAnalysis.irr}%
                      </p>
                    </div>
                    
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-sm text-yellow-600">NPV</p>
                      <p className="text-xl font-bold text-yellow-800">
                        {(result.forecast.investmentAnalysis.npv / 100000000).toFixed(1)}억원
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      {getFeasibilityIcon(result.analysis.feasibility)}
                      <span className="font-semibold">
                        투자 타당성: {result.analysis.feasibility === 'high' ? '높음' : 
                                    result.analysis.feasibility === 'medium' ? '보통' : '낮음'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{result.analysis.recommendation}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 핵심 분석 결과 */}
          <Card>
            <CardHeader>
              <CardTitle>핵심 분석 결과</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">주요 인사이트</h3>
                  <ul className="space-y-2">
                    {result.analysis.keyInsights.map((insight, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">기상 조건 고려사항</h3>
                  <ul className="space-y-2">
                    {result.potential.weatherConsiderations.map((consideration, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                        {consideration}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Zap, TrendingDown, DollarSign, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ElectricityRate {
  id: string;
  name: string;
  type: 'residential' | 'general' | 'industrial';
  description: string;
}

interface ElectricityCostResult {
  basicFee: number;
  energyFee: number;
  demandFee: number;
  totalBeforeTax: number;
  vat: number;
  fundFee: number;
  totalAfterTax: number;
  averageUnitCost: number;
}

interface SavingScenario {
  name: string;
  description: string;
  savingPercentage: number;
}

interface CalculationResult {
  rateInfo: ElectricityRate;
  currentCost: ElectricityCostResult;
  savingScenarios: Array<{
    scenario: SavingScenario;
    newCost: ElectricityCostResult;
    monthlySaving: number;
    yearlySaving: number;
  }>;
}

export default function EnergyCostCalculator() {
  const [formData, setFormData] = useState({
    rateId: 'general_low_voltage',
    monthlyUsage: 1000,
    contractedPower: 10,
    month: new Date().getMonth() + 1
  });

  const [rates, setRates] = useState<ElectricityRate[]>([]);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [loading, setLoading] = useState(false);

  // 전기요금표 목록 로드
  const loadRates = async () => {
    try {
      const response = await fetch('/api/cost-calculator');
      const data = await response.json();
      if (data.success) {
        setRates(data.data.rates);
      }
    } catch (error) {
      console.error('요금표 로드 실패:', error);
    }
  };

  // 컴포넌트 마운트 시 요금표 로드
  useEffect(() => {
    loadRates();
  }, []);

  // 전기요금 계산
  const calculateCost = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/cost-calculator', {
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

  // 비용 분석 차트 데이터
  const costBreakdownData = result ? [
    { name: '기본요금', value: result.currentCost.basicFee, color: '#8884d8' },
    { name: '전력량요금', value: result.currentCost.energyFee, color: '#82ca9d' },
    { name: '수요전력요금', value: result.currentCost.demandFee, color: '#ffc658' },
    { name: '부가가치세', value: result.currentCost.vat, color: '#ff7c7c' },
    { name: '전력기금', value: result.currentCost.fundFee, color: '#8dd1e1' }
  ].filter(item => item.value > 0) : [];

  // 절약 시나리오 차트 데이터
  const savingChartData = result?.savingScenarios.map(item => ({
    name: item.scenario.name,
    current: result.currentCost.totalAfterTax,
    afterSaving: item.newCost.totalAfterTax,
    saving: item.monthlySaving,
    percentage: item.scenario.savingPercentage
  })) || [];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* 네비게이션 섹션 */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          메인으로 돌아가기
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/esg-calculator" className="text-sm text-gray-600 hover:text-green-600 transition-colors">
            ESG 평가
          </Link>
          <Link href="/support-programs" className="text-sm text-gray-600 hover:text-green-600 transition-colors">
            지원사업
          </Link>
          <Link href="/renewable-forecast" className="text-sm text-gray-600 hover:text-green-600 transition-colors">
            발전량 예측
          </Link>
        </div>
      </div>

      {/* 제목 섹션 */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          실시간 에너지 비용 계산기
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          한국전력공사 공식 요금표 기반으로 정확한 전기요금을 계산하고, 
          절약 시나리오별 절감 효과를 확인하세요.
        </p>
      </div>

      {/* 입력 폼 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-blue-600" />
            전기요금 계산 정보 입력
          </CardTitle>
          <CardDescription>
            정확한 계산을 위해 최근 전기요금 고지서를 참조하여 입력하세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 요금제 선택 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                요금제 선택
              </label>
              <select
                value={formData.rateId}
                onChange={(e) => setFormData({ ...formData, rateId: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">요금제를 선택하세요</option>
                {rates.map((rate) => (
                  <option key={rate.id} value={rate.id}>
                    {rate.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 월 사용량 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                월 사용량 (kWh)
              </label>
              <input
                type="number"
                value={formData.monthlyUsage}
                onChange={(e) => setFormData({ ...formData, monthlyUsage: Number(e.target.value) })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1000"
                min="0"
              />
            </div>

            {/* 계약전력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                계약전력 (kW)
              </label>
              <input
                type="number"
                value={formData.contractedPower}
                onChange={(e) => setFormData({ ...formData, contractedPower: Number(e.target.value) })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="10"
                min="0"
              />
            </div>

            {/* 계산 월 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                계산 월
              </label>
              <select
                value={formData.month}
                onChange={(e) => setFormData({ ...formData, month: Number(e.target.value) })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}월
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button
            onClick={calculateCost}
            disabled={loading || !formData.rateId}
            className="w-full"
            size="lg"
          >
            {loading ? '계산 중...' : '전기요금 계산하기'}
          </Button>
        </CardContent>
      </Card>

      {/* 계산 결과 */}
      {result && (
        <div className="space-y-6">
          {/* 현재 전기요금 요약 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">월 전기요금</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ₩{result.currentCost.totalAfterTax.toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">평균 단가</p>
                    <p className="text-2xl font-bold text-green-600">
                      ₩{result.currentCost.averageUnitCost}/kWh
                    </p>
                  </div>
                  <Zap className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">연간 예상요금</p>
                    <p className="text-2xl font-bold text-purple-600">
                      ₩{(result.currentCost.totalAfterTax * 12).toLocaleString()}
                    </p>
                  </div>
                  <TrendingDown className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 요금 구성 분석 */}
          <Card>
            <CardHeader>
              <CardTitle>전기요금 구성 분석</CardTitle>
              <CardDescription>
                현재 전기요금의 상세 구성을 확인하세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 파이 차트 */}
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={costBreakdownData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                      >
                        {costBreakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `₩${Number(value).toLocaleString()}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* 상세 내역 */}
                <div className="space-y-3">
                  {costBreakdownData.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <span className="font-bold">₩{item.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 절약 시나리오 */}
          <Card>
            <CardHeader>
              <CardTitle>에너지 절약 시나리오 분석</CardTitle>
              <CardDescription>
                다양한 절약 방안을 통한 비용 절감 효과를 확인하세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* 절약 효과 차트 */}
              <div className="h-80 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={savingChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `₩${(value / 1000).toFixed(0)}K`} />
                    <Tooltip 
                      formatter={(value, name) => [
                        `₩${Number(value).toLocaleString()}`,
                        name === 'current' ? '현재 요금' : name === 'afterSaving' ? '절약 후 요금' : '월 절약액'
                      ]}
                    />
                    <Bar dataKey="current" fill="#8884d8" name="current" />
                    <Bar dataKey="afterSaving" fill="#82ca9d" name="afterSaving" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* 절약 시나리오 카드 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {result.savingScenarios.map((item, index) => (
                  <Card key={index} className="border-l-4 border-l-green-500">
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{item.scenario.name}</h3>
                          <Badge variant="secondary">
                            -{item.scenario.savingPercentage}%
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {item.scenario.description}
                        </p>
                        <div className="pt-2 space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>월 절약액:</span>
                            <span className="font-semibold text-green-600">
                              ₩{item.monthlySaving.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>연간 절약액:</span>
                            <span className="font-semibold text-green-600">
                              ₩{item.yearlySaving.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
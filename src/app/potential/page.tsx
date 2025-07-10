"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Sun, Wind, Calculator, TrendingUp, DollarSign } from "lucide-react";

export default function PotentialPage() {
  const [formData, setFormData] = useState({
    region: "",
    installationType: "",
    capacity: "",
  });

  const [potentialResult, setPotentialResult] = useState<{
    solarPotential?: number;
    windPotential?: number;
    estimatedGeneration?: number;
    investmentCost?: number;
    roi?: number;
    governmentIncentives?: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/potential', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      setPotentialResult(result.data);
    } catch (error) {
      console.error('잠재력 분석 요청 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b'];

  const pieData = potentialResult ? [
    { name: '태양광', value: potentialResult.solarPotential },
    { name: '풍력', value: potentialResult.windPotential },
  ].filter(item => (item.value || 0) > 0) : [];

  const investmentData = potentialResult ? [
    {
      name: '초기 투자비용',
      amount: potentialResult.investmentCost || 0,
      color: '#ef4444'
    },
    {
      name: '정부 지원금',
      amount: potentialResult.governmentIncentives || 0,
      color: '#10b981'
    },
    {
      name: '실제 부담금',
      amount: (potentialResult.investmentCost || 0) - (potentialResult.governmentIncentives || 0),
      color: '#f59e0b'
    }
  ] : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            신재생에너지 잠재력 분석
          </h1>
          <p className="text-lg text-gray-600">
            지역별 신재생에너지 설치 잠재력과 투자 수익성을 분석해보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                신재생에너지 설치 계획
              </CardTitle>
              <CardDescription>
                설치하려는 신재생에너지 종류와 용량을 입력해주세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    설치 지역
                  </label>
                  <select
                    value={formData.region}
                    onChange={(e) => setFormData({...formData, region: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">지역을 선택해주세요</option>
                    <option value="서울특별시">서울특별시</option>
                    <option value="경기도">경기도</option>
                    <option value="부산광역시">부산광역시</option>
                    <option value="대구광역시">대구광역시</option>
                    <option value="인천광역시">인천광역시</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    설치 유형
                  </label>
                  <select
                    value={formData.installationType}
                    onChange={(e) => setFormData({...formData, installationType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">설치 유형을 선택해주세요</option>
                    <option value="solar">태양광 발전</option>
                    <option value="wind">풍력 발전</option>
                    <option value="both">태양광 + 풍력</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    설치 용량 (kW)
                  </label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="예: 100"
                    min="1"
                    max="1000"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    일반적으로 주택용: 3-10kW, 상업용: 50-500kW
                  </p>
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "분석 중..." : "잠재력 분석하기"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Analysis Result */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                잠재력 분석 결과
              </CardTitle>
              <CardDescription>
                설치 잠재력 및 경제성 분석
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!potentialResult ? (
                <div className="text-center py-8">
                  <div className="flex justify-center gap-4 mb-4">
                    <Sun className="h-12 w-12 text-yellow-400" />
                    <Wind className="h-12 w-12 text-blue-400" />
                  </div>
                  <p className="text-gray-600">
                    설치 계획을 입력하여 잠재력 분석을 시작하세요.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-sm text-green-600 font-medium">연간 발전량</div>
                      <div className="text-2xl font-bold text-green-700">
                        {potentialResult.estimatedGeneration?.toLocaleString()} kWh
                      </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-sm text-blue-600 font-medium">투자 회수 기간</div>
                      <div className="text-2xl font-bold text-blue-700">
                        {potentialResult.roi} 년
                      </div>
                    </div>
                  </div>

                  {/* Pie Chart - 설치 용량 분포 */}
                  {pieData.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">설치 용량 분포</h3>
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              outerRadius={60}
                              fill="#8884d8"
                              dataKey="value"
                              label={({name, value}) => `${name}: ${value}kW`}
                            >
                              {pieData.map((entry: Record<string, unknown>, index: number) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}

                  {/* Investment Chart */}
                  <div>
                    <h3 className="font-semibold mb-3">투자 비용 분석</h3>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={investmentData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={(value) => `₩${(value/1000000).toFixed(1)}M`} />
                          <Tooltip formatter={(value) => [`₩${value.toLocaleString()}`, '금액']} />
                          <Bar dataKey="amount" fill="#10b981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Financial Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      경제성 요약
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>총 투자비용:</span>
                        <span className="font-medium">₩{potentialResult.investmentCost?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>정부 지원금:</span>
                        <span className="font-medium text-green-600">-₩{potentialResult.governmentIncentives?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-semibold">실제 부담금:</span>
                        <span className="font-bold">₩{((potentialResult.investmentCost || 0) - (potentialResult.governmentIncentives || 0)).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>연간 절약액:</span>
                        <span className="font-medium text-blue-600">₩{((potentialResult.estimatedGeneration || 0) * 150).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Additional Info Section */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>신재생에너지 지원 제도 안내</CardTitle>
              <CardDescription>
                정부 및 지자체에서 제공하는 다양한 지원 제도를 활용하세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Sun className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">태양광 발전</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 한국에너지공단 보조금</li>
                    <li>• 지자체 추가 지원</li>
                    <li>• 20년 고정가격 계약</li>
                  </ul>
                </div>
                <div className="text-center">
                  <Wind className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">풍력 발전</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 대용량 설치 지원</li>
                    <li>• 입지 조사 지원</li>
                    <li>• 계통연계 지원</li>
                  </ul>
                </div>
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">경제적 혜택</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 전력요금 절약</li>
                    <li>• REC 판매 수익</li>
                    <li>• 세제 혜택</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
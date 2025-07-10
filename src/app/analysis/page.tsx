"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Calculator, TrendingUp, AlertCircle } from "lucide-react";

export default function AnalysisPage() {
  const [formData, setFormData] = useState({
    region: "",
    industry: "",
    companySize: "",
    electricityUsage: "",
    gasUsage: "",
  });

  const [analysisResult, setAnalysisResult] = useState<{
    currentUsage?: Record<string, unknown>;
    benchmark?: Record<string, unknown>;
    savingPotential?: number;
    co2ReductionPotential?: number;
    recommendations?: string[];
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/energy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      setAnalysisResult(result);
    } catch (error) {
      console.error('분석 요청 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    {
      name: '현재 사용량',
      electricity: parseInt(formData.electricityUsage) || 0,
      gas: parseInt(formData.gasUsage) || 0,
    },
    {
      name: '업종 평균',
      electricity: analysisResult?.benchmark?.avgElectricityUsage || 0,
      gas: analysisResult?.benchmark?.avgGasUsage || 0,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            에너지 사용량 분석
          </h1>
          <p className="text-lg text-gray-600">
            현재 에너지 사용량을 입력하여 업종별 벤치마킹 분석을 받아보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                에너지 사용량 입력
              </CardTitle>
              <CardDescription>
                정확한 분석을 위해 최근 3개월 평균 사용량을 입력해주세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    지역 선택
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
                    업종 선택
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({...formData, industry: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">업종을 선택해주세요</option>
                    <option value="제조업">제조업</option>
                    <option value="서비스업">서비스업</option>
                    <option value="도소매업">도소매업</option>
                    <option value="건설업">건설업</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    기업 규모
                  </label>
                  <select
                    value={formData.companySize}
                    onChange={(e) => setFormData({...formData, companySize: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">기업 규모를 선택해주세요</option>
                    <option value="small">소기업 (50명 미만)</option>
                    <option value="medium">중기업 (50-300명)</option>
                    <option value="large">대기업 (300명 이상)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    월 전력 사용량 (kWh)
                  </label>
                  <input
                    type="number"
                    value={formData.electricityUsage}
                    onChange={(e) => setFormData({...formData, electricityUsage: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="예: 2000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    월 가스 사용량 (m³)
                  </label>
                  <input
                    type="number"
                    value={formData.gasUsage}
                    onChange={(e) => setFormData({...formData, gasUsage: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="예: 400"
                    required
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "분석 중..." : "에너지 사용량 분석하기"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Analysis Result */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                분석 결과
              </CardTitle>
              <CardDescription>
                업종별 벤치마킹 기반 에너지 효율성 분석
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!analysisResult ? (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    에너지 사용량을 입력하여 분석을 시작하세요.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Chart */}
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="electricity" fill="#10b981" name="전력 (kWh)" />
                        <Bar dataKey="gas" fill="#3b82f6" name="가스 (m³)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-sm text-green-600 font-medium">절약 가능 비용</div>
                      <div className="text-2xl font-bold text-green-700">
                        ₩{analysisResult.savingPotential?.toLocaleString() || 0}
                      </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-sm text-blue-600 font-medium">CO₂ 절감량</div>
                      <div className="text-2xl font-bold text-blue-700">
                        {analysisResult.co2ReductionPotential?.toFixed(1) || 0} kg
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h3 className="font-semibold mb-3">개선 권장사항</h3>
                    <ul className="space-y-2">
                      {analysisResult.recommendations?.map((rec: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-700">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
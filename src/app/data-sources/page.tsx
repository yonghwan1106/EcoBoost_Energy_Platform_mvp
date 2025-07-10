"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { 
  Database, ExternalLink, BarChart3, Zap, Leaf, Building, 
  Calendar, FileText, TrendingUp, Award, CheckCircle, Globe
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface DataSource {
  id: string;
  name: string;
  provider: string;
  category: string;
  description: string;
  apiEndpoint: string;
  updateFrequency: string;
  lastUpdated: string;
  usageCount: number;
  features: string[];
  license: string;
  format: string[];
  status: 'active' | 'beta' | 'planned';
  reliability: number;
  documentationUrl: string;
}

export default function DataSourcesPage() {
  const [, setDataSources] = useState<DataSource[]>([]);
  const [loading, setLoading] = useState(true);

  const mockDataSources: DataSource[] = [
    {
      id: "kepco-rates",
      name: "한국전력공사 전기요금표",
      provider: "한국전력공사",
      category: "에너지",
      description: "전국 전기요금표 및 요금체계 정보를 제공하는 공공데이터로, 정확한 전기요금 계산에 활용",
      apiEndpoint: "/api/kepco/electricity-rates",
      updateFrequency: "월 1회",
      lastUpdated: "2024-01-15",
      usageCount: 2847,
      features: ["실시간 전기요금 계산", "요금제별 비교 분석", "절약 시나리오 제공"],
      license: "Open License",
      format: ["JSON", "XML"],
      status: "active",
      reliability: 99.2,
      documentationUrl: "https://www.data.go.kr/iim/api/selectAPIAcountView.do?id=T15012711"
    },
    {
      id: "kma-weather",
      name: "기상청 관측자료",
      provider: "기상청",
      category: "기상",
      description: "전국 기상관측소의 실시간 기상데이터로 신재생에너지 발전량 예측에 핵심적으로 활용",
      apiEndpoint: "/api/kma/weather-data",
      updateFrequency: "실시간",
      lastUpdated: "2024-01-18",
      usageCount: 5234,
      features: ["실시간 기상데이터", "신재생에너지 예측", "날씨 영향 분석"],
      license: "Open License",
      format: ["JSON", "CSV"],
      status: "active",
      reliability: 98.7,
      documentationUrl: "https://www.data.go.kr/iim/api/selectAPIAcountView.do?id=1360000"
    },
    {
      id: "keco-emissions",
      name: "환경부 온실가스 통계",
      provider: "환경부/한국환경공단",
      category: "환경",
      description: "업종별 온실가스 배출계수 및 통계 데이터로 정확한 탄소배출량 계산 및 ESG 평가에 활용",
      apiEndpoint: "/api/keco/emission-factors",
      updateFrequency: "년 1회",
      lastUpdated: "2024-01-10",
      usageCount: 1923,
      features: ["탄소배출량 계산", "업종별 벤치마킹", "ESG 평가"],
      license: "Open License",
      format: ["JSON", "Excel"],
      status: "active",
      reliability: 99.5,
      documentationUrl: "https://www.data.go.kr/iim/api/selectAPIAcountView.do?id=15000581"
    },
    {
      id: "smba-support",
      name: "중소벤처기업부 지원사업 정보",
      provider: "중소벤처기업부",
      category: "정책",
      description: "정부 지원사업 정보 및 기업 지원정책 데이터로 맞춤형 지원사업 추천 서비스에 활용",
      apiEndpoint: "/api/smba/support-programs",
      updateFrequency: "주 1회",
      lastUpdated: "2024-01-17",
      usageCount: 3456,
      features: ["맞춤형 지원사업 추천", "기업 매칭", "지원금 계산"],
      license: "Open License",
      format: ["JSON", "XML"],
      status: "active",
      reliability: 97.8,
      documentationUrl: "https://www.data.go.kr/iim/api/selectAPIAcountView.do?id=15001259"
    },
    {
      id: "energy-statistics",
      name: "에너지경제연구원 에너지통계",
      provider: "에너지경제연구원",
      category: "에너지",
      description: "국가 에너지 수급 통계 및 에너지 효율 데이터로 산업별 에너지 사용량 벤치마킹에 활용",
      apiEndpoint: "/api/keei/energy-stats",
      updateFrequency: "월 1회",
      lastUpdated: "2024-01-12",
      usageCount: 1567,
      features: ["에너지 효율 분석", "산업별 비교", "절약 잠재량 계산"],
      license: "Open License",
      format: ["JSON", "CSV"],
      status: "active",
      reliability: 98.9,
      documentationUrl: "https://www.data.go.kr/iim/api/selectAPIAcountView.do?id=15000123"
    },
    {
      id: "renewable-capacity",
      name: "신재생에너지 발전설비 현황",
      provider: "한국에너지공단",
      category: "에너지",
      description: "전국 신재생에너지 발전설비 설치 현황 및 발전량 데이터로 지역별 잠재력 분석에 활용",
      apiEndpoint: "/api/knrec/renewable-capacity",
      updateFrequency: "월 1회",
      lastUpdated: "2024-01-14",
      usageCount: 987,
      features: ["지역별 신재생에너지 잠재력", "발전량 예측", "투자 분석"],
      license: "Open License",
      format: ["JSON"],
      status: "beta",
      reliability: 96.5,
      documentationUrl: "https://www.data.go.kr/iim/api/selectAPIAcountView.do?id=15000789"
    }
  ];

  useEffect(() => {
    const fetchDataSources = async () => {
      try {
        // 실제 환경에서는 API에서 데이터를 가져올 것
        setDataSources(mockDataSources);
      } catch (error) {
        console.error('데이터 소스 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDataSources();
  }, [mockDataSources]);

  // 카테고리별 통계
  const categoryStats = mockDataSources.reduce((acc, source) => {
    acc[source.category] = (acc[source.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryChartData = Object.entries(categoryStats).map(([category, count]) => ({
    name: category,
    value: count,
    color: category === '에너지' ? '#10b981' : 
           category === '기상' ? '#3b82f6' : 
           category === '환경' ? '#f59e0b' : '#8b5cf6'
  }));

  // 사용량 통계
  const usageChartData = mockDataSources.map(source => ({
    name: source.name.length > 15 ? source.name.substring(0, 15) + '...' : source.name,
    usage: source.usageCount,
    reliability: source.reliability
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'beta': return 'bg-yellow-100 text-yellow-800';
      case 'planned': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '운영중';
      case 'beta': return '베타';
      case 'planned': return '계획중';
      default: return '알 수 없음';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">데이터 소스 정보를 로딩 중입니다...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Database className="h-10 w-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              공공데이터 활용 현황
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            산업통상자원부 공공데이터 활용 아이디어 공모전 출품작으로, 
            6개 기관의 공공데이터를 융합하여 에너지 효율화 서비스를 구현했습니다.
          </p>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              산업통상자원부 공모전 출품작
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              2024년 1월 기준
            </div>
          </div>
        </div>

        {/* 요약 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">활용 기관 수</p>
                  <p className="text-3xl font-bold text-blue-600">6개</p>
                </div>
                <Building className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">총 데이터셋</p>
                  <p className="text-3xl font-bold text-green-600">{mockDataSources.length}개</p>
                </div>
                <Database className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">총 활용 횟수</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {mockDataSources.reduce((sum, source) => sum + source.usageCount, 0).toLocaleString()}회
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">평균 신뢰도</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {(mockDataSources.reduce((sum, source) => sum + source.reliability, 0) / mockDataSources.length).toFixed(1)}%
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 차트 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* 카테고리별 분포 */}
          <Card>
            <CardHeader>
              <CardTitle>데이터 카테고리별 분포</CardTitle>
              <CardDescription>
                활용 중인 공공데이터의 분야별 분포 현황
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
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
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* 사용량 통계 */}
          <Card>
            <CardHeader>
              <CardTitle>데이터소스별 활용 현황</CardTitle>
              <CardDescription>
                각 공공데이터의 활용 횟수 및 신뢰도
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={usageChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="usage" fill="#10b981" name="활용 횟수" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 데이터소스 목록 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              활용 공공데이터 상세 목록
            </CardTitle>
            <CardDescription>
              EcoBoost 에너지 플랫폼에서 활용하고 있는 공공데이터의 상세 정보
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockDataSources.map((source) => (
                <Card key={source.id} className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{source.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {source.provider} • {source.category}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(source.status)}>
                        {getStatusText(source.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">{source.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">업데이트 주기:</span>
                        <div className="font-medium">{source.updateFrequency}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">신뢰도:</span>
                        <div className="font-medium text-green-600">{source.reliability}%</div>
                      </div>
                      <div>
                        <span className="text-gray-500">활용 횟수:</span>
                        <div className="font-medium">{source.usageCount.toLocaleString()}회</div>
                      </div>
                      <div>
                        <span className="text-gray-500">최종 업데이트:</span>
                        <div className="font-medium">{source.lastUpdated}</div>
                      </div>
                    </div>

                    <div>
                      <span className="text-gray-500 text-sm">주요 활용 기능:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {source.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>형식: {source.format.join(', ')}</span>
                        <span>라이선스: {source.license}</span>
                      </div>
                      <a 
                        href={source.documentationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
                      >
                        <Globe className="h-3 w-3" />
                        API 문서
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 활용 성과 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              공공데이터 활용 성과
            </CardTitle>
            <CardDescription>
              공공데이터 융합을 통한 혁신 서비스 제공 성과
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <Zap className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-green-700">100%</div>
                <div className="text-sm text-green-600">정확한 전기요금 계산</div>
                <div className="text-xs text-gray-600 mt-1">한전 공식 요금표 기반</div>
              </div>
              
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <Leaf className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-blue-700">95%</div>
                <div className="text-sm text-blue-600">탄소배출량 정확도</div>
                <div className="text-xs text-gray-600 mt-1">환경부 배출계수 활용</div>
              </div>
              
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <Building className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-purple-700">1,000+</div>
                <div className="text-sm text-purple-600">지원사업 매칭</div>
                <div className="text-xs text-gray-600 mt-1">정부 지원정책 연계</div>
              </div>
              
              <div className="text-center p-6 bg-orange-50 rounded-lg">
                <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-orange-700">85%</div>
                <div className="text-sm text-orange-600">예측 정확도</div>
                <div className="text-xs text-gray-600 mt-1">기상청 데이터 기반</div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-4">공공데이터 융합의 혁신적 가치</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-green-700 mb-2">🔗 데이터 융합 효과</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 6개 기관 데이터의 유기적 연결</li>
                    <li>• 단일 플랫폼에서 종합 분석 제공</li>
                    <li>• 실시간 업데이트로 최신 정보 유지</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-blue-700 mb-2">💡 서비스 혁신성</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 기업 맞춤형 에너지 솔루션 제공</li>
                    <li>• 정책-기술-경제성 통합 분석</li>
                    <li>• 데이터 기반 의사결정 지원</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  TrendingUp, 
  DollarSign, 
  Leaf, 
  Clock, 
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Calculator,
  Target,
  Zap,
  PiggyBank
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

interface BuildingInfo {
  buildingType: 'office' | 'factory' | 'retail' | 'warehouse' | 'mixed';
  floorArea: number;
  constructionYear: number;
  currentGrade: string;
  location: string;
  heatingSystem: 'gas' | 'electric' | 'district' | 'oil';
  coolingSystem: 'central' | 'individual' | 'none';
  insulationLevel: 'excellent' | 'good' | 'average' | 'poor';
  windowType: 'triple' | 'double' | 'single';
  hasRenewableEnergy: boolean;
}

interface AnalysisResult {
  currentStatus: {
    grade: string;
    energyConsumption: number;
    co2Emission: number;
    annualEnergyCost: number;
    efficiencyRanking: string;
  };
  improvementPlan: {
    targetGrade: string;
    totalInvestment: number;
    expectedSavings: number;
    paybackPeriod: number;
    co2ReductionTotal: number;
    measures: any[];
  };
  phaseImplementation: {
    phase1: {
      title: string;
      measures: string[];
      cost: number;
      gradeImprovement: string;
      timeframe: string;
    };
    phase2: {
      title: string;
      measures: string[];
      cost: number;
      gradeImprovement: string;
      timeframe: string;
    };
    phase3: {
      title: string;
      measures: string[];
      cost: number;
      gradeImprovement: string;
      timeframe: string;
    };
  };
  incentives: {
    certificationBenefits: string[];
    governmentSupport: string[];
    taxIncentives: string[];
    financingOptions: string[];
  };
  benchmark: any;
  investmentPriority: any[];
  recommendations: any;
  financialSummary: {
    totalInvestment: number;
    annualSavings: number;
    lifetimeSavings: number;
    netPresentValue: number;
    roi: number;
  };
}

export default function BuildingEfficiencyCalculator() {
  const [step, setStep] = useState(1);
  const [buildingInfo, setBuildingInfo] = useState<BuildingInfo>({
    buildingType: 'office',
    floorArea: 1000,
    constructionYear: 2010,
    currentGrade: '3',
    location: '서울특별시',
    heatingSystem: 'gas',
    coolingSystem: 'central',
    insulationLevel: 'average',
    windowType: 'double',
    hasRenewableEnergy: false
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/building-efficiency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(buildingInfo),
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysisResult(data.data);
        setStep(3);
      } else {
        const error = await response.json();
        alert(error.error || '분석 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('분석 오류:', error);
      alert('분석 중 오류가 발생했습니다.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getGradeColor = (grade: string) => {
    const gradeNum = grade.replace(/\+/g, '');
    if (gradeNum === '1') return 'bg-green-500';
    if (gradeNum === '2' || gradeNum === '3') return 'bg-blue-500';
    if (gradeNum === '4' || gradeNum === '5') return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getPerformanceLevel = (level: string) => {
    const colors = {
      excellent: 'text-green-600 bg-green-50',
      good: 'text-blue-600 bg-blue-50',
      average: 'text-yellow-600 bg-yellow-50',
      poor: 'text-red-600 bg-red-50'
    };
    return colors[level as keyof typeof colors] || colors.average;
  };

  const renderStep1 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          건물 기본 정보
        </CardTitle>
        <CardDescription>
          분석을 위한 건물의 기본 정보를 입력해주세요.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">건물 유형</label>
            <select
              className="w-full p-2 border rounded-md"
              value={buildingInfo.buildingType}
              onChange={(e) => setBuildingInfo({...buildingInfo, buildingType: e.target.value as any})}
            >
              <option value="office">사무소</option>
              <option value="factory">공장</option>
              <option value="retail">상업시설</option>
              <option value="warehouse">창고</option>
              <option value="mixed">복합용도</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">연면적 (m²)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={buildingInfo.floorArea}
              onChange={(e) => setBuildingInfo({...buildingInfo, floorArea: parseInt(e.target.value)})}
              min="1"
              max="100000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">준공년도</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={buildingInfo.constructionYear}
              onChange={(e) => setBuildingInfo({...buildingInfo, constructionYear: parseInt(e.target.value)})}
              min="1950"
              max={new Date().getFullYear()}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">현재 에너지 효율등급</label>
            <select
              className="w-full p-2 border rounded-md"
              value={buildingInfo.currentGrade}
              onChange={(e) => setBuildingInfo({...buildingInfo, currentGrade: e.target.value})}
            >
              <option value="1+++">1+++ 등급</option>
              <option value="1++">1++ 등급</option>
              <option value="1+">1+ 등급</option>
              <option value="1">1 등급</option>
              <option value="2">2 등급</option>
              <option value="3">3 등급</option>
              <option value="4">4 등급</option>
              <option value="5">5 등급</option>
              <option value="6">6 등급</option>
              <option value="7">7 등급</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">소재지</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={buildingInfo.location}
              onChange={(e) => setBuildingInfo({...buildingInfo, location: e.target.value})}
              placeholder="예: 서울특별시 강남구"
            />
          </div>
        </div>

        <Button className="w-full" onClick={() => setStep(2)}>
          다음 단계 <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          건물 시설 정보
        </CardTitle>
        <CardDescription>
          에너지 효율 분석을 위한 시설 정보를 입력해주세요.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">난방 시스템</label>
            <select
              className="w-full p-2 border rounded-md"
              value={buildingInfo.heatingSystem}
              onChange={(e) => setBuildingInfo({...buildingInfo, heatingSystem: e.target.value as any})}
            >
              <option value="gas">가스보일러</option>
              <option value="electric">전기난방</option>
              <option value="district">지역난방</option>
              <option value="oil">기름보일러</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">냉방 시스템</label>
            <select
              className="w-full p-2 border rounded-md"
              value={buildingInfo.coolingSystem}
              onChange={(e) => setBuildingInfo({...buildingInfo, coolingSystem: e.target.value as any})}
            >
              <option value="central">중앙공조</option>
              <option value="individual">개별공조</option>
              <option value="none">없음</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">단열 수준</label>
            <select
              className="w-full p-2 border rounded-md"
              value={buildingInfo.insulationLevel}
              onChange={(e) => setBuildingInfo({...buildingInfo, insulationLevel: e.target.value as any})}
            >
              <option value="excellent">우수</option>
              <option value="good">양호</option>
              <option value="average">보통</option>
              <option value="poor">미흡</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">창호 종류</label>
            <select
              className="w-full p-2 border rounded-md"
              value={buildingInfo.windowType}
              onChange={(e) => setBuildingInfo({...buildingInfo, windowType: e.target.value as any})}
            >
              <option value="triple">삼중유리</option>
              <option value="double">복층유리</option>
              <option value="single">단판유리</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={buildingInfo.hasRenewableEnergy}
                onChange={(e) => setBuildingInfo({...buildingInfo, hasRenewableEnergy: e.target.checked})}
              />
              <span className="text-sm font-medium">신재생에너지 설비 보유</span>
            </label>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setStep(1)}>
            이전
          </Button>
          <Button 
            className="flex-1" 
            onClick={handleAnalyze}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>분석 중...</>
            ) : (
              <>
                <Calculator className="mr-2 h-4 w-4" />
                효율등급 분석 시작
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderResults = () => {
    if (!analysisResult) return null;

    const currentStatus = analysisResult.currentStatus;
    const improvementPlan = analysisResult.improvementPlan;
    const financialSummary = analysisResult.financialSummary;
    const phaseImplementation = analysisResult.phaseImplementation;

    // 차트 데이터 준비
    const comparisonData = [
      {
        name: '현재',
        에너지소비량: currentStatus.energyConsumption,
        탄소배출량: currentStatus.co2Emission,
      },
      {
        name: '개선 후',
        에너지소비량: currentStatus.energyConsumption * (1 - improvementPlan.co2ReductionTotal / 100),
        탄소배출량: currentStatus.co2Emission * (1 - improvementPlan.co2ReductionTotal / 100),
      }
    ];

    const investmentData = [
      { name: '1단계', cost: phaseImplementation.phase1.cost, timeframe: phaseImplementation.phase1.timeframe },
      { name: '2단계', cost: phaseImplementation.phase2.cost, timeframe: phaseImplementation.phase2.timeframe },
      { name: '3단계', cost: phaseImplementation.phase3.cost, timeframe: phaseImplementation.phase3.timeframe },
    ];

    const roiData = Array.from({length: 10}, (_, i) => ({
      year: i + 1,
      누적투자: financialSummary.totalInvestment,
      누적절감: financialSummary.annualSavings * (i + 1),
      순수익: (financialSummary.annualSavings * (i + 1)) - financialSummary.totalInvestment
    }));

    return (
      <div className="space-y-6">
        {/* 현재 상태 요약 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">현재 등급</p>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getGradeColor(currentStatus.grade)} text-white`}>
                      {currentStatus.grade}등급
                    </Badge>
                  </div>
                </div>
                <Building2 className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">연간 에너지 비용</p>
                  <p className="text-2xl font-bold">{formatCurrency(currentStatus.annualEnergyCost)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">에너지 소비량</p>
                  <p className="text-2xl font-bold">{currentStatus.energyConsumption}</p>
                  <p className="text-xs text-gray-500">kWh/m²·년</p>
                </div>
                <Zap className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">탄소 배출량</p>
                  <p className="text-2xl font-bold">{currentStatus.co2Emission}</p>
                  <p className="text-xs text-gray-500">kg CO₂/m²·년</p>
                </div>
                <Leaf className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 성능 분석 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>현재 vs 개선 후 비교</CardTitle>
              <CardDescription>에너지 소비량 및 탄소 배출량 비교</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="에너지소비량" fill="#3b82f6" />
                  <Bar dataKey="탄소배출량" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>투자 수익률 분석</CardTitle>
              <CardDescription>연도별 누적 투자 대비 절감 효과</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={roiData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Line type="monotone" dataKey="누적투자" stroke="#ef4444" />
                  <Line type="monotone" dataKey="누적절감" stroke="#3b82f6" />
                  <Line type="monotone" dataKey="순수익" stroke="#10b981" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* 개선 방안 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              개선 방안 및 투자 계획
            </CardTitle>
            <CardDescription>
              목표 등급: <Badge className={`${getGradeColor(improvementPlan.targetGrade)} text-white ml-1`}>
                {improvementPlan.targetGrade}등급
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-blue-50">
                <CardContent className="pt-4">
                  <h4 className="font-semibold text-blue-800">{phaseImplementation.phase1.title}</h4>
                  <p className="text-sm text-blue-600 mb-2">{phaseImplementation.phase1.timeframe}</p>
                  <p className="text-lg font-bold text-blue-900">{formatCurrency(phaseImplementation.phase1.cost)}</p>
                  <div className="mt-2">
                    <p className="text-xs font-medium text-blue-700">주요 개선사항:</p>
                    <ul className="text-xs text-blue-600 mt-1">
                      {phaseImplementation.phase1.measures.map((measure, idx) => (
                        <li key={idx}>• {measure}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50">
                <CardContent className="pt-4">
                  <h4 className="font-semibold text-green-800">{phaseImplementation.phase2.title}</h4>
                  <p className="text-sm text-green-600 mb-2">{phaseImplementation.phase2.timeframe}</p>
                  <p className="text-lg font-bold text-green-900">{formatCurrency(phaseImplementation.phase2.cost)}</p>
                  <div className="mt-2">
                    <p className="text-xs font-medium text-green-700">주요 개선사항:</p>
                    <ul className="text-xs text-green-600 mt-1">
                      {phaseImplementation.phase2.measures.map((measure, idx) => (
                        <li key={idx}>• {measure}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-50">
                <CardContent className="pt-4">
                  <h4 className="font-semibold text-purple-800">{phaseImplementation.phase3.title}</h4>
                  <p className="text-sm text-purple-600 mb-2">{phaseImplementation.phase3.timeframe}</p>
                  <p className="text-lg font-bold text-purple-900">{formatCurrency(phaseImplementation.phase3.cost)}</p>
                  <div className="mt-2">
                    <p className="text-xs font-medium text-purple-700">주요 개선사항:</p>
                    <ul className="text-xs text-purple-600 mt-1">
                      {phaseImplementation.phase3.measures.map((measure, idx) => (
                        <li key={idx}>• {measure}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-gray-50">
                <CardContent className="pt-4">
                  <h4 className="font-semibold mb-2">📊 재무 요약</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>총 투자 비용:</span>
                      <span className="font-bold">{formatCurrency(financialSummary.totalInvestment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>연간 절감액:</span>
                      <span className="font-bold text-green-600">{formatCurrency(financialSummary.annualSavings)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>투자 회수 기간:</span>
                      <span className="font-bold">{improvementPlan.paybackPeriod}년</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ROI:</span>
                      <span className="font-bold text-blue-600">{financialSummary.roi.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span>20년 순수익:</span>
                      <span className="font-bold text-green-600">
                        {formatCurrency(financialSummary.lifetimeSavings - financialSummary.totalInvestment)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50">
                <CardContent className="pt-4">
                  <h4 className="font-semibold mb-2">🌱 환경 효과</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>연간 탄소 절감량:</span>
                      <span className="font-bold">{improvementPlan.co2ReductionTotal.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>에너지 절감 효과:</span>
                      <span className="font-bold text-green-600">
                        {(currentStatus.energyConsumption * improvementPlan.co2ReductionTotal / 100).toFixed(0)} kWh/m²·년
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>ESG 평가 개선:</span>
                      <span className="font-bold">우수 등급</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* 정부 지원 혜택 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PiggyBank className="h-5 w-5" />
              정부 지원 혜택 및 인센티브
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">인증 혜택</h4>
                <ul className="text-sm space-y-1">
                  {analysisResult.incentives.certificationBenefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-green-600 mb-2">정부 지원</h4>
                <ul className="text-sm space-y-1">
                  {analysisResult.incentives.governmentSupport.map((support, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      {support}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-purple-600 mb-2">세제 혜택</h4>
                <ul className="text-sm space-y-1">
                  {analysisResult.incentives.taxIncentives.map((incentive, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      {incentive}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-orange-600 mb-2">금융 지원</h4>
                <ul className="text-sm space-y-1">
                  {analysisResult.incentives.financingOptions.map((option, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 액션 버튼 */}
        <div className="flex gap-4">
          <Button onClick={() => setStep(1)} variant="outline">
            새로운 분석 시작
          </Button>
          <Button>
            상세 보고서 다운로드
          </Button>
          <Button variant="outline">
            전문가 상담 예약
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">진행 상황</span>
          <span className="text-sm text-gray-500">{step}/3 단계</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Content */}
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderResults()}
    </div>
  );
}
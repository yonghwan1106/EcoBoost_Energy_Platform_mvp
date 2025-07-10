"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { FileText, Download, Calendar, TrendingUp, Zap, Leaf } from "lucide-react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ReportPage() {
  const [, setReportData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      // 에너지 데이터 가져오기
      const energyResponse = await fetch('/api/energy');
      const energyData = await energyResponse.json();
      
      // 신재생에너지 데이터 가져오기
      const potentialResponse = await fetch('/api/potential');
      const potentialData = await potentialResponse.json();

      setReportData({
        energy: energyData,
        potential: potentialData
      });
    } catch (error) {
      console.error('리포트 데이터 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = async () => {
    setGeneratingPdf(true);
    try {
      const element = document.getElementById('report-content');
      if (!element) return;
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save('ecoboost-energy-report.pdf');
    } catch (error) {
      console.error('PDF 생성 실패:', error);
    } finally {
      setGeneratingPdf(false);
    }
  };

  // const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  const monthlyData = [
    { month: '1월', electricity: 1500, gas: 300, cost: 450000 },
    { month: '2월', electricity: 1400, gas: 280, cost: 420000 },
    { month: '3월', electricity: 1600, gas: 320, cost: 480000 },
    { month: '4월', electricity: 1550, gas: 310, cost: 465000 },
    { month: '5월', electricity: 1650, gas: 330, cost: 495000 },
    { month: '6월', electricity: 1800, gas: 360, cost: 540000 },
  ];

  const industryComparisonData = [
    { industry: '제조업', average: 2500, myUsage: 1600, efficiency: 64 },
    { industry: '서비스업', average: 1000, myUsage: 800, efficiency: 80 },
    { industry: '도소매업', average: 1200, myUsage: 950, efficiency: 79 },
    { industry: '건설업', average: 1800, myUsage: 1400, efficiency: 78 },
  ];

  const renewableDistribution = [
    { name: '태양광', value: 65, color: '#f59e0b' },
    { name: '풍력', value: 25, color: '#3b82f6' },
    { name: '수력', value: 10, color: '#10b981' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">리포트 데이터를 로딩 중입니다...</p>
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              에너지 효율화 종합 보고서
            </h1>
            <p className="text-lg text-gray-600">
              2024년 상반기 에너지 사용 현황 및 효율화 분석
            </p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              기간 설정
            </Button>
            <Button onClick={generatePDF} disabled={generatingPdf} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              {generatingPdf ? "생성 중..." : "PDF 다운로드"}
            </Button>
          </div>
        </div>

        {/* Report Content */}
        <div id="report-content" className="space-y-8">
          {/* Executive Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                주요 성과 요약
              </CardTitle>
              <CardDescription>
                {new Date().getFullYear()}년 상반기 에너지 효율화 주요 지표
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-700">15%</div>
                  <div className="text-sm text-green-600">에너지 효율 개선</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-700">₩2.1M</div>
                  <div className="text-sm text-blue-600">연간 절약 예상액</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Leaf className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-700">850kg</div>
                  <div className="text-sm text-yellow-600">CO₂ 절감량</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-700">A+</div>
                  <div className="text-sm text-purple-600">에너지 효율 등급</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trend */}
          <Card>
            <CardHeader>
              <CardTitle>월별 에너지 사용량 추이</CardTitle>
              <CardDescription>2024년 상반기 전력 및 가스 사용량 변화</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="electricity" stroke="#10b981" strokeWidth={2} name="전력 (kWh)" />
                    <Line yAxisId="left" type="monotone" dataKey="gas" stroke="#3b82f6" strokeWidth={2} name="가스 (m³)" />
                    <Line yAxisId="right" type="monotone" dataKey="cost" stroke="#f59e0b" strokeWidth={2} name="비용 (원)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Industry Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>업종별 에너지 효율성 비교</CardTitle>
              <CardDescription>동종 업계 대비 에너지 사용 효율성 분석</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={industryComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="industry" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="average" fill="#e5e7eb" name="업종 평균" />
                    <Bar dataKey="myUsage" fill="#10b981" name="현재 사용량" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {industryComparisonData.map((item: Record<string, unknown>, index: number) => (
                  <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-semibold">{item.industry}</div>
                    <div className="text-2xl font-bold text-green-600">{item.efficiency}%</div>
                    <div className="text-xs text-gray-600">효율성</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Renewable Energy Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>신재생에너지 구성비</CardTitle>
                <CardDescription>지역 내 신재생에너지 발전 현황</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={renewableDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, value}) => `${name}: ${value}%`}
                      >
                        {renewableDistribution.map((entry: Record<string, unknown>, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>개선 권장사항</CardTitle>
                <CardDescription>에너지 효율화를 위한 실행 계획</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <div className="font-semibold">LED 조명 교체</div>
                      <div className="text-sm text-gray-600">연간 약 ₩350,000 절약 가능</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <div className="font-semibold">고효율 에어컨 도입</div>
                      <div className="text-sm text-gray-600">연간 약 ₩580,000 절약 가능</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <div className="font-semibold">태양광 패널 설치</div>
                      <div className="text-sm text-gray-600">연간 약 ₩1,200,000 절약 가능</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                    <div>
                      <div className="font-semibold">에너지 관리 시스템</div>
                      <div className="text-sm text-gray-600">연간 약 ₩450,000 절약 가능</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Plan */}
          <Card>
            <CardHeader>
              <CardTitle>실행 계획 및 로드맵</CardTitle>
              <CardDescription>단계별 에너지 효율화 추진 계획</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 border-2 border-green-200 rounded-lg">
                    <div className="text-lg font-semibold text-green-700 mb-2">1단계 (1-3개월)</div>
                    <div className="text-sm text-gray-600 mb-4">즉시 실행 가능한 조치</div>
                    <ul className="text-sm text-left space-y-1">
                      <li>• LED 조명 교체</li>
                      <li>• 대기전력 차단</li>
                      <li>• 운영 시간 최적화</li>
                    </ul>
                  </div>
                  <div className="text-center p-6 border-2 border-blue-200 rounded-lg">
                    <div className="text-lg font-semibold text-blue-700 mb-2">2단계 (3-6개월)</div>
                    <div className="text-sm text-gray-600 mb-4">중기 투자 프로젝트</div>
                    <ul className="text-sm text-left space-y-1">
                      <li>• 고효율 설비 교체</li>
                      <li>• 단열 성능 개선</li>
                      <li>• 에너지 모니터링 시스템</li>
                    </ul>
                  </div>
                  <div className="text-center p-6 border-2 border-purple-200 rounded-lg">
                    <div className="text-lg font-semibold text-purple-700 mb-2">3단계 (6-12개월)</div>
                    <div className="text-sm text-gray-600 mb-4">장기 투자 계획</div>
                    <ul className="text-sm text-left space-y-1">
                      <li>• 신재생에너지 도입</li>
                      <li>• 스마트 그리드 연계</li>
                      <li>• 에너지 저장 시스템</li>
                    </ul>
                  </div>
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
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, Factory, Zap, Leaf, DollarSign, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const monthlyEnergyData = [
  { month: '1월', usage: 4500, cost: 850, previous: 4200 },
  { month: '2월', usage: 4100, cost: 780, previous: 3900 },
  { month: '3월', usage: 3800, cost: 720, previous: 3600 },
  { month: '4월', usage: 3200, cost: 600, previous: 3100 },
  { month: '5월', usage: 2800, cost: 520, previous: 2700 },
  { month: '6월', usage: 3500, cost: 650, previous: 3400 },
  { month: '7월', usage: 4800, cost: 900, previous: 4600 },
  { month: '8월', usage: 5200, cost: 980, previous: 5000 },
  { month: '9월', usage: 4200, cost: 790, previous: 4100 },
  { month: '10월', usage: 3600, cost: 680, previous: 3500 },
  { month: '11월', usage: 4000, cost: 750, previous: 3800 },
  { month: '12월', usage: 4300, cost: 810, previous: 4100 }
];

const industryData = [
  { name: '제조업', value: 35, color: '#3b82f6' },
  { name: '서비스업', value: 28, color: '#10b981' },
  { name: '건설업', value: 18, color: '#f59e0b' },
  { name: '도소매업', value: 12, color: '#8b5cf6' },
  { name: '기타', value: 7, color: '#ef4444' }
];

const regionData = [
  { region: '서울', usage: 1200, efficiency: 85 },
  { region: '경기', usage: 1800, efficiency: 78 },
  { region: '인천', usage: 600, efficiency: 82 },
  { region: '부산', usage: 900, efficiency: 80 },
  { region: '대구', usage: 650, efficiency: 83 },
  { region: '대전', usage: 450, efficiency: 87 },
  { region: '광주', usage: 380, efficiency: 85 },
  { region: '울산', usage: 520, efficiency: 79 }
];

const renewableData = [
  { month: '1월', solar: 120, wind: 80, hydro: 60 },
  { month: '2월', solar: 140, wind: 85, hydro: 65 },
  { month: '3월', solar: 180, wind: 90, hydro: 70 },
  { month: '4월', solar: 220, wind: 95, hydro: 75 },
  { month: '5월', solar: 280, wind: 100, hydro: 80 },
  { month: '6월', solar: 320, wind: 105, hydro: 85 },
  { month: '7월', solar: 350, wind: 110, hydro: 90 },
  { month: '8월', solar: 330, wind: 115, hydro: 95 },
  { month: '9월', solar: 280, wind: 108, hydro: 88 },
  { month: '10월', solar: 230, wind: 102, hydro: 82 },
  { month: '11월', solar: 180, wind: 95, hydro: 75 },
  { month: '12월', solar: 150, wind: 88, hydro: 70 }
];

export default function OverviewDashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 에너지 사용량</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48,200 MWh</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+2.5%</span>
              <span>지난 달 대비</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">에너지 비용</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₩9,135만</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 text-red-600" />
              <span className="text-red-600">-1.8%</span>
              <span>지난 달 대비</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">참여 기업</CardTitle>
            <Factory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+12.3%</span>
              <span>지난 달 대비</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">탄소 절감량</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,850 tCO₂</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+8.7%</span>
              <span>지난 달 대비</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              월별 에너지 사용량 추이
            </CardTitle>
            <CardDescription>
              2024년 월별 에너지 사용량 및 비용 현황
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyEnergyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'usage' ? `${value} MWh` : `₩${value}만`,
                    name === 'usage' ? '사용량' : '비용'
                  ]}
                />
                <Bar dataKey="usage" fill="#3b82f6" name="usage" />
                <Bar dataKey="cost" fill="#10b981" name="cost" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>업종별 에너지 사용 비율</CardTitle>
            <CardDescription>
              업종별 에너지 사용량 분포 현황
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={industryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {industryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>지역별 에너지 효율성</CardTitle>
            <CardDescription>
              주요 지역별 에너지 사용량 및 효율성 지수
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="usage" fill="#8884d8" name="사용량 (MWh)" />
                <Bar yAxisId="right" dataKey="efficiency" fill="#82ca9d" name="효율성 지수" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>신재생에너지 발전량</CardTitle>
            <CardDescription>
              태양광, 풍력, 수력 발전량 월별 추이
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={renewableData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="solar"
                  stackId="1"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  name="태양광"
                />
                <Area
                  type="monotone"
                  dataKey="wind"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  name="풍력"
                />
                <Area
                  type="monotone"
                  dataKey="hydro"
                  stackId="1"
                  stroke="#10b981"
                  fill="#10b981"
                  name="수력"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>최근 활동</CardTitle>
          <CardDescription>
            최근 플랫폼 활동 및 알림 사항
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">새로운 에너지 효율화 방안 제안</p>
                  <p className="text-xs text-gray-500">제조업 A사 - 연간 15% 비용 절감 가능</p>
                </div>
              </div>
              <Badge variant="secondary">신규</Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">월별 에너지 사용 리포트 생성 완료</p>
                  <p className="text-xs text-gray-500">2024년 11월 종합 분석 리포트</p>
                </div>
              </div>
              <Badge variant="outline">완료</Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">정부 지원사업 신청 마감 알림</p>
                  <p className="text-xs text-gray-500">에너지 효율화 지원사업 - 12월 31일 마감</p>
                </div>
              </div>
              <Badge variant="destructive">마감 임박</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
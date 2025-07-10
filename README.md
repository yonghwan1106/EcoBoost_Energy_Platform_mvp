# EcoBoost Energy Platform MVP

> 산업통상자원부 공공데이터 기반 중소기업 에너지 효율화 플랫폼

## 📋 프로젝트 개요

**EcoBoost Energy Platform**은 산업통상자원부의 공공데이터를 활용하여 중소기업의 에너지 사용량을 분석하고 효율화 방안을 제시하는 웹 플랫폼입니다.

### 🎯 주요 목표
- 중소기업 에너지 사용 현황 분석 및 시각화
- 업종별 벤치마킹을 통한 에너지 효율성 평가
- 신재생에너지 설치 잠재력 분석
- 에너지 절약 가이드라인 및 ROI 계산 제공

## 🚀 기술 스택

### Core Framework
- **Next.js 14** (App Router)
- **TypeScript**
- **React 18**

### UI/UX
- **Tailwind CSS**
- **shadcn/ui** (모던 컴포넌트 라이브러리)
- **Recharts** (데이터 시각화)
- **Lucide Icons**

### 백엔드 및 데이터
- **Next.js API Routes**
- **JSON 기반 샘플 데이터**
- **Server Actions**

### 추가 기능
- **React Hook Form** (폼 관리)
- **Zod** (스키마 검증)
- **jsPDF & html2canvas** (PDF 생성)

## 📦 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

개발 서버가 실행되면 [http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

### 3. 프로덕션 빌드
```bash
npm run build
npm start
```

## 🗂️ 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── energy/        # 에너지 분석 API
│   │   └── potential/     # 신재생에너지 잠재력 API
│   ├── analysis/          # 에너지 분석 페이지
│   ├── potential/         # 신재생에너지 잠재력 페이지
│   ├── report/           # 종합 보고서 페이지
│   ├── globals.css       # 글로벌 스타일
│   ├── layout.tsx        # 루트 레이아웃
│   └── page.tsx          # 메인 페이지
├── components/           # 재사용 가능한 컴포넌트
│   ├── ui/              # shadcn/ui 컴포넌트
│   ├── layout/          # 레이아웃 컴포넌트
│   └── dashboard/       # 대시보드 컴포넌트
├── lib/                 # 유틸리티 및 타입
│   ├── types/           # TypeScript 타입 정의
│   └── utils.ts         # 유틸리티 함수
└── data/                # 샘플 데이터
    └── sample-data.ts   # 확장된 샘플 데이터
```

## 🎨 주요 기능

### 1. 메인 대시보드
- 플랫폼 소개 및 주요 기능 안내
- 통계 현황 및 활용 데이터 소개
- 반응형 디자인으로 모바일 지원

### 2. 에너지 사용량 분석 (`/analysis`)
- 지역, 업종, 기업규모별 에너지 사용량 입력
- 업종별 벤치마킹 분석
- Recharts를 활용한 시각화
- 에너지 절약 가능 비용 및 CO₂ 절감량 계산
- 개선 권장사항 제시

### 3. 신재생에너지 잠재력 분석 (`/potential`)
- 지역별 태양광/풍력 설치 계획 입력
- 투자 비용 및 ROI 계산
- 정부 지원금 정보 제공
- 연간 발전량 및 절약액 예측
- 경제성 분석 차트

### 4. 종합 보고서 (`/report`)
- 에너지 효율화 성과 요약
- 월별 에너지 사용량 추이
- 업종별 효율성 비교
- 신재생에너지 구성비
- PDF 다운로드 기능
- 단계별 실행 계획 제시

## 📊 활용 공공데이터

### 1. 한국에너지공단 에너지사용량 통계
- **출처**: https://www.data.go.kr/data/15004793/fileData.do
- **활용**: 업종별, 지역별 에너지 소비 패턴 분석

### 2. 한국전력공사 계약종별 전력사용량
- **출처**: https://www.data.go.kr/data/15101360/openapi.do
- **활용**: 실시간 전력 사용량 추이 분석

### 3. 기초지자체별 신재생에너지 보급 현황
- **출처**: https://www.data.go.kr/data/15086292/fileData.do
- **활용**: 지역별 신재생에너지 잠재력 분석

## 🔧 개발 명령어

```bash
# 개발 서버 실행 (Turbopack 사용)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 👨‍💻 개발자 정보

**개발자**: 박용환  
**이메일**: sanoramyun8@gmail.com  
**개발 기간**: 2025.07.09 ~ 2025.07.30  

---

© 2025 EcoBoost Energy Platform. 산업통상자원부 공공데이터 활용 MVP.

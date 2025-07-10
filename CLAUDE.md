# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EcoBoost Energy Platform is a web application for analyzing energy efficiency for SMEs using public data from the Ministry of Trade, Industry and Energy (MOTIE). The platform provides energy usage analysis, renewable energy potential assessment, and comprehensive reporting with PDF generation capabilities.

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Production server
npm start

# Linting
npm run lint
```

## Architecture

### Core Framework
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **React 19** with modern patterns
- **Tailwind CSS 4** for styling

### Key Libraries
- **shadcn/ui** for UI components (pre-configured)
- **Recharts** for data visualization
- **React Hook Form + Zod** for form management and validation
- **Zustand** for state management
- **jsPDF + html2canvas** for PDF generation

### Data Flow
The application uses a JSON-based data structure with comprehensive sample data:
- `src/data/sample-data.ts` contains all mock data including energy usage, industry benchmarks, regional data, and renewable energy information
- API routes in `src/app/api/` process requests and return analysis results
- Components consume data through API calls and display results using Recharts

### Key Data Types
Located in `src/lib/types/energy.ts`:
- `EnergyUsageData` - Core energy consumption data
- `IndustryBenchmark` - Industry-specific benchmarks
- `RegionData` - Regional information and capacity
- `RenewableEnergyData` - Renewable energy statistics
- `EnergyAnalysisResult` - Analysis output structure

### Application Structure
- `/` - Main dashboard with platform overview
- `/analysis` - Energy usage analysis with benchmarking
- `/potential` - Renewable energy potential assessment
- `/report` - Comprehensive reporting with PDF export

### UI Components
- `src/components/ui/` - shadcn/ui components (button, card, navigation-menu)
- `src/components/dashboard/` - Chart components and stats cards
- `src/components/layout/` - Navigation and footer components
- `src/components/analysis/` - Analysis-specific components

### API Routes
- `GET /api/energy` - Fetch energy data with filtering (region, industry, year)
- `POST /api/energy` - Analyze energy usage against benchmarks
- `GET /api/potential` - Renewable energy potential data

## Development Notes

### Data Integration
The application is designed to integrate with Korean public datasets:
- Korea Energy Agency energy usage statistics
- KEPCO electricity consumption data
- Regional renewable energy capacity data

### Styling Conventions
- Uses Tailwind CSS 4 with custom configuration
- Components follow shadcn/ui patterns
- Responsive design with mobile-first approach
- Uses Lucide React icons throughout

### State Management
- Uses Zustand for global state
- Form state managed with React Hook Form
- API state handled through Next.js App Router patterns

### Korean Localization
- All UI text and content is in Korean
- Date and number formatting follows Korean conventions
- Currency displays in Korean Won (₩)
- Regional data uses Korean administrative divisions

## Common Tasks

### Adding New Analysis Features
1. Define TypeScript interfaces in `src/lib/types/energy.ts`
2. Add sample data to `src/data/sample-data.ts`
3. Create API route in `src/app/api/`
4. Build UI components using existing patterns
5. Add charts using Recharts library

### PDF Generation
Uses jsPDF and html2canvas for report generation. Components should be designed with print-friendly styling considerations.

### Form Handling
All forms use React Hook Form with Zod validation. Follow the existing pattern in analysis components for consistency.
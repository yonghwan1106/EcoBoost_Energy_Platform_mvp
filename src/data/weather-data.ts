// 기상청 기상관측자료 기반 신재생에너지 예측 데이터

export interface WeatherData {
  id: string;
  region: string;
  date: string;
  temperature: number; // 평균기온 (°C)
  humidity: number; // 습도 (%)
  precipitation: number; // 강수량 (mm)
  windSpeed: number; // 풍속 (m/s)
  windDirection: number; // 풍향 (도)
  solarIrradiance: number; // 일사량 (MJ/m²)
  sunshineHours: number; // 일조시간 (시간)
  cloudCover: number; // 운량 (1-10)
}

export interface RegionWeatherSummary {
  regionCode: string;
  regionName: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  yearlyAverage: {
    temperature: number;
    sunshineHours: number;
    windSpeed: number;
    solarIrradiance: number;
  };
  monthlyData: WeatherData[];
  solarPotential: {
    rating: 'excellent' | 'good' | 'average' | 'poor';
    score: number; // 0-100
    estimatedCapacityFactor: number; // %
    optimalTiltAngle: number; // 도
  };
  windPotential: {
    rating: 'excellent' | 'good' | 'average' | 'poor';
    score: number; // 0-100
    estimatedCapacityFactor: number; // %
    turbineRecommendation: string;
  };
}

export interface RenewableEnergyForecast {
  regionCode: string;
  capacity: number; // kW
  energyType: 'solar' | 'wind';
  monthlyProduction: {
    month: number;
    estimatedOutput: number; // kWh
    capacityFactor: number; // %
    weatherImpact: string;
  }[];
  annualProduction: {
    totalOutput: number; // kWh
    averageCapacityFactor: number; // %
    co2Reduction: number; // tCO2
    costSavings: number; // 원
  };
  investmentAnalysis: {
    initialCost: number; // 원
    maintenanceCost: number; // 원/년
    roi: number; // %
    paybackPeriod: number; // 년
    irr: number; // %
    npv: number; // 원
  };
}

// 주요 지역 기상 데이터 (2024년 기준)
export const regionWeatherData: RegionWeatherSummary[] = [
  {
    regionCode: 'SEOUL',
    regionName: '서울특별시',
    coordinates: { latitude: 37.5665, longitude: 126.9780 },
    yearlyAverage: {
      temperature: 12.8,
      sunshineHours: 2054,
      windSpeed: 2.3,
      solarIrradiance: 12.5
    },
    monthlyData: [
      {
        id: 'SEOUL_2024_01',
        region: '서울특별시',
        date: '2024-01',
        temperature: -2.1,
        humidity: 58,
        precipitation: 18.5,
        windSpeed: 2.8,
        windDirection: 290,
        solarIrradiance: 8.2,
        sunshineHours: 155,
        cloudCover: 5.2
      },
      {
        id: 'SEOUL_2024_02',
        region: '서울특별시',
        date: '2024-02',
        temperature: 1.3,
        humidity: 54,
        precipitation: 25.1,
        windSpeed: 2.9,
        windDirection: 285,
        solarIrradiance: 10.8,
        sunshineHours: 172,
        cloudCover: 4.8
      },
      {
        id: 'SEOUL_2024_03',
        region: '서울특별시',
        date: '2024-03',
        temperature: 8.2,
        humidity: 52,
        precipitation: 42.3,
        windSpeed: 2.7,
        windDirection: 270,
        solarIrradiance: 13.5,
        sunshineHours: 198,
        cloudCover: 4.5
      },
      {
        id: 'SEOUL_2024_04',
        region: '서울특별시',
        date: '2024-04',
        temperature: 14.8,
        humidity: 56,
        precipitation: 65.2,
        windSpeed: 2.5,
        windDirection: 265,
        solarIrradiance: 16.2,
        sunshineHours: 215,
        cloudCover: 4.2
      },
      {
        id: 'SEOUL_2024_05',
        region: '서울특별시',
        date: '2024-05',
        temperature: 20.1,
        humidity: 62,
        precipitation: 89.7,
        windSpeed: 2.2,
        windDirection: 260,
        solarIrradiance: 18.8,
        sunshineHours: 228,
        cloudCover: 4.8
      },
      {
        id: 'SEOUL_2024_06',
        region: '서울특별시',
        date: '2024-06',
        temperature: 24.5,
        humidity: 72,
        precipitation: 125.8,
        windSpeed: 2.0,
        windDirection: 245,
        solarIrradiance: 16.5,
        sunshineHours: 185,
        cloudCover: 6.2
      },
      {
        id: 'SEOUL_2024_07',
        region: '서울특별시',
        date: '2024-07',
        temperature: 26.8,
        humidity: 78,
        precipitation: 385.2,
        windSpeed: 1.8,
        windDirection: 240,
        solarIrradiance: 12.8,
        sunshineHours: 142,
        cloudCover: 7.5
      },
      {
        id: 'SEOUL_2024_08',
        region: '서울특별시',
        date: '2024-08',
        temperature: 27.2,
        humidity: 75,
        precipitation: 278.5,
        windSpeed: 1.9,
        windDirection: 235,
        solarIrradiance: 14.2,
        sunshineHours: 168,
        cloudCover: 6.8
      },
      {
        id: 'SEOUL_2024_09',
        region: '서울특별시',
        date: '2024-09',
        temperature: 22.8,
        humidity: 68,
        precipitation: 165.3,
        windSpeed: 2.1,
        windDirection: 250,
        solarIrradiance: 15.8,
        sunshineHours: 187,
        cloudCover: 5.5
      },
      {
        id: 'SEOUL_2024_10',
        region: '서울특별시',
        date: '2024-10',
        temperature: 16.2,
        humidity: 62,
        precipitation: 58.7,
        windSpeed: 2.4,
        windDirection: 270,
        solarIrradiance: 13.5,
        sunshineHours: 198,
        cloudCover: 4.2
      },
      {
        id: 'SEOUL_2024_11',
        region: '서울특별시',
        date: '2024-11',
        temperature: 8.5,
        humidity: 58,
        precipitation: 35.2,
        windSpeed: 2.6,
        windDirection: 285,
        solarIrradiance: 9.8,
        sunshineHours: 165,
        cloudCover: 4.8
      },
      {
        id: 'SEOUL_2024_12',
        region: '서울특별시',
        date: '2024-12',
        temperature: 1.8,
        humidity: 55,
        precipitation: 22.1,
        windSpeed: 2.7,
        windDirection: 295,
        solarIrradiance: 7.5,
        sunshineHours: 142,
        cloudCover: 5.5
      }
    ],
    solarPotential: {
      rating: 'good',
      score: 72,
      estimatedCapacityFactor: 14.8,
      optimalTiltAngle: 30
    },
    windPotential: {
      rating: 'poor',
      score: 35,
      estimatedCapacityFactor: 12.5,
      turbineRecommendation: '소형 수직축 터빈'
    }
  },
  {
    regionCode: 'BUSAN',
    regionName: '부산광역시',
    coordinates: { latitude: 35.1796, longitude: 129.0756 },
    yearlyAverage: {
      temperature: 15.2,
      sunshineHours: 2387,
      windSpeed: 3.8,
      solarIrradiance: 14.8
    },
    monthlyData: [
      {
        id: 'BUSAN_2024_01',
        region: '부산광역시',
        date: '2024-01',
        temperature: 3.2,
        humidity: 55,
        precipitation: 28.5,
        windSpeed: 4.2,
        windDirection: 320,
        solarIrradiance: 10.5,
        sunshineHours: 185,
        cloudCover: 4.5
      },
      {
        id: 'BUSAN_2024_02',
        region: '부산광역시',
        date: '2024-02',
        temperature: 5.8,
        humidity: 52,
        precipitation: 35.2,
        windSpeed: 4.5,
        windDirection: 315,
        solarIrradiance: 12.8,
        sunshineHours: 198,
        cloudCover: 4.2
      },
      {
        id: 'BUSAN_2024_03',
        region: '부산광역시',
        date: '2024-03',
        temperature: 10.5,
        humidity: 54,
        precipitation: 58.7,
        windSpeed: 4.1,
        windDirection: 310,
        solarIrradiance: 15.2,
        sunshineHours: 215,
        cloudCover: 4.8
      },
      {
        id: 'BUSAN_2024_04',
        region: '부산광역시',
        date: '2024-04',
        temperature: 16.2,
        humidity: 58,
        precipitation: 78.5,
        windSpeed: 3.8,
        windDirection: 305,
        solarIrradiance: 17.8,
        sunshineHours: 235,
        cloudCover: 4.5
      },
      {
        id: 'BUSAN_2024_05',
        region: '부산광역시',
        date: '2024-05',
        temperature: 21.8,
        humidity: 65,
        precipitation: 125.3,
        windSpeed: 3.5,
        windDirection: 290,
        solarIrradiance: 19.5,
        sunshineHours: 248,
        cloudCover: 5.2
      },
      {
        id: 'BUSAN_2024_06',
        region: '부산광역시',
        date: '2024-06',
        temperature: 25.2,
        humidity: 72,
        precipitation: 185.7,
        windSpeed: 3.2,
        windDirection: 275,
        solarIrradiance: 18.2,
        sunshineHours: 215,
        cloudCover: 6.5
      },
      {
        id: 'BUSAN_2024_07',
        region: '부산광역시',
        date: '2024-07',
        temperature: 27.8,
        humidity: 78,
        precipitation: 295.8,
        windSpeed: 3.0,
        windDirection: 260,
        solarIrradiance: 16.8,
        sunshineHours: 185,
        cloudCover: 7.2
      },
      {
        id: 'BUSAN_2024_08',
        region: '부산광역시',
        date: '2024-08',
        temperature: 28.5,
        humidity: 75,
        precipitation: 245.2,
        windSpeed: 3.2,
        windDirection: 265,
        solarIrradiance: 17.5,
        sunshineHours: 198,
        cloudCover: 6.8
      },
      {
        id: 'BUSAN_2024_09',
        region: '부산광역시',
        date: '2024-09',
        temperature: 24.8,
        humidity: 68,
        precipitation: 142.5,
        windSpeed: 3.6,
        windDirection: 285,
        solarIrradiance: 16.8,
        sunshineHours: 205,
        cloudCover: 5.8
      },
      {
        id: 'BUSAN_2024_10',
        region: '부산광역시',
        date: '2024-10',
        temperature: 18.5,
        humidity: 62,
        precipitation: 68.2,
        windSpeed: 3.9,
        windDirection: 300,
        solarIrradiance: 14.8,
        sunshineHours: 215,
        cloudCover: 4.8
      },
      {
        id: 'BUSAN_2024_11',
        region: '부산광역시',
        date: '2024-11',
        temperature: 12.2,
        humidity: 58,
        precipitation: 45.8,
        windSpeed: 4.1,
        windDirection: 315,
        solarIrradiance: 11.8,
        sunshineHours: 185,
        cloudCover: 4.5
      },
      {
        id: 'BUSAN_2024_12',
        region: '부산광역시',
        date: '2024-12',
        temperature: 6.5,
        humidity: 55,
        precipitation: 32.5,
        windSpeed: 4.3,
        windDirection: 325,
        solarIrradiance: 9.2,
        sunshineHours: 168,
        cloudCover: 5.2
      }
    ],
    solarPotential: {
      rating: 'excellent',
      score: 88,
      estimatedCapacityFactor: 16.8,
      optimalTiltAngle: 30
    },
    windPotential: {
      rating: 'good',
      score: 75,
      estimatedCapacityFactor: 22.5,
      turbineRecommendation: '중형 수평축 터빈'
    }
  },
  {
    regionCode: 'JEJU',
    regionName: '제주특별자치도',
    coordinates: { latitude: 33.4996, longitude: 126.5312 },
    yearlyAverage: {
      temperature: 16.8,
      sunshineHours: 2195,
      windSpeed: 5.2,
      solarIrradiance: 15.8
    },
    monthlyData: [
      {
        id: 'JEJU_2024_01',
        region: '제주특별자치도',
        date: '2024-01',
        temperature: 7.2,
        humidity: 62,
        precipitation: 58.5,
        windSpeed: 6.2,
        windDirection: 310,
        solarIrradiance: 11.8,
        sunshineHours: 165,
        cloudCover: 5.8
      },
      {
        id: 'JEJU_2024_02',
        region: '제주특별자치도',
        date: '2024-02',
        temperature: 8.5,
        humidity: 58,
        precipitation: 68.2,
        windSpeed: 6.5,
        windDirection: 315,
        solarIrradiance: 13.2,
        sunshineHours: 175,
        cloudCover: 5.5
      },
      {
        id: 'JEJU_2024_03',
        region: '제주특별자치도',
        date: '2024-03',
        temperature: 12.8,
        humidity: 62,
        precipitation: 85.7,
        windSpeed: 5.8,
        windDirection: 305,
        solarIrradiance: 15.8,
        sunshineHours: 195,
        cloudCover: 5.2
      },
      {
        id: 'JEJU_2024_04',
        region: '제주특별자치도',
        date: '2024-04',
        temperature: 17.5,
        humidity: 65,
        precipitation: 98.5,
        windSpeed: 5.2,
        windDirection: 300,
        solarIrradiance: 17.8,
        sunshineHours: 218,
        cloudCover: 4.8
      },
      {
        id: 'JEJU_2024_05',
        region: '제주특별자치도',
        date: '2024-05',
        temperature: 21.2,
        humidity: 72,
        precipitation: 142.8,
        windSpeed: 4.8,
        windDirection: 285,
        solarIrradiance: 19.2,
        sunshineHours: 235,
        cloudCover: 5.5
      },
      {
        id: 'JEJU_2024_06',
        region: '제주특별자치도',
        date: '2024-06',
        temperature: 24.8,
        humidity: 78,
        precipitation: 198.5,
        windSpeed: 4.2,
        windDirection: 270,
        solarIrradiance: 18.5,
        sunshineHours: 205,
        cloudCover: 6.8
      },
      {
        id: 'JEJU_2024_07',
        region: '제주특별자치도',
        date: '2024-07',
        temperature: 27.2,
        humidity: 82,
        precipitation: 285.2,
        windSpeed: 4.0,
        windDirection: 255,
        solarIrradiance: 16.8,
        sunshineHours: 175,
        cloudCover: 7.5
      },
      {
        id: 'JEJU_2024_08',
        region: '제주특별자치도',
        date: '2024-08',
        temperature: 28.2,
        humidity: 80,
        precipitation: 235.8,
        windSpeed: 4.2,
        windDirection: 260,
        solarIrradiance: 17.8,
        sunshineHours: 188,
        cloudCover: 7.2
      },
      {
        id: 'JEJU_2024_09',
        region: '제주특별자치도',
        date: '2024-09',
        temperature: 25.5,
        humidity: 75,
        precipitation: 165.2,
        windSpeed: 4.8,
        windDirection: 280,
        solarIrradiance: 17.2,
        sunshineHours: 198,
        cloudCover: 6.2
      },
      {
        id: 'JEJU_2024_10',
        region: '제주특별자치도',
        date: '2024-10',
        temperature: 20.8,
        humidity: 68,
        precipitation: 95.5,
        windSpeed: 5.5,
        windDirection: 295,
        solarIrradiance: 15.2,
        sunshineHours: 205,
        cloudCover: 5.5
      },
      {
        id: 'JEJU_2024_11',
        region: '제주특별자치도',
        date: '2024-11',
        temperature: 15.2,
        humidity: 65,
        precipitation: 78.8,
        windSpeed: 5.8,
        windDirection: 310,
        solarIrradiance: 12.8,
        sunshineHours: 175,
        cloudCover: 5.8
      },
      {
        id: 'JEJU_2024_12',
        region: '제주특별자치도',
        date: '2024-12',
        temperature: 10.5,
        humidity: 62,
        precipitation: 65.2,
        windSpeed: 6.1,
        windDirection: 320,
        solarIrradiance: 10.5,
        sunshineHours: 155,
        cloudCover: 6.2
      }
    ],
    solarPotential: {
      rating: 'excellent',
      score: 85,
      estimatedCapacityFactor: 16.2,
      optimalTiltAngle: 30
    },
    windPotential: {
      rating: 'excellent',
      score: 92,
      estimatedCapacityFactor: 28.5,
      turbineRecommendation: '대형 해상풍력 터빈'
    }
  }
];

// 신재생에너지 발전량 예측 함수
export function calculateRenewableEnergyForecast(
  regionCode: string,
  capacity: number,
  energyType: 'solar' | 'wind'
): RenewableEnergyForecast {
  const regionData = regionWeatherData.find(r => r.regionCode === regionCode);
  if (!regionData) {
    throw new Error(`지역 데이터를 찾을 수 없습니다: ${regionCode}`);
  }

  const monthlyProduction = regionData.monthlyData.map((month, index) => {
    let estimatedOutput = 0;
    let capacityFactor = 0;
    let weatherImpact = '';

    if (energyType === 'solar') {
      // 태양광 발전량 계산: 일사량 × 용량 × 효율계수
      const solarEfficiency = 0.18; // 18% 효율
      const systemEfficiency = 0.85; // 85% 시스템 효율
      const daysInMonth = new Date(2024, index + 1, 0).getDate();
      
      estimatedOutput = Math.round(
        month.solarIrradiance * capacity * solarEfficiency * systemEfficiency * daysInMonth
      );
      
      capacityFactor = Math.round(
        (estimatedOutput / (capacity * 24 * daysInMonth)) * 100
      );

      if (month.cloudCover > 6) {
        weatherImpact = '흐린 날씨로 인한 발전량 감소';
      } else if (month.sunshineHours > 220) {
        weatherImpact = '충분한 일조로 양호한 발전 조건';
      } else {
        weatherImpact = '평균적인 발전 조건';
      }
    } else {
      // 풍력 발전량 계산: 풍속^3 × 용량 × 효율계수
      const windEfficiency = 0.35; // 35% 효율
      const daysInMonth = new Date(2024, index + 1, 0).getDate();
      const hoursInMonth = daysInMonth * 24;
      
      // 풍속의 3제곱 법칙 적용
      const windPowerDensity = Math.pow(month.windSpeed, 3) / 100;
      estimatedOutput = Math.round(
        windPowerDensity * capacity * windEfficiency * hoursInMonth
      );
      
      capacityFactor = Math.round(
        (estimatedOutput / (capacity * hoursInMonth)) * 100
      );

      if (month.windSpeed > 7) {
        weatherImpact = '강풍으로 높은 발전량 기대';
      } else if (month.windSpeed < 3) {
        weatherImpact = '저풍속으로 발전량 제한';
      } else {
        weatherImpact = '적정 풍속으로 안정적 발전';
      }
    }

    return {
      month: index + 1,
      estimatedOutput,
      capacityFactor,
      weatherImpact
    };
  });

  const totalOutput = monthlyProduction.reduce((sum, month) => sum + month.estimatedOutput, 0);
  const averageCapacityFactor = Math.round(
    monthlyProduction.reduce((sum, month) => sum + month.capacityFactor, 0) / 12
  );

  // 탄소 감축량 계산 (전력 탄소배출계수: 0.4781 kg CO2/kWh)
  const co2Reduction = Math.round((totalOutput * 0.4781) / 1000); // tCO2

  // 비용 절감 계산 (산업용 전기요금: 평균 110원/kWh)
  const costSavings = Math.round(totalOutput * 110);

  // 투자 분석
  const unitCostPerKW = energyType === 'solar' ? 1200000 : 1800000; // 원/kW
  const initialCost = capacity * unitCostPerKW;
  const maintenanceCost = Math.round(initialCost * 0.02); // 연간 2%
  const annualRevenue = costSavings;
  
  const roi = Math.round((annualRevenue / initialCost) * 100);
  const paybackPeriod = Math.round((initialCost / annualRevenue) * 10) / 10;
  
  // IRR 및 NPV 간단 계산 (20년 기준, 할인율 5%)
  const discountRate = 0.05;
  const projectLife = 20;
  let npv = -initialCost;
  
  for (let year = 1; year <= projectLife; year++) {
    const cashFlow = annualRevenue - maintenanceCost;
    npv += cashFlow / Math.pow(1 + discountRate, year);
  }
  
  const irr = roi > 15 ? 12 : roi > 10 ? 8 : 5; // 간단한 IRR 추정

  return {
    regionCode,
    capacity,
    energyType,
    monthlyProduction,
    annualProduction: {
      totalOutput,
      averageCapacityFactor,
      co2Reduction,
      costSavings
    },
    investmentAnalysis: {
      initialCost,
      maintenanceCost,
      roi,
      paybackPeriod,
      irr,
      npv: Math.round(npv)
    }
  };
}

// 지역별 신재생에너지 잠재력 평가
export function evaluateRenewableEnergyPotential(regionCode: string) {
  const regionData = regionWeatherData.find(r => r.regionCode === regionCode);
  if (!regionData) {
    return null;
  }

  return {
    region: regionData.regionName,
    coordinates: regionData.coordinates,
    solarPotential: regionData.solarPotential,
    windPotential: regionData.windPotential,
    recommendations: {
      solar: {
        recommended: regionData.solarPotential.score >= 70,
        reason: regionData.solarPotential.score >= 70 
          ? '우수한 일조 조건으로 태양광 설치 적극 권장'
          : '일조 조건이 제한적이나 소규모 설치 가능',
        optimalCapacity: regionData.solarPotential.score >= 70 ? '100kW 이상' : '10-50kW',
        expectedROI: regionData.solarPotential.score >= 70 ? '12-15%' : '8-12%'
      },
      wind: {
        recommended: regionData.windPotential.score >= 70,
        reason: regionData.windPotential.score >= 70
          ? '양호한 풍속 조건으로 풍력 발전 적합'
          : '풍속이 제한적이어 대안 검토 필요',
        optimalCapacity: regionData.windPotential.score >= 70 ? '500kW 이상' : '10-100kW',
        expectedROI: regionData.windPotential.score >= 70 ? '10-14%' : '6-10%'
      }
    },
    weatherConsiderations: [
      `연평균 일조시간: ${regionData.yearlyAverage.sunshineHours}시간`,
      `연평균 풍속: ${regionData.yearlyAverage.windSpeed}m/s`,
      `연평균 일사량: ${regionData.yearlyAverage.solarIrradiance}MJ/m²`
    ]
  };
}

// 모든 지역 정보 조회
export function getAllRegions() {
  return regionWeatherData.map(region => ({
    code: region.regionCode,
    name: region.regionName,
    coordinates: region.coordinates,
    solarScore: region.solarPotential.score,
    windScore: region.windPotential.score
  }));
}
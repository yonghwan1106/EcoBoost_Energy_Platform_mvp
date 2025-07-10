import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="h-6 w-6 text-green-600" />
              <span className="text-lg font-bold text-gray-900">
                EcoBoost Energy Platform
              </span>
            </div>
            <p className="text-gray-600 max-w-md">
              산업통상자원부 공공데이터를 활용한 중소기업 에너지 효율화 플랫폼입니다.
              에너지 사용량 분석과 신재생에너지 잠재력 평가를 통해 비용 절감을 지원합니다.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              연락처
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>개발자: 박용환</p>
              <p>이메일: sanoramyun8@gmail.com</p>
              <p>개발 기간: 2025.07.09 ~ 2025.07.30</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © 2025 EcoBoost Energy Platform. 산업통상자원부 공공데이터 활용 MVP.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-4 text-sm text-gray-500">
              <span>데이터 출처: 공공데이터포털</span>
              <span>•</span>
              <span>한국에너지공단</span>
              <span>•</span>
              <span>한국전력공사</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
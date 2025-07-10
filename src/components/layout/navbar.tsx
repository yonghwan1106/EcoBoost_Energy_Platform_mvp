"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900">
                EcoBoost
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="text-gray-900 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                대시보드
              </Link>
              <Link
                href="/analysis"
                className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                에너지 분석
              </Link>
              <Link
                href="/potential"
                className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                신재생에너지
              </Link>
              <Link
                href="/cost-calculator"
                className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                비용 계산기
              </Link>
              <Link
                href="/esg-calculator"
                className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                ESG 평가
              </Link>
              <Link
                href="/support-programs"
                className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                지원사업
              </Link>
              <Link
                href="/report"
                className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                보고서
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/"
                className="text-gray-900 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                대시보드
              </Link>
              <Link
                href="/analysis"
                className="text-gray-600 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                에너지 분석
              </Link>
              <Link
                href="/potential"
                className="text-gray-600 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                신재생에너지
              </Link>
              <Link
                href="/cost-calculator"
                className="text-gray-600 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                비용 계산기
              </Link>
              <Link
                href="/esg-calculator"
                className="text-gray-600 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                ESG 평가
              </Link>
              <Link
                href="/support-programs"
                className="text-gray-600 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                지원사업
              </Link>
              <Link
                href="/report"
                className="text-gray-600 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                보고서
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
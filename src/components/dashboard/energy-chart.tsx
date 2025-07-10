"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface EnergyChartProps {
  data: Array<{
    name: string;
    electricity: number;
    gas: number;
    cost?: number;
  }>;
  type?: 'bar' | 'line';
  height?: number;
  showCost?: boolean;
}

export default function EnergyChart({ 
  data, 
  height = 300, 
  showCost = false 
}: EnergyChartProps) {
  const formatTooltip = (value: number, name: string) => {
    if (name === 'cost') {
      return [`₩${value.toLocaleString()}`, '비용'];
    }
    if (name === 'electricity') {
      return [`${value.toLocaleString()} kWh`, '전력'];
    }
    if (name === 'gas') {
      return [`${value.toLocaleString()} m³`, '가스'];
    }
    return [value.toLocaleString(), name];
  };

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
            formatter={formatTooltip}
            labelStyle={{ color: '#374151' }}
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend />
          <Bar 
            dataKey="electricity" 
            fill="#10b981" 
            name="전력 (kWh)"
            radius={[2, 2, 0, 0]}
          />
          <Bar 
            dataKey="gas" 
            fill="#3b82f6" 
            name="가스 (m³)"
            radius={[2, 2, 0, 0]}
          />
          {showCost && (
            <Bar 
              dataKey="cost" 
              fill="#f59e0b" 
              name="비용 (원)"
              radius={[2, 2, 0, 0]}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
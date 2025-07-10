import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'green' | 'blue' | 'yellow' | 'red' | 'purple';
}

export default function StatsCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend,
  color = 'green' 
}: StatsCardProps) {
  const colorClasses = {
    green: {
      bg: 'bg-green-50',
      icon: 'text-green-600',
      value: 'text-green-700',
      trend: 'text-green-600'
    },
    blue: {
      bg: 'bg-blue-50',
      icon: 'text-blue-600',
      value: 'text-blue-700',
      trend: 'text-blue-600'
    },
    yellow: {
      bg: 'bg-yellow-50',
      icon: 'text-yellow-600',
      value: 'text-yellow-700',
      trend: 'text-yellow-600'
    },
    red: {
      bg: 'bg-red-50',
      icon: 'text-red-600',
      value: 'text-red-700',
      trend: 'text-red-600'
    },
    purple: {
      bg: 'bg-purple-50',
      icon: 'text-purple-600',
      value: 'text-purple-700',
      trend: 'text-purple-600'
    }
  };

  const classes = colorClasses[color];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-full ${classes.bg}`}>
          <Icon className={`h-4 w-4 ${classes.icon}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${classes.value} mb-1`}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        {description && (
          <p className="text-xs text-gray-500 mb-2">
            {description}
          </p>
        )}
        {trend && (
          <div className="flex items-center space-x-1">
            <span className={`text-xs ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
            </span>
            <span className="text-xs text-gray-500">
              지난 달 대비
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
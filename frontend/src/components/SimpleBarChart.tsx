import React from 'react';

interface SimpleBarChartProps {
  data: Array<{
    label: string;
    value: number;
    color?: string;
  }>;
  title?: string;
  maxValue?: number;
}

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ 
  data, 
  title, 
  maxValue 
}) => {
  const max = maxValue || Math.max(...data.map(d => d.value));

  return (
    <div className="w-full">
      {title && (
        <h4 className="text-lg font-semibold text-gray-900 mb-4">{title}</h4>
      )}
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-32 text-sm font-medium text-gray-700 truncate">
              {item.label}
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    item.color || 'bg-blue-500'
                  }`}
                  style={{ width: `${(item.value / max) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="w-16 text-sm text-gray-600 text-right">
              {typeof item.value === 'number' ? item.value.toFixed(2) : item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleBarChart;
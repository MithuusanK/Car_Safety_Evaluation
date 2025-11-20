import React from 'react';
import { ModelMetrics, ModelComparison, FeatureImportance } from '../types';
import { formatPercentage } from '../utils/helpers';

interface ModelMetricsDisplayProps {
  metrics: ModelMetrics | null;
  featureImportances: FeatureImportance[] | null;
  modelComparisons: ModelComparison[] | null;
  currentModel: string;
  loading: boolean;
}

const ModelMetricsDisplay: React.FC<ModelMetricsDisplayProps> = ({
  metrics,
  featureImportances,
  modelComparisons,
  currentModel,
  loading
}) => {
  if (loading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <span className="ml-3 text-lg text-gray-600">Loading model metrics...</span>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="card">
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No metrics available</h3>
          <p className="mt-1 text-sm text-gray-500">Model performance metrics will appear here once loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Model Performance */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Model Performance: {currentModel}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {formatPercentage(metrics.accuracy)}
            </div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {formatPercentage(metrics.precision)}
            </div>
            <div className="text-sm text-gray-600">Precision</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {formatPercentage(metrics.recall)}
            </div>
            <div className="text-sm text-gray-600">Recall</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {formatPercentage(metrics.f1Score)}
            </div>
            <div className="text-sm text-gray-600">F1-Score</div>
          </div>
        </div>
      </div>

      {/* Feature Importance */}
      {featureImportances && (
        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Feature Importance</h3>
          <div className="space-y-3">
            {featureImportances.map((item, index) => (
              <div key={item.feature} className="flex items-center">
                <div className="w-32 text-sm font-medium text-gray-700 capitalize">
                  {item.feature.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                      style={{ width: `${(item.importance / Math.max(...featureImportances.map(f => f.importance))) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16 text-sm text-gray-600 text-right">
                  {(item.importance * 100).toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Confusion Matrix */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Confusion Matrix</h3>
        <div className="overflow-x-auto">
          <ConfusionMatrix matrix={metrics.confusionMatrix} />
        </div>
      </div>

      {/* Model Comparison */}
      {modelComparisons && (
        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Model Comparison</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Model
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Accuracy
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precision
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recall
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    F1-Score
                  </th>
                  {modelComparisons.some(m => m.trainingTime) && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Training Time (s)
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {modelComparisons.map((model, index) => (
                  <tr key={model.modelName} className={model.modelName === currentModel ? 'bg-blue-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {model.modelName}
                      {model.modelName === currentModel && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Current
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatPercentage(model.accuracy)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatPercentage(model.precision)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatPercentage(model.recall)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatPercentage(model.f1Score)}
                    </td>
                    {model.trainingTime && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {model.trainingTime.toFixed(3)}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const ConfusionMatrix: React.FC<{ matrix: number[][] }> = ({ matrix }) => {
  const classes = ['Unacceptable', 'Acceptable', 'Good', 'Very Good'];
  const maxValue = Math.max(...matrix.flat());

  return (
    <div className="inline-block">
      <div className="text-sm text-gray-600 mb-2">Predicted →</div>
      <div className="flex">
        <div className="flex flex-col justify-center mr-2">
          <div className="text-sm text-gray-600 mb-2 -rotate-90 whitespace-nowrap">Actual ↓</div>
        </div>
        <div>
          <div className="grid grid-cols-4 gap-1 mb-2">
            {classes.map((cls, i) => (
              <div key={i} className="w-20 text-xs text-center text-gray-600 truncate">
                {cls}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-1">
            {matrix.map((row, i) =>
              row.map((value, j) => (
                <div
                  key={`${i}-${j}`}
                  className={`w-20 h-16 flex items-center justify-center text-sm font-medium rounded ${
                    i === j 
                      ? 'bg-green-100 text-green-800' 
                      : value > 0 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-gray-50 text-gray-600'
                  }`}
                  style={{
                    opacity: value === 0 ? 0.5 : 0.5 + (value / maxValue) * 0.5
                  }}
                >
                  {value}
                </div>
              ))
            )}
          </div>
          <div className="grid grid-cols-4 gap-1 mt-2">
            {classes.map((cls, i) => (
              <div key={i} className="w-20 text-xs text-center text-gray-600 truncate">
                {cls}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelMetricsDisplay;
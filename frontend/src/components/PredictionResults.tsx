import React from 'react';
import { PredictionResult } from '../types';
import { getClassDisplayName, getClassColor, formatConfidence } from '../utils/helpers';

interface PredictionResultsProps {
  result: PredictionResult | null;
  loading: boolean;
}

const PredictionResults: React.FC<PredictionResultsProps> = ({ result, loading }) => {
  if (loading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <span className="ml-3 text-lg text-gray-600">Analyzing car features...</span>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="card">
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No prediction yet</h3>
          <p className="mt-1 text-sm text-gray-500">Fill out the car features form to get a safety prediction.</p>
        </div>
      </div>
    );
  }

  const { prediction, confidence, probabilities } = result;

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Prediction Results</h2>
      
      {/* Main Prediction */}
      <div className="mb-8">
        <div className="text-center">
          <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold ${getClassColor(prediction)}`}>
            {getClassDisplayName(prediction)}
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Confidence: <span className="font-semibold">{formatConfidence(confidence)}</span>
          </p>
        </div>
      </div>

      {/* Probability Breakdown */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Probability Breakdown</h3>
        <div className="space-y-3">
          {Object.entries(probabilities).map(([classValue, probability]) => (
            <div key={classValue} className="flex items-center">
              <div className="w-24 text-sm font-medium text-gray-700">
                {getClassDisplayName(classValue)}
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      classValue === prediction ? 'bg-primary-600' : 'bg-gray-400'
                    }`}
                    style={{ width: `${probability * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-16 text-sm text-gray-600 text-right">
                {formatConfidence(probability)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interpretation */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Interpretation</h4>
        <p className="text-sm text-gray-700">
          {getInterpretation(prediction, confidence)}
        </p>
      </div>
    </div>
  );
};

const getInterpretation = (prediction: string, confidence: number): string => {
  const confidenceLevel = confidence > 0.8 ? 'high' : confidence > 0.6 ? 'moderate' : 'low';
  
  const interpretations = {
    'unacc': {
      high: 'The model is very confident that this car configuration is unacceptable. Consider improving safety features, reducing costs, or adjusting other parameters.',
      moderate: 'The model suggests this car configuration is likely unacceptable, but there is some uncertainty. Review the feature values for potential improvements.',
      low: 'The model leans towards classifying this as unacceptable, but the confidence is low. The car may be borderline between categories.'
    },
    'acc': {
      high: 'The model is confident this car configuration is acceptable. It meets basic requirements but may not excel in any particular area.',
      moderate: 'The model suggests this car configuration is likely acceptable, with reasonable confidence in this assessment.',
      low: 'The model leans towards acceptable but with low confidence. The configuration may be close to other categories.'
    },
    'good': {
      high: 'The model is very confident this car configuration is good. It likely offers a nice balance of features, safety, and value.',
      moderate: 'The model suggests this car configuration is likely good, representing solid value and features.',
      low: 'The model leans towards classifying this as good, but the confidence is moderate. Some features may be borderline.'
    },
    'vgood': {
      high: 'The model is very confident this car configuration is very good. It likely excels in safety, features, and overall value proposition.',
      moderate: 'The model suggests this car configuration is likely very good, with strong performance across multiple dimensions.',
      low: 'The model leans towards very good but with some uncertainty. The configuration may be close to the good category.'
    }
  };

  return interpretations[prediction as keyof typeof interpretations]?.[confidenceLevel as keyof typeof interpretations['unacc']] || 
         'The model has made a prediction, but the interpretation is unclear.';
};

export default PredictionResults;
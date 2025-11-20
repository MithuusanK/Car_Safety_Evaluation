import React, { useState, useEffect } from 'react';
import CarFeatureForm from '../components/CarFeatureForm';
import PredictionResults from '../components/PredictionResults';
import ModelMetricsDisplay from '../components/ModelMetricsDisplay';
import ModelSelector from '../components/ModelSelector';
import { CarSafetyAPI } from '../services/api';
import { CarFeatures, PredictionResult, ModelMetrics, FeatureImportance, ModelComparison, LoadingState } from '../types';

const HomePage: React.FC = () => {
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [metrics, setMetrics] = useState<ModelMetrics | null>(null);
  const [featureImportances, setFeatureImportances] = useState<FeatureImportance[] | null>(null);
  const [modelComparisons, setModelComparisons] = useState<ModelComparison[] | null>(null);
  const [currentModel, setCurrentModel] = useState<string>('Random Forest');
  const [loading, setLoading] = useState<LoadingState>({
    prediction: false,
    metrics: false
  });

  // Load metrics on component mount
  useEffect(() => {
    loadMetrics();
  }, []);

  const handlePrediction = async (features: CarFeatures) => {
    setLoading(prev => ({ ...prev, prediction: true }));
    
    try {
      const response = await CarSafetyAPI.predict(features);
      if (response.success) {
        setPredictionResult(response.data);
      } else {
        console.error('Prediction failed:', response.message);
        // Could add error handling UI here
      }
    } catch (error) {
      console.error('Prediction error:', error);
    } finally {
      setLoading(prev => ({ ...prev, prediction: false }));
    }
  };

  const loadMetrics = async () => {
    setLoading(prev => ({ ...prev, metrics: true }));
    
    try {
      const response = await CarSafetyAPI.getMetrics();
      if (response.success) {
        setMetrics(response.data.metrics);
        setFeatureImportances(response.data.featureImportances);
        setModelComparisons(response.data.modelComparisons);
        setCurrentModel(response.data.currentModel);
      } else {
        console.error('Failed to load metrics:', response.message);
      }
    } catch (error) {
      console.error('Metrics loading error:', error);
    } finally {
      setLoading(prev => ({ ...prev, metrics: false }));
    }
  };

  const handleModelChange = async (newModel: string) => {
    setCurrentModel(newModel);
    // Clear current prediction result when model changes
    setPredictionResult(null);
    // Reload metrics for the new model
    await loadMetrics();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Car Safety Evaluation
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                AI-powered car safety classification system
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Current Model:</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {currentModel}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input Form */}
          <div className="space-y-6">
            <ModelSelector 
              currentModel={currentModel}
              onModelChange={handleModelChange}
            />
            <CarFeatureForm 
              onSubmit={handlePrediction} 
              loading={loading.prediction}
            />
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            <PredictionResults 
              result={predictionResult} 
              loading={loading.prediction}
            />
          </div>
        </div>

        {/* Model Metrics Section */}
        <div className="mt-12">
          <ModelMetricsDisplay
            metrics={metrics}
            featureImportances={featureImportances}
            modelComparisons={modelComparisons}
            currentModel={currentModel}
            loading={loading.metrics}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>Car Safety Evaluation System - Built with React & TypeScript</p>
            <p className="mt-1">
              Based on machine learning models trained on car evaluation dataset
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
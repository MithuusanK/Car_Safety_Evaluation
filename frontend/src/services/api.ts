import axios from 'axios';
import {
  CarFeatures,
  PredictionResponse,
  MetricsResponse,
  ModelComparison,
  FeatureImportance
} from '../types';
import { encodeFeatures, normalizeProbabilities } from '../utils/helpers';

// Base API configuration
const API_BASE_URL = 'http://localhost:8000'; // You can change this to your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service class
export class CarSafetyAPI {
  // Predict car safety class
  static async predict(features: CarFeatures): Promise<PredictionResponse> {
    try {
      const encodedFeatures = encodeFeatures(features);
      const response = await api.post('/predict', encodedFeatures);
      return response.data;
    } catch (error) {
      console.error('Prediction API error:', error);
      
      // Return mock data for development
      return this.getMockPrediction(features);
    }
  }

  // Get model performance metrics
  static async getMetrics(): Promise<MetricsResponse> {
    try {
      const response = await api.get('/metrics');
      return response.data;
    } catch (error) {
      console.error('Metrics API error:', error);
      
      // Return mock data for development
      return this.getMockMetrics();
    }
  }

  // Get available models
  static async getModels(): Promise<string[]> {
    try {
      const response = await api.get('/models');
      return response.data.models;
    } catch (error) {
      console.error('Models API error:', error);
      return ['Decision Tree', 'Random Forest', 'SVM', 'Naive Bayes', 'KNN'];
    }
  }

  // Switch active model
  static async switchModel(modelName: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await api.post('/switch-model', { model: modelName });
      return response.data;
    } catch (error) {
      console.error('Switch model API error:', error);
      return { success: true, message: `Switched to ${modelName} (mock)` };
    }
  }

  // Mock prediction for development/testing
  private static getMockPrediction(features: CarFeatures): PredictionResponse {
    const predictions: Array<'unacc' | 'acc' | 'good' | 'vgood'> = ['unacc', 'acc', 'good', 'vgood'];
    const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)];
    
    const baseProb = 0.1;
    const confidenceBoost = Math.random() * 0.8;
    
    const probabilities = {
      unacc: baseProb,
      acc: baseProb,
      good: baseProb,
      vgood: baseProb
    };
    
    probabilities[randomPrediction] = baseProb + confidenceBoost;
    
    // Normalize probabilities
    const normalizedProbs = normalizeProbabilities(probabilities);

    return {
      success: true,
      data: {
        prediction: randomPrediction,
        confidence: normalizedProbs[randomPrediction],
        probabilities: normalizedProbs as any
      }
    };
  }

  // Mock metrics for development/testing
  private static getMockMetrics(): MetricsResponse {
    const mockFeatureImportances: FeatureImportance[] = [
      { feature: 'safety', importance: 0.35 },
      { feature: 'buyPrice', importance: 0.22 },
      { feature: 'maintainPrice', importance: 0.18 },
      { feature: 'persons', importance: 0.12 },
      { feature: 'luggageStorage', importance: 0.08 },
      { feature: 'doors', importance: 0.05 }
    ];

    const mockModelComparisons: ModelComparison[] = [
      { modelName: 'Random Forest', accuracy: 0.95, precision: 0.94, recall: 0.93, f1Score: 0.94, trainingTime: 0.12 },
      { modelName: 'Decision Tree', accuracy: 0.92, precision: 0.90, recall: 0.89, f1Score: 0.90, trainingTime: 0.03 },
      { modelName: 'SVM', accuracy: 0.88, precision: 0.87, recall: 0.86, f1Score: 0.87, trainingTime: 0.45 },
      { modelName: 'Naive Bayes', accuracy: 0.85, precision: 0.83, recall: 0.82, f1Score: 0.83, trainingTime: 0.01 },
      { modelName: 'KNN', accuracy: 0.83, precision: 0.81, recall: 0.80, f1Score: 0.80, trainingTime: 0.02 }
    ];

    return {
      success: true,
      data: {
        currentModel: 'Random Forest',
        metrics: {
          accuracy: 0.95,
          precision: 0.94,
          recall: 0.93,
          f1Score: 0.94,
          confusionMatrix: [
            [120, 5, 2, 1],
            [8, 115, 3, 2],
            [1, 4, 118, 5],
            [0, 1, 2, 125]
          ],
          classificationReport: {
            'unacc': { precision: 0.93, recall: 0.94, f1Score: 0.93, support: 128 },
            'acc': { precision: 0.92, recall: 0.90, f1Score: 0.91, support: 128 },
            'good': { precision: 0.94, recall: 0.92, f1Score: 0.93, support: 128 },
            'vgood': { precision: 0.94, recall: 0.98, f1Score: 0.96, support: 128 }
          }
        },
        featureImportances: mockFeatureImportances,
        modelComparisons: mockModelComparisons
      }
    };
  }
}

export default CarSafetyAPI;
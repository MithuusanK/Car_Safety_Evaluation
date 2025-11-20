import React, { useState, useEffect } from 'react';
import { CarSafetyAPI } from '../services/api';

interface ModelSelectorProps {
  currentModel: string;
  onModelChange: (model: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ currentModel, onModelChange }) => {
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    try {
      const models = await CarSafetyAPI.getModels();
      setAvailableModels(models);
    } catch (error) {
      console.error('Failed to load models:', error);
    }
  };

  const handleModelChange = async (modelName: string) => {
    if (modelName === currentModel) return;
    
    setLoading(true);
    try {
      const result = await CarSafetyAPI.switchModel(modelName);
      if (result.success) {
        onModelChange(modelName);
      }
    } catch (error) {
      console.error('Failed to switch model:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Model</h3>
      <div className="space-y-2">
        {availableModels.map((model) => (
          <button
            key={model}
            onClick={() => handleModelChange(model)}
            disabled={loading}
            className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
              model === currentModel
                ? 'bg-primary-50 border-primary-200 text-primary-800'
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{model}</span>
              {model === currentModel && (
                <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
              )}
            </div>
          </button>
        ))}
      </div>
      
      {loading && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center text-sm text-gray-600">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Switching model...
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelSelector;
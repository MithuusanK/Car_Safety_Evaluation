# Car Safety Evaluation Frontend

A modern React + TypeScript frontend application for car safety evaluation using machine learning models.

## 🚀 Features

- **Interactive Car Feature Input**: Easy-to-use form for inputting car characteristics
- **Real-time Predictions**: Get instant safety classifications with confidence scores
- **Model Performance Metrics**: View accuracy, precision, recall, F1-score, and confusion matrices
- **Feature Importance Visualization**: See which features matter most for predictions
- **Model Comparison**: Compare performance across different ML models
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Mock API Integration**: Includes mock data for development and testing

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Chart.js & Recharts** - Data visualization libraries

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## 🏗️ Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── CarFeatureForm.tsx
│   │   ├── PredictionResults.tsx
│   │   ├── ModelMetricsDisplay.tsx
│   │   └── ModelSelector.tsx
│   ├── pages/               # Page components
│   │   └── HomePage.tsx
│   ├── services/            # API service layer
│   │   └── api.ts
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/               # Utility functions
│   │   └── helpers.ts
│   ├── App.tsx              # Main app component
│   ├── index.tsx            # App entry point
│   └── index.css            # Global styles
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── postcss.config.js
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start Development Server

```bash
npm start
```

The application will open at `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
```

## 🔌 API Integration

### Current Setup (Mock Data)

The application currently uses mock data for development. All API calls in `src/services/api.ts` will fall back to mock responses if the backend is not available.

### Connecting to Your Backend

To connect to a real backend API:

1. **Update API Base URL**:
   ```typescript
   // In src/services/api.ts
   const API_BASE_URL = 'http://your-backend-url:8000';
   ```

2. **Expected API Endpoints**:

   **POST /predict** - Get safety prediction
   ```json
   // Request body
   {
     "buyPrice": 0,      // 0=low, 1=med, 2=high, 3=vhigh
     "maintainPrice": 1,
     "doors": 4,         // 2, 3, 4, or 5
     "persons": 4,       // 2, 4, or 6 (more)
     "luggageStorage": 2, // 0=small, 1=med, 2=big
     "safety": 2         // 0=low, 1=med, 2=high
   }
   
   // Response
   {
     "success": true,
     "data": {
       "prediction": "vgood",
       "confidence": 0.95,
       "probabilities": {
         "unacc": 0.02,
         "acc": 0.01,
         "good": 0.02,
         "vgood": 0.95
       }
     }
   }
   ```

   **GET /metrics** - Get model performance metrics
   ```json
   {
     "success": true,
     "data": {
       "currentModel": "Random Forest",
       "metrics": {
         "accuracy": 0.95,
         "precision": 0.94,
         "recall": 0.93,
         "f1Score": 0.94,
         "confusionMatrix": [[120, 5, 2, 1], [8, 115, 3, 2], ...],
         "classificationReport": {...}
       },
       "featureImportances": [
         {"feature": "safety", "importance": 0.35},
         {"feature": "buyPrice", "importance": 0.22}
       ],
       "modelComparisons": [...]
     }
   }
   ```

   **GET /models** - Get available models
   ```json
   {
     "models": ["Decision Tree", "Random Forest", "SVM", "Naive Bayes", "KNN"]
   }
   ```

   **POST /switch-model** - Switch active model
   ```json
   // Request
   {"model": "Random Forest"}
   
   // Response
   {"success": true, "message": "Switched to Random Forest"}
   ```

## 🎨 Customization

### Styling

The app uses Tailwind CSS for styling. You can customize the design by:

1. **Modifying the Tailwind config**:
   ```javascript
   // tailwind.config.js
   module.exports = {
     theme: {
       extend: {
         colors: {
           primary: {
             // Your brand colors
           }
         }
       }
     }
   }
   ```

2. **Updating component styles**: All components use Tailwind classes and can be easily customized.

### Adding New Features

1. **New Input Fields**: Modify `CarFeatureForm.tsx` and update the `CarFeatures` type in `types/index.ts`

2. **Additional Metrics**: Extend the `ModelMetrics` type and update `ModelMetricsDisplay.tsx`

3. **New Visualizations**: Add chart components using Chart.js or Recharts

## 🧪 Development Tips

### Mock Data

The `src/services/api.ts` file includes comprehensive mock data generators:
- `getMockPrediction()` - Generates realistic prediction results
- `getMockMetrics()` - Creates sample model performance data

### Type Safety

All API responses and component props are fully typed. When adding new features:
1. Update types in `src/types/index.ts`
2. Update API service methods
3. Update component interfaces

### Error Handling

The app includes basic error handling. For production, consider adding:
- Toast notifications for errors
- Retry mechanisms for failed API calls
- Loading skeletons for better UX

## 🚀 Deployment

### Development
```bash
npm start
```

### Production Build
```bash
npm run build
```

The build files will be in the `build/` directory, ready for deployment to any static hosting service.

### Docker Deployment
```dockerfile
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **"Cannot find module 'react'"**
   ```bash
   npm install react react-dom @types/react @types/react-dom
   ```

2. **Tailwind styles not loading**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   ```

3. **API connection issues**
   - Check the API_BASE_URL in `src/services/api.ts`
   - Verify CORS settings on your backend
   - Check browser network tab for request details

### Performance Optimization

- Use React.memo() for expensive components
- Implement proper loading states
- Consider using React Query for better API state management
- Add proper error boundaries

---

## 🔗 Next Steps

1. **Connect to Backend**: Replace mock API calls with real endpoints
2. **Add Authentication**: Implement user login/logout if needed  
3. **Enhanced Visualizations**: Add more charts and graphs
4. **Real-time Updates**: Add WebSocket support for live predictions
5. **Mobile App**: Consider React Native version
6. **Testing**: Add unit and integration tests
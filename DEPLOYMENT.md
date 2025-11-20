# Car Safety Evaluation - GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages.

## 🚀 Deployment Methods

### Method 1: Automatic Deployment (Recommended)
The site automatically deploys when you push to the `main` branch using GitHub Actions.

1. **Push your changes to GitHub:**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository settings on GitHub
   - Navigate to "Pages" in the left sidebar
   - Under "Source", select "Deploy from a branch"
   - Choose `gh-pages` branch and `/ (root)` folder
   - Click "Save"

3. **Your site will be available at:**
   `https://MithuusanK.github.io/Car_Safety_Evaluation`

### Method 2: Manual Deployment
If you want to deploy manually from your local machine:

```bash
cd frontend
npm run deploy
```

## 🔧 Configuration

- **Homepage URL**: Set in `package.json` as `https://MithuusanK.github.io/Car_Safety_Evaluation`
- **Build folder**: `frontend/build`
- **GitHub Actions**: Configured in `.github/workflows/deploy.yml`

## 📁 Project Structure
```
Car_Safety_Evaluation/
├── .github/workflows/deploy.yml  # GitHub Actions workflow
├── frontend/
│   ├── public/.nojekyll          # Prevents Jekyll processing
│   ├── package.json              # Contains deployment config
│   └── ...
└── README.md
```

## 🛠️ Local Development
```bash
cd frontend
npm start
```

## 🏗️ Build for Production
```bash
cd frontend
npm run build
```

The build folder will contain the optimized production files ready for deployment.

## 🔍 Troubleshooting

### If deployment fails:
1. Check GitHub Actions logs in the "Actions" tab of your repository
2. Ensure you have enabled GitHub Pages in repository settings
3. Verify the `homepage` field in `package.json` matches your repository name
4. Make sure the `gh-pages` branch exists and is selected in Pages settings

### For routing issues:
Since this is a single-page application, GitHub Pages might have issues with client-side routing. The current setup should handle this correctly with the `.nojekyll` file.
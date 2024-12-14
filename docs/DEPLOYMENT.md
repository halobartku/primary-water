# Deployment Guide

This guide covers the deployment process, environment configuration, and monitoring setup for the Primary Water website.

## Deployment Platforms

The project is primarily configured for deployment on Vercel, but can be deployed to other platforms with proper configuration.

### Vercel Deployment

#### Initial Setup

1. Connect GitHub Repository:
   - Go to [Vercel](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Follow the prompts to connect

2. Configure Project:
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login to Vercel
   vercel login

   # Link project
   vercel link
   ```

3. Environment Variables:
   - Navigate to Project Settings > Environment Variables
   - Add required variables:
     ```
     VITE_API_URL=https://api.example.com
     VITE_ANALYTICS_ID=UA-XXXXXXXXX-X
     ```

#### Deployment Configuration

`vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

#### Deployment Process

1. Automatic Deployments:
   - Push to main branch triggers production deployment
   - Pull requests create preview deployments

2. Manual Deployment:
   ```bash
   # Deploy to production
   vercel --prod

   # Create preview deployment
   vercel
   ```

### Alternative Deployment Options

#### Netlify

1. Configuration (`netlify.toml`):
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. Deployment:
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Deploy
   netlify deploy --prod
   ```

#### Docker Deployment

1. Dockerfile:
   ```dockerfile
   # Build stage
   FROM node:18-alpine as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build

   # Production stage
   FROM nginx:alpine
   COPY --from=build /app/dist /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/conf.d/default.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. Build and Run:
   ```bash
   docker build -t primary-water .
   docker run -p 80:80 primary-water
   ```

## Environment Configuration

### Environment Variables

1. Development (`.env.development`):
   ```env
   VITE_API_URL=http://localhost:3000
   VITE_ANALYTICS_ID=development
   ```

2. Production (`.env.production`):
   ```env
   VITE_API_URL=https://api.production.com
   VITE_ANALYTICS_ID=UA-XXXXXXXXX-X
   ```

3. Testing (`.env.test`):
   ```env
   VITE_API_URL=http://localhost:3000
   VITE_ANALYTICS_ID=testing
   ```

### Build Configuration

`vite.config.ts`:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animations: ['framer-motion']
        }
      }
    }
  },
  server: {
    port: 5173,
    strictPort: true
  }
});
```

## Monitoring and Analytics

### Vercel Speed Insights

1. Installation:
   ```bash
   npm install @vercel/speed-insights
   ```

2. Implementation:
   ```typescript
   import { SpeedInsights } from '@vercel/speed-insights/react';

   function App() {
     return (
       <>
         <MainContent />
         <SpeedInsights />
       </>
     );
   }
   ```

### Error Monitoring

#### Sentry Setup

1. Installation:
   ```bash
   npm install @sentry/react
   ```

2. Configuration:
   ```typescript
   import * as Sentry from "@sentry/react";

   Sentry.init({
     dsn: "your-sentry-dsn",
     environment: process.env.NODE_ENV,
     integrations: [
       new Sentry.BrowserTracing()
     ],
     tracesSampleRate: 1.0
   });
   ```

### Performance Monitoring

1. Web Vitals:
   ```typescript
   import { onCLS, onFID, onLCP } from 'web-vitals';

   function reportWebVitals({ name, value }) {
     // Analytics implementation
     console.log(name, value);
   }

   onCLS(reportWebVitals);
   onFID(reportWebVitals);
   onLCP(reportWebVitals);
   ```

2. Custom Performance Metrics:
   ```typescript
   // Measure component render time
   const startTime = performance.now();
   // Component renders
   const endTime = performance.now();
   console.log(`Component render time: ${endTime - startTime}ms`);
   ```

## Security Considerations

### Headers Configuration

1. CSP Headers:
   ```typescript
   // next.config.js or similar
   {
     async headers() {
       return [
         {
           source: '/:path*',
           headers: [
             {
               key: 'Content-Security-Policy',
               value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
             }
           ]
         }
       ]
     }
   }
   ```

### SSL Configuration

1. Force HTTPS:
   ```typescript
   // Express middleware example
   app.use((req, res, next) => {
     if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
       return res.redirect(`https://${req.get('host')}${req.url}`);
     }
     next();
   });
   ```

## Backup and Recovery

### Automated Backups

1. GitHub Actions Workflow:
   ```yaml
   name: Backup
   on:
     schedule:
       - cron: '0 0 * * *'
   jobs:
     backup:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - name: Create Backup
           run: |
             zip -r backup.zip .
         - name: Upload Backup
           uses: actions/upload-artifact@v2
           with:
             name: site-backup
             path: backup.zip
   ```

## Maintenance

### Regular Tasks

1. Update Dependencies:
   ```bash
   # Check for updates
   npm outdated

   # Update dependencies
   npm update

   # Update major versions
   npx npm-check-updates -u
   ```

2. Performance Audits:
   ```bash
   # Run Lighthouse CI
   npm install -g @lhci/cli
   lhci autorun
   ```

### Troubleshooting

1. Common Issues:
   - Build failures
   - Performance degradation
   - Memory leaks
   - API connectivity issues

2. Debugging Tools:
   - Browser DevTools
   - Vercel Logs
   - Sentry Error Tracking
   - Performance Monitoring

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Web Vitals](https://web.dev/vitals/)
- [Security Headers](https://securityheaders.com)

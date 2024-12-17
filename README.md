# Primary Water | We Find Water Everywhere

A modern, interactive website for Primary Water Sp. z o. o., showcasing our expertise in finding sustainable water sources worldwide. Built with React, TypeScript, and Tailwind CSS.

## Features

- 🌊 Interactive water animation and game elements
- 📱 Fully responsive design for all devices
- 🎥 Video case studies from around the world
- 🔍 Detailed information about primary water
- 📊 Performance monitoring with Vercel Speed Insights
- 🔒 GDPR-compliant privacy preferences management
- 🌍 Global water stress visualization and metrics
- 🎮 Interactive water collection game
- 🗺️ Country-specific water data integration
- ⌨️ Enhanced keyboard navigation support

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Routing**: React Router v6 (with v7 future flags enabled)
- **Styling**: Tailwind CSS with PostCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Vercel
- **Performance Monitoring**: Vercel Speed Insights
- **External APIs**: World Bank Data Integration
- **Type Checking**: TypeScript with strict mode
- **Linting**: ESLint with custom configuration

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/halobartku/primary-water.git
   cd primary-water
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
primary-water/
├── docs/              # Project documentation
│   ├── COMPONENTS.md  # Components documentation
│   ├── DEPLOYMENT.md  # Deployment guide
│   ├── DEVELOPMENT.md # Development guidelines
│   └── TESTING.md     # Testing documentation
├── src/
│   ├── components/    # React components
│   ├── context/       # React context providers
│   ├── data/         # Static data and case studies
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility functions
│   ├── services/     # External API integrations
│   ├── types/        # TypeScript type definitions
│   └── utils/        # Helper functions
├── public/           # Static assets
└── dist/            # Production build output
```

## Key Components

### Core Components
- `App.tsx` - Main application component with routing and layout
- `Navigation.tsx` - Responsive navigation bar with desktop/mobile views
- `Footer.tsx` - Site-wide footer component
- `SEO.tsx` - Search engine optimization component
- `ErrorBoundary.tsx` - Error handling wrapper

### Water-Related Components
- `WaterCollector.tsx` - Interactive water collection game
- `WaterMetrics.tsx` - Display water-related statistics
- `WaterRiskAssessment.tsx` - Water risk analysis tool
- `WaterStressIndicator.tsx` - Visual indicator for water stress
- `WaterStressVisualization.tsx` - Geographic water stress data
- `WaterUsage.tsx` - Water usage tracking and metrics
- `WhatIsPrimaryWater.tsx` - Educational component about primary water

### Interactive Features
- `BackgroundAnimations.tsx` - Dynamic background effects
- `MouseAnimations.tsx` - Mouse-based animations
- `KeyboardInstructions.tsx` - Keyboard navigation guide
- `CountrySelector.tsx` - Geographic data selection
- `CaseStudyCard.tsx` - Project case study displays

### Privacy and User Experience
- `PrivacyPreferences.tsx` - GDPR-compliant preferences
- `PrivacyPolicy.tsx` - Privacy policy component
- `LoadingSpinner.tsx` - Loading state indicator
- `SkipLink.tsx` - Accessibility navigation

## Documentation

Comprehensive documentation is available in the `docs/` directory:
- `COMPONENTS.md` - Detailed component documentation
- `DEPLOYMENT.md` - Deployment procedures and configurations
- `DEVELOPMENT.md` - Development guidelines and best practices
- `TESTING.md` - Testing strategies and procedures

## Deployment

The project is configured for deployment on Vercel. The `vercel.json` configuration handles routing and build settings.

To deploy:
1. Connect your GitHub repository to Vercel
2. Configure environment variables if needed
3. Deploy with `git push` to main branch

## Privacy and Cookies

The website includes:
- Privacy preferences management with granular control
- Privacy policy page
- Performance monitoring via Vercel Speed Insights
- Analytics tracking (configurable by users)
- Ad-blocker friendly implementation

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Primary Water Sp. z o. o.
- Email: office@findprimarywater.com
- Address: ALEJA GRUNWALDZKA 2 B1 /ELZAM, 82-300 Elbląg, Poland

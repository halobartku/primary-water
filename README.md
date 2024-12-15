# Primary Water | We Find Water Everywhere

A modern, interactive website for Primary Water Sp. z o. o., showcasing our expertise in finding sustainable water sources worldwide. Built with React, TypeScript, and Tailwind CSS.

## Features

- 🌊 Interactive water animation and game elements
- 📱 Fully responsive design for all devices
- 🎥 Video case studies from around the world
- 🔍 Detailed information about primary water
- 📊 Performance monitoring with Vercel Speed Insights
- 🔒 GDPR-compliant privacy preferences management

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Routing**: React Router v6 (with v7 future flags enabled)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Vercel
- **Performance Monitoring**: Vercel Speed Insights

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
├── src/
│   ├── components/     # React components
│   ├── data/          # Static data and case studies
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   └── types/         # TypeScript type definitions
├── public/            # Static assets
└── dist/             # Production build output
```

## Key Components

- `App.tsx` - Main application component with routing and layout
- `Navigation.tsx` - Responsive navigation bar with desktop/mobile views
- `PrivacyPreferences.tsx` - GDPR-compliant privacy and cookie preferences management
- `CaseStudyCard.tsx` - Display case studies with video integration
- `WaterCollector.tsx` - Interactive water collection game element

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

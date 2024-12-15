# Primary Water Documentation

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Component Documentation](#component-documentation)
3. [State Management](#state-management)
4. [Animation System](#animation-system)
5. [Development Workflow](#development-workflow)
6. [Performance Considerations](#performance-considerations)

## Architecture Overview

The Primary Water website is built using a modern React stack with TypeScript for type safety. The architecture follows these key principles:

### Directory Structure
```
primary-water/
├── src/
│   ├── components/     # React components
│   │   ├── AboutUs.tsx           # Company information
│   │   ├── BackgroundAnimations  # Water bubble animations
│   │   ├── CaseStudyCard        # Case study display
│   │   ├── ContactCard          # Contact form
│   │   ├── PrivacyPreferences       # GDPR compliance
│   │   ├── Footer              # Site footer
│   │   ├── Hero               # Landing section
│   │   ├── MouseAnimations    # Cursor effects
│   │   ├── Navigation        # Site navigation
│   │   ├── PrivacyPolicy    # Privacy information
│   │   ├── WaterCard       # Water info display
│   │   ├── WaterCollector # Game component
│   │   └── WhatIsPrimaryWater # Information section
│   ├── data/          # Static content
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   └── types/         # TypeScript definitions
├── public/            # Static assets
└── docs/             # Documentation
```

### Tech Stack Details

- **React 18**: Utilizing the latest features including automatic batching and concurrent rendering
- **TypeScript**: Strict type checking enabled for maximum type safety
- **Vite**: Modern build tool for fast development and optimized production builds
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Framer Motion**: Production-ready animation library
- **React Router**: Client-side routing with v6 features

## Component Documentation

### Navigation System
The navigation component (`Navigation.tsx`) implements:
- Responsive design with mobile/desktop views
- Smooth scroll functionality
- Active section highlighting
- Intersection Observer for scroll spy

```typescript
// Usage example
<Navigation 
  sections={sections}
  currentSection={currentSection}
  onNavigate={scrollToSection}
/>
```

### Animation Components

#### Hero Section
The hero component (`Hero.tsx`) features:
- Letter-by-letter animation of the "Primary Water" title
- Responsive text sizing (3xl on mobile, 7xl on tablet, 8xl on desktop)
- Single-line display across all screen sizes
- Spring-based animations with configurable parameters

```typescript
// Animation configuration
const letterVariants = {
  hidden: { 
    opacity: 0,
    y: 50,
    rotateX: -90
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100
    }
  }
}
```

#### BackgroundAnimations
Implements the floating water bubble effect:
- Performance optimized with reduced particle count
- Configurable animation parameters
- Uses Framer Motion for smooth transitions

```typescript
// Key configuration
const bubbleConfig = {
  count: 15,          // Number of bubbles
  sizeRange: 20-60px, // Bubble size range
  duration: 15-35s,   // Animation duration
  wobbleScale: 30-90  // Movement range
}
```

#### MouseAnimations
Cursor-following water drop effect:
- Tracks mouse movement
- Creates trailing effect
- Performance optimized for smooth animation

### Interactive Elements

#### WaterCollector
Game component for user engagement:
- Tracks collected water drops
- Updates score in real-time
- Uses custom hook for state management

```typescript
// Hook usage
const { waterDrops, waterCollected, mousePosition, handleMouseMove } = useWaterGame()
```

## State Management

The application uses React's built-in state management with hooks:
- Component-level state with useState
- Complex state logic in custom hooks
- Shared state through prop passing
- Context for theme and user preferences

### Key State Patterns

```typescript
// Section tracking
const [currentSection, setCurrentSection] = useState(0)

// Responsive design
const [isMobile, setIsMobile] = useState(false)

// Game state
const [waterCollected, setWaterCollected] = useState(0)
```

## Animation System

The animation system is built on Framer Motion with performance optimizations:

### Text Animations
- Letter-by-letter spring animations in Hero section
- Staggered animation timing for visual appeal
- Optimized for mobile with responsive sizing
- Hardware-accelerated transforms

### Background Animations
- Reduced particle count for performance
- Optimized animation properties
- Hardware acceleration enabled

### Mouse Animations
- Debounced mouse tracking
- Limited update frequency
- Cleanup on component unmount

## Development Workflow

### Setup
1. Clone repository
2. Install dependencies: `npm install`
3. Start development: `npm run dev`

### Build Process
1. Development build: `npm run dev`
2. Production build: `npm run build`
3. Preview build: `npm run preview`

### Code Style
- ESLint configuration for code quality
- TypeScript strict mode enabled
- Tailwind class ordering conventions

## Performance Considerations

### Optimization Techniques
1. **Animation Performance**
   - Limited particle count
   - Optimized animation properties
   - Hardware acceleration

2. **Asset Loading**
   - Image optimization
   - Lazy loading components
   - Route-based code splitting

3. **State Updates**
   - Batched state updates
   - Memoized callbacks
   - Optimized re-renders

### Monitoring
- Vercel Speed Insights integration
- Performance metrics tracking
- User experience monitoring

## Deployment

The application is configured for Vercel deployment:

1. **Production Deployment**
   - Automatic deployment on main branch
   - Environment variable configuration
   - Build optimization

2. **Preview Deployments**
   - PR preview deployments
   - Branch-based previews
   - Environment separation

## Security

### GDPR Compliance
- Privacy Preferences management
- Privacy Preferences implementation
- User data handling

### Best Practices
- Secure headers configuration
- XSS prevention
- CORS policy implementation

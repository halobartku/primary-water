# Component API Documentation

This document provides detailed API documentation for each component in the Primary Water website.

## Navigation Component

`Navigation.tsx` - Main navigation component that handles site-wide navigation and section tracking.

### Props
```typescript
interface NavItem {
  id: number;
  title: string;
  icon: LucideIcon;
}

interface NavigationProps {
  sections: NavItem[];
  currentSection: number;
  onNavigate: (index: number) => void;
}
```

### Usage
```tsx
<Navigation 
  sections={[
    { id: 0, title: 'Home', icon: Home },
    { id: 1, title: 'What is Primary Water', icon: HelpCircle }
  ]}
  currentSection={0}
  onNavigate={(index) => {}}
/>
```

## BackgroundAnimations Component

`BackgroundAnimations.tsx` - Creates floating water bubble animations in the background.

### Implementation Details
```typescript
interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  wobbleScale: number;
  wobbleSpeed: number;
}
```

### Usage
```tsx
<BackgroundAnimations />
```

### Configuration
- Number of bubbles: 15
- Size range: 20-60px
- Animation duration: 15-35s
- Wobble scale: 30-90

## Hero Component

`Hero.tsx` - Landing page hero section with call-to-action buttons.

### Props
```typescript
interface HeroProps {
  onDiscoverClick: () => void;
  onContactClick: () => void;
}
```

### Usage
```tsx
<Hero 
  onDiscoverClick={() => scrollToSection(1)}
  onContactClick={() => scrollToSection(4)}
/>
```

## CaseStudyCard Component

`CaseStudyCard.tsx` - Displays individual case studies with video integration.

### Props
```typescript
interface CaseStudyProps {
  title: string;
  location: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
}
```

### Usage
```tsx
<CaseStudyCard
  title="Desert Water Discovery"
  location="Sahara Desert"
  description="Finding water in arid conditions"
  imageUrl="/images/case-study-1.jpg"
  videoUrl="https://youtube.com/..."
/>
```

## WaterCollector Component

`WaterCollector.tsx` - Interactive game element for collecting water drops.

### Props
```typescript
interface WaterCollectorProps {
  waterCollected: number;
}
```

### Usage
```tsx
<WaterCollector waterCollected={150} />
```

## PrivacyPreferences Component

`PrivacyPreferences.tsx` - GDPR-compliant privacy and cookie preferences management.

### Props
```typescript
interface PrivacyPreferencesProps {
  onClose: () => void;
}
```

### Features
- Granular control over different types of cookies
- Persistent preferences storage
- Ad-blocker friendly implementation
- Accessible UI with proper ARIA attributes

### Usage
```tsx
<PrivacyPreferences onClose={() => setShowPrivacyPreferences(false)} />
```

## ContactCard Component

`ContactCard.tsx` - Contact form and information display.

### Usage
```tsx
<ContactCard />
```

### Features
- Form validation
- Email submission
- Error handling
- Success feedback

## WhatIsPrimaryWater Component

`WhatIsPrimaryWater.tsx` - Information section about primary water.

### Usage
```tsx
<WhatIsPrimaryWater />
```

## MouseAnimations Component

`MouseAnimations.tsx` - Cursor-following water drop animations.

### Props
```typescript
interface MouseAnimationsProps {
  waterDrops: Array<{
    id: number;
    x: number;
    y: number;
  }>;
  mousePosition: {
    x: number;
    y: number;
  };
}
```

### Usage
```tsx
<MouseAnimations
  waterDrops={waterDrops}
  mousePosition={mousePosition}
/>
```

## Footer Component

`Footer.tsx` - Site-wide footer with navigation and social links.

### Usage
```tsx
<Footer />
```

## Custom Hooks

### useWaterGame

Custom hook for managing the water collection game state.

```typescript
const {
  waterDrops,
  waterCollected,
  mousePosition,
  handleMouseMove
} = useWaterGame()
```

#### Returns
- `waterDrops`: Array of active water drops
- `waterCollected`: Total water collected
- `mousePosition`: Current mouse coordinates
- `handleMouseMove`: Mouse movement handler

## Utility Components

### PrivacyPolicy

`PrivacyPolicy.tsx` - Privacy policy page component.

### Usage
```tsx
<PrivacyPolicy />
```

### AboutUs

`AboutUs.tsx` - Company information component.

### Usage
```tsx
<AboutUs />
```

## Best Practices

1. **Component Organization**
   - Keep components focused and single-responsibility
   - Use TypeScript interfaces for props
   - Implement proper error boundaries
   - Handle loading and error states

2. **Performance**
   - Memoize callbacks with useCallback
   - Memoize expensive computations with useMemo
   - Use React.memo for pure components
   - Implement proper cleanup in useEffect

3. **Accessibility**
   - Use semantic HTML elements
   - Implement proper ARIA attributes
   - Ensure keyboard navigation
   - Maintain proper color contrast

4. **State Management**
   - Keep state as local as possible
   - Use prop drilling alternatives when needed
   - Implement proper state updates
   - Handle side effects properly

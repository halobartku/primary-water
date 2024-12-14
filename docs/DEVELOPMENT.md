# Development Guide

This guide covers everything you need to know to start developing the Primary Water website.

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or pnpm
- Git
- VSCode (recommended)

### Initial Setup

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

3. Start development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Development Workflow

### Branch Strategy

- `main` - Production branch
- `develop` - Development branch
- Feature branches: `feature/feature-name`
- Bug fixes: `fix/bug-name`

### Commit Convention

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
feat: add new feature
fix: resolve bug
docs: update documentation
style: format code
refactor: restructure code
test: add tests
chore: update dependencies
```

### Code Style

#### TypeScript

- Use strict mode
- Define interfaces for all props
- Use type inference when possible
- Avoid `any` type

```typescript
// Good
interface Props {
  title: string;
  onClick: () => void;
}

// Bad
interface Props {
  title: any;
  onClick: Function;
}
```

#### React

- Use functional components
- Implement proper cleanup in useEffect
- Memoize callbacks and values appropriately
- Handle loading and error states

```typescript
// Good
const Component = ({ title }: Props) => {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await api.getData();
        if (mounted) {
          setData(result);
        }
      } catch (err) {
        if (mounted) {
          setError(err as Error);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return null;

  return <div>{/* Render data */}</div>;
};
```

#### CSS/Tailwind

- Follow mobile-first approach
- Use semantic class names
- Maintain consistent spacing
- Group related classes

```tsx
// Good
<div className="
  flex flex-col items-center
  space-y-4
  p-4 md:p-6
  bg-white rounded-lg shadow-md
">

// Bad
<div className="flex flex-col p-4 bg-white items-center rounded-lg shadow-md space-y-4 md:p-6">
```

### Performance Optimization

#### Code Splitting

Use React.lazy for route-based code splitting:

```typescript
const AboutUs = React.lazy(() => import('./components/AboutUs'));
```

#### Image Optimization

- Use appropriate image formats
- Implement lazy loading
- Provide width and height attributes

```tsx
<img
  src="/images/hero.webp"
  alt="Hero"
  width={800}
  height={600}
  loading="lazy"
/>
```

#### Animation Performance

- Use transform instead of left/top
- Implement will-change when needed
- Reduce animation complexity on mobile

```tsx
// Good
<motion.div
  style={{ transform: 'translateX(100px)' }}
  animate={{ x: 0 }}
/>

// Bad
<motion.div
  style={{ left: '100px' }}
  animate={{ left: 0 }}
/>
```

### Testing

#### Unit Tests

Use Jest and React Testing Library:

```typescript
import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';

describe('Hero', () => {
  it('renders call-to-action buttons', () => {
    render(<Hero onDiscoverClick={() => {}} onContactClick={() => {}} />);
    
    expect(screen.getByText('Discover More')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });
});
```

#### Integration Tests

Test component interactions:

```typescript
import { render, fireEvent, screen } from '@testing-library/react';
import { WaterCollector } from './WaterCollector';

describe('WaterCollector', () => {
  it('updates score when collecting water', async () => {
    render(<WaterCollector />);
    
    const dropElement = screen.getByTestId('water-drop');
    fireEvent.click(dropElement);
    
    expect(await screen.findByText('Score: 1')).toBeInTheDocument();
  });
});
```

### Build and Deploy

#### Development Build

```bash
npm run dev
```

#### Production Build

```bash
npm run build
npm run preview # Test production build locally
```

#### Deployment

The project is configured for Vercel deployment:

1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Deploy with git push to main

### Environment Variables

Create a `.env` file for local development:

```env
VITE_API_URL=http://localhost:3000
VITE_ANALYTICS_ID=UA-XXXXXXXXX-X
```

Production variables should be configured in Vercel dashboard.

### Troubleshooting

Common issues and solutions:

1. **Build Failures**
   - Clear node_modules and package-lock.json
   - Run npm install
   - Check for TypeScript errors

2. **Animation Performance**
   - Reduce particle count on mobile
   - Implement proper cleanup
   - Use Chrome DevTools Performance tab

3. **Memory Leaks**
   - Check useEffect cleanup
   - Verify event listener removal
   - Monitor with Chrome DevTools Memory tab

## Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion API](https://www.framer.com/motion/)
- [Vercel Documentation](https://vercel.com/docs)

# Testing Guide

This guide outlines testing strategies, patterns, and best practices for the Primary Water website.

## Testing Stack

- Jest: Testing framework
- React Testing Library: Component testing
- Cypress: End-to-end testing
- MSW (Mock Service Worker): API mocking

## Test Types

### 1. Unit Tests

Unit tests focus on testing individual components and functions in isolation.

#### Component Testing

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CaseStudyCard } from '../components/CaseStudyCard';

describe('CaseStudyCard', () => {
  const mockProps = {
    title: 'Test Case Study',
    location: 'Test Location',
    description: 'Test Description',
    imageUrl: '/test-image.jpg',
    videoUrl: 'https://youtube.com/test'
  };

  it('renders case study information correctly', () => {
    render(<CaseStudyCard {...mockProps} />);
    
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.location)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
    expect(screen.getByAltText(mockProps.title)).toHaveAttribute('src', mockProps.imageUrl);
  });

  it('opens video modal on click', async () => {
    render(<CaseStudyCard {...mockProps} />);
    
    const watchButton = screen.getByText(/watch video/i);
    await userEvent.click(watchButton);
    
    expect(screen.getByTestId('video-modal')).toBeInTheDocument();
  });
});
```

#### Hook Testing

```typescript
import { renderHook, act } from '@testing-library/react';
import { useWaterGame } from '../hooks/useWaterGame';

describe('useWaterGame', () => {
  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useWaterGame());
    
    expect(result.current.waterCollected).toBe(0);
    expect(result.current.waterDrops).toHaveLength(0);
  });

  it('updates water collected on drop collection', () => {
    const { result } = renderHook(() => useWaterGame());
    
    act(() => {
      result.current.handleMouseMove({
        clientX: 100,
        clientY: 100
      } as React.MouseEvent);
    });
    
    expect(result.current.waterCollected).toBeGreaterThan(0);
  });
});
```

#### Utility Function Testing

```typescript
import { formatWaterAmount } from '../lib/utils';

describe('formatWaterAmount', () => {
  it('formats water amount correctly', () => {
    expect(formatWaterAmount(1000)).toBe('1,000 L');
    expect(formatWaterAmount(1500.5)).toBe('1,500.5 L');
    expect(formatWaterAmount(0)).toBe('0 L');
  });
});
```

### 2. Integration Tests

Integration tests verify that multiple components work together correctly.

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('App Integration', () => {
  it('navigates through sections correctly', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    
    // Navigate to What is Primary Water section
    const whatIsButton = screen.getByText(/what is primary water/i);
    await userEvent.click(whatIsButton);
    
    expect(screen.getByTestId('what-is-section')).toBeVisible();
    
    // Navigate to Contact section
    const contactButton = screen.getByText(/contact/i);
    await userEvent.click(contactButton);
    
    expect(screen.getByTestId('contact-section')).toBeVisible();
  });
});
```

### 3. End-to-End Tests

E2E tests verify the complete user flow using Cypress.

```typescript
// cypress/e2e/navigation.cy.ts
describe('Navigation Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('completes full user journey', () => {
    // Check hero section
    cy.get('[data-testid="hero-section"]').should('be.visible');
    
    // Navigate to What is Primary Water
    cy.get('[data-testid="nav-what-is"]').click();
    cy.get('[data-testid="what-is-section"]').should('be.visible');
    
    // Check case studies
    cy.get('[data-testid="nav-case-studies"]').click();
    cy.get('[data-testid="case-study-card"]').should('have.length.at.least', 1);
    
    // Submit contact form
    cy.get('[data-testid="nav-contact"]').click();
    cy.get('[data-testid="contact-form"]').within(() => {
      cy.get('input[name="name"]').type('Test User');
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('textarea[name="message"]').type('Test Message');
      cy.get('button[type="submit"]').click();
    });
    
    cy.get('[data-testid="success-message"]').should('be.visible');
  });
});
```

## Test Organization

### Directory Structure

```
src/
├── __tests__/
│   ├── components/
│   │   ├── CaseStudyCard.test.tsx
│   │   ├── Navigation.test.tsx
│   │   └── ...
│   ├── hooks/
│   │   └── useWaterGame.test.tsx
│   └── utils/
│       └── formatters.test.ts
├── cypress/
│   ├── e2e/
│   │   ├── navigation.cy.ts
│   │   └── water-game.cy.ts
│   └── support/
│       └── commands.ts
└── ...
```

## Testing Best Practices

### 1. Component Testing

- Test component rendering
- Verify user interactions
- Check error states
- Test accessibility

```typescript
describe('Component', () => {
  it('meets accessibility standards', async () => {
    const { container } = render(<Component />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### 2. Mock Implementation

```typescript
// Mock API calls
const mockFetch = jest.fn();
global.fetch = mockFetch;

mockFetch.mockImplementation(() => 
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: 'test' })
  })
);
```

### 3. Test Coverage

Maintain high test coverage:

```bash
npm run test:coverage
```

Coverage goals:
- Statements: 80%
- Branches: 80%
- Functions: 80%
- Lines: 80%

### 4. Continuous Integration

Configure GitHub Actions for automated testing:

```yaml
# .github/workflows/test.yml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test
      - run: npm run test:e2e
```

## Testing Utilities

### Custom Render Function

```typescript
// test-utils.tsx
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const AllTheProviders = ({ children }) => {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
};

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

### Test Data Generators

```typescript
// test-utils/generators.ts
export const generateCaseStudy = (overrides = {}) => ({
  id: Math.random().toString(),
  title: 'Test Case Study',
  location: 'Test Location',
  description: 'Test Description',
  imageUrl: '/test-image.jpg',
  videoUrl: 'https://youtube.com/test',
  ...overrides
});
```

## Debugging Tests

### Jest Debug Config

```json
{
  "jest": {
    "verbose": true,
    "testEnvironment": "jsdom",
    "setupFilesAfterEnv": [
      "<rootDir>/src/setupTests.ts"
    ],
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest"
    }
  }
}
```

### Visual Debugging

```typescript
screen.debug(); // Print DOM state
console.log(prettyDOM(container)); // Pretty print DOM
```

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Cypress Documentation](https://docs.cypress.io)
- [MSW Documentation](https://mswjs.io/docs/)

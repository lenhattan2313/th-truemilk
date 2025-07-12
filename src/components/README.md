# Shared Components Library

This directory contains reusable components that can be used across the entire application (both auth and main app sections).

## Directory Structure

```
src/components/
├── ui/                 # Basic UI components
├── forms/              # Form-related components
├── feedback/           # User feedback components
├── navigation/         # Navigation-related components
└── index.ts           # Main export file
```

## Usage

Import components from the main index file:

```tsx
import { Button, LoadingSpinner, FormField, SuccessCard } from "@/components";
```

## Component Categories

### UI Components (`ui/`)

#### LoadingSpinner

```tsx
import { LoadingSpinner } from "@/components";

<LoadingSpinner size="md" variant="primary" />;
```

#### Button

```tsx
import { Button, PrimaryButton } from "@/components";

<Button variant="primary" size="lg" isLoading={false}>
  Click Me
</Button>

// Convenience components
<PrimaryButton size="lg">Primary Action</PrimaryButton>
```

### Form Components (`forms/`)

#### FormField

```tsx
import { FormField, EmailField, PasswordField } from "@/components";

<FormField
  name="username"
  label="Username"
  placeholder="Enter username"
  error={errors.username}
  isRequired
/>

// Convenience components
<EmailField name="email" label="Email Address" />
<PasswordField name="password" label="Password" />
```

### Feedback Components (`feedback/`)

#### AlertCard / SuccessCard

```tsx
import { SuccessCard, ErrorCard, AlertCard } from "@/components";

<SuccessCard
  title="Success!"
  message="Operation completed successfully"
  redirectPath="/dashboard"
  redirectDelay={3000}
/>

<AlertCard
  variant="error"
  title="Error"
  message="Something went wrong"
/>
```

### Navigation Components (`navigation/`)

#### BackLink

```tsx
import { BackLink, BackToHome } from "@/components";

<BackLink href="/products" label="Back to Products" />
<BackToHome /> // Convenience component
```

## Design Principles

1. **Consistency**: All components follow the same design patterns and styling approach
2. **Accessibility**: Components include proper ARIA labels and semantic HTML
3. **Flexibility**: Support for different variants, sizes, and customization
4. **Type Safety**: Full TypeScript support with proper interfaces
5. **Performance**: Optimized for minimal re-renders and bundle size

## Adding New Components

When adding new shared components:

1. Place in the appropriate category folder
2. Export from the main `index.ts` file
3. Follow the existing naming conventions
4. Add TypeScript interfaces
5. Include accessibility features
6. Update this documentation

## Best Practices

- Use shared components instead of creating one-off components
- Extend components with `className` prop for custom styling
- Use convenience components when available (e.g., `PrimaryButton`, `EmailField`)
- Keep components generic and reusable
- Add `"use client"` directive only when necessary (for hooks/interactions)

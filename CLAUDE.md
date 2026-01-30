# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**launch-ui** is a React component library built for **Webflow Code Components**. Components are developed in React and published to Webflow, where designers can use them visually in the Webflow Designer with configurable props, slots, and variants.

## Commands

- `bun run dev` - Start Vite dev server
- `bun run build` - TypeScript check + Vite production build
- `bun run lint` - Run ESLint
- `bun run preview` - Preview production build
- `bunx webflow library share` - Publish component library to Webflow Workspace

## Architecture

### Tech Stack
- **React 19** with TypeScript
- **Vite 7** as build tool
- **Tailwind CSS v4** with the Vite plugin (`@tailwindcss/vite`)
- **Base UI** (`@base-ui/react`) - unstyled primitive components
- **CVA** (class-variance-authority) - variant-based component styling
- **Webflow** packages: `@webflow/react`, `@webflow/data-types`, `@webflow/webflow-cli`

### Component Pattern

UI components in `src/components/ui/` follow this pattern:
1. Import unstyled primitive from `@base-ui/react`
2. Define variants using CVA's `cva()` function
3. Export a styled wrapper that applies variants via the `cn()` utility

### Webflow Code Component Pattern

To expose a React component to Webflow Designer, create a `.webflow.tsx` file:

```tsx
import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { Button } from './Button';

export default declareComponent(Button, {
  name: "Button",
  description: "A button component",
  group: "Interactive",
  props: {
    text: props.Text({ name: "Button Text", defaultValue: "Click me" }),
    variant: props.Variant({ name: "Style", options: ["primary", "secondary"], defaultValue: "primary" }),
  },
});
```

- File naming: `ComponentName.webflow.tsx`
- Location: alongside the React component file
- Use `props.ColorVariable()`, `props.SizeVariable()`, `props.FontFamilyVariable()` to integrate with Webflow's design variables

### Path Aliases

Use `@/` to import from `src/`:
- `@/components/ui/*` - UI components
- `@/lib/utils` - Utility functions (includes `cn()` for class merging)

### Styling

- CSS variables for theming defined in `src/index.css` using OKLCH color space
- Light/dark mode support via `.dark` class
- shadcn's Tailwind preset imported via `@import "shadcn/tailwind.css"`
- Inter Variable font as default sans-serif
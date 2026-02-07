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

---

## Webflow Code Components

Code components are reusable React components that developers build and import into Webflow through DevLink, enabling designers to use them visually on the canvas.

### Workflow
1. **Build in React** – Create components using hooks, state, effects, and context
2. **Declare with Webflow** – Wrap components using `declareComponent` and define prop types
3. **Import via DevLink** – Bundle and publish components as shared libraries
4. **Install to Sites** – Add components as shared libraries across workspace sites
5. **Design Visually** – Drag, drop, and configure on the Webflow canvas

### File Structure

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

### Available Prop Types

All prop types are imported from `@webflow/data-types`:

```tsx
import { props } from '@webflow/data-types';
```

#### Basic Props

| Prop Type | Description | Returns | Options |
|-----------|-------------|---------|---------|
| `props.Text()` | Single line text input | `string` | `name`, `group?`, `tooltip?`, `defaultValue?` |
| `props.RichText()` | Multi-line text with formatting | `string` | `name`, `group?`, `tooltip?` |
| `props.TextNode()` | Canvas-editable text | `string` | `name`, `group?`, `tooltip?` |
| `props.Number()` | Numeric input | `number` | `name`, `group?`, `tooltip?`, `defaultValue?` |
| `props.Boolean()` | True/false toggle | `boolean` | `name`, `group?`, `tooltip?`, `defaultValue?` |
| `props.Link()` | URL input with validation | `{ href, target?, preload? }` | `name`, `group?`, `tooltip?` |
| `props.Image()` | Image upload and selection | `object` | `name`, `group?`, `tooltip?` |
| `props.ID()` | HTML Element ID | `string` | `name`, `group?`, `tooltip?` |

#### Structure Props

| Prop Type | Description | Returns | Options |
|-----------|-------------|---------|---------|
| `props.Variant()` | Dropdown with predefined options | `string` | `name`, `options[]`, `group?`, `tooltip?`, `defaultValue?` |
| `props.Visibility()` | Show/hide controls | `boolean` | `name`, `group?`, `tooltip?`, `defaultValue?` |
| `props.Slot()` | Content area for child components | `ReactNode` | `name`, `group?`, `tooltip?` |

#### Design Variable Props

Connect to Webflow site variables for design system consistency:

| Prop Type | Description | Connects To |
|-----------|-------------|-------------|
| `props.ColorVariable()` | Color picker linked to site colors | Color variables |
| `props.SizeVariable()` | Size input linked to site sizes | Size/spacing variables |
| `props.FontFamilyVariable()` | Font picker linked to site fonts | Font variables |
| `props.NumberVariable()` | Number linked to site numbers | Number variables |
| `props.PercentageVariable()` | Percentage linked to site values | Percentage variables |

### Slots

Slots allow designers to place child components inside your code component:

```tsx
export default declareComponent(Card, {
  name: "Card",
  props: {
    header: props.Slot({ name: "Header" }),
    content: props.Slot({ name: "Content" }),
    footer: props.Slot({ name: "Footer" }),
  },
});

// In your component:
function Card({ header, content, footer }) {
  return (
    <div className="card">
      <div className="card-header">{header}</div>
      <div className="card-content">{content}</div>
      <div className="card-footer">{footer}</div>
    </div>
  );
}
```

### Shadow DOM & Styling

Code components render in Shadow DOM, creating an isolated styling boundary. To connect to external styles:

- **Site variables**: Use `var(--variable-name, fallback)` in CSS
- **Inherited properties**: Use `property: inherit`
- **Tag selectors**: Enable `applyTagSelectors: true` in component definition

```tsx
export default declareComponent(Button, {
  name: "Button",
  applyTagSelectors: true, // Inherit site tag styles
  props: { ... },
});
```

### Example with Groups and Variables

```tsx
export default declareComponent(Card, {
  name: 'Card',
  description: 'A card component',
  group: 'Content',
  props: {
    variant: props.Variant({
      name: 'Variant',
      options: ['Horizontal', 'Vertical'],
    }),
    title: props.Text({
      name: 'Title',
      defaultValue: 'Card title',
    }),
    buttonVisible: props.Visibility({
      group: 'Button',
      name: 'Visibility',
      defaultValue: true,
    }),
    buttonVariant: props.Variant({
      group: 'Button',
      name: 'Variant',
      options: ['Primary', 'Secondary', 'Outline'],
    }),
    buttonText: props.Text({
      group: 'Button',
      name: 'Text',
      defaultValue: 'Click me',
    }),
    buttonLink: props.Link({
      group: 'Button',
      name: 'Link',
    }),
    backgroundColor: props.ColorVariable({
      name: 'Background Color',
    }),
  },
});
```

---

## Webflow MCP Server

This project has access to a Webflow MCP server for Designer and Data API operations.

### Designer Tools (UI operations)
- **element_tool**: Get/select elements, set attributes, styles, links, images
- **element_builder**: Create new elements on the canvas
- **style_tool**: Create and update styles (use longhand CSS properties only)
- **variable_tool**: Manage design variables (colors, sizes, fonts, numbers, percentages)
- **de_page_tool**: Create pages/folders, switch pages
- **de_component_tool**: Create/manage components
- **asset_tool**: Manage assets and folders

### Data Tools (REST API operations)
- **data_cms_tool**: Manage CMS collections and items
- **data_pages_tool**: Get/update page metadata and content
- **data_sites_tool**: List sites, get site details, publish
- **data_components_tool**: Get/update component content and properties

### Key MCP Rules
- Always use longhand CSS properties (e.g., `margin-top` not `margin`)
- Never assume site ID - always ask or retrieve it first
- Reuse existing styles when possible
- Created elements are not auto-selected; use `select_element` to inspect them

---

## Path Aliases

Use `@/` to import from `src/`:
- `@/components/ui/*` - UI components
- `@/lib/utils` - Utility functions (includes `cn()` for class merging)

## Styling

- CSS variables for theming defined in `src/index.css` using OKLCH color space
- Light/dark mode support via `.dark` class
- shadcn's Tailwind preset imported via `@import "shadcn/tailwind.css"`
- Inter Variable font as default sans-serif

## Resources

- [Webflow Code Components Docs](https://developers.webflow.com/code-components/introduction)
- [Prop Types Reference](https://developers.webflow.com/code-components/reference/prop-types)
- [Styling Components](https://developers.webflow.com/code-components/styling-components)
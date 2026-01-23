# Webflow Code Components Overview

Code Components in Webflow allow developers to import React components directly into the Webflow Designer, bridging the gap between code and visual development. This system enables teams to build advanced, interactive components in their codebase and deploy them to Webflow, where designers can use them directly on the canvas with configurable props, slots, and variants [^1].

## Key Capabilities

- **Develop in React**: Use hooks, state, effects, and context to build advanced components
- **Visual composition**: Expose props and slots for designers to design visually in Webflow
- **Shared library distribution**: Share, update, and install code components on any site in your Workspace with Libraries [^1]

## How Code Components Work

1. **Build components in your codebase**: Create React components with hooks, state management, and API integrations
2. **Declare a Webflow component**: Use `declareComponent` to wrap an existing React component and define prop types
3. **Import components to Webflow**: Use DevLink to bundle and publish your components as a shared library
4. **Install components to a site**: Install code components as a shared library on any Webflow site in your workspace
5. **Design visually**: Drag and drop components onto the canvas and configure props in the right panel [^1]

## Setup Requirements

### Installation

```bash
npm i --save-dev @webflow/webflow-cli @webflow/data-types @webflow/react
```

This installs:
- `@webflow/webflow-cli` - CLI used to publish components to Webflow
- `@webflow/data-types` - TypeScript definitions for Webflow props
- `@webflow/react` - React utilities for code components [^6]

### Configuration

Create a `webflow.json` file in the root of your project:

```json
{
    "library": {
        "name": "<Your Library Name>",
        "components": ["./src/**/*.webflow.@(js|jsx|mjs|ts|tsx)"],
        "bundleConfig": "./webpack.webflow.js",
        "globals": "./src/globals.webflow.ts"
    }
}
```

Key configuration fields:
- `library.name`: The name of your component library as it appears in Webflow
- `library.components`: Glob pattern matching your component files
- `library.bundleConfig`: Path to a custom webpack configuration file (optional)
- `library.globals`: Path to a Component Decorators file (optional) [^6]

## Defining a Code Component

A code component definition is a `.webflow.tsx` file that tells Webflow how to use your React component on the canvas. It defines which properties designers can configure and how they'll appear in the designer [^2].

### Basic Structure

```tsx
import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { Button } from './Button';

export default declareComponent(Button, {
  // Component metadata
  name: "Button",
  description: "A button component with a text and a style variant",
  group: "Interactive",

  // Prop definitions
  props: {
    text: props.Text({ 
        name: "Button Text",
        defaultValue: "Click me"
    }),
    variant: props.Variant({ 
        name: "Style", 
        options: ["primary", "secondary"],
        defaultValue: "primary"
    }),
  },
  // Optional configuration
  options: {
    applyTagSelectors: true,
  },
});
```

### File Structure and Naming

- **File extension**: `.webflow.tsx` or `.webflow.ts`
- **Naming pattern**: `ComponentName.webflow.tsx` (where `ComponentName` matches your React component)
- **Location**: Typically alongside your React component file [^2]

## Working with Variables

Webflow's design variables system can be integrated with Code Components, allowing components to use site-wide design tokens for colors, sizes, fonts, and more.

### Variable System Overview

Variables in Webflow function like CSS custom properties and can be organized into collections with different modes (e.g., light/dark themes) [^3].

### Creating Variables

Variables can be created for different types:
- Colors
- Sizes
- Numbers
- Percentages
- Font families

Each variable belongs to a collection and can have different values across modes [^3].

### Using Variables in Code Components

Code Components can access and use Webflow variables through props:

```tsx
import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { Card } from './Card';

export default declareComponent(Card, {
  name: "Card",
  description: "A card component with variable-based styling",
  
  props: {
    backgroundColor: props.ColorVariable({
      name: "Background Color",
      description: "Select a color variable for the background"
    }),
    spacing: props.SizeVariable({
      name: "Padding",
      description: "Select a size variable for padding"
    }),
    fontFamily: props.FontFamilyVariable({
      name: "Font Family",
      description: "Select a font family variable"
    })
  }
});
```

### Variable Modes

Variable modes allow different values for the same variables (e.g., light/dark themes). Designers can apply variable modes to styles, and Code Components can respond to these mode changes [^4][^5].

To set variable modes on a style:

```typescript
// Apply variable modes to a style
await style.setVariableModes({
  "collection-id": "mode-id"
}, {
  breakpointId: "main",
  pseudoStateKey: "noPseudo"
});
```

To remove variable modes from a style:

```typescript
// Remove variable modes from a style
await style.removeVariableModes([
  { id: "mode-id" }
], {
  breakpointId: "main",
  pseudoStateKey: "noPseudo"
});
```

## Sharing Components to Webflow

Use the Webflow CLI to upload your library:

```bash
npx webflow library share
```

The CLI will:
1. Authorize your workspace
2. Bundle your library
3. Upload your library to your Workspace [^3]

## Using Components in Webflow

1. **Install the library** on your Webflow site through the Libraries panel
2. **Open the Components panel** to find your components
3. **Add components to your page** by dragging and dropping
4. **Customize the component** using the Properties panel on the right [^3]

## Authentication

When importing your component library, you'll need to authenticate with a Workspace API token. You can either:
- Let the CLI prompt you for authentication
- Manually authenticate with `--api-token` [^6]

## Best Practices

- **File naming**: Use consistent naming like `ComponentName.webflow.tsx`
- **Component metadata**: Use clear names, add descriptions, and group logically
- **Prop definitions**: Provide helpful defaults and use descriptive names
- **Global styles**: Import CSS once in a global decorators file [^2]
- **Variables**: Use design variables for consistent styling across components and modes [^3]

[^1]: https://developers.webflow.com/code-components/introduction
[^2]: https://developers.webflow.com/code-components/define-code-component
[^3]: https://developers.webflow.com/mcp/reference/designer/variables
[^4]: https://developers.webflow.com/designer/reference/set-variable-modes-style
[^5]: https://developers.webflow.com/designer/reference/remove-variable-modes-style
[^6]: https://developers.webflow.com/code-components/installation
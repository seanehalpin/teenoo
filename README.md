# teenoo

> A Svelte 5 component library for rapid prototyping with visual layout tools

[![npm version](https://img.shields.io/npm/v/teenoo.svg)](https://www.npmjs.com/package/teenoo)
[![Svelte 5](https://img.shields.io/badge/svelte-5.0-ff3e00.svg)](https://svelte.dev)

## Installation

```bash
npm install teenoo
```

**Requirements**: Svelte 5.0 or higher

## Quick Start

```svelte
<script>
  import * as T from 'teenoo';

  let email = $state("");
  let showModal = $state(false);
</script>

<T.Autolayout vertical gap="16px" padding="20px">
  <T.Input bind:value={email} label="Email" />
  <T.Button onclick={() => showModal = true}>
    Submit
  </T.Button>
</T.Autolayout>

<T.Modal bind:showModal title="Success">
  {#snippet children()}
    <p>Form submitted!</p>
  {/snippet}
</T.Modal>
```

## Components

teenoo includes 20+ components for building prototypes:

- **Layout**: Autolayout (visual flexbox), Embed (layout configurator)
- **Forms**: Button, Input, Textarea, Select, Checkbox, Switch, Slider, Tagbuilder
- **Navigation**: Nav, Tabs
- **Display**: Text, Table, Avatar, Safari
- **Feedback**: Modal, Toast, Popover

## Documentation

- **[Quick Examples](./EXAMPLES.md)** - Copy-paste code snippets for common patterns
- **[Complete Component API Reference](./LLM_README.md)** - Detailed props, examples, and patterns
- **[Development Guide](./CLAUDE.md)** - Code style and build commands

## Usage Pattern

teenoo uses a **namespace import pattern** for cleaner code:

```svelte
import * as T from 'teenoo';

<T.Button>Click</T.Button>
<T.Input />
<T.Modal />
```

This approach:
- Keeps imports concise
- Makes component origin clear
- Works great with IDE autocomplete

## TypeScript Support

All components have full TypeScript definitions with JSDoc comments. Import types for better IDE support:

```typescript
import type { ButtonProps, InputProps, ModalProps } from 'teenoo';

// Use in your own components
interface MyFormProps {
  buttonVariant: ButtonProps['variant'];
  inputConfig: Partial<InputProps>;
}
```

## Key Features

- **Svelte 5 Runes**: Built with `$state()`, `$props()`, `$bindable()`
- **TypeScript**: Full type definitions included
- **Design System**: CSS variable-based theming
- **Visual Tools**: Embed component for configuring layouts visually
- **Prototyping-First**: Optimized for speed, not production apps

## Design Tokens

teenoo uses CSS variables for consistent styling:

```css
--ds-primary, --ds-textPrimary, --ds-surfacePrimary
--8px, --12px, --16px, --20px, --24px, --32px
--font-base, --font-mono
```

## License

MIT


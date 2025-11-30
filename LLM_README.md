# Teenoo - Svelte Component Library (LLM Reference)

> **For LLMs**: This document provides comprehensive reference for the Teenoo component library. Use this to understand component APIs, props, and usage patterns.

## Quick Reference

- **Package Name**: `teenoo`
- **Version**: 0.0.42
- **Framework**: Svelte 5 (uses runes syntax)
- **Import Path**: `teenoo` or `teenoo/components`

## Installation

```bash
npm install teenoo
```

## Component Imports

```javascript
// Recommended: Namespace import
import * as T from 'teenoo';

// Then use components with T. prefix:
// <T.Button>Click me</T.Button>
// <T.Safari>...</T.Safari>

// Utilities can be imported separately
import { showToast } from 'teenoo';

// TypeScript: Import types for props
import type { ButtonProps, InputProps, ModalProps } from 'teenoo';
```

## TypeScript Types

All component props have TypeScript interfaces with JSDoc comments. This enables:
- **IDE autocomplete** with prop descriptions
- **Type safety** when building wrapper components
- **LLM understanding** of prop purposes without reading source code

Example type usage:
```typescript
import type { ButtonProps, AutolayoutProps } from 'teenoo';

// Extract specific prop types
type ButtonVariant = ButtonProps['variant']; // "primary" | "secondary" | "flat"

// Use in custom components
interface MyButtonGroupProps {
  variant: ButtonProps['variant'];
  layout: Partial<AutolayoutProps>;
}
```

## Available Components

- **Layout**: Autolayout
- **Forms**: Button, Input, Textarea, Select, Checkbox, Switch, Slider, Tagbuilder
- **Navigation**: Nav, Tabs
- **Display**: Text, Table, Avatar, Safari, Embed
- **Feedback**: Modal, Toast, Popover

---

## Component API Reference

### 1. Autolayout

**Purpose**: Flexbox layout container with extensive alignment and spacing controls.

> **Note**: All Autolayout props (except `children` and `onclick`) are bindable, enabling dynamic layout control.

**Props**:
- `vertical` (boolean, default: false) - Sets flex-direction to column
- `wrap` (boolean, default: false) - Enables flex-wrap
- `fillWidth` (boolean, default: false) - Sets width to 100%
- `flex` (boolean, default: false) - Sets flex: 1
- `auto` (boolean, default: false) - Space-between layout
- `gapAuto` (boolean, default: false) - Space-between layout (alias)
- `inspect` (boolean, default: false) - Adds outline for debugging

**Alignment Props** (boolean):
- `topLeft`, `topCenter`, `topRight`
- `left`, `center`, `right`
- `bottomLeft`, `bottomCenter`, `bottomRight`

**Spacing Props**:
- `gap` (string) - Gap between children (e.g., "8px", "var(--16px)")
- `padding` (string) - All sides padding
- `paddingLeft`, `paddingRight`, `paddingTop`, `paddingBottom` (string)

**Border Props**:
- `border` (boolean) - All sides border
- `borderLeft`, `borderRight`, `borderTop`, `borderBottom` (boolean)
- `borderWeight` (number, default: 1) - Border thickness
- `borderColor` (string, default: "primary") - Options: "primary", "secondary", "strong"
- `borderRadius` (string) - All corners
- `borderRadiusTopLeft`, `borderRadiusTopRight`, `borderRadiusBottomLeft`, `borderRadiusBottomRight` (string)

**Other Props**:
- `background` (string, default: "transparent")
- `width` (string, default: "auto")
- `height` (string, default: "auto")
- `class` (string) - Custom CSS class
- `onclick` (function)

**Usage**:
```svelte
<script>
  import * as T from 'teenoo';

  // Bindable props enable dynamic layout control
  let isVertical = $state(false);
  let layoutGap = $state("16px");
</script>

<!-- Static props -->
<T.Autolayout vertical gap="16px" padding="20px">
  <T.Button>Click me</T.Button>
  <T.Input placeholder="Enter text" />
</T.Autolayout>

<!-- Bindable props for dynamic control -->
<T.Autolayout bind:vertical={isVertical} bind:gap={layoutGap} padding="20px">
  <T.Button onclick={() => isVertical = !isVertical}>
    Toggle Direction
  </T.Button>
  <T.Slider bind:value={layoutGap} min={0} max={32} label="Gap" />
</T.Autolayout>

<T.Autolayout center fillWidth>
  <T.Text>Centered content</T.Text>
</T.Autolayout>
```

---

### 2. Button

**Purpose**: Interactive button with multiple variants and modifiers.

**Props**:
- `variant` (string, default: "primary") - Options: "primary", "secondary", "flat"
- `stretch` (boolean, default: false) - Makes button full width
- `small` (boolean, default: false) - Reduces size (24px height)
- `dropdown` (boolean, default: false) - Shows dropdown arrow icon
- `icon` (boolean, default: false) - Icon-only button (32x32px)
- `leftAlign` (boolean, default: false) - Left-aligns content
- `disabled` ($bindable boolean, default: false) - Disables button
- `nofill` ($bindable boolean, default: false) - For icon buttons
- `openModal` (string, default: "") - Modal ID to open on click
- `onclick` (function) - Click handler
- `style` (string) - Inline styles

**Usage**:
```svelte
<script>
  import * as T from 'teenoo';
</script>

<T.Button variant="primary" onclick={() => console.log('clicked')}>
  Click me
</T.Button>

<T.Button variant="secondary" small>Small Button</T.Button>

<T.Button icon>
  <svg><!-- icon --></svg>
</T.Button>

<T.Button openModal="my-modal">Open Modal</T.Button>
```

---

### 3. Input

**Purpose**: Text input field with validation and styling.

**Props**:
- `value` ($bindable string, default: "") - Input value
- `inputType` (string, default: "text") - HTML input type
- `placeholder` (string, default: "")
- `label` (string, default: "") - Label text
- `error` (string, default: "") - Error message (shows error state if truthy)
- `disabled` (boolean, default: false)
- `small` (boolean, default: false) - Smaller size variant
- `stretch` (boolean, default: true) - Full width
- `search` (boolean, default: false) - Shows search icon
- `onchange`, `oninput`, `onfocus`, `onblur` (functions) - Event handlers

**Usage**:
```svelte
<script>
  import * as T from 'teenoo';

  let email = $state("");
  let emailError = $state("");
</script>

<T.Input
  bind:value={email}
  label="Email"
  placeholder="you@example.com"
  error={emailError}
  inputType="email"
/>

<T.Input search placeholder="Search..." />
```

---

### 4. Textarea

**Purpose**: Multi-line text input.

**Props**:
- `value` ($bindable string, default: "")
- `placeholder` (string, default: "")
- `label` (string, default: "")
- `error` (string, default: "")
- `disabled` (boolean, default: false)
- `small` (boolean, default: false)
- `stretch` (boolean, default: true)
- `rows` (number) - Number of visible rows
- `onchange`, `oninput`, `onfocus`, `onblur` (functions)

**Usage**:
```svelte
<script>
  import * as T from 'teenoo';

  let description = $state("");
</script>

<T.Textarea
  bind:value={description}
  label="Description"
  rows={5}
  placeholder="Enter description..."
/>
```

---

### 5. Select

**Purpose**: Dropdown select component with custom styling.

**Props**:
- `value` (string, default: "") - Selected option value
- `options` (array, required) - Array of `{ value: string, label: string }` objects
- `label` (string, default: "")
- `error` (string, default: "")
- `disabled` (boolean, default: false)
- `alignRight` (boolean, default: false) - Align dropdown to right
- `stretch` (boolean, default: true)
- `placeholder` (string, default: "Select option(s)")
- `onchange` (function) - Called with selected value

**Usage**:
```svelte
<script>
  import * as T from 'teenoo';

  let selectedColor = $state("");

  const colors = [
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' }
  ];
</script>

<T.Select
  bind:value={selectedColor}
  options={colors}
  label="Choose color"
  onchange={(val) => console.log(val)}
/>
```

---

### 6. Checkbox

**Purpose**: Checkbox input with label.

**Props**:
- `checked` ($bindable boolean, default: false)
- `disabled` (boolean, default: false)
- `label` (string, default: "")
- `id` (string) - Auto-generated if not provided
- `name` (string)

**Usage**:
```svelte
<script>
  import * as T from 'teenoo';

  let agreed = $state(false);
</script>

<T.Checkbox
  bind:checked={agreed}
  label="I agree to the terms"
/>
```

---

### 7. Switch

**Purpose**: Toggle switch component.

**Props**:
- `checked` ($bindable boolean, default: false)
- `disabled` (boolean, default: false)
- `spaced` (boolean, default: false) - Space between label and switch
- `label` (string, default: "")
- `ariaLabel` (string, default: "")
- `id` (string) - Auto-generated if not provided
- `name` (string)

**Usage**:
```svelte
<script>
  import * as T from 'teenoo';

  let darkMode = $state(false);
</script>

<T.Switch
  bind:checked={darkMode}
  label="Dark mode"
  spaced
/>
```

---

### 8. Slider

**Purpose**: Range slider with single or dual handles.

**Props**:
- `value` ($bindable number) - Single handle value
- `startValue` (number, default: min) - Dual handle start
- `endValue` (number, default: max) - Dual handle end
- `min` (number, default: 0)
- `max` (number, default: 100)
- `step` (number, default: 1)
- `dual` (boolean, default: false) - Enable dual handles
- `label` (string, default: "")
- `valueLabel` (string, default: "")
- `disabled` (boolean, default: false)
- `stretch` (boolean, default: true)
- `showOutput` (boolean, default: true) - Show value display
- `formatFn` (function, default: toString) - Format displayed value
- `onchange`, `oninput` (functions)

**Usage**:
```svelte
<script>
  import * as T from 'teenoo';

  let volume = $state(50);
  let priceStart = $state(20);
  let priceEnd = $state(80);
</script>

<!-- Single handle -->
<T.Slider
  bind:value={volume}
  min={0}
  max={100}
  label="Volume"
/>

<!-- Dual handle -->
<T.Slider
  bind:startValue={priceStart}
  bind:endValue={priceEnd}
  min={0}
  max={100}
  dual
  label="Price range"
  formatFn={(val) => `$${val}`}
/>
```

---

### 9. Modal

**Purpose**: Modal dialog overlay.

**Props**:
- `showModal` ($bindable boolean, default: false) - Controls visibility
- `id` (string) - Auto-generated if not provided
- `title` (string, default: "")
- `closeButton` (boolean, default: false) - Show close X button
- `fixed` (boolean, default: true) - Fixed positioning
- `large` (boolean, default: false) - 800px width
- `xl` (boolean, default: false) - 1000px width (default is 456px)

**Snippets**:
- `children` - Modal body content
- `footer` - Modal footer content

**Usage**:
```svelte
<script>
  import * as T from 'teenoo';

  let showModal = $state(false);
</script>

<T.Button onclick={() => showModal = true}>Open Modal</T.Button>

<T.Modal
  bind:showModal
  title="Confirmation"
  closeButton
>
  {#snippet children()}
    <p>Are you sure?</p>
  {/snippet}

  {#snippet footer()}
    <T.Button onclick={() => showModal = false}>Cancel</T.Button>
    <T.Button variant="primary">Confirm</T.Button>
  {/snippet}
</T.Modal>

<!-- Large modal -->
<T.Modal bind:showModal large title="Large Modal">
  {#snippet children()}
    <p>Content here</p>
  {/snippet}
</T.Modal>
```

**Modal Trigger via Data Attribute**:
```svelte
<script>
  import * as T from 'teenoo';
</script>

<!-- Button automatically opens modal with matching ID -->
<T.Button data-modal-target="my-modal">Open Modal</T.Button>

<T.Modal id="my-modal" title="My Modal">
  {#snippet children()}
    <p>Content</p>
  {/snippet}
</T.Modal>
```

---

### 10. Toast

**Purpose**: Toast notification system.

**Props**:
- `id` (string, required) - Unique toast identifier
- `text` (string, default: "")
- `icon` (string, default: "")
- `buttonText` (string, default: "")
- `buttonAction` (function)
- `duration` (number, default: 3000) - Auto-dismiss duration

**Usage**:
```svelte
<script>
  import * as T from 'teenoo';
  import { showToast } from 'teenoo';

  function notify() {
    showToast({
      text: 'Action completed!',
      icon: '✓',
      buttonText: 'Undo',
      buttonAction: () => console.log('undo'),
      duration: 5000
    });
  }
</script>

<!-- 1. Add Toast component to your app root -->
<T.Toast id="main-toast" />

<!-- 2. Use showToast utility function above -->
```

---

### 11. Popover

**Purpose**: Popover/dropdown content container.

**Props**:
- `open` ($bindable boolean, default: false)
- `align` (string, default: "left") - Options: "left", "right"
- `width` (string, default: "auto")

**Snippets**:
- `trigger` - Element that toggles popover
- `content` - Popover content

**Usage**:
```svelte
<script>
  import * as T from 'teenoo';

  let open = $state(false);
</script>

<T.Popover bind:open align="right">
  {#snippet trigger()}
    <T.Button>Menu</T.Button>
  {/snippet}

  {#snippet content()}
    <div>Popover content</div>
  {/snippet}
</T.Popover>
```

---

### 12. Tabs

**Purpose**: Tab navigation component.

**Props**:
- `tabs` (array, required) - Array of `{ id: string, label: string }` objects
- `activeTab` ($bindable string) - Currently active tab ID
- `variant` (string, default: "chrome") - Options: "chrome", "flat"
- `onclick` (function) - Called with (tabId, event)

**Usage**:
```svelte
<script>
  import * as T from 'teenoo';

  let activeTab = $state('home');

  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'profile', label: 'Profile' },
    { id: 'settings', label: 'Settings' }
  ];
</script>

<T.Tabs
  bind:activeTab
  tabs={tabs}
  onclick={(id) => console.log('Tab:', id)}
/>

{#if activeTab === 'home'}
  <div>Home content</div>
{:else if activeTab === 'profile'}
  <div>Profile content</div>
{/if}
```

---

### 13. Table

**Purpose**: Data table component.

**Props**:
- `columns` (array, required) - Column definitions
- `data` (array, required) - Table data
- `striped` (boolean, default: false) - Alternating row colors
- `hoverable` (boolean, default: true) - Row hover effect

**Usage**:
```svelte
<script>
  import * as T from 'teenoo';

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' }
  ];

  const data = [
    { name: 'John', email: 'john@example.com', role: 'Admin' },
    { name: 'Jane', email: 'jane@example.com', role: 'User' }
  ];
</script>

<T.Table columns={columns} data={data} striped />
```

---

### 14. Avatar

**Purpose**: User/team avatar component with automatic color generation and initials.

**Props**:
- `size` (string, default: "medium") - Options: "small" (24px), "medium" (32px), "large" (48px)
- `team` (boolean, default: false) - When true, shows rounded corners instead of circular
- `initial` (string, default: "") - Single letter or two initials to display
- `image` (string, default: "") - URL to the image
- `name` (string, default: "") - Full name for accessibility and auto-generating initials
- `color` (string, default: "") - Color name: "primary", "red", "blue", "magenta", "green", "orange", "gold" (or custom CSS color)
- `bgcolor` (string, default: "") - Optional custom background color (overrides color)
- `textcolor` (string, default: "") - Optional custom text color (defaults to white)
- `avatarNum` (number, default: 0) - Number between 1-20 for pravatar.cc avatar (0 means disabled)
- `onclick` (function) - Click handler

**Usage**:
```svelte
<script>
  import * as T from 'teenoo';
</script>

<!-- User avatar with image -->
<T.Avatar
  image="/avatar.jpg"
  name="John Doe"
  size="large"
/>

<!-- Team avatar with initials -->
<T.Avatar
  team
  initial="AB"
  color="blue"
  size="medium"
/>

<!-- Auto-generated initials from name -->
<T.Avatar
  name="Jane Smith"
  color="magenta"
/>

<!-- Using pravatar.cc -->
<T.Avatar
  avatarNum={5}
  size="large"
/>

<!-- Custom colors -->
<T.Avatar
  initial="XY"
  bgcolor="#ff6b6b"
  textcolor="#ffffff"
/>
```

---

### 15. Text

**Purpose**: Flexible text component with size, style, and heading variants.

**Size Variants** (boolean props):
- `tiny` - 10px
- `small` - 11px
- `regular` - 12px (default)
- `large` - 13px

**Style Variants** (boolean props):
- `strong` - Bold weight
- `code` - Monospace font

**Heading Variants** (boolean props):
- `heading` - 16px, bold
- `title` - 18px, bold
- `jumbo` - 24px, bold

**Other Props**:
- `color` (string, default: "") - Custom text color (e.g., "var(--ds-textSecondary)" or "#ff0000")
- `className` (string, default: "") - Custom CSS class
- `pretty` (boolean, default: false) - Enable pretty text wrapping
- `as` (string, default: "span") - HTML element: "span", "p", "div", "label", "h1", "h2", "h3", "jumbo"
- `children` - Text content (snippet)

**Usage**:
```svelte
<script>
  import * as T from 'teenoo';
</script>

<!-- Size variants -->
<T.Text tiny>Tiny text</T.Text>
<T.Text small>Small text</T.Text>
<T.Text regular>Regular text (default)</T.Text>
<T.Text large>Large text</T.Text>

<!-- Style variants -->
<T.Text strong>Bold text</T.Text>
<T.Text code>Monospace code</T.Text>
<T.Text small code>Small monospace</T.Text>

<!-- Headings -->
<T.Text heading>Heading (16px)</T.Text>
<T.Text title>Title (18px)</T.Text>
<T.Text jumbo>Jumbo (24px)</T.Text>

<!-- Custom colors and elements -->
<T.Text color="var(--ds-textSecondary)">Secondary text</T.Text>
<T.Text as="p" pretty>This is a paragraph with pretty text wrapping.</T.Text>
<T.Text as="h1" jumbo>Page Title</T.Text>
```

---

### 16. Nav

**Purpose**: Navigation bar component.

**Props**:
- Component-specific props for navigation

**Usage**:
```svelte
<script>
  import * as T from 'teenoo';
</script>

<T.Nav />
```

---

### 17. Safari

**Purpose**: Browser/Safari window chrome wrapper.

**Props**:
- Provides Safari-like window decoration

**Usage**:
```svelte
<script>
  import * as T from 'teenoo';
</script>

<T.Safari>
  <div>Content displayed in Safari window</div>
</T.Safari>
```

---

### 18. Embed

**Purpose**: Development tool for visually configuring Autolayout components. Provides a UI to configure alignment, direction, gap, padding, and borders, then generates the corresponding Autolayout code.

**Props**:
- `showAutolayout` ($bindable boolean, default: false) - Controls visibility of the configuration UI
- `currentAlignment` (string, default: "center") - Options: "left", "center", "right", "top-left", "top", "top-right", "bottom-left", "bottom", "bottom-right"
- `currentDirection` (string, default: "horizontal") - Options: "horizontal", "vertical"
- `gap` (number, default: null) - Gap between children in pixels
- `paddingHorizontal` (number, default: 16) - Left/right padding in pixels
- `paddingVertical` (number, default: 16) - Top/bottom padding in pixels
- `borderAll`, `borderLeft`, `borderRight`, `borderTop`, `borderBottom` (boolean) - Border positions
- `borderWeight` (number, default: null) - Border thickness
- `borderColor` (string, default: "primary") - Options: "primary", "secondary", "strong"
- `buttonLeft`, `buttonTop`, `buttonRight`, `buttonBottom` (string) - Position of control button
- `position` (string, default: "fixed") - CSS position of the UI

**Usage**:
```svelte
<script>
  import * as T from 'teenoo';

  let showEmbed = $state(false);
</script>

<!-- Add to your page for development -->
<T.Embed bind:showAutolayout={showEmbed} />

<!-- Use during development to visually configure Autolayout -->
<!-- The Embed UI will generate code like: -->
<!-- <T.Autolayout gap="16px" paddingLeft="16px" center> </T.Autolayout> -->
```

> **Note**: Embed is intended for development/prototyping purposes only. It helps you visually create Autolayout configurations which you can then copy into your code.

---

### 19. Tagbuilder

**Purpose**: Tag input and management component.

**Props**:
- `tags` ($bindable array) - Array of tag strings
- `placeholder` (string)

**Usage**:
```svelte
<script>
  import * as T from 'teenoo';

  let tags = $state(['javascript', 'svelte']);
</script>

<T.Tagbuilder bind:tags placeholder="Add tags..." />
```

---


---

## Important Patterns

### 1. Bindable Props

Many components use `$bindable()` for two-way data binding:

```svelte
<script>
  import * as T from 'teenoo';

  let value = $state("");
  let checked = $state(false);
</script>

<T.Input bind:value />
<T.Checkbox bind:checked />
```

### 2. Snippet API (Svelte 5)

Some components use snippets for flexible content:

```svelte
<script>
  import * as T from 'teenoo';

  let showModal = $state(false);
</script>

<T.Modal bind:showModal>
  {#snippet children()}
    <p>Modal body</p>
  {/snippet}

  {#snippet footer()}
    <T.Button>Close</T.Button>
  {/snippet}
</T.Modal>
```

### 3. Event Handlers

Use inline functions or predefined handlers:

```svelte
<script>
  import * as T from 'teenoo';

  let count = $state(0);
</script>

<T.Button onclick={() => count++}>Increment</T.Button>
<T.Input oninput={(e) => console.log(e.target.value)} />
```

### 4. CSS Variables

All components use CSS variables from the design system:

- `--ds-primary` - Primary color
- `--ds-textPrimary`, `--ds-textSecondary`, `--ds-textTertiary`
- `--ds-surfacePrimary`, `--ds-surfaceSecondary`
- `--ds-borderPrimary`, `--ds-borderSecondary`
- Size tokens: `--8px`, `--12px`, `--16px`, `--20px`, `--24px`, `--32px`
- `--font-base` - Base font family

### 5. Boolean Modifiers

Many components use boolean props as modifiers:

```svelte
<script>
  import * as T from 'teenoo';
</script>

<T.Button small icon />
<T.Input search disabled />
<T.Modal large closeButton />
```

---

## Common Usage Patterns

### Form with Validation

```svelte
<script>
  import * as T from 'teenoo';

  let email = $state("");
  let password = $state("");
  let remember = $state(false);
  let emailError = $state("");

  function handleSubmit() {
    if (!email.includes('@')) {
      emailError = "Invalid email";
      return;
    }
    // Submit form
  }
</script>

<T.Autolayout vertical gap="16px">
  <T.Input
    bind:value={email}
    label="Email"
    error={emailError}
    inputType="email"
  />

  <T.Input
    bind:value={password}
    label="Password"
    inputType="password"
  />

  <T.Checkbox bind:checked={remember} label="Remember me" />

  <T.Button onclick={handleSubmit}>Sign In</T.Button>
</T.Autolayout>
```

### Modal Dialog

```svelte
<script>
  import * as T from 'teenoo';

  let showConfirm = $state(false);

  function handleDelete() {
    // Delete action
    showConfirm = false;
  }
</script>

<T.Button onclick={() => showConfirm = true}>Delete</T.Button>

<T.Modal bind:showModal={showConfirm} title="Confirm Delete" closeButton>
  {#snippet children()}
    <p>Are you sure you want to delete this item?</p>
  {/snippet}

  {#snippet footer()}
    <T.Button variant="secondary" onclick={() => showConfirm = false}>
      Cancel
    </T.Button>
    <T.Button variant="primary" onclick={handleDelete}>
      Delete
    </T.Button>
  {/snippet}
</T.Modal>
```

### Tabbed Interface

```svelte
<script>
  import * as T from 'teenoo';

  let activeTab = $state('general');

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'security', label: 'Security' },
    { id: 'notifications', label: 'Notifications' }
  ];
</script>

<T.Autolayout vertical gap="20px">
  <T.Tabs bind:activeTab tabs={tabs} />

  {#if activeTab === 'general'}
    <T.Input label="Username" />
    <T.Input label="Email" />
  {:else if activeTab === 'security'}
    <T.Input label="Current Password" inputType="password" />
    <T.Input label="New Password" inputType="password" />
  {:else}
    <T.Switch label="Email notifications" />
    <T.Switch label="Push notifications" />
  {/if}
</T.Autolayout>
```

### Responsive Layout

```svelte
<script>
  import * as T from 'teenoo';

  const options = [
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' }
  ];
</script>

<T.Autolayout fillWidth gap="20px" wrap>
  <T.Autolayout vertical gap="12px" style="flex: 1; min-width: 300px;">
    <T.Text variant="heading">Section 1</T.Text>
    <T.Input placeholder="Search..." search />
  </T.Autolayout>

  <T.Autolayout vertical gap="12px" style="flex: 1; min-width: 300px;">
    <T.Text variant="heading">Section 2</T.Text>
    <T.Select options={options} />
  </T.Autolayout>
</T.Autolayout>
```

---

## Key Notes for LLMs

1. **Always use Svelte 5 runes syntax**: `$state()`, `$derived()`, `$effect()`, `$bindable()`
2. **Imports**: Always use `import * as T from 'teenoo'` and prefix components with `T.`
3. **Bindable values**: Use `bind:` for props marked as `$bindable`
4. **Snippets**: Use `{#snippet name()}...{/snippet}` syntax for component slots
5. **Boolean props**: Can be used as flags without `={true}` (e.g., `<T.Button small />`)
6. **CSS variables**: Use design system variables for consistency
7. **Event handlers**: Prefix with `on` (e.g., `onclick`, `oninput`, `onchange`)
8. **Modal sizes**: Use boolean props `large` or `xl` instead of size string

---

## Design System Variables Reference

### Colors
- `--ds-primary` - Primary brand color
- `--ds-textPrimary` - Primary text
- `--ds-textSecondary` - Secondary text
- `--ds-textTertiary` - Tertiary text
- `--ds-textWhite` - White text
- `--ds-surfacePrimary` - Primary surface
- `--ds-surfaceSecondary` - Secondary surface
- `--ds-borderPrimary` - Primary border
- `--ds-borderSecondary` - Secondary border
- `--ds-borderStrong` - Strong border

### Sizing
- `--4px`, `--8px`, `--12px`, `--16px`, `--20px`, `--24px`, `--32px`

### Typography
- `--font-base` - Base font family

---

## TypeScript Support

All components are written in TypeScript and export proper types. Use type inference or import types as needed for full IDE support.

---

## Version

Current version: **0.0.42**

For the latest updates, check the package.json or npm registry.

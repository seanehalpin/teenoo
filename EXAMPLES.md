# teenoo Examples

Quick copy-paste examples for common use cases.

## Basic Form

```svelte
<script>
  import * as T from 'teenoo';

  let email = $state("");
  let password = $state("");

  function handleSubmit() {
    if (!email.includes('@')) {
      emailError = "Invalid email";
      return;
    }
    console.log('Submitted:', { email, password });
  }
</script>

<T.Autolayout vertical gap="16px" padding="var(--20px)">
  <T.Text heading>Sign In</T.Text>

  <T.Input
    bind:value={email}
    label="Email"
    inputType="email"
  />

  <T.Input
    bind:value={password}
    label="Password"
    inputType="password"
  />

  <T.Button onclick={handleSubmit}>
    Sign In
  </T.Button>
</T.Autolayout>
```

## Modal Dialog

```svelte
<script>
  import * as T from 'teenoo';

  let showModal = $state(false);

  function handleConfirm() {
    console.log('Confirmed!');
    showModal = false;
  }
</script>

<T.Button onclick={() => showModal = true}>
  Open Modal
</T.Button>

<T.Modal bind:showModal title="Confirm Action" closeButton>
  <T.Text>Are you sure you want to proceed?</T.Text>

  {#snippet footer()}
    <T.Autolayout gap="8px">
      <T.Button variant="secondary" onclick={() => showModal = false}>
        Cancel
      </T.Button>
      <T.Button variant="primary" onclick={handleConfirm}>
        Confirm
      </T.Button>
    </T.Autolayout>
  {/snippet}
</T.Modal>
```

## Settings Panel with Tabs

```svelte
<script>
  import * as T from 'teenoo';

  let activeTab = $state('general');
  let darkMode = $state(false);
  let notifications = $state(true);

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'privacy', label: 'Privacy' },
    { id: 'notifications', label: 'Notifications' }
  ];
</script>

<T.Autolayout vertical gap="var(--20px)" padding="var(--20px)">
  <T.Text title>Settings</T.Text>

  <T.Tabs bind:activeTab tabs={tabs} />

  {#if activeTab === 'general'}
    <T.Autolayout vertical gap="var(--12px)">
      <T.Switch
        bind:checked={darkMode}
        label="Dark mode"
        spaced
      />
      <T.Input label="Username" value="john_doe" />
    </T.Autolayout>
  {:else if activeTab === 'privacy'}
    <T.Autolayout vertical gap="var(--12px)">
      <T.Checkbox label="Make profile public" />
      <T.Checkbox label="Show email address" />
    </T.Autolayout>
  {:else}
    <T.Autolayout vertical gap="var(--12px)">
      <T.Switch
        bind:checked={notifications}
        label="Push notifications"
        spaced
      />
    </T.Autolayout>
  {/if}
</T.Autolayout>
```

## Card List with Avatars

```svelte
<script>
  import * as T from 'teenoo';

  const users = [
    { id: 1, name: 'Alice Johnson', role: 'Designer', color: 'blue' },
    { id: 2, name: 'Bob Smith', role: 'Developer', color: 'green' },
    { id: 3, name: 'Carol White', role: 'Product Manager', color: 'magenta' }
  ];
</script>

<T.Autolayout vertical gap="var(--12px)" padding="var(--20px)">
  {#each users as user}
    <T.Autolayout
      left
      gap="var(--12px)"
      padding="16px"
      border
      borderRadius="8px"
    >
      <T.Avatar
        name={user.name}
        color={user.color}
        size="large"
      />

      <T.Autolayout vertical gap="4px">
        <T.Text strong>{user.name}</T.Text>
        <T.Text small color="var(--ds-textSecondary)">
          {user.role}
        </T.Text>
      </T.Autolayout>
    </T.Autolayout>
  {/each}
</T.Autolayout>
```

## Toast Notifications

```svelte
<script>
  import * as T from 'teenoo';
  import { showToast } from 'teenoo';

  function notify() {
    showToast({
      text: 'Settings saved successfully!',
      icon: '✓',
      buttonText: 'Undo',
      buttonAction: () => console.log('Undo clicked'),
      duration: 3000
    });
  }
</script>

<!-- Add Toast component to your app root -->
<T.Toast id="app-toast" />

<T.Button onclick={notify}>
  Save Settings
</T.Button>
```

## Range Slider

```svelte
<script>
  import * as T from 'teenoo';

  let price = $state(50);
  let rangeStart = $state(20);
  let rangeEnd = $state(80);
</script>

<T.Autolayout vertical gap="var(--20px)" padding="var(--20px)">
  <!-- Single handle -->
  <T.Slider
    bind:value={price}
    min={0}
    max={100}
    label="Price"
    formatFn={(val) => `$${val}`}
  />

  <!-- Dual handle -->
  <T.Slider
    bind:startValue={rangeStart}
    bind:endValue={rangeEnd}
    min={0}
    max={100}
    dual
    label="Price Range"
    formatFn={(val) => `$${val}`}
  />
</T.Autolayout>
```

## Tag Input

```svelte
<script>
  import * as T from 'teenoo';

  let tags = $state(['svelte', 'typescript', 'ui']);
</script>

<T.Autolayout vertical gap="var(--12px)" padding="var(--20px)">
  <T.Text heading>Technologies</T.Text>

  <T.Tagbuilder
    bind:tags
    label="Add tags"
    placeholder="Type and press Enter..."
    maxTags={10}
  />

  <T.Text small color="var(--ds-textSecondary)">
    {tags.length} tag{tags.length !== 1 ? 's' : ''} added
  </T.Text>
</T.Autolayout>
```

## Responsive Flex Layout

```svelte
<script>
  import * as T from 'teenoo';

  const cards = [
    { title: 'Card 1', description: 'First card' },
    { title: 'Card 2', description: 'Second card' },
    { title: 'Card 3', description: 'Third card' },
  ];
</script>

<T.Autolayout fillWidth wrap gap="16px" padding="var(--20px)">
  {#each cards as card}
    <T.Autolayout
      vertical
      gap="8px"
      padding="16px"
      border
      borderRadius="8px"
      style="flex: 1; min-width: 250px;"
    >
      <T.Text strong>{card.title}</T.Text>
      <T.Text small>{card.description}</T.Text>
    </T.Autolayout>
  {/each}
</T.Autolayout>
```

## TypeScript Usage

```typescript
import * as T from 'teenoo';
import type { ButtonProps, InputProps } from 'teenoo';

// Extract prop types
type ButtonVariant = ButtonProps['variant']; // "primary" | "secondary" | "flat"

// Use in custom components
interface CustomFormProps {
  submitLabel: string;
  submitVariant: ButtonVariant;
  inputs: Array<Partial<InputProps>>;
}

// Type-safe component
function createForm(props: CustomFormProps) {
  // Your logic here
}
```

---

For complete API documentation, see [LLM_README.md](./LLM_README.md).

/**
 * Type definitions for teenoo component props
 * These types are exported for users who want to reference them
 */

import type { Snippet } from 'svelte';
import type { Component } from 'svelte';

// ============================================================================
// Button
// ============================================================================

export interface ButtonProps {
  /** Button content */
  children?: Snippet;
  /** Makes button full width */
  stretch?: boolean;
  /** Smaller button variant (24px height) */
  small?: boolean;
  /** Shows dropdown arrow icon */
  dropdown?: boolean;
  /** Icon-only button (32x32px) */
  icon?: boolean;
  /** Left-aligns button content */
  leftAlign?: boolean;
  /** Disables the button */
  disabled?: boolean;
  /** Button style variant: "primary", "secondary", "flat" */
  variant?: 'primary' | 'secondary' | 'flat';
  /** Modal ID to open on click */
  openModal?: string;
  /** Click event handler */
  onclick?: (event: MouseEvent) => void;
  /** Inline CSS styles */
  style?: string;
  /** For icon buttons, removes default fill */
  nofill?: boolean;
}

// ============================================================================
// Input
// ============================================================================

export interface InputProps {
  /** Input type (text, email, password, etc.) */
  inputType?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Input value (bindable) */
  value?: string;
  /** Label text displayed above input */
  label?: string;
  /** Error message (shows error state if truthy) */
  error?: string;
  /** Disables the input */
  disabled?: boolean;
  /** Smaller input variant */
  small?: boolean;
  /** Makes input full width */
  stretch?: boolean;
  /** Shows search icon */
  search?: boolean;
  /** Change event handler */
  onchange?: (event: Event) => void;
  /** Input event handler */
  oninput?: (event: Event) => void;
  /** Focus event handler */
  onfocus?: (event: FocusEvent) => void;
  /** Blur event handler */
  onblur?: (event: FocusEvent) => void;
}

// ============================================================================
// Textarea
// ============================================================================

export interface TextareaProps {
  /** Placeholder text */
  placeholder?: string;
  /** Textarea value (bindable) */
  value?: string;
  /** Label text displayed above textarea */
  label?: string;
  /** Error message (shows error state if truthy) */
  error?: string;
  /** Disables the textarea */
  disabled?: boolean;
  /** Number of visible rows */
  rows?: number;
  /** Maximum character length */
  maxlength?: number;
  /** Makes textarea full width */
  stretch?: boolean;
  /** Enables manual resizing */
  resize?: boolean;
  /** Change event handler */
  onchange?: (event: Event) => void;
  /** Input event handler */
  oninput?: (event: Event) => void;
  /** Focus event handler */
  onfocus?: (event: FocusEvent) => void;
  /** Blur event handler */
  onblur?: (event: FocusEvent) => void;
}

// ============================================================================
// Select
// ============================================================================

export interface SelectOption {
  /** Option value */
  value: string;
  /** Display label */
  label: string;
}

export interface SelectProps {
  /** Array of options with value/label pairs */
  options?: SelectOption[];
  /** Selected value */
  value?: string;
  /** Label text displayed above select */
  label?: string;
  /** Error message (shows error state if truthy) */
  error?: string;
  /** Disables the select */
  disabled?: boolean;
  /** Aligns dropdown to the right */
  alignRight?: boolean;
  /** Makes select full width */
  stretch?: boolean;
  /** Placeholder text when no option selected */
  placeholder?: string;
  /** Change event handler, receives selected value */
  onchange?: (value: string) => void;
}

// ============================================================================
// Checkbox
// ============================================================================

export interface CheckboxProps {
  /** Checked state (bindable) */
  checked?: boolean;
  /** Indeterminate state (bindable) */
  indeterminate?: boolean;
  /** Disables the checkbox */
  disabled?: boolean;
  /** Shows error state */
  error?: boolean;
  /** Label text */
  label?: string;
  /** HTML id attribute (auto-generated if not provided) */
  id?: string;
  /** HTML name attribute */
  name?: string;
  /** ARIA label for accessibility */
  ariaLabel?: string;
}

// ============================================================================
// Switch
// ============================================================================

export interface SwitchProps {
  /** Adds space between label and switch */
  spaced?: boolean;
  /** Checked state (bindable) */
  checked?: boolean;
  /** Disables the switch */
  disabled?: boolean;
  /** HTML id attribute (auto-generated if not provided) */
  id?: string;
  /** HTML name attribute */
  name?: string;
  /** Label text */
  label?: string;
  /** ARIA label for accessibility */
  ariaLabel?: string;
}

// ============================================================================
// Slider
// ============================================================================

export interface SliderProps {
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Current value for single handle (bindable) */
  value?: number;
  /** Start value for dual handle mode */
  startValue?: number;
  /** End value for dual handle mode */
  endValue?: number;
  /** Enable dual-handle mode */
  dual?: boolean;
  /** Label text */
  label?: string;
  /** Custom label for value display */
  valueLabel?: string;
  /** Disables the slider */
  disabled?: boolean;
  /** Makes slider full width */
  stretch?: boolean;
  /** Shows value output */
  showOutput?: boolean;
  /** Function to format displayed value */
  formatFn?: (value: number) => string;
  /** Change event handler */
  onchange?: (value: number) => void;
  /** Input event handler (fires during drag) */
  oninput?: (value: number) => void;
  /** Transition configuration */
  transition?: any;
}

// ============================================================================
// Modal
// ============================================================================

export interface ModalProps {
  /** Controls modal visibility (bindable) */
  showModal?: boolean;
  /** Modal ID (auto-generated if not provided) */
  id?: string;
  /** Modal title text */
  title?: string;
  /** Modal body content */
  children?: Snippet;
  /** Modal footer content */
  footer?: Snippet;
  /** Shows close X button */
  closeButton?: boolean;
  /** Uses fixed positioning */
  fixed?: boolean;
  /** Large modal variant (800px width) */
  large?: boolean;
  /** Extra large modal variant (1000px width) */
  xl?: boolean;
}

// ============================================================================
// Text
// ============================================================================

export interface TextProps {
  /** Text content */
  children?: Snippet;
  /** Tiny size variant (10px) */
  tiny?: boolean;
  /** Small size variant (11px) */
  small?: boolean;
  /** Regular size variant (12px, default) */
  regular?: boolean;
  /** Large size variant (13px) */
  large?: boolean;
  /** Bold weight variant */
  strong?: boolean;
  /** Monospace font variant */
  code?: boolean;
  /** Heading variant (16px, bold) */
  heading?: boolean;
  /** Title variant (18px, bold) */
  title?: boolean;
  /** Jumbo variant (24px, bold) */
  jumbo?: boolean;
  /** Custom text color (CSS value) */
  color?: string;
  /** Custom CSS class */
  className?: string;
  /** Enable pretty text wrapping */
  pretty?: boolean;
  /** HTML element to render as: "span", "p", "div", "label", "h1", "h2", "h3", "jumbo" */
  as?: 'span' | 'p' | 'div' | 'label' | 'h1' | 'h2' | 'h3' | 'jumbo';
}

// ============================================================================
// Avatar
// ============================================================================

export interface AvatarProps {
  /** Size variant: "small" (24px), "medium" (32px), "large" (48px) */
  size?: 'small' | 'medium' | 'large';
  /** Team avatar with rounded corners (vs circular for user) */
  team?: boolean;
  /** Single letter or two initials to display */
  initial?: string;
  /** Image URL */
  image?: string;
  /** Full name for accessibility and auto-generating initials */
  name?: string;
  /** Color name: "primary", "red", "blue", "magenta", "green", "orange", "gold" (or custom CSS color) */
  color?: string;
  /** Custom background color (overrides color prop) */
  bgcolor?: string;
  /** Custom text color (defaults to white) */
  textcolor?: string;
  /** Number 1-20 for pravatar.cc placeholder avatar (0 to disable) */
  avatarNum?: number;
  /** Click event handler */
  onclick?: (event: MouseEvent) => void;
}

// ============================================================================
// Autolayout
// ============================================================================

export interface AutolayoutProps {
  /** Layout content */
  children?: Snippet;
  /** Vertical flex direction (column) */
  vertical?: boolean;
  /** Enable flex-wrap */
  wrap?: boolean;
  /** Click event handler */
  onclick?: (event: MouseEvent) => void;
  /** Debug outline */
  inspect?: boolean;
  /** Space-between layout */
  auto?: boolean;
  /** Makes layout full width */
  fillWidth?: boolean;
  /** Align top-left */
  topLeft?: boolean;
  /** Align top-center */
  topCenter?: boolean;
  /** Align top-right */
  topRight?: boolean;
  /** Align left (vertically centered) */
  left?: boolean;
  /** Align center (both axes) */
  center?: boolean;
  /** Align right (vertically centered) */
  right?: boolean;
  /** Align bottom-left */
  bottomLeft?: boolean;
  /** Align bottom-center */
  bottomCenter?: boolean;
  /** Align bottom-right */
  bottomRight?: boolean;
  /** Space-between layout (alias for auto) */
  gapAuto?: boolean;
  /** Padding for all sides (e.g., "16px") */
  padding?: string;
  /** Left padding */
  paddingLeft?: string;
  /** Right padding */
  paddingRight?: string;
  /** Top padding */
  paddingTop?: string;
  /** Bottom padding */
  paddingBottom?: string;
  /** Border on all sides */
  border?: boolean;
  /** Left border only */
  borderLeft?: boolean;
  /** Right border only */
  borderRight?: boolean;
  /** Top border only */
  borderTop?: boolean;
  /** Bottom border only */
  borderBottom?: boolean;
  /** Border thickness in pixels */
  borderWeight?: number;
  /** Border color: "primary", "secondary", "strong" */
  borderColor?: 'primary' | 'secondary' | 'strong';
  /** Border radius for all corners */
  borderRadius?: string;
  /** Top-left border radius */
  borderRadiusTopLeft?: string;
  /** Top-right border radius */
  borderRadiusTopRight?: string;
  /** Bottom-left border radius */
  borderRadiusBottomLeft?: string;
  /** Bottom-right border radius */
  borderRadiusBottomRight?: string;
  /** Gap between children (e.g., "16px") */
  gap?: string;
  /** Background color */
  background?: string;
  /** Width (e.g., "100%", "500px") */
  width?: string;
  /** Height (e.g., "100%", "500px") */
  height?: string;
  /** Sets flex: 1 */
  flex?: boolean;
  /** Custom CSS class */
  class?: string;
}

// ============================================================================
// Tabs
// ============================================================================

export interface TabItem {
  /** Tab identifier */
  id: string;
  /** Tab display label */
  label: string;
}

export interface TabsProps {
  /** Array of tab items */
  tabs?: TabItem[];
  /** Currently active tab ID (bindable) */
  activeTab?: string;
  /** Tab style variant: "chrome" or "flat" */
  variant?: 'chrome' | 'flat';
  /** Click handler, receives (tabId, event) */
  onclick?: (tabId: string, event: Event) => void;
}

// ============================================================================
// Toast
// ============================================================================

export interface ToastProps {
  /** Toast ID (required for showToast utility) */
  id: string;
  /** Toast visibility (bindable) */
  visible?: boolean;
  /** Toast message text */
  text?: string;
  /** Icon or emoji */
  icon?: string;
  /** Action button text */
  buttonText?: string;
  /** Action button click handler */
  buttonAction?: () => void;
  /** Auto-dismiss duration in milliseconds */
  duration?: number;
}

// ============================================================================
// Popover
// ============================================================================

export interface PopoverProps {
  /** Popover content */
  children?: Snippet;
  /** Z-index value */
  zIndex?: number;
  /** Top position */
  top?: string;
  /** Left position */
  left?: string;
  /** Right position */
  right?: string;
  /** Bottom position */
  bottom?: string;
  /** CSS position property */
  position?: string;
  /** Width */
  width?: string;
  /** Height */
  height?: string;
  /** Background color */
  background?: string;
  /** Enable border */
  border?: boolean;
  /** Border thickness */
  borderWeight?: number;
  /** Border color */
  borderColor?: string;
  /** Border radius */
  borderRadius?: string;
  /** Padding */
  padding?: string;
  /** Box shadow */
  boxShadow?: string;
  /** Inline styles */
  style?: string;
}

// ============================================================================
// Tagbuilder
// ============================================================================

export interface TagbuilderProps {
  /** Array of tag strings (bindable) */
  tags?: string[];
  /** Label text */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Error message */
  error?: string;
  /** Disables the input */
  disabled?: boolean;
  /** Makes component full width */
  stretch?: boolean;
  /** Maximum number of tags allowed */
  maxTags?: number;
  /** Change event handler */
  onchange?: (tags: string[]) => void;
}

// ============================================================================
// Embed (Development Tool)
// ============================================================================

export interface EmbedProps {
  /** Controls visibility of configuration UI (bindable) */
  showAutolayout?: boolean;
  /** Current alignment setting */
  currentAlignment?: 'left' | 'center' | 'right' | 'top-left' | 'top' | 'top-right' | 'bottom-left' | 'bottom' | 'bottom-right';
  /** Layout direction */
  currentDirection?: 'horizontal' | 'vertical';
  /** Gap between children in pixels */
  gap?: number | null;
  /** Horizontal padding in pixels */
  paddingHorizontal?: number;
  /** Vertical padding in pixels */
  paddingVertical?: number;
  /** All-sides border */
  borderAll?: boolean;
  /** Left border */
  borderLeft?: boolean;
  /** Right border */
  borderRight?: boolean;
  /** Top border */
  borderTop?: boolean;
  /** Bottom border */
  borderBottom?: boolean;
  /** Border thickness */
  borderWeight?: number | null;
  /** Border color */
  borderColor?: 'primary' | 'secondary' | 'strong';
  /** Control button left position */
  buttonLeft?: string;
  /** Control button top position */
  buttonTop?: string;
  /** Control button right position */
  buttonRight?: string;
  /** Control button bottom position */
  butttonBottom?: string;
  /** CSS position of the UI */
  position?: string;
}

// ============================================================================
// Utilities
// ============================================================================

export interface ShowToastOptions {
  /** Toast message text */
  text: string;
  /** Icon or emoji */
  icon?: string;
  /** Action button text */
  buttonText?: string;
  /** Action button click handler */
  buttonAction?: () => void;
  /** Auto-dismiss duration in milliseconds */
  duration?: number;
}

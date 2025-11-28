// Import components
import Button from './Button.svelte';
import Nav from './Nav.svelte';
import Safari from './Safari.svelte';
import Autolayout from './Autolayout.svelte';
import Input from './Input.svelte';
import Select from './Select.svelte';
import Textarea from './Textarea.svelte';
import Tagbuilder from './Tagbuilder.svelte';
import Slider from './Slider.svelte';
import Avatar from './Avatar.svelte';
import Modal from './Modal.svelte';
import Switch from './Switch.svelte';
import Toast from './Toast.svelte';
import Text from './Text.svelte';
import Table from './Table.svelte';
import Embed from './Embed.svelte';
import Tabs from './Tabs.svelte';
import Checkbox from './Checkbox.svelte';
import Popover from './Popover.svelte';
import { showToast } from './toastUtils';
import StyleProvider from './StyleProvider.svelte';

// Export types for TypeScript users
export type {
  ButtonProps,
  InputProps,
  TextareaProps,
  SelectProps,
  SelectOption,
  CheckboxProps,
  SwitchProps,
  SliderProps,
  ModalProps,
  TextProps,
  AvatarProps,
  AutolayoutProps,
  TabsProps,
  TabItem,
  ToastProps,
  PopoverProps,
  TagbuilderProps,
  EmbedProps,
  ShowToastOptions
} from './types';

// Named exports for individual components
export { 
  Button,
  Nav,
  Safari,
  Autolayout,
  Input,
  Select,
  Textarea,
  Tagbuilder,
  Slider,
  Avatar,
  Modal,
  Switch,
  Toast,
  Text,
  Table,
  Tabs,
  Checkbox,
  Popover,
  showToast,
  Embed,
  StyleProvider
};

// Export a components object for easy access to all components
export const components = {
  Button,
  Nav,
  Safari,
  Autolayout,
  Input,
  Select,
  Textarea,
  Tagbuilder,
  Slider,
  Avatar,
  Modal,
  Switch,
  Toast,
  Text,
  Table,
  Tabs,
  Checkbox,
  Popover,
  Embed,
  StyleProvider
};

// Default export with all components
export default components;
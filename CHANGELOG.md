# Changelog

All notable changes to teenoo will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- README.md with quick start guide
- CHANGELOG.md for version tracking
- Enhanced package.json metadata (keywords, repository, license)
- LLM_README.md for comprehensive API documentation
- EXAMPLES.md with copy-paste code snippets
- Comprehensive TypeScript interfaces with JSDoc comments in `types.ts`
- Type exports for all component props (`import type { ButtonProps }`)
- Package export for types: `teenoo/types`

### Changed
- **BREAKING**: All Autolayout props (41 props) are now bindable
- **BREAKING**: All Button props (10 props) are now bindable
- Improved type definitions with proper types instead of `any`
- Updated documentation with bindable prop examples

## [0.0.42] - 2025

### Added
- Modal size variants: `large` and `xl` props
- Comprehensive component library with 20+ components
- TypeScript support with auto-generated type definitions
- Svelte 5 runes syntax support
- Visual layout configuration tool (Embed component)

### Components
- Layout: Autolayout, Embed
- Forms: Button, Input, Textarea, Select, Checkbox, Switch, Slider, Tagbuilder
- Navigation: Nav, Tabs
- Display: Text, Table, Avatar, Safari, Popover
- Feedback: Modal, Toast

---

## Version History

For versions prior to 0.0.42, see git commit history.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- Build: `npm run build`
- Dev/Watch: `npm run dev`
- TypeCheck: `svelte-check`
- Package Publishing: `npm run prepublishOnly` (runs build)

## Code Style Guidelines
- TypeScript with strict typing enabled
- Svelte components use runes syntax (e.g., `$props()`)
- Component naming: PascalCase (e.g., `Button.svelte`)
- Export components individually from `src/lib/index.ts`
- Use CSS variables for design system values (e.g., `--ds-primary`)
- SCSS syntax allowed within Svelte style blocks
- CSS class names: camelCase or kebab-case
- Boolean props default to false when not specified
- Props should be typed and exported via $props() in Svelte components
- Use relative imports for internal components
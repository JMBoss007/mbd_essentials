# MBD Essentials — Design System (Direction Only)

**Status: direction only.** This document captures the *approved visual
direction and principles* for MBD Essentials. It intentionally does **not**
define final hex colors, typography scale, spacing tokens, shadows, or
component measurements. Those will be defined in a dedicated design-system
task from a reference source, and this file should be expanded at that point
— not before.

Do not invent concrete tokens ahead of that task, even as a starting point.

## Desired Feel

MBD Essentials must feel:

- premium
- sophisticated
- energetic
- modern
- alive
- polished
- highly intentional
- professional rather than generic
- suitable for both serious beginners and experienced users

## Approved Visual Direction

The approved palette/mood combines:

- very dark brown
- dark purple
- muted lavender
- warm premium neutral tones
- restrained gradients
- subtle radial/ambient glow effects
- luxurious dark surfaces
- excellent contrast
- generous spacing
- smooth animations
- strong typography
- rounded but mature components

## Explicitly Avoid

- childish design
- generic gym-app aesthetics
- excessive neon
- excessive gradients
- gradients on every component
- random glassmorphism
- clutter
- visually noisy cards
- cheap-looking black/red bodybuilding styling

## Gradient Usage Principle

Gradients must be used intentionally, for visual hierarchy — not decoratively
and not on every component.

## Current Implementation State

- `nativewind` and `expo-linear-gradient` are installed as dependencies.
- NativeWind is **not** configured yet (no Tailwind config, no global
  stylesheet, no Babel/Metro wiring for it).
- No design tokens (colors, type scale, spacing, shadows, radii) have been
  defined yet.
- The app currently uses the stock Expo Router starter theme
  (`constants/theme.ts`, `hooks/use-color-scheme.ts`), which is a placeholder
  and not part of the MBD design direction.

Do not treat the stock starter theme as authoritative — it exists only
because the app hasn't been designed yet.

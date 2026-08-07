# MBD Essentials — Design System

**Status: implemented.** This document is the source of truth for the MBD
Essentials visual design system, together with the theme files under
[src/theme/](../src/theme/) and the reusable UI primitives under
[src/components/ui/](../src/components/ui/). If this document and the theme
files ever disagree, the theme files win — update this document to match.

A live, on-device preview of every token and component below is available at
the `/design-system` route (see [Preview Route](#preview-route)).

## Desired Feel

MBD Essentials must feel: premium, sophisticated, energetic, modern, alive,
polished, highly intentional, and professional rather than generic. It is
suitable for both serious beginners and experienced users.

Explicitly avoid: childish design, generic gym-app aesthetics, excessive
neon/gradients, gradients on every component, random glassmorphism, clutter,
visually noisy cards, and cheap-looking black/red bodybuilding styling.

Gradients and the purple/lavender palette exist to create **hierarchy**, not
to cover every surface. Use them intentionally.

## Colors

Source: [src/theme/colors.ts](../src/theme/colors.ts). Mirrored into
`tailwind.config.js` as `mbd-*` color classes (see [NativeWind Theme](#nativewind-theme))
because Tailwind's config runs in plain Node and cannot import the TS module —
keep both in sync if values change.

**Brand**

| Token | Hex | Tailwind class |
| --- | --- | --- |
| `brand.deepBrown` | `#1A1412` | `mbd-deep-brown` |
| `brand.darkPlum` | `#2A1835` | `mbd-plum` |
| `brand.royalPurple` | `#5B3DCC` | `mbd-purple` |
| `brand.lavender` | `#B28CFF` | `mbd-lavender` |

**Neutrals**

| Token | Hex | Tailwind class |
| --- | --- | --- |
| `neutral.charcoal` / `neutral.background` | `#0E0B10` | `mbd-charcoal` / `mbd-background` |
| `neutral.darkSurface` | `#151218` | `mbd-dark-surface` |
| `neutral.surface` | `#1F1A22` | `mbd-surface` |
| `neutral.surfaceElevated` | `#25202A` | `mbd-surface-elevated` |
| `neutral.border` | `#2E2833` | `mbd-border` |
| `neutral.borderStrong` | `#44394D` | `mbd-border-strong` |
| `neutral.textPrimary` | `#F4F2F7` | `mbd-text` |
| `neutral.textSecondary` | `#B8B1C1` | `mbd-text-secondary` |
| `neutral.textMuted` | `#81798B` | `mbd-text-muted` |
| `neutral.disabled` | `#625B68` | `mbd-disabled` |

**Semantic**

| Token | Hex | Tailwind class |
| --- | --- | --- |
| `semantic.success` | `#22C55E` | `mbd-success` |
| `semantic.warning` | `#F59E0B` | `mbd-warning` |
| `semantic.error` | `#EF4444` | `mbd-error` |
| `semantic.info` | `#4EA1FF` | `mbd-info` |

Never write raw hex strings in components — import from `@/src/theme`.

## Gradients

Source: [src/theme/gradients.ts](../src/theme/gradients.ts), rendered with
`expo-linear-gradient`.

| Gradient | Colors | Usage |
| --- | --- | --- |
| `primaryCta` | `darkPlum → lavender` | Primary button fill |
| `performance` | `royalPurple → #8C68FF` | Progress fill, secondary accents |
| `accent` | `#7A4DFF → #C19CFF` | Highlight moments |
| `darkSurface` | `darkSurface → surface` | Subtle elevated panel backgrounds |

`glow.lavender` / `glow.lavenderStrong` / `glow.plum` are low-opacity rgba
strings for ambient effects. Glows must stay subtle and are not applied by
default to every card — see [Shadows & Glow](#shadows--glow).

## Typography

Source: [src/theme/typography.ts](../src/theme/typography.ts). Font: Inter,
loaded via `@expo-google-fonts/inter` at the app root
([app/_layout.tsx](../app/_layout.tsx)), which blocks first render (keeping
the splash screen up) until the required static weights are loaded — this
prevents a flash of the wrong font.

| Variant | Face | Size | Line height |
| --- | --- | --- | --- |
| `display1` | Inter ExtraBold | 32 | 40 |
| `display2` | Inter ExtraBold | 28 | 36 |
| `heading1` | Inter Bold | 22 | 28 |
| `heading2` | Inter SemiBold | 18 | 24 |
| `bodyLarge` | Inter Medium | 16 | 24 |
| `body` | Inter Regular | 14 | 22 |
| `caption` | Inter Regular | 12 | 16 |

Variants intentionally omit `fontWeight` — weight lives in the static Inter
face itself (e.g. `Inter_700Bold`). Pairing a static face with a numeric
`fontWeight` can make Android render the wrong glyph or fake-bold it.

Use the `AppText` component rather than raw `Text` + manual font strings.
`AppText` never disables font scaling.

## Spacing

Source: [src/theme/spacing.ts](../src/theme/spacing.ts). Scale: `4, 8, 12,
16, 20, 24, 32, 40, 48, 64`, keyed by their own pixel value (e.g.
`spacing[16]`). Default horizontal mobile screen padding is `spacing[20]`
(exposed as `screenPadding`), applied automatically by `Screen` unless
`padded={false}`.

## Radii

Source: [src/theme/radius.ts](../src/theme/radius.ts).

| Token | Value |
| --- | --- |
| `sm` | 6 |
| `md` | 10 |
| `lg` | 16 |
| `xl` | 20 |
| `2xl` | 28 |
| `full` | 999 |

## Shadows & Glow

Source: [src/theme/shadows.ts](../src/theme/shadows.ts). Android (the
primary test target) ignores iOS `shadow*` props, so `shadows.sm/md/lg` use
`elevation` on Android and `shadowColor/Offset/Opacity/Radius` on iOS/web.

`accentGlow` is a restrained, opt-in highlight for a single selected/important
element — a soft lavender rim on Android (colored elevation shadows aren't
reliable there) and a colored shadow on iOS. It is not applied to cards or
buttons by default. Do not put a purple glow around every surface.

## NativeWind Theme

`tailwind.config.js` extends `theme.colors` and `theme.borderRadius` with the
`mbd-*` names listed above (e.g. `bg-mbd-surface`, `text-mbd-text-secondary`,
`rounded-mbd-lg`). This remains NativeWind v4 / Tailwind v3 config syntax —
do not migrate to NativeWind v5 or Tailwind v4 syntax. Prefer these classes
for simple layout/route-level styling; the UI primitives themselves use the
`src/theme` TypeScript tokens directly (via `StyleSheet`) for anything that
needs to be cross-platform-correct — gradients, shadows/elevation, and
typography — since those aren't reliably expressible as static Tailwind
classes in React Native.

## Components

All primitives live in [src/components/ui/](../src/components/ui/) and are
exported from `@/src/components/ui`. They are typed, avoid `any`, respect
`disabled` state, use accessible touch targets (≥44–48px), and use design
tokens exclusively (no inline hex/magic numbers).

- **Screen** — safe area + MBD background + optional scroll + default
  horizontal padding + keyboard-avoiding behavior for future forms.
- **AppText** — typography variants (`display1`…`caption`) × semantic colors
  (`primary`, `secondary`, `muted`, `success`, `warning`, `error`).
- **Button** — `primary` (gradient pill), `secondary` (surface + border),
  `ghost` (text-only). Supports `loading`, `disabled`, `leftIcon`/`rightIcon`,
  `fullWidth`. Does not know about navigation — callers pass `onPress`.
- **Card** — `surface`, `elevated`, `outlined`. Generic container only, no
  fitness-specific fields or content.
- **AppInput** — label, error/helper text, left/right icon, focus and error
  border states, `secureTextEntry`, keyboard/autoCapitalize passthrough. No
  authentication logic.
- **Badge** — `default`, `selected`, `success`, `warning`, `error` pill chip.
  Takes a `label` prop — business labels (e.g. "Beginner", "Completed") are
  supplied by callers, never hardcoded in the component.
- **ProgressBar** — linear 0–1 progress, optional gradient fill, exposes
  `accessibilityRole="progressbar"` with a percentage value.
- **IconButton** — circular icon control using `@expo/vector-icons`
  (`Ionicons`), with `selected`/`disabled` states.

## Accessibility Principles

- Minimum interactive touch target: 44–48px (buttons, icon buttons, inputs).
- Text never disables font scaling (`allowFontScaling` stays on).
- Color pairs (text/background) follow the token contrast built into the
  palette above — don't introduce new low-contrast combinations.
- Interactive components set `accessibilityRole`, and `accessibilityLabel`
  where the visible label alone isn't sufficient (e.g. `IconButton`).
- `ProgressBar` exposes `accessibilityValue` so screen readers announce
  percentage, not just a bar.

## Usage Rules

- Import tokens from `@/src/theme`, never inline hex/spacing/radius values.
- Reuse the primitives above instead of re-implementing buttons, cards,
  inputs, etc. inline in feature/route code.
- Gradients are for hierarchy, not decoration — most surfaces stay flat.
- Keep the stock Expo Router starter screens (`app/(tabs)/*`) untouched
  beyond the temporary `/design-system` navigation link, until real app
  screens replace them.

## Preview Route

`/design-system` (see [app/design-system.tsx](../app/design-system.tsx)) is a
scrolling, mobile-sized component gallery for on-device verification — colors,
gradients, typography, buttons, inputs, cards, badges, progress bars, and icon
buttons. It is a development reference only, not one of the five planned main
tabs (Home, Plan, Coach, Progress, Profile). It is reachable from the stock
starter Home tab via a temporary "View Design System" link that will be
removed once real app navigation exists.

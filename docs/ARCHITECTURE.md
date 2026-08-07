# MBD Essentials — Architecture

This document distinguishes **CURRENT** architecture (what actually exists in
this repo today) from **PLANNED** architecture (the intended target
structure). Do not assume planned items exist until they are actually built.

## Hard Constraint: Expo Go Compatibility

This is the top engineering constraint for the entire project, not just this
document. The app must keep running in Expo Go on a physical Android phone via:

```
npx expo start
```

This rules out (until/unless explicitly changed by the user): SDK upgrades,
independent React/React Native upgrades, development builds, `expo-dev-client`,
any package requiring custom native code, `expo prebuild`, ejecting, and
creation of `android/`/`ios/` native project directories. See
[AGENTS.md](../AGENTS.md) for the full list.

## CURRENT Architecture

This is a stock `create-expo-app` (Expo SDK 54) project. Nothing has been
restructured yet.

**Stack:**
- Expo SDK 54 (`expo ~54.0.35`), React 19.1.0, React Native 0.81.5
- Expo Router `~6.0.24` (typed routes and React Compiler experiments enabled
  in `app.json`)
- New Architecture enabled (`newArchEnabled: true`)
- TypeScript `~5.9.2`, strict mode on, `@/*` path alias to project root
- NativeWind `^5.0.0-preview.4` and `expo-linear-gradient` installed as
  dependencies but **not configured** — no Tailwind config file, no global
  stylesheet, no Babel/Metro wiring present yet
- ESLint via `eslint-config-expo`

**Current file layout (root-level, no `src/` yet):**

```
app/
  _layout.tsx          Root stack layout (theme provider, status bar)
  modal.tsx             Stock modal screen
  (tabs)/
    _layout.tsx          Tab layout: Home, Explore (stock)
    index.tsx            Stock Home screen
    explore.tsx           Stock Explore screen
components/            Stock starter components (themed-text, themed-view,
                        parallax-scroll-view, haptic-tab, hello-wave,
                        external-link, ui/collapsible, ui/icon-symbol)
constants/
  theme.ts              Stock light/dark color constants (placeholder)
hooks/
  use-color-scheme.ts / .web.ts
  use-theme-color.ts
assets/                Stock icons/splash/fonts from create-expo-app
scripts/
  reset-project.js      Stock create-expo-app reset script
docs/                  Project documentation (this file, PRODUCT.md,
                        DESIGN_SYSTEM.md)
prompt_material/       Reference screenshots for future feature prompts
```

No `src/` directory, no `features/`, `stores/`, `types/`, `theme/`, `data/`,
or `utils/` directories exist yet. No onboarding, authentication, plan
generation, or main-app-navigation screens exist yet — only the stock
Home/Explore tabs and modal from `create-expo-app`.

## PLANNED Architecture

As real features are built, the project is intended to grow toward:

```
app/                   Expo Router routes only — thin, no business logic
src/
  components/           Reusable, genuinely-repeated UI patterns
  features/             Feature-scoped logic (onboarding, plan, coach, etc.)
  hooks/
  stores/                Zustand stores, once introduced (not yet)
  types/                 Shared domain types
  constants/
  theme/                 Design tokens, once defined (see DESIGN_SYSTEM.md)
  data/                  Centralized, auditable training/plan data & mock data
  utils/
assets/
  images/
  icons/
  fonts/
docs/
prompt_material/
```

This target structure should be adopted incrementally, adapting the existing
Expo SDK 54 layout rather than performing a blanket restructure. Files should
only move when there is a concrete reason tied to the feature being built —
never for cosmetic reasons alone.

### Route Philosophy

- `app/` holds Expo Router route files only. Route files stay focused on
  navigation/composition.
- Business logic, data fetching, and non-trivial state belong in `src/`
  (features/hooks/stores), not inline in route files.

### Separation of Concerns

- **Routes** (`app/`) — navigation structure and screen composition.
- **Features** (`src/features/*`, planned) — feature-specific logic (e.g.
  fitness assessment, plan generation) grouped by domain.
- **Components** (`components/` today, `src/components/` planned) — reusable
  UI only where a pattern genuinely repeats.
- **Data** (`src/data/*`, planned) — centralized, auditable source for
  training/plan logic and mock data, clearly labeled as mock/demo where
  applicable. No production fitness/medical data is to be fabricated.

### State Management

- No global state library is in use today.
- Zustand is the anticipated choice for global state, but it must not be
  installed or introduced until a feature actually requires it.
- Local/component state and React context are sufficient for now.

### Authentication (Not Yet Implemented)

- No authentication exists today.
- When implemented, the approach must remain compatible with Expo Go (no
  native development build requirement).
- Account creation must precede saving or activating a generated training
  plan (see [PRODUCT.md](PRODUCT.md)).

### Secrets Policy

- Never commit secrets.
- Never expose private API keys in frontend source.
- Only `EXPO_PUBLIC_*` environment values, which are inherently public in the
  Expo client bundle, may be used client-side.
- Any server-side secret stays server-side, in a backend not yet defined.

### Error Handling (Future Async Features)

Future asynchronous features (network calls, AI features, plan generation,
etc.) must account for loading, success, error, retry, empty, and offline
states where applicable, and must never silently swallow errors.

### High-Level Future Feature Organization

Anticipated feature domains under `src/features/` as they are built:

- onboarding / fitness assessment
- plan generation & plan preview
- main navigation surfaces: Home, Plan, Coach, Progress, Profile
- AI coaching (text-based coaching, exercise explanations/replacements,
  adherence insights, eventually voice)

None of these exist yet. This list exists to guide future organization, not
to imply current implementation.

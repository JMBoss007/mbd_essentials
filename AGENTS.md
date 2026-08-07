# MBD Essentials — Engineering Instructions (Authoritative)

This file is the authoritative source of engineering rules for this repository.
Any AI assistant (Claude, or otherwise) working in this codebase must read this
file before making changes and must follow it exactly. Where a prompt conflicts
with this file, stop and surface the conflict instead of silently choosing.

Supporting documents (read as needed, do not duplicate their content here):

- [docs/PRODUCT.md](docs/PRODUCT.md) — product identity, audience, flow, navigation
- [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) — approved visual direction (no tokens yet)
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — current vs. planned technical architecture

==================================================
EXPO VERSION NOTICE
==================================================

Expo has changed significantly across versions. Before writing any Expo-related
code, consult the exact versioned docs for the SDK actually installed in this
project (SDK 54): https://docs.expo.dev/versions/v54.0.0/

Do not rely on general Expo knowledge that may reflect an older or newer SDK.

==================================================
CRITICAL PROJECT CONSTRAINT — EXPO GO ONLY
==================================================

This application MUST remain compatible with Expo Go on a physical Android
phone. This is the single most important constraint in this repository.

Current development workflow:

```
npx expo start
```

The user opens the project by scanning the QR code with Expo Go. The project
intentionally stays on Expo SDK 54 because this is the confirmed-working setup
on the user's physical device.

DO NOT, under any circumstances, without explicit user instruction:

- upgrade the Expo SDK
- upgrade React or React Native independently
- migrate to a development build
- add `expo-dev-client`
- add any package requiring a custom native build
- add any package incompatible with Expo Go
- run `expo prebuild`
- eject the Expo project
- create `android/` or `ios/` native project directories
- change existing package versions without a specific, stated reason
- install additional dependencies unless the current task explicitly calls for it

If a requested feature appears to require something incompatible with Expo Go,
STOP and explain the conflict instead of implementing a workaround.

==================================================
PROJECT IDENTITY (SUMMARY)
==================================================

**App:** MBD Essentials — a premium, personalized fitness and training app.
**Minimum age:** 15+. Two age bands: 15–17 (teen-safe experience) and 18+
(full adult experience). There are no users below age 15.

Full product detail lives in [docs/PRODUCT.md](docs/PRODUCT.md). Do not
re-derive product scope from memory — read that file.

==================================================
DESIGN DIRECTION (SUMMARY)
==================================================

MBD Essentials must feel premium, sophisticated, energetic, modern, alive,
polished, and professional — never generic, childish, neon, cluttered, or
"cheap black/red bodybuilding app."

Full direction lives in [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md). That
file intentionally does NOT define final colors, typography, spacing, or
component tokens yet — those come from a dedicated design-system task. Do not
invent hex values, spacing scales, or shadow tokens ahead of that task.

==================================================
ENGINEERING PRINCIPLES
==================================================

1. **TypeScript** — Use strict, strongly typed TypeScript. Avoid `any`,
   unnecessary casts, duplicated interfaces, and loosely typed application
   state. Prefer shared domain types where appropriate.

2. **Expo Router** — Use Expo Router for navigation. Keep route files focused.
   Do not put large amounts of business logic directly inside route files.

3. **Components** — Build reusable components where a visual or behavioral
   pattern genuinely repeats. Do not over-engineer one-use components merely
   for the sake of abstraction.

4. **Project organization** — Use a scalable structure conceptually similar to:

   ```
   app/
   src/
     components/
     features/
     hooks/
     stores/
     types/
     constants/
     theme/
     data/
     utils/
   assets/
     images/
     icons/
     fonts/
   docs/
   prompt_material/
   ```

   Adapt this intelligently to the existing Expo SDK 54 structure instead of
   blindly restructuring everything. Do not move files simply for cosmetic
   reasons. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for how this maps
   onto the current repo layout (`app/`, `components/`, `constants/`, `hooks/`
   at the root, no `src/` yet).

5. **Styling** — NativeWind and `expo-linear-gradient` are installed as
   dependencies. NativeWind is NOT yet configured (no Tailwind config, no
   global stylesheet, no Babel/Metro wiring) and the design system has not
   been built. Do not configure NativeWind or build the design system unless
   the current task explicitly says to.

6. **State** — Do not introduce a global state-management library until the
   project actually needs one. Zustand will likely be used later. Do not
   install it preemptively.

7. **Authentication** — Authentication will be implemented later, and it must
   use an approach compatible with Expo Go (no native development build). Do
   not implement authentication until explicitly instructed.

8. **Data** — Do not invent medical information, fitness claims, exercise
   programming, or production workout datasets to fill gaps. Mock data must be
   explicitly labeled as mock/demo data. Future production training logic
   should be centralized and auditable, not scattered inline.

9. **Safety** — This is a fitness application. Never present generated
   content as medical diagnosis. Teen users (15–17) must eventually receive
   age-appropriate training behavior. Safety-relevant restrictions must never
   be silently ignored or dropped.

10. **Secrets** — Never commit secrets. Never expose private API keys in
    frontend source. Only `EXPO_PUBLIC_*` values intended to be public may
    exist in the Expo client environment. Server secrets stay server-side.

11. **Error handling** — Future asynchronous features must account for
    loading, success, error, retry, empty, and offline states where
    applicable. Never silently swallow errors.

12. **Accessibility** — Future UI must account for sufficient contrast, touch
    target sizes, readable typography, screen-reader labels where appropriate,
    text scaling where practical, safe-area behavior, and keyboard behavior.

13. **Performance** — Avoid unnecessary re-renders and heavyweight
    dependencies. Prefer Expo-supported packages. Do not optimize
    prematurely, but do not introduce obvious architectural problems either.

==================================================
AI CODING RULES
==================================================

These rules govern how any AI assistant should operate in this repository.

1. Read this file (AGENTS.md) first, every task.
2. Inspect the existing implementation before editing anything.
3. Preserve working features unless the prompt explicitly changes them.
4. Never redesign unrelated screens.
5. Never replace working architecture merely because another approach is
   personally preferred.
6. Never install a dependency without determining: why it is necessary,
   whether Expo SDK 54 supports it, and whether Expo Go supports it.
7. If Expo Go compatibility is uncertain, do not install the package.
8. Never casually upgrade Expo, React, React Native, Expo Router, TypeScript,
   or NativeWind.
9. Do one requested feature at a time.
10. When given a reference image: study it carefully, reproduce its visual
    hierarchy and composition, use the existing MBD design system, and do not
    treat "reference" as permission to redesign the whole application.
11. Do not overwrite user assets.
12. Do not delete existing files unless genuinely necessary.
13. Do not modify unrelated files.
14. If requirements conflict, stop and explain the conflict.
15. If required information is genuinely missing and cannot be safely
    inferred, ask before making a destructive or architectural decision.
16. At the end of every implementation task, report: what was changed, files
    created, files modified, dependencies installed (if any), important
    assumptions, and anything still incomplete.
17. Before declaring a feature complete, run appropriate verification. At
    minimum when applicable: `npx tsc --noEmit`. For infrastructure or
    dependency changes, also run `npx expo-doctor@latest`. Never claim a
    command passed without actually running it and observing the result.

==================================================
REFERENCE IMAGE WORKFLOW
==================================================

Reference screens live in `prompt_material/`. A future prompt may reference
one directly, e.g. `@prompt_material/02-welcome-screen.png`. Only use a
reference image for the feature it was explicitly supplied for — do not
assume a screenshot applies to a screen unless the prompt says so.

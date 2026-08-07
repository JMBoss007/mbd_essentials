# MBD Essentials — Product

This document describes what MBD Essentials is, who it is for, and what it
does. It is the product reference. Engineering rules live in
[AGENTS.md](../AGENTS.md); visual direction lives in
[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md); technical structure lives in
[ARCHITECTURE.md](ARCHITECTURE.md).

## App Identity

**Name:** MBD Essentials
**Product:** A premium, personalized fitness and training application.

## Target Audience

**Minimum supported age:** 15+. There are no users below age 15.

Two age bands with distinct behavior:

- **15–17 (teen):** Teen-safe fitness onboarding, recommendations, training
  rules, language, and safety behavior.
- **18+ (adult):** Full adult experience.

## Product Purpose / Core Promise

MBD Essentials creates a personalized workout plan that adapts to:

- training goal
- training experience
- available equipment
- training location
- weekly schedule
- session duration
- energy
- workout feedback
- progress
- exercise preferences
- exercise limitations
- adherence/history

## Initial Major Goals

- muscle gain
- strength
- fat loss through training
- general fitness
- consistency
- sports-performance support where appropriate

## Training Environments

- gym
- home
- both
- outdoors, where appropriate

## Training Levels

- Beginner
- Intermediate
- Advanced

Do **not** use "Amateur" as the beginner label.

## Onboarding Concept (Not Yet Implemented)

The intended high-level application flow:

1. Native splash
2. Welcome
3. Age confirmation / DOB
4. Authentication
5. Fitness assessment
6. Assessment review
7. Personalized plan generation
8. Plan preview
9. User confirms plan
10. Main application

**Account creation must occur before a generated training plan can be saved
or activated.**

The fitness assessment will eventually collect:

- identity / preferred name
- age
- measurement units
- optional physical measurements
- training goal
- success definition
- training history
- calculated experience level
- available equipment
- training location
- weekly availability
- session length
- flexibility of schedule
- physical limitations
- movement restrictions
- exercise preferences
- optional baseline capability
- general activity
- sleep
- stress
- energy
- coaching preferences

This onboarding flow is documented here for planning purposes only — it is
not implemented, and must not be built until explicitly requested.

## Main App Navigation (Planned)

The planned primary bottom navigation contains exactly:

1. Home
2. Plan
3. Coach
4. Progress
5. Profile

These screens do not exist yet. Do not create them speculatively.

## AI Features (Planned)

Future AI functionality includes:

- text-based coaching
- exercise explanations
- workout adjustments
- exercise replacements
- workout-history analysis
- adherence insights
- eventually, optional voice interaction

None of this is implemented yet.

## Key Product Constraints

- Must run in Expo Go on a physical Android phone at all times (see
  [ARCHITECTURE.md](ARCHITECTURE.md)).
- Account creation precedes plan activation.
- No medical diagnosis claims; safety-relevant restrictions are never
  silently ignored.
- Teen (15–17) users require age-appropriate behavior throughout.
- No production-grade exercise/medical data may be fabricated to fill gaps —
  mock data must be explicitly labeled as such.

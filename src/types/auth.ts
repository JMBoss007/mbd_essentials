/**
 * Shared authentication domain types. Both the sign-up and (future) sign-in
 * flows funnel into the same email-code verification screen, so the mode
 * they arrive with is a shared type rather than something route-local.
 */
export type AuthMode = 'sign-up' | 'sign-in';

/** Type guard for `AuthMode` — used to safely parse untyped router params. */
export function isAuthMode(value: unknown): value is AuthMode {
  return value === 'sign-up' || value === 'sign-in';
}

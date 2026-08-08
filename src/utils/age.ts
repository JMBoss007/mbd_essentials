/**
 * Centralized DOB / age utilities.
 *
 * DOB is stored and passed around as a date-only string (`YYYY-MM-DD`), never
 * as a calculated numeric age — age changes over time, so it is always
 * derived from DOB at read time using calendar-accurate comparison (year,
 * then month/day), never millisecond division.
 */

export type AgeGroup = 'teen' | 'adult';

export const MIN_ELIGIBLE_AGE = 15;
const TEEN_MAX_AGE = 17;

/** Date-only string in `YYYY-MM-DD` form, e.g. `2008-11-24`. */
export type DateOnlyString = string;

/**
 * Converts a `Date` to a `YYYY-MM-DD` string using its LOCAL calendar
 * components. Deliberately avoids `date.toISOString().split('T')[0]`, which
 * converts to UTC first and can shift the displayed/selected calendar day by
 * one for users west of UTC.
 */
export function toDateOnlyString(date: Date): DateOnlyString {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Parses a `YYYY-MM-DD` string into a local-midnight `Date`. */
export function parseDateOnlyString(value: DateOnlyString): Date {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/** True if `dateOfBirth` is later than today's local calendar date. */
export function isFutureDate(dateOfBirth: DateOnlyString, today: Date = new Date()): boolean {
  const dob = parseDateOnlyString(dateOfBirth);
  const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return dob.getTime() > todayDateOnly.getTime();
}

/**
 * Calendar-accurate age in whole years: year difference, adjusted down by
 * one if this year's birthday hasn't occurred yet (by month, then day).
 */
export function calculateAge(dateOfBirth: DateOnlyString, today: Date = new Date()): number {
  const dob = parseDateOnlyString(dateOfBirth);

  let age = today.getFullYear() - dob.getFullYear();
  const birthdayOccurredThisYear =
    today.getMonth() > dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());

  if (!birthdayOccurredThisYear) {
    age -= 1;
  }

  return age;
}

/** True if the person is old enough to use MBD Essentials (15+). */
export function isEligibleAge(dateOfBirth: DateOnlyString, today: Date = new Date()): boolean {
  if (isFutureDate(dateOfBirth, today)) {
    return false;
  }
  return calculateAge(dateOfBirth, today) >= MIN_ELIGIBLE_AGE;
}

/**
 * Derives the age group from DOB. Only meaningful for an eligible (15+)
 * DOB — callers must check `isEligibleAge` first.
 */
export function getAgeGroup(dateOfBirth: DateOnlyString, today: Date = new Date()): AgeGroup {
  const age = calculateAge(dateOfBirth, today);
  return age <= TEEN_MAX_AGE ? 'teen' : 'adult';
}

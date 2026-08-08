import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { DateOnlyString } from '@/src/utils/age';

export interface OnboardingState {
  /** Date-only string (`YYYY-MM-DD`). Never a calculated numeric age. */
  dateOfBirth: DateOnlyString | null;
  /** True once the persisted state has finished restoring from AsyncStorage. */
  hasHydrated: boolean;
  setDateOfBirth: (dateOfBirth: DateOnlyString) => void;
  clearOnboarding: () => void;
  /** Internal: flips true once persisted state finishes restoring. */
  setHasHydrated: (hasHydrated: boolean) => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      dateOfBirth: null,
      hasHydrated: false,
      setDateOfBirth: (dateOfBirth) => set({ dateOfBirth }),
      clearOnboarding: () => set({ dateOfBirth: null }),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: 'mbd-onboarding',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ dateOfBirth: state.dateOfBirth }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserPreferences, getDefaultPreferences } from '@/hooks/useBreedMatcher';

interface FlowContextType {
  preferences: UserPreferences;
  updatePreferences: (preferences: UserPreferences) => void;
  resetPreferences: () => void;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

export function FlowProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>(getDefaultPreferences());

  const updatePreferences = (newPreferences: UserPreferences) => {
    setPreferences(newPreferences);
  };

  const resetPreferences = () => {
    setPreferences(getDefaultPreferences());
  };

  return (
    <FlowContext.Provider value={{ preferences, updatePreferences, resetPreferences }}>
      {children}
    </FlowContext.Provider>
  );
}

export function useFlow() {
  const context = useContext(FlowContext);
  if (context === undefined) {
    throw new Error('useFlow must be used within a FlowProvider');
  }
  return context;
}

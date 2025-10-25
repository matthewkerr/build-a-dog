import React, { createContext, useContext, ReactNode } from 'react';
import { useDatabase } from '../hooks/useDatabase';

interface DatabaseContextType {
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
  resetDatabase: () => Promise<void>;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

interface DatabaseProviderProps {
  children: ReactNode;
}

export function DatabaseProvider({ children }: DatabaseProviderProps) {
  const { isInitialized, isLoading, error, resetDatabase } = useDatabase();

  return (
    <DatabaseContext.Provider value={{ isInitialized, isLoading, error, resetDatabase }}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabaseContext() {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabaseContext must be used within a DatabaseProvider');
  }
  return context;
}
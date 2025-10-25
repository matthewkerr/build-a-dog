import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useBreeds } from '@/hooks/useDatabase';
import { useDatabaseContext } from '@/contexts/DatabaseContext';

interface BreedsContextType {
  breeds: any[];
  isLoading: boolean;
  loadAllBreeds: () => Promise<void>;
}

const BreedsContext = createContext<BreedsContextType | undefined>(undefined);

interface BreedsProviderProps {
  children: ReactNode;
}

export function BreedsProvider({ children }: BreedsProviderProps) {
  const { breeds, loadAllBreeds: loadBreeds } = useBreeds();
  const { isInitialized } = useDatabaseContext();
  const [isLoading, setIsLoading] = useState(false);

  const loadAllBreeds = async () => {
    if (!isInitialized || breeds.length > 0) return;
    
    setIsLoading(true);
    try {
      await loadBreeds();
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-load breeds when database is initialized
  useEffect(() => {
    if (isInitialized && breeds.length === 0) {
      loadAllBreeds();
    }
  }, [isInitialized]);

  const value = {
    breeds,
    isLoading,
    loadAllBreeds,
  };

  return (
    <BreedsContext.Provider value={value}>
      {children}
    </BreedsContext.Provider>
  );
}

export function useBreedsContext() {
  const context = useContext(BreedsContext);
  if (context === undefined) {
    throw new Error('useBreedsContext must be used within a BreedsProvider');
  }
  return context;
}

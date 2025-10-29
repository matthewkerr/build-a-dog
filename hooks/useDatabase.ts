import { useEffect, useState, useCallback } from 'react';
import { databaseManager, DogBreed } from '../database/database';

export function useDatabase() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initializeDatabase();
  }, []);

  const initializeDatabase = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await databaseManager.initializeDatabase();
      setIsInitialized(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize database');
      // // // console.error('Database initialization error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetDatabase = useCallback(async () => {
    try {
      setError(null);
      await databaseManager.resetDatabase();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset database');
      // // // console.error('Error resetting database:', err);
      throw err;
    }
  }, []);

  return {
    isInitialized,
    isLoading,
    error,
    databaseManager,
    resetDatabase
  };
}

export function useBreeds() {
  const [breeds, setBreeds] = useState<DogBreed[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAllBreeds = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const allBreeds = await databaseManager.getAllBreeds();
      setBreeds(allBreeds);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load breeds');
      // // // console.error('Error loading breeds:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const searchBreeds = async (filters: Parameters<typeof databaseManager.searchBreeds>[0]) => {
    try {
      setIsLoading(true);
      setError(null);
      const filteredBreeds = await databaseManager.searchBreeds(filters);
      setBreeds(filteredBreeds);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search breeds');
      // // // console.error('Error searching breeds:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    breeds,
    isLoading,
    error,
    loadAllBreeds,
    searchBreeds
  };
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<(DogBreed & { favorited_at: string })[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFavorites = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [favoritesData, favoriteIdsData] = await Promise.all([
        databaseManager.getFavorites(),
        databaseManager.getFavoriteIds()
      ]);
      setFavorites(favoritesData);
      setFavoriteIds(favoriteIdsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load favorites');
      // // // console.error('Error loading favorites:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addToFavorites = useCallback(async (breedId: number) => {
    try {
      setError(null);
      await databaseManager.addToFavorites(breedId);
      await loadFavorites(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add to favorites');
      // // // console.error('Error adding to favorites:', err);
      throw err; // Re-throw so UI can handle it
    }
  }, [loadFavorites]);

  const removeFromFavorites = useCallback(async (breedId: number) => {
    try {
      setError(null);
      await databaseManager.removeFromFavorites(breedId);
      await loadFavorites(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove from favorites');
      // // // console.error('Error removing from favorites:', err);
      throw err; // Re-throw so UI can handle it
    }
  }, [loadFavorites]);

  const isFavorite = useCallback((breedId: number): boolean => {
    return favoriteIds.includes(breedId);
  }, [favoriteIds]);

  const toggleFavorite = useCallback(async (breedId: number) => {
    // console.log('Toggle favorite called for breed ID:', breedId, 'Currently favorite:', isFavorite(breedId));
    if (isFavorite(breedId)) {
      // // // console.log('Removing from favorites...');
      await removeFromFavorites(breedId);
    } else {
      // // // console.log('Adding to favorites...');
      await addToFavorites(breedId);
    }
  }, [isFavorite, removeFromFavorites, addToFavorites]);

  return {
    favorites,
    favoriteIds,
    isLoading,
    error,
    loadFavorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite
  };
}

export function useDatabaseStats() {
  const [stats, setStats] = useState<{ breedCount: number; favoriteCount: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadStats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const statsData = await databaseManager.getDatabaseStats();
      setStats(statsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load stats');
      // // // console.error('Error loading stats:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    stats,
    isLoading,
    error,
    loadStats
  };
}
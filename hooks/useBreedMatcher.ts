import { useState } from 'react';
import { DogBreed } from '@/database/database';

export interface UserPreferences {
  size: string; // 'Toy', 'Small', 'Medium', 'Large', 'Any'
  energyLevel: string; // 'Low', 'Moderate', 'High', 'Any'
  goodWithKids: boolean | null; // true, false, null (don't care)
  goodWithPets: boolean | null; // true, false, null (don't care)
  trainability: string; // 'Low', 'Medium', 'High', 'Any'
  groomingNeeds: string; // 'Low', 'Medium', 'High', 'Any'
  role: string; // 'Companion', 'Guardian', 'Both', 'Any'
  seniorFriendly: boolean | null; // true, false, null (don't care)
  specialNeedsOk: boolean | null; // true, false, null (don't care)
}

export interface BreedMatch {
  breed: DogBreed;
  score: number;
  matchReasons: string[];
}

export const useBreedMatcher = () => {
  const [isMatching, setIsMatching] = useState(false);

  const calculateBreedScore = (breed: DogBreed, preferences: UserPreferences): BreedMatch => {
    let score = 0;
    const matchReasons: string[] = [];
    let perfectMatches = 0;
    let totalCriteria = 0;

    // Start with a lower base score to create more differentiation
    const baseScore = 40;
    let bonusScore = 0;
    const maxBonusScore = 60; // Additional 60 points possible for perfect matches

    // Size matching (high priority - 10 bonus points)
    totalCriteria++;
    if (preferences.size === 'Any') {
      bonusScore += 3; // Lower baseline for "Any" to create more differentiation
      matchReasons.push(`Size flexible: ${breed.size}`);
    } else if (preferences.size === breed.size) {
      bonusScore += 10;
      perfectMatches++;
      matchReasons.push(`✨ Perfect size match: ${breed.size}`);
    } else {
      // Partial points for similar sizes
      const sizeOrder = ['Toy', 'Small', 'Medium', 'Large'];
      const prefIndex = sizeOrder.indexOf(preferences.size);
      const breedIndex = sizeOrder.indexOf(breed.size);
      const sizeDiff = Math.abs(prefIndex - breedIndex);
      
      if (sizeDiff === 1) {
        bonusScore += 6;
        matchReasons.push(`Similar size: ${breed.size}`);
      } else if (sizeDiff === 2) {
        bonusScore += 3;
      }
    }

    // Energy level matching (high priority - 10 bonus points)
    totalCriteria++;
    if (preferences.energyLevel === 'Any') {
      bonusScore += 3;
      matchReasons.push(`Energy flexible: ${breed.energy_level}`);
    } else if (preferences.energyLevel === breed.energy_level) {
      bonusScore += 10;
      perfectMatches++;
      matchReasons.push(`✨ Perfect energy match: ${breed.energy_level}`);
    } else {
      // Partial points for similar energy levels
      const energyOrder = ['Low', 'Moderate', 'High'];
      const prefIndex = energyOrder.indexOf(preferences.energyLevel);
      const breedIndex = energyOrder.indexOf(breed.energy_level);
      const energyDiff = Math.abs(prefIndex - breedIndex);
      
      if (energyDiff === 1) {
        bonusScore += 6;
        matchReasons.push(`Similar energy: ${breed.energy_level}`);
      }
    }

    // Good with kids (high priority - 8 bonus points)
    totalCriteria++;
    if (preferences.goodWithKids === null) {
      bonusScore += 2; // Lower baseline for "don't care"
      matchReasons.push(`Kid-friendly: ${breed.good_with_kids ? 'Yes' : 'No'}`);
    } else if (preferences.goodWithKids === breed.good_with_kids) {
      bonusScore += 8;
      perfectMatches++;
      matchReasons.push(`✨ Perfect kid match: ${breed.good_with_kids ? 'Great with kids' : 'Adult-focused'}`);
    } else {
      // Mismatch penalty is just no bonus points
      bonusScore += 0;
    }

    // Good with pets (high priority - 8 bonus points)
    totalCriteria++;
    if (preferences.goodWithPets === null) {
      bonusScore += 2;
      matchReasons.push(`Pet-friendly: ${breed.good_with_pets ? 'Yes' : 'No'}`);
    } else if (preferences.goodWithPets === breed.good_with_pets) {
      bonusScore += 8;
      perfectMatches++;
      matchReasons.push(`✨ Perfect pet match: ${breed.good_with_pets ? 'Great with pets' : 'Single-pet focused'}`);
    } else {
      bonusScore += 0;
    }

    // Trainability (medium priority - 6 bonus points)
    totalCriteria++;
    if (preferences.trainability === 'Any') {
      bonusScore += 2;
      matchReasons.push(`Trainability: ${breed.trainability}`);
    } else if (preferences.trainability === breed.trainability) {
      bonusScore += 6;
      perfectMatches++;
      matchReasons.push(`✨ Perfect trainability: ${breed.trainability}`);
    } else {
      // Partial points for similar trainability
      const trainOrder = ['Low', 'Medium', 'High'];
      const prefIndex = trainOrder.indexOf(preferences.trainability);
      const breedIndex = trainOrder.indexOf(breed.trainability);
      const trainDiff = Math.abs(prefIndex - breedIndex);
      
      if (trainDiff === 1) {
        bonusScore += 4;
        matchReasons.push(`Similar trainability: ${breed.trainability}`);
      }
    }

    // Grooming needs (medium priority - 5 bonus points)
    totalCriteria++;
    if (preferences.groomingNeeds === 'Any') {
      bonusScore += 2;
      matchReasons.push(`Grooming: ${breed.grooming_needs}`);
    } else if (preferences.groomingNeeds === breed.grooming_needs) {
      bonusScore += 5;
      perfectMatches++;
      matchReasons.push(`✨ Perfect grooming match: ${breed.grooming_needs}`);
    } else {
      // Partial points for similar grooming needs
      const groomOrder = ['Low', 'Medium', 'High'];
      const prefIndex = groomOrder.indexOf(preferences.groomingNeeds);
      const breedIndex = groomOrder.indexOf(breed.grooming_needs);
      const groomDiff = Math.abs(prefIndex - breedIndex);
      
      if (groomDiff === 1) {
        bonusScore += 3;
        matchReasons.push(`Similar grooming: ${breed.grooming_needs}`);
      }
    }

    // Role/Purpose (medium priority - 3 bonus points)
    totalCriteria++;
    if (preferences.role === 'Any') {
      bonusScore += 2;
      matchReasons.push(`Role: ${breed.companion_or_guardian}`);
    } else if (preferences.role === breed.companion_or_guardian || breed.companion_or_guardian === 'Both') {
      bonusScore += 3;
      if (breed.companion_or_guardian === 'Both') {
        matchReasons.push(`✨ Versatile role: ${breed.companion_or_guardian}`);
      } else {
        perfectMatches++;
        matchReasons.push(`✨ Perfect role match: ${breed.companion_or_guardian}`);
      }
    }

    // Senior friendly (low priority - 1 bonus point)
    totalCriteria++;
    if (preferences.seniorFriendly === null) {
      bonusScore += 1;
    } else if (preferences.seniorFriendly === breed.senior_friendly) {
      bonusScore += 1;
      if (preferences.seniorFriendly) {
        matchReasons.push('Senior friendly');
      }
    }

    // Special needs OK (low priority - 1 bonus point)
    totalCriteria++;
    if (preferences.specialNeedsOk === null) {
      bonusScore += 1;
    } else if (preferences.specialNeedsOk === breed.special_needs_possible) {
      bonusScore += 1;
      if (preferences.specialNeedsOk) {
        matchReasons.push('Open to special needs');
      }
    }

    // Perfect match bonus system
    const perfectMatchRatio = perfectMatches / totalCriteria;
    let perfectMatchBonus = 0;
    
    if (perfectMatchRatio >= 0.8) { // 80%+ perfect matches
      perfectMatchBonus = 10;
      matchReasons.unshift('🏆 EXCEPTIONAL MATCH!');
    } else if (perfectMatchRatio >= 0.6) { // 60%+ perfect matches
      perfectMatchBonus = 6;
      matchReasons.unshift('⭐ EXCELLENT MATCH!');
    } else if (perfectMatchRatio >= 0.4) { // 40%+ perfect matches
      perfectMatchBonus = 3;
      matchReasons.unshift('✨ GREAT MATCH!');
    }

    // Calculate final score
    const finalScore = Math.min(100, baseScore + bonusScore + perfectMatchBonus);

    return {
      breed,
      score: Math.round(finalScore),
      matchReasons
    };
  };

  const findBestMatches = async (breeds: DogBreed[], preferences: UserPreferences): Promise<BreedMatch[]> => {
    setIsMatching(true);
    
    try {
      console.log('🔍 Starting breed matching with', breeds.length, 'breeds');
      
      // Calculate scores for all breeds
      const scoredBreeds = breeds.map(breed => calculateBreedScore(breed, preferences));
      
      // Sort by score (highest first), then by popularity/versatility for similar scores
      const sortedBreeds = scoredBreeds.sort((a, b) => {
        // Primary sort: by score (highest first)
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        
        // Secondary sort: prioritize breeds that are good with kids and pets (more versatile)
        const aVersatility = (a.breed.good_with_kids ? 1 : 0) + (a.breed.good_with_pets ? 1 : 0);
        const bVersatility = (b.breed.good_with_kids ? 1 : 0) + (b.breed.good_with_pets ? 1 : 0);
        
        if (aVersatility !== bVersatility) {
          return bVersatility - aVersatility;
        }
        
        // Tertiary sort: prioritize breeds that can be both companion and guardian
        const aRole = a.breed.companion_or_guardian === 'Both' ? 1 : 0;
        const bRole = b.breed.companion_or_guardian === 'Both' ? 1 : 0;
        
        if (aRole !== bRole) {
          return bRole - aRole;
        }
        
        // Final sort: by breed name (alphabetical as last resort)
        return a.breed.breed.localeCompare(b.breed.breed);
      });
      
      // Log score distribution for debugging
      const scoreDistribution = {
        '90-100%': sortedBreeds.filter(b => b.score >= 90).length,
        '80-89%': sortedBreeds.filter(b => b.score >= 80 && b.score < 90).length,
        '70-79%': sortedBreeds.filter(b => b.score >= 70 && b.score < 80).length,
        '60-69%': sortedBreeds.filter(b => b.score >= 60 && b.score < 70).length,
        'Below 60%': sortedBreeds.filter(b => b.score < 60).length,
      };
      
      console.log('📊 Score distribution:', scoreDistribution);
      console.log('🏆 Top 5 scores:', sortedBreeds.slice(0, 5).map(b => `${b.breed.breed}: ${b.score}%`));
      
      // Return top 10 matches (increased from 5)
      const topMatches = sortedBreeds.slice(0, 10);
      
      return topMatches;
    } finally {
      setIsMatching(false);
    }
  };

  return {
    findBestMatches,
    isMatching
  };
};

// Default preferences
export const getDefaultPreferences = (): UserPreferences => ({
  size: 'Any',
  energyLevel: 'Any',
  goodWithKids: null,
  goodWithPets: null,
  trainability: 'Any',
  groomingNeeds: 'Any',
  role: 'Any',
  seniorFriendly: null,
  specialNeedsOk: null
});
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
  prioritizeAdoptable: boolean; // true to prioritize breeds commonly found in shelters
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

    // Start with a more reasonable base score and balanced penalties
    const baseScore = 35; // Higher base score for better starting point
    let bonusScore = 0;
    let penaltyScore = 0; // Track penalties separately

    // Size matching (CRITICAL - major penalties for mismatches)
    totalCriteria++;
    if (preferences.size === 'Any') {
      bonusScore += 2; // Very low baseline for "Any"
      matchReasons.push(`Size flexible: ${breed.size}`);
    } else if (preferences.size === breed.size) {
      bonusScore += 15; // High reward for perfect match
      perfectMatches++;
      matchReasons.push(`✨ Perfect size match: ${breed.size}`);
    } else {
      // Much stricter size matching
      const sizeOrder = ['Toy', 'Small', 'Medium', 'Large'];
      const prefIndex = sizeOrder.indexOf(preferences.size);
      const breedIndex = sizeOrder.indexOf(breed.size);
      const sizeDiff = Math.abs(prefIndex - breedIndex);
      
      if (sizeDiff === 1) {
        bonusScore += 5; // Reduced points for similar sizes
        matchReasons.push(`Similar size: ${breed.size}`);
      } else if (sizeDiff === 2) {
        bonusScore += 2; // Small points for moderate difference
        penaltyScore += 5; // Reduced penalty for moderate mismatch
        matchReasons.push(`⚠️ Size mismatch: ${breed.size} vs ${preferences.size}`);
      } else if (sizeDiff === 3) {
        bonusScore += 0; // No points for major difference
        penaltyScore += 15; // Reduced penalty for major mismatch
        matchReasons.push(`❌ MAJOR size mismatch: ${breed.size} vs ${preferences.size}`);
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

    // Grooming needs (CRITICAL - major penalties for mismatches)
    totalCriteria++;
    if (preferences.groomingNeeds === 'Any') {
      bonusScore += 2; // Very low baseline for "Any"
      matchReasons.push(`Grooming flexible: ${breed.grooming_needs}`);
    } else if (preferences.groomingNeeds === breed.grooming_needs) {
      bonusScore += 15; // High reward for perfect match
      perfectMatches++;
      matchReasons.push(`✨ Perfect grooming match: ${breed.grooming_needs}`);
    } else {
      // Much stricter grooming matching
      const groomOrder = ['Low', 'Medium', 'High'];
      const prefIndex = groomOrder.indexOf(preferences.groomingNeeds);
      const breedIndex = groomOrder.indexOf(breed.grooming_needs);
      const groomDiff = Math.abs(prefIndex - breedIndex);
      
      if (groomDiff === 1) {
        bonusScore += 5; // Reduced points for similar grooming
        matchReasons.push(`Similar grooming: ${breed.grooming_needs}`);
      } else if (groomDiff === 2) {
        bonusScore += 2; // Small points for major difference
        penaltyScore += 12; // Reduced penalty for major grooming mismatch
        matchReasons.push(`❌ MAJOR grooming mismatch: ${breed.grooming_needs} vs ${preferences.groomingNeeds}`);
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

    // Calculate final score with penalties
    let finalScore = Math.max(0, Math.min(100, baseScore + bonusScore + perfectMatchBonus - penaltyScore));
    
    // Bonus for breeds that are close matches despite penalties
    if (finalScore >= 40 && finalScore < 70) {
      finalScore = Math.min(100, finalScore + 5); // Small boost for decent matches
    }

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
      
      // Create a combined scoring system that balances match score with shelter availability
      const scoredBreedsWithCombinedScore = scoredBreeds.map(match => {
        let combinedScore = match.score;
        
        // If user wants to prioritize adoptable breeds, boost scores for common shelter dogs
        if (preferences.prioritizeAdoptable) {
          // Extremely conservative boost - only add 0.5-1.5 points for shelter availability
          const shelterBoost = Math.min(1.5, match.breed.shelter_availability_score * 0.15);
          combinedScore = Math.min(100, match.score + shelterBoost);
          
          // Add shelter info to match reasons
          if (match.breed.shelter_availability_score >= 8) {
            match.matchReasons.push('🏠 Commonly available in shelters');
          } else if (match.breed.shelter_availability_score >= 6) {
            match.matchReasons.push('🏠 Often found in shelters');
          }
        }
        
        return {
          ...match,
          combinedScore,
          originalScore: match.score
        };
      });
      
      // SHELTER FILTERING: Only show breeds that are occasionally found in shelters
      const shelterOnlyBreeds = scoredBreedsWithCombinedScore.filter(match => {
        // Include breeds with shelter scores 3 or higher (occasionally found or better)
        // If shelter score is undefined, assume it's a rare breed and filter it out
        const isShelterBreed = match.breed.shelter_availability_score && match.breed.shelter_availability_score >= 3;
        
        if (!isShelterBreed) {
          console.log(`🚫 Filtered out rare breed: ${match.breed.breed} (Shelter score: ${match.breed.shelter_availability_score})`);
        }
        
        return isShelterBreed;
      });
      
      console.log(`🏠 Shelter filtering: ${scoredBreedsWithCombinedScore.length} total breeds → ${shelterOnlyBreeds.length} shelter breeds`);
      
      // Debug shelter score distribution
      const shelterScoreDistribution: { [key: number]: number } = {};
      scoredBreedsWithCombinedScore.forEach(match => {
        const score = match.breed.shelter_availability_score;
        shelterScoreDistribution[score] = (shelterScoreDistribution[score] || 0) + 1;
      });
      console.log('🏠 Shelter score distribution:', shelterScoreDistribution);
      
      // Sort by shelter availability FIRST, then by combined score, then by original match score
      const sortedBreeds = shelterOnlyBreeds.sort((a, b) => {
        // PRIMARY SORT: by shelter availability score (highest first) - MOST IMPORTANT!
        if (a.breed.shelter_availability_score !== b.breed.shelter_availability_score) {
          return b.breed.shelter_availability_score - a.breed.shelter_availability_score;
        }
        
        // Secondary sort: by combined score (highest first)
        if (Math.round(b.combinedScore) !== Math.round(a.combinedScore)) {
          return b.combinedScore - a.combinedScore;
        }
        
        // Tertiary sort: by original match score (highest first)
        if (b.originalScore !== a.originalScore) {
          return b.originalScore - a.originalScore;
        }
        
        // Fourth sort: prioritize breeds that are good with kids and pets (more versatile)
        const aVersatility = (a.breed.good_with_kids ? 1 : 0) + (a.breed.good_with_pets ? 1 : 0);
        const bVersatility = (b.breed.good_with_kids ? 1 : 0) + (b.breed.good_with_pets ? 1 : 0);
        
        if (aVersatility !== bVersatility) {
          return bVersatility - aVersatility;
        }
        
        // Fifth sort: prioritize breeds that can be both companion and guardian
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
        '90-100%': sortedBreeds.filter(b => b.originalScore >= 90).length,
        '80-89%': sortedBreeds.filter(b => b.originalScore >= 80 && b.originalScore < 90).length,
        '70-79%': sortedBreeds.filter(b => b.originalScore >= 70 && b.originalScore < 80).length,
        '60-69%': sortedBreeds.filter(b => b.originalScore >= 60 && b.originalScore < 70).length,
        'Below 60%': sortedBreeds.filter(b => b.originalScore < 60).length,
      };
      
      console.log('📊 Original score distribution:', scoreDistribution);
      console.log('🏆 Top 5 results (Shelter Score → Combined Score → Original Score):', sortedBreeds.slice(0, 5).map(b => 
        `${b.breed.breed}: Shelter ${b.breed.shelter_availability_score} → Combined ${Math.round(b.combinedScore)}% → Original ${b.originalScore}%`
      ));
      
      // Debug logging for specific breeds if they appear in top results
      const debugBreeds = ['Akita', 'Labradoodle', 'Golden Retriever', 'Jack Russell Terrier', 'Bulldog', 'Alaskan Malamute'];
      sortedBreeds.slice(0, 10).forEach(match => {
        if (debugBreeds.includes(match.breed.breed)) {
          console.log(`🔍 ${match.breed.breed} - Size: ${match.breed.size}, Grooming: ${match.breed.grooming_needs}, Original Score: ${match.originalScore}, Combined: ${Math.round(match.combinedScore)}`);
        }
      });
      
      // Special debugging for Akita specifically
      const akitaMatch = sortedBreeds.find(match => match.breed.breed === 'Akita');
      if (akitaMatch) {
        console.log(`🚨 AKITA DEBUG - Size: ${akitaMatch.breed.size}, Grooming: ${akitaMatch.breed.grooming_needs}, Original Score: ${akitaMatch.originalScore}, Combined: ${Math.round(akitaMatch.combinedScore)}`);
      }
      
      // STRICT SIZE FILTERING: Only show breeds that match the requested size (unless "Any" is selected)
      let sizeFilteredBreeds = sortedBreeds;
      if (preferences.size !== 'Any') {
        sizeFilteredBreeds = sortedBreeds.filter(match => match.breed.size === preferences.size);
        console.log(`📏 Size filtering: ${sortedBreeds.length} breeds → ${sizeFilteredBreeds.length} ${preferences.size} breeds`);
        
        // Log any breeds that were filtered out due to size mismatch
        const filteredOutBreeds = sortedBreeds.filter(match => match.breed.size !== preferences.size);
        if (filteredOutBreeds.length > 0) {
          console.log(`🚫 Size-filtered breeds:`, filteredOutBreeds.slice(0, 5).map(b => `${b.breed.breed} (${b.breed.size})`));
        }
      }
      
      // Filter out very poor matches and return top 10
      const goodMatches = sizeFilteredBreeds.filter(match => match.originalScore >= 40); // Lower threshold to 40%+ for more variety
      const topMatches = goodMatches.slice(0, 10).map(match => ({
        breed: match.breed,
        score: match.originalScore, // Keep original score for display
        matchReasons: match.matchReasons
      }));
      
      console.log(`📊 Filtered ${sortedBreeds.length - goodMatches.length} poor matches (below 50%)`);
      console.log(`🏆 Returning ${topMatches.length} good matches`);
      
      // Final size verification logging
      if (preferences.size !== 'Any') {
        console.log(`🔍 FINAL SIZE VERIFICATION for "${preferences.size}" search:`);
        topMatches.forEach((match, index) => {
          console.log(`   ${index + 1}. ${match.breed.breed} - Size: ${match.breed.size} ✅`);
        });
      }
      
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
  specialNeedsOk: null,
  prioritizeAdoptable: true // Default to prioritizing adoptable breeds
});
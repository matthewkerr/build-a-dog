import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, Alert, ScrollView, Dimensions, Image } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { breedImages } from '@/utils/breedImages';
import { useFlow } from '@/contexts/FlowContext';
import { useBreeds } from '@/hooks/useDatabase';
import { useBreedMatcher } from '@/hooks/useBreedMatcher';
import { useDatabaseContext } from '@/contexts/DatabaseContext';
import Colors from '@/constants/Colors';

export default function FlowResultsScreen() {
  const router = useRouter();
  const { preferences } = useFlow();
  const { breeds, loadAllBreeds } = useBreeds();
  const { findBestMatches, isMatching } = useBreedMatcher();
  const { isInitialized } = useDatabaseContext();
  const [matches, setMatches] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  
  const screenWidth = Dimensions.get('window').width;
  const imageSize = screenWidth - 40; // Account for padding

  useEffect(() => {
    if (isInitialized && breeds.length === 0) {
      loadAllBreeds();
    }
  }, [isInitialized, breeds.length, loadAllBreeds]);


  const handleBackPress = () => {
    router.back();
  };

  const handleFindMatches = async () => {
    if (breeds.length === 0) {
      Alert.alert('Error', 'No breeds loaded. Please try again.');
      return;
    }

    try {
      const foundMatches = await findBestMatches(breeds, preferences);
      console.log('foundMatches', foundMatches);
      setMatches(foundMatches);
    } catch (error) {
      console.error('Error finding matches:', error);
      Alert.alert('Error', 'Failed to find matches. Please try again.');
    }
  };

  const handleBreedPress = (breed: any) => {
    router.push(`/flow/breed-detail-flow?breedId=${breed.id}`);
  };

  const handleFavoritePress = (breed: any) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(breed.id)) {
        newFavorites.delete(breed.id);
        Alert.alert('Favorite Removed', `${breed.breed} has been removed from your favorites!`);
      } else {
        newFavorites.add(breed.id);
        Alert.alert('Favorite Added', `${breed.breed} has been added to your favorites!`);
      }
      return newFavorites;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {matches.length === 0 && (
          <Pressable style={styles.backButton} onPress={handleBackPress}>
            <Text style={styles.backButtonText}>← Back</Text>
          </Pressable>
        )}

        
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Match Now</Text>
        </View>
      </View>
      
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {matches.length === 0 ? (
            <>
              <Text style={styles.title}>Ready to find your perfect match?</Text>
              <Text style={styles.subtitle}>Based on your preferences, we'll find the best dog breeds for you</Text>
              
              <View style={styles.summaryContainer}>
                <Text style={styles.summaryTitle}>Your Preferences:</Text>
                <Text style={styles.summaryText}>Size: {preferences.size}</Text>
                <Text style={styles.summaryText}>Energy: {preferences.energyLevel}</Text>
                <Text style={styles.summaryText}>Good with kids: {preferences.goodWithKids === null ? 'Not specified' : preferences.goodWithKids ? 'Yes' : 'No'}</Text>
                <Text style={styles.summaryText}>Good with pets: {preferences.goodWithPets === null ? 'Not specified' : preferences.goodWithPets ? 'Yes' : 'No'}</Text>
                <Text style={styles.summaryText}>Grooming needs: {preferences.groomingNeeds}</Text>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.title}>Match Results</Text>
              <Text style={styles.subtitle}>We found some amazing dogs that could be your perfect companion! Each of these breeds matches your lifestyle and preferences.</Text>
              
              <View style={styles.adoptionMessage}>
                <Text style={styles.adoptionMessageText}>
                  Most dogs in shelters aren't purebred — but many share the same traits, temperament, and charm as the breeds you're seeing here.
                </Text>
                <Text style={styles.adoptionMessageText}>
                  Look for mixes of these breeds when you adopt — they often have the best of both worlds and just as much love to give.
                </Text>
                <Text style={styles.adoptionMessageText}>
                  Your perfect match might be a little more unique — and that's a beautiful thing.
                </Text>
              </View>
            </>
          )}

             {matches.length > 0 && (
             <Pressable 
               style={styles.findButton} 
               onPress={() => router.push('/(tabs)/flow')}
             >
               <Text style={styles.findButtonText}>
                 Search Again
               </Text>
             </Pressable>
           )}

          {matches.length === 0 && (
            <Pressable 
              style={[styles.findButton, isMatching && styles.disabledButton]} 
              onPress={handleFindMatches}
              disabled={isMatching}
            >
              <Text style={styles.findButtonText}>
                {isMatching ? 'Finding Matches...' : 'Find My Match'}
              </Text>
            </Pressable>
          )}

          {matches.length > 0 && (
            <View style={styles.matchesContainer}>
              <Text style={styles.matchesTitle}>Your Perfect Matches:</Text>
              <View style={styles.breedsGrid}>
                {matches.map((match) => {
                  const breed = match.breed; // Extract the breed from the match object
                  return (
                    <View key={breed.id} style={styles.breedCard}>
                      <Pressable
                        style={styles.favoriteButton}
                        onPress={() => handleFavoritePress(breed)}
                      >
                        <FontAwesome 
                          name={favorites.has(breed.id) ? "heart" : "heart-o"} 
                          size={20} 
                          color={Colors.light.heartRed} 
                        />
                      </Pressable>
                      
                      <Pressable
                        style={styles.breedContent}
                        onPress={() => handleBreedPress(breed)}
                      >
                        <Image
                          source={breedImages[typeof breed.breed === 'string' ? breed.breed.toLowerCase() : 'akita'] || require('@/assets/images/breeds_resized/akita.png')}
                          style={[styles.breedImage, { width: imageSize, height: imageSize }]}
                          resizeMode="contain"
                          fadeDuration={0}
                          loadingIndicatorSource={require('@/assets/images/breeds_resized/akita.png')}
                        />
                        <View style={styles.breedInfo}>
                          <Text style={styles.breedName}>{breed.breed || 'Unknown Breed'}</Text>
                          
                          {breed.shelter_availability_score >= 8 && (
                            <Text style={styles.shelterBadge}>🏠 Common in Shelters</Text>
                          )}
                          
                          <View style={styles.traitsContainer}>
                            <Text style={styles.traitText}>Size: {breed.size || 'Unknown'}</Text>
                            <Text style={styles.traitText}>Energy: {breed.energy_level || 'Unknown'}</Text>
                            <Text style={styles.traitText}>Trainability: {breed.trainability || 'Unknown'}</Text>
                            <Text style={styles.traitText}>Grooming: {breed.grooming_needs || 'Unknown'}</Text>
                            <Text style={styles.traitText}>Role: {breed.companion_or_guardian === 'Both' ? 'Companion and Guardian' : breed.companion_or_guardian || 'Unknown'}</Text>
                            
                            <View style={styles.booleanTraits}>
                              {breed.good_with_kids ? <Text style={styles.traitBadge}>👶 Good with Kids</Text> : null}
                              {breed.good_with_pets ? <Text style={styles.traitBadge}>🐕 Good with Pets</Text> : null}
                              {breed.senior_friendly ? <Text style={styles.traitBadge}>👴 Senior Friendly</Text> : null}
                              {breed.special_needs_possible ? <Text style={styles.traitBadge}>❤️ Special Needs OK</Text> : null}
                            </View>
                          </View>
                        </View>
                      </Pressable>
                    </View>
                  );
                })}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.backgroundIvory,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: Colors.light.backgroundIvory,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.secondarySand,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: Colors.light.primaryTeal,
    fontWeight: '500',
  },
  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.textCharcoal,
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.light.textCharcoal,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.textCharcoal,
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.8,
  },
  summaryContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 40,
    borderWidth: 2,
    borderColor: Colors.light.secondarySand,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.textCharcoal,
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 16,
    color: Colors.light.textCharcoal,
    marginBottom: 8,
  },
  findButton: {
    backgroundColor: Colors.light.primaryTeal,
    width: '100%',
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#4CB5AB',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: Colors.light.secondarySand,
  },
  disabledButton: {
    opacity: 0.6,
  },
  findButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  matchesContainer: {
    marginTop: 20,
  },
  matchesTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.textCharcoal,
    marginBottom: 16,
    textAlign: 'center',
  },
  breedsGrid: {
    gap: 16,
  },
  breedCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.secondarySand,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    overflow: 'hidden',
    position: 'relative',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  breedContent: {
    flex: 1,
  },
  breedImage: {
    alignSelf: 'center',
  },
  breedInfo: {
    padding: 16,
  },
  breedName: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.light.textCharcoal,
    marginBottom: 12,
  },
  traitsContainer: {
    gap: 4,
  },
  traitText: {
    fontSize: 14,
    color: Colors.light.textCharcoal,
    opacity: 0.8,
  },
  booleanTraits: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  traitBadge: {
    fontSize: 14,
    color: Colors.light.primaryTeal,
    borderWidth: 1,
    borderColor: Colors.light.primaryTeal,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: '500',
  },
  shelterBadge: {
    fontSize: 18,
    color: Colors.light.primaryTeal,
    fontWeight: '600',
    marginBottom: 12,
  },
  adoptionMessage: {
    backgroundColor: Colors.light.secondarySand,
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.light.primaryTeal,
  },
  adoptionMessageText: {
    fontSize: 16,
    color: Colors.light.textCharcoal,
    lineHeight: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  searchAgainButton: {
    backgroundColor: Colors.light.primaryTeal,
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#4CB5AB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: Colors.light.secondarySand,
    marginTop: 20,
  },
  searchAgainIcon: {
    marginRight: 12,
  },
  searchAgainButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});

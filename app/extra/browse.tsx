import { StyleSheet, ActivityIndicator, Pressable, ScrollView, Image, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useDatabaseContext } from '@/contexts/DatabaseContext';
import { useDatabaseStats, useBreeds, useFavorites } from '@/hooks/useDatabase';
import { DogBreed, databaseManager } from '@/database/database';
import { getBreedImage } from '@/utils/breedImages';

export default function BrowseScreen() {
  const router = useRouter();
  const { isInitialized, isLoading: dbLoading, error: dbError } = useDatabaseContext();
  const { stats, isLoading: statsLoading, error: statsError, loadStats } = useDatabaseStats();
  const { breeds, isLoading: breedsLoading, error: breedsError, loadAllBreeds } = useBreeds();
  const { isFavorite, toggleFavorite, loadFavorites } = useFavorites();
  
  const [currentBreedIndex, setCurrentBreedIndex] = useState(0);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    if (isInitialized) {
      loadStats();
      loadAllBreeds();
      loadFavorites();
    }
  }, [isInitialized]);

  const showNextBreed = () => {
    if (breeds.length > 0) {
      const nextIndex = (currentBreedIndex + 1) % breeds.length;
      setCurrentBreedIndex(nextIndex);
    }
  };

  const showPreviousBreed = () => {
    if (breeds.length > 0) {
      const prevIndex = currentBreedIndex === 0 ? breeds.length - 1 : currentBreedIndex - 1;
      setCurrentBreedIndex(prevIndex);
    }
  };

  const handleBreedPress = (breed: DogBreed) => {
    router.push(`/breed-detail?breedId=${breed.id}`);
  };

  const handleToggleFavorite = async (breedId: number) => {
    try {
      await toggleFavorite(breedId);
      await loadStats(); // Refresh stats to show updated favorite count
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleClearAndReseed = async () => {
    try {
      console.log('Force reseeding database with corrected breed data...');
      await databaseManager.forceReseedDatabase();
      
      console.log('Loading breeds...');
      await loadAllBreeds();
      await loadStats();
      setCurrentBreedIndex(0);
      
      console.log('Database reseeded successfully with corrected data');
    } catch (error) {
      console.error('Error clearing and reseeding database:', error);
    }
  };

  const handleResetDatabase = async () => {
    try {
      console.log('🗄️ Resetting database to load shelter scores...');
      
      // Clear the database completely
      await databaseManager.clearDatabase();
      
      // Force reseed with shelter scores data
      await databaseManager.forceReseedDatabase();
      
      console.log('🔄 Loading breeds with shelter scores...');
      await loadAllBreeds();
      await loadStats();
      setCurrentBreedIndex(0);
      
      console.log('✅ Database reset successfully with shelter scores!');
      console.log('🏠 You should now see breeds with proper shelter availability scores');
    } catch (error) {
      console.error('❌ Error resetting database:', error);
    }
  };

  const onGestureEvent = (event: any) => {
    const { translationX, state } = event.nativeEvent;
    
    if (state === State.END) {
      const swipeThreshold = screenWidth * 0.15; // 15% of screen width for easier swiping
      
      if (translationX > swipeThreshold) {
        // Swipe right - go to previous breed
        console.log('Swipe right detected, going to previous breed');
        showPreviousBreed();
      } else if (translationX < -swipeThreshold) {
        // Swipe left - go to next breed
        console.log('Swipe left detected, going to next breed');
        showNextBreed();
      }
    }
  };



  if (dbLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.subtitle}>Initializing database...</Text>
      </View>
    );
  }

  if (dbError) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Database Error</Text>
        <Text style={styles.error}>{dbError}</Text>
      </View>
    );
  }

    return (
    <PanGestureHandler 
      onHandlerStateChange={onGestureEvent}
      activeOffsetX={[-10, 10]}
    >
      <View style={styles.scrollContainer}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>🐶 Browse All Dogs</Text>
          <Text style={styles.swipeInstructions}>← Swipe left or right to browse dogs →</Text>
          
          {/* Stats Section */}
          {/* {statsLoading ? (
            <ActivityIndicator size="small" />
          ) : statsError ? (
            <Text style={styles.error}>Stats Error: {statsError}</Text>
          ) : stats ? (
            <View style={styles.statsContainer}>
              <Text style={styles.stat}>📊 Total Breeds: {stats.breedCount}</Text>
              <Text style={styles.stat}>❤️ Favorites: {stats.favoriteCount}</Text>
            </View>
          ) : null} */}

          <View style={styles.separator} />

          {/* Navigation Buttons */}
          {/* {breeds.length > 0 && (
            <View style={styles.navigationContainer}>
              <Pressable style={styles.navButton} onPress={showPreviousBreed}>
                <Text style={styles.navButtonText}>← Previous</Text>
              </Pressable>
              
              <Text style={styles.breedCounter}>
                {currentBreedIndex + 1} of {breeds.length}
              </Text>
              
              <Pressable style={styles.navButton} onPress={showNextBreed}>
                <Text style={styles.navButtonText}>Next →</Text>
              </Pressable>
            </View>
          )} */}

          {/* Current Breed Display */}
          {breedsLoading ? (
            <ActivityIndicator size="large" />
          ) : breedsError ? (
            <Text style={styles.error}>Breeds Error: {breedsError}</Text>
          ) : breeds.length > 0 ? (
            <Pressable 
              style={styles.breedCard}
              onPress={() => handleBreedPress(breeds[currentBreedIndex])}
            >
              <View style={styles.breedHeader}>
                <Text style={styles.breedName}>{breeds[currentBreedIndex].breed}</Text>
                <Pressable 
                  style={[styles.favoriteButton, isFavorite(breeds[currentBreedIndex].id) && styles.favoriteButtonActive]}
                  onPress={() => handleToggleFavorite(breeds[currentBreedIndex].id)}
                >
                                  <Text style={styles.favoriteButtonText}>
                  {isFavorite(breeds[currentBreedIndex].id) ? '❤️' : '🖤'}
                </Text>
                </Pressable>
              </View>

              {/* Breed Image */}
              <View style={styles.imageContainer}>
                {getBreedImage(breeds[currentBreedIndex].image_filename, breeds[currentBreedIndex].breed) ? (
                  <View style={styles.imageWrapper}>
                    <Image 
                      source={getBreedImage(breeds[currentBreedIndex].image_filename, breeds[currentBreedIndex].breed)!}
                      style={styles.breedImage}
                      resizeMode="cover"
                    />
                  </View>
                ) : (
                  <View style={styles.placeholderImage}>
                    <Text style={styles.placeholderText}>🐕</Text>
                    <Text style={styles.placeholderSubtext}>{breeds[currentBreedIndex].breed}</Text>
                  </View>
                )}
              </View>

              <Text style={styles.tapToViewText}>Tap to view full details</Text>
            </Pressable>
          ) : (
            <Text style={styles.subtitle}>No breeds loaded</Text>
          )}

          <View style={styles.separator} />

          {/* Action Buttons */}
          <View style={styles.resetInfoContainer}>
            <Text style={styles.resetInfoText}>
              🗄️ <Text style={styles.resetInfoHighlight}>Reset Database</Text> button will reload all breed data with shelter availability scores
            </Text>
            <Text style={styles.resetInfoSubtext}>
              Use this if you're getting 0 search results or seeing "undefined" shelter scores
            </Text>
          </View>
          
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={loadStats}>
              <Text style={styles.buttonText}>Refresh Stats</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={loadAllBreeds}>
              <Text style={styles.buttonText}>Reload Breeds</Text>
            </Pressable>

            <Pressable style={[styles.button, styles.clearButton]} onPress={handleClearAndReseed}>
              <Text style={styles.buttonText}>🔄 Load All Breeds</Text>
            </Pressable>

            <Pressable style={[styles.button, styles.resetButton]} onPress={handleResetDatabase}>
              <Text style={styles.buttonText}>🗄️ Reset Database</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40,
    backgroundColor: Colors.light.backgroundIvory,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: Colors.light.textCharcoal,
  },
  swipeInstructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
    color: Colors.light.primaryTeal,
    fontStyle: 'italic',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    color: Colors.light.textCharcoal,
  },
  error: {
    color: Colors.light.heartRed,
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: '80%',
    backgroundColor: Colors.light.secondarySand,
    opacity: 0.3,
  },
  statsContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  stat: {
    fontSize: 18,
    marginVertical: 5,
    textAlign: 'center',
    color: Colors.light.textCharcoal,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 15,
  },
  navButton: {
    backgroundColor: Colors.light.primaryTeal,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  navButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  breedCounter: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.textCharcoal,
  },
  breedCard: {
    width: '100%',
    padding: 20,
    marginVertical: 10,
    backgroundColor: Colors.light.backgroundIvory,
    borderWidth: 2,
    borderColor: Colors.light.primaryTeal,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  breedCardContent: {
    flex: 1,
  },
  breedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  breedName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.textCharcoal,
    flex: 1,
  },
  favoriteButton: {
    padding: 12,
    borderRadius: 25,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  favoriteButtonActive: {
    backgroundColor: 'transparent',
    shadowOpacity: 0.3,
    elevation: 6,
  },
  favoriteButtonText: {
    fontSize: 18,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageWrapper: {
    position: 'relative',
  },
  breedImage: {
    width: 350,
    height: 300,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  placeholderImage: {
    width: 350,
    height: 300,
    borderRadius: 16,
    backgroundColor: Colors.light.secondarySand,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.light.primaryTeal,
    borderStyle: 'dashed',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  placeholderText: {
    fontSize: 64,
    marginBottom: 12,
  },
  placeholderSubtext: {
    fontSize: 18,
    opacity: 0.8,
    textAlign: 'center',
    fontWeight: '500',
  },
  tapToViewText: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.light.primaryTeal,
    fontStyle: 'italic',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
  },
  button: {
    backgroundColor: Colors.light.primaryTeal,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  clearButton: {
    backgroundColor: Colors.light.secondarySand,
  },
  resetButton: {
    backgroundColor: Colors.light.primaryTeal,
    borderWidth: 2,
    borderColor: Colors.light.primaryTeal,
  },
  resetInfoContainer: {
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  resetInfoText: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.light.textCharcoal,
    marginBottom: 8,
    lineHeight: 22,
  },
  resetInfoHighlight: {
    fontWeight: 'bold',
    color: Colors.light.primaryTeal,
  },
  resetInfoSubtext: {
    fontSize: 14,
    textAlign: 'center',
    color: Colors.light.textCharcoal,
    opacity: 0.8,
    fontStyle: 'italic',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { StyleSheet, View, Text, Pressable, Alert, Image, Dimensions, VirtualizedList } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useBreedsContext } from '@/contexts/BreedsContext';
import { useDatabaseContext } from '@/contexts/DatabaseContext';
import { useFavorites } from '@/hooks/useDatabase';
import { breedImages } from '@/utils/breedImages';
import Colors from '@/constants/Colors';

export default function FlowBrowseScreen() {
  const router = useRouter();
  const { breeds } = useBreedsContext();
  const { isInitialized } = useDatabaseContext();
  const { isFavorite, toggleFavorite, loadFavorites } = useFavorites();
  const listRef = useRef<VirtualizedList<any>>(null);

  const screenWidth = Dimensions.get('window').width;
  const imageSize = screenWidth - 40; // Account for padding

  // Memoize the breeds to prevent unnecessary re-renders
  const memoizedBreeds = useMemo(() => breeds, [breeds]);

  // VirtualizedList helper functions
  const getItemCount = () => memoizedBreeds.length;
  const getItem = (data: any, index: number) => memoizedBreeds[index];

  useEffect(() => {
    if (isInitialized) {
      loadFavorites();
    }
  }, [isInitialized]);

  useFocusEffect(
    React.useCallback(() => {
      listRef.current?.scrollToIndex({ index: 0, animated: false });
    }, [])
  );

  const handleBackPress = () => {
    // Navigate back to the main flow page (index)
    router.replace('/');
  };

  const handleBreedPress = (breed: any) => {
    router.push({
      pathname: '/(tabs)/browse-stack/breed-detail-flow',
      params: { breedId: breed.id.toString() }
    });
  };

  const handleFavoritePress = async (breed: any) => {
    try {
      await toggleFavorite(breed.id);
      if (isFavorite(breed.id)) {
        Alert.alert('Favorite Removed', `${breed.breed} has been removed from your favorites!`);
      } else {
        Alert.alert('Favorite Added', `${breed.breed} has been added to your favorites!`);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      Alert.alert('Error', 'Failed to update favorite. Please try again.');
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Browse Breeds</Text>
        </View>
      </View>
      
      <View style={styles.contentArea}>
        <Text style={styles.subtitle}>Explore all available dog breeds</Text>
        
        <VirtualizedList
          ref={listRef}
          data={memoizedBreeds}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={10}
          getItemCount={getItemCount}
          getItem={getItem}
          renderItem={({ item: breed }) => (
            <View style={styles.breedCard}>
              <Pressable
                style={styles.favoriteButton}
                onPress={() => handleFavoritePress(breed)}
              >
                <FontAwesome 
                  name={isFavorite(breed.id) ? "heart" : "heart-o"} 
                  size={20} 
                  color={Colors.light.heartRed} 
                />
              </Pressable>
              
              <Pressable
                style={styles.breedContent}
                onPress={() => handleBreedPress(breed)}
              >
                <Image
                  source={breedImages[breed.breed.toLowerCase()] || require('@/assets/images/breeds_resized/akita.png')}
                  style={[styles.breedImage, { width: imageSize, height: imageSize }]}
                  resizeMode="contain"
                  fadeDuration={0}
                  loadingIndicatorSource={require('@/assets/images/breeds_resized/akita.png')}
                />
                <View style={styles.breedInfo}>
                  <Text style={styles.breedName}>{breed.breed}</Text>
                  
                  {breed.shelter_availability_score >= 8 && (
                    <Text style={styles.shelterBadge}>🏠 Common in Shelters</Text>
                  )}
                  
                  <View style={styles.traitsContainer}>
                    <Text style={styles.traitText}>Size: {breed.size}</Text>
                    <Text style={styles.traitText}>Energy: {breed.energy_level}</Text>
                    <Text style={styles.traitText}>Trainability: {breed.trainability}</Text>
                    <Text style={styles.traitText}>Grooming: {breed.grooming_needs}</Text>
                    <Text style={styles.traitText}>Role: {breed.companion_or_guardian === 'Both' ? 'Companion and Guardian' : breed.companion_or_guardian}</Text>
                    
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
          )}
          keyExtractor={(item) => item.breed}
          style={styles.virtualizedList}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
  contentArea: {
    flex: 1,
  },
  backButton: {
    padding: 12,
    backgroundColor: 'rgba(76, 181, 171, 0.1)',
    borderRadius: 8,
    zIndex: 11,
    elevation: 11,
  },
  backButtonText: {
    fontSize: 18,
    color: Colors.light.primaryTeal,
    fontWeight: '600',
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
  virtualizedList: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.textCharcoal,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.8,
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
});

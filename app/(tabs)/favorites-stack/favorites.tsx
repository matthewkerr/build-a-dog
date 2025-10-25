import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, Image, ActivityIndicator, Alert } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useDatabaseContext } from '@/contexts/DatabaseContext';
import { useFavorites } from '@/hooks/useDatabase';
import { DogBreed } from '@/database/database';
import { breedImages } from '@/utils/breedImages';
import Colors from '@/constants/Colors';

export default function FavoritesScreen() {
  const router = useRouter();
  const { isInitialized } = useDatabaseContext();
  const { favorites, isLoading, toggleFavorite, loadFavorites } = useFavorites();
  const [favoriteBreeds, setFavoriteBreeds] = useState<DogBreed[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (isInitialized) {
      loadFavorites();
    }
  }, [isInitialized]);

  useEffect(() => {
    if (favorites && favorites.length > 0) {
      setFavoriteBreeds(favorites);
    } else {
      setFavoriteBreeds([]);
    }
  }, [favorites]);

  useFocusEffect(
    React.useCallback(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }, [])
  );

  const handleBackPress = () => {
    router.replace('/');
  };

  const handleBreedPress = (breed: DogBreed) => {
    router.push({
      pathname: '/(tabs)/browse-stack/breed-detail-flow',
      params: { breedId: breed.id.toString() }
    });
  };

  const handleFavoritePress = (breed: DogBreed) => {
    toggleFavorite(breed.id);
    Alert.alert('Favorite Removed', `${breed.breed} has been removed from your favorites!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>My Favorites</Text>
        </View>
      </View>
      
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.light.primaryTeal} />
              <Text style={styles.loadingText}>Loading favorites...</Text>
            </View>
          ) : favoriteBreeds.length === 0 ? (
            <View style={styles.emptyContainer}>
              <FontAwesome name="heart-o" size={64} color={Colors.light.secondarySand} />
              <Text style={styles.emptyTitle}>No Favorites Yet</Text>
              <Text style={styles.emptyText}>
                Start browsing dogs and add breeds you love to your favorites!
              </Text>
              <Pressable style={styles.browseButton} onPress={() => router.push('/(tabs)/browse-stack/browse')}>
                <FontAwesome name="search" size={20} color="white" style={styles.browseIcon} />
                <Text style={styles.browseButtonText}>Browse Dogs</Text>
              </Pressable>
            </View>
          ) : (
            <>
              <Text style={styles.title}>Your Favorite Dogs</Text>
              <View style={styles.breedsGrid}>
                {favoriteBreeds.map((breed) => (
                  <View key={breed.id} style={styles.breedCard}>
                    <Pressable
                      style={styles.favoriteButton}
                      onPress={() => handleFavoritePress(breed)}
                    >
                      <FontAwesome 
                        name="heart" 
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
                        style={styles.breedImage}
                        resizeMode="contain"
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
                ))}
              </View>
            </>
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
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.light.textCharcoal,
    opacity: 0.7,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.light.textCharcoal,
    marginTop: 20,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.light.textCharcoal,
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  browseButton: {
    backgroundColor: Colors.light.primaryTeal,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#4CB5AB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  browseIcon: {
    marginRight: 8,
  },
  browseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.light.textCharcoal,
    marginBottom: 20,
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
    width: '100%',
    height: 300,
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

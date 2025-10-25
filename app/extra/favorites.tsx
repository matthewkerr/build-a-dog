import { StyleSheet, ActivityIndicator, Pressable, ScrollView, Image } from 'react-native';
import { useEffect, useState } from 'react';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useDatabaseContext } from '@/contexts/DatabaseContext';
import { useFavorites } from '@/hooks/useDatabase';
import { DogBreed } from '@/database/database';
import { getBreedImage } from '@/utils/breedImages';

// Function to clean up spacing issues in text
const cleanTextSpacing = (text: string): string => {
  if (!text) return '';
  
  return text
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/\n\s*/g, ' ') // Replace newlines and following spaces
    .replace(/\t/g, ' ') // Replace tabs with spaces
    .replace(/\r/g, ' ') // Replace carriage returns with spaces
    .replace(/\f/g, ' ') // Replace form feeds with spaces
    .replace(/\v/g, ' ') // Replace vertical tabs with spaces
    .replace(/\u00A0/g, ' ') // Replace non-breaking spaces
    .replace(/\u2000/g, ' ') // Replace en quad
    .replace(/\u2001/g, ' ') // Replace em quad
    .replace(/\u2002/g, ' ') // Replace en space
    .replace(/\u2003/g, ' ') // Replace em space
    .replace(/\u2004/g, ' ') // Replace three-per-em space
    .replace(/\u2005/g, ' ') // Replace four-per-em space
    .replace(/\u2006/g, ' ') // Replace six-per-em space
    .replace(/\u2007/g, ' ') // Replace figure space
    .replace(/\u2008/g, ' ') // Replace punctuation space
    .replace(/\u2009/g, ' ') // Replace thin space
    .replace(/\u200A/g, ' ') // Replace hair space
    .trim(); // Remove leading/trailing whitespace
};

export default function FavoritesScreen() {
  const { isInitialized } = useDatabaseContext();
  const { favorites, isLoading, error, toggleFavorite, loadFavorites } = useFavorites();
  const [favoriteBreeds, setFavoriteBreeds] = useState<DogBreed[]>([]);

  useEffect(() => {
    if (isInitialized) {
      console.log('Favorites screen: Database initialized, loading favorites...');
      loadFavorites();
    }
  }, [isInitialized]);

  useEffect(() => {
    console.log('Favorites screen: Favorites updated:', favorites?.length || 0, 'favorites');
    if (favorites) {
      setFavoriteBreeds(favorites);
    }
  }, [favorites]);

  if (!isInitialized) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.subtitle}>Initializing database...</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.subtitle}>Loading favorites...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Error loading favorites: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>❤️ My Favorites ({favoriteBreeds.length})</Text>
        <Text style={styles.subtitle}>
          {favoriteBreeds.length === 0 
            ? "You haven't favorited any breeds yet" 
            : `${favoriteBreeds.length} favorite breed${favoriteBreeds.length === 1 ? '' : 's'}`
          }
        </Text>

        {favoriteBreeds.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>🐕</Text>
            <Text style={styles.emptyStateSubtext}>
              Start favoriting breeds from the Find Match or Browse screens!
            </Text>
          </View>
        ) : (
          favoriteBreeds.map((breed, index) => (
            <View key={breed.id} style={styles.breedCard}>
              <View style={styles.breedHeader}>
                <Text style={styles.breedName}>{breed.breed}</Text>
                <Pressable 
                  style={[styles.favoriteButton, styles.favoriteButtonActive]}
                  onPress={() => toggleFavorite(breed.id)}
                >
                  <Text style={styles.favoriteButtonText}>❤️</Text>
                </Pressable>
              </View>

              {/* Breed Image */}
              <View style={styles.imageContainer}>
                {getBreedImage(breed.image_filename, breed.breed) ? (
                  <Image 
                    source={getBreedImage(breed.image_filename, breed.breed)!}
                    style={styles.breedImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.placeholderImage}>
                    <Text style={styles.placeholderText}>🐕</Text>
                    <Text style={styles.placeholderSubtext}>{breed.breed}</Text>
                  </View>
                )}
              </View>

              {/* Breed Attributes */}
              <View style={styles.attributesContainer}>
                <View style={styles.attributeRow}>
                  <Text style={styles.attributeLabel}>Size:</Text>
                  <Text style={styles.attributeValue}>{breed.size}</Text>
                </View>

                <View style={styles.attributeRow}>
                  <Text style={styles.attributeLabel}>Energy Level:</Text>
                  <Text style={styles.attributeValue}>{breed.energy_level}</Text>
                </View>

                <View style={styles.attributeRow}>
                  <Text style={styles.attributeLabel}>Good with Kids:</Text>
                  <Text style={styles.attributeValue}>{breed.good_with_kids ? '✅ Yes' : '❌ No'}</Text>
                </View>

                <View style={styles.attributeRow}>
                  <Text style={styles.attributeLabel}>Good with Pets:</Text>
                  <Text style={styles.attributeValue}>{breed.good_with_pets ? '✅ Yes' : '❌ No'}</Text>
                </View>

                <View style={styles.attributeRow}>
                  <Text style={styles.attributeLabel}>Trainability:</Text>
                  <Text style={styles.attributeValue}>{breed.trainability}</Text>
                </View>

                <View style={styles.attributeRow}>
                  <Text style={styles.attributeLabel}>Grooming Needs:</Text>
                  <Text style={styles.attributeValue}>{breed.grooming_needs}</Text>
                </View>

                <View style={styles.attributeRow}>
                  <Text style={styles.attributeLabel}>Role:</Text>
                  <Text style={styles.attributeValue}>{breed.companion_or_guardian}</Text>
                </View>

                <View style={styles.attributeRow}>
                  <Text style={styles.attributeLabel}>Senior Friendly:</Text>
                  <Text style={styles.attributeValue}>{breed.senior_friendly ? '✅ Yes' : '❌ No'}</Text>
                </View>
              </View>

              {/* Description */}
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionLabel}>About this breed:</Text>
                <Text style={styles.descriptionText}>
                  {cleanTextSpacing(breed.description)}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
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
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: Colors.light.textCharcoal,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.7,
    color: Colors.light.textCharcoal,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyStateText: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateSubtext: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.light.textCharcoal,
    opacity: 0.7,
  },
  error: {
    color: Colors.light.heartRed,
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
  },
  breedCard: {
    width: '100%',
    padding: 16,
    marginVertical: 10,
  },
  breedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  breedName: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    color: Colors.light.textCharcoal,
  },
  favoriteButton: {
    padding: 12,
    borderRadius: 25,
    // backgroundColor: Colors.light.secondarySand,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  favoriteButtonActive: {
    // backgroundColor: Colors.light.heartRed,
    shadowOpacity: 0.3,
    elevation: 6,
  },
  favoriteButtonText: {
    fontSize: 18,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 8,
  },
  breedImage: {
    width: 300,
    height: 250,
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
    width: 300,
    height: 250,
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
  attributesContainer: {
    marginBottom: 15,
  },
  attributeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  attributeLabel: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    color: Colors.light.textCharcoal,
  },
  attributeValue: {
    fontSize: 16,
    flex: 1,
    textAlign: 'right',
    color: Colors.light.textCharcoal,
  },
  descriptionContainer: {
    marginTop: 15,
    paddingTop: 10,
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: Colors.light.primaryTeal,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 24,
    opacity: 0.9,
    textAlign: 'left',
    paddingHorizontal: 5,
    marginTop: 5,
    color: Colors.light.textCharcoal,
  },
}); 
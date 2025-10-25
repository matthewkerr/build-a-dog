import { StyleSheet, ScrollView, Pressable, Image, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useDatabaseContext } from '@/contexts/DatabaseContext';
import { useBreeds, useFavorites } from '@/hooks/useDatabase';
import { DogBreed } from '@/database/database';
import { breedImages } from '@/utils/breedImages';

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

export default function BreedDetailScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { isInitialized } = useDatabaseContext();
  const { breeds, isLoading: breedsLoading, error: breedsError, loadAllBreeds } = useBreeds();
  const { isFavorite, toggleFavorite, loadFavorites } = useFavorites();
  
  const [selectedBreed, setSelectedBreed] = useState<DogBreed | null>(null);

  useEffect(() => {
    if (isInitialized) {
      loadAllBreeds();
      loadFavorites();
    }
  }, [isInitialized]);

  useEffect(() => {
    if (breeds.length > 0 && params.breedId) {
      const breed = breeds.find(b => b.id === parseInt(params.breedId as string));
      if (breed) {
        setSelectedBreed(breed);
      }
    }
  }, [breeds, params.breedId]);

  const handleToggleFavorite = async () => {
    if (selectedBreed) {
      try {
        await toggleFavorite(selectedBreed.id);
      } catch (error) {
        console.error('Error toggling favorite:', error);
      }
    }
  };

  if (!isInitialized) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.subtitle}>Initializing database...</Text>
      </View>
    );
  }

  if (breedsLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.subtitle}>Loading breed details...</Text>
      </View>
    );
  }

  if (breedsError || !selectedBreed) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Error</Text>
        <Text style={styles.error}>{breedsError || 'Breed not found'}</Text>
        <Pressable style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>← Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>← Back</Text>
          </Pressable>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>{selectedBreed.breed}</Text>
          </View>
        </View>
      </SafeAreaView>
      
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        <View style={styles.breedCard}>
          <View style={styles.breedHeader}>
            <Text style={styles.breedName}>{selectedBreed.breed}</Text>
            <Pressable 
              style={[styles.favoriteButton, isFavorite(selectedBreed.id) && styles.favoriteButtonActive]}
              onPress={handleToggleFavorite}
            >
              <Text style={styles.favoriteButtonText}>
                {isFavorite(selectedBreed.id) ? '❤️' : '🖤'}
              </Text>
            </Pressable>
          </View>

          {/* Breed Image */}
          <View style={styles.imageContainer}>
            <Image 
              source={breedImages[selectedBreed.breed.toLowerCase()] || require('@/assets/images/breeds_resized/akita.png')}
              style={styles.breedImage}
              resizeMode="cover"
              fadeDuration={0}
            />
          </View>


          <View style={styles.attributesContainer}>
            <View style={styles.attributeRow}>
              <Text style={styles.attributeLabel}>Size:</Text>
              <Text style={styles.attributeValue}>{selectedBreed.size}</Text>
            </View>

            <View style={styles.attributeRow}>
              <Text style={styles.attributeLabel}>Energy Level:</Text>
              <Text style={styles.attributeValue}>{selectedBreed.energy_level}</Text>
            </View>

            <View style={styles.attributeRow}>
              <Text style={styles.attributeLabel}>Good with Kids:</Text>
              <Text style={styles.attributeValue}>{selectedBreed.good_with_kids ? '✅ Yes' : '❌ No'}</Text>
            </View>

            <View style={styles.attributeRow}>
              <Text style={styles.attributeLabel}>Good with Pets:</Text>
              <Text style={styles.attributeValue}>{selectedBreed.good_with_pets ? '✅ Yes' : '❌ No'}</Text>
            </View>

            <View style={styles.attributeRow}>
              <Text style={styles.attributeLabel}>Trainability:</Text>
              <Text style={styles.attributeValue}>{selectedBreed.trainability}</Text>
            </View>

            <View style={styles.attributeRow}>
              <Text style={styles.attributeLabel}>Grooming Needs:</Text>
              <Text style={styles.attributeValue}>{selectedBreed.grooming_needs}</Text>
            </View>

            <View style={styles.attributeRow}>
              <Text style={styles.attributeLabel}>Role:</Text>
              <Text style={styles.attributeValue}>{selectedBreed.companion_or_guardian}</Text>
            </View>

            <View style={styles.attributeRow}>
              <Text style={styles.attributeLabel}>Senior Friendly:</Text>
              <Text style={styles.attributeValue}>{selectedBreed.senior_friendly ? '✅ Yes' : '❌ No'}</Text>
            </View>

            <View style={styles.attributeRow}>
              <Text style={styles.attributeLabel}>Special Needs Possible:</Text>
              <Text style={styles.attributeValue}>{selectedBreed.special_needs_possible ? '✅ Yes' : '❌ No'}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>About this breed:</Text>
            <Text style={styles.breedDescription}>
              {cleanTextSpacing(selectedBreed.description)}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.backgroundIvory,
  },
  safeArea: {
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
    zIndex: 10,
    elevation: 10,
    minHeight: 60,
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
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: Colors.light.textCharcoal,
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
  button: {
    backgroundColor: Colors.light.primaryTeal,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
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
   // backgroundColor: Colors.light.secondarySand,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
    width: '100%',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: 350,
  },
  breedImage: {
    width: '100%',
    height: 300,
    borderRadius: 16,
    backgroundColor: Colors.light.secondarySand,
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
    width: '100%',
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
  attributesContainer: {
    marginBottom: 20,
  },
  attributeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.secondarySand,
  },
  attributeLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.textCharcoal,
  },
  attributeValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.primaryTeal,
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: Colors.light.textCharcoal,
  },
  breedDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.textCharcoal,
    marginBottom: 10,
  },
  readMoreButton: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  readMoreText: {
    color: Colors.light.primaryTeal,
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
}); 
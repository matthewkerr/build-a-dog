import { StyleSheet, ActivityIndicator, Pressable, ScrollView, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useDatabaseContext } from '@/contexts/DatabaseContext';
import { useFavorites } from '@/hooks/useDatabase';
import { useBreeds } from '@/hooks/useDatabase';
import { useBreedMatcher, BreedMatch, UserPreferences } from '@/hooks/useBreedMatcher';
import { getBreedImage } from '@/utils/breedImages';

// List of common shelter dog breeds from TOP_AVAILABLE DOGS_SHELTER.md
const COMMON_SHELTER_BREEDS = [
  'American Pit Bull Terrier',
  'Labrador Retriever',
  'German Shepherd',
  'Boxer',
  'American Staffordshire Terrier',
  'Staffordshire Bull Terrier',
  'American Bulldog',
  'Beagle',
  'Australian Shepherd',
  'Australian Cattle Dog',
  'Border Collie',
  'Golden Retriever',
  'Rottweiler',
  'Doberman Pinscher',
  'Chihuahua',
  'Dachshund',
  'Jack Russell Terrier',
  'Yorkshire Terrier',
  'Boston Terrier',
];

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

interface BreedMatchCardProps {
  match: BreedMatch;
  index: number;
  onImagePress: (source: any, breedName: string) => void;
}

function BreedMatchCard({ match, index, onImagePress }: BreedMatchCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isFavorite, toggleFavorite, loadFavorites } = useFavorites();
  const maxLines = 4; // Show first 4 lines by default
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleImagePress = () => {
    const imageSource = getBreedImage(match.breed.image_filename, match.breed.breed);
    console.log('Image pressed for breed:', match.breed.breed);
    console.log('Image source:', imageSource);
    if (imageSource) {
      onImagePress(imageSource, match.breed.breed);
    }
  };

  return (
    <View style={styles.matchCard}>
      {/* Header */}
      <View style={styles.matchHeader}>
        <Text style={styles.matchRank}>#{index + 1}</Text>
        <Text style={styles.matchName}>{match.breed.breed}</Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.matchScore}>{match.score}% match</Text>
          {COMMON_SHELTER_BREEDS.includes(match.breed.breed) && (
            <Text style={styles.shelterScore}>
              🏠 Shelter Score: {match.breed.shelter_availability_score}/10
            </Text>
          )}
        </View>
      </View>
      
      {/* Shelter Availability Badge */}
      {COMMON_SHELTER_BREEDS.includes(match.breed.breed) && (
        <View style={styles.shelterBadge}>
          <Text style={styles.shelterBadgeText}>
            🏠 Commonly Available in Shelters
          </Text>
        </View>
      )}

      {/* Breed Image with Favorite Button Overlay */}
      <View style={styles.imageContainer}>
        {getBreedImage(match.breed.image_filename, match.breed.breed) ? (
          <Pressable onPress={handleImagePress}>
            <View style={styles.imageWrapper}>
              <Image 
                source={getBreedImage(match.breed.image_filename, match.breed.breed)!}
                style={styles.breedImage}
                resizeMode="cover"
              />

              {/* Favorite Button Overlay */}
              <Pressable 
                style={[styles.favoriteButtonOverlay, isFavorite(match.breed.id) && styles.favoriteButtonActive]}
                onPress={() => toggleFavorite(match.breed.id)}
              >
                <Text style={styles.favoriteButtonText}>
                  {isFavorite(match.breed.id) ? '❤️' : '🤍'}
                </Text>
              </Pressable>
            </View>
          </Pressable>
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>🐕</Text>
            <Text style={styles.placeholderSubtext}>{match.breed.breed}</Text>
          </View>
        )}
      </View>

      {/* Basic attributes */}
      <View style={styles.matchAttributes}>
        <Text style={styles.attributeText}>Size: {cleanTextSpacing(match.breed.size)}</Text>
        <Text style={styles.attributeText}>Energy: {cleanTextSpacing(match.breed.energy_level)}</Text>
        <Text style={styles.attributeText}>Trainability: {cleanTextSpacing(match.breed.trainability)}</Text>
      </View>

      {/* Collapsible description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>About this breed:</Text>
        <Text 
          style={styles.matchDescription}
          numberOfLines={isExpanded ? undefined : maxLines}
          ellipsizeMode="tail"
        >
          {cleanTextSpacing(match.breed.description)}
        </Text>
        <Pressable 
          style={styles.readMoreButton} 
          onPress={toggleExpanded}
        >
          <Text style={styles.readMoreText}>
            {isExpanded ? 'Read Less' : 'Read More'}
          </Text>
        </Pressable>
      </View>

      {/* Detailed characteristics - always visible */}
      <View style={styles.detailedAttributes}>
        <Text style={styles.detailedAttributesTitle}>Detailed Characteristics:</Text>
        <View style={styles.attributeGrid}>
          <View style={styles.attributeRow}>
            <Text style={styles.attributeLabel}>Good with Kids:</Text>
            <Text style={styles.attributeValue}>{match.breed.good_with_kids ? '✅ Yes' : '❌ No'}</Text>
          </View>
          <View style={styles.attributeRow}>
            <Text style={styles.attributeLabel}>Good with Pets:</Text>
            <Text style={styles.attributeValue}>{match.breed.good_with_pets ? '✅ Yes' : '❌ No'}</Text>
          </View>
          <View style={styles.attributeRow}>
            <Text style={styles.attributeLabel}>Grooming Needs:</Text>
            <Text style={styles.attributeValue}>{cleanTextSpacing(match.breed.grooming_needs)}</Text>
          </View>
          <View style={styles.attributeRow}>
            <Text style={styles.attributeLabel}>Role:</Text>
            <Text style={styles.attributeValue}>{cleanTextSpacing(match.breed.companion_or_guardian)}</Text>
          </View>
          <View style={styles.attributeRow}>
            <Text style={styles.attributeLabel}>Senior Friendly:</Text>
            <Text style={styles.attributeValue}>{match.breed.senior_friendly ? '✅ Yes' : '❌ No'}</Text>
          </View>
        </View>
      </View>

      {/* Match reasons - always visible */}
      {match.matchReasons.length > 0 && (
        <View style={styles.reasonsContainer}>
          <Text style={styles.reasonsTitle}>Why this is a great match:</Text>
          {match.matchReasons.map((reason, idx) => (
            <Text key={idx} style={styles.reasonText}>• {cleanTextSpacing(reason)}</Text>
          ))}
        </View>
      )}
    </View>
  );
}

export default function ResultsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { isInitialized } = useDatabaseContext();
  const { breeds, loadAllBreeds } = useBreeds();
  const { loadFavorites } = useFavorites();
  const { findBestMatches, isMatching } = useBreedMatcher();
  
  const [matches, setMatches] = useState<BreedMatch[]>([]);
  const [fullScreenImage, setFullScreenImage] = useState<{ source: any; breedName: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);

  // Parse preferences once when component mounts
  useEffect(() => {
    const parsedPreferences: UserPreferences = {
      size: params.size as string || 'Any',
      energyLevel: params.energyLevel as string || 'Any',
      goodWithKids: params.goodWithKids === 'null' ? null : params.goodWithKids === 'true',
      goodWithPets: params.goodWithPets === 'null' ? null : params.goodWithPets === 'true',
      trainability: params.trainability as string || 'Any',
      groomingNeeds: params.groomingNeeds as string || 'Any',
      role: params.role as string || 'Any',
      seniorFriendly: params.seniorFriendly === 'null' ? null : params.seniorFriendly === 'true',
      specialNeedsOk: params.specialNeedsOk === 'null' ? null : params.specialNeedsOk === 'true',
      prioritizeAdoptable: params.prioritizeAdoptable === 'true',
    };
    setPreferences(parsedPreferences);
  }, []); // Empty dependency array - only run once

  useEffect(() => {
    if (isInitialized) {
      loadAllBreeds();
      loadFavorites();
    }
  }, [isInitialized]);

  useEffect(() => {
    const loadResults = async () => {
      if (!isInitialized || breeds.length === 0 || !preferences) return;

      try {
        setIsLoading(true);
        setError(null);

        const results = await findBestMatches(breeds, preferences);
        setMatches(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load results');
        console.error('Error loading results:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadResults();
  }, [isInitialized, breeds.length, preferences]); // Now preferences is stable

  const handleBackToForm = () => {
    router.back();
  };

  const handleStartOver = () => {
    router.replace('/(tabs)');
  };

  if (!isInitialized) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.subtitle}>Initializing database...</Text>
      </View>
    );
  }

  if (isLoading || isMatching) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.subtitle}>Finding your perfect matches...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Error</Text>
        <Text style={styles.error}>{error}</Text>
        <Pressable style={styles.button} onPress={handleBackToForm}>
          <Text style={styles.buttonText}>← Back to Form</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen 
        options={{
          title: 'Results',
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.light.backgroundIvory,
          },
          headerTintColor: '#000000',
          headerTitleStyle: {
            color: Colors.light.textCharcoal,
            fontWeight: 'bold',
          },
          headerBackTitle: 'Back',
        }}
      />
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
        <Text style={styles.title}>Your Perfect Matches</Text>
        <Text style={styles.subtitle}>Top {matches.length} breeds based on your preferences</Text>
        
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
          <Text style={styles.adoptionMessageText}>
            💡 <Text style={styles.adoptionMessageHighlight}>Results are prioritized to show commonly available shelter dogs first!</Text>
          </Text>
        </View>

        {matches.map((match, index) => (
          <BreedMatchCard 
            key={match.breed.id} 
            match={match} 
            index={index} 
            onImagePress={(source, breedName) => setFullScreenImage({ source, breedName })}
          />
        ))}

        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleBackToForm}>
            <Text style={styles.buttonText}>← Back to Form</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.resetButton]} onPress={handleStartOver}>
            <Text style={styles.buttonText}>🔄 Start Over</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Global Full Screen Image Modal - Outside ScrollView */}
      {fullScreenImage && (
        <View style={styles.fullScreenModal}>
          <Pressable style={styles.fullScreenModalOverlay} onPress={() => setFullScreenImage(null)}>
            <View style={styles.fullScreenImageContainer}>
              <Image 
                source={fullScreenImage.source}
                style={styles.fullScreenImage}
                resizeMode="contain"
                onError={(error) => console.log('Image error:', error.nativeEvent)}
                onLoad={() => console.log('Image loaded successfully for:', fullScreenImage.breedName)}
              />
              <Text style={styles.fullScreenImageText}>{fullScreenImage.breedName}</Text>
            </View>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 80,
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
  resetButton: {
    backgroundColor: Colors.light.secondarySand,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: Colors.light.heartRed,
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
  },
  adoptionMessage: {
    marginBottom: 25,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.light.primaryTeal,
    width: '100%',
    maxWidth: 400,
  },
  adoptionMessageText: {
    fontSize: 16,
    lineHeight: 22,
    color: Colors.light.textCharcoal,
    marginBottom: 12,
    textAlign: 'center',
  },
  matchCard: {
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
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  matchRank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.primaryTeal,
  },
  matchName: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    color: Colors.light.textCharcoal,
  },
  matchScore: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.successGreen,
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
  favoriteButtonOverlay: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  favoriteButtonActive: {
    shadowOpacity: 0.3,
    elevation: 6,
  },
  favoriteButtonText: {
    fontSize: 24,
  },
  tapIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    padding: 4,
  },
  tapIndicatorText: {
    fontSize: 12,
  },
  matchAttributes: {
    marginBottom: 15,
  },
  attributeText: {
    fontSize: 14,
    marginBottom: 4,
    color: Colors.light.textCharcoal,
  },
  descriptionContainer: {
    marginBottom: 15,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: Colors.light.textCharcoal,
  },
  matchDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.light.textCharcoal,
  },
  readMoreButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  readMoreText: {
    color: Colors.light.primaryTeal,
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  detailedAttributes: {
    marginBottom: 15,
  },
  detailedAttributesTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: Colors.light.primaryTeal,
  },
  attributeGrid: {
    gap: 8,
  },
  attributeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
  attributeLabel: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    color: Colors.light.textCharcoal,
  },
  attributeValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.primaryTeal,
  },
  reasonsContainer: {
    marginTop: 10,
  },
  reasonsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: Colors.light.primaryTeal,
  },
  reasonText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
    color: Colors.light.textCharcoal,
  },
  fullScreenModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    elevation: 9999,
  },
  fullScreenModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  fullScreenImage: {
    width: '90%',
    height: '70%',
    borderRadius: 12,
  },
  fullScreenImageText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  shelterBadge: {
    backgroundColor: Colors.light.successGreen,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.light.primaryTeal,
  },
  shelterBadgeText: {
    color: Colors.light.textCharcoal,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  shelterScore: {
    fontSize: 12,
    color: Colors.light.primaryTeal,
    fontWeight: '500',
    marginTop: 2,
  },
  adoptionMessageHighlight: {
    fontWeight: '600',
    color: Colors.light.primaryTeal,
  },
}); 
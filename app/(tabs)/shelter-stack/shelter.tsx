import React, { useEffect, useState, useMemo, useRef } from 'react';
import { StyleSheet, View, Text, Pressable, Alert, Image, Dimensions, ScrollView } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useBreedsContext } from '@/contexts/BreedsContext';
import { breedImages } from '@/utils/breedImages';
import Colors from '@/constants/Colors';

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

export default function ShelterScreen() {
  const router = useRouter();
  const { breeds } = useBreedsContext();
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const screenWidth = Dimensions.get('window').width;
  const imageSize = screenWidth - 40; // Account for padding

  // Filter breeds to only show common shelter dogs
  const shelterBreeds = useMemo(() => {
    return breeds.filter(breed => COMMON_SHELTER_BREEDS.includes(breed.breed));
  }, [breeds]);

  const handleBackPress = () => {
    router.replace('/');
  };

  const handleBreedPress = (breed: any) => {
    router.push({
      pathname: '/(tabs)/shelter-stack/breed-detail-flow',
      params: { breedId: breed.id.toString() }
    });
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
        <Pressable style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Common Shelter Dogs</Text>
        </View>
      </View>
      
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subtitle}>Breeds commonly found in shelters nationwide</Text>
        
        {shelterBreeds.map((breed) => (
          <View key={breed.breed} style={styles.breedCard}>
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
                source={breedImages[breed.breed.toLowerCase()] || require('@/assets/images/breeds_resized/akita.png')}
                style={[styles.breedImage, { width: imageSize, height: imageSize }]}
                resizeMode="contain"
                fadeDuration={0}
                loadingIndicatorSource={require('@/assets/images/breeds_resized/akita.png')}
              />
              <View style={styles.breedInfo}>
                <Text style={styles.breedName}>{breed.breed}</Text>
                
                <Text style={styles.shelterBadge}>🏠 Commonly Found in Shelters</Text>
                
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
        
        {/* Reasons section */}
        <View style={styles.reasonsSection}>
          <Text style={styles.reasonsTitle}>Why These Dogs End Up in Shelters</Text>
          
          <View style={styles.reasonsList}>
            <View style={styles.reasonItem}>
              <Text style={styles.reasonEmoji}>🏠</Text>
              <Text style={styles.reasonText}>Housing restrictions and breed bans</Text>
            </View>
            
            <View style={styles.reasonItem}>
              <Text style={styles.reasonEmoji}>⚡</Text>
              <Text style={styles.reasonText}>High energy needs not met</Text>
            </View>
            
            <View style={styles.reasonItem}>
              <Text style={styles.reasonEmoji}>💰</Text>
              <Text style={styles.reasonText}>Financial hardship and vet costs</Text>
            </View>
            
            <View style={styles.reasonItem}>
              <Text style={styles.reasonEmoji}>👨‍👩‍👧‍👦</Text>
              <Text style={styles.reasonText}>Life changes (moving, divorce, new baby)</Text>
            </View>
            
            <View style={styles.reasonItem}>
              <Text style={styles.reasonEmoji}>🎓</Text>
              <Text style={styles.reasonText}>Lack of training and socialization</Text>
            </View>
          </View>
          
          <View style={styles.ctaSection}>
            <Text style={styles.ctaTitle}>Find Your Perfect Match!</Text>
            <Text style={styles.ctaSubtitle}>
              These amazing dogs are waiting for loving homes. Use our search to find the breed that matches your lifestyle.
            </Text>
            
            <Pressable style={styles.searchButton} onPress={() => router.push('/(tabs)/search-stack/size')}>
              <FontAwesome name="paw" size={20} color="white" style={styles.searchButtonIcon} />
              <Text style={styles.searchButtonText}>Start Your Search</Text>
            </Pressable>
          </View>
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
    padding: 20,
    paddingBottom: 40,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.textCharcoal,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
    opacity: 0.8,
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
    marginBottom: 16,
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
  reasonsSection: {
    backgroundColor: 'white',
    marginTop: 16,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.secondarySand,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  reasonsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.textCharcoal,
    marginBottom: 16,
    textAlign: 'center',
  },
  reasonsList: {
    marginBottom: 24,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
  },
  reasonEmoji: {
    fontSize: 20,
    marginRight: 12,
    width: 30,
  },
  reasonText: {
    fontSize: 16,
    color: Colors.light.textCharcoal,
    flex: 1,
    lineHeight: 22,
  },
  ctaSection: {
    backgroundColor: Colors.light.primaryTeal,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
    opacity: 0.9,
  },
  searchButton: {
    backgroundColor: 'white',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  searchButtonIcon: {
    marginRight: 8,
  },
  searchButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.primaryTeal,
  },
});


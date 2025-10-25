import React, { useEffect } from 'react';
import { StyleSheet, View, Pressable, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useBreedsContext } from '@/contexts/BreedsContext';

import Colors from '@/constants/Colors';

export default function FlowScreen() {
  const router = useRouter();
  const { breeds, isLoading: breedsLoading } = useBreedsContext();


  const handleSearchPress = () => {
    router.push('/(tabs)/search-stack/size');
  };

  const handleBrowsePress = () => {
    router.push('/(tabs)/browse-stack/browse');
  };

  const handleFavoritesPress = () => {
    router.push('/(tabs)/favorites-stack/favorites');
  };

  const handleAdoptionPress = () => {
    router.push('/(tabs)/adoption-stack/adoption');
  };

  const handleTipsPress = () => {
    router.push('/(tabs)/tips-stack/tips');
  };

  const handleShelterPress = () => {
    router.push('/(tabs)/shelter-stack/shelter');
  };

  const handleSeniorPress = () => {
    router.push('/(tabs)/senior-stack/senior');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={require('../../assets/images/icon.png')} 
          style={styles.headerIcon}
          resizeMode="contain"
        />
        
        <Pressable style={styles.button} onPress={handleSearchPress}>
        <FontAwesome 
            name="search" 
            size={24} 
            color={breedsLoading ? "rgba(255, 255, 255, 0.6)" : "white"} 
            style={styles.icon} 
          />
       
          <Text style={styles.buttonText}>Search for my match</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={handleShelterPress}>
          <FontAwesome name="home" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Common Shelter Dogs</Text>
        </Pressable>
        
        <Pressable 
          style={[styles.button, breedsLoading && styles.disabledButton]} 
          onPress={handleBrowsePress}
          disabled={breedsLoading}
        >
             <FontAwesome name="paw" size={24} color="white" style={styles.icon} />
          <Text style={[styles.buttonText, breedsLoading && styles.disabledButtonText]}>
            {breedsLoading ? 'Loading breeds...' : 'Browse for my match'}
          </Text>
        </Pressable>

        <Pressable style={styles.button} onPress={handleSeniorPress}>
          <FontAwesome name="heart" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Adopt a Senior Dog</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={handleAdoptionPress}>
          <FontAwesome name="home" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Why Adopt</Text>
        </Pressable>

        {/* <Pressable style={styles.button} onPress={handleTipsPress}>
          <FontAwesome name="lightbulb-o" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Furvana Tips</Text>
        </Pressable> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.backgroundIvory,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 20,
  },
  headerIcon: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  button: {
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
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: Colors.light.secondarySand,
  },
  icon: {
    marginRight: 14,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  disabledButton: {
    opacity: 0.6,
    backgroundColor: Colors.light.secondarySand,
  },
  disabledButtonText: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
});

import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
// import * as FileSystem from 'expo-file-system';
// import * as Sharing from 'expo-sharing';
import { useDatabaseContext } from '@/contexts/DatabaseContext';
import { useFavorites } from '@/hooks/useDatabase';
import Colors from '@/constants/Colors';

const __DEV__ = process.env.NODE_ENV === 'development';

export default function SettingsScreen() {
  const { isInitialized, resetDatabase } = useDatabaseContext();
  const { favorites, loadFavorites } = useFavorites();
  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isReloading, setIsReloading] = useState(false);

  // const handleSaveFavorites = async () => {
  //   try {
  //     setIsSaving(true);
      
  //     if (!favorites || favorites.length === 0) {
  //       Alert.alert('No Favorites', 'You don\'t have any favorites to save.');
  //       return;
  //     }

  //     // Create JSON data
  //     const favoritesData = {
  //       exportDate: new Date().toISOString(),
  //       favoritesCount: favorites.length,
  //       favorites: favorites.map(fav => ({
  //         id: fav.id,
  //         breed: fav.breed,
  //         size: fav.size,
  //         energy_level: fav.energy_level,
  //         good_with_kids: fav.good_with_kids,
  //         good_with_pets: fav.good_with_pets,
  //         trainability: fav.trainability,
  //         grooming_needs: fav.grooming_needs,
  //         companion_or_guardian: fav.companion_or_guardian,
  //         senior_friendly: fav.senior_friendly,
  //         special_needs_possible: fav.special_needs_possible,
  //         description: fav.description,
  //         favorited_at: fav.favorited_at
  //       }))
  //     };

  //     // Create filename with timestamp
  //     const timestamp = new Date().toISOString().split('T')[0];
  //     const filename = `dog-favorites-${timestamp}.json`;
      
  //     // Write file to temporary location
  //     await FileSystem.writeAsStringAsync(filename, JSON.stringify(favoritesData, null, 2));

  //     // Share the file
  //     if (await Sharing.isAvailableAsync()) {
  //       await Sharing.shareAsync(filename, {
  //         mimeType: 'application/json',
  //         dialogTitle: 'Save Dog Favorites'
  //       });
  //     } else {
  //       Alert.alert('Success', `Favorites saved to: ${filename}`);
  //     }

  //   } catch (error) {
  //     console.error('Error saving favorites:', error);
  //     Alert.alert('Error', 'Failed to save favorites. Please try again.');
  //   } finally {
  //     setIsSaving(false);
  //   }
  // };

  const handleResetDatabase = async () => {
    Alert.alert(
      'Reset Database',
      'This will delete all your favorites and reset the database. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsResetting(true);
              await resetDatabase();
              Alert.alert('Success', 'Database has been reset.');
            } catch (error) {
              console.error('Error resetting database:', error);
              Alert.alert('Error', 'Failed to reset database. Please try again.');
            } finally {
              setIsResetting(false);
            }
          }
        }
      ]
    );
  };

  const handleReloadData = async () => {
    try {
      setIsReloading(true);
      await loadFavorites();
      Alert.alert('Success', 'Data has been reloaded.');
    } catch (error) {
      console.error('Error reloading data:', error);
      Alert.alert('Error', 'Failed to reload data. Please try again.');
    } finally {
      setIsReloading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>
      </View>
      
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Favorites</Text>
          
          <Pressable 
            style={[styles.button, isSaving && styles.disabledButton]} 
            onPress={handleSaveFavorites}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <FontAwesome name="download" size={20} color="white" style={styles.buttonIcon} />
            )}
            <Text style={styles.buttonText}>
              {isSaving ? 'Saving...' : 'Save Favorites to Device'}
            </Text>
          </Pressable>
          
          <Text style={styles.buttonDescription}>
            Export your favorite dog breeds as a JSON file that you can save to your device or share.
          </Text>
        </View> */}

        {__DEV__ && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Debug Tools</Text>
            <Text style={styles.debugNote}>
              These tools are only available in development mode.
            </Text>
            
            <Pressable 
              style={[styles.button, styles.debugButton, isReloading && styles.disabledButton]} 
              onPress={handleReloadData}
              disabled={isReloading}
            >
              {isReloading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <FontAwesome name="refresh" size={20} color="white" style={styles.buttonIcon} />
              )}
              <Text style={styles.buttonText}>
                {isReloading ? 'Reloading...' : 'Reload Data'}
              </Text>
            </Pressable>
            
            <Pressable 
              style={[styles.button, styles.debugButton, styles.dangerButton, isResetting && styles.disabledButton]} 
              onPress={handleResetDatabase}
              disabled={isResetting}
            >
              {isResetting ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <FontAwesome name="trash" size={20} color="white" style={styles.buttonIcon} />
              )}
              <Text style={styles.buttonText}>
                {isResetting ? 'Resetting...' : 'Reset Database'}
              </Text>
            </Pressable>
            
            <Text style={styles.buttonDescription}>
              Debug tools for development. Reset will delete all favorites permanently.
            </Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Info</Text>
          <Text style={styles.infoText}>
            Build a Dog - Find your perfect canine companion
          </Text>
          <Text style={styles.infoText}>
            Version: 1.0.0
          </Text>
          <Text style={styles.infoText}>
            Favorites Count: {favorites?.length || 0}
          </Text>
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
  titleContainer: {
    flex: 1,
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
  section: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.secondarySand,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.textCharcoal,
    marginBottom: 16,
  },
  button: {
    backgroundColor: Colors.light.primaryTeal,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#4CB5AB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  debugButton: {
    backgroundColor: Colors.light.actionOrange,
  },
  dangerButton: {
    backgroundColor: Colors.light.heartRed,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonIcon: {
    marginRight: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonDescription: {
    fontSize: 14,
    color: Colors.light.textCharcoal,
    opacity: 0.7,
    lineHeight: 20,
    marginTop: 8,
  },
  debugNote: {
    fontSize: 14,
    color: Colors.light.actionOrange,
    fontWeight: '500',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  infoText: {
    fontSize: 16,
    color: Colors.light.textCharcoal,
    marginBottom: 8,
    lineHeight: 22,
  },
});

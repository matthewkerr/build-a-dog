import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { databaseManager } from '@/database/database';

export function DatabaseDebug() {
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const runDebug = async () => {
    setIsLoading(true);
    setDebugInfo('🔍 Running database debug...\n');
    
    try {
      // Get stats
      const stats = await databaseManager.getDatabaseStats();
      let info = `📊 Database Stats:\n`;
      info += `   Breeds: ${stats.breedCount}\n`;
      info += `   Favorites: ${stats.favoriteCount}\n\n`;
      
      // Get all breeds
      const breeds = await databaseManager.getAllBreeds();
      info += `📋 Found ${breeds.length} breeds in database\n\n`;
      
      // Check for truncated descriptions
      info += `🔍 Checking for truncated descriptions...\n`;
      
      const truncatedBreeds = breeds.filter(breed => 
        breed.description.includes('...') || 
        breed.description.length < 100
      );
      
      if (truncatedBreeds.length === 0) {
        info += `✅ No truncated descriptions found!\n\n`;
      } else {
        info += `❌ Found ${truncatedBreeds.length} breeds with potentially truncated descriptions:\n\n`;
        
        truncatedBreeds.forEach((breed, index) => {
          info += `${index + 1}. ${breed.breed} (ID: ${breed.id})\n`;
          info += `   Length: ${breed.description.length} characters\n`;
          info += `   Description: "${breed.description}"\n\n`;
        });
      }
      
      // Check specific breeds
      info += `🔍 Checking specific breeds for data quality...\n\n`;
      
      const testBreeds = ['Labrador Retriever', 'German Shepherd', 'Golden Retriever', 'Rottweiler', 'Yorkshire Terrier'];
      
      for (const breedName of testBreeds) {
        const breed = breeds.find(b => b.breed === breedName);
        if (breed) {
          info += `✅ ${breed.breed} (ID: ${breed.id})\n`;
          info += `   Description length: ${breed.description.length} characters\n`;
          info += `   Preview: "${breed.description.substring(0, 100)}..."\n`;
          
          // Check if description seems complete
          if (breed.description.length < 200) {
            info += `   ⚠️ Description seems short - may be truncated\n`;
          } else {
            info += `   ✅ Description appears complete\n`;
          }
          
          // Check if description ends with "..."
          if (breed.description.includes('...')) {
            info += `   ❌ Description contains "..." - likely truncated\n`;
          }
          info += `\n`;
        } else {
          info += `❌ ${breedName} not found in database\n\n`;
        }
      }
      
      // Show shortest descriptions
      info += `🔍 Shortest descriptions (potential issues):\n\n`;
      
      const sortedByLength = breeds
        .sort((a, b) => a.description.length - b.description.length)
        .slice(0, 5);
      
      sortedByLength.forEach((breed, index) => {
        info += `${index + 1}. ${breed.breed} (ID: ${breed.id})\n`;
        info += `   Length: ${breed.description.length} characters\n`;
        info += `   Description: "${breed.description}"\n\n`;
      });
      
      // Check for descriptions ending with "..."
      const endingWithDots = breeds.filter(breed => breed.description.includes('...'));
      if (endingWithDots.length > 0) {
        info += `❌ Found ${endingWithDots.length} descriptions containing "...":\n`;
        endingWithDots.forEach((breed, index) => {
          info += `${index + 1}. ${breed.breed}\n`;
        });
        info += `\n`;
      } else {
        info += `✅ No descriptions found ending with "..."\n\n`;
      }
      
      setDebugInfo(info);
      
    } catch (error) {
      setDebugInfo(`❌ Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const forceReseed = async () => {
    setIsLoading(true);
    setDebugInfo('🔄 Force reseeding database...\n');
    
    try {
      await databaseManager.forceReseedDatabase();
      setDebugInfo(prev => prev + '✅ Force reseed completed!\n');
      
      // Run debug again to verify
      await runDebug();
      
    } catch (error) {
      setDebugInfo(prev => prev + `❌ Error during reseed: ${error}\n`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔧 Database Debug</Text>
      
      <View style={styles.buttonContainer}>
        <Pressable 
          style={[styles.button, isLoading && styles.buttonDisabled]} 
          onPress={runDebug}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>🔍 Check Descriptions</Text>
        </Pressable>
        
        <Pressable 
          style={[styles.button, styles.reseedButton, isLoading && styles.buttonDisabled]} 
          onPress={forceReseed}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>🔄 Force Reseed</Text>
        </Pressable>
      </View>
      
      {debugInfo ? (
        <ScrollView style={styles.debugContainer}>
          <Text style={styles.debugText}>{debugInfo}</Text>
        </ScrollView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  button: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  reseedButton: {
    backgroundColor: '#FF9500',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  debugContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    maxHeight: 400,
  },
  debugText: {
    fontFamily: 'monospace',
    fontSize: 12,
    lineHeight: 16,
  },
});
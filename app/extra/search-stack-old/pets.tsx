import React from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFlow } from '@/contexts/FlowContext';
import Colors from '@/constants/Colors';

export default function PetsScreen() {
  const router = useRouter();
  const { preferences, updatePreferences } = useFlow();

  const handlePetsSelect = (goodWithPets: boolean | null) => {
    const updatedPreferences = { ...preferences, goodWithPets };
    updatePreferences(updatedPreferences);
    router.push('/(tabs)/flow-stack/grooming');
  };

  const handleBackPress = () => {
    router.back();
  };

  const petsOptions = [
    { value: true, label: 'Yes, must be good with other pets' },
    { value: false, label: 'No, single pet household' },
    { value: null, label: 'Not important to me' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Good with Pets</Text>
        </View>
      </View>
      
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Do you need a dog that's good with other pets?</Text>
          <Text style={styles.subtitle}>This helps us find breeds that get along well with cats, other dogs, or other animals</Text>
          
          <View style={styles.optionsContainer}>
            {petsOptions.map((option) => (
              <Pressable
                key={option.label}
                style={[
                  styles.optionButton,
                  preferences.goodWithPets === option.value && styles.selectedOption
                ]}
                onPress={() => handlePetsSelect(option.value)}
              >
                <Text style={[
                  styles.optionText,
                  preferences.goodWithPets === option.value && styles.selectedOptionText
                ]}>
                  {option.label}
                </Text>
              </Pressable>
            ))}
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
    flexGrow: 1,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.light.textCharcoal,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.textCharcoal,
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.8,
  },
  optionsContainer: {
    gap: 16,
  },
  optionButton: {
    backgroundColor: 'white',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.light.secondarySand,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedOption: {
    backgroundColor: Colors.light.primaryTeal,
    borderColor: Colors.light.primaryTeal,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.textCharcoal,
    textAlign: 'center',
  },
  selectedOptionText: {
    color: 'white',
  },
});

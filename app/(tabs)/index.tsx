import { StyleSheet, ActivityIndicator, Pressable, ScrollView, Alert, Modal } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useDatabaseContext } from '@/contexts/DatabaseContext';
import { useBreeds } from '@/hooks/useDatabase';
import { useBreedMatcher, UserPreferences, getDefaultPreferences } from '@/hooks/useBreedMatcher';

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

interface DropdownProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  options: { label: string; value: string }[];
}

function CustomDropdown({ value, onValueChange, placeholder, options }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedValue: string) => {
    onValueChange(selectedValue);
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === value);

  return (
    <View style={styles.dropdownContainer}>
      <Pressable 
        style={styles.dropdown} 
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.dropdownText}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Text style={styles.dropdownArrow}>{isOpen ? '▲' : '▼'}</Text>
      </Pressable>

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable 
          style={styles.modalOverlay} 
          onPress={() => setIsOpen(false)}
        >
          <View style={styles.dropdownOptions}>
            {options.map((option) => (
              <Pressable
                key={option.value}
                style={[
                  styles.dropdownOption,
                  value === option.value && styles.dropdownOptionSelected
                ]}
                onPress={() => handleSelect(option.value)}
              >
                <Text style={[
                  styles.dropdownOptionText,
                  value === option.value && styles.dropdownOptionTextSelected
                ]}>
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

export default function TabOneScreen() {
  const router = useRouter();
  const { isInitialized, isLoading: dbLoading, error: dbError } = useDatabaseContext();
  const { breeds, isLoading: breedsLoading, error: breedsError, loadAllBreeds } = useBreeds();
  const { isMatching } = useBreedMatcher();
  
  const [preferences, setPreferences] = useState<UserPreferences>(getDefaultPreferences());

  useEffect(() => {
    if (isInitialized) {
      loadAllBreeds();
    }
  }, [isInitialized]);

  const handleFindMatches = async () => {
    if (breeds.length === 0) {
      Alert.alert('Error', 'No breeds loaded. Please try again.');
      return;
    }

    try {
      // Navigate to results page with preferences as URL params
      const params = new URLSearchParams();
      params.append('size', preferences.size);
      params.append('energyLevel', preferences.energyLevel);
      params.append('goodWithKids', preferences.goodWithKids === null ? 'null' : preferences.goodWithKids.toString());
      params.append('goodWithPets', preferences.goodWithPets === null ? 'null' : preferences.goodWithPets.toString());
      params.append('trainability', preferences.trainability);
      params.append('groomingNeeds', preferences.groomingNeeds);
      params.append('role', preferences.role);
      params.append('seniorFriendly', preferences.seniorFriendly === null ? 'null' : preferences.seniorFriendly.toString());
      params.append('specialNeedsOk', preferences.specialNeedsOk === null ? 'null' : preferences.specialNeedsOk.toString());
      params.append('prioritizeAdoptable', preferences.prioritizeAdoptable.toString());
      
      router.push(`/results?${params.toString()}`);
    } catch (error) {
      console.error('Error navigating to results:', error);
      Alert.alert('Error', 'Failed to navigate to results. Please try again.');
    }
  };

  const resetForm = () => {
    setPreferences(getDefaultPreferences());
  };

  if (dbLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.subtitle}>Initializing database...</Text>
      </View>
    );
  }

  if (dbError) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Database Error</Text>
        <Text style={styles.error}>{dbError}</Text>
      </View>
    );
  }



  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
      <Text style={styles.title}>🐶 Find Your Perfect Dog</Text>
      <Text style={styles.subtitle}>Answer a few questions to find your ideal companion</Text>

      {breedsLoading ? (
        <ActivityIndicator size="large" />
      ) : breedsError ? (
        <Text style={styles.error}>Error loading breeds: {breedsError}</Text>
      ) : (
        <View style={styles.formContainer}>
          {/* Size Preference */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionTitle}>What size dog do you prefer?</Text>
            <CustomDropdown
              value={preferences.size}
              onValueChange={(size) => setPreferences(prev => ({ ...prev, size }))}
              placeholder="Select size..."
              options={[
                { label: "Toy", value: "Toy" },
                { label: "Small", value: "Small" },
                { label: "Medium", value: "Medium" },
                { label: "Large", value: "Large" },
                { label: "Any", value: "Any" }
              ]}
            />
          </View>

          {/* Energy Level */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionTitle}>What energy level suits your lifestyle?</Text>
            <CustomDropdown
              value={preferences.energyLevel}
              onValueChange={(energyLevel) => setPreferences(prev => ({ ...prev, energyLevel }))}
              placeholder="Select energy level..."
              options={[
                { label: "Low", value: "Low" },
                { label: "Moderate", value: "Moderate" },
                { label: "High", value: "High" },
                { label: "Any", value: "Any" }
              ]}
            />
          </View>

          {/* Good with Kids */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionTitle}>Do you have children at home?</Text>
            <CustomDropdown
              value={preferences.goodWithKids === null ? 'null' : preferences.goodWithKids ? 'true' : 'false'}
              onValueChange={(value) => {
                const goodWithKids = value === 'null' ? null : value === 'true';
                setPreferences(prev => ({ ...prev, goodWithKids }));
              }}
              placeholder="Select preference..."
              options={[
                { label: "Yes, must be good with kids", value: "true" },
                { label: "No kids, doesn't matter", value: "false" },
                { label: "Don't care", value: "null" }
              ]}
            />
          </View>

          {/* Good with Pets */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionTitle}>Do you have other pets?</Text>
            <CustomDropdown
              value={preferences.goodWithPets === null ? 'null' : preferences.goodWithPets ? 'true' : 'false'}
              onValueChange={(value) => {
                const goodWithPets = value === 'null' ? null : value === 'true';
                setPreferences(prev => ({ ...prev, goodWithPets }));
              }}
              placeholder="Select preference..."
              options={[
                { label: "Yes, must get along with pets", value: "true" },
                { label: "No other pets", value: "false" },
                { label: "Don't care", value: "null" }
              ]}
            />
          </View>

          {/* Trainability */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionTitle}>How important is trainability?</Text>
            <CustomDropdown
              value={preferences.trainability}
              onValueChange={(trainability) => setPreferences(prev => ({ ...prev, trainability }))}
              placeholder="Select trainability..."
              options={[
                { label: "High", value: "High" },
                { label: "Medium", value: "Medium" },
                { label: "Low", value: "Low" },
                { label: "Any", value: "Any" }
              ]}
            />
          </View>

          {/* Grooming */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionTitle}>How much grooming are you willing to do?</Text>
            <CustomDropdown
              value={preferences.groomingNeeds}
              onValueChange={(groomingNeeds) => setPreferences(prev => ({ ...prev, groomingNeeds }))}
              placeholder="Select grooming level..."
              options={[
                { label: "Low", value: "Low" },
                { label: "Medium", value: "Medium" },
                { label: "High", value: "High" },
                { label: "Any", value: "Any" }
              ]}
            />
          </View>

          {/* Role */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionTitle}>What role do you want your dog to play?</Text>
            <CustomDropdown
              value={preferences.role}
              onValueChange={(role) => setPreferences(prev => ({ ...prev, role }))}
              placeholder="Select role..."
              options={[
                { label: "Companion", value: "Companion" },
                { label: "Guardian", value: "Guardian" },
                { label: "Both", value: "Both" },
                { label: "Any", value: "Any" }
              ]}
            />
          </View>

          {/* Prioritize Adoptable Breeds */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionTitle}>Prioritize breeds commonly found in shelters?</Text>
            <Text style={styles.questionSubtitle}>
              This will show breeds that are easier to find for adoption at the top of your results
            </Text>
            <View style={styles.toggleContainer}>
              <Pressable
                style={[
                  styles.toggleOption,
                  preferences.prioritizeAdoptable && styles.toggleOptionSelected
                ]}
                onPress={() => setPreferences(prev => ({ 
                  ...prev, 
                  prioritizeAdoptable: !prev.prioritizeAdoptable 
                }))}
              >
                <Text style={[
                  styles.toggleText,
                  preferences.prioritizeAdoptable && styles.toggleTextSelected
                ]}>
                  {preferences.prioritizeAdoptable ? '✅ Yes, prioritize adoptable' : '❌ No, show all breeds equally'}
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Pressable 
              style={[styles.findButton, isMatching && styles.disabledButton]} 
              onPress={handleFindMatches}
              disabled={isMatching}
            >
              {isMatching ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.findButtonText}>🎯 Find My Furvana</Text>
              )}
            </Pressable>

            <Pressable style={styles.resetButton} onPress={resetForm}>
              <Text style={styles.resetButtonText}>Reset Form</Text>
            </Pressable>
          </View>
        </View>
      )}


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
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  questionContainer: {
    marginBottom: 25,
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: Colors.light.textCharcoal,
  },
  dropdownContainer: {
    position: 'relative',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.secondarySand,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownText: {
    fontSize: 16,
    color: Colors.light.textCharcoal,
    flex: 1,
  },
  dropdownArrow: {
    fontSize: 12,
    color: Colors.light.textCharcoal,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownOptions: {
    backgroundColor: 'white',
    borderRadius: 12,
    maxHeight: 300,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  dropdownOption: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.secondarySand,
  },
  dropdownOptionSelected: {
    backgroundColor: Colors.light.primaryTeal,
  },
  dropdownOptionText: {
    fontSize: 16,
    color: Colors.light.textCharcoal,
  },
  dropdownOptionTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 30,
    gap: 15,
  },
  findButton: {
    backgroundColor: Colors.light.actionOrange,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 200,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#A0A0A0',
  },
  findButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.light.secondarySand,
  },
  resetButtonText: {
    color: Colors.light.textCharcoal,
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: Colors.light.heartRed,
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
  },
  questionSubtitle: {
    fontSize: 14,
    color: Colors.light.textCharcoal,
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 20,
  },
  toggleContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  toggleOption: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: Colors.light.secondarySand,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.light.primaryTeal,
    minWidth: 250,
    alignItems: 'center',
  },
  toggleOptionSelected: {
    backgroundColor: Colors.light.primaryTeal,
    borderColor: Colors.light.primaryTeal,
  },
  toggleText: {
    fontSize: 16,
    color: Colors.light.textCharcoal,
    fontWeight: '500',
    textAlign: 'center',
  },
  toggleTextSelected: {
    color: 'white',
    fontWeight: '600',
  },

}); 
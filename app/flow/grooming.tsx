import React from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFlow } from '@/contexts/FlowContext';
import Colors from '@/constants/Colors';

export default function GroomingScreen() {
  const router = useRouter();
  const { preferences, updatePreferences } = useFlow();

  const handleGroomingSelect = (groomingNeeds: string) => {
    const updatedPreferences = { ...preferences, groomingNeeds };
    updatePreferences(updatedPreferences);
    router.push('/flow/results');
  };

  const handleBackPress = () => {
    router.back();
  };

  const groomingOptions = ['Low', 'Medium', 'High', 'Any'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Grooming Needs</Text>
        </View>
      </View>
      
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>How much grooming are you comfortable with?</Text>
          <Text style={styles.subtitle}>Consider your time and budget for regular brushing, bathing, and professional grooming</Text>
          
          <View style={styles.optionsContainer}>
            {groomingOptions.map((grooming) => (
              <Pressable
                key={grooming}
                style={[
                  styles.optionButton,
                  preferences.groomingNeeds === grooming && styles.selectedOption
                ]}
                onPress={() => handleGroomingSelect(grooming)}
              >
                <Text style={[
                  styles.optionText,
                  preferences.groomingNeeds === grooming && styles.selectedOptionText
                ]}>
                  {grooming}
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
    fontSize: 18,
    fontWeight: '500',
    color: Colors.light.textCharcoal,
    textAlign: 'center',
  },
  selectedOptionText: {
    color: 'white',
  },
});

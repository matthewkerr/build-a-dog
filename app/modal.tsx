import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 How Our Search Works</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Smart Matching</Text>
        <Text style={styles.sectionText}>
          Our algorithm considers your lifestyle, living situation, and preferences to find breeds that will be the best fit for you and your family.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 How We Score</Text>
        <Text style={styles.sectionText}>
          Each breed gets a score based on how well it matches your criteria. We consider size, energy level, temperament, and care requirements.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Using "Any" Options</Text>
        <Text style={styles.sectionText}>
          Selecting "Any" or "Don't care" for a preference means we won't penalize breeds for that characteristic. This gives you more options to consider.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>❤️ Save Favorites</Text>
        <Text style={styles.sectionText}>
          When you see your results, tap the heart icon to save breeds you're interested in. You can view all your favorites in the Favorites tab.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏠 Adoption Focus</Text>
        <Text style={styles.sectionText}>
          We encourage adoption from shelters and rescue organizations. Many wonderful dogs of all breeds are waiting for their forever homes.
        </Text>
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.backgroundIvory,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: Colors.light.textCharcoal,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: Colors.light.secondarySand,
  },
  section: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.light.primaryTeal,
    width: '100%',
    maxWidth: 400,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.light.textCharcoal,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 22,
    color: Colors.light.textCharcoal,
  },
});

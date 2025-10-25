import React, { useRef } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';

export default function SeniorScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);

  const handleBackPress = () => {
    router.replace('/');
  };

  useFocusEffect(
    React.useCallback(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Adopt a Senior Dog</Text>
        </View>
      </View>
      
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>The Gentle Wisdom of Senior Dogs</Text>
          
          {/* Senior Dog Section */}
          <View style={styles.section}>
            <Text style={styles.sectionText}>
              Senior dogs are soulful, serene, and incredibly loving.
            </Text>
            <Text style={styles.sectionText}>
              Too often overlooked, older dogs make amazing companions — especially for people who value calm, connection, and quiet loyalty. Giving one a second chance is one of the most compassionate choices you can make.
            </Text>
            <Text style={styles.sectionText}>
              Here's why you should consider adopting a senior dog:
            </Text>
            
            <Text style={styles.subsectionTitle}>Low-Key Companions</Text>
            <Text style={styles.sectionText}>
              Senior dogs are past the high-energy puppy phase. They're usually content to nap beside you, go on gentle walks, and quietly share your life.
            </Text>

            <Text style={styles.subsectionTitle}>Deep Gratitude</Text>
            <Text style={styles.sectionText}>
              There's something special about the way senior dogs bond. Many adopters say they can feel their dog's appreciation — a deep, quiet love that builds trust fast.
            </Text>

            <Text style={styles.subsectionTitle}>Known Personality</Text>
            <Text style={styles.sectionText}>
              Shelters often know a senior dog's temperament well. That means fewer surprises, more predictability, and a better chance at a great match.
            </Text>

            <Text style={styles.subsectionTitle}>Clear Health History</Text>
            <Text style={styles.sectionText}>
              With seniors, what you see is what you get. Shelters and rescues usually have complete medical information — no mystery, just clarity and support.
            </Text>

            <Text style={styles.subsectionTitle}>Perfect for a Calmer Life</Text>
            <Text style={styles.sectionText}>
              Senior dogs are ideal for older adults, people with quieter homes, or anyone who wants a steady, affectionate companion without the chaos of training a pup.
            </Text>

            <Text style={styles.sectionText}>
              Adopting a senior dog changes lives.
            </Text>
            <Text style={styles.sectionText}>
              They may have fewer years ahead, but they'll fill them — and your heart — with love, loyalty, and gratitude that never fades.
            </Text>
          </View>

          {/* Call to Action */}
          <Pressable style={styles.searchButton} onPress={() => router.push('/(tabs)/search-stack/size')}>
            <FontAwesome name="paw" size={20} color="white" style={styles.searchIcon} />
            <Text style={styles.searchButtonText}>Find My Perfect Senior Match</Text>
          </Pressable>
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
    flexGrow: 1,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: Colors.light.textCharcoal,
    padding: 20,
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
  section: {
    marginBottom: 30,
    padding: 20,
    paddingBottom: 20,
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
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    color: Colors.light.textCharcoal,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 8,
    color: Colors.light.actionOrange,
    lineHeight: 24,
  },
  searchButton: {
    backgroundColor: Colors.light.primaryTeal,
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#4CB5AB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: Colors.light.secondarySand,
    marginTop: 20,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});

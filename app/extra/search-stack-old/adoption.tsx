import React from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';

export default function AdoptionScreen() {
  const router = useRouter();

  const handleBackPress = () => {
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Adoption Information</Text>
        </View>
      </View>
      
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Finding Your Perfect Match</Text>
          <Text style={styles.subtitle}>Everything you need to know about adopting a dog</Text>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🏠 Why Adopt?</Text>
            <Text style={styles.sectionText}>
              Adopting a dog saves lives and gives you a loyal companion. Most dogs in shelters are there through no fault of their own - they're often victims of circumstances like moving, divorce, or financial hardship.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🔍 Finding the Right Dog</Text>
            <Text style={styles.sectionText}>
              Use our breed matching tool to find dogs with traits that match your lifestyle. Remember, mixed breeds often have the best of both worlds and are just as loving as purebreds.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📋 Adoption Process</Text>
            <Text style={styles.sectionText}>
              Most shelters require an application, home visit, and adoption fee. The process ensures dogs go to loving, responsible homes. Be patient - finding the right match is worth the wait.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>💝 What to Expect</Text>
            <Text style={styles.sectionText}>
              Your new dog may need time to adjust to their new home. Be patient and provide lots of love, structure, and positive reinforcement. Most dogs settle in within a few weeks.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🏥 Health & Care</Text>
            <Text style={styles.sectionText}>
              Most shelter dogs are spayed/neutered, vaccinated, and microchipped. Schedule a vet visit within the first week to establish care and discuss any health concerns.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>💡 Tips for Success</Text>
            <Text style={styles.sectionText}>
              • Start with basic training immediately{'\n'}
              • Establish a routine for feeding and walks{'\n'}
              • Socialize your dog gradually{'\n'}
              • Be consistent with rules and boundaries{'\n'}
              • Give your dog time to decompress
            </Text>
          </View>

          <Pressable style={styles.searchButton} onPress={() => router.push('/(tabs)/flow-stack/size')}>
            <FontAwesome name="paw" size={20} color="white" style={styles.searchIcon} />
            <Text style={styles.searchButtonText}>Find My Perfect Match</Text>
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
    marginBottom: 30,
    opacity: 0.8,
  },
  section: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.light.secondarySand,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.textCharcoal,
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    color: Colors.light.textCharcoal,
    lineHeight: 24,
    opacity: 0.9,
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

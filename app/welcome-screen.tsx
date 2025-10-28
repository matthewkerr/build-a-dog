import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';

interface WelcomeScreenProps {
  onDismiss: () => void;
  onNavigateToSearch?: () => void;
}

export default function WelcomeScreen({ onDismiss, onNavigateToSearch }: WelcomeScreenProps) {

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* <Image
          source={require('../assets/images/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        /> */}
        
        <Text style={styles.title}>Welcome to Furvana!</Text>
        
        <Text style={styles.subtitle}>
          Your perfect dog companion is waiting
        </Text>

        <View style={styles.featureCard}>
          <View style={styles.featureHeader}>
            <FontAwesome name="heart" size={28} color={Colors.light.primaryTeal} />
            <Text style={styles.featureTitle}>Personalized Matching</Text>
          </View>
          <Text style={styles.featureDescription}>
            Answer a few questions about your lifestyle, living situation, and preferences. We'll find breeds that are the perfect fit for you.
          </Text>
        </View>

        <View style={styles.featureCard}>
          <View style={styles.featureHeader}>
            <FontAwesome name="paw" size={28} color={Colors.light.primaryTeal} />
            <Text style={styles.featureTitle}>Smart Algorithm</Text>
          </View>
          <Text style={styles.featureDescription}>
            Our intelligent matching system considers size, energy level, temperament, grooming needs, and more to recommend the best breeds for you.
          </Text>
        </View>

        <View style={styles.featureCard}>
          <View style={styles.featureHeader}>
            <FontAwesome name="home" size={28} color={Colors.light.primaryTeal} />
            <Text style={styles.featureTitle}>Adopt First</Text>
          </View>
          <Text style={styles.featureDescription}>
            We prioritize shelter dogs and help you find adoptable breeds, because every dog deserves a loving home.
          </Text>
        </View>

        <Pressable
          style={styles.ctaButton}
          onPress={() => {
            // Dismiss welcome screen first
            onDismiss();
            // Then trigger navigation
            if (onNavigateToSearch) {
              onNavigateToSearch();
            }
          }}
          android_ripple={{ color: Colors.light.secondarySand }}
        >
          <Text style={styles.ctaButtonText}>Find Your Furvana</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.backgroundIvory,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    alignItems: 'center',
    paddingTop: 100,
    paddingBottom: 40,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 24,
    borderRadius: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.light.textCharcoal,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.light.textCharcoal,
    textAlign: 'center',
    marginBottom: 32,
    opacity: 0.8,
  },
  featureCard: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: Colors.light.secondarySand,
    alignItems: 'center',
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.textCharcoal,
    marginLeft: 12,
  },
  featureDescription: {
    fontSize: 15,
    color: Colors.light.textCharcoal,
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.8,
  },
  ctaButton: {
    width: '100%',
    backgroundColor: Colors.light.primaryTeal,
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: Colors.light.primaryTeal,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: Colors.light.secondarySand,
  },
  ctaButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});


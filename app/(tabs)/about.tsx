import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import Colors from '@/constants/Colors';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>🐾 About This App</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionText}>
          This app was made for one simple reason:{'\n'}
          To help more dogs get adopted — and to make that process easier, kinder, and more thoughtful for the humans, too.
        </Text>
        <Text style={styles.sectionText}>
          We believe every dog deserves a second chance.{'\n'}
          Not just the puppies. Not just the trendy breeds.{'\n'}
          All of them — seniors, mutts, the shy ones, the gentle ones, the overlooked ones.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 What This App Does</Text>
        <Text style={styles.sectionText}>
          • Helps you discover dog breeds that match your lifestyle, not just your wishlist.{'\n\n'}
          • Encourages you to consider adoption with open eyes and a full heart.{'\n\n'}
          • Keeps things private, respectful, and low-pressure — no accounts, no tracking.{'\n\n'}
          • Offers real insight and encouragement, not marketing fluff.{'\n\n'}
          • It's a tool built with compassion, not commerce.
        </Text>
      </View>

     

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🐶 Why It Matters</Text>
        <Text style={styles.sectionText}>
          Every adoption changes two lives:{'\n'}
          One human. One dog.
        </Text>
        <Text style={styles.sectionText}>
          If this app helps even one of those matches happen — it's worth it.
        </Text>
        <Text style={styles.sectionText}>
          Thanks for using it. Thanks for caring. And thank you, truly, for considering adoption.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👋 Who Made This</Text>
        <Text style={styles.sectionText}>
          This app was created by Judy Albrecht and Matthew Kerr.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.backgroundIvory,
    padding: 20,
  },
  title: {
    marginBottom: 30,
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
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.light.textCharcoal,
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: Colors.light.textCharcoal,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.textCharcoal,
  },
}); 
import React from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';

export default function TipsScreen() {
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
          <Text style={styles.headerTitle}>Furvana Tips</Text>
        </View>
      </View>
      
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>🧠 Adoption Tips: Getting Ready to Welcome a Dog</Text>
          
          {/* Section 1 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📝 1. Are You Ready to Adopt?</Text>
            <Text style={styles.sectionText}>
              Adopting a dog is a beautiful decision — and a big responsibility.
            </Text>
            <Text style={styles.sectionText}>
              Ask yourself:
            </Text>
            <Text style={styles.bulletPoint}>• Do I have time each day for walks, play, and care?</Text>
            <Text style={styles.bulletPoint}>• Is my home safe and pet-friendly?</Text>
            <Text style={styles.bulletPoint}>• Can I afford food, vet care, and supplies?</Text>
            <Text style={styles.bulletPoint}>• Am I ready for both joyful moments and tough days?</Text>
            <Text style={styles.sectionText}>
              If you're saying yes, you're already on a wonderful path.
            </Text>
          </View>

          {/* Section 2 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🛠 2. Prepare Your Home</Text>
            <Text style={styles.sectionText}>
              Before your dog arrives, set up a space where they can feel safe and relaxed.
            </Text>
            <Text style={styles.sectionText}>
              Essentials to have:
            </Text>
            <Text style={styles.bulletPoint}>🛏 A soft bed or blanket</Text>
            <Text style={styles.bulletPoint}>🍲 Food & water bowls</Text>
            <Text style={styles.bulletPoint}>🧸 A few toys or chew items</Text>
            <Text style={styles.bulletPoint}>🐾 Collar, leash, and ID tag</Text>
            <Text style={styles.bulletPoint}>🚪 Baby gate or crate (optional for training)</Text>
            <Text style={styles.sectionText}>
              Clear away anything unsafe — wires, trash bins, small objects — just like you would for a toddler.
            </Text>
          </View>

          {/* Section 3 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🕰 3. Be Patient in the First Week</Text>
            <Text style={styles.sectionText}>
              Change is hard for everyone — your new dog included. They may feel scared, excited, or confused at first.
            </Text>
            <Text style={styles.sectionText}>
              Give them space to adjust. Keep routines simple and predictable. Let them come to you when they're ready. This "decompression period" is normal and temporary.
            </Text>
          </View>

          {/* Section 4 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>💚 4. Build Trust & Routine</Text>
            <Text style={styles.sectionText}>
              Dogs thrive on consistency. Feed them at the same times. Take walks at the same times. This helps them feel secure and understand your expectations.
            </Text>
            <Text style={styles.sectionText}>
              Use positive reinforcement — treats, praise, play — when they do something right. Avoid scolding or punishment, especially early on.
            </Text>
          </View>

          {/* Section 5 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🏥 5. Schedule a Vet Visit</Text>
            <Text style={styles.sectionText}>
              Within the first week, visit your vet. Most shelters provide basic medical care, but a new vet can:
            </Text>
            <Text style={styles.bulletPoint}>• Perform a full health check</Text>
            <Text style={styles.bulletPoint}>• Discuss vaccination schedule</Text>
            <Text style={styles.bulletPoint}>• Recommend preventive care</Text>
            <Text style={styles.bulletPoint}>• Address any concerns you have</Text>
          </View>

          {/* Section 6 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎓 6. Start Training Early</Text>
            <Text style={styles.sectionText}>
              Basic commands like "sit," "stay," and "come" build communication and confidence. Keep sessions short (5-10 minutes) and fun.
            </Text>
            <Text style={styles.sectionText}>
              Consider enrolling in a positive reinforcement training class — it's great for bonding and learning together.
            </Text>
          </View>

          {/* Section 7 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🤝 7. Socialize Gradually</Text>
            <Text style={styles.sectionText}>
              Introduce your dog to new people, places, and experiences slowly. Watch for signs of stress (hiding, panting, ears back) and go at their pace.
            </Text>
            <Text style={styles.sectionText}>
              Positive introductions build confidence. Negative ones can create lasting fears.
            </Text>
          </View>

          {/* Section 8 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>❤️ 8. Celebrate Small Wins</Text>
            <Text style={styles.sectionText}>
              Every dog adjusts at their own pace. Celebrate the moments — the first wagging tail, the first relaxed nap, the first moment they look at you with complete trust.
            </Text>
            <Text style={styles.sectionText}>
              There will be challenges, but there will also be joy, laughter, and unconditional love. You're creating a forever family.
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
    marginBottom: 24,
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
    marginBottom: 8,
    opacity: 0.9,
  },
  bulletPoint: {
    fontSize: 16,
    color: Colors.light.textCharcoal,
    lineHeight: 24,
    marginBottom: 4,
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

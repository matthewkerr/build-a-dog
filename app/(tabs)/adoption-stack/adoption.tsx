import React, { useRef } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';

export default function AdoptionScreen() {
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
          <Text style={styles.headerTitle}>Why Adopt</Text>
        </View>
      </View>
      
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Why Adopt?</Text>
          
          {/* Section 1 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>A Life Saved Is a Life Changed</Text>
            <Text style={styles.sectionText}>
              Every adoption is a second chance.
            </Text>
            <Text style={styles.sectionText}>
              When you adopt a dog from a shelter or rescue group, you're not just gaining a companion — you're saving a life. Thousands of healthy, loving dogs wait in shelters every day, hoping for a home. By adopting, you offer safety, love, and comfort to a soul who needs it most.
            </Text>
          </View>

          {/* Section 2 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dogs Already Waiting for Love</Text>
            <Text style={styles.sectionText}>
              Shelters and rescue groups have:
            </Text>
            <Text style={styles.bulletPoint}>• Puppies and seniors</Text>
            <Text style={styles.bulletPoint}>• Small, medium, and large dogs</Text>
            <Text style={styles.bulletPoint}>• Purebreds and amazing mixed-breeds</Text>
            <Text style={styles.bulletPoint}>• Dogs already house-trained and vaccinated</Text>
            <Text style={styles.sectionText}>
              Your perfect match might already be just a few miles away.
            </Text>
          </View>

          {/* Section 3 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Compassion Over Commerce</Text>
            <Text style={styles.sectionText}>
              Adoption isn't a transaction — it's a rescue.
            </Text>
            <Text style={styles.sectionText}>
              Unlike breeders or pet stores, rescue groups prioritize well-being over profit. When you adopt, you stand against harmful overbreeding and puppy mills — and stand with compassion.
            </Text>
          </View>

          {/* Section 4 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Healthier Hearts, Stronger Bonds</Text>
            <Text style={styles.sectionText}>
              Many adopted dogs have lived in foster homes or shelters and are:
            </Text>
            <Text style={styles.bulletPoint}>• Socialized</Text>
            <Text style={styles.bulletPoint}>• Temperament-tested</Text>
            <Text style={styles.bulletPoint}>• Ready for a smoother transition</Text>
            <Text style={styles.sectionText}>
              Adopters often describe a unique bond: a sense that their dog knows it's been rescued — and never forgets.
            </Text>
          </View>

          {/* Section 5 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Special Souls Need Love Too</Text>
            <Text style={styles.sectionText}>
              Older dogs and those with special needs are often the most overlooked — but they're also the most grateful.
            </Text>
            <Text style={styles.sectionText}>
              They bring:
            </Text>
            <Text style={styles.bulletPoint}>• Calm companionship</Text>
            <Text style={styles.bulletPoint}>• Gentle love</Text>
            <Text style={styles.bulletPoint}>• Incredible loyalty</Text>
            <Text style={styles.sectionText}>
              Giving them a home can be a healing, powerful experience for both of you.
            </Text>
          </View>

          {/* Section 6 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>The Gentle Wisdom of Senior Dogs</Text>
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

          {/* Section 7 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What Comes With Adoption?</Text>
            <Text style={styles.sectionText}>
              Most adoptions include:
            </Text>
            <Text style={styles.bulletPoint}>• Vaccinations</Text>
            <Text style={styles.bulletPoint}>• Spay/neuter</Text>
            <Text style={styles.bulletPoint}>• Microchipping</Text>
            <Text style={styles.bulletPoint}>• Behavior and health history</Text>
            <Text style={styles.sectionText}>
              Some rescue groups even provide post-adoption support to help you both thrive together.
            </Text>
          </View>

          {/* Section 8 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Not Ready? You Can Still Help.</Text>
            <Text style={styles.sectionText}>
              Every act of kindness counts:
            </Text>
            <Text style={styles.bulletPoint}>• Foster a dog short-term</Text>
            <Text style={styles.bulletPoint}>• Share adoption profiles</Text>
            <Text style={styles.bulletPoint}>• Donate to your local rescue</Text>
            <Text style={styles.bulletPoint}>• Volunteer your time or skills</Text>
            <Text style={styles.sectionText}>
              Even if you're not ready today — you can still be part of the rescue journey.
            </Text>
          </View>

          {/* Adoption Platforms Card */}
          <View style={styles.platformsCard}>
            <Text style={styles.platformsTitle}>Explore Trusted Adoption Platforms</Text>
            <Text style={styles.platformsText}>
              If you're ready to meet your future companion, these national organizations can help you browse adoptable dogs from rescues and shelters across the country.
            </Text>
            <Text style={styles.platformsText}>
              These platforms do not sell dogs — they connect you with animals in need of homes, often through licensed shelters, nonprofit rescues, or foster networks.
            </Text>
            <Text style={styles.platformsText}>
              Remember: Always research the rescue organization behind each listing to ensure transparency, care, and legitimacy. Adoption is about trust on both sides.
            </Text>

            <Text style={styles.platformsSubtitle}>Top National Dog Adoption Websites</Text>
            
            <Text style={styles.websiteTitle}>1. Petfinder</Text>
            <Text style={styles.websiteDescription}>
              One of the largest directories for adoptable pets in the U.S. Filter by breed, age, size, and more.
            </Text>
            <Text style={styles.websiteDescription}>
              Features listings from shelters and rescue groups across North America.
            </Text>

            <Text style={styles.websiteTitle}>2. Adopt-a-Pet</Text>
            <Text style={styles.websiteDescription}>
              A user-friendly site with detailed pet profiles and photos. Many dogs are listed from foster-based rescues.
            </Text>
            <Text style={styles.websiteDescription}>
              Offers an "I Want a Dog" guided tool.
            </Text>

            <Text style={styles.websiteTitle}>3. Rescue Me!</Text>
            <Text style={styles.websiteDescription}>
              Organized by breed and state, this platform connects adopters with dogs urgently seeking homes.
            </Text>
            <Text style={styles.websiteDescription}>
              Also features special-needs and senior pets.
            </Text>

            <Text style={styles.websiteTitle}>4. Best Friends Animal Society</Text>
            <Text style={styles.websiteDescription}>
              National leader in no-kill advocacy with adoptable pets listed from their own network of shelters and partners.
            </Text>
            <Text style={styles.websiteDescription}>
              Focused on saving high-risk shelter animals.
            </Text>

            <Text style={styles.websiteTitle}>5. Shelter Pet Project</Text>
            <Text style={styles.websiteDescription}>
              Previously a collaborative campaign by Humane Society, Maddie's Fund, and Ad Council.
            </Text>
            <Text style={styles.websiteDescription}>
              Redirects to local shelters or Petfinder profiles.
            </Text>

            <Text style={styles.websiteTitle}>6. Hearts United for Animals</Text>
            <Text style={styles.websiteDescription}>
              Focuses on rescue, sanctuary, and adoption for dogs in need — especially puppy mill survivors and special-needs dogs.
            </Text>

            <Text style={styles.platformsSubtitle}>Bonus: Breed-Specific Rescues</Text>
            <Text style={styles.platformsText}>
              For people seeking a particular breed, many nonprofit rescues focus on just one (e.g., Labrador Rescuers, Beagle Freedom Project, Greyhound Adoption groups).
            </Text>
            <Text style={styles.platformsText}>
              Look for breed-specific rescue groups in your region — they often know the dogs deeply and provide personalized matches.
            </Text>
          </View>

          <Pressable style={styles.searchButton} onPress={() => router.push('/(tabs)/search-stack/size')}>
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: Colors.light.primaryTeal,
    lineHeight: 28,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 8,
    color: Colors.light.actionOrange,
    lineHeight: 24,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    color: Colors.light.textCharcoal,
  },
  bulletPoint: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 6,
    marginLeft: 10,
    color: Colors.light.textCharcoal,
  },
  platformsCard: {
    marginTop: 20,
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
  platformsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: Colors.light.primaryTeal,
    lineHeight: 28,
  },
  platformsText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    color: Colors.light.textCharcoal,
  },
  platformsSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 12,
    color: Colors.light.actionOrange,
    lineHeight: 24,
  },
  websiteTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 6,
    color: Colors.light.textCharcoal,
    lineHeight: 22,
  },
  websiteDescription: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 8,
    marginLeft: 10,
    color: Colors.light.textCharcoal,
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

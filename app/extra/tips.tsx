import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';

export default function TipsScreen() {
  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
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
          Your new dog may feel unsure at first. That's normal.
        </Text>
        <Text style={styles.sectionText}>
          In the first few days:
        </Text>
        <Text style={styles.bulletPoint}>• Keep things calm and quiet</Text>
        <Text style={styles.bulletPoint}>• Let them explore on their terms</Text>
        <Text style={styles.bulletPoint}>• Keep a simple routine (walks, meals, rest)</Text>
        <Text style={styles.bulletPoint}>• Give them space to adjust without pressure</Text>
        <Text style={styles.sectionText}>
          Trust builds slowly. Love grows quietly.
        </Text>
      </View>

      {/* Section 4 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🧘‍♂️ 4. Training Takes Time — And Kindness</Text>
        <Text style={styles.sectionText}>
          Many shelter dogs are already trained. Others may need reminders or gentle help adjusting.
        </Text>
        <Text style={styles.sectionText}>
          Tips:
        </Text>
        <Text style={styles.bulletPoint}>• Stick to short, calm sessions</Text>
        <Text style={styles.bulletPoint}>• Use treats, praise, and positive reinforcement</Text>
        <Text style={styles.bulletPoint}>• Avoid punishment — confusion is not defiance</Text>
        <Text style={styles.bulletPoint}>• Be consistent, but flexible</Text>
        <Text style={styles.sectionText}>
          A little patience now saves frustration later.
        </Text>
      </View>

      {/* Section 5 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🫶 5. The Emotional Side of Adoption</Text>
        <Text style={styles.sectionText}>
          Adopting a dog can bring out big feelings — joy, stress, pride, even doubt.
        </Text>
        <Text style={styles.sectionText}>
          You may wonder:
        </Text>
        <Text style={styles.bulletPoint}>• "Are they bonding with me?"</Text>
        <Text style={styles.bulletPoint}>• "Am I doing this right?"</Text>
        <Text style={styles.bulletPoint}>• "Why are they still nervous?"</Text>
        <Text style={styles.sectionText}>
          Take a breath. You're doing more than enough.
        </Text>
        <Text style={styles.sectionText}>
          Dogs often need time to unlearn fear and rebuild trust.
        </Text>
        <Text style={styles.sectionText}>
          You don't have to be perfect — just present.
        </Text>
      </View>

      {/* Section 6 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👣 6. Go Slow, Go Steady</Text>
        <Text style={styles.sectionText}>
          Don't rush socialization, visitors, or adventures. Let your dog learn their new world at their own pace.
        </Text>
        <Text style={styles.sectionText}>
          Try:
        </Text>
        <Text style={styles.bulletPoint}>• One new thing a day (a sound, a room, a short walk)</Text>
        <Text style={styles.bulletPoint}>• Letting them sniff and observe without forcing engagement</Text>
        <Text style={styles.bulletPoint}>• Giving them choices — it builds confidence</Text>
        <Text style={styles.sectionText}>
          Small wins are powerful.
        </Text>
      </View>

      {/* Section 7 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🐕‍🦺 7. Know the Lifelong Commitment</Text>
        <Text style={styles.sectionText}>
          Adoption is a promise — one that says:
        </Text>
        <Text style={styles.quoteText}>
          "No matter what happens, you're part of my family."
        </Text>
        <Text style={styles.sectionText}>
          Be ready for:
        </Text>
        <Text style={styles.bulletPoint}>• Health ups and downs</Text>
        <Text style={styles.bulletPoint}>• Aging gracefully</Text>
        <Text style={styles.bulletPoint}>• Moments of deep connection you'll never forget</Text>
      </View>

      {/* Remember Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌟 Remember</Text>
        <Text style={styles.sectionText}>
          You don't need to be a dog expert. You just need to show up, be kind, and keep learning.
        </Text>
        <Text style={styles.sectionText}>
          You've already done something powerful — you chose to give love to a dog who needed it.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: Colors.light.backgroundIvory,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: Colors.light.textCharcoal,
    lineHeight: 36,
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
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    color: Colors.light.textCharcoal,
  },
  bulletPoint: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
    marginLeft: 10,
    color: Colors.light.textCharcoal,
  },
  quoteText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 10,
    color: Colors.light.actionOrange,
    fontStyle: 'italic',
    fontWeight: '500',
  },
}); 
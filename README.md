# 🐶 DogMatch App – MVP Overview

**DogMatch** is a privacy-first, fully offline mobile app designed to help users find adoptable dog breeds that best suit their lifestyle and preferences, while gently encouraging the adoption of senior and special-needs dogs.

---

## 📱 Navigation Tabs

1. **Search & Results**
   - Unified screen with filters and instant result display
   - Favorite icon next to each result
   - Gentle "Compassion Prompt" encouraging adoption of senior/special-needs dogs

2. **Favorites**
   - View list of saved breeds from Search tab
   - Stored locally using SQLite

3. **Rescue Education**
   - Static content about shelters, rescue groups, and overlooked dogs
   - Describes how adoption works and why it matters
   - No outbound links (app is fully offline and local)

---

## 🔍 Breed Matching Filters

Users can filter dogs by:
- Size (Under 15 lb, Small, Medium, Large)
- Energy Level (Low, Moderate, High)
- Good with Kids (Yes / No / No Preference)
- Good with Other Pets (Yes / No / No Preference)
- Trainability (Low, Medium, High)
- Grooming Needs (Low, Medium, High)
- Role (Companion / Guardian)
- Willingness to consider:
  - Senior Dogs
  - Special Needs Dogs

---

## 💾 Data

- **Runtime Data:** 180-dog-breed dataset stored in SQLite
- **Favorites Table:** Stores breed IDs user has saved
- **All logic is local**; no API, no tracking, fully private

---

## 💡 High-Value Additions

- Clear explanation for each match under result cards
- Breed Details modal with:
  - Traits
  - Image
  - Textual summary
  - Visual tags (e.g., ✅ Senior Friendly)
- Education content about adoption
- No links, ads, or analytics

---

## 🛠️ Tech Stack

- **Expo SDK 53** (React Native)
- **SQLite** for all data (via expo-sqlite)
- **Fully offline-first** by design
- Images pre-bundled and compressed

---

## ✅ Ethical Design Principles

- Promotes compassion for overlooked dogs
- No pressure, no gamification
- Transparent breed traits
- No tracking, no internet required

---

## 🔧 Next Steps

- [ ] Import breed JSON into SQLite at first run
- [ ] Design Search tab and filtering logic
- [ ] Add visual badges to breed results
- [ ] Build Rescue Education screen (static markdown or JSX)
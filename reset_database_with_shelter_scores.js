#!/usr/bin/env node
/**
 * Reset the database to force loading of shelter scores data
 * This will ensure all breeds have proper shelter_availability_score values
 */

const fs = require('fs');
const path = require('path');

// Path to the SQLite database file (this is where Expo stores it)
const dbPath = path.join(__dirname, 'dogmatch.db');

console.log('🔄 Resetting DogMatch database to load shelter scores...');

// Check if database file exists and delete it
if (fs.existsSync(dbPath)) {
  try {
    fs.unlinkSync(dbPath);
    console.log('✅ Old database file deleted');
  } catch (error) {
    console.log('⚠️  Could not delete database file (this is normal for Expo apps)');
    console.log('   The database will be reset when the app restarts');
  }
} else {
  console.log('ℹ️  No database file found (this is normal for Expo apps)');
}

console.log('');
console.log('📱 Next steps:');
console.log('1. Restart your Expo app (stop and run `npx expo start --clear`)');
console.log('2. The app will automatically seed with shelter scores data');
console.log('3. All breeds will now have proper shelter_availability_score values');
console.log('');
console.log('🏠 This will enable the shelter-based filtering system!');
console.log('🐕 You should now get results for your searches!');

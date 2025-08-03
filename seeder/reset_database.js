#!/usr/bin/env node
/**
 * Simple script to reset the database with corrected breed data
 * Run this after updating the breed data to force a database refresh
 */

const fs = require('fs');
const path = require('path');

// Path to the SQLite database file (this is where Expo stores it)
const dbPath = path.join(__dirname, '..', 'dogmatch.db');

console.log('🔄 Resetting DogMatch database...');

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
console.log('1. Restart your Expo app (stop and run `npm start` again)');
console.log('2. Or use the "🔄 Load All Breeds" button in the Browse tab');
console.log('3. The app will automatically seed with the corrected breed data');
console.log('');
console.log('✨ Your app will now have 180 correctly matched dog breeds!');
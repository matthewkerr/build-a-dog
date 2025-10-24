#!/usr/bin/env node
/**
 * Test script to verify database contents after reset
 * Run this to see what's actually in your database
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Path to your database file
const dbPath = path.join(__dirname, 'dogmatch.db');

console.log('🔍 Testing database contents...');
console.log('📁 Database path:', dbPath);

// Check if database file exists
const fs = require('fs');
if (!fs.existsSync(dbPath)) {
  console.log('❌ Database file not found! Run the app first to create it.');
  process.exit(1);
}

console.log('✅ Database file found');

// Open database
const db = new sqlite3.Database(dbPath);

// Test query to see what's in the breeds table
db.all("SELECT breed, size, shelter_availability_score FROM breeds ORDER BY breed LIMIT 20", (err, rows) => {
  if (err) {
    console.error('❌ Database error:', err);
    return;
  }
  
  console.log('\n📊 First 20 breeds in database:');
  console.log('Breed'.padEnd(30) + 'Size'.padEnd(10) + 'Shelter Score');
  console.log('-'.repeat(50));
  
  rows.forEach(row => {
    const breed = row.breed.padEnd(30);
    const size = row.size.padEnd(10);
    const shelterScore = row.shelter_availability_score;
    console.log(`${breed}${size}${shelterScore}`);
  });
  
  // Check specific problematic breeds
  console.log('\n🔍 Checking specific breeds:');
  const problemBreeds = ['Bulldog', 'English Bulldog', 'American Bulldog', 'German Shepherd', 'Staffordshire Bull Terrier'];
  
  problemBreeds.forEach(breedName => {
    db.get("SELECT breed, size, shelter_availability_score FROM breeds WHERE breed = ?", [breedName], (err, row) => {
      if (err) {
        console.error(`❌ Error checking ${breedName}:`, err);
        return;
      }
      
      if (row) {
        console.log(`✅ ${breedName}: Size = ${row.size}, Shelter Score = ${row.shelter_availability_score}`);
      } else {
        console.log(`❌ ${breedName}: Not found in database`);
      }
    });
  });
  
  // Check size distribution
  db.all("SELECT size, COUNT(*) as count FROM breeds GROUP BY size ORDER BY size", (err, rows) => {
    if (err) {
      console.error('❌ Error getting size distribution:', err);
      return;
    }
    
    console.log('\n📏 Size distribution in database:');
    rows.forEach(row => {
      console.log(`   ${row.size}: ${row.count} breeds`);
    });
    
    // Close database
    db.close();
    console.log('\n✅ Database check complete');
  });
});

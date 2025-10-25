import * as SQLite from 'expo-sqlite';
import breedData from '../seeder/dog_breeds_images_fixed.json';

export interface DogBreed {
  id: number;
  breed: string;
  size: string;
  energy_level: string;
  good_with_kids: boolean;
  good_with_pets: boolean;
  trainability: string;
  grooming_needs: string;
  companion_or_guardian: string;
  senior_friendly: boolean;
  special_needs_possible: boolean;
  description: string;
  image_filename: string;
  shelter_availability_score: number;
}

export interface Favorite {
  id: number;
  breed_id: number;
  created_at: string;
}

class DatabaseManager {
  private db: SQLite.SQLiteDatabase | null = null;

  async initializeDatabase(forceSeed: boolean = false): Promise<void> {
    try {
      this.db = await SQLite.openDatabaseAsync('dogmatch.db');
      
      // Create tables
      await this.createTables();
      
      // Check if data already exists
      const breedCount = await this.db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM breeds');
      
      // Seed data if tables are empty or if forced
      if (breedCount?.count === 0 || forceSeed) {
        await this.seedBreedData();
      }
      
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }

  private async createTables(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    // Create breeds table
    await this.db.execAsync(`
      CREATE TABLE IF NOT EXISTS breeds (
        id INTEGER PRIMARY KEY,
        breed TEXT NOT NULL,
        size TEXT NOT NULL,
        energy_level TEXT NOT NULL,
        good_with_kids BOOLEAN NOT NULL,
        good_with_pets BOOLEAN NOT NULL,
        trainability TEXT NOT NULL,
        grooming_needs TEXT NOT NULL,
        companion_or_guardian TEXT NOT NULL,
        senior_friendly BOOLEAN NOT NULL,
        special_needs_possible BOOLEAN NOT NULL,
        description TEXT NOT NULL,
        image_filename TEXT NOT NULL,
        shelter_availability_score INTEGER NOT NULL DEFAULT 5
      );
    `);

    // Create favorites table
    await this.db.execAsync(`
      CREATE TABLE IF NOT EXISTS favorites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        breed_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (breed_id) REFERENCES breeds (id),
        UNIQUE(breed_id)
      );
    `);
  }

  private async seedBreedData(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    console.log(`🌱 Seeding breed data... Found ${breedData.length} breeds to seed`);
    console.log(`📊 First breed sample: ${breedData[0]?.breed} - ${breedData[0]?.size} - ${breedData[0]?.description?.substring(0, 50)}...`);
    
    // Log size distribution for verification
    const sizeDistribution = breedData.reduce((acc, breed) => {
      acc[breed.size] = (acc[breed.size] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
    console.log(`📏 Size distribution:`, sizeDistribution);
    
    // Log bulldog breeds specifically
    const bulldogBreeds = breedData.filter(breed => breed.breed.includes('Bulldog'));
    console.log(`🐕 Bulldog breeds and their sizes:`);
    bulldogBreeds.forEach(breed => {
      console.log(`   ${breed.breed}: ${breed.size}`);
    });
    
    const insertStatement = await this.db.prepareAsync(`
      INSERT INTO breeds (
        id, breed, size, energy_level, good_with_kids, good_with_pets,
        trainability, grooming_needs, companion_or_guardian, senior_friendly,
        special_needs_possible, description, image_filename, shelter_availability_score
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    try {
      for (let i = 0; i < breedData.length; i++) {
        const breed = breedData[i];
        console.log(`Seeding breed ${i + 1}: ${breed.breed}`);
        
        await insertStatement.executeAsync([
          i + 1, // Generate ID starting from 1
          breed.breed,
          breed.size,
          breed.energy_level,
          breed.good_with_kids === 1, // Convert 1/0 to boolean
          breed.good_with_pets === 1, // Convert 1/0 to boolean
          breed.trainability,
          breed.grooming_needs,
          breed.companion_or_guardian,
          breed.senior_friendly === 1, // Convert 1/0 to boolean
          breed.special_needs_possible === 1, // Convert 1/0 to boolean
          breed.description,
          breed.image_filename,
          breed.shelter_availability_score || 5 // Use provided score or default to 5
        ]);
      }
      
      console.log(`Successfully seeded ${breedData.length} breeds`);
    } catch (error) {
      console.error('Error during seeding:', error);
      throw error;
    } finally {
      await insertStatement.finalizeAsync();
    }
  }

  // Breed queries
  async getAllBreeds(): Promise<DogBreed[]> {
    if (!this.db) throw new Error('Database not initialized');
    return await this.db.getAllAsync<DogBreed>('SELECT * FROM breeds ORDER BY breed');
  }

  async getBreedById(id: number): Promise<DogBreed | null> {
    if (!this.db) throw new Error('Database not initialized');
    return await this.db.getFirstAsync<DogBreed>('SELECT * FROM breeds WHERE id = ?', [id]);
  }

  async searchBreeds(filters: {
    size?: string[];
    energy_level?: string[];
    good_with_kids?: boolean;
    good_with_pets?: boolean;
    trainability?: string[];
    grooming_needs?: string[];
    companion_or_guardian?: string;
    senior_friendly?: boolean;
    special_needs_possible?: boolean;
    prioritize_adoptable?: boolean;
  }): Promise<DogBreed[]> {
    if (!this.db) throw new Error('Database not initialized');

    let query = 'SELECT * FROM breeds WHERE 1=1';
    const params: any[] = [];

    // Size filter
    if (filters.size && filters.size.length > 0) {
      const placeholders = filters.size.map(() => '?').join(',');
      query += ` AND size IN (${placeholders})`;
      params.push(...filters.size);
    }

    // Energy level filter
    if (filters.energy_level && filters.energy_level.length > 0) {
      const placeholders = filters.energy_level.map(() => '?').join(',');
      query += ` AND energy_level IN (${placeholders})`;
      params.push(...filters.energy_level);
    }

    // Good with kids filter
    if (filters.good_with_kids !== undefined) {
      query += ' AND good_with_kids = ?';
      params.push(filters.good_with_kids);
    }

    // Good with pets filter
    if (filters.good_with_pets !== undefined) {
      query += ' AND good_with_pets = ?';
      params.push(filters.good_with_pets);
    }

    // Trainability filter
    if (filters.trainability && filters.trainability.length > 0) {
      const placeholders = filters.trainability.map(() => '?').join(',');
      query += ` AND trainability IN (${placeholders})`;
      params.push(...filters.trainability);
    }

    // Grooming needs filter
    if (filters.grooming_needs && filters.grooming_needs.length > 0) {
      const placeholders = filters.grooming_needs.map(() => '?').join(',');
      query += ` AND grooming_needs IN (${placeholders})`;
      params.push(...filters.grooming_needs);
    }

    // Companion or guardian filter
    if (filters.companion_or_guardian) {
      query += ' AND companion_or_guardian = ?';
      params.push(filters.companion_or_guardian);
    }

    // Senior friendly filter
    if (filters.senior_friendly !== undefined) {
      query += ' AND senior_friendly = ?';
      params.push(filters.senior_friendly);
    }

    // Special needs filter
    if (filters.special_needs_possible !== undefined) {
      query += ' AND special_needs_possible = ?';
      params.push(filters.special_needs_possible);
    }

    // Add shelter availability priority if requested
    if (filters.prioritize_adoptable) {
      query += ' ORDER BY shelter_availability_score DESC, breed';
    } else {
      query += ' ORDER BY breed';
    }

    return await this.db.getAllAsync<DogBreed>(query, params);
  }

  // Favorites queries
  async getFavorites(): Promise<(DogBreed & { favorited_at: string })[]> {
    if (!this.db) throw new Error('Database not initialized');
    
    console.log('Database: Getting favorites...');
    const favorites = await this.db.getAllAsync<DogBreed & { favorited_at: string }>(`
      SELECT b.*, f.created_at as favorited_at
      FROM breeds b
      INNER JOIN favorites f ON b.id = f.breed_id
      ORDER BY f.created_at DESC
    `);
    console.log('Database: Found', favorites.length, 'favorites');
    return favorites;
  }

  async addToFavorites(breedId: number): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    
    console.log('Database: Adding breed ID', breedId, 'to favorites');
    try {
      await this.db.runAsync('INSERT INTO favorites (breed_id) VALUES (?)', [breedId]);
      console.log('Database: Successfully added breed ID', breedId, 'to favorites');
    } catch (error: any) {
      // Handle unique constraint violation (breed already favorited)
      if (error.message?.includes('UNIQUE constraint failed')) {
        console.log('Database: Breed ID', breedId, 'already in favorites');
        throw new Error('Breed is already in favorites');
      }
      console.error('Database: Error adding to favorites:', error);
      throw error;
    }
  }

  async removeFromFavorites(breedId: number): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    await this.db.runAsync('DELETE FROM favorites WHERE breed_id = ?', [breedId]);
  }

  async resetDatabase(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    await this.db.execAsync('DELETE FROM favorites');
  }

  async isFavorite(breedId: number): Promise<boolean> {
    if (!this.db) throw new Error('Database not initialized');
    
    const result = await this.db.getFirstAsync<{ count: number }>(
      'SELECT COUNT(*) as count FROM favorites WHERE breed_id = ?',
      [breedId]
    );
    
    return (result?.count ?? 0) > 0;
  }

  async getFavoriteIds(): Promise<number[]> {
    if (!this.db) throw new Error('Database not initialized');
    
    const results = await this.db.getAllAsync<{ breed_id: number }>(
      'SELECT breed_id FROM favorites ORDER BY created_at DESC'
    );
    
    return results.map(r => r.breed_id);
  }

  // Utility methods
  async getDatabaseStats(): Promise<{ breedCount: number; favoriteCount: number }> {
    if (!this.db) throw new Error('Database not initialized');
    
    const breedCount = await this.db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM breeds');
    const favoriteCount = await this.db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM favorites');
    
    return {
      breedCount: breedCount?.count ?? 0,
      favoriteCount: favoriteCount?.count ?? 0
    };
  }

  async clearDatabase(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    
    await this.db.execAsync('DELETE FROM favorites');
    await this.db.execAsync('DELETE FROM breeds');
    console.log('Database cleared');
  }

  async forceReseedDatabase(): Promise<void> {
    console.log('🔄 Force reseeding database with latest breed data...');
    console.log('📊 Breed data loaded:', breedData.length, 'breeds');
    console.log('📊 First breed:', breedData[0]?.breed);
    
    if (!this.db) {
      console.error('❌ Database not initialized, attempting to initialize...');
      await this.initializeDatabase();
      if (!this.db) throw new Error('Database initialization failed');
    }
    
    // Drop and recreate tables to ensure clean state
    await this.db.execAsync('DROP TABLE IF EXISTS favorites');
    await this.db.execAsync('DROP TABLE IF EXISTS breeds');
    console.log('📋 Dropped existing tables');
    
    // Recreate tables
    await this.createTables();
    console.log('📋 Recreated tables');
    
    // Force reseed with new data
    await this.seedBreedData();
    
    // Verify the data was seeded correctly
    await this.verifySeededData();
    
    console.log('✅ Database force reseeded successfully');
  }

  private async verifySeededData(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    
    const count = await this.db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM breeds');
    console.log(`🔍 Verification: ${count?.count} breeds in database`);
    
    // Check first few breeds
    const firstBreeds = await this.db.getAllAsync<DogBreed>('SELECT * FROM breeds ORDER BY id LIMIT 3');
    console.log('🔍 First 3 breeds in database:');
    firstBreeds.forEach((breed, i) => {
      console.log(`  ${i + 1}. ${breed.breed} - ${breed.size} - ${breed.description.substring(0, 40)}...`);
    });
    
    // Check specific problematic breeds
    const rottweiler = await this.db.getFirstAsync<DogBreed>('SELECT * FROM breeds WHERE breed = ?', ['Rottweiler']);
    if (rottweiler) {
      console.log(`🔍 Rottweiler check: Size=${rottweiler.size}, Desc starts with: ${rottweiler.description.substring(0, 30)}...`);
    }
  }

  async closeDatabase(): Promise<void> {
    if (this.db) {
      await this.db.closeAsync();
      this.db = null;
    }
  }
}

// Export singleton instance
export const databaseManager = new DatabaseManager();
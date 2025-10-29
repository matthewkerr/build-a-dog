import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FIRST_LAUNCH_KEY = '@furvana_first_launch';

export function useFirstLaunch() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  const checkFirstLaunch = async () => {
    try {
      const hasLaunched = await AsyncStorage.getItem(FIRST_LAUNCH_KEY);
      if (hasLaunched === null) {
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    } catch (error) {
      // // // console.error('Error checking first launch:', error);
      // Default to showing welcome if there's an error
      setIsFirstLaunch(true);
    }
  };

  const setHasLaunched = async () => {
    try {
      await AsyncStorage.setItem(FIRST_LAUNCH_KEY, 'true');
      setIsFirstLaunch(false);
    } catch (error) {
      // // // console.error('Error setting has launched:', error);
    }
  };

  return { isFirstLaunch, setHasLaunched };
}


// src/utils/themeStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = 'theme';

export const saveThemePreference = async theme => {
  try {
    await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
  } catch (error) {
    console.error('Failed to save theme preference:', error);
  }
};

export const getThemePreference = async () => {
  try {
    const theme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
    return theme ? JSON.parse(theme) : null;
  } catch (error) {
    console.error('Failed to load theme preference:', error);
    return null;
  }
};

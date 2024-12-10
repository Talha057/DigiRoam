import {createSlice} from '@reduxjs/toolkit';
import {useColorScheme} from 'react-native';
import lightTheme from './lightTheme';
import darkTheme from './darkTheme';
import {saveThemePreference, getThemePreference} from './themeStorage';

const systemTheme = useColorScheme();

const initialTheme = systemTheme === 'dark' ? darkTheme : lightTheme;

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: initialTheme,
  },
  reducers: {
    toggleTheme: state => {
      state.theme = state.theme.isDark ? lightTheme : darkTheme;
      saveThemePreference(newMode); // Save to AsyncStorage
    },
    setTheme: (state, action) => {
      const newTheme = action.payload;
      state.theme = newTheme;
      saveThemePreference(newTheme);
    },
    loadTheme: (state, action) => {
      const loadedTheme = action.payload || systemTheme;
      state.theme = loadedTheme;
    },
  },
});

export const {toggleTheme, setTheme, loadTheme} = themeSlice.actions;

export const initializeTheme = () => async dispatch => {
  const savedTheme = await getThemePreference();
  if (savedTheme) {
    dispatch(loadTheme(savedTheme));
  }
};

export default themeSlice.reducer;

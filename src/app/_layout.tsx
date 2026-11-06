import { LanguageContext } from "@/contexts/LanguageContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { Language, translations } from "../data/translations";

// 🚀 Create a tiny, dedicated Theme context so your LanguageContext stays untouched
export const ThemeToggleContext = React.createContext({
  isDark: false,
  toggleTheme: async () => {},
  toggleLanguage: async () => {},
});

export default function RootLayout() {
  const systemScheme = useColorScheme();
  const [isDark, setIsDark] = React.useState(systemScheme === "dark");
  const [language, setLanguage] = React.useState<Language>("en"); // default English

  React.useEffect(() => {
    (async () => {
      const savedTheme = await AsyncStorage.getItem("theme");
      const savedLang = await AsyncStorage.getItem("language");

      if (savedTheme) {
        setIsDark(savedTheme === "dark");
      } else {
        setIsDark(systemScheme === "dark");
      }

      if (savedLang && (savedLang === "en" || savedLang === "pt")) {
        setLanguage(savedLang);
      }
    })();
  }, [systemScheme]);

  const toggleTheme = async () => {
    const newValue = !isDark;
    setIsDark(newValue);
    await AsyncStorage.setItem("theme", newValue ? "dark" : "light");
  };

  const toggleLanguage = async () => {
    const newLang = language === "en" ? "pt" : "en";
    setLanguage(newLang);
    await AsyncStorage.setItem("language", newLang);
  };

  const theme = isDark ? MD3DarkTheme : MD3LightTheme;

  return (
    <PaperProvider
      theme={theme}
      settings={{ icon: (props) => <MaterialCommunityIcons {...props} /> }}
    >
      <LanguageContext.Provider
        value={{ language, setLanguage, t: translations[language] }}
      >
        <ThemeToggleContext.Provider
          value={{ isDark, toggleTheme, toggleLanguage }}
        >
          {/* 🚀 FIXED: No initialParams on Stack.Screen anymore */}
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(drawer)" />
            <Stack.Screen
              name="property/[id]"
              options={{ headerShown: false }}
            />
          </Stack>
        </ThemeToggleContext.Provider>
      </LanguageContext.Provider>
    </PaperProvider>
  );
}

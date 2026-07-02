import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import { Drawer } from "expo-router/drawer";
import * as React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import {
  Avatar,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  Switch,
  useTheme,
} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { LanguageContext } from "@/contexts/LanguageContext";
import { Language, translations } from "../data/translations";
export default function Layout() {
  const [iconsLoaded, setIconsLoaded] = React.useState(false);
  const systemScheme = useColorScheme();
  const [isDark, setIsDark] = React.useState(systemScheme === "dark");
  const [language, setLanguage] = React.useState<Language>("en"); // default English

  React.useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        MaterialCommunityIcons: require("react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf"),
      });
      setIconsLoaded(true);
    }
    loadFonts();

    // Load saved preferences
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

  if (!iconsLoaded) {
    return null;
  }

  const theme = isDark ? MD3DarkTheme : MD3LightTheme;
  const t = translations[language];

  return (
    <PaperProvider
      theme={theme}
      settings={{ icon: (props) => <MaterialCommunityIcons {...props} /> }}
    >
      <LanguageContext.Provider
        value={{ language, setLanguage, t: translations[language] }}
      >
        <Drawer
          screenOptions={{
            headerStyle: { backgroundColor: theme.colors.surface },
            headerTintColor: theme.colors.onSurface,
            drawerActiveTintColor: theme.colors.onPrimary,
            drawerInactiveTintColor: theme.colors.onSurfaceVariant,
            drawerStyle: { backgroundColor: theme.colors.background },
          }}
          drawerContent={({ navigation, state }) => {
            const paperTheme = useTheme();
            return (
              <View style={{ flex: 1 }}>
                {/* Drawer Header */}
                <View
                  style={[
                    styles.drawerHeader,
                    { backgroundColor: paperTheme.colors.surfaceVariant },
                  ]}
                >
                  <Avatar.Text size={64} label="T" />
                  <Text
                    style={[
                      styles.drawerTitle,
                      { color: paperTheme.colors.onSurface },
                    ]}
                  >
                    {t.name}
                  </Text>
                  <Text
                    style={[
                      styles.drawerDescription,
                      { color: paperTheme.colors.onSurfaceVariant },
                    ]}
                  >
                    {t.welcome}
                  </Text>

                  {/* ✅ Theme toggle */}
                  <View style={styles.themeToggleRow}>
                    <MaterialCommunityIcons
                      name={isDark ? "weather-night" : "white-balance-sunny"}
                      size={24}
                      color={paperTheme.colors.onSurface}
                      style={{ marginRight: 8 }}
                    />
                    <Text
                      style={{
                        color: paperTheme.colors.onSurface,
                        marginRight: 8,
                      }}
                    >
                      {isDark ? t.darkMode : t.lightMode}
                    </Text>
                    <Switch value={isDark} onValueChange={toggleTheme} />
                  </View>

                  {/* ✅ Language toggle */}
                  <View style={styles.themeToggleRow}>
                    <MaterialCommunityIcons
                      name="translate"
                      size={24}
                      color={paperTheme.colors.onSurface}
                      style={{ marginRight: 8 }}
                    />
                    <Text
                      style={{
                        color: paperTheme.colors.onSurface,
                        marginRight: 8,
                      }}
                    >
                      {t.language}:{" "}
                      {language === "en" ? "English" : "Português"}
                    </Text>
                    <Switch
                      value={language === "pt"}
                      onValueChange={toggleLanguage}
                    />
                  </View>
                </View>

                {/* Drawer Items */}
                {state.routes
                  .filter((route) =>
                    [
                      "index",
                      "About",
                      "Favorites",
                      "Explore",
                      "Rent",
                      "Buy",
                      "Contact",
                    ].includes(route.name),
                  )
                  .map((route, index) => {
                    const isFocused = state.index === index;
                    const iconName =
                      route.name === "index"
                        ? "home"
                        : route.name === "Favorites"
                          ? "heart-outline"
                          : route.name === "About"
                            ? "information-outline"
                            : route.name === "Explore"
                              ? "magnify"
                              : route.name === "Rent"
                                ? "key-outline"
                                : route.name === "Buy"
                                  ? "cash-multiple"
                                  : route.name === "Contact"
                                    ? "phone-outline"
                                    : "circle";

                    const label =
                      route.name === "index"
                        ? t.home
                        : route.name === "Favorites"
                          ? t.favorites
                          : route.name === "About"
                            ? t.about
                            : route.name === "Explore"
                              ? t.explore
                              : route.name === "Rent"
                                ? t.rent
                                : route.name === "Buy"
                                  ? t.buy
                                  : t.contact;

                    return (
                      <TouchableOpacity
                        key={route.key}
                        style={[
                          styles.drawerItem,
                          isFocused && {
                            backgroundColor: paperTheme.colors.surfaceVariant,
                          },
                        ]}
                        onPress={() => navigation.navigate(route.name)}
                      >
                        {isFocused && (
                          <View
                            style={[
                              styles.accentBar,
                              { backgroundColor: paperTheme.colors.primary },
                            ]}
                          />
                        )}
                        <MaterialCommunityIcons
                          name={iconName}
                          size={24}
                          color={paperTheme.colors.onSurfaceVariant}
                          style={{ marginRight: 16 }}
                        />
                        <Text
                          style={[
                            styles.drawerItemText,
                            { color: paperTheme.colors.onSurfaceVariant },
                          ]}
                        >
                          {label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}

                {/* Footer */}
                <View
                  style={[
                    styles.footer,
                    { borderTopColor: paperTheme.colors.surfaceVariant },
                  ]}
                >
                  <Text
                    style={[
                      styles.footerText,
                      { color: paperTheme.colors.onSurfaceVariant },
                    ]}
                  >
                    {t.footer}
                  </Text>
                  <View style={styles.footerIcons}>
                    <MaterialCommunityIcons
                      name="github"
                      size={22}
                      color={paperTheme.colors.onSurfaceVariant}
                      style={styles.footerIcon}
                    />
                    <MaterialCommunityIcons
                      name="linkedin"
                      size={22}
                      color={paperTheme.colors.onSurfaceVariant}
                      style={styles.footerIcon}
                    />
                    <MaterialCommunityIcons
                      name="web"
                      size={22}
                      color={paperTheme.colors.onSurfaceVariant}
                      style={styles.footerIcon}
                    />
                  </View>
                </View>
              </View>
            );
          }}
        >
          <Drawer.Screen
            name="index"
            options={{ title: translations[language].home }}
          />
          <Drawer.Screen
            name="Favorites"
            options={{ title: translations[language].favorites }}
          />
          <Drawer.Screen
            name="About"
            options={{ title: translations[language].about }}
          />
          <Drawer.Screen
            name="Contact"
            options={{ title: translations[language].contact }}
          />
          <Drawer.Screen
            name="Explore"
            options={{ title: translations[language].explore }}
          />
          <Drawer.Screen
            name="Rent"
            options={{ title: translations[language].rent }}
          />
          <Drawer.Screen
            name="Buy"
            options={{ title: translations[language].buy }}
          />
        </Drawer>
      </LanguageContext.Provider>
    </PaperProvider>
  );
}
const styles = StyleSheet.create({
  drawerHeader: {
    padding: 16,
    alignItems: "center",
    marginTop: 40,
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 12,
  },
  drawerDescription: {
    fontSize: 14,
    textAlign: "center",
    marginVertical: 12,
  },
  themeToggleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  drawerItemText: {
    fontSize: 16,
  },
  accentBar: {
    width: 4,
    height: "100%",
    marginRight: 12,
    borderRadius: 2,
  },
  footer: {
    marginTop: "auto",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "600",
  },
  footerIcons: {
    flexDirection: "row",
  },
  footerIcon: {
    marginHorizontal: 8,
  },
});

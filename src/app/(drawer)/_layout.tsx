import { LanguageContext } from "@/contexts/LanguageContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { Avatar, useTheme } from "react-native-paper";
import { translations } from "../../data/translations";
import { ThemeToggleContext } from "../_layout"; // 🚀 Import your clean theme context safely

export default function DrawerLayout() {
  const paperTheme = useTheme();

  // Clean translation context (Exactly how you had it originally!)
  const { language, t } = React.useContext(LanguageContext);

  // Consume theme variables natively via their own clean context hook 🚀
  const { isDark, toggleTheme, toggleLanguage } =
    React.useContext(ThemeToggleContext);

  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: paperTheme.colors.surface },
        headerTintColor: paperTheme.colors.onSurface,
        drawerActiveTintColor: paperTheme.colors.onPrimary,
        drawerInactiveTintColor: paperTheme.colors.onSurfaceVariant,
        drawerStyle: { backgroundColor: paperTheme.colors.background },
      }}
      drawerContent={({ navigation, state }) => {
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
                  {t.language}: {language === "en" ? "English" : "Português"}
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
                ["index", "About", "Favorites", "Explore"].includes(route.name),
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
                          : "circle";

                const label =
                  route.name === "index"
                    ? t.home
                    : route.name === "Favorites"
                      ? t.favorites
                      : route.name === "About"
                        ? t.about
                        : t.explore;

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
        name="Explore"
        options={{ title: translations[language].explore }}
      />
    </Drawer>
  );
}

// ⚠️ Remember to append your original `const styles = StyleSheet.create({...})` layout configuration down here!

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

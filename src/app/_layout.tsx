// app/_layout.tsx
import * as Font from "expo-font";
import { Drawer } from "expo-router/drawer";
import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  Avatar,
  Button,
  MD3DarkTheme,
  PaperProvider,
} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Layout() {
  const [iconsLoaded, setIconsLoaded] = React.useState(false);

  React.useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        MaterialCommunityIcons: require("react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf"),
      });
      setIconsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!iconsLoaded) {
    return null;
  }

  return (
    <PaperProvider
      theme={MD3DarkTheme}
      settings={{ icon: (props) => <MaterialCommunityIcons {...props} /> }}
    >
      <Drawer
        screenOptions={{
          headerStyle: { backgroundColor: "#222" },
          headerTintColor: "#fff",
          drawerActiveTintColor: "#fff",
          drawerInactiveTintColor: "#aaa",
          drawerStyle: { backgroundColor: "#222" },
        }}
        drawerContent={({ navigation, state }) => (
          <View style={{ flex: 1 }}>
            {/* Custom header */}
            <View style={styles.drawerHeader}>
              <Avatar.Text size={64} label="T" />
              <Text style={styles.drawerTitle}>Thiago</Text>
              <Text style={styles.drawerDescription}>
                Welcome to your real estate app.
              </Text>
              <Button
                mode="contained"
                style={styles.enterButton}
                onPress={() => navigation.navigate("index")}
              >
                Enter
              </Button>
            </View>

            {/* Drawer links */}
            {state.routes.map((route, index) => {
              const isFocused = state.index === index;

              // Correct icon names
              const iconName =
                route.name === "index"
                  ? "home"
                  : route.name === "favorites"
                    ? "heart-outline"
                    : route.name === "about"
                      ? "information-outline"
                      : route.name === "rent"
                        ? "key-outline"
                        : route.name === "buy"
                          ? "cash-multiple"
                          : "circle";

              return (
                <TouchableOpacity
                  key={route.key}
                  style={[
                    styles.drawerItem,
                    isFocused && styles.drawerItemActive,
                  ]}
                  onPress={() => navigation.navigate(route.name)}
                >
                  {isFocused && <View style={styles.accentBar} />}
                  <MaterialCommunityIcons
                    name={iconName}
                    size={24}
                    color={isFocused ? "#fff" : "#aaa"}
                    style={{ marginRight: 16 }}
                  />
                  <Text
                    style={[
                      styles.drawerItemText,
                      { color: isFocused ? "#fff" : "#aaa" },
                    ]}
                  >
                    {route.name.charAt(0).toUpperCase() + route.name.slice(1)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      >
        <Drawer.Screen name="index" options={{ title: "Home" }} />
        <Drawer.Screen name="favorites" options={{ title: "Favorites" }} />
        <Drawer.Screen name="about" options={{ title: "About" }} />
        <Drawer.Screen name="rent" options={{ title: "Rent" }} />
        <Drawer.Screen name="buy" options={{ title: "Buy" }} />
      </Drawer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: "#333",
    padding: 16,
    alignItems: "center",
    marginTop: 40,
  },
  drawerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 12,
  },
  drawerDescription: {
    color: "#ccc",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 12,
  },
  enterButton: {
    marginTop: 12,
    marginBottom: 32,
    alignSelf: "stretch",
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  drawerItemActive: {
    backgroundColor: "#333",
  },
  drawerItemText: {
    fontSize: 16,
  },
  accentBar: {
    width: 4,
    height: "100%",
    backgroundColor: "#0af",
    marginRight: 12,
    borderRadius: 2,
  },
});

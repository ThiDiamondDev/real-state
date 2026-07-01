import * as Font from "expo-font";
import { Drawer } from "expo-router/drawer";
import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  Avatar,
  Button,
  MD3DarkTheme,
  PaperProvider,
  useTheme,
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
          headerStyle: { backgroundColor: MD3DarkTheme.colors.surface },
          headerTintColor: MD3DarkTheme.colors.onSurface,
          drawerActiveTintColor: MD3DarkTheme.colors.onPrimary,
          drawerInactiveTintColor: MD3DarkTheme.colors.onSurfaceVariant,
          drawerStyle: { backgroundColor: MD3DarkTheme.colors.background },
        }}
        drawerContent={({ navigation, state }) => {
          const theme = useTheme(); // ← Paper theme
          return (
            <View style={{ flex: 1 }}>
              <View
                style={[
                  styles.drawerHeader,
                  { backgroundColor: theme.colors.surfaceVariant },
                ]}
              >
                <Avatar.Text size={64} label="T" />
                <Text
                  style={[
                    styles.drawerTitle,
                    { color: theme.colors.onSurface },
                  ]}
                >
                  Thiago
                </Text>
                <Text
                  style={[
                    styles.drawerDescription,
                    { color: theme.colors.onSurfaceVariant },
                  ]}
                >
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

                  return (
                    <TouchableOpacity
                      key={route.key}
                      style={[
                        styles.drawerItem,
                        isFocused && {
                          backgroundColor: theme.colors.surfaceVariant,
                        },
                      ]}
                      onPress={() => navigation.navigate(route.name)}
                    >
                      {isFocused && (
                        <View
                          style={[
                            styles.accentBar,
                            { backgroundColor: theme.colors.primary },
                          ]}
                        />
                      )}
                      <MaterialCommunityIcons
                        name={iconName}
                        size={24}
                        color={theme.colors.onSurfaceVariant}
                        style={{ marginRight: 16 }}
                      />
                      <Text
                        style={[
                          styles.drawerItemText,
                          {
                            color: theme.colors.onSurfaceVariant,
                          },
                        ]}
                      >
                        {route.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
            </View>
          );
        }}
      >
        <Drawer.Screen name="index" options={{ title: "Home" }} />
        <Drawer.Screen name="Favorites" options={{ title: "Favorites" }} />
        <Drawer.Screen name="About" options={{ title: "About" }} />
        <Drawer.Screen name="Contact" options={{ title: "Contact" }} />
        <Drawer.Screen name="Explore" options={{ title: "Explore" }} />
        <Drawer.Screen name="Rent" options={{ title: "Rent" }} />
        <Drawer.Screen name="Buy" options={{ title: "Buy" }} />
      </Drawer>
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
  drawerItemText: {
    fontSize: 16,
  },
  accentBar: {
    width: 4,
    height: "100%",
    marginRight: 12,
    borderRadius: 2,
  },
});

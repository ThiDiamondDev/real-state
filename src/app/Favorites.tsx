import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import * as React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { Text, useTheme } from "react-native-paper";
import PropertyCard from "../components/PropertyCard";
import { mockProperties, Property } from "../data/mockProperties";

export default function FavoritesScreen() {
  const theme = useTheme();
  const [favorites, setFavorites] = React.useState<Property[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const loadFavorites = async () => {
    const stored = await AsyncStorage.getItem("favorites");
    if (stored) {
      const ids: string[] = JSON.parse(stored);
      const favs = mockProperties.filter((p) => ids.includes(p.id));
      setFavorites(favs);
    } else {
      setFavorites([]);
    }
    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, []),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadFavorites();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={theme.colors.onBackground} />
        <Text
          style={[styles.loadingText, { color: theme.colors.onBackground }]}
        >
          Loading favorites...
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={[styles.title, { color: theme.colors.primary }]}>
        Favorites
      </Text>
      <Text style={[styles.description, { color: theme.colors.onBackground }]}>
        Your saved properties are listed below. Pull down to refresh if you’ve
        made changes.
      </Text>

      {favorites.length === 0 ? (
        <Text style={[styles.message, { color: theme.colors.onBackground }]}>
          No favorites yet
        </Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PropertyCard property={item} />}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.colors.onBackground]}
              tintColor={theme.colors.onBackground}
              progressBackgroundColor={theme.colors.surface}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  description: { fontSize: 14, marginBottom: 16 },
  list: { paddingBottom: 16 },
  message: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spinnerBox: {
    padding: 80, // makes the loading UI feel bigger
    borderRadius: 16,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "600",
  },
});

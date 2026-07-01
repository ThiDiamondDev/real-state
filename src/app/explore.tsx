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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, useTheme } from "react-native-paper";
import FilterForm, { Filters } from "../components/FilterForm";
import PropertyCard from "../components/PropertyCard";
import { mockProperties, Property } from "../data/mockProperties";

export default function ExploreScreen() {
  const theme = useTheme();
  const [results, setResults] =
    React.useState<(Property & { isFavorite?: boolean })[]>(mockProperties);
  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const reloadFavorites = async (list?: Property[]) => {
    const stored = await AsyncStorage.getItem("favorites");
    const ids: string[] = stored ? JSON.parse(stored) : [];
    const base = list ?? mockProperties;
    setResults(base.map((p) => ({ ...p, isFavorite: ids.includes(p.id) })));
  };

  const handleSearch = (filters: Filters) => {
    setLoading(true);
    const filtered = mockProperties.filter((p) => {
      return (
        (!filters.city || p.city === filters.city) &&
        (!filters.district || p.district.includes(filters.district)) &&
        (!filters.value || p.price <= filters.value) &&
        (!filters.rooms || p.rooms >= Number(filters.rooms.replace("+", ""))) &&
        (!filters.type || p.type === filters.type) &&
        (!filters.petsAllowed || p.petsAllowed) &&
        (!filters.nearMetro || p.nearMetro) &&
        (!filters.carSpaces || p.carSpaces >= filters.carSpaces)
      );
    });
    reloadFavorites(filtered); // ✅ apply favorites state to filtered list
    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      reloadFavorites(); // ✅ reload when screen is focused
    }, []),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await reloadFavorites();
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {loading && (
        <View
          style={[
            styles.loadingOverlay,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <ActivityIndicator size="large" color={theme.colors.onBackground} />
          <Text
            style={[styles.loadingText, { color: theme.colors.onBackground }]}
          >
            Filtering properties...
          </Text>
        </View>
      )}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PropertyCard
            property={item}
            onFavoriteChange={(id, fav) => {
              // ✅ update local list immediately when toggled
              setResults((prev) =>
                prev.map((p) => (p.id === id ? { ...p, isFavorite: fav } : p)),
              );
            }}
          />
        )}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.onBackground]}
            tintColor={theme.colors.onBackground}
            progressBackgroundColor={theme.colors.surface}
          />
        }
        ListHeaderComponent={
          <KeyboardAwareScrollView
            contentContainerStyle={styles.formContainer}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid
            enableAutomaticScroll
            extraScrollHeight={40}
            keyboardOpeningTime={0}
          >
            <Text style={[styles.title, { color: theme.colors.primary }]}>
              Explore Properties
            </Text>
            <Text
              style={[styles.description, { color: theme.colors.onBackground }]}
            >
              Use the filters below to refine your search.
            </Text>
            <FilterForm onSearch={handleSearch} />
          </KeyboardAwareScrollView>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: { padding: 16 },
  list: { paddingBottom: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 4 },
  description: { fontSize: 14, marginBottom: 12 },
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "600",
  },
});

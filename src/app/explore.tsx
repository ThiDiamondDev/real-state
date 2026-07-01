import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
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
  const rawParams = useLocalSearchParams();

  const initialFilters: Filters = {
    city: typeof rawParams.city === "string" ? rawParams.city : "",
    district: typeof rawParams.district === "string" ? rawParams.district : "",
    value: rawParams.value ? Number(rawParams.value) : 10000,
    rooms: typeof rawParams.rooms === "string" ? rawParams.rooms : "",
    type:
      typeof rawParams.type === "string"
        ? (rawParams.type as Filters["type"])
        : "",
    rentOrBuy:
      typeof rawParams.rentOrBuy === "string"
        ? (rawParams.rentOrBuy as Filters["rentOrBuy"])
        : "",
    petsAllowed: rawParams.petsAllowed === "true",
    nearMetro: rawParams.nearMetro === "true",
    carSpaces: rawParams.carSpaces ? Number(rawParams.carSpaces) : 0,
    bathrooms: "",
  };

  const filterProperties = (filters: Filters) => {
    return mockProperties.filter((p) => {
      return (
        (!filters.city ||
          p.city.toLowerCase() === filters.city.toLowerCase()) &&
        (!filters.district ||
          p.district.toLowerCase().includes(filters.district.toLowerCase())) &&
        (!filters.value || p.price <= filters.value) &&
        (!filters.rooms || p.rooms >= Number(filters.rooms.replace("+", ""))) &&
        (!filters.type ||
          p.type.toLowerCase() === filters.type.toLowerCase()) &&
        (!filters.rentOrBuy ||
          p.rentOrBuy.toLowerCase() === filters.rentOrBuy.toLowerCase()) &&
        (!filters.petsAllowed || p.petsAllowed) &&
        (!filters.nearMetro || p.nearMetro) &&
        (!filters.carSpaces || p.carSpaces >= filters.carSpaces)
      );
    });
  };

  // ✅ Initialize results directly with filtered list
  const [results, setResults] = React.useState<
    (Property & { isFavorite?: boolean })[]
  >(() => {
    const filtered =
      Object.keys(rawParams).length > 0
        ? filterProperties(initialFilters)
        : mockProperties;
    return filtered.map((p) => ({ ...p, isFavorite: false }));
  });

  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const applyFavorites = async (list: Property[]) => {
    const stored = await AsyncStorage.getItem("favorites");
    const ids: string[] = stored ? JSON.parse(stored) : [];
    setResults(list.map((p) => ({ ...p, isFavorite: ids.includes(p.id) })));
  };

  const handleSearch = (filters: Filters) => {
    setLoading(true);
    const filtered = filterProperties(filters);
    applyFavorites(filtered);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await applyFavorites(results); // refresh current list
    setRefreshing(false);
  };

  // ✅ Re-filter whenever params change
  React.useEffect(() => {
    const run = async () => {
      const stored = await AsyncStorage.getItem("favorites");
      const ids: string[] = stored ? JSON.parse(stored) : [];

      const filtered =
        Object.keys(rawParams).length > 0
          ? filterProperties(initialFilters)
          : mockProperties;

      setResults(
        filtered.map((p) => ({ ...p, isFavorite: ids.includes(p.id) })),
      );
    };

    run();
  }, [JSON.stringify(rawParams)]); // depend on params

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
          <KeyboardAwareScrollView contentContainerStyle={styles.formContainer}>
            <Text style={[styles.title, { color: theme.colors.primary }]}>
              Explore Properties
            </Text>
            <Text
              style={[styles.description, { color: theme.colors.onBackground }]}
            >
              Use the filters below to refine your search.
            </Text>
            <FilterForm
              key={JSON.stringify(initialFilters)} // ensures pre-population
              onSearch={handleSearch}
              initialFilters={initialFilters}
            />
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

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import * as React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Card, Snackbar, Text, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Property } from "../data/mockProperties";

export default function PropertyCard({
  property,
  onFavoriteChange,
}: {
  property: Property & { isFavorite?: boolean };
  onFavoriteChange?: (id: string, fav: boolean) => void;
}) {
  const theme = useTheme();
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  // ✅ Use prop directly if provided (Explore). Otherwise, manage internally (Favorites).
  const [internalFavorite, setInternalFavorite] = React.useState(false);
  React.useEffect(() => {
    if (property.isFavorite !== undefined) {
      setInternalFavorite(property.isFavorite);
    } else {
      (async () => {
        const stored = await AsyncStorage.getItem("favorites");
        if (stored) {
          const favorites: string[] = JSON.parse(stored);
          setInternalFavorite(favorites.includes(property.id));
        }
      })();
    }
  }, [property.isFavorite, property.id]);

  const toggleFavorite = async () => {
    const stored = await AsyncStorage.getItem("favorites");
    let favorites: string[] = stored ? JSON.parse(stored) : [];

    let newFav = false;
    if (favorites.includes(property.id)) {
      favorites = favorites.filter((id) => id !== property.id);
      setSnackbarMessage("Removed from favorites");
      newFav = false;
    } else {
      favorites.push(property.id);
      setSnackbarMessage("Added to favorites");
      newFav = true;
    }

    await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
    setInternalFavorite(newFav);
    setSnackbarVisible(true);

    if (onFavoriteChange) {
      onFavoriteChange(property.id, newFav);
    }
  };

  return (
    <View>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: property.images[0] }} />
        <Card.Title
          title={property.title}
          subtitle={`${property.city} — ${property.district}`}
          right={() => (
            <TouchableOpacity
              onPress={toggleFavorite}
              style={styles.heartButton}
            >
              <MaterialCommunityIcons
                name={internalFavorite ? "heart" : "heart-outline"}
                size={40}
                color={
                  internalFavorite ? theme.colors.error : theme.colors.onSurface
                }
              />
            </TouchableOpacity>
          )}
        />

        {/* ✅ 3-column grid */}
        <Card.Content>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <MaterialCommunityIcons
                name="currency-usd"
                size={32}
                color={theme.colors.primary}
              />
              <Text style={styles.label}>Price</Text>
              <Text style={styles.value}>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(property.price)}
              </Text>
            </View>
            <View style={styles.gridItem}>
              <MaterialCommunityIcons
                name="bed"
                size={32}
                color={theme.colors.primary}
              />
              <Text style={styles.label}>Rooms</Text>
              <Text style={styles.value}>{property.rooms}</Text>
            </View>
            <View style={styles.gridItem}>
              <MaterialCommunityIcons
                name="shower"
                size={32}
                color={theme.colors.primary}
              />
              <Text style={styles.label}>Bathrooms</Text>
              <Text style={styles.value}>{property.bathrooms}</Text>
            </View>
            <View style={styles.gridItem}>
              <MaterialCommunityIcons
                name="car"
                size={32}
                color={theme.colors.primary}
              />
              <Text style={styles.label}>Car Spaces</Text>
              <Text style={styles.value}>{property.carSpaces}</Text>
            </View>
            <View style={styles.gridItem}>
              <MaterialCommunityIcons
                name={property.petsAllowed ? "paw" : "paw-off"}
                size={32}
                color={theme.colors.primary}
              />
              <Text style={styles.label}>Pets</Text>
              <Text style={styles.value}>
                {property.petsAllowed ? "Allowed" : "Not allowed"}
              </Text>
            </View>
          </View>
        </Card.Content>

        <Card.Actions>
          <Link
            href={{ pathname: "/property/[id]", params: { id: property.id } }}
            asChild
          >
            <Button mode="contained">View Details</Button>
          </Link>
        </Card.Actions>
      </Card>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
        style={[
          styles.snackbar,
          { backgroundColor: theme.colors.primary, top: 40 },
        ]}
      >
        <Text style={[styles.snackbarText, { color: theme.colors.onPrimary }]}>
          {snackbarMessage}
        </Text>
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 16 },
  heartButton: { marginRight: 20 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 12,
  },
  gridItem: {
    width: "30%",
    marginBottom: 12,
    alignItems: "center",
  },
  label: { fontSize: 12, color: "#666", marginTop: 4 },
  value: { fontSize: 14, fontWeight: "600", marginTop: 2, textAlign: "center" },
  snackbar: {
    borderRadius: 360,
    marginHorizontal: 80,
    paddingHorizontal: 16,
    marginBottom: 80,
    marginLeft: 120,
  },
  snackbarText: { fontWeight: "600", textAlign: "center" },
});

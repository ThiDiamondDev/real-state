import { LanguageContext } from "@/contexts/LanguageContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import * as React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Card, Snackbar, Text, useTheme } from "react-native-paper";
import { Property } from "../data/mockProperties";

export default function PropertyCard({
  property,
  onFavoriteChange,
}: {
  property: Property & { isFavorite?: boolean };
  onFavoriteChange?: (id: string, fav: boolean) => void;
}) {
  const theme = useTheme();
  const { t } = React.useContext(LanguageContext);
  // ✅ Build localized title here
  const translatedType =
    property.type === "apartment"
      ? t.apartmentLabel
      : property.type === "house"
        ? t.houseLabel
        : property.type === "terrain"
          ? t.terrainLabel
          : property.type;

  const localizedTitle = `${translatedType} ${t.inLabel} ${property.city}`;
  const [internalFavorite, setInternalFavorite] = React.useState(false);
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

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
      setSnackbarMessage(t.removedFromFavorites);
      newFav = false;
    } else {
      favorites.push(property.id);
      setSnackbarMessage(t.addedToFavorites);
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
        <View>
          <Card.Cover
            style={styles.cover}
            source={{ uri: property.images[0] }}
          />
          <LinearGradient
            colors={["rgba(0, 0, 0, 0.92)", "rgba(0, 0, 0, 0.6)"]}
            style={styles.badgeContainer}
          >
            <MaterialCommunityIcons
              name={property.rentOrBuy === "rent" ? "key" : "home"}
              size={18}
              color="#fff"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.badgeText}>
              {property.rentOrBuy === "rent" ? t.forRent : t.forSale}
            </Text>
          </LinearGradient>
        </View>

        {/* Header */}
        <View
          style={[
            styles.header,
            { backgroundColor: theme.colors.surfaceVariant },
          ]}
        >
          <View style={styles.headerText}>
            <Text style={[styles.title, { color: theme.colors.onSurface }]}>
              {localizedTitle}
            </Text>
            <Text
              style={[
                styles.subtitle,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              {property.city} — {property.district}
            </Text>
          </View>
          <TouchableOpacity onPress={toggleFavorite} style={styles.heartButton}>
            <MaterialCommunityIcons
              name={internalFavorite ? "heart" : "heart-outline"}
              size={40}
              color={
                internalFavorite ? theme.colors.error : theme.colors.onSurface
              }
            />
          </TouchableOpacity>
        </View>

        {/* Grid */}
        <Card.Content>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <MaterialCommunityIcons
                name="currency-usd"
                size={32}
                color={theme.colors.primary}
              />
              <Text style={styles.label}>{t.priceLabel}</Text>
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
              <Text style={styles.label}>{t.roomsLabel}</Text>
              <Text style={styles.value}>{property.rooms}</Text>
            </View>
            <View style={styles.gridItem}>
              <MaterialCommunityIcons
                name="shower"
                size={32}
                color={theme.colors.primary}
              />
              <Text style={styles.label}>{t.bathroomsLabel}</Text>
              <Text style={styles.value}>{property.bathrooms}</Text>
            </View>
            <View style={styles.gridItem}>
              <MaterialCommunityIcons
                name="car"
                size={32}
                color={theme.colors.primary}
              />
              <Text style={styles.label}>{t.carSpacesLabel}</Text>
              <Text style={styles.value}>{property.carSpaces}</Text>
            </View>
            <View style={styles.gridItem}>
              <MaterialCommunityIcons
                name={property.petsAllowed ? "paw" : "paw-off"}
                size={32}
                color={theme.colors.primary}
              />
              <Text style={styles.label}>{t.petsLabel}</Text>
              <Text style={styles.value}>
                {property.petsAllowed ? t.allowedLabel : t.notAllowedLabel}
              </Text>
            </View>
            <View style={styles.gridItem}>
              <MaterialCommunityIcons
                name={property.nearMetro ? "train" : "train-off"}
                size={32}
                color={theme.colors.primary}
              />
              <Text style={styles.label}>{t.nearMetroLabel}</Text>
              <Text style={styles.value}>
                {property.nearMetro ? t.yesLabel : t.noLabel}
              </Text>
            </View>
          </View>
        </Card.Content>

        <Card.Actions>
          <Link href={`/property/${property.id}`} asChild>
            <Button mode="contained">{t.viewDetailsButton}</Button>
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
  card: { marginBottom: 16, marginHorizontal: 12, borderRadius: 12 },
  cover: { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  headerText: { flex: 1 },
  title: { fontSize: 18, fontWeight: "bold" },
  subtitle: { fontSize: 14 },
  heartButton: { marginLeft: 12 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 12,
  },
  gridItem: { width: "30%", marginBottom: 12, alignItems: "center" },
  label: { fontSize: 12, marginTop: 4 },
  value: { fontSize: 14, fontWeight: "600", marginTop: 2, textAlign: "center" },
  snackbar: {
    borderRadius: 360,
    marginHorizontal: 80,
    paddingHorizontal: 16,
    marginBottom: 80,
    marginLeft: 120,
  },
  snackbarText: { fontWeight: "600", textAlign: "center" },
  badgeContainer: {
    position: "absolute",
    top: 12,
    left: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: { fontSize: 18, fontWeight: "700", color: "#fff" },
});

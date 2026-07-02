import { LanguageContext } from "@/contexts/LanguageContext";
import { mockProperties } from "@/data/mockProperties";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import * as React from "react";
import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Snackbar, Text, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const { width } = Dimensions.get("window");

export default function PropertyDetailScreen() {
  const theme = useTheme();
  const { t } = React.useContext(LanguageContext);
  const { id } = useLocalSearchParams<{ id: string }>();
  const property = mockProperties.find((p) => p.id === id);

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [favorite, setFavorite] = React.useState(false);
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const navigation = require("expo-router").useNavigation();
  if (!property) {
    return (
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Text style={styles.notFound}>{t.propertyNotFound}</Text>
      </View>
    );
  }

  // ✅ Build localized title
  const translatedType =
    property.type === "apartment"
      ? t.apartmentLabel
      : property.type === "house"
        ? t.houseLabel
        : property.type === "terrain"
          ? t.terrainLabel
          : property.type;
  const localizedTitle = `${translatedType} ${t.inLabel} ${property.city}`;

  navigation.setOptions({ title: localizedTitle });

  // Load favorite state
  React.useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem("favorites");
      if (stored) {
        const favorites: string[] = JSON.parse(stored);
        setFavorite(favorites.includes(property.id));
      }
    })();
  }, [property.id]);

  const toggleFavorite = async () => {
    const stored = await AsyncStorage.getItem("favorites");
    let favorites: string[] = stored ? JSON.parse(stored) : [];

    let newFav = false;
    if (favorites.includes(property.id)) {
      favorites = favorites.filter((fid) => fid !== property.id);
      setSnackbarMessage(t.removedFromFavorites);
      newFav = false;
    } else {
      favorites.push(property.id);
      setSnackbarMessage(t.addedToFavorites);
      newFav = true;
    }

    await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
    setFavorite(newFav);
    setSnackbarVisible(true);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Image carousel */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setActiveIndex(index);
        }}
        scrollEventThrottle={16}
      >
        {property.images.map((img: string, i: number) => (
          <Image key={i} source={{ uri: img }} style={styles.image} />
        ))}
      </ScrollView>

      {/* Pagination dots */}
      <View style={styles.pagination}>
        {property.images.map((_, i: number) => (
          <View
            key={i}
            style={[styles.dot, activeIndex === i && styles.dotActive]}
          />
        ))}
      </View>

      {/* Badge + Favorite button */}
      <View style={styles.topRow}>
        <View
          style={[
            styles.badge,
            {
              backgroundColor:
                property.rentOrBuy === "rent"
                  ? theme.colors.primary
                  : theme.colors.secondary,
            },
          ]}
        >
          <MaterialCommunityIcons
            name={property.rentOrBuy === "rent" ? "key" : "home"}
            size={28}
            color={theme.colors.onPrimary}
            style={{ marginRight: 4 }}
          />
          <Text style={[styles.badgeText, { color: theme.colors.onPrimary }]}>
            {property.rentOrBuy === "rent" ? t.forRent : t.forSale}
          </Text>
        </View>
        <TouchableOpacity onPress={toggleFavorite} style={styles.heartButton}>
          <MaterialCommunityIcons
            name={favorite ? "heart" : "heart-outline"}
            size={36}
            color={favorite ? theme.colors.error : theme.colors.onSurface}
          />
        </TouchableOpacity>
      </View>

      {/* Title + subtitle */}
      <View
        style={[
          styles.section,
          { backgroundColor: theme.colors.surfaceVariant },
        ]}
      >
        <Text style={[styles.title, { color: theme.colors.onSurface }]}>
          {localizedTitle}
        </Text>
        <Text
          style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
        >
          {property.city} — {property.district}
        </Text>
      </View>

      {/* Grid details */}
      <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
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
      </View>

      {/* Address section */}
      <View
        style={[
          styles.section,
          { backgroundColor: theme.colors.surfaceVariant },
        ]}
      >
        <View style={styles.detailsRow}>
          <MaterialCommunityIcons
            name="map-marker"
            size={22}
            color={theme.colors.primary}
          />
          <Text style={styles.detailText}>
            {property.address || t.addressNotAvailable}
          </Text>
        </View>
        <Button
          mode="outlined"
          icon="map"
          style={styles.button}
          onPress={() => {
            if (property.address) {
              const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                property.address,
              )}`;
              Linking.openURL(url);
            }
          }}
        >
          {t.seeOnMapsButton}
        </Button>
      </View>

      {/* Description */}
      <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
        <Text style={styles.description}>
          {t.propertyDescriptionPrefix} {translatedType.toLowerCase()}{" "}
          {t.inLabel} {property.district}, {property.city}.{" "}
          {t.propertyDescriptionSuffix}
        </Text>
      </View>

      {/* Actions */}
      <View
        style={[
          styles.section,
          { backgroundColor: theme.colors.surfaceVariant },
        ]}
      >
        <Button mode="contained" icon="phone" style={styles.button}>
          {t.callAgentButton}
        </Button>
        <Button mode="outlined" icon="email" style={styles.button}>
          {t.sendMessageButton}
        </Button>
      </View>

      {/* Snackbar */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
        style={[styles.snackbar, { backgroundColor: theme.colors.primary }]}
      >
        <Text style={[styles.snackbarText, { color: theme.colors.onPrimary }]}>
          {snackbarMessage}
        </Text>
      </Snackbar>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  image: { width, height: 250 },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#555",
    marginHorizontal: 4,
  },
  dotActive: { backgroundColor: "#0af" },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 8,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    elevation: 3,
  },
  badgeText: {
    fontSize: 20,
    fontWeight: "700",
  },
  heartButton: { padding: 4 },

  section: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: { fontSize: 16 },

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
  value: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 2,
    textAlign: "center",
  },

  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: { marginLeft: 8, fontSize: 15 },

  description: { fontSize: 15, lineHeight: 22 },

  button: { marginTop: 12 },

  notFound: { fontSize: 18, textAlign: "center", marginTop: 40 },

  snackbar: {
    borderRadius: 20,
    marginHorizontal: 40,
    marginBottom: 20,
  },
  snackbarText: { fontWeight: "600", textAlign: "center" },
});

import { useLocalSearchParams } from "expo-router";
import * as React from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { mockProperties } from "../data/mockProperties";

const { width } = Dimensions.get("window");

export default function PropertyDetailScreen() {
  const theme = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const property = mockProperties.find((p) => p.id === id);

  const [activeIndex, setActiveIndex] = React.useState(0);

  if (!property) return <Text style={styles.notFound}>Property not found</Text>;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* ✅ Image carousel */}
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
        {property.images.map((img: string, i: number) => (
          <View
            key={i}
            style={[styles.dot, activeIndex === i && styles.dotActive]}
          />
        ))}
      </View>

      {/* Title + subtitle */}
      <Text style={styles.title}>{property.title}</Text>
      <Text style={styles.subtitle}>
        {property.city} — {property.district}
      </Text>

      {/* Details */}
      <View style={styles.detailsRow}>
        <MaterialCommunityIcons
          name="currency-usd"
          size={22}
          color={theme.colors.primary}
        />
        <Text style={styles.detailText}>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(property.price)}
        </Text>
      </View>

      <View style={styles.detailsRow}>
        <MaterialCommunityIcons
          name="bed"
          size={22}
          color={theme.colors.primary}
        />
        <Text style={styles.detailText}>{property.rooms} rooms</Text>
      </View>

      <View style={styles.detailsRow}>
        <MaterialCommunityIcons
          name="car"
          size={22}
          color={theme.colors.primary}
        />
        <Text style={styles.detailText}>{property.carSpaces} car spaces</Text>
      </View>

      <View style={styles.detailsRow}>
        <MaterialCommunityIcons
          name="dog"
          size={22}
          color={
            property.petsAllowed ? theme.colors.primary : theme.colors.onSurface
          }
        />
        <Text style={styles.detailText}>
          {property.petsAllowed ? "Pets allowed" : "No pets"}
        </Text>
      </View>

      <View style={styles.detailsRow}>
        <MaterialCommunityIcons
          name="subway"
          size={22}
          color={
            property.nearMetro ? theme.colors.primary : theme.colors.onSurface
          }
        />
        <Text style={styles.detailText}>
          {property.nearMetro ? "Near metro" : "Not near metro"}
        </Text>
      </View>

      {/* Description */}
      <Text style={styles.description}>
        This {property.type} is located in {property.district}, {property.city}.
        Perfect for families or individuals looking for comfort and convenience.
      </Text>

      {/* Actions */}
      <Button mode="contained" icon="phone" style={styles.button}>
        Call Agent
      </Button>
      <Button mode="outlined" icon="email" style={styles.button}>
        Send Message
      </Button>
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 12,
    paddingHorizontal: 16,
  },
  subtitle: { fontSize: 16, marginBottom: 12, paddingHorizontal: 16 },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  detailText: { marginLeft: 8, fontSize: 15 },
  description: {
    marginTop: 16,
    fontSize: 15,
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  button: { marginTop: 12, marginHorizontal: 16 },
  notFound: { fontSize: 18, textAlign: "center", marginTop: 40 },
});

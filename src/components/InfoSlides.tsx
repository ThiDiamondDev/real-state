import { LanguageContext } from "@/contexts/LanguageContext";
import * as React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function InfoSlides() {
  const theme = useTheme();
  const { t } = React.useContext(LanguageContext);

  const slides = [
    {
      title: t.familyComfortTitle,
      description: t.familyComfortDesc,
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: t.urbanLifestyleTitle,
      description: t.urbanLifestyleDesc,
      image:
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: t.investmentTerrainTitle,
      description: t.investmentTerrainDesc,
      image:
        "https://images.unsplash.com/photo-1594220862488-117b78382514?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {slides.map((slide, i) => (
        <View
          key={i}
          style={[styles.card, { backgroundColor: theme.colors.surface }]}
        >
          <Image source={{ uri: slide.image }} style={styles.image} />
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>
            {slide.title}
          </Text>
          <Text
            style={[
              styles.description,
              { color: theme.colors.onSurfaceVariant },
            ]}
          >
            {slide.description}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 220,
    borderRadius: 8,
    marginRight: 12,
    padding: 12,
  },
  image: { width: "100%", height: 120, borderRadius: 6, marginBottom: 8 },
  title: { fontWeight: "bold", fontSize: 16 },
  description: { fontSize: 12, marginTop: 4 },
});

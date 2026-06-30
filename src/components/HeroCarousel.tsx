// components/HeroCarousel.tsx
import * as React from "react";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button } from "react-native-paper";

const { width } = Dimensions.get("window");

export type HeroSlide = {
  title: string;
  description: string;
  image: string;
  cta: string;
  onPress?: () => void;
};

type Props = {
  slides: HeroSlide[];
};

export default function HeroCarousel({ slides }: Props) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setActiveIndex(index);
        }}
        scrollEventThrottle={16}
        style={{ marginBottom: 8 }}
      >
        {slides.map((slide, index) => (
          <ImageBackground
            key={index}
            source={{ uri: slide.image }}
            style={styles.hero}
            resizeMode="cover"
          >
            <View style={styles.overlay} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.description}>{slide.description}</Text>
              <Button
                mode="contained"
                onPress={slide.onPress || (() => {})}
                style={styles.ctaButton}
              >
                {slide.cta}
              </Button>
            </View>
          </ImageBackground>
        ))}
      </ScrollView>

      {/* Pagination dots */}
      <View style={styles.pagination}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, activeIndex === i && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    width,
    height: 240,
    justifyContent: "flex-end",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  textContainer: {
    backgroundColor: "rgba(0,0,0,0.5)", // text background
    padding: 16,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  description: {
    color: "#eee",
    fontSize: 14,
    marginVertical: 6,
  },
  ctaButton: {
    marginTop: 8,
    alignSelf: "flex-start",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#555",
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: "#0af",
  },
});

import { Link, router } from "expo-router"; // ✅ Expo Router navigation
import * as React from "react";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Card, SegmentedButtons, useTheme } from "react-native-paper";
import AnnounceForm from "../components/AnnounceForm";
import CalculateForm from "../components/CalculateForm";
import CallToActionSection from "../components/CallToActionSection";
import FunnelSection from "../components/FunnelSection";
import HeroCarousel, { HeroSlide } from "../components/HeroCarousel";
import InfoSlides from "../components/InfoSlides";
import PropertyForm from "../components/PropertyForm";
export default function HomeScreen() {
  const theme = useTheme();
  const [mode, setMode] = React.useState<"search" | "announce">("search");
  const [subMode, setSubMode] = React.useState<
    "rent" | "buy" | "announce" | "calculate"
  >("rent");

  const slides: HeroSlide[] = [
    {
      title: "Modern House",
      description: "Discover spacious family homes...",
      image:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
      cta: "Explore Houses",
      onPress: () =>
        router.push({ pathname: "/Explore", params: { type: "house" } }),
    },
    {
      title: "City Apartment",
      description: "Stylish apartments in vibrant areas...",
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
      cta: "Browse Apartments",
      onPress: () =>
        router.push({ pathname: "/Explore", params: { type: "apartment" } }),
    },
    {
      title: "Open Terrain",
      description: "Invest in land and build your future.",
      image:
        "https://images.unsplash.com/photo-1594220862488-117b78382514?auto=format&fit=crop&w=800&q=80",
      cta: "View Terrains",
      onPress: () =>
        router.push({ pathname: "/Explore", params: { type: "terrain" } }),
    },
  ];

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <HeroCarousel slides={slides} />

      <SegmentedButtons
        value={mode}
        onValueChange={setMode}
        buttons={[
          { value: "search", label: "Search Property", icon: "magnify" },
          { value: "announce", label: "Announce Property", icon: "bullhorn" },
        ]}
      />

      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Title
          title={mode === "search" ? "Search Properties" : "Announce Property"}
        />
        <Card.Content>
          {mode === "search" ? (
            <>
              <SegmentedButtons
                value={subMode}
                onValueChange={(val) => setSubMode(val as "rent" | "buy")}
                buttons={[
                  { value: "rent", label: "Rent", icon: "key-outline" },
                  { value: "buy", label: "Buy", icon: "cash-multiple" },
                ]}
              />
              <PropertyForm type={subMode as "rent" | "buy"} />
              {/* ✅ Link to Explore */}
              <Link href="/explore">Go to Explore</Link>
            </>
          ) : (
            <>
              <SegmentedButtons
                value={subMode}
                onValueChange={(val) =>
                  setSubMode(val as "announce" | "calculate")
                }
                buttons={[
                  { value: "announce", label: "Announce", icon: "bullhorn" },
                  {
                    value: "calculate",
                    label: "Calculate",
                    icon: "calculator",
                  },
                ]}
              />
              {subMode === "announce" ? <AnnounceForm /> : <CalculateForm />}
            </>
          )}
        </Card.Content>
      </Card>

      <CallToActionSection />
      <InfoSlides />
      <FunnelSection />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16 },
  card: { marginTop: 16 },
});

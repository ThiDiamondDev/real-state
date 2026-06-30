import * as React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Card, SegmentedButtons, useTheme } from "react-native-paper";
import AnnounceForm from "../components/AnnounceForm";
import CalculateForm from "../components/CalculateForm";
import CallToActionSection from "../components/CallToActionSection";
import FunnelSection from "../components/FunnelSection";
import HeroCarousel, { HeroSlide } from "../components/HeroCarousel";
import InfoSlides from "../components/InfoSlides";
import PropertyForm from "../components/PropertyForm";

export default function HomeScreen() {
  const theme = useTheme(); // access Paper theme colors

  const [mode, setMode] = React.useState<"search" | "announce">("search");
  const [subMode, setSubMode] = React.useState<
    "rent" | "buy" | "announce" | "calculate"
  >("rent");

  const slides: HeroSlide[] = [
    {
      title: "Modern House",
      description: "Discover spacious family homes with outdoor living.",
      image:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
      cta: "Explore Houses",
      onPress: () => setMode("search"),
    },
    {
      title: "City Apartment",
      description: "Stylish apartments in vibrant urban areas.",
      image:
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1200&q=80",
      cta: "Browse Apartments",
      onPress: () => setMode("search"),
    },
    {
      title: "Open Terrain",
      description: "Invest in land and build your future.",
      image:
        "https://images.unsplash.com/photo-1594220862488-117b78382514?auto=format&fit=crop&w=1200&q=80",
      cta: "View Terrains",
      onPress: () => setMode("search"),
    },
  ];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.colors.background },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        {/* Hero carousel */}
        <HeroCarousel slides={slides} />

        {/* Mode toggle */}
        <SegmentedButtons
          value={mode}
          onValueChange={setMode}
          buttons={[
            { value: "search", label: "Search Property", icon: "magnify" },
            { value: "announce", label: "Announce Property", icon: "bullhorn" },
          ]}
          style={{ marginVertical: 8 }}
        />

        {/* Card with sub-mode */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Title
            title={
              mode === "search" ? "Search Properties" : "Announce Property"
            }
            titleStyle={{ color: theme.colors.onSurface }}
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
                  style={{ marginVertical: 8 }}
                />
                <PropertyForm type={subMode as "rent" | "buy"} />
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
                  style={{ marginVertical: 8 }}
                />
                {subMode === "announce" ? <AnnounceForm /> : <CalculateForm />}
              </>
            )}
          </Card.Content>
        </Card>

        {/* New sections AFTER the form */}
        <CallToActionSection />
        <InfoSlides />
        <FunnelSection />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16 },
  card: { marginTop: 16 },
});

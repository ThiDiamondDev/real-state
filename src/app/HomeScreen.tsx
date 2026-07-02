import { LanguageContext } from "@/contexts/LanguageContext";
import { router } from "expo-router";
import * as React from "react";
import { StyleSheet, View } from "react-native";
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
  // ✅ Consume context correctly
  const { t } = React.useContext(LanguageContext);
  const theme = useTheme();

  const [mode, setMode] = React.useState<"search" | "announce">("search");
  const [subMode, setSubMode] = React.useState<
    "rent" | "buy" | "announce" | "calculate"
  >("rent");

  // Reset subMode when mode changes
  React.useEffect(() => {
    if (mode === "search") setSubMode("rent");
    else setSubMode("announce");
  }, [mode]);

  const slides: HeroSlide[] = [
    {
      title: t.modernHouse,
      description: t.modernDesc,
      image:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
      cta: t.modernCTA,
      onPress: () =>
        router.push({ pathname: "/Explore", params: { type: "house" } }),
    },
    {
      title: t.cityApartment,
      description: t.cityDesc,
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
      cta: t.cityCTA,
      onPress: () =>
        router.push({ pathname: "/Explore", params: { type: "apartment" } }),
    },
    {
      title: t.terrain,
      description: t.terrainDesc,
      image:
        "https://images.unsplash.com/photo-1594220862488-117b78382514?auto=format&fit=crop&w=800&q=80",
      cta: t.terrainCTA,
      onPress: () =>
        router.push({ pathname: "/Explore", params: { type: "terrain" } }),
    },
    {
      title: t.petFriendly,
      description: t.petDesc,
      image:
        "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=800&q=80",
      cta: t.petCTA,
      onPress: () =>
        router.push({
          pathname: "/Explore",
          params: { type: "house", rentOrBuy: "rent", petsAllowed: "true" },
        }),
    },
    {
      title: t.saoPaulo,
      description: t.saoPauloDesc,
      image:
        "https://images.unsplash.com/photo-1645918899630-85e2f3132a84?auto=format&fit=crop&w=800&q=80",
      cta: t.saoPauloCTA,
      onPress: () =>
        router.push({
          pathname: "/Explore",
          params: { city: "São Paulo", rentOrBuy: "rent" },
        }),
    },
    {
      title: t.rio,
      description: t.rioDesc,
      image:
        "https://images.unsplash.com/photo-1700677866588-95226be09b39?auto=format&fit=crop&w=800&q=80",
      cta: t.rioCTA,
      onPress: () =>
        router.push({
          pathname: "/Explore",
          params: { city: "Rio de Janeiro", rentOrBuy: "rent" },
        }),
    },
  ];

  // Handler for search form submit
  const handleSearch = (filters: any) => {
    router.push({
      pathname: "/Explore",
      params: { ...filters, rentOrBuy: subMode },
    });
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      contentInsetAdjustmentBehavior="never"
      enableOnAndroid={true}
      extraScrollHeight={100}
      extraHeight={75}
      keyboardOpeningTime={0}
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <View style={styles.heroWrapper}>
        <HeroCarousel slides={slides} />
      </View>

      <SegmentedButtons
        value={mode}
        onValueChange={(val) => setMode(val as "search" | "announce")}
        buttons={[
          { value: "search", label: t.searchProperty, icon: "magnify" },
          { value: "announce", label: t.announceProperty, icon: "bullhorn" },
        ]}
      />

      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Title
          title={mode === "search" ? t.searchProperties : t.announceProperty}
        />
        <Card.Content>
          {mode === "search" ? (
            <>
              <SegmentedButtons
                value={subMode}
                onValueChange={(val) => setSubMode(val as "rent" | "buy")}
                buttons={[
                  { value: "rent", label: t.rent, icon: "key-outline" },
                  { value: "buy", label: t.buy, icon: "cash-multiple" },
                ]}
              />
              <PropertyForm
                type={subMode as "rent" | "buy"}
                onSearch={handleSearch}
              />
            </>
          ) : (
            <>
              <SegmentedButtons
                value={subMode}
                onValueChange={(val) =>
                  setSubMode(val as "announce" | "calculate")
                }
                buttons={[
                  { value: "announce", label: t.announce, icon: "bullhorn" },
                  {
                    value: "calculate",
                    label: t.calculate,
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
  heroWrapper: { marginBottom: 24 },
  card: { marginTop: 16 },
});

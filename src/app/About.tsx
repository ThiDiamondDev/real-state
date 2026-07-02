import { LanguageContext } from "@/contexts/LanguageContext";
import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Card, TextInput, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FunnelSection from "../components/FunnelSection";
import HeroCarousel, { HeroSlide } from "../components/HeroCarousel";
import InfoSlides from "../components/InfoSlides";

export default function AboutScreen() {
  const theme = useTheme();
  const { t } = React.useContext(LanguageContext);

  const slides: HeroSlide[] = [
    {
      title: t.missionTitle,
      description: t.missionDesc,
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
      cta: t.missionCTA,
      onPress: () => {},
    },
    {
      title: t.visionTitle,
      description: t.visionDesc,
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      cta: t.visionCTA,
      onPress: () => {},
    },
    {
      title: t.valuesTitle,
      description: t.valuesDesc,
      image:
        "https://images.unsplash.com/photo-1594220862488-117b78382514?auto=format&fit=crop&w=1200&q=80",
      cta: t.valuesCTA,
      onPress: () => {},
    },
  ];

  const peopleSlides: HeroSlide[] = [
    {
      title: t.anaTitle,
      description: t.anaDesc,
      image:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=400&q=80",
      cta: t.anaCTA,
      onPress: () => {},
    },
    {
      title: t.carlosTitle,
      description: t.carlosDesc,
      image:
        "https://images.unsplash.com/photo-1603415526960-f7e0328f63b1?auto=format&fit=crop&w=400&q=80",
      cta: t.carlosCTA,
      onPress: () => {},
    },
    {
      title: t.marianaTitle,
      description: t.marianaDesc,
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
      cta: t.marianaCTA,
      onPress: () => {},
    },
  ];

  const testimonialSlides: HeroSlide[] = [
    {
      title: t.mariaTitle,
      description: t.mariaDesc,
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      cta: t.readMore,
      onPress: () => {},
    },
    {
      title: t.joaoTitle,
      description: t.joaoDesc,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      cta: t.readMore,
      onPress: () => {},
    },
  ];

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid
      enableAutomaticScroll
      extraScrollHeight={400}
      keyboardOpeningTime={0}
    >
      {/* Hero carousel */}
      <HeroCarousel slides={slides} />

      {/* Who we are */}
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Title
          title={t.whoWeAreTitle}
          titleStyle={{ color: theme.colors.onSurface }}
        />
        <Card.Content>
          <Text style={[styles.text, { color: theme.colors.onSurface }]}>
            {t.whoWeAreDesc}
          </Text>
        </Card.Content>
      </Card>

      {/* Journey funnel */}
      <FunnelSection />

      {/* Highlights */}
      <InfoSlides />

      {/* People involved carousel */}
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Title
          title={t.peopleInvolvedTitle}
          titleStyle={{ color: theme.colors.onSurface }}
        />
        <Card.Content>
          <HeroCarousel slides={peopleSlides} />
        </Card.Content>
      </Card>

      {/* Testimonials carousel */}
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Title
          title={t.testimonialsTitle}
          titleStyle={{ color: theme.colors.onSurface }}
        />
        <Card.Content>
          <HeroCarousel slides={testimonialSlides} />
        </Card.Content>
      </Card>

      {/* Address with icon */}
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Title
          title={t.addressTitle}
          titleStyle={{ color: theme.colors.onSurface }}
        />
        <Card.Content style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="map-marker"
            size={28}
            color={theme.colors.primary}
            style={{ marginRight: 8 }}
          />
          <Text style={[styles.text, { color: theme.colors.onSurface }]}>
            {t.addressValue}
          </Text>
        </Card.Content>
      </Card>

      {/* Contact Form with icons */}
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Title
          title={t.contactUsTitle}
          titleStyle={{ color: theme.colors.onSurface }}
        />
        <Card.Content>
          <TextInput
            label={t.nameLabel}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="account" />}
            theme={{ colors: { primary: theme.colors.primary } }}
          />
          <TextInput
            label={t.emailLabel}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            left={<TextInput.Icon icon="email" />}
            theme={{ colors: { primary: theme.colors.primary } }}
          />
          <TextInput
            label={t.messageLabel}
            mode="outlined"
            style={styles.input}
            multiline
            numberOfLines={4}
            left={<TextInput.Icon icon="message-text" />}
            theme={{ colors: { primary: theme.colors.primary } }}
          />
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => console.log("Message sent")}
          >
            {t.sendMessage}
          </Button>
        </Card.Content>
      </Card>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: { marginVertical: 12 },
  text: { fontSize: 15, lineHeight: 22 },
  input: { marginBottom: 12 },
  button: { marginTop: 8 },
});

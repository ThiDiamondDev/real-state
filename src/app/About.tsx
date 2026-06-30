import { StyleSheet, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Card, TextInput, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FunnelSection from "../components/FunnelSection";
import HeroCarousel, { HeroSlide } from "../components/HeroCarousel";
import InfoSlides from "../components/InfoSlides";

export default function AboutScreen() {
  const theme = useTheme();

  const slides: HeroSlide[] = [
    {
      title: "Our Mission",
      description: "Making property search simple, transparent, and enjoyable.",
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
      cta: "Learn More",
      onPress: () => {},
    },
    {
      title: "Our Vision",
      description:
        "Empowering people to find their dream home with confidence.",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      cta: "Explore Vision",
      onPress: () => {},
    },
    {
      title: "Our Values",
      description:
        "Trust, innovation, and customer focus drive everything we do.",
      image:
        "https://images.unsplash.com/photo-1594220862488-117b78382514?auto=format&fit=crop&w=1200&q=80",
      cta: "Discover Values",
      onPress: () => {},
    },
  ];

  const peopleSlides: HeroSlide[] = [
    {
      title: "Ana — Designer",
      description:
        "Ana crafts intuitive interfaces and ensures every detail feels elegant.",
      image:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=400&q=80",
      cta: "Meet Ana",
      onPress: () => {},
    },
    {
      title: "Carlos — Developer",
      description:
        "Carlos builds robust code and brings innovative features to life.",
      image:
        "https://images.unsplash.com/photo-1603415526960-f7e0328f63b1?auto=format&fit=crop&w=400&q=80",
      cta: "Meet Carlos",
      onPress: () => {},
    },
    {
      title: "Mariana — Specialist",
      description:
        "Mariana connects technology with market expertise to guide users.",
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
      cta: "Meet Mariana",
      onPress: () => {},
    },
  ];

  const testimonialSlides: HeroSlide[] = [
    {
      title: "Maria",
      description:
        "“This platform made finding my apartment effortless!”\nMaria found her dream apartment in São Paulo within days.",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      cta: "Read More",
      onPress: () => {},
    },
    {
      title: "João",
      description:
        "“I compared options quickly and closed a deal in days.”\nJoão used our comparison tools to secure a great deal.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      cta: "Read More",
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
          title="Who We Are"
          titleStyle={{ color: theme.colors.onSurface }}
        />
        <Card.Content>
          <Text style={[styles.text, { color: theme.colors.onSurface }]}>
            We are a passionate team dedicated to transforming the way people
            search, compare, and secure properties. Our platform blends modern
            technology with human‑centered design to make every step of the
            journey smooth and inspiring.
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
          title="People Involved"
          titleStyle={{ color: theme.colors.onSurface }}
        />
        <Card.Content>
          <HeroCarousel slides={peopleSlides} />
        </Card.Content>
      </Card>

      {/* Testimonials carousel */}
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Title
          title="Testimonials"
          titleStyle={{ color: theme.colors.onSurface }}
        />
        <Card.Content>
          <HeroCarousel slides={testimonialSlides} />
        </Card.Content>
      </Card>

      {/* Address with icon */}
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Title
          title="Our Address"
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
            Av. Paulista, 1000 — São Paulo, SP, Brazil
          </Text>
        </Card.Content>
      </Card>

      {/* Contact Form with icons */}
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Title
          title="Contact Us"
          titleStyle={{ color: theme.colors.onSurface }}
        />
        <Card.Content>
          <TextInput
            label="Name"
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="account" />}
            theme={{ colors: { primary: theme.colors.primary } }}
          />
          <TextInput
            label="Email"
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            left={<TextInput.Icon icon="email" />}
            theme={{ colors: { primary: theme.colors.primary } }}
          />
          <TextInput
            label="Message"
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
            Send Message
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

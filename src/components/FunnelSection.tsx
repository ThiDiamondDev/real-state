import { StyleSheet, Text, View } from "react-native";
import { Card, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const steps = [
  {
    icon: "magnify",
    title: "Search",
    description: "Find properties that match your lifestyle.",
  },
  {
    icon: "compare",
    title: "Compare",
    description: "Evaluate options side by side with ease.",
  },
  {
    icon: "phone",
    title: "Contact",
    description: "Reach out directly to owners or agents.",
  },
  {
    icon: "check-circle",
    title: "Close Deal",
    description: "Seal the agreement and move in confidently.",
  },
];

export default function FunnelSection() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.onBackground }]}>
        Your Journey
      </Text>
      {steps.map((s, i) => (
        <Card
          key={i}
          style={[styles.card, { backgroundColor: theme.colors.surface }]}
        >
          <View style={styles.cardContent}>
            <MaterialCommunityIcons
              name={s.icon}
              size={48} // bigger icons
              color={theme.colors.primary}
              style={styles.icon}
            />
            <View style={styles.textBlock}>
              <Text
                style={[styles.cardTitle, { color: theme.colors.onSurface }]}
              >
                {s.title}
              </Text>
              <Text
                style={[styles.description, { color: theme.colors.onSurface }]}
              >
                {s.description}
              </Text>
            </View>
          </View>
        </Card>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  card: { marginBottom: 12, elevation: 2 },
  cardContent: { flexDirection: "row", alignItems: "center", padding: 16 },
  icon: { marginRight: 16 },
  textBlock: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  description: { fontSize: 14 },
});

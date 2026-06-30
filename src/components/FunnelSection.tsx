import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const steps = [
  { icon: "magnify", label: "Search" },
  { icon: "compare", label: "Compare" },
  { icon: "phone", label: "Contact" },
  { icon: "check-circle", label: "Close Deal" },
];

export default function FunnelSection() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.onBackground }]}>
        Your Journey
      </Text>
      <View style={styles.steps}>
        {steps.map((s, i) => (
          <View key={i} style={styles.step}>
            <MaterialCommunityIcons
              name={s.icon}
              size={28}
              color={theme.colors.primary}
            />
            <Text style={[styles.label, { color: theme.colors.onBackground }]}>
              {s.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 16 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  steps: { flexDirection: "row", justifyContent: "space-around" },
  step: { alignItems: "center" },
  label: { marginTop: 4 },
});

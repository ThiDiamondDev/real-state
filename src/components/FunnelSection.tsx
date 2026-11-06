import { LanguageContext } from "@/contexts/LanguageContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, useTheme } from "react-native-paper";

export default function FunnelSection() {
  const theme = useTheme();
  const { t } = React.useContext(LanguageContext);

  const steps = [
    {
      icon: "magnify",
      title: t.searchStepTitle,
      description: t.searchStepDesc,
    },
    {
      icon: "compare",
      title: t.compareStepTitle,
      description: t.compareStepDesc,
    },
    {
      icon: "phone",
      title: t.contactStepTitle,
      description: t.contactStepDesc,
    },
    {
      icon: "check-circle",
      title: t.closeDealStepTitle,
      description: t.closeDealStepDesc,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.onBackground }]}>
        {t.journeyTitle}
      </Text>
      {steps.map((s, i) => (
        <Card
          key={i}
          style={[styles.card, { backgroundColor: theme.colors.surface }]}
        >
          <View style={styles.cardContent}>
            <MaterialCommunityIcons
              name={s.icon}
              size={48}
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

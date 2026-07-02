import { LanguageContext } from "@/contexts/LanguageContext";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, useTheme } from "react-native-paper";

export default function CallToActionSection() {
  const theme = useTheme();
  const { t } = React.useContext(LanguageContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <Text style={[styles.title, { color: theme.colors.onPrimary }]}>
        {t.ctaTitle}
      </Text>
      <Text style={[styles.description, { color: theme.colors.onPrimary }]}>
        {t.ctaDescription}
      </Text>
      <Button
        mode="contained"
        style={styles.button}
        textColor={theme.colors.onPrimary}
      >
        {t.ctaButton}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    borderRadius: 8,
    marginVertical: 16,
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  description: { fontSize: 14, marginBottom: 12 },
  button: { alignSelf: "flex-start" },
});

import { LanguageContext } from "@/contexts/LanguageContext";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function AnnounceForm() {
  const { t } = React.useContext(LanguageContext);

  return (
    <View style={styles.form}>
      <TextInput
        label={t.addressLabel}
        placeholder={t.addressPlaceholder}
        left={<TextInput.Icon icon="home" />}
      />
      <TextInput
        label={t.nameLabel}
        placeholder={t.namePlaceholder}
        left={<TextInput.Icon icon="account" />}
      />
      <View style={{ flexDirection: "row", gap: 8 }}>
        <TextInput
          style={{ flex: 1 }}
          label={t.countryCodeLabel}
          placeholder={t.countryCodePlaceholder}
          left={<TextInput.Icon icon="phone" />}
        />
        <TextInput
          style={{ flex: 2 }}
          label={t.phoneLabel}
          placeholder={t.phonePlaceholder}
        />
      </View>
      <Button mode="contained" style={styles.button}>
        {t.startAnnouncing}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { marginTop: 16, gap: 12 },
  button: { marginTop: 16 },
});

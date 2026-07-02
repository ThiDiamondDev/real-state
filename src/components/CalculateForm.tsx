import { LanguageContext } from "@/contexts/LanguageContext";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function CalculateForm() {
  const { t } = React.useContext(LanguageContext);

  return (
    <View style={styles.form}>
      <TextInput
        label={t.addressLabel}
        placeholder={t.addressPlaceholder}
        left={<TextInput.Icon icon="home" />}
      />
      <TextInput
        label={t.numberLabel}
        placeholder={t.numberPlaceholder}
        left={<TextInput.Icon icon="numeric" />}
      />
      <TextInput
        label={t.complementLabel}
        placeholder={t.complementPlaceholder}
        left={<TextInput.Icon icon="plus" />}
      />
      <TextInput
        label={t.relationLabel}
        placeholder={t.relationPlaceholder}
        left={<TextInput.Icon icon="account-group" />}
      />
      <Button mode="contained" style={styles.button}>
        {t.calculateButton}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { marginTop: 16, gap: 12 },
  button: { marginTop: 16 },
});

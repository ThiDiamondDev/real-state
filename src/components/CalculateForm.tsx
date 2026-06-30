import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function CalculateForm() {
  return (
    <View style={styles.form}>
      <TextInput
        label="Address"
        placeholder="Enter address"
        left={<TextInput.Icon icon="home" />}
      />
      <TextInput
        label="Number"
        placeholder="Enter number"
        left={<TextInput.Icon icon="numeric" />}
      />
      <TextInput
        label="Complement"
        placeholder="Enter complement"
        left={<TextInput.Icon icon="plus" />}
      />
      <TextInput
        label="Relation"
        placeholder="Owner / Tenant"
        left={<TextInput.Icon icon="account-group" />}
      />
      <Button mode="contained" style={styles.button}>
        Calculate
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { marginTop: 16, gap: 12 },
  button: { marginTop: 16 },
});

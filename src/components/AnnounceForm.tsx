import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function AnnounceForm() {
  return (
    <View style={styles.form}>
      <TextInput
        label="Address"
        placeholder="Enter address"
        left={<TextInput.Icon icon="home" />}
      />
      <TextInput
        label="Name"
        placeholder="Your name"
        left={<TextInput.Icon icon="account" />}
      />
      <View style={{ flexDirection: "row", gap: 8 }}>
        <TextInput
          style={{ flex: 1 }}
          label="Country Code"
          placeholder="+55"
          left={<TextInput.Icon icon="phone" />}
        />
        <TextInput
          style={{ flex: 2 }}
          label="Phone"
          placeholder="Enter phone number"
        />
      </View>
      <Button mode="contained" style={styles.button}>
        Start Announcing
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { marginTop: 16, gap: 12 },
  button: { marginTop: 16 },
});

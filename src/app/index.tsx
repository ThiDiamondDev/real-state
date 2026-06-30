import * as React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Card, SegmentedButtons } from "react-native-paper";
import AnnounceForm from "../components/AnnounceForm";
import CalculateForm from "../components/CalculateForm";
import PropertyForm from "../components/PropertyForm";

export default function HomeScreen() {
  const [mode, setMode] = React.useState<"search" | "announce">("search");
  const [subMode, setSubMode] = React.useState<
    "rent" | "buy" | "announce" | "calculate"
  >("rent");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={{ uri: "https://placehold.co/600x200?text=Real+Estate+Hero" }}
          style={styles.hero}
        />

        <SegmentedButtons
          value={mode}
          onValueChange={setMode}
          buttons={[
            { value: "search", label: "Search Property", icon: "magnify" },
            { value: "announce", label: "Announce Property", icon: "bullhorn" },
          ]}
          style={{ marginVertical: 8 }}
        />

        <Card style={{ marginTop: 16 }}>
          <Card.Title
            title={
              mode === "search" ? "Search Properties" : "Announce Property"
            }
          />
          <Card.Content>
            {mode === "search" ? (
              <>
                <SegmentedButtons
                  value={subMode}
                  onValueChange={(val) => setSubMode(val as "rent" | "buy")}
                  buttons={[
                    { value: "rent", label: "Rent", icon: "key" },
                    { value: "buy", label: "Buy", icon: "cash" },
                  ]}
                  style={{ marginVertical: 8 }}
                />
                <PropertyForm type={subMode as "rent" | "buy"} />
              </>
            ) : (
              <>
                <SegmentedButtons
                  value={subMode}
                  onValueChange={(val) =>
                    setSubMode(val as "announce" | "calculate")
                  }
                  buttons={[
                    { value: "announce", label: "Announce", icon: "bullhorn" },
                    {
                      value: "calculate",
                      label: "Calculate",
                      icon: "calculator",
                    },
                  ]}
                  style={{ marginVertical: 8 }}
                />
                {subMode === "announce" ? <AnnounceForm /> : <CalculateForm />}
              </>
            )}
          </Card.Content>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16 },
  hero: { width: "100%", height: 200, marginBottom: 16 },
});

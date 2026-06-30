import * as React from "react";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Menu, Portal, TextInput, useTheme } from "react-native-paper";

export default function PropertyForm({ type }: { type: "rent" | "buy" }) {
  const theme = useTheme();

  // State
  const [cityMenu, setCityMenu] = React.useState(false);
  const [city, setCity] = React.useState("");

  const [district, setDistrict] = React.useState("");

  const [valueMenu, setValueMenu] = React.useState(false);
  const [value, setValue] = React.useState("");

  const [roomsMenu, setRoomsMenu] = React.useState(false);
  const [rooms, setRooms] = React.useState("");

  // Format price in R$
  const formattedValue =
    value && !isNaN(Number(value))
      ? new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(Number(value))
      : "";

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      extraScrollHeight={80}
      keyboardOpeningTime={0}
      contentContainerStyle={styles.form}
    >
      {/* City Dropdown */}
      <Portal>
        <Menu
          visible={cityMenu}
          onDismiss={() => setCityMenu(false)}
          anchor={
            <TextInput
              label="City"
              value={city}
              left={<TextInput.Icon icon="city" />}
              editable={false} // prevents keyboard
              onPressIn={() => setCityMenu(true)} // open menu
              style={styles.input}
              mode="outlined"
              theme={{ colors: { primary: theme.colors.primary } }}
            />
          }
        >
          {["São Paulo", "Rio de Janeiro", "Brasília"].map((c) => (
            <Menu.Item
              key={c}
              onPress={() => {
                setCity(c);
                setCityMenu(false);
              }}
              title={c}
            />
          ))}
        </Menu>
      </Portal>

      {/* District input */}
      <TextInput
        label="District"
        placeholder="Enter district"
        left={<TextInput.Icon icon="map" />}
        value={district}
        onChangeText={setDistrict}
        style={styles.input}
        mode="outlined"
        theme={{ colors: { primary: theme.colors.primary } }}
      />

      {/* Value Dropdown (Max Price) */}
      <Portal>
        <Menu
          visible={valueMenu}
          onDismiss={() => setValueMenu(false)}
          anchor={
            <TextInput
              label={type === "rent" ? "Max Rent (R$)" : "Max Price (R$)"}
              value={formattedValue || value}
              left={<TextInput.Icon icon="currency-usd" />}
              editable={false}
              onPressIn={() => setValueMenu(true)}
              style={styles.input}
              mode="outlined"
              theme={{ colors: { primary: theme.colors.primary } }}
            />
          }
        >
          {["1000", "2000", "3000", "5000"].map((v) => (
            <Menu.Item
              key={v}
              onPress={() => {
                setValue(v);
                setValueMenu(false);
              }}
              title={new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(v))}
            />
          ))}
        </Menu>
      </Portal>

      {/* Rooms Dropdown */}
      <Portal>
        <Menu
          visible={roomsMenu}
          onDismiss={() => setRoomsMenu(false)}
          anchor={
            <TextInput
              label="Rooms"
              value={rooms}
              left={<TextInput.Icon icon="bed" />}
              editable={false}
              onPressIn={() => setRoomsMenu(true)}
              style={styles.input}
              mode="outlined"
              theme={{ colors: { primary: theme.colors.primary } }}
            />
          }
        >
          {["1+", "2+", "3+", "4+"].map((r) => (
            <Menu.Item
              key={r}
              onPress={() => {
                setRooms(r);
                setRoomsMenu(false);
              }}
              title={r}
            />
          ))}
        </Menu>
      </Portal>

      {/* Submit button */}
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => {
          console.log("Search with:", { type, city, district, rooms, value });
        }}
      >
        Search
      </Button>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  form: { flexGrow: 1, paddingVertical: 8 },
  input: { marginBottom: 12 },
  button: { marginTop: 16 },
});

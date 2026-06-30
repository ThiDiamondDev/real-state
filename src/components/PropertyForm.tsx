import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Menu, TextInput } from "react-native-paper";

export default function PropertyForm({ type }: { type: "rent" | "buy" }) {
  const [cityMenu, setCityMenu] = React.useState(false);
  const [city, setCity] = React.useState("");
  const [roomsMenu, setRoomsMenu] = React.useState(false);
  const [rooms, setRooms] = React.useState("");
  const [valueMenu, setValueMenu] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <View style={styles.form}>
      {/* City Dropdown */}
      <Menu
        visible={cityMenu}
        onDismiss={() => setCityMenu(false)}
        anchor={
          <TextInput
            label="City"
            value={city}
            placeholder="Search for city"
            left={<TextInput.Icon icon="city" />}
            onFocus={() => setCityMenu(true)}
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

      <TextInput
        label="District"
        placeholder="Enter district"
        left={<TextInput.Icon icon="map" />}
      />

      {/* Value Dropdown */}
      <Menu
        visible={valueMenu}
        onDismiss={() => setValueMenu(false)}
        anchor={
          <TextInput
            label={type === "rent" ? "Rent Value" : "Price Range"}
            value={value}
            placeholder="Select a value"
            left={<TextInput.Icon icon="currency-usd" />}
            onFocus={() => setValueMenu(true)}
          />
        }
      >
        {["1000-2000", "2000-3000", "3000+"].map((v) => (
          <Menu.Item
            key={v}
            onPress={() => {
              setValue(v);
              setValueMenu(false);
            }}
            title={v}
          />
        ))}
      </Menu>

      {/* Rooms Dropdown */}
      <Menu
        visible={roomsMenu}
        onDismiss={() => setRoomsMenu(false)}
        anchor={
          <TextInput
            label="Rooms"
            value={rooms}
            placeholder="Select rooms"
            left={<TextInput.Icon icon="bed" />}
            onFocus={() => setRoomsMenu(true)}
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

      <Button mode="contained" style={styles.button}>
        Search
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { marginTop: 16, gap: 12 },
  button: { marginTop: 16 },
});

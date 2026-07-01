import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Menu, Portal, TextInput, useTheme } from "react-native-paper";

interface PropertyFormProps {
  type: "rent" | "buy";
  onSearch?: (filters: {
    type: "rent" | "buy";
    city: string;
    district: string;
    rooms: string;
    value: string;
  }) => void;
}

export default function PropertyForm({ type, onSearch }: PropertyFormProps) {
  const theme = useTheme();

  const [cityMenu, setCityMenu] = React.useState(false);
  const [city, setCity] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [valueMenu, setValueMenu] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [roomsMenu, setRoomsMenu] = React.useState(false);
  const [rooms, setRooms] = React.useState("");

  const formattedValue =
    value && !isNaN(Number(value))
      ? new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(Number(value))
      : "";

  const handleSubmit = () => {
    const filters = { type, city, district, rooms, value };
    console.log("Search with:", filters);
    if (onSearch) {
      onSearch(filters);
    }
  };

  return (
    <View style={styles.form}>
      {/* City Dropdown */}
      <View>
        <TextInput
          label="City"
          value={city}
          left={<TextInput.Icon icon="city" />}
          editable
          style={styles.input}
          mode="outlined"
          theme={{ colors: { primary: theme.colors.primary } }}
          onPressIn={() => setCityMenu(true)}
        />
        <Portal>
          <Menu
            visible={cityMenu}
            onDismiss={() => setCityMenu(false)}
            anchor={<View style={{ width: 1, height: 1 }} />}
            style={{ marginLeft: 200, marginTop: 100 }}
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
      </View>

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

      {/* Value Dropdown */}
      <View>
        <TextInput
          label={type === "rent" ? "Max Rent (R$)" : "Max Price (R$)"}
          value={formattedValue || value}
          left={<TextInput.Icon icon="currency-usd" />}
          editable
          style={styles.input}
          mode="outlined"
          theme={{ colors: { primary: theme.colors.primary } }}
          onPressIn={() => setValueMenu(true)}
        />
        <Portal>
          <Menu
            visible={valueMenu}
            onDismiss={() => setValueMenu(false)}
            anchor={<View style={{ width: 1, height: 1 }} />}
            style={{ marginLeft: 200, marginTop: 100 }}
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
      </View>

      {/* Rooms Dropdown */}
      <View>
        <TextInput
          label="Rooms"
          value={rooms}
          left={<TextInput.Icon icon="bed" />}
          editable
          style={styles.input}
          mode="outlined"
          theme={{ colors: { primary: theme.colors.primary } }}
          onPressIn={() => setRoomsMenu(true)}
        />
        <Portal>
          <Menu
            visible={roomsMenu}
            onDismiss={() => setRoomsMenu(false)}
            anchor={<View style={{ width: 1, height: 1 }} />}
            style={{ marginLeft: 200, marginTop: 100 }}
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
      </View>

      {/* Submit button */}
      <Button mode="contained" style={styles.button} onPress={handleSubmit}>
        Search
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { flexGrow: 1, paddingVertical: 8 },
  input: { marginBottom: 12 },
  button: { marginTop: 16 },
});

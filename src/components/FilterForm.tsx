import * as React from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  IconButton,
  Menu,
  Portal,
  ProgressBar,
  SegmentedButtons,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";

export interface Filters {
  city: string;
  district: string;
  value: number;
  rooms: string;
  type: "apartment" | "house" | "terrain" | "";
  petsAllowed: boolean;
  nearMetro: boolean;
  carSpaces: number;
}

export default function FilterForm({
  onSearch,
}: {
  onSearch: (filters: Filters) => void;
}) {
  const theme = useTheme();

  const [cityMenu, setCityMenu] = React.useState(false);
  const [city, setCity] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [value, setValue] = React.useState(3000);
  const [rooms, setRooms] = React.useState("");
  const [roomsMenu, setRoomsMenu] = React.useState(false);
  const [type, setType] = React.useState<Filters["type"]>("");
  const [petsAllowed, setPetsAllowed] = React.useState(false);
  const [nearMetro, setNearMetro] = React.useState(false);
  const [carSpaces, setCarSpaces] = React.useState(0);
  const [carMenu, setCarMenu] = React.useState(false);

  const maxPrice = 10000;

  return (
    <View style={styles.form}>
      {/* City */}
      <TextInput
        label="City"
        value={city}
        left={<TextInput.Icon icon="city" />}
        style={styles.input}
        mode="outlined"
        onPressIn={() => setCityMenu(true)}
      />
      <Portal>
        <Menu
          visible={cityMenu}
          onDismiss={() => setCityMenu(false)}
          anchor={<View style={{ width: 1, height: 1 }} />}
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

      {/* District */}
      <TextInput
        label="District"
        value={district}
        left={<TextInput.Icon icon="map" />}
        style={styles.input}
        mode="outlined"
        onChangeText={setDistrict}
      />

      {/* Max Price Slider substitute */}
      <Text style={styles.label}>
        Max Price:{" "}
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(value)}
      </Text>
      <ProgressBar
        progress={value / maxPrice}
        color={theme.colors.primary}
        style={{ height: 8, borderRadius: 4 }}
      />
      <View style={styles.sliderRow}>
        <IconButton
          icon="minus"
          onPress={() => setValue(Math.max(1000, value - 500))}
        />
        <IconButton
          icon="plus"
          onPress={() => setValue(Math.min(maxPrice, value + 500))}
        />
      </View>

      {/* Rooms */}
      <TextInput
        label="Rooms"
        value={rooms}
        left={<TextInput.Icon icon="bed" />}
        style={styles.input}
        mode="outlined"
        onPressIn={() => setRoomsMenu(true)}
      />
      <Portal>
        <Menu
          visible={roomsMenu}
          onDismiss={() => setRoomsMenu(false)}
          anchor={<View style={{ width: 1, height: 1 }} />}
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

      {/* Type */}
      <SegmentedButtons
        value={type}
        onValueChange={(val) => setType(val as Filters["type"])}
        buttons={[
          { value: "apartment", label: "Apartment", icon: "office-building" },
          { value: "house", label: "House", icon: "home" },
          { value: "terrain", label: "Terrain", icon: "tree" },
        ]}
        style={{ marginVertical: 8 }}
      />

      {/* Car Spaces Dropdown */}
      <TextInput
        label="Car Spaces"
        value={carSpaces.toString()}
        left={<TextInput.Icon icon="car" />}
        style={styles.input}
        mode="outlined"
        onPressIn={() => setCarMenu(true)}
      />
      <Portal>
        <Menu
          visible={carMenu}
          onDismiss={() => setCarMenu(false)}
          anchor={<View style={{ width: 1, height: 1 }} />}
        >
          {[0, 1, 2, 3].map((c) => (
            <Menu.Item
              key={c}
              onPress={() => {
                setCarSpaces(c);
                setCarMenu(false);
              }}
              title={`${c}`}
            />
          ))}
        </Menu>
      </Portal>

      {/* Icon Toggles */}
      <View style={styles.iconRow}>
        <IconButton
          icon="dog"
          selected={petsAllowed}
          onPress={() => setPetsAllowed(!petsAllowed)}
          iconColor={
            petsAllowed ? theme.colors.primary : theme.colors.onSurface
          }
        />
        <Text style={styles.iconLabel}>Pets Allowed</Text>
      </View>
      <View style={styles.iconRow}>
        <IconButton
          icon="subway"
          selected={nearMetro}
          onPress={() => setNearMetro(!nearMetro)}
          iconColor={nearMetro ? theme.colors.primary : theme.colors.onSurface}
        />
        <Text style={styles.iconLabel}>Near Metro</Text>
      </View>

      <Button
        mode="contained"
        style={styles.button}
        onPress={() =>
          onSearch({
            city,
            district,
            value,
            rooms,
            type,
            petsAllowed,
            nearMetro,
            carSpaces,
          })
        }
      >
        Search
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { flexGrow: 1, paddingVertical: 8 },
  input: { marginBottom: 12 },
  button: { marginTop: 16 },
  label: { marginBottom: 8, fontWeight: "bold" },
  sliderRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 8,
  },
  iconRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  iconLabel: { marginLeft: 8 },
});

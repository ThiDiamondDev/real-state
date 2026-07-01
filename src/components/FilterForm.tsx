import Slider from "@react-native-community/slider";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  IconButton,
  Menu,
  Portal,
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
  rentOrBuy: "rent" | "buy" | "";
  petsAllowed: boolean;
  nearMetro: boolean;
  carSpaces: number;
}

export default function FilterForm({
  onSearch,
  initialFilters,
}: {
  onSearch: (filters: Filters) => void;
  initialFilters?: Partial<Filters>;
}) {
  const theme = useTheme();

  // ✅ initialize once from initialFilters
  const [city, setCity] = React.useState(initialFilters?.city || "");
  const [district, setDistrict] = React.useState(
    initialFilters?.district || "",
  );
  const [value, setValue] = React.useState(initialFilters?.value ?? 3000);
  const [rooms, setRooms] = React.useState(initialFilters?.rooms || "");
  const [type, setType] = React.useState<Filters["type"]>(
    initialFilters?.type || "",
  );
  const [rentOrBuy, setRentOrBuy] = React.useState<Filters["rentOrBuy"]>(
    initialFilters?.rentOrBuy || "",
  );
  const [petsAllowed, setPetsAllowed] = React.useState(
    initialFilters?.petsAllowed || false,
  );
  const [nearMetro, setNearMetro] = React.useState(
    initialFilters?.nearMetro || false,
  );
  const [carSpaces, setCarSpaces] = React.useState(
    initialFilters?.carSpaces || 0,
  );

  const [cityMenu, setCityMenu] = React.useState(false);
  const [roomsMenu, setRoomsMenu] = React.useState(false);
  const [carMenu, setCarMenu] = React.useState(false);

  const maxPrice = 10000;

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Card.Content>
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
            anchor={<View />}
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

        {/* Max Price Slider */}
        <Text style={styles.label}>
          Max Price:{" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(value)}
        </Text>
        <Slider
          minimumValue={1000}
          maximumValue={maxPrice}
          step={500}
          value={value}
          onValueChange={setValue}
          minimumTrackTintColor={theme.colors.primary}
          maximumTrackTintColor={theme.colors.surfaceVariant}
          thumbTintColor={theme.colors.primary}
          style={{ marginVertical: 12, height: 40 }} // thicker bar
        />

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
            anchor={<View />}
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

        {/* Rent/Buy */}
        <SegmentedButtons
          value={rentOrBuy}
          onValueChange={(val) =>
            setRentOrBuy(rentOrBuy === val ? "" : (val as Filters["rentOrBuy"]))
          }
          buttons={[
            { value: "rent", label: "Rent", icon: "key-outline" },
            { value: "buy", label: "Buy", icon: "cash-multiple" },
          ]}
          style={{ marginVertical: 8 }}
        />

        {/* Type */}
        <SegmentedButtons
          value={type}
          onValueChange={(val) =>
            setType(type === val ? "" : (val as Filters["type"]))
          }
          buttons={[
            { value: "apartment", label: "Apartment", icon: "office-building" },
            { value: "house", label: "House", icon: "home" },
            { value: "terrain", label: "Terrain", icon: "tree" },
          ]}
          style={{ marginVertical: 8 }}
        />

        {/* Car Spaces */}
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
            anchor={<View />}
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

        {/* Toggles */}
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
            iconColor={
              nearMetro ? theme.colors.primary : theme.colors.onSurface
            }
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
              rentOrBuy,
              petsAllowed,
              nearMetro,
              carSpaces,
            })
          }
        >
          Search
        </Button>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginVertical: 12, borderRadius: 12, elevation: 2 },
  input: { marginBottom: 12 },
  button: { marginTop: 16 },
  label: { marginBottom: 8, fontWeight: "bold" },
  iconRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  iconLabel: { marginLeft: 8 },
});

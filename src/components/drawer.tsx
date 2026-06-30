import { createDrawerNavigator } from "@react-navigation/drawer";
import * as React from "react";
import { Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import type { DrawerParamList, DrawerProps } from "../types/navigation";

const Drawer = createDrawerNavigator<DrawerParamList>();

// Custom header only needs navigation
function CustomHeader({
  navigation,
}: {
  navigation: DrawerProps<any>["navigation"];
}) {
  return (
    <Appbar.Header>
      <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
      <Appbar.Content title="Real State" />
      <Appbar.Action icon="home" />
    </Appbar.Header>
  );
}

// Wrapper for screens
function ScreenWrapper({
  children,
  navigation,
}: {
  children: React.ReactNode;
  navigation: DrawerProps<any>["navigation"];
}) {
  return (
    <>
      <CustomHeader navigation={navigation} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {children}
      </View>
    </>
  );
}

function FavoritesScreen({ navigation }: DrawerProps<"Favorites">) {
  return (
    <ScreenWrapper navigation={navigation}>
      <Text>Favorite Properties Page</Text>
    </ScreenWrapper>
  );
}

function AboutScreen({ navigation }: DrawerProps<"About">) {
  return (
    <ScreenWrapper navigation={navigation}>
      <Text>About Page</Text>
    </ScreenWrapper>
  );
}

function RentScreen({ navigation }: DrawerProps<"Rent">) {
  return (
    <ScreenWrapper navigation={navigation}>
      <Text>Rent Page</Text>
    </ScreenWrapper>
  );
}

function BuyScreen({ navigation }: DrawerProps<"Buy">) {
  return (
    <ScreenWrapper navigation={navigation}>
      <Text>Buy Page</Text>
    </ScreenWrapper>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Favorites" component={FavoritesScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
      <Drawer.Screen name="Rent" component={RentScreen} />
      <Drawer.Screen name="Buy" component={BuyScreen} />
    </Drawer.Navigator>
  );
}

// types/navigation.ts
import type { DrawerScreenProps } from "@react-navigation/drawer";

export type DrawerParamList = {
  Favorites: undefined;
  About: undefined;
  Rent: undefined;
  Buy: undefined;
};

// Shortcut type for screens
export type DrawerProps<T extends keyof DrawerParamList> = DrawerScreenProps<
  DrawerParamList,
  T
>;

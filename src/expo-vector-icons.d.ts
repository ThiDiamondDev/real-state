declare module "@expo/vector-icons" {
  import { IconProps } from "@expo/vector-icons/Icon";
  import React from "react";

  export const MaterialCommunityIcons: React.ComponentType<IconProps>;
  export const Ionicons: React.ComponentType<IconProps>;
  export const FontAwesome: React.ComponentType<IconProps>;
  // add others if you use them
}

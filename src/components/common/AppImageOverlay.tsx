import React from "react";
import {View, ViewStyle} from "react-native";

export default function AppImageOverlay({style}: {style?: ViewStyle}) {
  return (
    <View
      style={[
        {
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.3)",
          position: "absolute",
        },
        style,
      ]}
    />
  );
}

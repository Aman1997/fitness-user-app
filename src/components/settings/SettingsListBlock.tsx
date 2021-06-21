import React from "react";
import {Text, View, TouchableWithoutFeedback} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {scale, ScaledSheet} from "react-native-size-matters";
import {CONTENT, ICONS} from "../../assets/constants/colors";

interface IProps {
  icon: string;
  text: string;
  onPressHandle?: () => void;
}

export default function SettingsListBlock({icon, text, onPressHandle}: IProps) {
  return (
    <TouchableWithoutFeedback onPress={onPressHandle}>
      <View style={styles.container}>
        {/* @ts-ignore */}
        <AntDesign name={icon} size={scale(20)} color={ICONS} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    padding: "10@s",
    alignItems: "center",
  },
  text: {
    color: CONTENT,
    fontSize: "14@s",
    paddingHorizontal: "20@s",
  },
});

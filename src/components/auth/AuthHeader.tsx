import React from "react";
import { Text, View} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import AppPageTitle from "../common/AppPageTitle";

interface IProps {
  text1: string;
  text2: string;
}

export default function AuthHeader({text1, text2}: IProps) {
  return (
    <View>
      <AppPageTitle pageTitle={text1} />
      <Text style={styles.descText}>{text2}</Text>
    </View>
  );
}

const styles = ScaledSheet.create({
    descText: {
        color: "#929290",
        fontSize: "16@s",
        fontWeight: "500",
      },
});

import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {scale} from "react-native-size-matters";
import {CONTENT, HEAD_TEXT} from "../../assets/constants/colors";

interface IProps {
  bgColor: string;
  numericalText: string;
  contentText: string;
}

const AboutCard = ({bgColor, numericalText, contentText}: IProps) => {
  return (
    <View
      style={{
        backgroundColor: bgColor,
        borderRadius: scale(20),
        height: scale(140),
        width: scale(120),
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{color: HEAD_TEXT, fontSize: scale(34), fontWeight: "bold"}}>
        {numericalText}
      </Text>
      <Text
        style={{
          color: CONTENT,
          fontSize: scale(13),
          textAlign: "center",
          marginTop: scale(12),
          paddingHorizontal: scale(15),
        }}
      >
        {contentText}
      </Text>
    </View>
  );
};

export default AboutCard;

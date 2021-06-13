import React from "react";
import {Platform, Text, View, ViewStyle} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {APP_MARGIN_HORIZONTAL} from "../../assets/constants/styles";
import {AntDesign} from "@expo/vector-icons";
import {
  CONTENT,
  HEAD_TEXT,
  PAGE_TITLE_COLOR,
  PRIMARY,
} from "../../assets/constants/colors";
import AppSeparator from "../common/AppSeparator";

const DATA = {
  name: "The Gold's gym",
  ratings: "4.7",
  location: "C-145, Janak Puri, New Delhi, India",
  about:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
};

interface IProps {
  name: string;
  ratings?: string;
  address: string;
  about: string;
}

export default function DetailsView({name, ratings, address, about}: IProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <View style={{flexDirection: "row", alignItems: "center"}}>
        {ratings ? (
          <>
            <AntDesign name="star" size={scale(14)} color={PRIMARY} />
            <Text
              style={{
                paddingLeft: scale(5),
                fontSize: scale(10),
                color: CONTENT,
              }}
            >
              {ratings}/5.0
            </Text>
          </>
        ) : null}
      </View>
      <Text
        style={{
          fontSize: scale(12),
          marginTop: scale(5),
          color: CONTENT,
        }}
      >
        {address}
      </Text>
      <AppSeparator style={{marginVertical: scale(20)}} />

      {/* About */}
      <Text style={styles.headingText}>about</Text>
      <Text style={styles.textBody}>{about}</Text>

      <AppSeparator style={{marginVertical: scale(20)}} />
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    marginTop: "20@s",
    marginHorizontal: APP_MARGIN_HORIZONTAL,
  },
  name: {
    fontSize: "16@s",
    fontWeight: "bold",
    marginBottom: "10@s",
    textTransform: "capitalize",
    color: PAGE_TITLE_COLOR,
  },
  headingText: {
    textTransform: "capitalize",
    fontWeight: "500",
    fontSize: "15@s",
    marginBottom: "10@s",
    color: HEAD_TEXT,
  },
  textBody: {
    fontSize: "14@s",
    marginVertical: "10@s",
    color: CONTENT,
  },
});

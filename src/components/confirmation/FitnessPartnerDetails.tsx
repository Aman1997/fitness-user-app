import React from "react";
import {Image, Text, View} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {APP_MARGIN_HORIZONTAL} from "../../assets/constants/styles";
import {AntDesign} from "@expo/vector-icons";
import {CONTENT, HEAD_TEXT, PRIMARY} from "../../assets/constants/colors";

interface IProps {
  imageUrl: string;
  name: string;
  ratings: number | undefined;
  address: string;
}

export default function FitnessPartnerDetails({
  imageUrl,
  name,
  ratings,
  address,
}: IProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        marginHorizontal: APP_MARGIN_HORIZONTAL,
        marginVertical: scale(20),
      }}
    >
      <Image source={{uri: imageUrl}} style={styles.image} />

      <View style={{marginHorizontal: scale(10), flex: 1}}>
        <Text style={styles.name}>{name}</Text>
        {ratings ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: scale(8),
            }}
          >
            <AntDesign name="star" size={scale(14)} color={PRIMARY} />
            <Text
              style={{
                paddingLeft: scale(5),
                fontSize: scale(12),
              }}
            >
              {"rating"}/5.0
            </Text>
          </View>
        ) : null}
        <Text style={styles.address}>{address} </Text>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  image: {
    height: "85@s",
    width: "110@s",
    borderRadius: "8@s",
  },
  name: {
    fontSize: "14@s",
    fontWeight: "500",
    textTransform: "capitalize",
    color: HEAD_TEXT,
  },
  address: {
    marginTop: "10@s",
    fontSize: "13@s",
    textTransform: "capitalize",
    color: CONTENT,
  },
});

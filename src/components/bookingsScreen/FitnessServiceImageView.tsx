import React from "react";
import {Image, Text, View} from "react-native";
import {Entypo} from "@expo/vector-icons";
import {ICONS, WHITE} from "../../assets/constants/colors";
import Constants from "expo-constants";
import {APP_MARGIN_HORIZONTAL} from "../../assets/constants/styles";
import {useNavigation} from "@react-navigation/native";
import {format} from "date-fns";
import {scale, ScaledSheet} from "react-native-size-matters";
import AppImageOverlay from "../common/AppImageOverlay";

interface IProps {
  data: {
    imageUrl: string;
    name: string;
    bookingDate: string;
    timeSlot: string;
  };
}


export default function FitnessServiceImageView({data}: IProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.imageContainer}>
      <Image source={{uri: data.imageUrl}} style={styles.image} />
      <AppImageOverlay />

      {/* Back Button */}
      <View
        style={{
          position: "absolute",
          zIndex: 3,
          height: "100%",
          width: "100%",
        }}
      >
        <View
          style={{
            height: scale(28),
            width: scale(28),
            backgroundColor: WHITE,
            justifyContent: "center",
            alignItems: "center",
            marginLeft: APP_MARGIN_HORIZONTAL,
            marginTop: Constants.statusBarHeight,
            borderRadius: scale(14),
          }}
        >
          <Entypo
            name="cross"
            size={scale(22)}
            color={ICONS}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View
          style={{
            flex: 1,
            position: "relative",
            justifyContent: "flex-end",
            paddingLeft: APP_MARGIN_HORIZONTAL,
            paddingBottom: scale(15),
          }}
        >
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.date}>
            {format(new Date(data.bookingDate), "dd MMMM yyyy")},{" "}
            {data.timeSlot}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  imageContainer: {
    height: "250@s",
    width: "100%",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  name: {
    fontWeight: "bold",
    color: WHITE,
    fontSize: "17@s",
    textTransform: "capitalize",
  },
  date: {
    color: WHITE,
    fontSize: "14@s",
    marginTop: "5@s",
  },
});

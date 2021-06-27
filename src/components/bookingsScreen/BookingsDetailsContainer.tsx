import React from "react";
import {Image, Text, View} from "react-native";
import {Entypo} from "@expo/vector-icons";
import MapView, {Marker} from "react-native-maps";
import {scale, ScaledSheet} from "react-native-size-matters";
import {
  CONTENT,
  ICONS,
  OFF_WHITE,
  PRIMARY,
} from "../../assets/constants/colors";
import {APP_MARGIN_HORIZONTAL} from "../../assets/constants/styles";

interface IProps {
  data: {
    trainerImageUrl: string;
    trainerName: string;
    pin: number;
    longitude: string;
    latitude: string;
  };
}

export default function BookingsDetailsContainer({data}: IProps) {
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.gymPOCContainer}>
        <Image
          source={
            data.trainerImageUrl
              ? {
                  uri: data.trainerImageUrl,
                }
              : require("../../assets/images/user.png")
          }
          style={styles.gymPOCImage}
        />
        <Text style={styles.gymPOCText}>
          Hi, I am {data.trainerName}. I'll be looking after your workout
        </Text>
      </View>

      <View style={styles.pinContainer}>
        <Entypo name="lock" size={scale(scale(22))} color={ICONS} />
        <View style={{paddingHorizontal: scale(12)}}>
          <Text style={styles.pin}>PIN: {data.pin}</Text>
          <Text style={styles.pinText}>
            Share the pin with the fitness partner.
          </Text>
        </View>
      </View>
      <View style={styles.locationContainer}>
        <MapView
          style={{flex: 1, borderRadius: scale(20)}}
          region={{
            latitude: parseFloat(data.latitude),
            longitude: parseFloat(data.longitude),
            latitudeDelta: 0.0001,
            longitudeDelta: 0.0015,
          }}
        >
          <Marker
            coordinate={{
              latitude: parseFloat(data.latitude),
              longitude: parseFloat(data.longitude),
            }}
          />
        </MapView>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  detailsContainer: {
    marginHorizontal: APP_MARGIN_HORIZONTAL,
    marginVertical: "15@s",
  },

  gymPOCContainer: {
    flexDirection: "row",
    height: "68@s",
    width: "100%",
    backgroundColor: OFF_WHITE,
    borderRadius: "20@s",
    marginVertical: "10@s",
    alignItems: "center",
    paddingHorizontal: "20@s",
  },
  gymPOCImage: {
    height: "24@s",
    width: "24@s",
    borderRadius: "23@s",
  },
  gymPOCText: {
    paddingHorizontal: "12@s",
    fontSize: "14@s",
    color: CONTENT,
  },
  pinContainer: {
    flexDirection: "row",
    height: "68@s",
    width: "100%",
    backgroundColor: OFF_WHITE,
    borderRadius: "20@s",
    marginTop: "5@s",
    marginBottom: "10@s",
    alignItems: "center",
    paddingHorizontal: "20@s",
  },
  pin: {
    fontSize: "14@s",
    fontWeight: "400",
    color: CONTENT,
  },
  pinText: {
    fontSize: "14@s",
    color: PRIMARY,
    paddingTop: "5@s",
  },
  locationContainer: {
    height: "200@s",
    width: "100%",
    borderRadius: "20@s",
    marginTop: "5@s",
    marginBottom: "10@s",
  },
});

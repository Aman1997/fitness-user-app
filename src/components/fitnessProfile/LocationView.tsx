import React from "react";
import {Text, View} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {HEAD_TEXT} from "../../assets/constants/colors";
import MapView, {Marker} from "react-native-maps";
import {APP_MARGIN_HORIZONTAL} from "../../assets/constants/styles";
import AppSeparator from "../common/AppSeparator";

export default function LocationView({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  return (
    <View style={styles.mapView}>
      <Text style={styles.headingText}>Location</Text>
      <MapView
        style={{flex: 1, borderRadius: scale(10), height: scale(180)}}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.004,
        }}
      >
        <Marker
          coordinate={{
            latitude,
            longitude,
          }}
        />
      </MapView>

      <AppSeparator style={{marginBottom: scale(20), marginTop: scale(30)}} />
    </View>
  );
}

const styles = ScaledSheet.create({
  headingText: {
    textTransform: "capitalize",
    fontWeight: "500",
    fontSize: "15@s",
    marginBottom: "20@s",
    color: HEAD_TEXT,
  },
  mapView: {
    marginHorizontal: APP_MARGIN_HORIZONTAL,
  },
});

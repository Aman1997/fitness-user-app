import React from "react";
import {Text, View} from "react-native";
import * as Updates from 'expo-updates';
import { HEAD_TEXT, PRIMARY } from "../../assets/constants/colors";
import AppButton from "./AppButton";
import { scale, ScaledSheet } from "react-native-size-matters";
import LottieView from "lottie-react-native";


export default function NoInternet() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/lotties/no-internet.json")}
        loop
        autoPlay
        style={{width: "80%"}}
      />
      <Text style={styles.headText}>Whoops!</Text>
      <Text style={styles.descriptionText}>
        There seems to be a problem with your internet connection. Please check
        you internet settings.
      </Text>

      <AppButton
        text="Try Again"
        textStyle={{
          color: "#fff",
          fontWeight: "500",
          fontSize: scale(16),
        }}
        containerStyle={{
          borderRadius: scale(20),
          marginVertical: scale(30),
          backgroundColor: PRIMARY,
          paddingHorizontal: scale(20),
          paddingVertical: scale(10),
        }}
        onPressHandle={async () => await Updates.reloadAsync()}
      />
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headText: {
    fontWeight: "bold",
    color: PRIMARY,
    fontSize: "30@s",
    letterSpacing: 1.2,
    marginTop: "30@s",
  },
  descriptionText: {
    width: "75%",
    textAlign: "center",
    marginTop: "20@s",
    color: HEAD_TEXT,
  },
});

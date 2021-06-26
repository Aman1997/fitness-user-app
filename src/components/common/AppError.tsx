import React from "react";
import {Text, View} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {CONTENT, DANGER, PRIMARY} from "../../assets/constants/colors";
import AppButton from "./AppButton";
import LottieView from "lottie-react-native";
import {useNavigation} from "@react-navigation/core";
import {StackNavigationProp} from "@react-navigation/stack";
import * as Updates from "expo-updates";

export default function AppError() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  return (
    <View style={styles.container}>
      <View style={{height: 300, width: 200, alignItems: "center"}}>
        <LottieView
          source={require("../../assets/lotties/44656-error.json")}
          autoPlay
          loop
          style={{height: "100%", width: "100%"}}
        />
      </View>
      <Text style={styles.dangerText}>Oh No!</Text>
      <Text style={styles.text}>Something went wrong</Text>
      <Text style={styles.detailText}>
        We are looking into the issue. Please try again after sometime.
      </Text>

      <AppButton
        text="Return to home"
        textStyle={{
          color: "#fff",
          fontSize: scale(16),
          fontWeight: "500",
        }}
        containerStyle={{
          backgroundColor: PRIMARY,
          paddingVertical: scale(15),
          paddingHorizontal: scale(30),
          borderRadius: scale(25),
        }}
        onPressHandle={async () => await Updates.reloadAsync()}
      />
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  dangerText: {
    fontWeight: "bold",
    fontSize: "25@s",
    color: DANGER,
    marginTop: "30@s",
  },
  text: {
    marginTop: "15@s",
    fontWeight: "500",
  },
  detailText: {
    width: "70%",
    textAlign: "center",
    marginTop: "10@s",
    marginBottom: "20@s",
    color: CONTENT,
  },
});

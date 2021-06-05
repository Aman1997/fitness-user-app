import React from "react";
import {StyleSheet, Text, View} from "react-native";
import LottieView from "lottie-react-native";

export default function LoadingIndicator() {
  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        loop
        source={require("../../../assets/lotties/loading.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

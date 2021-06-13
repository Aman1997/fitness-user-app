import React from "react";
import {Text, View} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {CONTENT} from "../../assets/constants/colors";
import LottieView from "lottie-react-native";

export default function NoPartnerData() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/lotties/no-result.json")}
        autoPlay
        loop={false}
        autoSize
      />
      <Text style={styles.headText}>No result found!!</Text>
      <Text style={styles.descriptionText}>
        Sorry, we couldn't find any matching items.
      </Text>
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
    textTransform: "uppercase",
    fontSize: "18@s",
    marginTop: "40@s",
  },
  descriptionText: {
    marginTop: "15@s",
    width: "50%",
    textAlign: "center",
    color: CONTENT,
    fontSize: "14@s",
  },
});

import React from "react";
import {StyleSheet, View} from "react-native";
import LottieView from "lottie-react-native";

const OrderCompletedLottie = ({
  animationFinished,
}: {
  animationFinished: () => void;
}) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/lotties/order-completed.json")}
        autoPlay
        loop={false}
        autoSize
        onAnimationFinish={animationFinished}
      />
    </View>
  );
};

export default OrderCompletedLottie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

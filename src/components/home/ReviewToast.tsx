import React from "react";
import {View, Text, Platform} from "react-native";
import {TouchableWithoutFeedback} from "react-native-gesture-handler";
import {scale, ScaledSheet} from "react-native-size-matters";
import {
  CONTENT,
  ICONS,
  PRIMARY,
  PRIMARY_20,
} from "../../assets/constants/colors";
import {Entypo} from "@expo/vector-icons";
import {APP_MARGIN_HORIZONTAL} from "../../assets/constants/styles";

interface IProps {
  onRateReview: () => void;
  onCancelRateReview: () => void;
  fitnessServiceName: string;
}

export default function ReviewToast({
  onRateReview,
  onCancelRateReview,
  fitnessServiceName,
}: IProps) {
  return (
    <View style={styles.container}>
      <View style={{flex: 1, marginRight: scale(10)}}>
        <Text style={styles.headText}>
          {`Would you like to rate ${fitnessServiceName} service?`}
        </Text>
      </View>

      <View style={{flexDirection: "row", alignItems: "center"}}>
        <TouchableWithoutFeedback onPress={onRateReview}>
          <View style={{marginRight: scale(10)}}>
            <Text style={[styles.headText, {color: PRIMARY}]}>Rate</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={onCancelRateReview}>
          <View style={{padding: scale(5)}}>
            <Entypo name="circle-with-cross" size={scale(18)} color={ICONS} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: "10@s",
    paddingHorizontal: "15@s",
    borderRadius: "8@s",
    backgroundColor: PRIMARY_20,
    marginHorizontal: APP_MARGIN_HORIZONTAL,
    marginBottom: Platform.OS === "android" ? "10@s" : "25@s",
  },
  headText: {
    color: CONTENT,
    fontSize: "14@s",
    flexWrap: "wrap",
    padding : "5@s"
  },
});

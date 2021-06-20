import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {ProgressBar} from "react-native-paper";
import {OFF_WHITE, PRIMARY} from "../../assets/constants/colors";

export default function MembershipBar({
  daysLeft,
  membershipTenure,
}: {
  daysLeft: number;
  membershipTenure: number;
}) {
  return (
    <View style={styles.cardContainer}>
      <Text
        style={{
          marginBottom: scale(15),
          fontSize: scale(14),
        }}
      >
        <Text style={{fontWeight: "bold"}}>{daysLeft} days</Text> left in
        membership
      </Text>
      <ProgressBar progress={1 - daysLeft / membershipTenure} color={PRIMARY} />
    </View>
  );
}

const styles = ScaledSheet.create({
  cardContainer: {
    width: "100%",
    backgroundColor: OFF_WHITE,
    borderRadius: "10@s",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: "15@s",
    paddingHorizontal: "10@s",
    marginVertical: "10@s",
  },
});

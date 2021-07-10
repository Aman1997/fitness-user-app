import React from "react";
import {Text, View} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {CONTENT, HEAD_TEXT, OFF_WHITE, PRIMARY} from "../../assets/constants/colors";
import {APP_MARGIN_HORIZONTAL} from "../../assets/constants/styles";
import AppButton from "../common/AppButton";

const BatchContainer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Batch-1</Text>
      <View style={styles.mainRowContainer}>
        <View style={styles.detailsContainer}>
          <Text style={styles.daysText}>
            Mon, Tue, Wed, Thrus, Fri, Sat, Sun
          </Text>
          <Text style={styles.timeSlotText}>07:00 AM - 08:00AM</Text>
        </View>
        <View style={styles.bookingContainer}>
          <Text style={styles.priceText}>₹ 500</Text>
          <AppButton
            text="Book"
            textStyle={{color: PRIMARY, fontSize: scale(14), fontWeight: "500"}}
            containerStyle={{
              borderColor: PRIMARY,
              borderWidth: scale(1),
              paddingHorizontal: scale(10),
              paddingVertical: scale(8),
              borderRadius: scale(8)
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default BatchContainer;

const styles = ScaledSheet.create({
  container: {
    height: "100%",
    backgroundColor: OFF_WHITE,
    paddingHorizontal: APP_MARGIN_HORIZONTAL,
  },
  mainRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center'
  },
  headText: {
    color: HEAD_TEXT,
    fontSize: "15@s",
    fontWeight: "bold",
    marginTop: "20@s",
  },
  detailsContainer: {
    marginTop: "15@s",
  },
  daysText: {
    maxWidth: "200@s",
    fontSize: "13@s",
    color: HEAD_TEXT,
    marginBottom: "10@s"
  },
  timeSlotText: {
    fontSize: "12@s",
    color: CONTENT
  },
  bookingContainer: {
    marginTop: "15@s",
    justifyContent: 'center',
    alignItems: 'center'
  },
  priceText: {
    fontSize: "13@s",
    color: HEAD_TEXT,
    marginBottom: "10@s"
  },
});

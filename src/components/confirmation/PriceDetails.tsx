import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {CONTENT, HEAD_TEXT} from "../../assets/constants/colors";
import {APP_MARGIN_HORIZONTAL} from "../../assets/constants/styles";
import {
  calculateCGST,
  calculateSGST,
  calculateTotal,
  getMembershipType,
} from "../../utils/confirmationScreenMethods";

interface IProps {
  type: number;
  isMembership: boolean;
  price: number;
}

export default function PriceDetails({type, isMembership, price}: IProps) {
  return (
    <View style={styles.subContainers}>
      <Text style={styles.headText}>Price details</Text>
      {isMembership ? (
        <View style={[styles.rowContainers, {marginTop: scale(10)}]}>
          <Text style={styles.textColor}>{getMembershipType(type)}</Text>
          <Text style={styles.textColor}>{price}</Text>
        </View>
      ) : (
        <View style={[styles.rowContainers, {marginTop: scale(10)}]}>
          <Text style={styles.textColor}>₹ {price} x 1 day</Text>
          <Text style={styles.textColor}>{price}</Text>
        </View>
      )}
      <View style={[styles.rowContainers, {marginTop: scale(10)}]}>
        <Text style={styles.textColor}>SGST@ 10.00%</Text>
        <Text style={styles.textColor}>{calculateSGST(price)}</Text>
      </View>
      <View style={[styles.rowContainers, {marginTop: scale(10)}]}>
        <Text style={styles.textColor}>CGST@ 10.00%</Text>
        <Text style={styles.textColor}>{calculateCGST(price)}</Text>
      </View>
      <View style={[styles.rowContainers, {marginTop: scale(10)}]}>
        <Text style={{fontWeight: "500", fontSize: scale(13)}}>Total</Text>
        <Text style={{fontWeight: "500", fontSize: scale(13)}}>
          ₹ {calculateTotal(price, calculateSGST(price), calculateCGST(price))}
        </Text>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  rowContainers: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headText: {
    textTransform: "capitalize",
    fontWeight: "500",
    fontSize: "15@s",
    marginBottom: "10@s",
    color: HEAD_TEXT,
  },
  textColor: {color: CONTENT, fontSize: "13@s"},
  subContainers: {
    marginHorizontal: APP_MARGIN_HORIZONTAL,
    marginVertical: "20@s",
  },
});

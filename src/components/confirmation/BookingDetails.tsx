import React from "react";
import {Text, View} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import {scale, ScaledSheet} from "react-native-size-matters";
import {CONTENT, HEAD_TEXT, ICONS} from "../../assets/constants/colors";
import {getMembershipType} from "../../utils/confirmationScreenMethods";
import {format} from "date-fns";
import {APP_MARGIN_HORIZONTAL} from "../../assets/constants/styles";
import {useNavigation} from "@react-navigation/native";

interface IProps {
  type: number;
  date: Date;
  timeSlot: string;
  isMembership: boolean;
}

export default function BookingDetails({
  type,
  date,
  timeSlot,
  isMembership,
}: IProps) {
  const navigation = useNavigation();
  return (
    <View style={styles.subContainers}>
      <View style={styles.rowContainers}>
        <Text style={styles.headText}>booking details</Text>
        <FontAwesome
          name="edit"
          size={scale(20)}
          color={ICONS}
          onPress={() => navigation.goBack()}
        />
      </View>

      {isMembership ? (
        <View>
          <Text
            style={[
              styles.headText,
              {
                fontWeight: "400",
                marginTop: scale(20),
                textDecorationLine: "underline",
              },
            ]}
          >
            Period
          </Text>
          <View style={[styles.rowContainers, {marginTop: scale(10)}]}>
            <Text style={styles.textColor}>
              {getMembershipType(type)} membership
            </Text>
          </View>
        </View>
      ) : (
        <View>
          <View style={[styles.rowContainers, {marginTop: scale(20)}]}>
            <Text style={[styles.headText, {fontWeight: "400"}]}>date</Text>
            <Text style={[styles.headText, {fontWeight: "400"}]}>
              Time Slot
            </Text>
          </View>
          <View style={[styles.rowContainers, {marginTop: scale(10)}]}>
            <Text style={styles.textColor}>
              {format(new Date(date), "dd MMMM yyyy")}
            </Text>
            <Text style={styles.textColor}>{timeSlot}</Text>
          </View>
        </View>
      )}

      <Text style={styles.optionsText}>Looking for long term packages ?</Text>
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
  optionsText: {
    textDecorationLine: "underline",
    marginTop: "20@s",
    fontWeight: "500",
    fontSize: "12@s",
    color: CONTENT,
  },
  subContainers: {
    marginHorizontal: APP_MARGIN_HORIZONTAL,
    marginVertical: "20@s",
  },
});

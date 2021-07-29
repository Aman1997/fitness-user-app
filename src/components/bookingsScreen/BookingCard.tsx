import {format} from "date-fns";
import React from "react";
import {Image, Text, TouchableWithoutFeedback, View} from "react-native";
import {ScaledSheet} from "react-native-size-matters";
import {WHITE} from "../../assets/constants/colors";
import {IBookingState} from "../../redux/reducers/bookingsReducer";
import {IMembershipData} from "../../types/stateTypes";
import {checkMembershipStatus} from "../../utils/checkMembershipStatus";
import { formatTimeSlot } from "../../utils/dateTimeMethods";

interface IProps {
  data: IMembershipData | IBookingState["bookings"][0];
  onPressHandler: () => void;
  isMembership: boolean;
}

export default function BookingCard({
  data,
  onPressHandler,
  isMembership,
}: IProps) {

  return (
    <TouchableWithoutFeedback onPress={onPressHandler}>
      <View style={styles.container}>
        <Image
          source={{uri: data.fitnessService?.imageUrl}}
          style={styles.imageStyle}
        />
        <View style={styles.overlay} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{data.fitnessService?.name}</Text>
          <Text style={styles.date}>
            {isMembership
              ? `${format(
                  // @ts-ignore
                  new Date(data.from as string),
                  "dd MMMM yyyy",
                  // @ts-ignore
                )} - ${format(new Date(data.to as string), "dd MMMM yyyy")}`
              : // @ts-ignore
                `${format(new Date(data.bookingDate), "dd MMMM yyyy")}, ${
                  // @ts-ignore
                  formatTimeSlot(data.timeSlot)
                }`}
          </Text>
          <View style={{flex: 1, justifyContent: "flex-end"}}>
            <Text style={styles.status}>
              Status:{" "}
              {isMembership
                ? // @ts-ignore
                  checkMembershipStatus(data.to as string)
                  ? "Ongoing"
                  : "Expired"
                : // @ts-ignore
                  data.status}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = ScaledSheet.create({
  container: {
    height: "160@s",
    width: "100%",
    borderRadius: "20@s",
    marginVertical: "15@s",
  },
  imageStyle: {
    height: "100%",
    borderRadius: "20@s",
  },
  overlay: {
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 2,
    opacity: 0.4,
    backgroundColor: "#000",
    borderRadius: "20@s",
  },
  textContainer: {
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 3,
    borderRadius: "20@s",
    paddingHorizontal: "20@s",
    paddingTop: "20@s",
  },
  name: {
    color: WHITE,
    fontWeight: "bold",
    fontSize: "17@s",
    textTransform: "capitalize",
  },
  date: {
    color: "#E5E3E3",
    paddingVertical: "8@s",
  },
  status: {
    color: WHITE,
    fontSize: "14@s",
    textTransform: "capitalize",
    marginBottom: "15@s",
  },
});

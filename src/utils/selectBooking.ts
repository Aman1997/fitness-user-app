import {NavigationProp} from "@react-navigation/native";
import {Alert} from "react-native";
import {bookingDetailsScreen} from "../navigation/routes";

export const selectBooking = (
  data: any,
  isSessionSelected: boolean,
  navigation: NavigationProp<any>,
) => {
  if (isSessionSelected) {
    if (data.status === "booked") {
      const payload = {
        id: data.id,
        imageUrl: data.fitnessService.imageUrl,
        name: data.fitnessService.name,
        bookingDate: data.bookingDate,
        timeSlot: data.timeSlot,
        trainerName: data.fitnessService.trainerName,
        pin: data.pin,
        latitude: data.fitnessService.latitude,
        longitude: data.fitnessService.longitude,
      };
      navigation.navigate(bookingDetailsScreen, {data: payload});
    } else {
      Alert.alert(
        "Cancelled Session",
        `The session with reference id: ${data.id} has been canelled!`,
      );
    }
  } else {
    console.log("membership");
  }
};

import {NavigationProp} from "@react-navigation/native";
import {differenceInDays} from "date-fns";
import {Alert} from "react-native";
import {
  bookingDetailsScreen,
  membershipDetailsScreen,
} from "../navigation/routes";

interface IPlans {
  id: string;
  price: string;
  type: number;
}

export const selectBooking = (
  data: any,
  isSessionSelected: boolean,
  navigation: NavigationProp<any>,
) => {
  if (isSessionSelected) {
    if (data.status === "confirmed") {
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
    } else if (data.status === "cancelled") {
      Alert.alert(
        "Cancelled Session",
        `The session with reference id: ${data.id} has been canelled!`,
      );
    }
  } else {
    if (differenceInDays(Date.now(), Date.parse(data.to)) > 0) {
      Alert.alert(
        "Membership Expired",
        `The membership with ${data.fitnessService.name} has been expired!`,
      );
    } else {
      const payload = {
        id: data.id,
        imageUrl: data.fitnessService.imageUrl,
        name: data.fitnessService.name,
        to: data.to,
        from: data.from,
        plans: data.fitnessService.plans,
        address: data.fitnessService.address,
        monthly:
          data.fitnessService.plans.filter((item: IPlans) => item.type === 1)
            .length > 0,
        quarterly:
          data.fitnessService.plans.filter((item: IPlans) => item.type === 2)
            .length > 0,
        halfYearly:
          data.fitnessService.plans.filter((item: IPlans) => item.type === 3)
            .length > 0,
        yearly:
          data.fitnessService.plans.filter((item: IPlans) => item.type === 4)
            .length > 0,
      };
      navigation.navigate(membershipDetailsScreen, {data: payload});
    }
  }
};

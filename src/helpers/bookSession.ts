import { NavigationProp } from "@react-navigation/native";
import {API, graphqlOperation} from "aws-amplify";
import {Dispatch} from "react";
import { errorScreen } from "../navigation/routes";
import {CREATE_SESSION} from "../queries/mutation";
import { sentryError } from "../utils/sentrySetup";

export const bookSession = async (
  orderId: string,
  partnerId: string,
  date: Date,
  timeSlot: string,
  email: string,
  setIsCompleted: Dispatch<boolean>,
  navigation: NavigationProp<any>
) => {
  try {
    const pin = Math.floor(100000 + Math.random() * 900000);
    await API.graphql(
      graphqlOperation(CREATE_SESSION, {
        fitnessPartnerId: partnerId,
        bookingDate: date,
        pin,
        status: "confirmed",
        timeSlot: timeSlot,
        userEmail: email,
        orderId
      }),
    );
    setIsCompleted(true);
  } catch (error) {
    sentryError(error);
    navigation.reset({index: 0, routes: [{name: errorScreen}]});
  }
};

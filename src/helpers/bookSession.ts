import {NavigationProp} from "@react-navigation/native";
import {API, graphqlOperation} from "aws-amplify";
import {Dispatch} from "react";
import {errorScreen} from "../navigation/routes";
import {CREATE_SESSION, LOG_USER_ACITIVITY} from "../queries/mutation";
import {LOG_TYPE} from "../utils/constants";
import {sentryError} from "../utils/sentrySetup";

export const bookSession = async (
  orderId: string,
  partnerId: string,
  partnerName: string,
  date: Date,
  timeSlot: string,
  email: string,
  setIsCompleted: Dispatch<boolean>,
  navigation: NavigationProp<any>,
) => {
  try {
    const pin = Math.floor(100000 + Math.random() * 900000);
    const sessionId = await API.graphql(
      graphqlOperation(CREATE_SESSION, {
        fitnessPartnerId: partnerId,
        bookingDate: date,
        pin,
        status: "confirmed",
        timeSlot: timeSlot,
        userEmail: email,
        orderId,
      }),
    );

    // log the activity
    await API.graphql(
      graphqlOperation(LOG_USER_ACITIVITY, {
        type: LOG_TYPE.session_booked,
        metadata: JSON.stringify({
          date,
          timeSlot,
          partnerName,
          partnerId,
          orderId,
          // @ts-ignore
          sessionId: sessionId.data.createBookings.id,
        }),
        userEmail: email,
      }),
    );

    setIsCompleted(true);
  } catch (error) {
    sentryError(error);
    navigation.reset({index: 0, routes: [{name: errorScreen}]});
  }
};

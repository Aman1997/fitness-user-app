import {NavigationProp} from "@react-navigation/native";
import {API, graphqlOperation} from "aws-amplify";
import {Dispatch} from "react";
import {errorScreen} from "../navigation/routes";
import {CREATE_MEMBERSHIP, LOG_USER_ACITIVITY} from "../queries/mutation";
import {LOG_TYPE, NotificationType} from "../utils/constants";
import {getToDate} from "../utils/dateTimeMethods";
import {sentryError} from "../utils/sentrySetup";
import {sendNotification} from "./pushNotificationMethods";

export const bookMembership = async (
  orderId: string,
  partnerId: string,
  partnerName: string,
  partnerEmail: string,
  type: number,
  batch: number,
  email: string,
  userName: string,
  setIsCompleted: Dispatch<boolean>,
  navigation: NavigationProp<any>,
  isMembershipRenew: boolean,
) => {
  try {
    const membershipId = await API.graphql(
      graphqlOperation(CREATE_MEMBERSHIP, {
        fitnessPartnerId: partnerId,
        from: new Date(),
        to: getToDate(type),
        type,
        userEmail: email,
        orderId,
      }),
    );

    // log the user activity
    await API.graphql(
      graphqlOperation(LOG_USER_ACITIVITY, {
        type: isMembershipRenew
          ? LOG_TYPE.membership_renewed
          : LOG_TYPE.membership_booked,
        metadata: JSON.stringify({
          type,
          batch,
          partnerName,
          partnerId,
          orderId,
          // @ts-ignore
          sessionId: membershipId.data.createMemberships.id,
        }),
        userEmail: email,
      }),
    );

    // send the notification
    await sendNotification(
      isMembershipRenew
        ? NotificationType.MEMBERSHIP_RENEWED
        : NotificationType.MEMBERSHIP_BOOKED,
      partnerEmail,
      userName,
      new Date(),
      type,
      isMembershipRenew
        ? LOG_TYPE.membership_renewed
        : LOG_TYPE.membership_booked,
      {
        type,
        batch,
        userName,
        orderId,
        // @ts-ignore
        bookingId: membershipId.data.createMemberships.id,
      },
    );

    setIsCompleted(true);
  } catch (error) {
    sentryError(error);
    navigation.reset({index: 0, routes: [{name: errorScreen}]});
  }
};

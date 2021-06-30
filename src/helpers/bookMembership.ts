import { NavigationProp } from "@react-navigation/native";
import {API, graphqlOperation} from "aws-amplify";
import {Dispatch} from "react";
import { errorScreen } from "../navigation/routes";
import {CREATE_MEMBERSHIP} from "../queries/mutation";
import {getToDate} from "../utils/dateTimeMethods";
import { sentryError } from "../utils/sentrySetup";

export const bookMembership = async (
  orderId: string,
  partnerId: string,
  type: number,
  email: string,
  setIsCompleted: Dispatch<boolean>,
  navigation: NavigationProp<any>
) => {
  try {
    await API.graphql(
      graphqlOperation(CREATE_MEMBERSHIP, {
        fitnessPartnerId: partnerId,
        from: new Date(),
        to: getToDate(type),
        type,
        userEmail: email,
        orderId,
      }),
    );
    setIsCompleted(true);
  } catch (error) {
    sentryError(error);
    navigation.reset({index: 0, routes: [{name: errorScreen}]});
  }
};

import {API, graphqlOperation} from "aws-amplify";
import {Dispatch} from "react";
import {CREATE_MEMBERSHIP} from "../queries/mutation";
import {getToDate} from "../utils/dateTimeMethods";

export const bookMembership = async (
  orderId: string,
  partnerId: string,
  type: number,
  email: string,
  setIsCompleted: Dispatch<boolean>,
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
    console.log("Some error occured while booking session ", error);
  }
};

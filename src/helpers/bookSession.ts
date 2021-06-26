import {API, graphqlOperation} from "aws-amplify";
import {Dispatch} from "react";
import {CREATE_SESSION} from "../queries/mutation";

export const bookSession = async (
  orderId: string,
  partnerId: string,
  date: Date,
  timeSlot: string,
  email: string,
  setIsCompleted: Dispatch<boolean>,
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
    console.log("Some error occured while booking session ", error);
  }
};

import axios from "axios";
import {format} from "date-fns";
import Config from "react-native-config";
import {getMembershipType} from "../utils/confirmationScreenMethods";
import RazorpayCheckout from "react-native-razorpay";
import {NavigationProp} from "@react-navigation/native";
import {Alert, Platform} from "react-native";
import {PRIMARY} from "../assets/constants/colors";
import {bookMembership} from "./bookMembership";
import {Dispatch} from "react";
import {bookSession} from "./bookSession";
import {fetchJWT} from "./fetchJWT";
import {errorScreen} from "../navigation/routes";
import {sentryError} from "../utils/sentrySetup";

export const continueToPay = async (
  amount: number,
  isMembership: boolean,
  date: Date | undefined,
  type: number,
  batch: number,
  name: string,
  userEmail: string,
  phoneNumber: string,
  navigation: NavigationProp<any>,
  partnerId: string,
  timeSlot: string,
  setLoading: Dispatch<boolean>,
  setIsCompleted: Dispatch<boolean>,
  isMembershipRenew: boolean
) => {
  // create an order
  try {
    const orderId = await axios.post(
      Config.RAZORPAY_CREATE_ORDER_URL,
      {
        amount: amount.toString(),
        currency: "INR",
      },
      {headers: await fetchJWT()},
    );

    const options = {
      description: isMembership
        ? `Buying ${getMembershipType(type)} membership at ${name}`
        : `Booking session for ${format(
            new Date(date as Date),
            "dd MMMM yyyy",
          )}`,
      image: "https://of-public-assets.s3.ap-south-1.amazonaws.com/icon.png", // Change to app image
      currency: "INR",
      key: Config.RAZORPAY_KEY,
      amount: amount.toString(),
      name: "Orbit Fitness",
      order_id: orderId.data.orderId,
      prefill: {
        email: userEmail,
        contact: phoneNumber,
      },
      theme: {color: PRIMARY},
    };

    setLoading(false);

    //open razorpay flow
    RazorpayCheckout.open(options)
      .then(async (data: any) => {
        // handle success
        if (isMembership) {
          // book membership
          await bookMembership(
            orderId.data.orderId,
            partnerId,
            name,
            type,
            batch,
            userEmail,
            setIsCompleted,
            navigation,
            isMembershipRenew
          );
        } else {
          // book sessions
          await bookSession(
            orderId.data.orderId,
            partnerId,
            name,
            date as Date,
            timeSlot as string,
            userEmail,
            setIsCompleted,
            navigation,
          );
        }
      })
      .catch((error: any) => {
        // handle failure
        Alert.alert(
          "Payment Error",
          `${
            Platform.OS === "android"
              ? JSON.parse(error.description).error.description
              : error.description
          }`,
        );
      });
  } catch (error) {
    sentryError(error);
    navigation.reset({index: 0, routes: [{name: errorScreen}]});
  }
};

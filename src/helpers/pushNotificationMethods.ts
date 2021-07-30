import axios from "axios";
import {Alert} from "react-native";
import Config from "react-native-config";
import {fetchJWT} from "./fetchJWT";
import * as Updates from "expo-updates";

export const saveDeviceToken = async (token: string, email: string) => {
  try {
    await axios.post(
      `${Config.NOTIFICATION_API}/saveToken`,
      {email, token},
      {headers: await fetchJWT()},
    );
  } catch (error) {
    return Alert.alert(
      "Error occured",
      "Something went wrong. Please try again",
      [{text: "OK", onPress: async () => await Updates.reloadAsync()}],
    );
  }
};

export const sendNotification = async (
  type: string,
  partnerEmail: string,
  userName: string,
  bookingDate: Date,
  membershipType: number,
  logType: string,
  metadata: {},
) => {

  await axios.post(
    `${Config.NOTIFICATION_API}/sendNotification`,
    {
      type,
      partnerEmail,
      userName,
      bookingDate,
      membershipType,
      logType,
      metadata,
      logClient: true
    },
    {headers: await fetchJWT()},
  );
};

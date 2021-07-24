import * as Updates from "expo-updates";
import {Alert} from "react-native";
import { sentryError } from "./sentrySetup";

export const uncaughtExceptionHandler = (error: any, isFatal: any) => {
  sentryError(error);
  if (isFatal) {
    Alert.alert(
      "Unexpected error occurred",
      `
          Error: ${isFatal ? "Fatal:" : ""} ${error.name} ${error.message}
  
          We will need to restart the app.
          `,
      [
        {
          text: "Restart",
          onPress: async () => {
            await Updates.reloadAsync();
          },
        },
      ],
    );
  } else {
    Alert.alert(
      "Unexpected error occurred",
      `
        Error: ${isFatal ? "Fatal:" : ""} ${error.name} ${error.message}
  
        We have been notified and are working to resolve the issue. Please try again after some time.
        `,
    );
  }
};

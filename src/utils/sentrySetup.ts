import * as Sentry from "@sentry/react-native";
import Config from "react-native-config";

export const sentryInit = () => {
  Sentry.init({
    dsn: Config.SENTRY_DSN,
    environment: __DEV__ ? "development" : "production",
    debug: __DEV__ ? false : true,
    enableNative: __DEV__ ? false : true,
  });
};

export const sentryError = (error: any) => {
  if (__DEV__) {
    return console.log(error);
  } else Sentry.captureException(JSON.stringify(error));
};

import { Platform, Linking } from "react-native";
import * as WebBrowser from "expo-web-browser";

const urlOpener = async (url: string, redirectUrl: string) => {
  // @ts-ignore
  const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
    url,
    redirectUrl
  );

  if (type === "success" && Platform.OS === "ios") {
    WebBrowser.dismissBrowser();
    return Linking.openURL(newUrl);
  }
};

export default urlOpener;

import React, {Dispatch, useCallback, useEffect} from "react";
import {Text, View} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {CONTENT} from "../../assets/constants/colors";
import AppSeparator from "../common/AppSeparator";
import {FontAwesome} from "@expo/vector-icons";
import {Auth, Hub} from "aws-amplify";
import {CognitoHostedUIIdentityProvider} from "@aws-amplify/auth/lib-esm/types";
import Config from "react-native-config";
import {fetchJWT} from "../../helpers/fetchJWT";
import axios from "axios";
import setUserId from "../../utils/setUserId";
import {NavigationProp} from "@react-navigation/native";
import {appHomeScreen, errorScreen} from "../../navigation/routes";
import {sentryError} from "../../utils/sentrySetup";

interface IProps {
  optionText: string;
  setLoading: Dispatch<boolean>;
  navigation: NavigationProp<any>;
}

export default function SocialSignIn({
  optionText,
  setLoading,
  navigation,
}: IProps) {
  const googleSignIn = useCallback(async () => {
    setLoading(true);
    await Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google});
  }, []);

  useEffect(() => {
    try {
      Hub.listen("auth", async ({payload: {event, data}}) => {
        switch (event) {
          case "signIn":
            const authUser = await Auth.currentAuthenticatedUser();
            const params = {
              email: authUser.attributes.email,
              name: authUser.attributes["custom:name"] || "",
              phoneNumber: authUser.attributes["custom:phoneNumber"] || "",
              imageUrl: authUser.attributes.picture || "",
            };
            const {data} = await axios.post(Config.SOCIAL_SIGN_IN, params, {
              headers: await fetchJWT(),
            });
            if (data.status === "Success") {
              await setUserId(authUser.attributes.email);
              setLoading(false);
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: appHomeScreen,
                  },
                ],
              });
            }
            break;
          case "signIn_failure":
          case "cognitoHostedUI_failure":
            setLoading(false);
            console.log("Sign in failure", data);
            throw new Error(data);
        }
      });
    } catch (error) {
      setLoading(false);
      sentryError(error);
      navigation.reset({
        index: 0,
        routes: [
          {
            name: errorScreen,
          },
        ],
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.separatorContainer}>
        <AppSeparator style={{backgroundColor: "#ACACA7"}} />
        <View
          style={{
            position: "absolute",
            backgroundColor: "#fff",
            paddingHorizontal: scale(8),
          }}
        >
          <Text style={{color: CONTENT, fontSize: scale(12)}}>
            {optionText}
          </Text>
        </View>
      </View>
      <View style={styles.iconsContainer}>
        <FontAwesome
          name="google"
          size={scale(24)}
          color="green"
          onPress={googleSignIn}
        />
        {/* <FontAwesome name="facebook-official" size={scale(24)} color="blue" /> */}
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    marginTop: "30@s",
  },
  separatorContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: "30@s",
    marginHorizontal: "15%",
  },
});

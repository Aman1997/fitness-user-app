import React, {Dispatch, useCallback} from "react";
import {Text, View} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {CONTENT} from "../../assets/constants/colors";
import AppSeparator from "../common/AppSeparator";
import {FontAwesome} from "@expo/vector-icons";
import {Auth} from "aws-amplify";
import {CognitoHostedUIIdentityProvider} from "@aws-amplify/auth/lib-esm/types";
import {NavigationProp} from "@react-navigation/native";
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
    await Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google,
    });
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

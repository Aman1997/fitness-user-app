import {useNavigation, useRoute} from "@react-navigation/core";
import {StackNavigationProp} from "@react-navigation/stack";
import React, {useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {TextInput} from "react-native-paper";
import {scale, ScaledSheet} from "react-native-size-matters";
import {PRIMARY, SECONDARY} from "../assets/constants/colors";
import {CONTENT_CONTAINER} from "../assets/constants/styles";
import AppButton from "../components/common/AppButton";
import AppPageTitle from "../components/common/AppPageTitle";

export default function VerifySignUpScreen() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const route = useRoute();
  // @ts-ignore
  const {email, password} = route.params;

  const [otp, setOtp] = useState("");
  const [isLoading, setLoading] = useState(false);

  // verify the otp
  const verify = async () => {
    console.log("Verify");
  };

  // resend the otp
  const resendConfirmationCode = async () => {
    console.log("Resend OTP");
  };

  return (
    <>
      <View style={styles.container}>
        <View style={CONTENT_CONTAINER}>
          <AppPageTitle pageTitle="Verify Otp" />

          <TextInput
            label="OTP"
            mode="outlined"
            value={otp}
            onChangeText={(data) => setOtp(data)}
            style={{backgroundColor: "#fff", marginTop: scale(30)}}
            theme={{colors: {primary: PRIMARY}}}
            clearButtonMode="while-editing"
            keyboardType="number-pad"
            returnKeyType="done"
          />

          <Text
            style={{
              textAlign: "right",
              color: PRIMARY,
              fontWeight: "500",
              padding: scale(10),
              fontSize: scale(12),
              marginTop: scale(10),
            }}
            onPress={resendConfirmationCode}
          >
            Resend verificiation code
          </Text>

          <View style={{flex: 1, justifyContent: "flex-end"}}>
            <AppButton
              text="Verify"
              textStyle={{
                color: "#fff",
                fontSize: scale(17),
                fontWeight: "500",
              }}
              containerStyle={{
                backgroundColor: SECONDARY,
                justifyContent: "center",
                alignItems: "center",
                padding: scale(10),
                borderRadius: scale(20),
                marginVertical: scale(25),
              }}
              onPressHandle={verify}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = ScaledSheet.create({
  container: {
    marginTop: "20@s",
    flex: 1,
  },
});

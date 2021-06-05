import {useNavigation} from "@react-navigation/core";
import {StackNavigationProp} from "@react-navigation/stack";
import React from "react";
import {Text, View} from "react-native";
import {scale} from "react-native-size-matters";
import {CONTENT, PRIMARY, SECONDARY} from "../../assets/constants/colors";
import { signInScreen, signUpScreen } from "../../navigation/routes";
import AppButton from "../common/AppButton";

interface IProps {
  label: string;
  questionText: string;
  actionText: string;
  onHandlePress: () => void
}

export default function AuthButton({label, questionText, actionText, onHandlePress}: IProps) {
  const navigation = useNavigation<StackNavigationProp<any>>();
  return (
    <View style={{marginBottom: scale(20)}}>
      <AppButton
        text={label}
        textStyle={{color: "#fff", fontWeight: "500", fontSize: scale(17)}}
        containerStyle={{
          backgroundColor: SECONDARY,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: scale(25),
          paddingVertical: scale(15),
          marginTop: scale(30),
        }}
        onPressHandle={onHandlePress}
      />

      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text
          style={{
            textAlign: "center",
            marginTop: scale(10),
            fontSize: scale(12),
            color: CONTENT,
            paddingTop: scale(10),
          }}
        >
          {questionText}?
        </Text>
        <Text
            style={{
              color: PRIMARY,
              fontWeight: "500",
              marginTop: scale(10),
              paddingTop: scale(10),
              paddingRight: scale(10),
              paddingLeft: scale(5)
            }}
            onPress={() =>
              actionText.toLowerCase() === "signin"
                ? navigation.navigate(signInScreen)
                : navigation.navigate(signUpScreen)
            }
          >
            {actionText}
          </Text>
      </View>
    </View>
  );
}
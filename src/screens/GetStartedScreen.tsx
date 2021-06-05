import {useNavigation} from "@react-navigation/core";
import React from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {CONTENT, HEAD_TEXT, SECONDARY} from "../assets/constants/colors";
import {APP_MARGIN_HORIZONTAL} from "../assets/constants/styles";
import AppButton from "../components/common/AppButton";
import { signInScreen, signUpScreen } from "../navigation/routes";

export default function GetStartedScreen() {
  const navigation = useNavigation();
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/images/tempLogo.png")}
        />
        <Text style={styles.appName}>Orbit Fitness</Text>
      </View>
      <Text style={styles.headingText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </Text>
      <Text style={styles.contentText}>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur
      </Text>

      {/* Login and Signup buttons */}
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          marginVertical: scale(25),
        }}
      >
        <View style={styles.buttonContainer}>
          <View
            style={{
              width: "45%",
              borderWidth: scale(1),
              borderColor: SECONDARY,
              borderRadius: scale(25),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AppButton
              text="Login"
              containerStyle={{
                height: scale(50),
                justifyContent: "center",
                alignItems: "center",
              }}
              textStyle={{
                color: SECONDARY,
                fontSize: scale(16),
                fontWeight: "500",
              }}
              onPressHandle={() => navigation.navigate(signInScreen)}
            />
          </View>
          <AppButton
            text="Signup"
            containerStyle={{
              height: scale(50),
              width: "45%",
              backgroundColor: SECONDARY,
              borderRadius: scale(25),
              justifyContent: "center",
              alignItems: "center",
            }}
            textStyle={{
              color: "#fff",
              fontSize: scale(16),
              fontWeight: "500",
            }}
            onPressHandle={() => navigation.navigate(signUpScreen)}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    marginHorizontal: APP_MARGIN_HORIZONTAL,
    marginTop: "35%",
  },
  headContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    height: "70@s",
    width: "70@s",
    marginRight: "20@s",
    borderRadius: "35@s",
  },
  appName: {
    fontWeight: "bold",
    fontSize: "20@s",
    color: "#313236",
  },
  headingText: {
    fontWeight: "bold",
    fontSize: "24@s",
    marginTop: "50@s",
    color: HEAD_TEXT,
  },
  contentText: {
    fontSize: "14@s",
    marginTop: "30@s",
    color: CONTENT,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});

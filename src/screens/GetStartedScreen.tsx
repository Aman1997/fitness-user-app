import {useNavigation} from "@react-navigation/core";
import React from "react";
import {
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Text,
  View,
} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {CONTENT, HEAD_TEXT, SECONDARY} from "../assets/constants/colors";
import {APP_MARGIN_HORIZONTAL} from "../assets/constants/styles";
import AppButton from "../components/common/AppButton";
import {signInScreen, signUpScreen} from "../navigation/routes";

export default function GetStartedScreen() {
  const navigation = useNavigation();
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={require("../assets/images/logo.png")}
        resizeMode="contain"
        style={styles.logo}
      />

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
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(signInScreen)}
          >
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
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(signUpScreen)}
          >
            <View
              style={{
                height: scale(50),
                width: "45%",
                backgroundColor: SECONDARY,
                borderRadius: scale(25),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: scale(16),
                  fontWeight: "500",
                }}
              >
                Signup
              </Text>
            </View>
          </TouchableWithoutFeedback>
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
  logo: {
    height: "150@s",
    width: "150@s",
  },
  appName: {
    fontWeight: "bold",
    fontSize: "20@s",
    color: "#313236",
  },
  headingText: {
    fontWeight: "bold",
    fontSize: "24@s",
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

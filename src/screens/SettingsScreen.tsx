import {useNavigation} from "@react-navigation/native";
import {Auth} from "aws-amplify";
import React from "react";
import {Text, View, ScrollView, ViewStyle} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {
  CONTENT,
  HEAD_TEXT,
  OFF_WHITE,
  PRIMARY,
} from "../assets/constants/colors";
import {CONTENT_CONTAINER} from "../assets/constants/styles";
import AppHeaderBack from "../components/common/AppHeaderBack";
import AppPageTitle from "../components/common/AppPageTitle";
import AppSeparator from "../components/common/AppSeparator";
import SettingsListBlock from "../components/settings/SettingsListBlock";
import {bookingsScreen, postLogoutScreen} from "../navigation/routes";
import removeUserId from "../utils/removeUserId";

export default function SettingsScreen() {
  const navigation = useNavigation();

  const signOut = async () => {
    try {
      await Auth.signOut();
      await removeUserId();
      navigation.reset({
        index: 0,
        routes: [
          {
            name: postLogoutScreen,
          },
        ],
      });
    } catch (error) {
      console.log("Some error occured while signing out user", error);
    }
  };

  return (
    <View style={styles.container}>
      <AppHeaderBack />
      <View style={CONTENT_CONTAINER}>
        <AppPageTitle
          pageTitle="Settings"
          textStyles={{marginBottom: scale(5)}}
        />
        <ScrollView>
          <View style={styles.detailsContainer}>
            <Text style={styles.headText}>Account</Text>
            <SettingsListBlock
              text="My Profile"
              icon="user"
              onPressHandle={() => navigation.navigate("ProfileScreen")}
            />
            <SettingsListBlock
              text="My Bookings"
              icon="calendar"
              onPressHandle={() => navigation.navigate(bookingsScreen)}
            />
            <SettingsListBlock text="Privacy and Safety" icon="Safety" />
          </View>

          <AppSeparator style={styles.appSeparatorStyle as ViewStyle} />

          <View style={{flex: 1}}>
            <Text style={styles.headText}>About</Text>
            <SettingsListBlock text="Terms of Use" icon="book" />
            <SettingsListBlock text="Community Guidelines" icon="team" />
            <SettingsListBlock text="Copyright Policy" icon="copyright" />
            <Text style={styles.logoutText} onPress={signOut}>
              Logout
            </Text>
            <Text style={styles.version}>V1.0(1122xxxx-sdxxx-xxxxx)</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  detailsContainer: {},
  headText: {
    fontSize: "15@s",
    fontWeight: "500",
    textTransform: "uppercase",
    marginVertical: "20@s",
    color: HEAD_TEXT,
  },
  appSeparatorStyle: {
    height: "6@s",
    backgroundColor: OFF_WHITE,
    marginTop: "20@s",
  },
  logoutText: {
    marginTop: "20@s",
    color: PRIMARY,
    fontWeight: "500",
    fontSize: "14@s",
  },
  version: {
    position: "relative",
    top: "20%",
    color: CONTENT,
    textAlign: "center",
  },
});

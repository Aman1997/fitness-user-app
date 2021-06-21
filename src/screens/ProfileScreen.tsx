import React from "react";
import {ScrollView, Text, View} from "react-native";
import {ScaledSheet} from "react-native-size-matters";
import {APP_MARGIN_HORIZONTAL} from "../assets/constants/styles";
import AboutContainer from "../components/profile/AboutContainer";
import ActivityContainer from "../components/profile/ActivityContainer";
import ProfileGreetings from "../components/profile/ProfileGreetings";
import ProfileHeader from "../components/profile/ProfileHeader";

const ProfileScreen = () => {
  return (
    <View style={{flex: 1}}>
      <ProfileHeader />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Greetings */}
        <ProfileGreetings name="Aman" imageUrl="http://picsum.photos/100" />

        {/* About */}
        <AboutContainer />

        {/* Activity container */}
        <ActivityContainer />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = ScaledSheet.create({
  contentContainer: {
    paddingHorizontal: APP_MARGIN_HORIZONTAL,
    paddingBottom: "25@s",
  },
});

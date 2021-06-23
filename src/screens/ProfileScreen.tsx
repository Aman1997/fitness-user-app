import React, {useEffect, useState} from "react";
import {ScrollView, View} from "react-native";
import {ScaledSheet} from "react-native-size-matters";
import {useSelector} from "react-redux";
import {APP_MARGIN_HORIZONTAL} from "../assets/constants/styles";
import AboutContainer from "../components/profile/AboutContainer";
import ActivityContainer from "../components/profile/ActivityContainer";
import ProfileGreetings from "../components/profile/ProfileGreetings";
import ProfileHeader from "../components/profile/ProfileHeader";
import {IUserState} from "../redux/reducers/userReducer";

const ProfileScreen = () => {
  const user = useSelector((state: {user: IUserState}) => state.user);

  return (
    <View style={{flex: 1}}>
      <ProfileHeader />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Greetings */}
        <ProfileGreetings
          name={user.name as string}
          imageUrl={user.imageUrl as string}
        />

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

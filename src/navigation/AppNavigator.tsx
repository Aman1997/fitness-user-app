import React from "react";
import HomeScreen from "../screens/HomeScreen";
import {enableScreens} from "react-native-screens";
import {
  bookingCalendarScreen,
  bookingDetailsScreen,
  bookingsScreen,
  confirmationScreen,
  editProfileScreen,
  errorScreen,
  fitnessProfileScreen,
  homeScreen,
  membershipDetailsScreen,
  postLogoutScreen,
  profileScreen,
  reviewsDetailsScreen,
  searchScreen,
  settingsScreen,
} from "./routes";
import FitnessProfileScreen from "../screens/FitnessProfileScreen";
import ReviewsScreen from "../screens/ReviewsScreen";
import SearchScreen from "../screens/SearchScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AuthNavigator from "./AuthNavigator";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "react-native-screens/native-stack";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import BookingsScreen from "../screens/BookingsScreen";
import BookingDetailsScreen from "../screens/BookingDetailsScreen";
import MembershipDetailsScreen from "../screens/MembershipDetailsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import BookingCalendarScreen from "../screens/BookingCalendarScreen";
import AppError from "../components/common/AppError";

enableScreens();
const Stack = createNativeStackNavigator();

const noHeader = {headerShown: false};
const modalStyle: NativeStackNavigationOptions = {
  stackPresentation: "modal",
  headerShown: false,
};

const AppNavigator = () => (
  <Stack.Navigator initialRouteName={homeScreen}>
    <Stack.Screen name={homeScreen} component={HomeScreen} options={noHeader} />
    <Stack.Screen
      name={searchScreen}
      component={SearchScreen}
      options={noHeader}
    />
    <Stack.Screen
      name={fitnessProfileScreen}
      component={FitnessProfileScreen}
      options={noHeader}
    />
    <Stack.Screen
      name={bookingCalendarScreen}
      component={BookingCalendarScreen}
      options={modalStyle}
    />
    <Stack.Screen
      name={confirmationScreen}
      component={ConfirmationScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={reviewsDetailsScreen}
      component={ReviewsScreen}
      options={noHeader}
    />
    <Stack.Screen
      name={settingsScreen}
      component={SettingsScreen}
      options={noHeader}
    />
    <Stack.Screen
      name={bookingsScreen}
      component={BookingsScreen}
      options={noHeader}
    />
    <Stack.Screen
      name={bookingDetailsScreen}
      component={BookingDetailsScreen}
      options={noHeader}
    />
    <Stack.Screen
      name={membershipDetailsScreen}
      component={MembershipDetailsScreen}
      options={noHeader}
    />
    <Stack.Screen
      name={profileScreen}
      component={ProfileScreen}
      options={noHeader}
    />
    <Stack.Screen
      name={editProfileScreen}
      component={EditProfileScreen}
      options={noHeader}
    />
    <Stack.Screen
      name={postLogoutScreen}
      component={AuthNavigator}
      options={noHeader}
    />
    <Stack.Screen name={errorScreen} component={AppError} options={noHeader} />
  </Stack.Navigator>
);

export default AppNavigator;

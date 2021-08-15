import React from "react";
import HomeScreen from "../screens/HomeScreen";
import {enableScreens} from "react-native-screens";
import {
  bookingCalendarScreen,
  bookingDetailsScreen,
  bookingsScreen,
  confirmationScreen,
  contactUsScreen,
  editProfileScreen,
  errorScreen,
  faqAndSupportScreen,
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
import ContactUsScreen from "../screens/ContactUsScreen";
import FaqAndSupportScreen from "../screens/FaqAndSupportScreen";

enableScreens();
const Stack = createNativeStackNavigator();

const noHeader = {headerShown: false};
const modalStyle: NativeStackNavigationOptions = {
  stackPresentation: "modal",
  headerShown: false,
};

const AppNavigator = () => (
  <Stack.Navigator initialRouteName={homeScreen} screenOptions={noHeader}>
    <Stack.Screen name={homeScreen} component={HomeScreen} />
    <Stack.Screen name={searchScreen} component={SearchScreen} />
    <Stack.Screen
      name={fitnessProfileScreen}
      component={FitnessProfileScreen}
    />
    <Stack.Screen
      name={bookingCalendarScreen}
      component={BookingCalendarScreen}
      options={modalStyle}
    />
    <Stack.Screen name={confirmationScreen} component={ConfirmationScreen} />
    <Stack.Screen name={reviewsDetailsScreen} component={ReviewsScreen} />
    <Stack.Screen name={settingsScreen} component={SettingsScreen} />
    <Stack.Screen name={bookingsScreen} component={BookingsScreen} />
    <Stack.Screen
      name={bookingDetailsScreen}
      component={BookingDetailsScreen}
    />
    <Stack.Screen
      name={membershipDetailsScreen}
      component={MembershipDetailsScreen}
    />
    <Stack.Screen name={profileScreen} component={ProfileScreen} />
    <Stack.Screen name={editProfileScreen} component={EditProfileScreen} />
    <Stack.Screen name={postLogoutScreen} component={AuthNavigator} />
    <Stack.Screen name={contactUsScreen} component={ContactUsScreen} />
    <Stack.Screen name={faqAndSupportScreen} component={FaqAndSupportScreen} />
    <Stack.Screen name={errorScreen} component={AppError} />
  </Stack.Navigator>
);

export default AppNavigator;

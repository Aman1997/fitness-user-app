import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import {
  bookingCalendarScreen,
  fitnessProfileScreen,
  homeScreen,
  postLogoutScreen,
  reviewsDetailsScreen,
  searchScreen,
  settingsScreen,
} from "./routes";
import FitnessProfileScreen from "../screens/FitnessProfileScreen";
import ReviewsScreen from "../screens/ReviewsScreen";
import BookingCalendarScreen from "../screens/BookingCalendarScreen";
import SearchScreen from "../screens/SearchScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AuthNavigator from "./AuthNavigator";

const Stack = createStackNavigator();

const noHeader = {headerShown: false};

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
      name={postLogoutScreen}
      component={AuthNavigator}
      options={noHeader}
    />
  </Stack.Navigator>
);

export default AppNavigator;

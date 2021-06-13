import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import {
  bookingCalendarScreen,
  fitnessProfileScreen,
  homeScreen,
  reviewsDetailsScreen,
  searchScreen,
} from "./routes";
import FitnessProfileScreen from "../screens/FitnessProfileScreen";
import ReviewsScreen from "../screens/ReviewsScreen";
import BookingCalendarScreen from "../screens/BookingCalendarScreen";
import {NativeStackNavigationOptions} from "react-native-screens/lib/typescript/native-stack";
import SearchScreen from "../screens/SearchScreen";

const Stack = createStackNavigator();

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
    />
    <Stack.Screen
      name={reviewsDetailsScreen}
      component={ReviewsScreen}
      options={noHeader}
    />
  </Stack.Navigator>
);

export default AppNavigator;

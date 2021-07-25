import React from "react";
import {StyleSheet, View, ScrollView, Alert} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useNavigation, useRoute} from "@react-navigation/native";
import FitnessServiceImageView from "../components/bookingsScreen/FitnessServiceImageView";
import BookingsDetailsContainer from "../components/bookingsScreen/BookingsDetailsContainer";
import AppButton from "../components/common/AppButton";
import {SECONDARY, WHITE} from "../assets/constants/colors";
import {scale} from "react-native-size-matters";
import {useState} from "react";
import LoadingIndicator from "../components/common/LoadingIndicator";
import {APP_MARGIN_HORIZONTAL} from "../assets/constants/styles";
import {cancelBooking} from "../helpers/cancelBooking";
import {StackNavigationProp} from "@react-navigation/stack";
import {useDispatch, useSelector} from "react-redux";
import {IBookingState} from "../redux/reducers/bookingsReducer";
import { IUserState } from "../redux/reducers/userReducer";

export default function BookingDetailsScreen() {
  const [isLoading, setLoading] = useState(false);

  const navigation = useNavigation<StackNavigationProp<any>>();

  const dispatch = useDispatch();
  const bookings = useSelector(
    (state: {bookings: IBookingState}) => state.bookings,
  ).bookings;

  const user = useSelector((state: {user: IUserState}) => state.user);

  const route = useRoute();

  // @ts-ignore
  const {data} = route.params;

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          // bounces={false}
        >
          <StatusBar style="light" />

          <FitnessServiceImageView
            data={{
              imageUrl: data.imageUrl,
              name: data.name,
              bookingDate: data.bookingDate,
              timeSlot: data.timeSlot,
            }}
          />

          <BookingsDetailsContainer
            data={{
              trainerName: data.trainerName || data.name,
              trainerImageUrl: data.trainerImageUrl,
              pin: data.pin,
              longitude: data.longitude,
              latitude: data.latitude,
            }}
          />

          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end",
              marginHorizontal: APP_MARGIN_HORIZONTAL,
            }}
          >
            <AppButton
              text="Cancel the Booking"
              textStyle={{
                color: WHITE,
                fontSize: scale(15),
                fontWeight: "500",
              }}
              containerStyle={{
                backgroundColor: SECONDARY,
                borderRadius: scale(23),
                height: scale(46),
                width: "100%",
                paddingHorizontal: scale(20),
                alignItems: "center",
                justifyContent: "center",
                marginTop: scale(5),
                marginBottom: scale(20),
              }}
              onPressHandle={() => {
                if (bookings) {
                  Alert.alert(
                    "Booking Cancellation",
                    "Are you sure you want to cancel the booking?",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                      },
                      {
                        text: "OK",
                        onPress: () => {
                          setLoading(true);
                          cancelBooking(
                            data.id,
                            data.name,
                            data.bookingDate,
                            data.timeSlot,
                            setLoading,
                            navigation,
                            dispatch,
                            bookings,
                            user.email
                          );
                        },
                      },
                    ],
                    {cancelable: false},
                  );
                } else {
                  Alert.alert(
                    "There is some problem in fetching the booking details. Please go back and try again",
                  );
                }
              }}
            />
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

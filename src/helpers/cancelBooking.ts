import {StackNavigationProp} from "@react-navigation/stack";
import {API, graphqlOperation} from "aws-amplify";
import {Dispatch, SetStateAction} from "react";
import {Alert} from "react-native";
import {errorScreen} from "../navigation/routes";
import {CANCEL_BOOKING, LOG_USER_ACITIVITY} from "../queries/mutation";
import {addBookingsData} from "../redux/actions/actionCreator";
import {IBookingState} from "../redux/reducers/bookingsReducer";
import {LOG_TYPE} from "../utils/constants";
import {sentryError} from "../utils/sentrySetup";

export const cancelBooking = async (
  id: string,
  partnerName: string,
  date: Date,
  timeSlot: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  navigation: StackNavigationProp<any>,
  dispatch: Dispatch<any>,
  bookings: IBookingState["bookings"],
  email: string,
) => {
  try {
    await API.graphql(graphqlOperation(CANCEL_BOOKING, {id}));

    // log the activity
    await API.graphql(
      graphqlOperation(LOG_USER_ACITIVITY, {
        type: LOG_TYPE.session_cancelled,
        metadata: JSON.stringify({
          date,
          timeSlot,
          partnerName,
          // @ts-ignore
          sessionId: id,
        }),
        userEmail: email,
      }),
    );

    Alert.alert(
      "Booking Cancelled",
      `Your booking with reference no: ${id} has been cancelled`,
      [
        {
          text: "Ok",
          onPress: () => navigation.pop(),
        },
      ],
      {
        cancelable: false,
      },
    );

    dispatch(
      addBookingsData({
        bookings: bookings.map((item) =>
          item.id === id ? {...item, status: "cancelled"} : item,
        ),
      }),
    );

    setLoading(false);
  } catch (error) {
    setLoading(false);
    sentryError(error);
    navigation.reset({index: 0, routes: [{name: errorScreen}]});
  }
};

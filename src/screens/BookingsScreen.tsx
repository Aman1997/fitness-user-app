import React, {useState, useEffect} from "react";
import {Alert, FlatList, Text, View} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {APP_MARGIN_HORIZONTAL} from "../assets/constants/styles";
import AppHeaderBack from "../components/common/AppHeaderBack";
import AppPageTitle from "../components/common/AppPageTitle";
import SelectedView from "../components/bookingsScreen/SelectedView";
import BookingCard from "../components/bookingsScreen/BookingCard";
import {useDispatch, useSelector} from "react-redux";
import {IUserState} from "../redux/reducers/userReducer";
import {fetchBookings} from "../helpers/fetchBookings";
import LoadingIndicator from "../components/common/LoadingIndicator";
import {useNavigation} from "@react-navigation/native";
import {IBookingState} from "../redux/reducers/bookingsReducer";
import { IMembershipData } from "../types/stateTypes";
import { selectBooking } from "../utils/selectBooking";

const Data = [
  {
    name: "The Gold's Gym",
    imageUrl: "https://picsum.photos/300",
    from: "2021-06-18T18:31:52.397Z",
    to: "2021-06-18T18:31:52.397Z",
    bookingDate: "2021-06-18T18:31:52.397Z",
    status: "Booked",
    timeSlot: "18:00",
  },
  {
    name: "The Gold's Gym",
    imageUrl: "https://picsum.photos/300",
    from: "2021-06-18T18:31:52.397Z",
    to: "2021-06-18T18:31:52.397Z",
    bookingDate: "2021-06-18T18:31:52.397Z",
    status: "Booked",
    timeSlot: "18:00",
  },

  {
    name: "The Gold's Gym",
    imageUrl: "https://picsum.photos/300",
    from: "2021-06-18T18:31:52.397Z",
    to: "2021-06-18T18:31:52.397Z",
    bookingDate: "2021-06-18T18:31:52.397Z",
    status: "Booked",
    timeSlot: "18:00",
  },
  {
    name: "The Gold's Gym",
    imageUrl: "https://picsum.photos/300",
    from: "2021-06-18T18:31:52.397Z",
    to: "2021-06-18T18:31:52.397Z",
    bookingDate: "2021-06-18T18:31:52.397Z",
    status: "Booked",
    timeSlot: "18:00",
  },
  {
    name: "The Gold's Gym",
    imageUrl: "https://picsum.photos/300",
    from: "2021-06-18T18:31:52.397Z",
    to: "2021-06-18T18:31:52.397Z",
    bookingDate: "2021-06-18T18:31:52.397Z",
    status: "Booked",
    timeSlot: "18:00",
  },
];

const BookingData = [
  {
    name: "The Gold's Fitness Studio",
    imageUrl: "https://picsum.photos/300",
    from: "2021-06-18T18:31:52.397Z",
    to: "2021-06-19T18:31:52.397Z",
    bookingDate: "2021-06-18T18:31:52.397Z",
    status: "Booked",
    timeSlot: "18:00",
  },
  {
    name: "The Gold's Fitness Studio",
    imageUrl: "https://picsum.photos/300",
    from: "2021-06-18T18:31:52.397Z",
    to: "2021-06-19T18:31:52.397Z",
    bookingDate: "2021-06-18T18:31:52.397Z",
    status: "Booked",
    timeSlot: "18:00",
  },
  {
    name: "The Gold's Fitness Studio",
    imageUrl: "https://picsum.photos/300",
    from: "2021-06-18T18:31:52.397Z",
    to: "2021-06-19T18:31:52.397Z",
    bookingDate: "2021-06-18T18:31:52.397Z",
    status: "Booked",
    timeSlot: "18:00",
  },
  {
    name: "The Gold's Fitness Studio",
    imageUrl: "https://picsum.photos/300",
    from: "2021-06-18T18:31:52.397Z",
    to: "2021-06-19T18:31:52.397Z",
    bookingDate: "2021-06-18T18:31:52.397Z",
    status: "Booked",
    timeSlot: "18:00",
  },
  {
    name: "The Gold's Fitness Studio",
    imageUrl: "https://picsum.photos/300",
    from: "2021-06-18T18:31:52.397Z",
    to: "2021-06-19T18:31:52.397Z",
    bookingDate: "2021-06-18T18:31:52.397Z",
    status: "Booked",
    timeSlot: "18:00",
  },

  {
    name: "The Gold's Fitness Studio",
    imageUrl: "https://picsum.photos/300",
    from: "2021-06-18T18:31:52.397Z",
    to: "2021-06-19T18:31:52.397Z",
    bookingDate: "2021-06-18T18:31:52.397Z",
    status: "Booked",
    timeSlot: "18:00",
  },
];

export default function BookingsScreen() {
  const [isLoading, setLoading] = useState(true);
  const [isSessionSelected, setSessionSelected] = useState(true);
  const [isMembershipSelected, setMembershipSelected] = useState(false);
  const [membershipData, setMembershipData] =
    useState<Array<IMembershipData>>();

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const user = useSelector((state: {user: IUserState}) => state.user);
  const bookings = useSelector(
    (state: {bookings: IBookingState}) => state.bookings,
  ).bookings;

  useEffect(() => {
    if (user.email) {
      fetchBookings(user.email, dispatch, setMembershipData, setLoading);
    }
  }, [user]);

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <View style={styles.container}>
          <AppHeaderBack />
          <View style={styles.detailsContainer}>
            <AppPageTitle pageTitle="Bookings" />
            <SelectedView
              isSessionSelected={isSessionSelected}
              isMembershipSelected={isMembershipSelected}
              setMembershipSelected={setMembershipSelected}
              setSessionSelected={setSessionSelected}
            />
            {isMembershipSelected ? (
              Data.length > 0 ? (
                <FlatList
                  data={membershipData}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({item, index}) => (
                    <BookingCard
                      // @ts-ignore
                      data={item}
                      onPressHandler={() => selectBooking(item, isSessionSelected, navigation)}
                      isMembership={isMembershipSelected}
                    />
                  )}
                  style={{width: "100%", marginVertical: scale(15)}}
                  showsVerticalScrollIndicator={false}
                />
              ) : (
                <Text>No membership yet!</Text>
              )
            ) : BookingData.length > 0 ? (
              <FlatList
                data={bookings}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({item, index}) => (
                  <BookingCard
                    data={item}
                    onPressHandler={() => selectBooking(item, isSessionSelected, navigation)}
                    isMembership={isMembershipSelected}
                  />
                )}
                style={{width: "100%", marginVertical: scale(15)}}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <Text>No Booking here yet!</Text>
            )}
          </View>
        </View>
      )}
    </>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  detailsContainer: {
    flex: 1,
    marginHorizontal: APP_MARGIN_HORIZONTAL,
  },
  bookingCardContainer: {
    flex: 1,
    marginVertical: "20@s",
    alignItems: "center",
  },
});

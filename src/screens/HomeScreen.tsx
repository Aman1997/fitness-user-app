import {useNavigation} from "@react-navigation/core";
import {API, graphqlOperation} from "aws-amplify";
import React, {useState, useRef, useEffect} from "react";
import {Alert, Modal, View, FlatList} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {useDispatch, useSelector} from "react-redux";
import MainCard from "../components/home/MainCard";
import MainHeader from "../components/home/MainHeader";
import NoPartnerData from "../components/home/NoPartnerData";
import ServiceUnavailable from "../components/home/ServiceUnavailable";
import {fetchData} from "../helpers/fetchFitnessProfilesData";
import {COMPLETED_BOOKINGS, GET_USER_DATA} from "../queries/query";
import {addUser} from "../redux/actions/actionCreator";
import {IFitnessProfilesState} from "../redux/reducers/fitnessProfiles";
import getUserId from "../utils/getUserId";
import * as Location from "expo-location";
import {coords} from "../utils/findDistance";
import LocationChange from "../components/home/LocationChange";
import {checkServiceAvailablibity} from "../helpers/checkServiceAvailability";
import {
  errorScreen,
  fitnessProfileScreen,
  searchScreen,
  settingsScreen,
} from "../navigation/routes";
import {ActivityIndicator} from "react-native-paper";
import {sentryError} from "../utils/sentrySetup";
import BottomSheet from "reanimated-bottom-sheet";
import ReviewContainer from "../components/home/ReviewContainer";
import {IUserState} from "../redux/reducers/userReducer";
import ReviewToast from "../components/home/ReviewToast";
import {checkReviewStatus, createReview} from "../helpers/reviewMethods";
import messaging from "@react-native-firebase/messaging";
import {saveDeviceToken} from "../helpers/pushNotificationMethods";

export default function HomeScreen() {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const fitnessProfiles = useSelector(
    (state: {fitnessProfiles: IFitnessProfilesState}) => state.fitnessProfiles,
  ).profiles;

  const user = useSelector((state: {user: IUserState}) => state.user);

  const [isTrainerSelected, setTrainerSelected] = useState(false);
  const [isServiceAvailable, setIsServiceAvailable] = useState(true);
  const [isSetLocation, setLocation] = useState(false);
  const [nextToken, setNextToken] = useState<null | string>(null);
  const [userCoords, setUserCoords] = useState<coords>();
  const [city, setUserCity] = useState("");
  const [isRefreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [screen, setScreen] = useState(0);
  const [review, setReview] = useState("");
  const [ratings, setRatings] = useState(0);
  const [completedBookings, setCompletedBookings] = useState<{
    id: string;
    isReviewed: boolean;
    fitnessService: {
      id: string;
      name: string;
      ownerEmail: string;
    };
  }>({
    id: "",
    isReviewed: true,
    fitnessService: {
      id: "",
      name: "",
      ownerEmail: "",
    },
  });
  const [completedMemberships, setCompletedMemberships] = useState<{
    id: string;
    isReviewed: boolean;
    fitnessService: {
      id: string;
      name: string;
      ownerEmail: string;
    };
  }>({
    id: "",
    isReviewed: true,
    fitnessService: {
      id: "",
      name: "",
      ownerEmail: "",
    },
  });
  const [isReviewChecked, setIsReviewChecked] = useState(false);

  useEffect(() => {
    (async () => {
      // requesting permission to location
      await requestLocationPermission();
      try {
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        const id = await getUserId();
        const userData = await API.graphql(
          graphqlOperation(GET_USER_DATA, {email: id}),
        );

        dispatch(
          addUser({
            // @ts-ignore
            ...userData.data.getUser,
            currentLat: location.coords.latitude,
            currentLong: location.coords.longitude,
          }),
        );

        let address = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        // @ts-ignore
        setUserCity(address[0]?.city.toLowerCase() || "");
        setUserCoords({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        sentryError(error);
        setLoading(false);
        navigation.reset({index: 0, routes: [{name: errorScreen}]});
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (city) {
        // check if service available in the user's city
        if (await checkServiceAvailablibity(city.toLowerCase(), navigation)) {
          setIsServiceAvailable(true);
          await fetchData(
            isTrainerSelected ? 1 : 0,
            city,
            dispatch,
            setNextToken,
            nextToken,
            setLoading,
            navigation,
          );
        } else {
          setLoading(false);
          setIsServiceAvailable(false);
        }
      }
    })();
  }, [isTrainerSelected, city]);

  useEffect(() => {
    (async () => {
      try {
        const id = await getUserId();
        const response = await API.graphql(
          graphqlOperation(COMPLETED_BOOKINGS, {
            email: id,
            to: new Date().toISOString(),
          }),
        );

        // @ts-ignore
        const bookingsRes = response.data.getUser?.bookings.items[0];
        // @ts-ignore
        const membershipRes = response.data.getUser?.memberships.items[0];

        setCompletedBookings(bookingsRes);
        setCompletedMemberships(membershipRes);
      } catch (error) {
        console.log("Error while fetching completed bookings and memberships", error)
      }
    })();
  }, [isReviewChecked]);

  // function to request permission for location
  const requestLocationPermission = async () => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      Alert.alert(
        "Permission denied",
        "You need to allow access to location services. Kindly go to the settings and allow access to location",
        [{text: "OK", onPress: () => navigation.goBack()}],
        {cancelable: false},
      );
    }
  };

  const sheetRef = useRef(null);

  const onPressCancel = async () => {
    if (screen === 1) return setScreen(0);

    await checkReviewStatus(
      completedBookings?.isReviewed,
      completedBookings?.id,
      completedMemberships?.id,
      setIsReviewChecked,
    );

    // @ts-ignore
    sheetRef.current.snapTo(1);
  };

  const onPressNext = async () => {
    if (ratings < 1)
      return Alert.alert(
        `Please rate ${
          !completedBookings?.isReviewed
            ? completedBookings?.fitnessService.name
            : completedMemberships?.fitnessService.name
        } service.`,
      );

    await createReview(
      !completedBookings?.isReviewed
        ? completedBookings?.fitnessService.id
        : completedMemberships?.fitnessService.id,
      ratings,
      review,
      user.email,
      user.name,
      completedBookings.id || completedMemberships.id,
      completedBookings.fitnessService.ownerEmail ||
        completedMemberships.fitnessService.ownerEmail,
    );

    await checkReviewStatus(
      completedBookings?.isReviewed,
      completedBookings?.id,
      completedMemberships?.id,
      setIsReviewChecked,
    );

    // @ts-ignore
    sheetRef.current.snapTo(1);
    Alert.alert("Thank you", "Your review has been submitted!");
    setRatings(0);
    setReview("");
    setScreen(0);
  };

  useEffect(() => {
    let unsubscribe;
    (async () => {
      const id = await getUserId();
      // Get the device token
      messaging()
        .getToken()
        .then(async (token) => {
          await saveDeviceToken(token, id as string);
        });

      // Listen to whether the token changes
      unsubscribe = messaging().onTokenRefresh(async (token) => {
        await saveDeviceToken(token, id as string);
      });
      return unsubscribe;
    })();
  }, []);

  return (
    <>
      <View style={styles.container}>
        {/* Modal for selecting/changing the location */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isSetLocation}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <LocationChange
            onCancel={() => setLocation(!isSetLocation)}
            city={city}
            setUserCity={setUserCity}
          />
        </Modal>
        <MainHeader
          onPressFilter={() =>
            Alert.alert(
              " 🔜 The feature for filtering results is coming soon!! 🙌🏼",
            )
          }
          onPressLocation={() => setLocation(true)}
          onPressSearch={() => navigation.navigate(searchScreen)}
          onPressSettings={() => navigation.navigate(settingsScreen)}
          onPressToggle={() => {
            setLoading(true);
            setTrainerSelected(!isTrainerSelected);
          }}
        />
        {isLoading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.2)",
            }}
          >
            <ActivityIndicator />
          </View>
        ) : (
          <View style={{flex: 1}}>
            {!isServiceAvailable ? (
              <ServiceUnavailable
                city={city}
                serviceType={isTrainerSelected ? 1 : 0}
              />
            ) : (
              <View style={styles.cardContainer}>
                {!fitnessProfiles[0].id ? (
                  <NoPartnerData />
                ) : (
                  // Flatlist for studios
                  <FlatList
                    data={fitnessProfiles}
                    renderItem={({item}) => (
                      <MainCard
                        {...item}
                        coords={userCoords as coords}
                        onPressHandler={() =>
                          navigation.navigate(fitnessProfileScreen, {
                            data: item,
                          })
                        }
                      />
                    )}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    refreshing={isRefreshing}
                    onRefresh={async () => {
                      setRefreshing(true);
                      await fetchData(
                        isTrainerSelected ? 1 : 0,
                        city,
                        dispatch,
                        setNextToken,
                        null,
                        setLoading,
                        navigation,
                      );
                      setRefreshing(false);
                    }}
                    onEndReached={async () => {
                      if (!nextToken) {
                        null;
                      } else {
                        console.log("called from onEndReached");
                        await fetchData(
                          isTrainerSelected ? 1 : 0,
                          city,
                          dispatch,
                          setNextToken,
                          nextToken as string,
                          setLoading,
                          navigation,
                        );
                      }
                    }}
                    onEndReachedThreshold={0.9}
                  />
                )}
              </View>
            )}

            {((completedBookings && !completedBookings?.isReviewed) ||
              (completedMemberships && !completedMemberships?.isReviewed)) && (
              <ReviewToast
                // @ts-ignore
                onRateReview={() => sheetRef.current.snapTo(0)}
                onCancelRateReview={async () => {
                  await checkReviewStatus(
                    completedBookings?.isReviewed,
                    completedBookings?.id,
                    completedMemberships?.id,
                    setIsReviewChecked,
                  );
                }}
                fitnessServiceName={
                  !completedBookings?.isReviewed
                    ? completedBookings?.fitnessService?.name
                    : completedMemberships?.fitnessService?.name
                }
              />
            )}
          </View>
        )}
      </View>

      <BottomSheet
        ref={sheetRef}
        snapPoints={[scale(375), 0]}
        initialSnap={1}
        borderRadius={scale(40)}
        enabledContentTapInteraction={false}
        renderContent={() => (
          <ReviewContainer
            bookings={
              !completedBookings?.isReviewed
                ? completedBookings
                : completedMemberships
            }
            screen={screen}
            review={review}
            ratings={ratings}
            setReview={setReview}
            setScreen={setScreen}
            setRatings={setRatings}
            onPressNext={onPressNext}
            onPressCancel={onPressCancel}
          />
        )}
      />
    </>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: "10@s",
    marginBottom: "20@s",
  },
});

import {useNavigation} from "@react-navigation/core";
import {API, graphqlOperation} from "aws-amplify";
import React, {useState} from "react";
import {useEffect} from "react";
import {Alert, Modal, View, FlatList} from "react-native";
import {ScaledSheet} from "react-native-size-matters";
import {useDispatch, useSelector} from "react-redux";
import {APP_MARGIN_HORIZONTAL} from "../assets/constants/styles";
import MainCard from "../components/home/MainCard";
import MainHeader from "../components/home/MainHeader";
import NoPartnerData from "../components/home/NoPartnerData";
import ServiceUnavailable from "../components/home/ServiceUnavailable";
import {fetchData} from "../helpers/fetchFitnessProfilesData";
import {GET_USER_DATA} from "../queries/query";
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
import messaging from "@react-native-firebase/messaging";
import {saveDeviceToken} from "../helpers/pushNotificationMethods";

export default function HomeScreen() {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const fitnessProfiles = useSelector(
    (state: {fitnessProfiles: IFitnessProfilesState}) => state.fitnessProfiles,
  ).profiles;

  const [isTrainerSelected, setTrainerSelected] = useState(false);
  const [isServiceAvailable, setIsServiceAvailable] = useState(true);
  const [isSetLocation, setLocation] = useState(false);
  const [nextToken, setNextToken] = useState<null | string>(null);
  const [userCoords, setUserCoords] = useState<coords>();
  const [city, setUserCity] = useState("");
  const [isRefreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;
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

        // Get the device token
        messaging()
          .getToken()
          .then(async (token) => {
            await saveDeviceToken(token, id as string);
          })

        // Listen to whether the token changes
        unsubscribe = messaging().onTokenRefresh(async (token) => {
          await saveDeviceToken(token, id as string);
        });

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

    return unsubscribe;
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
        ) : !isServiceAvailable ? (
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
      </View>
    </>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: APP_MARGIN_HORIZONTAL,
    marginBottom: "20@s",
  },
});

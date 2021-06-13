import {useNavigation} from "@react-navigation/core";
import {API, graphqlOperation} from "aws-amplify";
import React, {useState} from "react";
import {useEffect} from "react";
import {Alert, Modal, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
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
import {searchScreen} from "../navigation/routes";
import {IUserState} from "../redux/reducers/userReducer";

export default function HomeScreen() {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const user = useSelector((state: {user: IUserState}) => state.user);
  const fitnessProfiles = useSelector(
    (state: {fitnessProfiles: IFitnessProfilesState}) => state.fitnessProfiles,
  ).profiles;

  const [isTrainerSelected, setTrainerSelected] = useState(false);
  const [isServiceAvailable, setIsServiceAvailable] = useState(true);
  const [isSetLocation, setLocation] = useState(false);
  const [nextToken, setNextToken] = useState("");
  const [userCoords, setUserCoords] = useState<coords>();
  const [city, setUserCity] = useState("");

  useEffect(() => {
    getUserId().then(async (id) => {
      const userData = await API.graphql(
        graphqlOperation(GET_USER_DATA, {email: id}),
      );
      // @ts-ignore
      dispatch(addUser({...userData.data.getUser}));
    });
  }, []);

  useEffect(() => {
    (async () => {
      let start = new Date();
      // requesting permission to location
      await requestLocationPermission();
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      dispatch(
        addUser({
          ...user,
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
    })();
  }, []);

  useEffect(() => {
    (async () => {
      // check if service available in the user's city
      if (await checkServiceAvailablibity(city.toLowerCase())) {
        setIsServiceAvailable(true);
        await fetchData(
          isTrainerSelected ? 1 : 0,
          city,
          dispatch,
          setNextToken,
        );
      } else {
        setIsServiceAvailable(false);
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
          onPressSettings={() => navigation.navigate("SettingsScreen")}
          onPressToggle={() => {
            setTrainerSelected(!isTrainerSelected);
          }}
        />

        {/* Service unavailable or available view */}

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
                    coords={userCoords || {}}
                    onPressHandler={() =>
                      navigation.navigate("PartnerScreen", {
                        partnerId: item.id,
                      })
                    }
                  />
                )}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                // refreshing={}
                onRefresh={() => {}}
                onEndReached={async () => {
                  console.log("Fetch more data");
                }}
                onEndReachedThreshold={0}
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

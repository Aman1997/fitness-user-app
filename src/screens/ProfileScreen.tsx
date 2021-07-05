import React, {useEffect, useState} from "react";
import {ScrollView, View} from "react-native";
import {ScaledSheet} from "react-native-size-matters";
import {useSelector} from "react-redux";
import {APP_MARGIN_HORIZONTAL} from "../assets/constants/styles";
import AboutContainer from "../components/profile/AboutContainer";
import ActivityContainer from "../components/profile/ActivityContainer";
import ProfileGreetings from "../components/profile/ProfileGreetings";
import ProfileHeader from "../components/profile/ProfileHeader";
import {IUserState} from "../redux/reducers/userReducer";
import Config from "react-native-config";
import axios from "axios";
import LoadingIndicator from "../components/common/LoadingIndicator";
import {fetchJWT} from "../helpers/fetchJWT";
import {sentryError} from "../utils/sentrySetup";
import {useNavigation} from "@react-navigation/native";
import {errorScreen} from "../navigation/routes";

const ProfileScreen = () => {
  const [sessions, setSessions] = useState("0");
  const [memberships, setMemberships] = useState("0");
  const [isLoading, setLoading] = useState(true);

  const user = useSelector((state: {user: IUserState}) => state.user);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      try {
        if (user) {
          const apiRes = await axios.post(
            Config.FETCH_DATA_URL,
            {
              email: user.email,
            },
            {headers: await fetchJWT()},
          );
          setSessions(apiRes.data.bookings.toString());
          setMemberships(apiRes.data.memberships.toString());
          setLoading(false);
        }
      } catch (error) {
        sentryError(error);
        setLoading(false);
        navigation.reset({index: 0, routes: [{name: errorScreen}]});
      }
    })();
  }, [user]);

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <View style={{flex: 1}}>
          <ProfileHeader />
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Greetings */}
            <ProfileGreetings
              name={user.name as string}
              imageUrl={user.imageUrl as string}
            />

            {/* About */}
            <AboutContainer sessions={sessions} memberships={memberships} />

            {/* Activity container */}
            <ActivityContainer />
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default ProfileScreen;

const styles = ScaledSheet.create({
  contentContainer: {
    paddingHorizontal: APP_MARGIN_HORIZONTAL,
    paddingBottom: "25@s",
  },
});

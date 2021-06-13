import axios from "axios";
import React from "react";
import {Alert} from "react-native";
import {TouchableWithoutFeedback, Text, View, Image} from "react-native";
import Config from "react-native-config";
import {ScaledSheet} from "react-native-size-matters";
import {useSelector} from "react-redux";
import {CONTENT, PRIMARY, WHITE} from "../../assets/constants/colors";
import {APP_MARGIN_HORIZONTAL} from "../../assets/constants/styles";
import {fetchJWT} from "../../helpers/fetchJWT";
import {IUserState} from "../../redux/reducers/userReducer";

interface IProps {
  city: string;
  serviceType: number;
}

export default function ServiceUnavailable({city, serviceType}: IProps) {
  const user = useSelector((state: {user: IUserState}) => state.user);

  const setNotificationForServiceAvailability = async () => {
    try {
      if (user.email) {
        const requestData = {
          email: user.email.trim(),
          city: city.trim(),
          serviceType,
        };

        await axios.post(
          Config.SUBSCRIPTION_SERVICE_AVAILABILITY_URL,
          requestData,
          {headers: await fetchJWT()},
        );

        Alert.alert(
          "Subscription Confirmed!",
          "Your email has been subscribed to notification for service availability.",
        );
      }
      Alert.alert("Issue retrieveing user email. Please try again");
    } catch (error) {
      console.log(
        "Some error occured while creating subscription for notification",
        error,
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/SearchPageHuman.png")}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.headText}>
          Our service is not yet present in your city
        </Text>
        <Text style={styles.contentText}>
          We are doing our best to expand to different cities.
        </Text>
        <Text style={styles.contentText}>
          Please signup for a mailer to receive notification about our arrival
          to your city.
        </Text>
        <TouchableWithoutFeedback
          onPress={setNotificationForServiceAvailability}
        >
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Notify me</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: WHITE,
  },
  textContainer: {
    paddingHorizontal: APP_MARGIN_HORIZONTAL,
    paddingVertical: "20@s",
  },
  image: {
    height: "180@s",
    width: "270@s",
    resizeMode: "contain",
  },
  headText: {
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: "20@s",
  },
  contentText: {
    paddingTop: "20@s",
    textAlign: "center",
    color: CONTENT,
    paddingHorizontal: "15@s",
  },
  buttonContainer: {
    backgroundColor: PRIMARY,
    padding: "10@s",
    borderRadius: "8@s",
    alignItems: "center",
    alignSelf: "center",
    width: "150@s",
    marginTop: "20@s",
  },
  buttonText: {
    color: WHITE,
    fontSize: "16@s",
  },
});

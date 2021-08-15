import React, {Dispatch} from "react";
import {Text, View, TouchableWithoutFeedback} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import LottieView from "lottie-react-native";
import {useNavigation} from "@react-navigation/native";
import {homeScreen} from "../../navigation/routes";
import {CONTENT, SECONDARY} from "../../assets/constants/colors";

interface IProps {
  setSubmitted: Dispatch<boolean>;
}

const SupportModal = ({setSubmitted}: IProps) => {
  const navigation = useNavigation();

  const returnToHome = () => {
    setSubmitted(false);
    navigation.reset({
      index: 0,
      routes: [
        {
          name: homeScreen,
        },
      ],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              height: scale(180),
              width: scale(120),
              alignItems: "center",
            }}
          >
            <LottieView
              source={require("../../assets/lotties/support.json")}
              autoPlay
              loop
              speed={1.5}
              style={{height: "100%", width: "100%"}}
            />
          </View>

          <Text
            style={{
              fontWeight: "bold",
              marginVertical: scale(20),
              fontSize: scale(20),
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            Thank you for getting in touch!
          </Text>

          <Text
            style={{
              color: CONTENT,
              fontSize: scale(14),
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            We will get back in touch with you soon through email!
          </Text>

          <TouchableWithoutFeedback onPress={returnToHome}>
            <View style={styles.containerStyle}>
              <Text style={styles.textStyle}>Return to Home</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

export default SupportModal;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(49,50,54, 0.6)",
  },
  modalView: {
    alignItems: "center",
    width: "80%",
    margin: "20@s",
    backgroundColor: "white",
    borderRadius: "20@s",
    padding: "20@s",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  containerStyle: {
    width: "80%",
    marginTop: "25@s",
    backgroundColor: SECONDARY,
    padding: "10@s",
    borderRadius: "30@s",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "#fff",
    fontSize: "15@s",
    fontWeight: "500",
  },
});

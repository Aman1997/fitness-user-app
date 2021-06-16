import React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {MaterialIcons} from "@expo/vector-icons";
import {SECONDARY, WHITE} from "../assets/constants/colors";
import AppSeparator from "../components/common/AppSeparator";
import {APP_MARGIN_HORIZONTAL} from "../assets/constants/styles";
import AppHeaderBack from "../components/common/AppHeaderBack";
import AppPageTitle from "../components/common/AppPageTitle";
import FitnessPartnerDetails from "../components/confirmation/FitnessPartnerDetails";
import BookingDetails from "../components/confirmation/BookingDetails";
import PriceDetails from "../components/confirmation/PriceDetails";
import {useSelector} from "react-redux";
import {ISelectedProfileState} from "../redux/reducers/selectedProfile";

export default function ConfirmationScreen() {
  const profile = useSelector(
    (state: {selectedProfile: ISelectedProfileState}) => state.selectedProfile,
  );
  

  return (
    <View style={{flex: 1}}>
      <AppHeaderBack />
      <View style={{marginHorizontal: APP_MARGIN_HORIZONTAL}}>
        <AppPageTitle
          pageTitle="Confirm and Pay"
          textStyles={{textTransform: "none", marginBottom: scale(8)}}
        />
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <FitnessPartnerDetails
          name={profile.name as string}
          ratings={profile.ratings}
          address={profile.address as string}
          imageUrl={profile.imageUrl as string}
        />

        <AppSeparator style={styles.separator as ViewStyle} />

        {/* Booking details section */}
        <BookingDetails
          type={profile.plan as number}
          date={profile.date as Date}
          timeSlot={profile.timeSlot as string}
          isMembership={profile.plan !== 0}
        />

        <AppSeparator style={styles.separator as ViewStyle} />

        {/* Price Details section */}
        <PriceDetails
          type={profile.plan as number}
          isMembership={profile.plan !== 0}
          price={profile.price as number}
        />
      </ScrollView>
      <View style={{backgroundColor: WHITE}}>
        <TouchableWithoutFeedback onPress={() => console.log("pay")}>
          <View style={styles.continueContainer}>
            <MaterialIcons name="lock" size={scale(20)} color={WHITE} />
            <Text style={styles.continueText}>Continue to Pay</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  lottieView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  separator: {
    marginVertical: "20@s",
    height: "6@s",
  },
  continueContainer: {
    flexDirection: "row",
    backgroundColor: SECONDARY,
    borderRadius: "26@s",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "15@s",
    marginHorizontal: "35@s",
    marginVertical: "30@s",
  },
  continueText: {
    color: WHITE,
    fontSize: "16@s",
    fontWeight: "500",
    marginLeft: "20@s",
  },
});

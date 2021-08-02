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
import {
  calculateCGST,
  calculateSGST,
  calculateTotal,
} from "../utils/confirmationScreenMethods";
import {IUserState} from "../redux/reducers/userReducer";
import {useNavigation} from "@react-navigation/native";
import {continueToPay} from "../helpers/continueToPay";
import {useState} from "react";
import OrderCompletedLottie from "../components/confirmation/OrderCompletedLottie";
import {StackNavigationProp} from "@react-navigation/stack";
import LoadingIndicator from "../components/common/LoadingIndicator";

export default function ConfirmationScreen() {
  const [isLoading, setLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const navigation = useNavigation<StackNavigationProp<any>>();

  const profile = useSelector(
    (state: {selectedProfile: ISelectedProfileState}) => state.selectedProfile,
  );
  const user = useSelector((state: {user: IUserState}) => state.user);

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : isCompleted ? (
        <OrderCompletedLottie
          animationFinished={() => {
            setIsCompleted(false);
            navigation.popToTop();
          }}
        />
      ) : (
        <View style={{flex: 1}}>
          <AppHeaderBack />
          <View style={{marginHorizontal: APP_MARGIN_HORIZONTAL}}>
            <AppPageTitle
              pageTitle="Confirm and Pay"
              textStyles={{textTransform: "none", marginBottom: scale(8)}}
            />
          </View>
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
          >
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
              price={profile.price as string}
            />
          </ScrollView>
          <View style={{backgroundColor: WHITE}}>
            <TouchableWithoutFeedback
              onPress={() => {
                setLoading(true);
                continueToPay(
                  calculateTotal(
                    Number(profile.price),
                    Number(calculateSGST(Number(profile.price))),
                    Number(calculateCGST(Number(profile.price))),
                  ),
                  profile.plan !== 0,
                  profile.date,
                  profile.plan as number,
                  profile.batch as number,
                  profile.name as string,
                  profile.ownerEmail as string,
                  user.email,
                  user.name,
                  user.phoneNumber,
                  navigation,
                  profile.id as string,
                  profile.timeSlot as string,
                  setLoading,
                  setIsCompleted,
                  profile.isMembershipRenew as boolean,
                );
              }}
            >
              <View style={styles.continueContainer}>
                <MaterialIcons name="lock" size={scale(20)} color={WHITE} />
                <Text style={styles.continueText}>Continue to Pay</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      )}
    </>
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

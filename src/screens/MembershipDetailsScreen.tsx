import {useNavigation, useRoute} from "@react-navigation/native";
import React, {useState} from "react";
import {Alert, ScrollView, Text, View} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import FitnessServiceImageView from "../components/bookingsScreen/FitnessServiceImageView";
import {checkMembershipStatus} from "../utils/checkMembershipStatus";
import AppButton from "../components/common/AppButton";
import {
  HEAD_TEXT,
  OFF_WHITE,
  SECONDARY,
  WHITE,
} from "../assets/constants/colors";
import MembershipBar from "../components/bookingsScreen/MembershipBar";
import {differenceInDays} from "date-fns";
import MembershipPlan from "../components/bookingsScreen/MembershipPlan";
import {
  getPlanPrice,
  getPlanType,
  handleRadioClick,
} from "../utils/membershipMethods";
import {confirmationScreen} from "../navigation/routes";
import {APP_MARGIN_HORIZONTAL} from "../assets/constants/styles";
import {useDispatch} from "react-redux";
import {addSelectedProfile} from "../redux/actions/actionCreator";
import { StatusBar } from "expo-status-bar";

export default function MembershipDetailsScreen() {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const route = useRoute();

  // @ts-ignore
  const {data} = route.params;

  const [isPlanSelected, setPlanSelected] = useState({
    monthly: false,
    quarterly: false,
    halfYearly: false,
    yearly: false,
  });

  const renewMembership = () => {
    if (
      // @ts-ignore
      Object.keys(isPlanSelected).filter((val) => isPlanSelected[val])
        .length === 0
    ) {
      Alert.alert("Please select one membership plan to renew");
    } else {
      dispatch(
        addSelectedProfile({
          id: data.id,
          name: data.name,
          ratings: data.ratings,
          address: data.address,
          plan: getPlanType(isPlanSelected),
          price: parseFloat(
            getPlanPrice(getPlanType(isPlanSelected) as number, data.plans),
          ),
          imageUrl: data.imageUrl,
        }),
      );
      navigation.navigate(confirmationScreen);
    }
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar style="dark" />
      <FitnessServiceImageView
        data={{
          imageUrl: data.imageUrl,
          name: data.name,
          to: data.to,
        }}
      />
      <ScrollView
        style={{
          paddingHorizontal: scale(20),
          marginTop: scale(20),
          marginBottom: scale(70),
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        {checkMembershipStatus(data.to) ? (
          <MembershipBar
            daysLeft={differenceInDays(Date.parse(data.to), Date.now())}
            membershipTenure={differenceInDays(
              Date.parse(data.to),
              Date.parse(data.from),
            )}
          />
        ) : (
          <Text>Your membership has expired!!</Text>
        )}

        <Text
          style={{
            marginVertical: scale(15),
            fontSize: scale(15),
            fontWeight: "600",
            color: HEAD_TEXT,
          }}
        >
          Renew your membership
        </Text>

        {data.monthly ? (
          <MembershipPlan
            planName="1 month"
            planPrice={`₹ ${getPlanPrice(1, data.plans)}`}
            isSelected={isPlanSelected.monthly}
            onSelected={(planType) =>
              handleRadioClick(planType, setPlanSelected)
            }
          />
        ) : null}
        {data.quarterly ? (
          <MembershipPlan
            planName="3 months"
            planPrice={`₹ ${getPlanPrice(2, data.plans)}`}
            isSelected={isPlanSelected.quarterly}
            onSelected={(planType) =>
              handleRadioClick(planType, setPlanSelected)
            }
          />
        ) : null}

        {data.halfYearly ? (
          <MembershipPlan
            planName="6 months"
            planPrice={`₹ ${getPlanPrice(3, data.plans)}`}
            isSelected={isPlanSelected.halfYearly}
            onSelected={(planType) =>
              handleRadioClick(planType, setPlanSelected)
            }
          />
        ) : null}
        {data.yearly ? (
          <MembershipPlan
            planName="12 months"
            planPrice={`₹ ${getPlanPrice(4, data.plans)}`}
            isSelected={isPlanSelected.yearly}
            onSelected={(planType) =>
              handleRadioClick(planType, setPlanSelected)
            }
          />
        ) : null}
      </ScrollView>
      <View
        style={{
          position: "absolute",
          alignItems: "center",
          paddingHorizontal: APP_MARGIN_HORIZONTAL,
          width: "100%",
          bottom: 0,
        }}
      >
        <AppButton
          text="Renew Membership"
          textStyle={{
            color: WHITE,
            fontSize: scale(16),
            fontWeight: "500",
          }}
          containerStyle={{
            backgroundColor: SECONDARY,
            width: "100%",
            alignItems: "center",
            paddingHorizontal: scale(20),
            paddingVertical: scale(15),
            borderRadius: scale(24),
            marginBottom: scale(25),
          }}
          onPressHandle={renewMembership}
        />
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  imageContainer: {
    height: "300@s",
    width: "100%",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  name: {
    fontWeight: "bold",
    color: WHITE,
    fontSize: "15@s",
    textTransform: "capitalize",
  },
  validity: {
    color: OFF_WHITE,
    fontSize: "14@s",
    marginTop: 10,
  },
});

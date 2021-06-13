import React from "react";
import {Text, View} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {
  CONTENT,
  PRIMARY,
  SECONDARY,
  WHITE,
} from "../../assets/constants/colors";
import AppButton from "../common/AppButton";

interface IProps {
  type: number;
  plans: Array<{type: number; price: number}>;
  isBestOffer: boolean;
}

export default function PlanView({type, plans, isBestOffer}: IProps) {
  return (
    <View style={styles.individualPlanContainer}>
      <View>
        {isBestOffer ? (
          <AppButton
            text="Best Offer"
            textStyle={{
              color: WHITE,
              fontSize: 12,
            }}
            containerStyle={{
              backgroundColor: PRIMARY,
              padding: 2,
              borderRadius: 8,
              alignItems: "center",
              marginBottom: 2,
              width: 80,
            }}
          />
        ) : null}
        <Text style={styles.textBody}>
          {type === 0
            ? `Per session @ ₹ ${
                plans.filter((plan) => plan.type === 0)[0]?.price
              }`
            : type === 1
            ? `1 month @ ₹ ${plans.filter((plan) => plan.type === 1)[0]?.price}`
            : type === 2
            ? `3 months @ ₹ ${
                plans.filter((plan) => plan.type === 2)[0]?.price
              }`
            : type === 3
            ? `6 months @ ₹ ${
                plans.filter((plan) => plan.type === 3)[0]?.price
              }`
            : type === 4
            ? `12 months @ ₹ ${
                plans.filter((plan) => plan.type === 4)[0]?.price
              }`
            : null}
        </Text>
      </View>
      <AppButton
        text={type === 0 ? "Book" : "Buy"}
        textStyle={{
          color: WHITE,
          fontSize: scale(14),
        }}
        containerStyle={{
          backgroundColor: SECONDARY,
          padding: scale(10),
          borderRadius: scale(12),
          width: scale(60),
          alignItems: "center",
        }}
        // onPressHandle={() =>
        //   navigation.navigate("BookingCalendarScreen", {
        //     partnerData: {
        //       id: partnerDetails?.getFitnessPartner.id,
        //       imageUrl: partnerDetails?.getFitnessPartner.imageUrl,
        //       name: partnerDetails?.getFitnessPartner.name,
        //       rating: partnerDetails?.getFitnessPartner.ratings,
        //       address: partnerDetails?.getFitnessPartner.address,
        //       availableSlots: partnerDetails?.getFitnessPartner.availableSlots,
        //     },
        //     bookingData: {
        //       price: plans.filter((plan) => plan.type === 0)[0]?.price,
        //       type: 0,
        //     },
        //   })
        // }
        // onPressHandle={() =>
        //     navigation.navigate("ConfirmationScreen", {
        //       partnerData: {
        //         id: partnerDetails?.getFitnessPartner.id,
        //         imageUrl: partnerDetails?.getFitnessPartner.imageUrl,
        //         name: partnerDetails?.getFitnessPartner.name,
        //         rating: partnerDetails?.getFitnessPartner.ratings,
        //         address: partnerDetails?.getFitnessPartner.address,
        //       },
        //       bookingData: {
        //         price: plans.filter((plan) => plan.type === 1)[0]?.price,
        //         type: 1,
        //       },
        //       isMembership: true,
        //     })
        //   }
      />
    </View>
  );
}

const styles = ScaledSheet.create({
  textBody: {
    fontSize: "14@s",
    marginVertical: "10@s",
    color: CONTENT,
  },
  individualPlanContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: "10@s",
  },
});

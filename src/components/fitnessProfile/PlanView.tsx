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
  selectPlan: (type: number, price: number) => void;
}

export default function PlanView({
  type,
  plans,
  isBestOffer,
  selectPlan,
}: IProps) {
  const select = () => {
    selectPlan(type, getPrice(type));
  };

  const getPrice = (type: number): number => {
    return plans.filter((plan) => plan.type === type)[0]?.price;
  };

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
            ? `Per session @ ₹ ${getPrice(0)}`
            : type === 1
            ? `1 month @ ₹ ${getPrice(1)}`
            : type === 2
            ? `3 months @ ₹ ${getPrice(2)}`
            : type === 3
            ? `6 months @ ₹ ${getPrice(3)}`
            : type === 4
            ? `12 months @ ₹ ${getPrice(4)}`
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
        onPressHandle={select}
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

import React from "react";
import {Text, View} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {
  CONTENT,
  PRIMARY,
  SECONDARY,
  WHITE,
} from "../../assets/constants/colors";
import {minPriceString} from "../../utils/plansMethods";
import AppButton from "../common/AppButton";

interface IProps {
  type: number;
  plans: Array<{
    type: number;
    batch: number;
    timeSlotTo: string;
    timeSlotFrom: string;
    price: string;
  }>;
  isBestOffer: boolean;
  selectPlan: () => void;
  onPress: () => void;
}

export default function PlanView({
  type,
  plans,
  isBestOffer,
  selectPlan,
  onPress,
}: IProps) {
  
  const select = () => {
    selectPlan();
    onPress();
  };

  return (
    <View style={styles.individualPlanContainer}>
      <View>
        {isBestOffer ? (
          <AppButton
            text="Best Offer"
            textStyle={{
              color: WHITE,
              fontSize: scale(10),
            }}
            containerStyle={{
              backgroundColor: PRIMARY,
              padding: scale(2),
              borderRadius: scale(8),
              alignItems: "center",
              marginBottom: scale(2),
              width: scale(70),
            }}
          />
        ) : null}
        <Text style={styles.textBody}>
          {type === 0
            ? `Per session ${minPriceString(plans, 0)}`
            : type === 1
            ? `1 month ${minPriceString(plans, 1)}`
            : type === 2
            ? `3 months ${minPriceString(plans, 2)}`
            : type === 3
            ? `6 months ${minPriceString(plans, 3)}`
            : type === 4
            ? `12 months ${minPriceString(plans, 4)}`
            : null}
        </Text>
      </View>
      <AppButton
        text="Select"
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
    fontSize: "13@s",
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

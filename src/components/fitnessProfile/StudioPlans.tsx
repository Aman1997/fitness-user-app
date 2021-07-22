import React from "react";
import {Text, View} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {HEAD_TEXT} from "../../assets/constants/colors";
import {APP_MARGIN_HORIZONTAL} from "../../assets/constants/styles";
import AppSeparator from "../common/AppSeparator";
import PlanView from "./PlanView";

interface IProps {
  plans: Array<{
    type: number;
    batch: number;
    timeSlotTo: string;
    timeSlotFrom: string;
    price: string;
  }>;
  setType: (type: number) => void;
  onPress: () => void;
}

export default function StudioPlans({
  plans,
  setType,
  onPress,
}: IProps) {

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Studio plans</Text>

      <PlanView
        type={0}
        isBestOffer={true}
        plans={plans}
        selectPlan={() => setType(0)}
        onPress={onPress}
      />

      {plans.filter((plan) => plan.type === 1).length === 0 ? null : (
        <PlanView
          type={1}
          isBestOffer={false}
          plans={plans}
          selectPlan={() => setType(1)}
          onPress={onPress}
        />
      )}

      {plans.filter((plan) => plan.type === 2).length === 0 ? null : (
        <PlanView
          type={2}
          isBestOffer={true}
          plans={plans}
          selectPlan={() => setType(2)}
          onPress={onPress}
        />
      )}

      {plans.filter((plan) => plan.type === 3).length === 0 ? null : (
        <PlanView
          type={3}
          isBestOffer={false}
          plans={plans}
          selectPlan={() => setType(3)}
          onPress={onPress}
        />
      )}

      {plans.filter((plan) => plan.type === 4).length === 0 ? null : (
        <PlanView
          type={1}
          isBestOffer={true}
          plans={plans}
          selectPlan={() => setType(4)}
          onPress={onPress}
        />
      )}

      <AppSeparator style={{marginVertical: scale(20)}} />
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    marginHorizontal: APP_MARGIN_HORIZONTAL,
  },
  headingText: {
    textTransform: "capitalize",
    fontWeight: "500",
    fontSize: "15@s",
    marginBottom: "10@s",
    color: HEAD_TEXT,
  },
});

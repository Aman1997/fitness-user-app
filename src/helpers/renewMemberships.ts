import {NavigationProp} from "@react-navigation/native";
import {Dispatch} from "react";
import {Alert} from "react-native";
import {confirmationScreen} from "../navigation/routes";
import {addSelectedProfile} from "../redux/actions/actionCreator";
import {getPlanPrice, getPlanType} from "../utils/membershipMethods";

export const renewMemberships = (
  dispatch: Dispatch<any>,
  data: any,
  isPlanSelected: {
    monthly: boolean;
    quarterly: boolean;
    halfYearly: boolean;
    yearly: boolean;
  },
  navigation: NavigationProp<any>,
) => {
  if (
    // @ts-ignore
    Object.keys(isPlanSelected).filter((val) => isPlanSelected[val]).length ===
    0
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

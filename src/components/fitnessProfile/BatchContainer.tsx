import {useNavigation} from "@react-navigation/native";
import React from "react";
import {Text, View} from "react-native";
import {TouchableWithoutFeedback} from "react-native-gesture-handler";
import {scale, ScaledSheet} from "react-native-size-matters";
import {useDispatch} from "react-redux";
import {
  CONTENT,
  LIGHT_GREY,
  OFF_WHITE,
  PRIMARY,
} from "../../assets/constants/colors";
import {APP_MARGIN_HORIZONTAL} from "../../assets/constants/styles";
import {
  bookingCalendarScreen,
  confirmationScreen,
} from "../../navigation/routes";
import {addSelectedProfile} from "../../redux/actions/actionCreator";
import {formatTimeSlot} from "../../utils/dateTimeMethods";
import {getPlanDays} from "../../utils/plansMethods";
import AppButton from "../common/AppButton";
import AppSeparator from "../common/AppSeparator";

interface IProps {
  plans: Array<{
    id: string;
    type: number;
    batch: number;
    timeSlotTo: string;
    timeSlotFrom: string;
    price: string;
    days: Array<number>;
  }>;
  id: string;
  name: string;
  imageUrl: string;
  ratings: number;
  address: string;
  ownerEmail: string;
  isMembershipRenew: boolean;
}

const BatchContainer = ({
  plans,
  id,
  name,
  imageUrl,
  ratings,
  address,
  ownerEmail,
  isMembershipRenew
}: IProps) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const selectPlan = (type: number, price: string, batch: number) => {
    dispatch(
      addSelectedProfile({
        id,
        name,
        ownerEmail,
        imageUrl,
        ratings,
        address,
        plan: type,
        price,
        batch,
        isMembershipRenew,
      }),
    );
    if (type === 0) {
      navigation.navigate(bookingCalendarScreen);
    } else {
      navigation.navigate(confirmationScreen);
    }
  };

  return (
    <View style={styles.container}>
      {plans.map((plan) => (
        <View key={plan.id}>
          <Text style={styles.headText}>Batch-{plan?.batch}</Text>
          <View style={styles.mainRowContainer}>
            <View style={styles.detailsContainer}>
              <Text style={styles.daysText}>
                {getPlanDays(plan?.days)?.join(", ")}
              </Text>
              {plan.type === 0 ? (
                <Text style={styles.timeSlotText}>
                  {formatTimeSlot(plan?.timeSlotFrom)} -{" "}
                  {formatTimeSlot(plan?.timeSlotTo)}
                </Text>
              ) : null}
            </View>

            <View style={styles.bookingContainer}>
              <Text style={styles.priceText}>₹ {plan.price}</Text>

              <View
                style={{
                  borderColor: PRIMARY,
                  borderWidth: scale(1),
                  borderRadius: scale(8),
                }}
              >
                <AppButton
                  text="Book"
                  textStyle={{
                    color: PRIMARY,
                    fontSize: scale(14),
                    fontWeight: "500",
                  }}
                  containerStyle={{
                    paddingHorizontal: scale(18),
                    paddingVertical: scale(5),
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPressHandle={() =>
                    selectPlan(plan.type, plan?.price, plan?.batch)
                  }
                />
              </View>
            </View>
          </View>
          {plans.length > 1 && (
            <AppSeparator
              style={{
                backgroundColor: "#C4C4C4",
                height: scale(1),
                marginTop: scale(15),
                opacity: scale(0.5),
              }}
            />
          )}
        </View>
      ))}
    </View>
  );
};

export default BatchContainer;

const styles = ScaledSheet.create({
  container: {
    height: "100%",
    backgroundColor: OFF_WHITE,
    paddingHorizontal: APP_MARGIN_HORIZONTAL,
  },
  mainRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headText: {
    color: CONTENT,
    fontSize: "15@s",
    fontWeight: "bold",
    marginTop: "20@s",
  },
  detailsContainer: {
    marginTop: "15@s",
  },
  daysText: {
    maxWidth: "140@s",
    fontSize: "13@s",
    color: LIGHT_GREY,
    marginBottom: "10@s",
  },
  timeSlotText: {
    fontSize: "12@s",
    color: CONTENT,
  },
  bookingContainer: {
    marginTop: "15@s",
    justifyContent: "center",
    alignItems: "center",
  },
  priceText: {
    fontSize: "12@s",
    color: LIGHT_GREY,
    fontWeight: "700",
    marginBottom: "10@s",
  },
});

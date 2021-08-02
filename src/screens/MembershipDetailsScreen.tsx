import {useNavigation, useRoute} from "@react-navigation/native";
import React, {useState} from "react";
import {ScrollView, Text, View} from "react-native";
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
import {getPlanPrice, handleRadioClick} from "../utils/membershipMethods";
import {APP_MARGIN_HORIZONTAL} from "../assets/constants/styles";
import {useDispatch} from "react-redux";
import {StatusBar} from "expo-status-bar";
import {renewMemberships} from "../helpers/renewMemberships";
import BottomSheet from "reanimated-bottom-sheet";
import BatchContainer from "../components/fitnessProfile/BatchContainer";

export default function MembershipDetailsScreen() {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const route = useRoute();

  // @ts-ignore
  const {data} = route.params;
  console.log(data);

  const [type, setType] = useState(1);
  const [isPlanSelected, setPlanSelected] = useState({
    monthly: false,
    quarterly: false,
    halfYearly: false,
    yearly: false,
  });

  const sheetRef = React.useRef(null);

  return (
    <>
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
              plans={data.plans}
              type={1}
              planName="1 month"
              planPrice={`₹ ${getPlanPrice(1, data.plans)}`}
              isSelected={isPlanSelected.monthly}
              onSelected={(planType) => {
                handleRadioClick(planType, setPlanSelected);
                setType(1);
              }}
            />
          ) : null}
          {data.quarterly ? (
            <MembershipPlan
              plans={data.plans}
              type={2}
              planName="3 months"
              planPrice={`₹ ${getPlanPrice(2, data.plans)}`}
              isSelected={isPlanSelected.quarterly}
              onSelected={(planType) => {
                handleRadioClick(planType, setPlanSelected);
                setType(2);
              }}
            />
          ) : null}

          {data.halfYearly ? (
            <MembershipPlan
              plans={data.plans}
              type={3}
              planName="6 months"
              planPrice={`₹ ${getPlanPrice(3, data.plans)}`}
              isSelected={isPlanSelected.halfYearly}
              onSelected={(planType) => {
                handleRadioClick(planType, setPlanSelected);
                setType(3);
              }}
            />
          ) : null}
          {data.yearly ? (
            <MembershipPlan
              plans={data.plans}
              type={4}
              planName="12 months"
              planPrice={`₹ ${getPlanPrice(4, data.plans)}`}
              isSelected={isPlanSelected.yearly}
              onSelected={(planType) => {
                handleRadioClick(planType, setPlanSelected);
                setType(4);
              }}
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
              fontSize: scale(15),
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
            onPressHandle={
              // @ts-ignore
              () => sheetRef.current.snapTo(0)
              // renewMemberships(dispatch, data, isPlanSelected, navigation)
            }
          />
        </View>
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={
          // @ts-ignore
          data?.plans.filter((plan) => plan.type === type).length === 1
            ? [scale(200), 0, 0]
            : // @ts-ignore
            data?.plans.filter((plan) => plan.type === type).length === 2
            ? [scale(280), scale(260), 0]
            : [scale(400), scale(260), 0]
        }
        initialSnap={2}
        borderRadius={scale(20)}
        enabledContentTapInteraction={false}
        renderContent={() => (
          <BatchContainer
            plans={data?.plans
              // @ts-ignore
              .filter((plan) => plan.type === type)
              // @ts-ignore
              ?.sort((a, b) => a.batch - b.batch)}
            id={data.id}
            name={data.name}
            imageUrl={data.imageUrl[0]}
            ratings={data.ratings}
            address={data.address}
            ownerEmail={data.ownerEmail}
            isMembershipRenew={true}
          />
        )}
      />
    </>
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

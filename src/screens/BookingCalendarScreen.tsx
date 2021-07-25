import React, {useEffect, useState} from "react";
import {ScrollView, View, Platform} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {PRIMARY, SECONDARY, WHITE} from "../assets/constants/colors";
import {startOfDay} from "date-fns";
import takeMonth, {
  generateTimeSlots,
  getTimeSlotArray,
} from "../utils/generateCalendar";
import AppSeparator from "../components/common/AppSeparator";
import AppButton from "../components/common/AppButton";
import Constants from "expo-constants";
import CalendarView from "../components/bookingCalendar/CalendarView";
import TimeSlotView from "../components/bookingCalendar/TimeSlotView";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {addSelectedProfile} from "../redux/actions/actionCreator";
import {confirmationScreen} from "../navigation/routes";
import {ISelectedProfileState} from "../redux/reducers/selectedProfile";
import {Alert} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {IFitnessProfilesState} from "../redux/reducers/fitnessProfiles";

export default function BookingCalendarScreen() {
  const [start, setStart] = useState(startOfDay(new Date()));
  const [calendarData, setCalendarData] = useState<Array<Array<Date>>>([]);
  const [time, setTime] = useState("");
  const [slot, setSlot] = useState<Array<Array<string>>>([]);

  const navigation = useNavigation<StackNavigationProp<any>>();

  const dispatch = useDispatch();
  const profile = useSelector(
    (state: {selectedProfile: ISelectedProfileState}) => state.selectedProfile,
  );

  const fitnessProfilePlans = useSelector(
    (state: {fitnessProfiles: IFitnessProfilesState}) => state.fitnessProfiles,
  ).profiles.filter((item) => item.id === profile.id)[0]?.plans;

  useEffect(() => {
    const generateMonth = takeMonth(start);
    setCalendarData(generateMonth());
    const tempSlots = generateTimeSlots(
      getTimeSlotArray(
        fitnessProfilePlans.filter((item) => item.type === 0)[0]?.timeSlotFrom,
        fitnessProfilePlans.filter((item) => item.type === 0)[0]?.timeSlotTo,
      ),
    );
    setSlot(tempSlots);
  }, [start, fitnessProfilePlans]);

  const proceedToConfirmation = () => {
    if (!time) return Alert.alert("Please select a time slot");
    dispatch(addSelectedProfile({...profile, timeSlot: time, date: start}));
    navigation.replace(confirmationScreen);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CalendarView
        start={start}
        setStart={setStart}
        calendarData={calendarData}
      />

      <AppSeparator
        style={{
          height: 2,
          backgroundColor: WHITE,
          marginVertical: 20,
        }}
      />

      <TimeSlotView slot={slot} start={start} time={time} setTime={setTime} />

      {/* <Text style={styles.slotSuggestionText}>
        This time slot would have 50% occupancy of the studio as per the
        historical trend
      </Text> */}

      <View style={{flex: 1, justifyContent: "flex-end"}}>
        <View
          style={{
            borderColor: WHITE,
            borderRadius: scale(20),
            borderWidth: scale(1),
            padding: scale(10),
            marginVertical: scale(10),
          }}
        >
          <AppButton
            text="Book Session"
            textStyle={{
              color: WHITE,
              fontWeight: "500",
              fontSize: scale(16),
            }}
            containerStyle={{
              alignItems: "center",
            }}
            onPressHandle={proceedToConfirmation}
          />
        </View>
        <AppButton
          text="Cancel"
          textStyle={{
            color: SECONDARY,
            fontWeight: "500",
            fontSize: scale(16),
          }}
          containerStyle={{
            alignItems: "center",
            padding: scale(10),
            borderColor: PRIMARY,
            borderRadius: scale(20),
            borderWidth: scale(1),
            marginBottom: scale(10),
            backgroundColor: WHITE,
          }}
          onPressHandle={() => navigation.goBack()}
        />
      </View>
    </ScrollView>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    padding: "20@s",
    backgroundColor: PRIMARY,
    paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 44,
  },
  yearMonthContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "30@s",
    marginTop: "20@s",
  },
  yearMonthText: {
    fontWeight: "bold",
    fontSize: "22@s",
    color: WHITE,
  },
  slotSuggestionText: {
    color: WHITE,
    marginVertical: "20@s",
  },
});

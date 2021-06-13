import React, {useEffect, useState} from "react";
import {ScrollView, View, Platform} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {PRIMARY, SECONDARY, WHITE} from "../assets/constants/colors";
import {startOfDay} from "date-fns";
import takeMonth, {generateTimeSlots} from "../utils/generateCalendar";
import AppSeparator from "../components/common/AppSeparator";
import AppButton from "../components/common/AppButton";
import Constants from "expo-constants";
import CalendarView from "../components/bookingCalendar/CalendarView";
import TimeSlotView from "../components/bookingCalendar/TimeSlotView";

const availableSlots = [
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "18:00",
];

export default function BookingCalendarScreen() {
  const [start, setStart] = useState(startOfDay(new Date()));
  const [calendarData, setCalendarData] = useState<Array<Array<Date>>>([]);
  const [time, setTime] = useState("");
  const [slot, setSlot] = useState<Array<Array<string>>>([]);

  useEffect(() => {
    const generateMonth = takeMonth(start);
    setCalendarData(generateMonth());
    const tempSlots = generateTimeSlots(availableSlots);
    setSlot(tempSlots);
  }, [start]);

  const proceedToConfirmation = () => {
    console.log("Proceed");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CalendarView
        start={start}
        setStart={setStart}
        calendarData={calendarData}
        setCalendarData={setCalendarData}
        setSlot={setSlot}
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
        <AppButton
          text="Book Session"
          textStyle={{
            color: WHITE,
            fontWeight: "500",
            fontSize: scale(16),
          }}
          containerStyle={{
            alignItems: "center",
            padding: scale(10),
            borderColor: WHITE,
            borderRadius: scale(20),
            borderWidth: scale(1),
            marginVertical: scale(10),
          }}
          onPressHandle={proceedToConfirmation}
        />
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
          // onPressHandle={() => navigation.goBack()}
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

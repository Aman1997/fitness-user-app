import {format, startOfDay} from "date-fns";
import React, {useEffect, useState} from "react";
import {Platform, Text, View} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {
  addToDays,
  isBeforeDay,
  isSameMonthDate,
  isSelectedDay,
  subtractDays,
} from "../../utils/calendarHelper";
import takeMonth, {generateTimeSlots} from "../../utils/generateCalendar";
import {AntDesign} from "@expo/vector-icons";
import {ICONS, PRIMARY, WHITE} from "../../assets/constants/colors";
import {Dispatch} from "react";
import {SetStateAction} from "react";

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

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

interface IProps {
  start: Date;
  setStart: Dispatch<SetStateAction<Date>>;
  calendarData: Array<Array<Date>>;
  setCalendarData: (calendarData: Array<Array<Date>>) => void;
  setSlot: (slot: Array<Array<string>>) => void;
}

export default function CalendarView({
  start,
  setStart,
  calendarData,
  setCalendarData,
  setSlot,
}: IProps) {
  useEffect(() => {
    const generateMonth = takeMonth(start);
    setCalendarData(generateMonth());
    const tempSlots = generateTimeSlots(availableSlots);
    setSlot(tempSlots);
  }, [start]);

  return (
    <View>
      {/* Header container for month, year and icons to move forward and backward */}
      <View style={styles.yearMonthContainer}>
        {isSameMonthDate(start) ? (
          <AntDesign name="stepbackward" size={scale(20)} color={ICONS} />
        ) : (
          <AntDesign
            name="stepbackward"
            size={scale(18)}
            color={WHITE}
            onPress={() => setStart(subtractDays(start))}
          />
        )}
        <View style={{flexDirection: "row"}}>
          <Text style={styles.yearMonthText}>
            {format(start, "MMMM")}&nbsp;&nbsp;
          </Text>
          <Text style={styles.yearMonthText}>{format(start, "yyyy")}</Text>
        </View>
        <AntDesign
          name="stepforward"
          size={scale(18)}
          color={WHITE}
          onPress={() => setStart(addToDays(start))}
        />
      </View>

      {/* Section for days */}
      <View style={{flexDirection: "row", marginBottom: scale(15)}}>
        {weekDays.map((day, index) => (
          <Text
            key={index}
            style={{
              color: WHITE,
              marginHorizontal: scale(10),
              flex: 1,
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            {day}
          </Text>
        ))}
      </View>

      {/* Section for populating dates */}
      {calendarData.map((week, i) => (
        <View key={i} style={{flexDirection: "row", marginBottom: 8}}>
          {week.map((day, index) => (
            <Text
              key={index}
              style={
                isBeforeDay(day)
                  ? {
                      color: "#929290",
                      marginHorizontal: 10,
                      flex: 1,
                      textAlign: "center",
                      padding: 4,
                    }
                  : isSelectedDay(day, start)
                  ? {
                      color: PRIMARY,
                      backgroundColor: WHITE,
                      marginHorizontal: 10,
                      flex: 1,
                      textAlign: "center",
                      padding: 4,
                      borderRadius: 5,
                    }
                  : {
                      color: WHITE,
                      marginHorizontal: 10,
                      flex: 1,
                      textAlign: "center",
                      padding: 4,
                    }
              }
              onPress={() => (isBeforeDay(day) ? null : setStart(day))}
            >
              {format(day, "dd").toString()}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = ScaledSheet.create({
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
});

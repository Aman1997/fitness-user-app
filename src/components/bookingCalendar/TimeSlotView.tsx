import React from "react";
import {Dimensions, View} from "react-native";
import {scale} from "react-native-size-matters";
import {PRIMARY, SECONDARY, WHITE} from "../../assets/constants/colors";
import {isBeforeTimeSlot, isSameTimeSlot} from "../../utils/generateCalendar";
import AppButton from "../common/AppButton";

interface IProps {
  slot: Array<Array<string>>;
  start: Date;
  time: string;
  setTime: (time: string) => void;
}

export default function TimeSlotView({slot, start, time, setTime}: IProps) {
  return (
    <View>
      {/* Section for populating the time slots */}
      {slot.map((row, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            marginVertical: scale(10),
          }}
        >
          {row.map((slot, index) => (
            <AppButton
              key={index}
              text={slot}
              textStyle={
                isBeforeTimeSlot(slot, start)
                  ? {color: PRIMARY}
                  : isSameTimeSlot(time, slot)
                  ? {color: WHITE}
                  : {color: PRIMARY}
              }
              containerStyle={
                isBeforeTimeSlot(slot, start)
                  ? {
                      paddingHorizontal: scale(5),
                      paddingVertical: scale(5),
                      backgroundColor: "rgba(146, 146, 144, 0.4)",
                      borderRadius: scale(5),
                      marginHorizontal: scale(10),
                      minWidth:
                        (Dimensions.get("window").width - scale(20)) / 6,
                      alignItems: "center",
                    }
                  : isSameTimeSlot(time, slot)
                  ? {
                      paddingHorizontal: scale(5),
                      paddingVertical: scale(5),
                      backgroundColor: SECONDARY,
                      borderColor: WHITE,
                      borderRadius: scale(5),
                      borderWidth: scale(1),
                      marginHorizontal: scale(10),
                      minWidth:
                        (Dimensions.get("window").width - scale(20)) / 6,
                      alignItems: "center",
                    }
                  : {
                      paddingHorizontal: scale(5),
                      paddingVertical: scale(5),
                      borderRadius: scale(5),
                      backgroundColor: WHITE,
                      marginHorizontal: scale(10),
                      minWidth:
                        (Dimensions.get("window").width - scale(20)) / 6,
                      alignItems: "center",
                    }
              }
              onPressHandle={() =>
                isBeforeTimeSlot(slot, start) ? null : setTime(slot)
              }
            />
          ))}
        </View>
      ))}
    </View>
  );
}

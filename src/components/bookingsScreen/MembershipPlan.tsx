import React from "react";
import {Text, TouchableWithoutFeedback, View} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {
  CONTENT,
  HEAD_TEXT,
  OFF_WHITE,
  PRIMARY,
  WHITE,
} from "../../assets/constants/colors";

interface IProps {
  planName: string;
  planPrice: string;
  isSelected: boolean;
  onSelected: (data: string) => void;
}

export default function MembershipPlan({
  planName,
  planPrice,
  isSelected,
  onSelected,
}: IProps) {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onSelected(planName);
      }}
    >
      <View
        style={
          isSelected
            ? [
                styles.cardContainer,
                {
                  shadowColor: PRIMARY,
                  shadowOffset: {
                    width: 3,
                    height: 6,
                  },
                  elevation: 5,
                },
              ]
            : styles.cardContainer
        }
      >
        <View>
          <View style={{flexDirection: "row"}}>
            {/* Radio button UI */}
            <View
              style={{
                height: scale(20),
                width: scale(20),
                borderRadius: scale(10),
                borderColor: HEAD_TEXT,
                borderWidth: 1,
                backgroundColor: WHITE,
                justifyContent: "center",
                alignItems: "center",
                marginRight: scale(20),
              }}
            >
              {isSelected ? (
                <View
                  style={{
                    height: scale(12),
                    width: scale(12),
                    borderRadius: scale(6),
                    backgroundColor: PRIMARY,
                  }}
                ></View>
              ) : null}
            </View>

            <Text
              style={{
                color: CONTENT,
                fontSize: scale(14),
              }}
            >
              {planName} membership
            </Text>
          </View>
          <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
            <Text
              style={{
                color: "#5A5A5C",
                fontWeight: "bold",
                fontSize: scale(16),
              }}
            >
              {planPrice}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = ScaledSheet.create({
  cardContainer: {
    width: "100%",
    backgroundColor: OFF_WHITE,
    borderRadius: "10@s",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: "15@s",
    paddingHorizontal: "10@s",
    marginVertical: "10@s",
  },
});

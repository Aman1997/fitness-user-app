import React from "react";
import {Text, View} from "react-native";
import {ScaledSheet} from "react-native-size-matters";
import {HEAD_TEXT, PRIMARY} from "../../assets/constants/colors";

interface IProps {
  isSessionSelected: boolean;
  isMembershipSelected: boolean;
  setMembershipSelected: (isMembershipSelected: boolean) => void;
  setSessionSelected: (isSessionSelected: boolean) => void;
}

export default function SelectedView({
  isSessionSelected,
  isMembershipSelected,
  setMembershipSelected,
  setSessionSelected,
}: IProps) {
  return (
    <View style={styles.statusContainer}>
      <View style={isSessionSelected ? styles.selectedView : null}>
        <Text
          style={isSessionSelected ? styles.selectedText : styles.defaultText}
          onPress={() => {
            setMembershipSelected(false);
            setSessionSelected(true);
          }}
        >
          Sessions
        </Text>
      </View>
      <View style={isMembershipSelected ? styles.selectedView : null}>
        <Text
          style={
            isMembershipSelected ? styles.selectedText : styles.defaultText
          }
          onPress={() => {
            setMembershipSelected(true);
            setSessionSelected(false);
          }}
        >
          Memberships
        </Text>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  statusContainer: {
    flexDirection: "row",
    marginTop: "20@s",
    justifyContent: "space-around",
  },
  selectedView: {
    borderBottomColor: PRIMARY,
    borderBottomWidth: "3@s",
    paddingBottom: "8@s",
  },
  selectedText: {
    fontSize: "15@s",
    fontWeight: "500",
    color: HEAD_TEXT,
  },
  defaultText: {
    fontSize: "14@s",
    color: "#929290",
  },
});

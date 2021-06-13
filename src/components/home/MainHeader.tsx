import React, {useState} from "react";
import {Text, TextStyle, View, ViewStyle} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import AppSafeAreaView from "../common/AppSafeAreaView";
import {FontAwesome, AntDesign, Entypo} from "@expo/vector-icons";
import {
  HEAD_TEXT,
  ICONS,
  SECONDARY,
  WHITE,
  OFF_WHITE,
} from "../../assets/constants/colors";
import {APPNAME} from "../../assets/constants/string";
import AppButton from "../common/AppButton";
import {APP_MARGIN_HORIZONTAL} from "../../assets/constants/styles";

interface IProps {
  onPressSearch: () => void;
  onPressSettings: () => void;
  onPressLocation: () => void;
  onPressFilter: () => void;
  onPressToggle: () => void;
}

export default function MainHeader({
  onPressSearch,
  onPressSettings,
  onPressLocation,
  onPressFilter,
  onPressToggle,
}: IProps) {
  const [isStudioActive, setIsStudioActive] = useState(true);
  const [isTrainerActive, setIsTrainerActive] = useState(false);

  const selectedToggleContainerStyle: ViewStyle = {
    borderRadius: scale(13),
    backgroundColor: SECONDARY,
    justifyContent: "center",
    alignItems: "center",
    height: scale(25),
    paddingHorizontal: scale(10),
  };
  let defaultToggleContainerStyle: ViewStyle = {
    backgroundColor: WHITE,
    justifyContent: "center",
    alignItems: "center",
    height: scale(25),
    paddingHorizontal: scale(10),
  };

  const selectedToggleTextStyle: TextStyle = {
    color: WHITE,
    fontSize: scale(14),
    fontWeight: "500",
    textTransform: "capitalize",
  };
  const defaultToggleTextStyle: TextStyle = {
    color: HEAD_TEXT,
    fontSize: scale(14),
    fontWeight: "500",
    textTransform: "capitalize",
  };

  const onToggleHandle = (data: number) => {
    if (data === 1) {
      setIsStudioActive(false);
      setIsTrainerActive(true);
    } else {
      setIsStudioActive(true);
      setIsTrainerActive(false);
    }
    onPressToggle();
  };

  return (
    <AppSafeAreaView style={styles.container as ViewStyle}>
      <View style={styles.mainView}>
        <AntDesign
          name="search1"
          size={scale(20)}
          color={ICONS}
          onPress={onPressSearch}
        />
        <Text style={{fontSize: scale(18), fontWeight: "bold"}}>{APPNAME}</Text>
        <AntDesign
          name="menufold"
          size={scale(20)}
          color={ICONS}
          onPress={onPressSettings}
        />
      </View>

      <View style={styles.secondaryView}>
        <Entypo
          name="location-pin"
          size={scale(24)}
          color={ICONS}
          onPress={onPressLocation}
        />
        <View style={styles.toggleContainer}>
          <AppButton
            text="Studios"
            containerStyle={
              isStudioActive
                ? selectedToggleContainerStyle
                : defaultToggleContainerStyle
            }
            onPressHandle={() => onToggleHandle(0)}
            textStyle={
              isStudioActive ? selectedToggleTextStyle : defaultToggleTextStyle
            }
          />
          <AppButton
            text="trainers"
            containerStyle={
              isTrainerActive
                ? selectedToggleContainerStyle
                : defaultToggleContainerStyle
            }
            onPressHandle={() => onToggleHandle(1)}
            textStyle={
              isTrainerActive ? selectedToggleTextStyle : defaultToggleTextStyle
            }
          />
        </View>
        <FontAwesome
          name="filter"
          size={scale(22)}
          color={ICONS}
          onPress={onPressFilter}
        />
      </View>
    </AppSafeAreaView>
  );
}

const styles = ScaledSheet.create({
  container: {
    backgroundColor: OFF_WHITE,
  },
  mainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: APP_MARGIN_HORIZONTAL,
    paddingTop: "10@s",
    alignItems: "center",
  },
  secondaryView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "20@s",
    paddingBottom: "15@s",
    paddingHorizontal: APP_MARGIN_HORIZONTAL,
  },
  toggleContainer: {
    flexDirection: "row",
    height: "35@s",
    borderRadius: "18@s",
    backgroundColor: WHITE,
    alignItems: "center",
    justifyContent: "space-evenly",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 2,
    paddingHorizontal: "10@s",
  },
});

import React from "react";
import {Platform, View, ViewStyle} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {PRIMARY_20, PRIMARY} from "../../assets/constants/colors";
import Constants from "expo-constants";
import {useNavigation} from "@react-navigation/core";
import {scale, ScaledSheet} from "react-native-size-matters";
interface IProps {
  onBack?: () => void;
  extraStyles?: ViewStyle
}

export default function AppHeaderBack({onBack, extraStyles}: IProps) {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, extraStyles]}>
      <View style={styles.backContainer}>
        <AntDesign
          name="left"
          size={scale(22)}
          color={PRIMARY}
          onPress={onBack ? onBack : () => navigation.goBack()}
        />
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    marginBottom: "20@s",
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight + 10 : 54,
  },
  backContainer: {
    backgroundColor: PRIMARY_20,
    width: "50@s",
    borderTopRightRadius: "10@s",
    borderBottomRightRadius: "10@s",
    paddingVertical: "10@s",
    paddingHorizontal: "15@s",
  },
});

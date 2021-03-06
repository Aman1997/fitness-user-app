import {useNavigation} from "@react-navigation/native";
import React from "react";
import {Platform, View} from "react-native";
import {scale, ScaledSheet} from "react-native-size-matters";
import {FontAwesome} from "@expo/vector-icons";
import AppHeaderBack from "../common/AppHeaderBack";
import Constants from "expo-constants";
import { editProfileScreen } from "../../navigation/routes";

const ProfileHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerIconContainer}>
      <AppHeaderBack />
      <FontAwesome
        name="edit"
        size={scale(22)}
        color="black"
        onPress={
          () => navigation.navigate(editProfileScreen)
        }
        style={{
          marginTop:
            Platform.OS === "android" ? Constants.statusBarHeight + 26 : 65,
        }}
      />
    </View>
  );
};

export default ProfileHeader;

const styles = ScaledSheet.create({
  headerIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: "20@s",
  },
});

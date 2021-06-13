import React, {Dispatch, SetStateAction} from "react";
import {TextInput, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {scale, ScaledSheet} from "react-native-size-matters";
import {APP_MARGIN_HORIZONTAL} from "../../assets/constants/styles";
import {useNavigation} from "@react-navigation/native";

export default function Search({
  name,
  onTextChange,
}: {
  name: string | null;
  onTextChange: Dispatch<SetStateAction<string>>;
}) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <MaterialIcons
        name="arrow-back"
        size={scale(22)}
        color="black"
        onPress={() => navigation.goBack()}
      />
      <TextInput
        placeholder="Search"
        style={styles.inputText}
        onChangeText={(text) => onTextChange(text)}
        value={name as string}
      />
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: APP_MARGIN_HORIZONTAL,
  },
  inputText: {
    marginHorizontal: "20@s",
    width: "100%",
    fontSize: "13@s"
  },
});

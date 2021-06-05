import React, { ChangeEvent } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { scale } from "react-native-size-matters";
import { PRIMARY } from "../../assets/constants/colors";

interface IProps {
  label: string;
  value: string;
  onChangeValue: (e: string | ChangeEvent<any>) => void;
  onBlur?: (e: any) => void
  isPass?: boolean
  isNumKeypad?: boolean
}

export default function AppTextInput({ label, value, onChangeValue, isPass, isNumKeypad, onBlur }: IProps) {
  return (
    <View style={{width: '100%'}}>
      <TextInput
        label={label}
        mode="outlined"
        value={value}
        onChangeText={onChangeValue}
        style={{ backgroundColor: "#fff", marginVertical: scale(15) }}
        theme={{ colors: { primary: PRIMARY } }}
        secureTextEntry={isPass ? true : false}
        clearButtonMode="while-editing"
        keyboardType={isNumKeypad ? 'number-pad' : 'default'}
        onBlur={onBlur}
        returnKeyType="done"
      />
    </View>
  );
}

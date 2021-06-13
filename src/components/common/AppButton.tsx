import React from 'react'
import { Text, TextStyle, View, ViewStyle } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

interface IProps {
    containerStyle: ViewStyle, 
    text: string, 
    textStyle: TextStyle, 
    onPressHandle?: () => void
}

export default function AppButton({ containerStyle, text, textStyle, onPressHandle } : IProps) {
    return (
        <TouchableWithoutFeedback onPress={onPressHandle} containerStyle={containerStyle}>
        <View>
          <Text style={textStyle}>{text}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
}


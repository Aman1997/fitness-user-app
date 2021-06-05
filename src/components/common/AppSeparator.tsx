import React from 'react'
import { View, ViewStyle } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

interface IProps {
    style?: ViewStyle
} 

export default function AppSeparator({style}: IProps) {
    return (
        <View style={[styles.container, style]}>
        </View>
    )
}

const styles = ScaledSheet.create({
    container: {
        height: '2@s',
        width: '100%',
        backgroundColor: '#F3F3F3'
    }
})

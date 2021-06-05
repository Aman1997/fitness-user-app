import React from 'react'
import { Platform, StyleSheet, ViewStyle, SafeAreaView } from 'react-native'
import Constants from 'expo-constants'

interface IProps {
    children : React.ReactNode,
    style?: ViewStyle
}

export default function AppSafeAreaView( { children, style }: IProps )   {
    return (
        <SafeAreaView style={[styles.container, style]}>
            {children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0
    }
})

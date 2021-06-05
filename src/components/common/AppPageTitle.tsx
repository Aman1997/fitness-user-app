import React from 'react'
import { Text, View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { PAGE_TITLE_COLOR } from '../../assets/constants/colors'

interface IProps {
    pageTitle: string
}

export default function AppPageTitle({ pageTitle }: IProps) {
    return (
        <View>
            <Text style={styles.text}>{pageTitle}</Text>
        </View>
    )
}

const styles = ScaledSheet.create({
    text: {
        color: PAGE_TITLE_COLOR,
        fontSize: '30@s',
        fontWeight: 'bold',
        marginBottom: '20@s',
        textTransform: 'capitalize'
    }
})

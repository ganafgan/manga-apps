import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { colors, fonts } from '../../../utils'
import { Gap } from '../../atoms'

const Loading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color={colors.primary}/>
            <Gap height={20} />
            <Text style={styles.text}>Loading...</Text>
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.loadingBackground,
        width: '100%',
        height: '100%',
    },
    text: {
        fontSize: 18,
        fontFamily: fonts.primary[600],
        color: colors.primary
    }
})

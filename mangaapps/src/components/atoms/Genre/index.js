import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors, fonts } from '../../../utils'

const Genre = ({title}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}

export default Genre

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: colors.white,
        alignSelf: 'flex-start',
        alignItems: 'center',
        marginRight: 10,
        borderColor: colors.primary,
        borderWidth: 1
      
    },
    text: {
       color: colors.primary,
       fontSize: 14,
       fontFamily: fonts.primary[600],
   }
})

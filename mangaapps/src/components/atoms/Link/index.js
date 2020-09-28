import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { IcArrowNext } from '../../../assets'
import { colors, fonts } from '../../../utils'

const Link = ({onPress, title, size}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.text(size)}>{title}</Text>
            <IcArrowNext/>
        </TouchableOpacity>
    )
}

export default Link

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
       
    },
    text: (size) => ({
        fontSize: size,
        fontFamily: fonts.primary[700],
        color: colors.primary,
    }) 
})

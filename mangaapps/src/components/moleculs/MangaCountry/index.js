import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { colors, fonts } from '../../../utils'

const MangaCountry = ({img, type, title, onPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={img} style={styles.img} />
            <Text style={styles.title}>{type}</Text>
            <Text style={styles.subtitle}>{title}</Text>
        </TouchableOpacity>
    )
}

export default MangaCountry

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.border,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: colors.border,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontFamily: fonts.primary[700],
        fontSize: 16,
        color: colors.primary,
        marginTop: 5,
    },
    subtitle: {
        fontFamily: fonts.primary[600],
        fontSize: 14,
        color: colors.primary,
    },
    img: {
        height: 75,
        width: 90,
        borderRadius: 10
    }
})

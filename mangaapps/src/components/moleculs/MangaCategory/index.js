import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { colors, fonts } from '../../../utils'

const MangaCategory = ({category, onPress, pict}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={pict} style={styles.img} />
            <Text style={styles.category}>{category}</Text>
        </TouchableOpacity>
    )
}

export default MangaCategory

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: colors.border,
        borderRadius: 10,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    img: {
        height: 40, 
        width: 40
    },
    category: {
        marginTop: 5,
        fontSize: 12,
        fontFamily: fonts.primary[600],
        color: colors.primary
    }
})

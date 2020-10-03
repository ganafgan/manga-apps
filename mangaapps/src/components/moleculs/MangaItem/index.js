import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { colors, fonts } from '../../../utils'

const MangaItem = ({img, title, type, date, chapter, onPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={img} style={styles.img} />
            <Text style={styles.chapter}>{chapter}</Text>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{type}</Text>
            <Text style={styles.subtitle}>{date}</Text>
        </TouchableOpacity>
    )
}

export default MangaItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.border,
        padding: 10,
        alignSelf: 'flex-start',
        marginRight: 10,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: colors.border,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

elevation: 7,
        
    },
    img :{
        height: 175,
        width: 140,
        resizeMode: 'cover',
        borderRadius: 10
    },
    title: {
        fontFamily: fonts.primary[700],
        fontSize: 16,
        color: colors.primary,
        marginTop: 5
    },
    subtitle: {
        fontFamily: fonts.primary[600],
        fontSize: 12,
        color: colors.primary
    },
    chapter: {
        position:'absolute',
        backgroundColor: colors.primary,
        color: colors.white,
        left: 10,
        bottom: 70
    }
})

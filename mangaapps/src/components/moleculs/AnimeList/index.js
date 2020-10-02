import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, fonts } from '../../../utils'

const AnimeList = ({title, type, img, chapter, update, onPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.wrapperImage}>
                <Image source={img} style={styles.img} />
            </View>
            <View style={styles.wrapperText}>
                <View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.type}>{type}</Text>
                </View>
                <View>
                    <Text style={styles.type}>{chapter}</Text>
                    <Text style={styles.type}>{update}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default AnimeList

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingHorizontal: 20,
        marginBottom: 20,
        
    },
    wrapperImage: {
        shadowColor: colors.border,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    img: {
        height: 125,
        width: 100,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    wrapperText: {
        marginLeft: 10,
        justifyContent: 'space-between'
    },
    wrapperDetail: {
        flexDirection: 'row',
    },
    title: {
        fontSize: 16,
        fontFamily: fonts.primary[600],
        color: colors.black,
        maxWidth: 225
    },
    type: {
        fontSize: 12,
        fontFamily: fonts.primary[600],
        color: colors.primary,
    }
})

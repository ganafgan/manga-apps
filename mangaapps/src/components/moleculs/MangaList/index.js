import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, fonts } from '../../../utils'
import { Button } from '../../atoms'

const MangaList = ({title, type, img, chapter, update, onPress, deleteButton, onPressDelete, titleDelete}) => {
    return (
        <>
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={img} style={styles.img} />
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
            <View style={styles.btn}>
                {deleteButton && <Button title={titleDelete} onPress={onPressDelete} />}
            </View>
        </TouchableOpacity>
        </>
    )
}

export default MangaList

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingHorizontal: 20,
        marginBottom: 20
    },
    img: {
        height: 125,
        width: 100,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    wrapperText: {
        marginLeft: 10,
        justifyContent: 'space-between',
        flex: 1
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
    },
    btn: {
        justifyContent: 'center'
    }
})

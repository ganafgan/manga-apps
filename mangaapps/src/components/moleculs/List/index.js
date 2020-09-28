import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { IcArrowNext } from '../../../assets'
import { colors, fonts } from '../../../utils'
import { Gap } from '../../atoms'

const List = ({img, title, onPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={img} style={styles.img} />
            <View style={styles.wrapperText}>
                <Text style={styles.text}>{title}</Text>
            </View>
            <IcArrowNext/>
        </TouchableOpacity>
    )
}

export default List

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingBottom: 20,
        marginBottom: 20
    },
    img: {
        height: 25,
        width: 25,
    },
    wrapperText: {
        flex: 1,
    },  
    text: {
        fontFamily: fonts.primary.normal,
        fontSize: 16,
        color: colors.black,
        marginLeft: 10
    },
})

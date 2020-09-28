import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { ILSearch } from '../../../assets'
import { colors, fonts } from '../../../utils'


const SearchItem = ({placeholder, value, onChangeText}) => {
    return (
        <View style={styles.container}>
            <Image source={ILSearch} style={styles.img} />
            <TextInput style={styles.input} placeholder={placeholder} value={value} onChangeText={onChangeText} />
        </View>
    )
}

export default SearchItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.border,
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
    },
    img: {
        height: 24,
        width: 24,
       
    },
    input: {
        fontSize: 14,
        flex: 1,
        marginLeft: 5,
        color: colors.black,
        fontFamily: fonts.primary[400]
    }
})

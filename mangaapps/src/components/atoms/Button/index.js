import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { colors, fonts } from '../../../utils'

const Button = ({title, type, onPress}) => {
    return (
        <TouchableOpacity style={styles.container(type)} onPress={onPress}>
            <Text style={styles.title(type)}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    container: type => ({
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: type == 'secondary' ? 1 : 0,
        borderColor: type === 'secondary' ? colors.primary : colors.white ,
        backgroundColor: type === 'secondary' ? colors.white : colors.primary,
        

    }),
    title: type => ({
        fontSize: 16,
        fontFamily: fonts.primary[600],
        color : type === 'secondary' ? colors.primary : colors.white
        
    })
})

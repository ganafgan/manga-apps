import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { colors, fonts } from '../../../utils'

const Input = ({label, value, onChangeText, secureTextEntry, disable}) => {

    const [border, setBorder] = useState(colors.border)

    const onFocusForm = () => {
        setBorder(colors.primary)
    }

    const onBlurForm = () => {
        setBorder(colors.border)
    }

    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <TextInput 
                style={styles.input(border)}
                onFocus={onFocusForm}
                onBlur={onBlurForm}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                selectTextOnFocus={!disable}
            />
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        marginBottom: 5,
        fontFamily: fonts.primary[600],
        color: colors.text.secondary
    },
    input: border => ({
        borderWidth: 1,
        borderColor: border,
        borderRadius: 10,
        padding: 12
    })
})
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { IcHomeActive, IcHomeinactive, IcLoveActive, IcLoveInactive, IcSearchActive, IcsearchInactive, IcNewsActive, IcnewsInactive, IcAccontActive, IcAccountInactive } from '../../../assets'
import { colors, fonts } from '../../../utils'

const TabItem = ({title, active, onPress, onLongPress}) => {
    const Icon = () => {
        if (title === 'Home'){
            return active ? <IcHomeActive /> : <IcHomeinactive />
        }
        if (title === 'Favorite'){
            return active ? <IcLoveActive /> : <IcLoveInactive />
        }
        if (title === 'Search'){
            return active ? <IcSearchActive /> : <IcsearchInactive />
        }
        if (title === 'News'){
            return active ? <IcNewsActive /> : <IcnewsInactive />
        }
        if (title === 'Account'){
            return active ? <IcAccontActive /> : <IcAccountInactive />
        }
        return <IcHomeActive />
    }
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} onLongPress={onLongPress}>
            <Icon />
            <Text style={styles.text(active)}>{title}</Text>
        </TouchableOpacity>
    )
}

export default TabItem

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    text: active => ({
        fontSize: 12,
        color: active ? colors.text.menuActive : colors.text.menuInactive,
        fontFamily: fonts.primary[600],
        marginTop: 5,
    })
})

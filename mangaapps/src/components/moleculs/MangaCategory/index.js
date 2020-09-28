import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { IL18, ILAction, ILComedy, ILEarth, ILFantasy, ILHorror, ILRomance, ILSchool } from '../../../assets'
import { colors, fonts } from '../../../utils'

const MangaCategory = ({category, onPress}) => {
    const Icon = () => {
        if (category === 'Action'){
            return <Image source={ILAction} style={styles.img} />
        }
        if (category === 'Comedy'){
            return <Image source={ILComedy} style={styles.img} />
        }
        if (category === 'Romance'){
            return <Image source={ILRomance} style={styles.img} />
        }
        if (category === 'School'){
            return <Image source={ILSchool} style={styles.img} />
        }
        if (category === 'Horror'){
            return <Image source={ILHorror} style={styles.img} />
        }
        if (category === 'Fantasy'){
            return <Image source={ILFantasy} style={styles.img} />
        }
        if (category === '18+'){
            return <Image source={IL18} style={styles.img} />
        }
        return <Image source={ILEarth} style={styles.img} />
    }
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Icon />
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

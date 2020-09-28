import React, { useEffect } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { ILLogo } from '../../assets'
import { Fire } from '../../config'
import { colors } from '../../utils'

const Splash = ({navigation}) => {

    useEffect(()=>{
        const unsubscribe =  Fire.auth().onAuthStateChanged((user)=>{
            setTimeout(()=>{
                if(user){
                    navigation.replace('MainApp')
                } else {
                    navigation.replace('Login')
                }
            }, 2000)
        })
        return () => unsubscribe()
},[navigation])


    return (
        <View style={styles.container}>
            <Image source={ILLogo} style={styles.img} />
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        height: 125,
        width: 170
    }
})

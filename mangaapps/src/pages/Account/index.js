import React, { useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts'
import { ILBug, ILInfo, ILLogo, ILLogout, ILVersion } from '../../assets'
import { List } from '../../components'
import { Fire } from '../../config'
import { colors, fonts, showError } from '../../utils'

const Account = ({navigation}) => {

    const [showAlertLogout, setShowAlertLogout] = useState(false)
    const [alertAboutUs, setAlertAboutsUs] = useState(false)
    const [alertBugs, setAlertBugs] = useState(false)
    const [alertVersion, setAlertVersion] = useState(false)
   
    const onLogout = () => {
        Fire.auth()
            .signOut()
            .then((res)=>{
                navigation.replace('Login')
            })
            .catch((error)=>{
                showError(error.message)
            })
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapperImage}>
                <Image source={ILLogo} style={styles.img} />
            </View>
            <View>
                <List 
                    img={ILBug} 
                    title='Laporkan bug dan saran' 
                    onPress={() => setAlertBugs(true)}
                />
                <List 
                    img={ILVersion} 
                    title='Versi aplikasi'
                    onPress={() => setAlertVersion(true)}
                />
                <List 
                    img={ILInfo} 
                    title='Tentang kami'
                    onPress={() => setAlertAboutsUs(true)}
                    
                />
                <List 
                    img={ILLogout} 
                    title='Logout' 
                    onPress={() => setShowAlertLogout(true)}
                />
            </View>
            <AwesomeAlert
                show={alertBugs}
                showProgress={false}
                message="Kritik dan saran dapat di kirim ke email ganafgan@gmail.com, Tks"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="Ok"
                confirmButtonColor= {colors.primary}
                onConfirmPressed={()=> setAlertBugs(false)}
            />

            <AwesomeAlert
                show={alertVersion}
                showProgress={false}
                message="Manga Yosh!! saat ini versi 0.0.1"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="Ok"
                confirmButtonColor= {colors.primary}
                onConfirmPressed={()=> setAlertVersion(false)}
            />
            <AwesomeAlert
                show={alertAboutUs}
                showProgress={false}
                message="Manga Yosh adalah project iseng pas lagi gabut liat anime"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="Ok"
                confirmButtonColor= {colors.primary}
                onConfirmPressed={()=> setAlertAboutsUs(false)}
            />
            <AwesomeAlert
                show={showAlertLogout}
                showProgress={false}
                title="Are you sure to Logout ?"
                message=""
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Cancel"
                confirmText="Logout"
                confirmButtonColor= {colors.primary}
                onCancelPressed={() => setShowAlertLogout(false)}
                onConfirmPressed={onLogout}
            />
        </View>
    )
}

export default Account

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'space-between',
        paddingBottom: 100
       
    },
    wrapperImage: {
        alignItems: 'center',
        marginTop: 50
    },
    title: {
        fontSize: 18,
        fontFamily: fonts.primary[600],
        color: colors.black
    },
    img: {
        height: 200,
        width: 250,
    }
})

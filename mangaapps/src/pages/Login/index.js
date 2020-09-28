import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { ILLogo } from '../../assets'
import { Button, Gap, Input, Loading } from '../../components'
import { Fire } from '../../config'
import { colors, showError, storeData, useForm } from '../../utils'

const Login = ({navigation}) => {

    const [form, setForm] = useForm({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)

    const onLogin = () => {
        setLoading(true)
        Fire.auth()
            .signInWithEmailAndPassword(form.email, form.password)
            .then((res)=>{
                console.log(res)
                setLoading(false)
                Fire.database()
                    .ref(`users/${res.user.uid}/`)
                    .once(`value`)
                    .then((resDB)=>{
                        if(resDB.val()){
                            storeData(`user`, resDB.val())
                            navigation.replace('MainApp')
                        }
                    })
            })
            .catch((error)=>{
                setLoading(false)
                showError(error.message)
            })
    }

    return (
        <>
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Gap height={100} />
                <View style={styles.wrapperImg}>
                    <Image source={ILLogo} style={styles.img} />
                </View>
                <Gap height={50} />
                <View>
                    <Input 
                        label='Email' 
                        value={form.email}
                        onChangeText={(value) => setForm (`email`, value)}
                    />
                    <Gap height={20} />
                    <Input 
                        label='Password' 
                        secureTextEntry 
                        value={form.password}
                        onChangeText={(value) => setForm (`password`, value)}
                    />
                    <Gap height={50} />
                    <Button 
                        title='Login' 
                        onPress={onLogin}
                    />
                    <Gap height={30} />
                    <Button 
                        title='Register' 
                        type='secondary' 
                        onPress={() => navigation.navigate('Register')}
                    />
                    <Gap height={150} />
                </View>
            </ScrollView>
        </View>
        {loading && <Loading />}
        </>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 40,
        justifyContent: 'space-between'
    },
    wrapperImg: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        height: 125,
        width: 200
    },
    text: {
        textAlign: 'center'
    }
})

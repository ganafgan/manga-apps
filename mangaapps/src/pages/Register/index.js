import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { ILLogo } from '../../assets'
import { Button, Gap, Input, Loading } from '../../components'
import { Fire } from '../../config'
import { colors, showError, showSuccess, storeData, useForm } from '../../utils'

const Register = ({navigation}) => {

    const [form, setForm] = useForm({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [loading, setLoading] = useState(false)

    const onContinue  = () => {
        if(form.fullName && form.email && form.password && form.confirmPassword){
            if(form.password === form.confirmPassword){
                setLoading(true)
                Fire.auth()
                    .createUserWithEmailAndPassword(form.email, form.password)
                    .then((res)=>{
                        setLoading(false)
                        setForm('reset')
                        const data = {
                            fullName: form.fullName,
                            email: form.email,
                            uid : res.user.uid
                        }
                        Fire.database()
                            .ref(`users/${res.user.uid}/`)
                            .set(data)
                            storeData(`user`, data)
                            showSuccess('Register Success')
                            navigation.replace(`Login`)
                    })
                    .catch((error)=>{
                        setLoading(false)
                        showError(error.message)
                    })
            } else {
                showError('Password is different')
            }
        } else {
            showError('Form must be filled')
        }
    }

    return (
        <>
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.wrapperImg}>
                    <Image source={ILLogo} style={styles.img} />
                </View>
                <Gap height={50} />
                <View style={styles.wrapperContent}>
                    <Input 
                        label='FullName' 
                        value={form.fullName}
                        onChangeText={(value) => setForm('fullName',value)}
                    />
                    <Gap height={20} />
                    <Input 
                        label='Email' 
                        value={form.email}
                        onChangeText={(value) => setForm('email',value)}
                    />
                    <Gap height={20} />
                    <Input 
                        label='Password' 
                        value={form.password}
                        secureTextEntry
                        onChangeText={(value) => setForm('password',value)}
                    />
                    <Gap height={20} />
                    <Input 
                        label='Confirm Password' 
                        value={form.confirmPassword}
                        secureTextEntry
                        onChangeText={(value) => setForm('confirmPassword',value)}
                    />
                    <Gap height={50} />
                    <Button title='Continue' onPress={onContinue}/>
                </View>
            </ScrollView>
        </View>
        {loading && <Loading /> }
      
        </>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    img: {
        height: 125,
        width: 200
    },
    wrapperImg: {
        marginTop: 50
    },
    wrapperContent: {
        paddingHorizontal: 40
    }
})

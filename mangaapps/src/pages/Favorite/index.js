import React, { useEffect, useState } from 'react'
import { Alert, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Gap, MangaList } from '../../components'
import { Fire } from '../../config'
import { colors, fonts, getData, showError } from '../../utils'

const Favorite = () => {

    const [dataFavorite, setDataFavorite] = useState([])
    const [profile, setProfile] = useState([])
    const [refreshing, setRefreshing] = useState(false)
  
    useEffect(()=>{
        getDataUser()
        getDataFavorite()
    },[profile.uid])

    const getDataFavorite = () => {
        Fire.database()
            .ref(`saved_manga/${profile.uid}/`)
            .once(`value`)
            .then((res)=>{
                if(res.val()){
                    const oldData = res.val()
                    const data = []
                    Object.keys(oldData).map((key)=>{
                        data.push({
                            id: key,
                            data: oldData[key]
                        })
                    })
                    setDataFavorite(data)
                }
            })
    }

    const getDataUser = () => {
        getData(`user`)
        .then((res)=>{
            setProfile(res)
        })
    }

    const deleteDataFavorite = (id) => {
        Fire.database()
            .ref(`saved_manga/${profile.uid}/${id}/`)
            .remove()
            .then((res)=>{
                Alert.alert('Delete success')
                getDataFavorite()
            })
            .catch((error)=>{
                showError(error.message)
            })
    }

    const renderDataFavorite = () => {
        return dataFavorite.map((item, index)=>{
            return  <MangaList 
                    key={index}
                    title={item.data.title}
                    img={{uri: item.data.thumb}}
                    type={item.data.type}
                    deleteButton
                    titleDelete='delete'
                    onPressDelete={() => deleteDataFavorite(item.id)}
                />      
            })
    }

    return (
        <View style={styles.container}>
           <ScrollView showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing}
                onRefresh={() => {
                    setRefreshing(true)
                    getDataFavorite()
                    setRefreshing(false)
                }}  
                />}
            >
                <Gap height={20} />
                <View style={styles.wrapperTitle}>
                    <Text style={styles.title}>Favorites</Text>
                </View>
                <Gap height={20} />
                {renderDataFavorite()}
                
           </ScrollView>
        </View>
    )
}

export default Favorite

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    wrapperTitle: {
        paddingHorizontal: 20
    },
    title: {
        fontSize: 18,
        fontFamily: fonts.primary[600]
    },
})

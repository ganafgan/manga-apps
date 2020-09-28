import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Gap, Loading, MangaList } from '../../components'
import { colors, showError } from '../../utils'

const MangaJepang = ({navigation}) => {

    const [dataManga, setDataManga] = useState([])
    const [dataManga2, setDataManga2] = useState([])
   
    useEffect(()=>{
        getDataManga()
        getDataManga2()
    },[])

    const getDataManga = () => {
        Axios.get(`http://mangamint.azurewebsites.net/api/manga/page/1`)
        .then((res)=>{
            setDataManga(res.data.manga_list)
        })
        .catch((error)=>{
            showError(error.message)
        })
    }

    const getDataManga2 = () => {
        Axios.get(`http://mangamint.azurewebsites.net/api/manga/page/2`)
        .then((res)=>{
            setDataManga2(res.data.manga_list)
        })
        .catch((error)=>{
            showError(error.message)
        })
    }

    const renderDataManga = () => {
        return dataManga.map((val, index)=>{
            return <MangaList 
            key={index}
            title={val.title}
            img={{uri: val.thumb}}
            chapter={val.chapter}
            type={val.type}
            update={val.updated_on}
            onPress={()=> navigation.navigate('MangaDetail', val)}
            />
        })
    }

    const renderDataManga2 = () => {
        return dataManga2.map((val, index)=>{
            return <MangaList 
            key={index}
            title={val.title}
            img={{uri: val.thumb}}
            chapter={val.chapter}
            type={val.type}
            update={val.updated_on}
            onPress={()=> navigation.navigate('MangaDetail', val)}
            />
        })
    }
    if(dataManga.length === 0){
        return <Loading />
    }
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Gap height={30} />
                {renderDataManga()}
                {renderDataManga2()}
            </ScrollView>
        </View>
    )
}

export default MangaJepang

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    }
})

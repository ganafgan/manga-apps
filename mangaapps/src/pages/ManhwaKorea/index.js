import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Gap, Loading, MangaList } from '../../components'
import { colors, showError } from '../../utils'

const ManhwaKorea = ({navigation}) => {

    const [dataManga, setDataManga] = useState([])
    console.log(dataManga)

    useEffect(()=>{
        getDataManga()
    },[])

    const getDataManga = () => {
        Axios.get(`http://mangamint.azurewebsites.net/api/manhwa/1`)
        .then((res)=>{
            console.log(res)
            setDataManga(res.data.manga_list)
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

    if(dataManga.length === 0){
        return <Loading />
    }
    return (
        <View style={styles.container}>
             <ScrollView showsVerticalScrollIndicator={false}>
                <Gap height={30} />
                {renderDataManga()}
             </ScrollView>
        </View>
    )
}

export default ManhwaKorea

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    }
})

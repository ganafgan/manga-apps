import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { AnimeList, Gap, Loading } from '../../components'
import { colors, showError } from '../../utils'

const NextSeasonAnime = () => {

    const [dataAnime, setDataAnime] = useState([])

    useEffect(()=>{
        getDataAnime()
    },[])

    const getDataAnime = () => {
        Axios.get(`https://api.jikan.moe/v3/season/later`)
        .then((res)=>{
            setDataAnime(res.data.anime)
        })
        .catch((error)=>{
            showError(error.message)
        })
    }

    const renderDataAnime = () => {
        let filtered = dataAnime.slice(0,20)

        return filtered.map((val, index)=>{
            return <AnimeList 
                key={index}
                img={{uri: val.image_url}}
                title={'From '+val.title}
                type={val.type}
                chapter={val.source}
                update={val.airing_start === null ? `Not published yet` : val.airing_start}
                
            />
        })
    }

    if(dataAnime.length === 0){
        return <Loading />
    }
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Gap height={20} />
                {renderDataAnime()}
                <Gap height={20} />
            </ScrollView>
        </View>
    )
}

export default NextSeasonAnime

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    }
})

import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Loading } from '../../components'
import { showError } from '../../utils'

const MangaReadPage = ({route}) => {

    const [pageManga, setPageManga] = useState([])
    const val = route.params

    useEffect(()=>{
        getPageManga()
    },[])

    const getPageManga = () => {
        Axios.get(`http://mangamint.azurewebsites.net/api/chapter/${val.chapter_endpoint}`)
        .then((res)=>{
            setPageManga(res.data.chapter_image)
        })
        .catch((error)=>{
            showError(error.message)
        })
    }

    const renderPageManga = () => {
        return pageManga.map((val, index)=>{
            return <Image 
                key={index}
                source={{uri: val.chapter_image_link}}
                style={styles.img}
            />
        })
    }

    if(pageManga.length === 0){
        return <Loading />
    }
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {renderPageManga()}
            </ScrollView>
        </View>
    )
}

export default MangaReadPage

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    img: {
        width: '100%',
        height:600,
        resizeMode: 'contain'
       
    }
})

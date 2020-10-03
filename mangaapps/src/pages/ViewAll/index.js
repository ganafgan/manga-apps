import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Gap, Loading, MangaItem } from '../../components'
import { colors, fonts, showError } from '../../utils'

const ViewAll = ({route, navigation}) => {

    const val = route.params
    const [data, setData] = useState([])

    useEffect(()=>{
        getDataManga()
    },[])

    const getDataManga = () => {
        Axios.get(`http://mangamint.azurewebsites.net/api/${val.link}`)
        .then((res)=>{
            setData(res.data.manga_list)
        })
        .catch((error)=>{
            showError(error.message)
        })
    }

    const renderDataLatest = () => {
        return data.map((val, index)=>{
            return <MangaItem 
            key={index} 
            img={{uri: val.thumb}}
            title={val.title.length > 16 ? val.title.slice(0, 16) + '..' : val.title}
            type={val.type}
            date={val.updated_on.slice(0,12)}
            chapter={val.chapter}
            onPress={() => navigation.navigate('MangaDetail', val)}
            />
        })
    }

    const renderDataPopular = () => {
        return data.map((val, index)=>{
            return <MangaItem 
            key={index} 
            img={{uri: val.thumb}}
            title={val.title.length > 16 ? val.title.slice(0, 16) + '..' : val.title}
            type={val.type}
            date={val.upload_on.slice(0,13)}
            chapter={val.chapter}
            onPress={() => navigation.navigate('MangaDetail', val)}
            />
        })
    }

    if(data.length === 0){
        return <Loading />
    }
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Gap height={20} />
                <Text style={styles.title}>{val.title}</Text>
                <Gap height={20} />
                <View style={styles.wrapper}>
                    {
                        val.title === `Popular Manga` 
                        ? renderDataPopular()
                        : renderDataLatest()
                    }
                </View>
                <Gap height={20} />
            </ScrollView>
        </View>
    )
}

export default ViewAll

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    wrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingLeft: 20,
        paddingRight: 10
    },
    title: {
        fontSize: 18,
        fontFamily: fonts.primary[600],
        paddingLeft: 30,
        textAlign: 'center'
    }
})

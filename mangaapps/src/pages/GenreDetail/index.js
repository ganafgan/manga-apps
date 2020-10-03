import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Gap, Loading, MangaItem } from '../../components'
import { colors, fonts, showError } from '../../utils'

const GenreDetail = ({route, navigation}) => {

    const [genre, setGenre] = useState([])
    const val = route.params

    console.log(genre)

    useEffect(()=>{
        getGenre()
    },[])

    const getGenre = () => {
        let word = val.category.toLowerCase()
        Axios.get(`http://mangamint.azurewebsites.net/api/genres/${word}/1`)
        .then((res)=>{
            console.log(res)
            setGenre(res.data.manga_list)
            
        })
        .catch((error)=>{
            showError(error.message)
        })
    }

    const renderManga = () => {
        return genre.map((val, index)=>{
            return <MangaItem 
                key={index}
                title={val.title.length > 14 ? val.title.slice(0, 14) + '...' : val.title}
                img={{uri: val.thumb}}
                type={val.type}
                onPress={() => navigation.navigate('MangaDetail', val)}
            />
        })
    }

    if(genre.length === 0){
        return <Loading />
    }
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Gap height={20} />
            <View style={styles.wrapperTitle}>
                <Text style={styles.title}>Category {val.category}</Text>
            </View>
            <Gap height={20} />
                <View style={styles.category}>
                    {renderManga()}
                </View>
            <Gap height={20} />
            </ScrollView>
        </View>
    )
}

export default GenreDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    category: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingHorizontal: 20
    },
    wrapperTitle: {
        paddingHorizontal: 20
    },
    title: {
        fontSize: 16,
        fontFamily: fonts.primary[600],
        color: colors.black,
        textAlign: 'center',
    }
})

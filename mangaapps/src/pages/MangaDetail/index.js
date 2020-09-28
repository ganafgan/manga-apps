import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, Gap, Genre, Loading, SearchItem } from '../../components'
import { Fire } from '../../config'
import { colors, fonts, getData, showError } from '../../utils'

const MangaDetail = ({navigation, route}) => {

    const val = route.params
    const [mangaDetail, setMangaDetail] = useState([])
    const [search, setSearch] = useState('')
    const [profile, setProfile] = useState([])
    
   useEffect(()=>{
        getMangaDetail()
        getDataUser()
   },[])

    const getMangaDetail = () => {
        Axios.get(`http://mangamint.azurewebsites.net/api/manga/detail/${val.endpoint}`)
        .then((res)=>{
            setMangaDetail(res.data)
        })
        .catch((error)=>{
            showError(error.message)
        })
    }

    const getDataUser = () => {
        getData(`user`)
        .then((res)=>{
            setProfile(res)
        })
    }

    const saveManga = () => {
        const data = val
        Fire.database()
            .ref(`saved_manga/${profile.uid}/`)
            .push(data)
            Alert.alert(`Saved success`)

    }

    const renderGenre = () => {
        return mangaDetail.genre_list.map((val, index)=>{
            return <Genre 
                key={index}
                title={val.genre_name}
            />
        })
    }

    const renderSearch = () => {
        let filtered = mangaDetail.chapter.filter((val)=>{
            return val.chapter_title.includes(search)
        })
        console.log(filtered)

        return filtered.map((val, index)=>{
            return <Button 
                key={index}
                type='secondary'
                title={val.chapter_title}
                onPress={() => navigation.navigate(`MangaReadPage`, val)}
            />
        })
    }

    const renderChapter = () => {
        return mangaDetail.chapter.map((val, index)=>{
            return <Button 
                key={index}
                type='secondary'
                title={val.chapter_title}
                onPress={() => navigation.navigate(`MangaReadPage`, val)}
            />
        })
    }

    if(mangaDetail.length === 0){
        return <Loading />
    }
    return (
        <View style={styles.container}>
            <Gap height={30} />
            <View style={styles.wrapperSearch}>
                    <View style={styles.search}>
                        <SearchItem 
                        placeholder='Cari chapter ...'
                        value={search}
                        onChangeText={(value) => setSearch(value)}
                        />
                    </View>
                    <View>
                        <Button 
                            title='Save'
                            onPress={saveManga}
                        />
                    </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={{uri: mangaDetail.thumb}} style={styles.img} />
                <Image source={{uri: mangaDetail.thumb}} style={styles.manga} />
                <Gap height={70} />
                <View style={styles.content}>
                    <Text style={styles.title}>{val.title}</Text>
                    <Gap height={20} />
                    <View style={styles.wrapperScore}>
                        <Text style={styles.label}>Total Chapter : </Text>
                        <Text style={styles.value}>{mangaDetail.chapter.length}</Text>
                    </View>
                    <View style={styles.wrapperScore}>
                        <View>
                            <Text style={styles.label}>Status</Text>
                            <Text style={styles.label}>Type</Text>
                            <Text style={styles.label}>Author</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>: {mangaDetail.status}</Text>
                            <Text style={styles.label}>: {mangaDetail.type}</Text>
                            <Text style={styles.label}>: {mangaDetail.author}</Text>
                        </View>
                    </View>
                    <Gap height={20} />
                    <Text style={styles.title}>Genre</Text>
                    <Gap height={15} />
                    <View style={styles.wrapperScroll}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.wrapperGenre}>
                                <Gap width={20} />
                                {renderGenre()}
                                <Gap width={10} />
                            </View>
                        </ScrollView>
                    </View>
                    <Gap height={30} />
                    <Text style={styles.title}>Chapter</Text>
                    <Gap height={15} />
                    {
                        search 
                        ?
                        renderSearch()
                        :
                        renderChapter()
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default MangaDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    wrapperSearch: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    search: {
        flex: 1, 
        paddingRight: 10
    },
    img: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        opacity: 0.8,
        borderRadius: 10
        
    },
    manga: {
        height: 200,
        width: 125,
        position: 'absolute',
        top: 70,
        left: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.text.secondary,
        resizeMode: 'cover',
    },
    content: {
        paddingHorizontal: 20
    },
    title: {
        fontSize: 16,
        fontFamily: fonts.primary[700]
    },
    wrapperScore: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        fontFamily: fonts.primary[600],
        marginRight: 10,
        color: colors.black
    },
    value: {
        fontSize: 16,
        fontFamily: fonts.primary[600],
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: colors.primary,
        color: colors.white,
        borderRadius: 10
    },
    wrapperGenre: {
        flexDirection: 'row',
    },
    wrapperScroll: {
        marginHorizontal: -20
    }
    
})

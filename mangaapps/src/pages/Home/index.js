import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import { ILChinaFlag, ILJapanFlag, ILKoreaFlag } from '../../assets'
import { Button, Gap, Link, Loading, MangaCategory, MangaCountry, MangaItem, MangaList, SearchItem, Slider } from '../../components'
import { Fire } from '../../config'
import { colors, fonts, showError } from '../../utils'

const Home = ({navigation}) => {

    // the Hooks
    const [mangaCategory, setMangaCategory] = useState([])
    const [latestManga, setLatestManga] = useState([])
    const [popularManga, setPopularManga] = useState([])
    const [search, setSearch] = useState('')
    const [resultSearch, setResultSearch] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [loading, setLoading] = useState(false)

    //UseEffect (Calling The API)
    useEffect(()=>{
        getMangaCategory()
        getLatestManga()
        getPopularManga()
    },[])

    // Order To get API
    const searchManga = () => {
        let word = search.toLowerCase().split(' ').join('%20')
        setLoading(true)
        Axios.get(`http://mangamint.azurewebsites.net/api/cari/${word}`)
        .then((res)=>{
            setResultSearch(res.data)
            setLoading(false)
        })
        .catch((error)=>{
            showError(error.message)
        })
    }

    const getMangaCategory = () => {
        Fire.database()
        .ref(`manga_category/`)
        .once(`value`)
        .then((res)=>{
            if(res.val()){
                const data = res.val()
                const filterData = data.filter((el)=>(el !== null))
                setMangaCategory(filterData)
            }
        })
    }
    
    const getLatestManga = () => {
        Axios.get(`http://mangamint.azurewebsites.net/api/manga/page/1`)
            .then((res)=>{
                setLatestManga(res.data.manga_list)
            })
            .catch((error)=>{
                showError(error.message)
            })
    }

    const getPopularManga = () => {
        Axios.get(`http://mangamint.azurewebsites.net/api/manga/popular/1`)
        .then((res)=>{
            setPopularManga(res.data.manga_list)

        })
        .catch((error)=>{
            showError(error.message)
        })
    }

    const renderResulthSearch = () => {
        return resultSearch.map((val, index)=>{
            return <MangaItem 
            key={index} 
            img={{uri: val.thumb}}
            title={val.title.length > 16 ? val.title.slice(0, 16) + '..' : val.title}
            type={val.type}
            date={val.updated_on.slice(0,13)}
            onPress={() => navigation.navigate('MangaDetail', val)}
            />
        })
    }

    // rendering The Hooks
    const renderLatestManga = () => {

        let filtered = latestManga.slice(0,8)

        return filtered.map((val, index)=>{
            return <MangaItem 
                key={index} 
                img={{uri: val.thumb}}
                title={val.title.length > 14 ? val.title.slice(0, 14) + '...' : val.title}
                type={val.type}
                date={val.updated_on.slice(0,12)}
                chapter={val.chapter}
                onPress={() => navigation.navigate('MangaDetail', val)}
            />
        })
    }

    const renderMangaCategory = () => {
        return mangaCategory.map((val)=>{
            return  <MangaCategory 
                category={val.category}
                key={val.id}
            />
        })
    }

    const renderPopularManga = () => {
        let filtered = popularManga.slice(0,8)

        return filtered.map((val, index)=>{
            return <MangaItem 
                key={index} 
                img={{uri: val.thumb}}
                title={val.title.length > 14 ? val.title.slice(0, 14) + '...' : val.title}
                type={val.type}
                date={val.upload_on}
                onPress={() => navigation.navigate(`MangaDetail`, val)}
            />  
        })
    }

    if(mangaCategory.length === 0 || latestManga.length === 0 || popularManga.length === 0 ){
        return <Loading />
    }
    return (
        <>
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} 
                onRefresh={() => {
                    setRefreshing(true)
                    getLatestManga()
                    getPopularManga()
                    setRefreshing(false)
                }}
                />}
            >
                <Gap height={20}/>
                <View style={styles.wrapperSearch}>
                    <View style={styles.search}>
                        <SearchItem 
                        placeholder='Cari manga ...'
                        value={search}
                        onChangeText={(value) => setSearch(value)}
                        />
                    </View>
                    <View>
                        <Button 
                            title='Search'
                            onPress={() => searchManga()} 
                        />
                    </View>
                </View>
                <Gap height={30} />
                {
                    search !== ''
                    ?
                    <View style={styles.wrapperResultSearch}>
                        {
                            resultSearch.length === 0
                            ?
                            <View>
                                <Text>Tidak ditemukan</Text>
                            </View>
                            :
                            renderResulthSearch()
                        }
                    </View>
                    :
                    <View>
                        <View style={styles.wrapperSlider}>
                            <Slider />
                        </View>
                        <Gap height={20} />
                        <View style={styles.wrapperTitle}>
                            <Text style={styles.title}>Manga Category</Text>
                        </View>
                        <Gap height={15} />
                        <View style={styles.category}>
                            {renderMangaCategory()}
                        </View>
                        <Gap height={30} />
                        <View style={styles.wrapperTitle}>
                            <View>
                                <Text style={styles.title}>The Latest</Text>
                            </View>
                            <View>
                                <Link title='View All' size={14} onPress={() => navigation.navigate('ViewAll', {link: `manga/page/1`, title: `The Latest`})}/>
                            </View>   
                        </View>
                        <Gap height={15} />
                        <View style={styles.wrapperScroll}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <View style={styles.menu}>
                                    <Gap width={40} />
                                    {renderLatestManga()}
                                    <Gap width={30} />
                                </View>
                            </ScrollView>
                        </View>
                        <Gap height={30} />
                        <View style={styles.category}>
                            <MangaCountry 
                                img={ILJapanFlag} 
                                type='Manga' 
                                title='(Komik Japan)'
                                onPress={() => navigation.navigate('MyTab')}
                            />
                            <MangaCountry 
                                img={ILKoreaFlag} 
                                type='Manhwa' 
                                title='(Komik Korea)' 
                                onPress={() => navigation.navigate('MyTab')}
                            />
                            <MangaCountry 
                                img={ILChinaFlag} 
                                type='Manhua' 
                                title='(Komik China)' 
                                onPress={() => navigation.navigate('MyTab')}
                            />
                        </View>
                        <Gap height={30} />
                        <View style={styles.wrapperTitle}>
                            <View>
                                <Text style={styles.title}>Popular</Text>
                            </View>
                            <View>
                                <Link title='View All' size={14} onPress={() => navigation.navigate('ViewAll', {link: `manga/popular/1`, title: `Popular`})} />
                            </View>   
                        </View>
                        <Gap height={15} />
                        <View style={styles.wrapperScroll}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <View style={styles.menu}>
                                    <Gap width={40} />
                                    {renderPopularManga()}
                                    <Gap width={30} />
                                </View>
                            </ScrollView>
                        </View>
                        <Gap height={10} />
                    </View>
                }
            <Gap height={30}/>
            </ScrollView>
        </View>
        {loading && <Loading/>}
        </>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
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
    wrapperResultSearch: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingLeft: 20,
        paddingRight: 10
    },
    wrapperTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    title: {
        fontSize: 16,
        fontFamily: fonts.primary[600],
    },
    wrapperScroll: {
        marginHorizontal: -20
    },
    category: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    menu: {
        flexDirection: 'row',
        
    },
})

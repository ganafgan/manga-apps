import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Gap, MangaList, SearchItem } from '../../components'
import { colors, fonts } from '../../utils'

const Search = () => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapperSearch}>
                <SearchItem />
            </View>
            <Gap height={50} />
            <MangaList />
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: 20
    },
    wrapperSearch: {
        paddingHorizontal: 20
    },
    wrapperTitle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 28,
        fontFamily: fonts.primary[800],
        color: colors.border,
        maxWidth: 100
    }
})

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { BottomNavigator } from '../components';
import { Account, Favorite, GenreDetail, Home, Login, MangaDetail, MangaJepang, MangaReadPage, ManhuaChina, ManhwaKorea, NextSeasonAnime, Register, Splash, ThisSeasonAnime, ViewAll } from '../pages';
import { colors, fonts } from '../utils';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()
const TabTop = createMaterialTopTabNavigator();

const MainApp = () => {
    return (
        <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
            <Tab.Screen name='Home' component={Home} />
            <Tab.Screen name='Search' component={MyTab} />
            <Tab.Screen name='Favorite' component={Favorite} />
            <Tab.Screen name='News' component={MyTabAnime} />
            <Tab.Screen name='Account' component={Account} />
        </Tab.Navigator>
    )
}

const MyTab = () => {
    return(
        <TabTop.Navigator tabBarOptions={{pressColor:colors.primary, labelStyle: {fontSize: 14, fontFamily: fonts.primary[600], color: colors.primary}, style:{backgroundColor: colors.white}}}>
            <TabTop.Screen name='All' component={MangaJepang} />
            <TabTop.Screen name='Korea' component={ManhwaKorea} />
            <TabTop.Screen name='China' component={ManhuaChina} />
        </TabTop.Navigator>
    )
}

const MyTabAnime = () => {
    return(
        <TabTop.Navigator tabBarOptions={{pressColor:colors.primary, labelStyle: {fontSize: 14, fontFamily: fonts.primary[600], color: colors.primary}, style:{backgroundColor: colors.white}}}>
            <TabTop.Screen name='This Season' component={ThisSeasonAnime} />
            <TabTop.Screen name='Next Season' component={NextSeasonAnime} />
        </TabTop.Navigator>
    )
}

const Router = () => {
    return (
        <Stack.Navigator initialRouteName='MainApp' >
            <Stack.Screen name='Splash' component={Splash} options={{headerShown: false}} />
            <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
            <Stack.Screen name='Register' component={Register} options={{headerShown: false}} />
            <Stack.Screen name='MainApp' component={MainApp} options={{headerShown: false}} />
            <Stack.Screen name='MangaDetail' component={MangaDetail} options={{headerShown: false}} />
            <Stack.Screen name='ViewAll' component={ViewAll} options={{headerShown: false}} />
            <Stack.Screen name='MyTab' component={MyTab} options={{headerShown: false}} />
            <Stack.Screen name='MangaReadPage' component={MangaReadPage} options={{headerShown: false}} />
            <Stack.Screen name='GenreDetail' component={GenreDetail} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}

export default Router

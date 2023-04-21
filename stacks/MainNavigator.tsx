import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import ChatStack from './ChatStack'
import MainButton from '../components/MainButton';
import ProfileStack from './ProfileStack';
import SettingsStack from './SettingsStack';
import {StackEnum} from './StackEnum';
import LoadingScreen from '../components/LoadingScreen';
const Tab = createBottomTabNavigator()


export default function MainNavigator() {
    const [currentStack, setCurrentStack] = useState(StackEnum.LoadingStack)
    const loadingTime = 5000;
    useEffect(() => {
        setTimeout(() => {
            setCurrentStack(StackEnum.HomeStack)
        }, loadingTime)
    }, [])

    return (
        <View style = {styles.container}>
            {currentStack === StackEnum.LoadingStack && <LoadingScreen/>}
            {currentStack === StackEnum.HomeStack && <HomeStack/>}
            {currentStack === StackEnum.ChatStack && <ChatStack/>}
            {currentStack === StackEnum.ProfileStack && <ProfileStack/>}
            {currentStack === StackEnum.SettingsStack && <SettingsStack/>}
            <MainButton currentStack = {currentStack} setCurrentStack = {setCurrentStack}/>
            
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import ChatStack from './ChatStack'
import MainButton from '../components/MainButton';
import ProfileStack from './ProfileStack';
import SettingsStack from './SettingsStack';
import {StackEnum} from './StackEnum';
const Tab = createBottomTabNavigator()


export default function MainNavigator() {
    const [currentStack, setCurrentStack] = useState(StackEnum.HomeStack)
    return (
        <View style = {styles.container}>
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
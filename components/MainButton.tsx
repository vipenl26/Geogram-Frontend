import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, StyleProp, ViewStyle, Dimensions } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons'
import {Animated} from 'react-native';
import { StackEnum } from '../stacks/StackEnum';
function MainButton(props:{currentStack: StackEnum, setCurrentStack: React.Dispatch<React.SetStateAction<StackEnum>>}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const opacity = useState(new Animated.Value(0))[0]

  const fadeTime = 500;

  const menufadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: fadeTime,
      useNativeDriver: true
    }).start()
    setTimeout(() => setIsMenuOpen(true), 0)

  }

  const menufadeOut = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: fadeTime,
      useNativeDriver: true
    }).start()
    setTimeout(() => setIsMenuOpen(false), fadeTime)
  }

  const switchMenu = () => {
    if (props.currentStack !== StackEnum.HomeStack) {
      props.setCurrentStack(StackEnum.HomeStack)
      return
    }
    if (isMenuOpen) {
      menufadeOut()
    }
    else {
      menufadeIn()
    }
  }

  const changeStack = (stackName:StackEnum) => {
    switchMenu()
    props.setCurrentStack(stackName)
  }

  return (
    <View style = {styles.MainButtonContainer}>

      {props.currentStack !== StackEnum.LoadingStack && 
      <IndividualButton style = {styles.HomeExitButton} onPress = {()=>switchMenu()}>
        {!isMenuOpen && props.currentStack === StackEnum.HomeStack ?
         <MaterialIcons name = "menu" size={30}/> : <MaterialIcons name = "close" size={30}/>}
      </IndividualButton>}



      {isMenuOpen &&
      <Animated.View style={[{opacity: opacity}]}>
        <IndividualButton style = {styles.ChatButton} onPress={() => changeStack(StackEnum.ChatStack)}>
          <MaterialIcons name = "chat" size={30}/>
        </IndividualButton>
      </Animated.View>}

      {isMenuOpen &&
      <Animated.View style={[{opacity: opacity}]}>
        <IndividualButton style = {styles.ProfileButton} onPress={() => changeStack(StackEnum.FriendsStack)}>
          <MaterialIcons name = "people" size={30}/>
        </IndividualButton>
      </Animated.View>}

      {isMenuOpen &&
      <Animated.View style={[{opacity: opacity}]}>
        <IndividualButton style = {styles.SettingButton} onPress={() => changeStack(StackEnum.SettingsStack)}>
          <MaterialIcons name = "settings" size={30}/>
        </IndividualButton>
      </Animated.View>}

      {isMenuOpen &&
      <Animated.View style={[{opacity: opacity}]}>
        <IndividualButton style = {styles.FriendsButton} onPress={() => changeStack(StackEnum.ProfileStack)}>
          <MaterialIcons name = "person" size={30}/>
        </IndividualButton>
      </Animated.View>}



    {/* 
      <IndividualButton>
        <MaterialIcons name = "home" size={20}/>
      </IndividualButton> */}
    </View>
  )
}

function IndividualButton(props: {children: React.ReactNode, style: StyleProp<ViewStyle>, onPress?:any}) {
  return (
    <View style = {props.style} >
      <TouchableOpacity onPress = {props.onPress ? props.onPress: ()=>{}}
          style={styles.IndividualButton}>
            {props.children}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  MainButtonContainer: {
    position: 'absolute',
    left: Dimensions.get('window').width * 0.5,
    top: Dimensions.get('window').height * 0.5
  },
  IndividualButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: 'orange',
    },

    HomeExitButton: {
      position: 'absolute',
      left: Dimensions.get('window').width * -0.05,
      top: Dimensions.get('window').height * 0.4
    },

    ChatButton: {
      position: 'absolute',
      left: Dimensions.get('window').width * -0.3,
      top: Dimensions.get('window').height * 0.3
    },

    ProfileButton: {
      position: 'absolute',
      left: Dimensions.get('window').width * 0.2,
      top: Dimensions.get('window').height * 0.3
    },

    SettingButton: {
      position: 'absolute',
      left: Dimensions.get('window').width * -0.05,
      top: Dimensions.get('window').height * 0.2
    },

    FriendsButton : {
      position: 'absolute',
      left: Dimensions.get('window').width * -0.05,
      top: Dimensions.get('window').height * 0.1
    }


});
  

export default MainButton
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, Easing } from 'react-native';
const LoadingScreen =  () => {
    let spinValue = new Animated.Value(0);

    // Next, interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
    })


       Animated.loop(
        Animated.sequence([
          Animated.delay(1000),
          Animated.timing(
            spinValue,
            {
             toValue: 1,
             duration: 1000,
             easing: Easing.linear,
             useNativeDriver: true
            }
          )
        ]),
        {
          iterations: 10
        }
      ).start()

    
    
    return (
        <View style = {styles.pokemonBallContainer}>
            <Animated.View style={{transform: [{rotate: spin}]}}>
            
                <View style = {styles.pokemonBallRedHalf}>

                </View>
                <View style = {styles.pokemonBallWhiteHalf}>

                </View>

                <View style = {styles.pokemonBallCenter}>
                    <View style = {styles.pokemonBallInnerCenter}>

                    </View>
                </View>
            </Animated.View>
        </View>
    )}


const styles = StyleSheet.create({
    pokemonBallContainer: {
        position: 'absolute',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignContent: 'center'
    },
    pokemonBallRedHalf: {
        position: 'relative',
        height: 50,
        width: 100,
        backgroundColor: "red",
        // background: linear-gradient(to bottom, rgb(254, 0, 1) 50%, white 50% ),
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        borderColor: 'black',
        borderWidth: 8,
        borderBottomWidth: 4

        // border: 8px solid black,
        // animation: spin 1s linear infinite,
    },

    pokemonBallWhiteHalf: {
        position: 'relative',
        height: 50,
        width: 100,
        backgroundColor: "white",
        // background: linear-gradient(to bottom, rgb(254, 0, 1) 50%, white 50% ),
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderColor: 'black',
        borderWidth: 8,
        borderTopWidth: 4

        // border: 8px solid black,
        // animation: spin 1s linear infinite,
    },

    pokemonBallCenter: {
        position: 'absolute',
        backgroundColor: 'white',
        height: 38,
        width: 38,
        borderRadius: 19,
        justifyContent: 'center',
        alignContent: 'center',
        left: 32,
        borderColor: 'black',
        borderWidth: 8,
        top: 32
    },
    pokemonBallInnerCenter: {
        position: 'relative',
        backgroundColor: 'white',
        height: 18,
        width: 18,
        borderRadius: 100,
        justifyContent: 'center',
        alignContent: 'center',
        left: 2.5,
        borderBottomColor: 'black',
        borderWidth: 2

    }
})

export default LoadingScreen;
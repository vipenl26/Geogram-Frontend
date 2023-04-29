import { useState } from 'react';
import {StyleSheet, View, Text} from 'react-native'

const ProfileElements = function(props)
{
    return(
        <View style = {styles.container}>
            <Text style={styles.keyText}>{props.keytext}</Text>
            <Text style={styles.valueText}>{props.value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        display : "flex",
        flexDirection : "row",
        padding : 10,
        alignItems : "center",
        justifyContent : "space-between",
        borderWidth : 1,
        borderColor : "#000",
        margin : 5,
        borderRadius : 5
    },
    keyText : {
        fontSize : 20,
        fontWeight : "bold"
    },
    valueText : {
        fontSize : 20
    }
});

export default ProfileElements;
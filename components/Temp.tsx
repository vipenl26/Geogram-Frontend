import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
function Temp() {
  return (
    <View style={styles.container}>
        <Text>helloo</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      backgroundColor: 'yellow',
      padding: 20,
      border: 20,
      margin: 20
    }
  });
  

export default Temp
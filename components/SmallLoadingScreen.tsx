import React, { useState } from 'react';
import { Button, Overlay } from 'react-native-elements';
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native';



interface LoadingProps {
  message?: string
  isVisible?: boolean
}
const SmallLoading: React.FC<LoadingProps>  = ({ message, isVisible }) => {
  if (message == null) {
    message = "loading..."
  }
  if (isVisible == null) {
    isVisible = true
  }
  return (
    <View>
      <Overlay isVisible={isVisible} onBackdropPress={() => {}}>
        <ActivityIndicator size="large" color="#0000ff" />
        {message && <Text style={styles.message}>{message}</Text>}
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      flex: 1,
      left: Dimensions.get('window').width * 0.4,
      top: Dimensions.get('window').height * 0.35,
      backgroundColor: 'grey',
      borderRadius: 10,
      padding: 10
    },
    message: {
      marginTop: 10,
      fontSize: 18,
  
    },
});

export default SmallLoading


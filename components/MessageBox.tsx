import React, { useEffect, useState } from 'react';
import { Button, Overlay } from 'react-native-elements';
import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



interface LoadingProps {
  message?: string;
  onclickEvent?: () => void
}
const MessageBox: React.FC<LoadingProps>  = ({ message, onclickEvent }) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (message == "") {
      setVisible(false)
    }
    else {
      setVisible(true)
    }
  },[message])

  return (
    <View>
      <Overlay isVisible={visible} onBackdropPress={() => {}}>
      <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity style={styles.button} onPress={() => onclickEvent ?  onclickEvent() : () => {}}>
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MessageBox


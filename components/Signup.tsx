import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';

interface SignupProps {
  onSignup: (username: string, password: string, fullName: string) => void;
  onLoginNavigation: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSignup, onLoginNavigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSignup = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    onSignup(username, password, fullName);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <Button title="Signup" onPress={handleSignup} />
      <View style={styles.loginTextContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <Text style={styles.loginButton} onPress={onLoginNavigation}>
          Login
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  loginTextContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  loginText: {
    color: 'gray',
  },
  loginButton: {
    fontWeight: 'bold',
  },
});

export default Signup;

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePass, setRePass] = useState('');
  const navigate = useNavigation();
  const handleRegister = async () => {
    if (username.trim() === '' || password.trim() === '' || rePass.trim() === '') {
      alert('Please fill in all fields.');
      return;
    }
  
    if (password !== rePass) {
      alert('Passwords do not match.');
      return;
    }
  
    const apiUrl = 'http://localhost:3000/users';
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
  
      if (response.ok) {
        console.log('User registered successfully.');
        navigate.navigate('Login');
      } else {
        console.error('Failed to register. Server returned:', response.status);
      }
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tên đăng nhập"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập lại mật khẩu"
        secureTextEntry
        onChangeText={text => setRePass(text)}
        value={rePass}
      />
      <Button title="Đăng ký" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default RegisterScreen;

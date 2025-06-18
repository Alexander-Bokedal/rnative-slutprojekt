//
import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet, } from 'react-native';
import useUserState from '@/stores/userStore';
import { router } from 'expo-router';
function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toggleLogin = useUserState((state) => state.toggleLogin)
  const user = useUserState((state) => state.user)
  useEffect(() => {
    console.log(user)
  })
  const handleLogin = () => {
    toggleLogin()
    router.replace('/(tabs)')
  }


  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={{ justifyContent: 'center', flexDirection: 'row', maxWidth: '90%', }}>

      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin} >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

    </View >
  );
}
export default Index
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff'
  },
  input: {
    width: '100%',
    padding: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4
  },
  button: {
    margin: 10,
    width: '50%',
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center'
  },
  errorText: {
    color: 'red',
    marginTop: 8
  }
});

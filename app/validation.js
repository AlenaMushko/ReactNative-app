import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  nickname: yup
    .string()
    .min(3, 'Nickname must be at least 3 characters')
    .required('Nickname is required'),
  email: yup
    .string()
    .email('Invalid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const RegistrationScreen = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});


  const [emailError, setEmailError] = useState('');

  const handleSignUp = () => {
    validationSchema
      .validate({ email })
      .then(() => {
        // Дія при успішній валідації email
        console.log('Email is valid:', email);
      })
      .catch((error) => {
        // Дія при невдалій валідації email
        console.log('Email validation error:', error.message);
        setEmailError(error.message);
      });
  };

  const handleSubmit = async () => {
    try {
      await validationSchema.validate({ nickname, email, password });
      // logic for successful registration
    } catch (error) {
      setErrors(error.errors);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nickname"
        onChangeText={setNickname}
        value={nickname}
      />
      {errors.nickname && <Text style={styles.error}>{errors.nickname}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}
      <Button title="Register" onPress={handleSubmit} />
    </View>
  );
};
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function EmailForm() {
  // Estado para guardar el email
  const [email, setEmail] = useState('');
  // Estado para mensaje de error
  const [error, setError] = useState('');

  // Función para validar formato de email usando expresión regular
  const validateEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/; // Patrón simple para email
    return regex.test(email);
  };

  // Manejador cuando cambia el texto del input
  const handleChangeEmail = (text) => {
    setEmail(text);
    // Validar email y actualizar error si no válido
    if (text === '') {
      setError('');
    } else if (!validateEmail(text)) {
      setError('Correo electrónico inválido');
    } else {
      setError('');
    }
  };

  // Manejador del botón Enviar
  const handleSubmit = () => {
    if (validateEmail(email)) {
      alert(`Correo enviado: ${email}`);
      setEmail('');
    } else {
      setError('Por favor ingresa un correo válido');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Correo Electrónico:</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder="Ejemplo: correo@dominio.com"
        value={email}
        onChangeText={handleChangeEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button
        title="Enviar"
        onPress={handleSubmit}
        disabled={!validateEmail(email)} // Habilitado solo si email válido
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 28,
    marginTop: 58,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 6,
    padding: 18,
    marginBottom: 5,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 18,
  },
});
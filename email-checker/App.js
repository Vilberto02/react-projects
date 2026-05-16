import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert, StyleSheet } from 'react-native';

export default function App() {
  // Estado para guardar el texto del input de nombre
  const [name, setName] = useState('');
  // Estado para errores del formulario
  const [error, setError] = useState('');
  // Estado para contar cuántas veces se presiona el botón personalizado
  const [touchCount, setTouchCount] = useState(0);

  // Función para validar el campo nombre (campo requerido)
  const validateName = () => {
    if (name.trim() === '') {
      setError('El nombre es obligatorio');
      return false;
    }
    setError('');
    return true;
  };

  // Manejador del evento onPress para el botón enviar del formulario
  const handleSubmit = () => {
    if (validateName()) {
      Alert.alert('Formulario enviado', `Nombre: ${name}`);
    }
  };

  // Manejador del evento onPress para el botón TouchableOpacity
  const handleTouchablePress = () => {
    setTouchCount(touchCount + 1); // Incrementa contador
    Alert.alert('TouchableOpacity presionado', `Presionado ${touchCount + 1} veces`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulario con Validación</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder="Ingresa tu nombre"
        value={name}
        onChangeText={text => {
          setName(text);      // Actualiza estado con texto nuevo
          if (text.trim() !== '') setError(''); // Quita error si texto no está vacío
        }}
        onBlur={validateName}   // Valida cuando input pierde foco
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Button title="Enviar" onPress={handleSubmit} />

      <View style={{ marginTop: 40, alignItems: 'center' }}>
        <Text style={styles.title}>Botón TouchableOpacity</Text>
        <TouchableOpacity
          style={styles.touchableButton}
          onPress={handleTouchablePress}
          activeOpacity={0.7}      // Cambia opacidad al presionar
        >
          <Text style={styles.touchableText}>Presióname</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Estilos para la interfaz
const styles = StyleSheet.create({
  container: {
    flex: 1,                      // Ocupa toda la pantalla
    padding: 20,                  // Relleno interno
    justifyContent: 'center',     // Centrar verticalmente
    backgroundColor: '#f0f0f0',   // Color de fondo claro
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginTop: 5,
  },
  touchableButton: {
    backgroundColor: '#4287f5',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  touchableText: {
    color: 'white',
    fontSize: 18,
  },
});

import { StyleSheet, View, TouchableOpacity, Alert, Animated } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const SWIPE_THRESHOLD = 100;

const Todo = ({ id, description, isCompleted, createdAt, deleteTodo, toggleIsCompleted }) => {
  const showDetails = () => { };

  const handleDelete = (id) => {
    Alert.alert(
      'Eliminar tarea',
      `¿Estás seguro de que deseas eliminar ${id}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => deleteTodo(id)
        }
      ]
    );
  };

  //lógica de acciones por desplazamiento
  const translateX = new Animated.Value(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.setValue(event.translationX);
    })
    .onEnd((event) => {
      const { translationX } = event;
      if (translationX < -SWIPE_THRESHOLD * 2) {
        deleteTodo(id);
      } else if (translationX > SWIPE_THRESHOLD * 2) {
        toggleIsCompleted(id, isCompleted);
      }
      Animated.spring(translateX, {
        toValue: 0, // Regresa a la posición original.
        bounciness: 10, // Grado de rebote al regresar.
        useNativeDriver: false
      }).start();
    });

  // \`redLayerOpacity\` se utiliza para controlar la visibilidad de la capa roja que indica eliminación.
  // A medida que el usuario realiza el swipe hacia la izquierda, la capa se vuelve más visible.
  const redLayerOpacity = translateX.interpolate({
    inputRange: [-SWIPE_THRESHOLD * 2, 0], // Rango de movimiento para la interpolación.
    outputRange: [1, 0], // La opacidad cambia de 1 (completamente visible) a 0 (invisible).
    extrapolate: 'clamp', // Limita los valores interpolados al rango definido.
  });

  // Similar a \`redLayerOpacity\`, \`deleteIconOpacity\` controla la visibilidad del ícono de eliminación.
  const deleteIconOpacity = translateX.interpolate({
    inputRange: [-SWIPE_THRESHOLD * 2, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // \`purpleLayerOpacity\` se utiliza para la capa púrpura, que indica que el todo será completado si el swipe es suficientemente
  // largo hacia la derecha.
  const purpleLayerOpacity = translateX.interpolate({
    inputRange: [0, SWIPE_THRESHOLD * 2],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  // \`checkIconOpacity\` controla la visibilidad del ícono que marca el todo como completado.
  const checkIconOpacity = translateX.interpolate({
    inputRange: [0, SWIPE_THRESHOLD * 2],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  // \`animatedStyle\` se utiliza para aplicar transformaciones animadas al todo.
  // Aquí se aplica una transformación de traslación horizontal basada en \`translateX\`.
  const animatedStyle = {
    transform: [{ translateX }]
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.redLayer, { height: 40, opacity: redLayerOpacity }]}>
        <Animated.View style={[styles.deleteIconContainer, { opacity: deleteIconOpacity }]}>
          <MaterialCommunityIcons name="trash-can-outline" size={24} color="whitesmoke" />
        </Animated.View>
      </Animated.View>

      <Animated.View style={[styles.purpleLayer, { opacity: purpleLayerOpacity, height: 40 }]}>
        <Animated.View style={[styles.checkIconContainer, { opacity: checkIconOpacity }]}>
          <MaterialCommunityIcons name="check-circle-outline" size={24} color="whitesmoke" />
        </Animated.View>
      </Animated.View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.todoContainer, animatedStyle]}>
          <TouchableOpacity
            onPress={showDetails}
            onLongPress={() => toggleIsCompleted(id, isCompleted)}
          >
            <Text style={[isCompleted && styles.completed, { width: 300 }]} variant='bodyLarge'>
              {description.length > 35 ? description.slice(0, 35) + '...' : description}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons name="trash-can-outline" size={24} color="black"
              onPress={() => handleDelete(id)} />
          </TouchableOpacity>
        </Animated.View>
      </GestureDetector>
    </View >
  );
};

export default Todo;

const styles = StyleSheet.create({
  container: {
    position: 'relative', // Posición relativa para permitir que las capas de color se superpongan correctamente al contenedor principal del todo.
  },
  todoContainer: {
    flexDirection: 'row', // Alinea el texto y los íconos en una fila horizontal.
    justifyContent: 'space-between', // Distribuye el espacio entre el texto y el ícono de eliminación.
    alignItems: 'center', // Alinea verticalmente el contenido en el centro.
    paddingVertical: 8, // Espaciado vertical interno del todo.
    marginTop: 20, // Margen superior entre cada todo.
    backgroundColor: "rgb(237, 221, 245)", // Color de fondo del todo.
    borderRadius: 12, // Bordes redondeados para un diseño más amigable.
    paddingLeft: 20, // Espaciado a la izquierda del texto.
    paddingRight: 20, // Espaciado a la derecha del texto.
  },
  completed: {
    textDecorationLine: 'line-through', // Aplica una línea a través del texto para indicar que el todo está completado.
    color: '#512da8', // Cambia el color del texto para indicar su estado de completado.
  },
  redLayer: {
    position: 'absolute', // Posición absoluta para que la capa roja cubra toda el área del todo cuando se realiza el swipe.
    top: 20, // Alineación superior basada en el margen superior del todo.
    right: 0, // La capa roja se alinea al borde derecho del todo.
    left: 0, // La capa roja se extiende hasta el borde izquierdo del todo.
    backgroundColor: 'red', // Color de fondo rojo para indicar una acción destructiva (eliminar).
    borderRadius: 12, // Bordes redondeados para que coincidan con los del todo.
  },
  deleteIconContainer: {
    position: 'absolute', // Posiciona el ícono de eliminación dentro de la capa roja.
    right: 15, // Desplazado ligeramente hacia la izquierda desde el borde derecho.
    top: '20%', // Ajustado verticalmente en la capa.
  },
  purpleLayer: {
    position: 'absolute', // Posición absoluta similar a la capa roja.
    top: 20,
    right: 0,
    left: 0,
    backgroundColor: 'blueviolet', // Color de fondo púrpura para indicar una acción constructiva (completar).
    borderRadius: 12,
  },
  checkIconContainer: {
    position: 'absolute', // Posiciona el ícono de check dentro de la capa púrpura.
    left: 15, // Desplazado ligeramente hacia la derecha desde el borde izquierdo.
    top: '20%', // Ajustado verticalmente en la capa.
  }
});

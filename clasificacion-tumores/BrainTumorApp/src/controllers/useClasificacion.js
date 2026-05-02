import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { clasificarImagen } from '../services/apiService';
import ClasificacionResult from '../models/ClasificacionResult';

export default function useClasificacion() {
  const [imageUri, setImageUri] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const pickImage = async () => {
    const permResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permResult.granted) {
      setError('Se requiere permiso de galeria');
      return;
    }
    
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    
    if (!pickerResult.canceled) {
      const uri = pickerResult.assets[0].uri;
      setImageUri(uri);
      setResult(null);
      setError(null);
      await clasificar(uri);
    }
  };
  
  const clasificar = async (uri) => {
    setLoading(true);
    setError(null);
    try {
      const data = await clasificarImagen(uri);
      setResult(new ClasificacionResult(data));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const reset = () => {
    setImageUri(null);
    setResult(null);
    setError(null);
  };
  
  return {
    imageUri, result, loading,
    error, pickImage, reset
  };
}

import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
//import women from "./data/women.json";
import CardWoman from "./components/CardWoman";
export default function App() {
  //const totalRecords = women.length;
  /*const [count, setCount] = useState(0);
  const handlePress = () => {
    setCount(count + 1);
  };*/
  //const [loadedCount, setLoadedCount] = useState(5);

  //const [refreshing, setRefreshing] = useState(false);
  /*const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      const newLoadedCount = Math.min(loadedCount + 5, totalRecords);
      const nextItems = women.slice(loadedCount, newLoadedCount);
      setData((prev) => [...prev, ...nextItems]);
      setLoadedCount(newLoadedCount);
      setRefreshing(false);
    }, 1500);
  };*/

  const URL = "https://69ff53372b7ab349602f8485.mockapi.io/api/v1/data";

  /*const getData = async (url) => {
    const res = await fetch(url);
    const women = await res.json();
    console.log(women);
  };*/

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Función para obtener datos, manejando también errores por status HTTP distinto de 200-299
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        // Generamos error si la respuesta no es OK
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message || "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /*useEffect(() => {
    const getData = async (url) => {
      setIsLoading(true);
      try {
        const res = await fetch(url);
        const women = await res.json();
        setData(women);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData(URL);
  }, []);

  /*
  const listHeader = () => {
    if (loadedCount >= totalRecords) {
      return (
        <Text style={styles.headerFooterText}>
          Se acabaron los registros. Total: {totalRecords}
        </Text>
      );
    } else {
      return (
        <Text style={styles.headerFooterText}>
          Haga pull para cargar registros. Total registros disponibles:{" "}
          {totalRecords}
        </Text>
      );
    }
  };

  const listFooter = () => {
    if (loadedCount >= totalRecords) {
      return (
        <Text style={styles.headerFooterText}>
          Carga terminada. Total registros cargados: {loadedCount}
        </Text>
      );
    } else {
      const remaining = totalRecords - loadedCount;
      return (
        <Text style={styles.headerFooterText}>
          Cargados: {loadedCount}. Faltan: {remaining} registros por cargar.
        </Text>
      );
    }
  };
  */

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {" "}
        <Text
          style={{
            marginVertical: 16,
            fontSize: 20,
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          Desarrollo de Aplicaciones Móviles
        </Text>
        {/*<Text style={{ fontSize: 40, textAlign: "center" }}>{count}</Text>
        <Button onPress={handlePress} title="add one" />*/}
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <Text style={{ color: "red", padding: 10 }}>{error}</Text>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <CardWoman woman={item} />}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
  },
  headerFooterText: {
    padding: 10,
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
  },
  imageSize: {
    width: 100,
    height: 100,
  },
});

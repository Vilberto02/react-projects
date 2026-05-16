import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

export default function PaginationScreen() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (pageNum = 1, refreshing = false) => {
    if (loading) return; 
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      if (refreshing) {
        setData(json);
      } else {
        setData(prevData => [...prevData, ...json]);
      }
      setHasMore(json.length === 10);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      if (refreshing) setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchData(1, true);
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.error}>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Posts con paginación infinita</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  item: { backgroundColor: '#fff', padding: 15, marginVertical: 8, borderRadius: 8, elevation: 2 },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
  footer: { paddingVertical: 20 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

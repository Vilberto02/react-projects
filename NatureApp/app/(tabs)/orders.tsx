import React from 'react';
import { useFocusEffect } from "expo-router";
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useOrders } from '../../src/viewmodels/useOrders';

export default function OrdersScreen() {
  const { orders, loading, error, refresh } = useOrders();

  useFocusEffect(
    React.useCallback(() => {
      refresh();
    }, [refresh])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Pedidos</Text>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.orderId}>Pedido {item.id}</Text>
            <Text style={styles.date}>{item.getFormattedDate()}</Text>
            <Text style={[styles.status, { color: item.getStatusColor() }]}>{item.status}</Text>
            <Text style={styles.total}>S/ {item.total.toFixed(2)}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No tienes pedidos previos</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F5F5F5' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1A5276', marginBottom: 16 },
  card: { backgroundColor: '#FFF', padding: 16, borderRadius: 8, marginBottom: 12, elevation: 2 },
  orderId: { fontSize: 16, fontWeight: 'bold' },
  date: { color: '#666', marginVertical: 4 },
  status: { fontWeight: 'bold', textTransform: 'capitalize' },
  total: { fontSize: 18, color: '#148F77', fontWeight: 'bold', marginTop: 8 },
  empty: { textAlign: 'center', marginTop: 60, color: '#999' }
});

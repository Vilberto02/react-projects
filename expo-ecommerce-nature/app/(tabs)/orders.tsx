// app/(tabs)/orders.tsx
// ============================================
// Pantalla de Pedidos
// Sesión 11: Historial de órdenes con Firestore
// ============================================

import React, { useCallback } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useAuth } from '../../src/hooks/useAuth';
import { useOrders } from '../../src/hooks/useOrders';

function OrderCard({ order, onCancel }: any) {
  const statusColors: any = {
    pending: '#f4a261',
    confirmed: '#2a9d8f',
    shipped: '#264653',
    delivered: '#2d6a4f',
    cancelled: '#e63946',
  };

  const statusLabels: any = {
    pending: 'Pendiente',
    confirmed: 'Confirmado',
    shipped: 'Enviado',
    delivered: 'Entregado',
    cancelled: 'Cancelado',
  };

  let dateStr = '';
  try {
    const d = new Date(order.createdAt);
    if (!isNaN(d.getTime())) {
      dateStr = d.toLocaleDateString('es-PE');
    }
  } catch (e) {}

  return (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Pedido #{(order.id || order._id || '').slice(-6).toUpperCase()}</Text>
        <View style={[styles.badge, { backgroundColor: statusColors[order.status] || '#999' }]}>
          <Text style={styles.badgeText}>{statusLabels[order.status] || order.status}</Text>
        </View>
      </View>

      <Text style={styles.orderDate}>{dateStr}</Text>
      
      <Text style={styles.orderItems}>
        {(order.items || []).map((i: any) => `${i.name} x${i.quantity}`).join(', ')}
      </Text>

      <View style={styles.orderFooter}>
        <Text style={styles.orderTotal}>S/ {(order.total || 0).toFixed(2)}</Text>
        {order.status === 'pending' && (
          <TouchableOpacity onPress={() => onCancel?.(order.id || order._id)}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default function OrdersScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { orders, loading, loadOrders, cancelOrder } = useOrders(user?.id);

  useFocusEffect(
    useCallback(() => {
      if (user) loadOrders();
    }, [user, loadOrders])
  );

  if (!user) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyIcon}>🔒</Text>
        <Text style={styles.emptyText}>Inicia sesión para ver tus pedidos</Text>
        <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/auth/login' as any)}>
          <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleCancel = (orderId: string) => {
    Alert.alert('Cancelar Pedido', '¿Estás seguro?', [
      { text: 'No' },
      { text: 'Sí', style: 'destructive', onPress: () => cancelOrder(orderId) },
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id || item._id}
        renderItem={({ item }) => <OrderCard order={item} onCancel={handleCancel} />}
        contentContainerStyle={styles.list}
        onRefresh={loadOrders}
        refreshing={loading}
        ListEmptyComponent={
          !loading ? (
            <View style={styles.center}>
              <Text style={styles.emptyIcon}>📦</Text>
              <Text style={styles.emptyText}>Aún no tienes pedidos</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  list: { padding: 16 },
  emptyIcon: { fontSize: 60, marginBottom: 16 },
  emptyText: { fontSize: 17, color: '#888', marginBottom: 20 },
  loginButton: {
    backgroundColor: '#2d6a4f',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  loginButtonText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: { fontSize: 15, fontWeight: '700', color: '#1a1a2e' },
  badge: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  orderDate: { fontSize: 12, color: '#888', marginTop: 4 },
  orderItems: { fontSize: 13, color: '#555', marginTop: 6 },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 8,
  },
  orderTotal: { fontSize: 17, fontWeight: '700', color: '#2d6a4f' },
  cancelText: { color: '#e63946', fontSize: 13, fontWeight: '600' },
});

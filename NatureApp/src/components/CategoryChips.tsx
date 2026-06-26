// src/components/CategoryChips.tsx
// ============================================
// Componente Chips de Categorías
// Sesión 11: Filtro horizontal de categorías
// ============================================

import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function CategoryChips({ categories, selected, onSelect }: any) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity
        style={[styles.chip, !selected && styles.chipActive]}
        onPress={() => onSelect?.(null)}
      >
        <Text style={[styles.chipText, !selected && styles.chipTextActive]}>
          Todos
        </Text>
      </TouchableOpacity>

      {(categories || []).map((cat: any) => (
        <TouchableOpacity
          key={cat.id || cat._id}
          style={[
            styles.chip,
            selected === (cat.id || cat._id) && styles.chipActive,
          ]}
          onPress={() => onSelect?.(cat.id || cat._id)}
        >
          <Text
            style={[
              styles.chipText,
              selected === (cat.id || cat._id) && styles.chipTextActive,
            ]}
          >
            {cat.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 64,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  chipActive: {
    backgroundColor: "#2d6a4f",
  },
  chipText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  chipTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
});

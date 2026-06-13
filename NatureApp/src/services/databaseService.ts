import * as SQLite from "expo-sqlite";
import { Product } from "../models/Product";
// ============================================
// PERSISTENCIA LOCAL ESTRUCTURADA - SQLite
// Base de datos relacional embebida
// Para carrito, favoritos, operaciones CRUD
// ============================================
let db: SQLite.SQLiteDatabase | null = null;
let initPromise: Promise<void> | null = null;

const DatabaseService = {
  // --- INICIALIZAR base de datos ---
  async init() {
    if (initPromise) {
      return initPromise;
    }
    initPromise = (async () => {
      if (!db) {
        db = await SQLite.openDatabaseAsync("naturapp.db");
        // Crear tabla del carrito de compras
        await db.execAsync(`
      CREATE TABLE IF NOT EXISTS cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        image TEXT,
        quantity INTEGER DEFAULT 1
      );
    `);

    // Crear tabla de favoritos
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS favorites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        image TEXT,
        added_date TEXT DEFAULT
        (datetime('now'))
      );
    `);
      }
    })();
    return initPromise;
  },
  // === OPERACIONES CRUD DEL CARRITO ===
  // CREATE: Agregar producto al carrito
  async addToCart(product: Product) {
    const result = await db?.runAsync(
      `INSERT OR REPLACE INTO cart
        (product_id, name, price, image, quantity)
        VALUES (?, ?, ?, ?,
        COALESCE(
          (SELECT quantity + 1 FROM cart
          WHERE product_id = ?), 1))`,
      [product.id, product.name, product.price, product.image, product.id],
    );
    return result?.lastInsertRowId;
  },
  // READ: Obtener todos los items del carrito
  async getCartItems() {
    const rows = await db?.getAllAsync("SELECT * FROM cart ORDER BY id DESC");
    return rows || [];
  },
  // UPDATE: Cambiar cantidad de un item
  async updateCartQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      return this.removeFromCart(productId);
    }
    await db?.runAsync("UPDATE cart SET quantity = ? WHERE product_id = ?", [
      quantity,
      productId,
    ]);
  },
  // DELETE: Eliminar un item del carrito
  async removeFromCart(productId: string) {
    await db?.runAsync("DELETE FROM cart WHERE product_id = ?", [productId]);
  },
  // READ: Obtener total del carrito
  async getCartTotal(): Promise<number> {
    const result = await db?.getFirstAsync<{ total: number }>(
      "SELECT SUM(price * quantity) as total FROM cart",
    );
    return result?.total || 0;
  },
  // DELETE: Vaciar el carrito completo
  async clearCart() {
    await db?.runAsync("DELETE FROM cart");
  },
  // READ: Contar items en el carrito
  async getCartCount(): Promise<number> {
    const result = await db?.getFirstAsync<{ count: number }>(
      "SELECT SUM(quantity) as count FROM cart",
    );
    return result?.count || 0;
  },
  // === OPERACIONES CRUD DE FAVORITOS ===
  async addFavorite(product: Product) {
    await db?.runAsync(
      `INSERT OR IGNORE INTO favorites
        (product_id, name, price, image)
        VALUES (?, ?, ?, ?)`,
      [product.id, product.name, product.price, product.image],
    );
  },
  async removeFavorite(productId: string) {
    await db?.runAsync("DELETE FROM favorites WHERE product_id = ?", [
      productId,
    ]);
  },
  async isFavorite(productId: string) {
    const row = await db?.getFirstAsync(
      "SELECT id FROM favorites WHERE product_id = ?",
      [productId],
    );
    return !!row;
  },
  async getFavorites() {
    return await db?.getAllAsync(
      "SELECT * FROM favorites ORDER BY added_date DESC",
    );
  },
};
export default DatabaseService;

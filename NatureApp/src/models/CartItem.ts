// Modelo que representa un item en el carrito de compras
export class CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;

  constructor({ id, productId, name, price, image, quantity }: CartItemType) {
    this.id = id; // ID único en SQLite
    this.productId = productId; // Referencia al producto
    this.name = name;
    this.price = price;
    this.image = image;
    this.quantity = quantity || 1;
  }

  // Calcula el subtotal de este item
  getSubtotal() {
    return this.price * this.quantity;
  }
  // Crea instancia desde fila de SQLite
  static fromRow(row: {
    id: string;
    product_id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }) {
    return new CartItem({
      id: row.id,
      productId: row.product_id,
      name: row.name,
      price: row.price,
      image: row.image,
      quantity: row.quantity,
    });
  }
}

type CartItemType = {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

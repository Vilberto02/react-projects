// Modelo que representa un producto natural del catálogo
// Equivale al 'Model' del patrón MVVM
export class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  benefits: string[];

  constructor({
    id,
    name,
    description,
    price,
    image,
    category,
    stock,
    rating,
    benefits,
  }: ProductType) {
    this.id = id;
    this.name = name; // Nombre del producto
    this.description = description; // Descripción detallada
    this.price = price; // Precio en soles (PEN)
    this.image = image; // URL de la imagen
    this.category = category; // Categoría: 'superfoods', 'aceites', etc.
    this.stock = stock; // Cantidad disponible
    this.rating = rating || 0; // Calificación promedio
    this.benefits = benefits || []; // Lista de beneficios
  }

  // Factory method: crea instancia desde JSON de la API
  static fromJSON(json: ProductType) {
    return new Product(json);
  }

  // Verifica si hay stock disponible
  isAvailable() {
    return this.stock > 0;
  }

  // Formato de precio para mostrar en la UI
  getFormattedPrice() {
    return `S/ ${this.price.toFixed(2)}`;
  }
}

type ProductType = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  benefits: string[];
};

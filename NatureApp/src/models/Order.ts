// Modelo que representa un pedido completado
export class Order {
  id: string;
  items: string[];
  total: number;
  status: string;
  date: string;
  address: string;

  constructor({ id, items, total, status, date, address }: OrderType) {
    this.id = id;
    this.items = items || []; // Lista de CartItems
    this.total = total; // Monto total
    this.status = status || "pendiente"; // Estado del pedido
    this.date = date || new Date().toISOString();
    this.address = address || "";
  }

  static fromJSON(json: OrderType) {
    return new Order(json);
  }

  getFormattedDate() {
    return new Date(this.date).toLocaleDateString("es-PE");
  }

  getStatusColor() {
    const colors: Record<Order["status"], string> = {
      pendiente: "#F39C12",
      procesando: "#3498DB",
      enviado: "#8E44AD",
      entregado: "#27AE60",
    };

    return colors[this.status] || "#95A5A6";
  }
}

type OrderType = {
  id: string;
  items: string[];
  total: number;
  status: string;
  date: string;
  address: string;
};

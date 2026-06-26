# NatureApp

NatureApp es una aplicación móvil de comercio electrónico enfocada en la venta de productos naturales, suplementos y hierbas. Está construida con **React Native (Expo)** y utiliza **Firebase** como plataforma Backend-as-a-Service (BaaS).

![Firebase Architecture](./screens/firebase.png)

## Características Principales

- **Autenticación**: Registro y login de usuarios seguros.
- **Catálogo de Productos**: Listado de productos organizados por categorías.
- **Búsqueda Avanzada**: Búsqueda por nombre de producto y filtros rápidos.
- **Carrito de Compras**: Gestión de ítems antes de proceder al pago.
- **Historial de Pedidos**: Los usuarios pueden ver el estado y los detalles de compras anteriores.

## Integración con Firebase (BaaS)

Anteriormente la aplicación utilizaba un servidor local de base de datos y una API en Node.js, pero fue migrada a **Firebase** para aprovechar la infraestructura escalable en la nube.

Lo que se hizo en la integración:

1. **Firebase Auth**: Manejo completo de autenticación (Email/Contraseña) y persistencia de sesión local con `AsyncStorage`.
2. **Firestore Database**:
   - Colección `products`: Contiene el inventario en tiempo real.
   - Colección `categories`: Información de filtros visuales.
   - Colección `users` y `orders`: Almacenamiento seguro de datos de clientes y su historial de pedidos.
3. **Firebase Storage**: Configurado para la futura subida de avatares de usuarios y fotos dinámicas de productos.
4. Se migró toda la comunicación REST hacia los hooks y métodos nativos del SDK de Firebase, lo que permite consultas más rápidas y con filtros en memoria.

## Requisitos Previos

- [Node.js](https://nodejs.org/en/) (v18 o superior)
- [Git](https://git-scm.com/)
- Aplicación [Expo Go](https://expo.dev/go) instalada en tu dispositivo móvil (o usar emulador iOS/Android).
- Un proyecto creado en [Firebase Console](https://console.firebase.google.com/) con **Auth (Email)** y **Firestore** habilitados.

## Instalación

1. Clona este repositorio y navega hasta el directorio:

   ```bash
   git clone <url-del-repo>
   cd NatureApp
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. **Configura Firebase (Variables de Entorno)**:
   Renombra el archivo `.env.example` como `.env` en la raíz del proyecto y agrega las credenciales de tu proyecto de Firebase. Es importante usar el prefijo `EXPO_PUBLIC_` para que Expo pueda leerlas en la aplicación.

   ```env
   EXPO_PUBLIC_API_KEY="TU_API_KEY"
   EXPO_PUBLIC_AUTH_DOMAIN="tu-proyecto.firebaseapp.com"
   EXPO_PUBLIC_PROJECT_ID="tu-proyecto"
   EXPO_PUBLIC_STORAGE_BUCKET="tu-proyecto.appspot.com"
   EXPO_PUBLIC_MESSAGING_SENDER_ID="TUS_SENDER_ID"
   EXPO_PUBLIC_APP_ID="TU_APP_ID"
   ```

4. **Poblar la Base de Datos (Seeding)**:
   Si tu Firestore está vacío, puedes insertar los productos y categorías iniciales ejecutando:
   ```bash
   npm run seed
   ```

## Ejecución

Inicia el servidor de desarrollo de Expo:

```bash
npx expo start
```

- Escanea el código QR desde la aplicación de cámara (iOS) o desde la app Expo Go (Android) para ver la aplicación en tu celular.
- Presiona `a` para abrirla en un Emulador de Android.
- Presiona `i` para abrirla en un Simulador de iOS.

## Estructura de Carpetas

```text
/app             # Rutas y Pantallas principales (Expo Router)
/screens         # Recursos e imágenes ilustrativas del proyecto
/docs            # Informes del instructivo de la creación de la app
/scripts         # Scripts de utilidad (como seedFirestore.js)
/src/
  ├── components # Componentes visuales reutilizables (ProductCard, etc.)
  ├── hooks      # Custom hooks de React (useAuth, useProducts, etc.)
  ├── services   # Integraciones directas con Firebase
  └── types      # Interfaces y modelos de TypeScript
```

## Vista previa de la aplicación

![Home](./screens/home.jpg)
![Productos](./screens/producto_detalle.jpg)
![Carrito](./screens/carrito.jpg)
![Checkout](./screens/compra.jpg)
![Pedidos](./screens/pedidos.jpg)
